import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import Lottie from "lottie-react";
import particleAnimation from "../lib/animations/Particle wave with depth.json";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

const EXPERIENCE = [
  {
    period: "Jan 2026 — May 2026",
    role: "Part-Time Software Engineer",
    org: "CARE Pvt. Ltd.",
    bullets: [
      "Sole developer of the Norasol Admin Portal — an internal web control panel for managing solar inverters, batteries, customers, plants, and staff across the Norasol product line.",
      "Built full CRUD across all entities (inverters, batteries, customers, plants, staff) with attribute-based sorting, search, and in-depth per-record detail views.",
      "Implemented 9 distinct staff roles with dual-layer RBAC: FastAPI enforces role-based permission checks on every API endpoint; Supabase Row-Level Security policies enforce access directly at the database layer.",
      "Designed a customer verification workflow where accounts registered via the Norasol mobile app appear with a pending status in the portal, requiring manual staff activation before access is granted.",
      "Built a device replacement workflow with a full in-portal flow to swap faulty inverters or batteries and maintain a traceable replacement history per plant.",
      "Designed and implemented a real-time MQTT pub/sub notification system: a subscriber service listens to device telemetry, applies threshold-based filtering, and delivers breach alerts to subscribed customers via the mobile app.",
      "Deployed via Docker multi-stage builds, GitHub Actions CI/CD publishing to GHCR, and a Caddy reverse proxy — fully live in production and actively used by the CARE team.",
    ],
    stack: [
      "React",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Caddy",
      "MQTT",
    ],
  },
  {
    period: "Jul 2025 — Aug 2025",
    role: "Full Stack Development Intern",
    org: "CARE Pvt. Ltd.",
    bullets: [
      "Built a digital shooting range automation system using the Reflex framework (Python full-stack), replacing manual paper-based session logging with a data-driven workflow.",
      "Implemented shot plotting on a bullseye diagram, giving shooters accurate spatial representations of their per-session shot groupings.",
      "Calculated per-session marksmanship metrics including centroid (average point of impact), group size (shot spread), and performance trend graphs visualised across sessions.",
      "Implemented QR code-based session login: scanning a QR code at the range automatically authenticated the user and pre-loaded their full profile and session history, eliminating manual data entry.",
    ],
    stack: ["Reflex", "Python", "TailwindCSS"],
  },
];

const SKILLS = [
  { group: "Languages", items: ["Python", "SQL"] },
  {
    group: "AI & LLM",
    items: [
      "LangChain",
      "LangGraph",
      "Groq",
      "RAG Pipelines",
      "Sentence Transformers",
      "Vector Databases",
    ],
  },
  { group: "ML & Data", items: ["PyTorch", "Pandas", "NumPy"] },
  {
    group: "Backend",
    items: ["FastAPI", "SQLAlchemy", "Alembic", "REST APIs", "MQTT", "JWT & RBAC"],
  },
  { group: "Frontend & Mobile", items: ["React", "TypeScript", "Flutter", "TailwindCSS"] },
  {
    group: "DevOps & Tools",
    items: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "PostgreSQL",
      "Supabase",
      "Redis",
      "Nginx",
      "n8n",
      "Git",
    ],
  },
];

const PROJECTS = [
  {
    n: "01",
    title: "RepoMind",
    blurb:
      "A web app to let developers instantly understand any GitHub repository by chatting with its codebase using RAG & LLaMA-3.",
    tags: ["FastAPI", "React", "LangChain", "LangGraph", "pgvector", "Redis", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/hasaanhameed/RepoMind" },
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/16VKyrWIHjr3qV9cQWYPNnSRAE0DtdMlb/view?usp=sharing",
      },
    ],
  },
  {
    n: "02",
    title: "DermaLens",
    blurb:
      "Healthcare app to detect skin diseases from images using a custom-trained PyTorch CNN, with RAG-powered dermatology chat and PDF report generation.",
    tags: ["Flutter", "FastAPI", "PyTorch", "LangChain", "Groq", "Supabase", "Redis", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/hasaanhameed/DermaLens" },
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/1CjjoZxgikopon-Jj6pUFnZxPU5q6x6N6/view?usp=sharing",
      },
    ],
  },
  {
    n: "03",
    title: "NustPulse",
    blurb:
      "Automated academic platform for NUST students to sync deadlines from the university LMS and receive Gmail notifications before due dates.",
    tags: ["React", "FastAPI", "Celery", "PostgreSQL", "Redis", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/hasaanhameed/NustPulse" },
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/1vlcM5c9kL944v4e7f5U9bLk51MGNbOHL/view?usp=sharing",
      },
      { label: "Live", href: "https://nustpulse.com" },
    ],
  },
  {
    n: "04",
    title: "NustMarkaz",
    blurb:
      "All-in-one campus platform for NUST students covering marketplace, carpooling, lost & found, events, societies, cafes, trips and donations.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "TailwindCSS", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/hasaanhameed/NustMarkaz" },
      { label: "Live", href: "https://nustmarkaz.com" },
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/1pDj8Z56lhYQMfWrYHFIIg4AwnCeGaVr2/view?usp=sharing",
      },
    ],
  },
  {
    n: "05",
    title: "HireReady",
    blurb:
      "AI-powered recruitment platform offering job seekers resume analysis & roadmaps, and recruiters automated applicant screening.",
    tags: ["React", "FastAPI", "Groq", "LangChain", "Supabase", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/hasaanhameed/HireReady" },
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/1hVRI5reZjGORLWSdN-LGNnr-OuiVdL1c/view?usp=sharing",
      },
    ],
  },
  {
    n: "06",
    title: "Botanique",
    blurb:
      "Mobile app that identifies plants via AI image recognition (PlantNet API) and generates care instructions using Groq LLM. Includes JWT auth, history tracking, Redis caching, and per-user rate limiting.",
    tags: ["Flutter", "FastAPI", "Groq", "PlantNet API", "Supabase", "Redis", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/hasaanhameed/Botanique" },
      {
        label: "Demo",
        href: "https://drive.google.com/file/d/1qX5248I873iGwC8LMp5otLbfs5e4Q0ze/view?usp=sharing",
      },
    ],
  },
];

