import json
import math

def oklch_to_rgb(l, c, h):
    # h is in degrees, convert to radians
    h_rad = math.radians(h)
    a = c * math.cos(h_rad)
    b = c * math.sin(h_rad)
    
    # OKLCH to LMS
    l_ = l + 0.3963377774 * a + 0.2158037573 * b
    m_ = l - 0.1055613458 * a - 0.0638541728 * b
    s_ = l - 0.0894841775 * a - 1.2914855480 * b
    
    # LMS to RGB (linear)
    l_p = l_ ** 3
    m_p = m_ ** 3
    s_p = s_ ** 3
    
    r =  4.0767416621 * l_p - 3.3077115913 * m_p + 0.2309699292 * s_p
    g = -1.2684380046 * l_p + 2.6097574011 * m_p - 0.3413193965 * s_p
    b = -0.0041960863 * l_p - 0.7034186147 * m_p + 1.7076210010 * s_p
    
    # Apply gamma correction to get sRGB
    def scale(c_val):
        if c_val <= 0.0031308:
            return 12.92 * c_val
        else:
            return 1.055 * (c_val ** (1.0 / 2.4)) - 0.055
            
    rgb = [min(max(scale(r), 0.0), 1.0),
           min(max(scale(g), 0.0), 1.0),
           min(max(scale(b), 0.0), 1.0)]
    return rgb

# Navy color from styles: oklch(0.32 0.09 258)
navy_rgb = oklch_to_rgb(0.32, 0.09, 258)
print("Computed Navy RGB:", navy_rgb)

# Let's load the json file
filepath = r"src\lib\animations\Particle wave with depth.json"
with open(filepath, "r", encoding="utf-8") as f:
    data = json.load(f)

# Helper function to recursively find and modify color keys
# Lottie colors are under shapes 'fl' (fill) 'c' (color), and in effects 'Fill' 'Color'
def modify_colors(obj):
    if isinstance(obj, dict):
        # Look for Lottie color property
        # Fills: "ty": "fl", "c": {"k": [r, g, b, a]}
        if obj.get("ty") == "fl" and "c" in obj:
            color_prop = obj["c"]
            if isinstance(color_prop, dict) and "k" in color_prop:
                val = color_prop["k"]
                if isinstance(val, list) and len(val) >= 3:
                    # Replace with our navy color (preserving alpha if exists)
                    alpha = val[3] if len(val) > 3 else 1.0
                    color_prop["k"] = [navy_rgb[0], navy_rgb[1], navy_rgb[2], alpha]
        
        # Effects: e.g. ADBE Fill effect "v": {"k": [r, g, b, a]} or just "v"
        if obj.get("mn") == "ADBE Fill" and "ef" in obj:
            # Under ADP Fill, look for Color property
            pass
            
        # General color properties in Lottie can also be just: "nm": "Color", "v": {"k": [r, g, b, a]}
        if obj.get("nm") == "Color" and "v" in obj:
            v_prop = obj["v"]
            if isinstance(v_prop, dict) and "k" in v_prop:
                val = v_prop["k"]
                if isinstance(val, list) and len(val) >= 3:
                    alpha = val[3] if len(val) > 3 else 1.0
                    v_prop["k"] = [navy_rgb[0], navy_rgb[1], navy_rgb[2], alpha]
            elif isinstance(v_prop, list) and len(v_prop) >= 3:
                # Direct array
                alpha = v_prop[3] if len(v_prop) > 3 else 1.0
                obj["v"] = [navy_rgb[0], navy_rgb[1], navy_rgb[2], alpha]
                
        # Sometimes colors are stored as "c" directly with array
        if "c" in obj and not isinstance(obj["c"], dict) and isinstance(obj["c"], list) and len(obj["c"]) >= 3:
            alpha = obj["c"][3] if len(obj["c"]) > 3 else 1.0
            obj["c"] = [navy_rgb[0], navy_rgb[1], navy_rgb[2], alpha]

        for k, v in obj.items():
            modify_colors(v)
    elif isinstance(obj, list):
        for item in obj:
            modify_colors(item)

modify_colors(data)

with open(filepath, "w", encoding="utf-8") as f:
    json.dump(data, f, separators=(',', ':'))

print("Color modification complete!")