function ContactButton({
  type,
  value,
  icon: Icon,
  label,
  activePopover,
  setActivePopover,
  showLabel,
}: {
  type: "email" | "phone";
  value: string;
  icon: any;
  label: string;
  activePopover: "email" | "phone" | null;
  setActivePopover: (type: "email" | "phone" | null) => void;
  showLabel?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isOpen = activePopover === type;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setActivePopover]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setActivePopover(isOpen ? null : type)}
        className={`inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          showLabel ? "gap-2" : "h-8 w-8 border hairline"
        } ${
          isOpen
            ? "bg-navy text-paper border-navy shadow-sm"
            : showLabel
              ? "hover:text-navy"
              : "hover:bg-navy hover:text-paper hover:border-navy"
        }`}
        aria-label={label}
      >
        <Icon className="h-3.5 w-3.5" />
        {showLabel && <span className="font-mono text-xs">{label}</span>}
      </button>
      {isOpen && (
        <div className="absolute bottom-11 left-1/2 -translate-x-1/2 z-30 bg-background/95 backdrop-blur-md border border-navy/20 shadow-md rounded-lg px-3 py-1.5 font-mono text-[11px] whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center gap-2">
            <span className="text-foreground">{value}</span>
            <div className="h-3 w-px bg-navy/20" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(value);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="text-[10px] text-navy font-bold uppercase tracking-wider hover:text-navy-deep cursor-pointer transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-navy/20 rotate-45" />
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [contactPopover, setContactPopover] = useState<"email" | "phone" | null>(null);
  const [footerPopover, setFooterPopover] = useState<"email" | "phone" | null>(null);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Detect if mobile
    const isMobile = window.innerWidth < 768;
    const duration = isMobile ? 300 : 600; // Much faster for mobile

    // Header offset (h-16 = 64px)
    const offset = 64;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    const startPosition = window.scrollY;
    const distance = offsetPosition - startPosition;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const time = Math.min(progress / duration, 1);

      // Linear easing for consistent speed
      window.scrollTo(0, startPosition + distance * time);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b hairline">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center justify-center">
          <nav className="flex items-center gap-1.5 md:gap-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`group relative px-3 py-1.5 md:px-4 md:py-2 font-raleway text-xs md:text-sm font-medium tracking-wider cursor-pointer transition-all duration-200 border rounded-sm ${
                  active === n.id
                    ? "text-navy border-navy bg-cream/40"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-rule hover:bg-cream/15"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO / ABOUT */}
      <section id="about" className="relative overflow-hidden">
        {/* Lottie background container */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center w-full">
          <div className="w-full h-full opacity-[0.15]">
            <Lottie
              animationData={particleAnimation}
              loop={true}
              renderer={"canvas" as any}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-navy mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-navy" />
            01 — About
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            Hasaan Hameed
            <br />A final year CS student at NUST building{" "}
            <em className="text-navy">AI-powered applications</em> that are intelligent, fast, and
            production-ready.
          </h1>
          <div className="mt-12 grid md:grid-cols-12 gap-8 items-start">
            <p className="md:col-span-7 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">
              Currently a final year Computer Science student at NUST (National University of
              Sciences and Technology). I am passionate about building AI-powered web and mobile
              applications, with hands-on experience integrating LLMs, RAG pipelines, and
              intelligent automation into production-ready products.
            </p>
            <div className="md:col-span-5 md:pl-8 md:border-l hairline space-y-4 font-mono text-xs">
              <Row k="Located" v="Rawalpindi, Pakistan" />
              <Row k="Education" v="B.S. Computer Science, NUST '27" />
              <div className="flex gap-2 pt-2">
                <IconLink href="https://github.com/hasaanhameed" label="GitHub">
                  <Github className="h-3.5 w-3.5" />
                </IconLink>
                <IconLink href="https://linkedin.com/in/hasaan-hameed" label="LinkedIn">
                  <Linkedin className="h-3.5 w-3.5" />
                </IconLink>
                <ContactButton
                  type="email"
                  value="hasaanhameed52@gmail.com"
                  icon={Mail}
                  label="Email"
                  activePopover={contactPopover}
                  setActivePopover={setContactPopover}
                />
                <ContactButton
                  type="phone"
                  value="+923275886850"
                  icon={Phone}
                  label="Phone"
                  activePopover={contactPopover}
                  setActivePopover={setContactPopover}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <Section
        id="experience"
        num="02"
        label="Experience"
        title={
          <>
            Places I've shipped <em className="text-navy">real things</em>.
          </>
        }
      >
        <ol className="mt-16 divide-y hairline border-t border-b hairline">
          {EXPERIENCE.map((e) => (
            <li
              key={e.role}
              className="grid md:grid-cols-12 gap-6 py-8 group hover:bg-cream/60 transition-colors px-2 -mx-2 rounded"
            >
              <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-muted-foreground pt-2">
                {e.period}
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-2xl md:text-3xl leading-tight">
                  {e.role}
                  <span className="text-muted-foreground"> — {e.org}</span>
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {e.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-muted-foreground leading-relaxed"
                    >
                      <span className="text-navy mt-1 shrink-0 text-base leading-none">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border hairline rounded-sm bg-background/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* SKILLS */}
      <Section
        id="skills"
        num="03"
        label="Skills"
        title={
          <>
            The toolkit, <em className="text-navy">grouped honestly</em>.
          </>
        }
      >
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((s) => (
            <div
              key={s.group}
              className="bg-background/40 backdrop-blur-md border hairline p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:bg-cream/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-serif text-2xl mb-6">{s.group}</h3>
              <ul className="space-y-2">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-mono text-sm text-muted-foreground"
                  >
                    <span className="text-navy">›</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        num="04"
        label="Projects"
        title={
          <>
            Recent projects, <em className="text-navy">practical value</em>.
          </>
        }
      >
        <div className="mt-16 border-t hairline">
          {PROJECTS.map((p) => (
            <div
              key={p.n}
              className="group grid md:grid-cols-12 gap-6 items-baseline py-10 border-b hairline hover:bg-cream/60 transition-colors px-2 -mx-2"
            >
              <div className="md:col-span-1 font-mono text-xs text-muted-foreground pt-3">
                {p.n}
              </div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl md:text-4xl leading-none">{p.title}</h3>
              </div>
              <p className="md:col-span-4 text-muted-foreground leading-relaxed">{p.blurb}</p>
              <div className="md:col-span-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="md:col-span-1 flex flex-col items-end gap-2 pt-2">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground hover:text-navy flex items-center gap-0.5 group/link transition-colors"
                  >
                    {l.label}{" "}
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t hairline mt-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <IconLink
                href="https://github.com/hasaanhameed"
                label="GitHub"
                className="flex items-center gap-2"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="font-mono text-xs">GitHub</span>
              </IconLink>
              <IconLink
                href="https://linkedin.com/in/hasaan-hameed"
                label="LinkedIn"
                className="flex items-center gap-2"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span className="font-mono text-xs">LinkedIn</span>
              </IconLink>
              <ContactButton
                type="email"
                value="hasaanhameed52@gmail.com"
                icon={Mail}
                label="Email"
                activePopover={footerPopover}
                setActivePopover={setFooterPopover}
                showLabel={true}
              />
              <ContactButton
                type="phone"
                value="+923275886850"
                icon={Phone}
                label="Phone"
                activePopover={footerPopover}
                setActivePopover={setFooterPopover}
                showLabel={true}
              />
            </div>
            <div className="h-px w-16 bg-rule" />
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              ©2026 Hasaan Hameed
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  num,
  label,
  title,
  children,
}: {
  id: string;
  num: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t hairline scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-24 md:py-32">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-navy mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-navy" />
          {num} — {label}
        </div>
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight max-w-4xl text-balance">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b hairline pb-2">
      <span className="uppercase tracking-widest text-muted-foreground text-[10px]">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}

function IconLink({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={
        className ||
        "inline-flex h-8 w-8 items-center justify-center rounded-full border hairline hover:bg-navy hover:text-paper hover:border-navy transition-colors"
      }
    >
      {children}
    </a>
  );
}
