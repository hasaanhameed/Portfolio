import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Terminal } from "lucide-react";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Software Engineer Intern",
    org: "Nimbus Labs",
    desc: "Shipped a distributed task scheduler in Go handling 12k jobs/min. Cut p99 latency 38% via batched writes and a custom backpressure layer.",
    stack: ["Go", "Postgres", "Redis", "gRPC"],
  },
  {
    period: "2023 — 2024",
    role: "Undergraduate Research Assistant",
    org: "Systems & Networking Lab",
    desc: "Co-authored a paper on adaptive congestion control for edge networks. Built a simulation harness in Rust used by three downstream projects.",
    stack: ["Rust", "Python", "LaTeX"],
  },
  {
    period: "2023",
    role: "Open Source Contributor",
    org: "Apache Arrow",
    desc: "Patched the C++ Parquet reader; landed perf fixes for nested list decoding that improved scan throughput on wide schemas.",
    stack: ["C++", "CMake", "Parquet"],
  },
];

const SKILLS = [
  { group: "Languages", items: ["TypeScript", "Python", "Go", "Rust", "C++", "SQL"] },
  { group: "Systems", items: ["Linux", "Docker", "Kubernetes", "gRPC", "Kafka", "Postgres"] },
  { group: "Frontend", items: ["React", "TanStack", "Tailwind", "WebGL", "Vite"] },
  { group: "ML / Data", items: ["PyTorch", "NumPy", "DuckDB", "Polars", "Ray"] },
  { group: "Practice", items: ["Distributed Systems", "Compilers", "Perf Eng.", "DX"] },
];

const PROJECTS = [
  {
    n: "01",
    title: "Lattice",
    blurb: "A query planner for time-series joins that beats DuckDB on skewed windows.",
    tags: ["Rust", "Arrow", "SIMD"],
    href: "#",
  },
  {
    n: "02",
    title: "Halfwave",
    blurb: "Browser-based DAW with sub-10ms scheduling using AudioWorklets and WASM DSP.",
    tags: ["WASM", "Rust", "Web Audio"],
    href: "#",
  },
  {
    n: "03",
    title: "paper.fyi",
    blurb: "An arXiv reader that re-renders math as accessible HTML and indexes proofs.",
    tags: ["TypeScript", "MathML", "Postgres"],
    href: "#",
  },
  {
    n: "04",
    title: "kvlite",
    blurb: "Educational LSM-tree key-value store with a teaching-grade visual debugger.",
    tags: ["Go", "BadgerDB", "TUI"],
    href: "#",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/New_York",
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b hairline">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("about")}
            className="flex items-center gap-2 font-mono text-xs tracking-tight"
          >
            <span className="h-2 w-2 rounded-full bg-navy" />
            <span className="text-foreground">arjun.dev</span>
            <span className="text-muted-foreground hidden sm:inline">/ portfolio</span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n, i) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`group relative px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === n.id ? "text-navy" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-muted-foreground/60 mr-1">0{i + 1}</span>
                {n.label}
                {active === n.id && (
                  <span className="absolute -bottom-px left-3 right-3 h-px bg-navy" />
                )}
              </button>
            ))}
          </nav>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            NYC {time}
          </div>
        </div>
      </header>

      {/* HERO / ABOUT */}
      <section id="about" className="relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-navy mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-navy" />
            01 — About
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            Arjun Mehta — a computer science student building{" "}
            <em className="text-navy">systems that feel</em> honest, fast, and a little bit
            opinionated.
          </h1>
          <div className="mt-12 grid md:grid-cols-12 gap-8 items-start">
            <p className="md:col-span-7 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">
              Currently a senior at Columbia studying distributed systems and programming
              languages. I like writing compilers in the morning, query planners in the afternoon,
              and indulging in pixel-perfect frontends on the weekend. Previously at Nimbus Labs
              and a systems research group.
            </p>
            <div className="md:col-span-5 md:pl-8 md:border-l hairline space-y-4 font-mono text-xs">
              <Row k="Located" v="Brooklyn, NY" />
              <Row k="Education" v="B.S. Computer Science, '26" />
              <Row k="Focus" v="Distributed Systems · PLs" />
              <Row k="Status" v={<span className="text-navy">Open to SWE roles, 2026</span>} />
              <div className="flex gap-2 pt-2">
                <IconLink href="#" label="GitHub"><Github className="h-3.5 w-3.5" /></IconLink>
                <IconLink href="#" label="LinkedIn"><Linkedin className="h-3.5 w-3.5" /></IconLink>
                <IconLink href="mailto:hi@arjun.dev" label="Email"><Mail className="h-3.5 w-3.5" /></IconLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <Section id="experience" num="02" label="Experience" title={<>Places I've shipped <em className="text-navy">real things</em>.</>}>
        <ol className="mt-16 divide-y hairline border-t border-b hairline">
          {EXPERIENCE.map((e) => (
            <li key={e.role} className="grid md:grid-cols-12 gap-6 py-8 group hover:bg-cream/60 transition-colors px-2 -mx-2 rounded">
              <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-muted-foreground pt-2">
                {e.period}
              </div>
              <div className="md:col-span-6">
                <h3 className="font-serif text-2xl md:text-3xl leading-tight">
                  {e.role}
                  <span className="text-muted-foreground"> — {e.org}</span>
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl">{e.desc}</p>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-1.5 items-start pt-2">
                {e.stack.map((s) => (
                  <span key={s} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border hairline rounded-sm">
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* SKILLS */}
      <Section id="skills" num="03" label="Skills" title={<>The toolkit, <em className="text-navy">grouped honestly</em>.</>}>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border hairline">
          {SKILLS.map((s) => (
            <div key={s.group} className="bg-background p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl">{s.group}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(s.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-3 font-mono text-sm">
                    <span className="text-navy">›</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="bg-navy text-paper p-8 flex flex-col justify-between">
            <Terminal className="h-5 w-5" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
                Currently learning
              </div>
              <p className="font-serif text-2xl leading-tight">
                Formal verification, MLIR, and the new TC39 Records & Tuples proposal.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" num="04" label="Projects" title={<>Selected work, <em className="text-navy">not exhaustive</em>.</>}>
        <div className="mt-16 border-t hairline">
          {PROJECTS.map((p) => (
            <a
              key={p.n}
              href={p.href}
              className="group grid md:grid-cols-12 gap-6 items-baseline py-10 border-b hairline hover:bg-cream/60 transition-colors px-2 -mx-2"
            >
              <div className="md:col-span-1 font-mono text-xs text-muted-foreground pt-3">{p.n}</div>
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl md:text-4xl leading-none">
                  {p.title}
                </h3>
              </div>
              <p className="md:col-span-4 text-muted-foreground leading-relaxed">{p.blurb}</p>
              <div className="md:col-span-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="md:col-span-1 flex justify-end pt-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border hairline group-hover:bg-navy group-hover:text-paper group-hover:border-navy transition-all group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t hairline mt-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-navy mb-6">
            — Reach out
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl text-balance">
            If you're hiring for systems, infra, or DX-heavy roles —{" "}
            <a href="mailto:hi@arjun.dev" className="text-navy underline decoration-1 underline-offset-8 hover:decoration-2">
              let's talk
            </a>
            .
          </h2>
          <div className="mt-16 flex flex-col md:flex-row justify-between gap-4 font-mono text-xs text-muted-foreground">
            <div>© 2026 Arjun Mehta. Built with care.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">github</a>
              <a href="#" className="hover:text-foreground">linkedin</a>
              <a href="#" className="hover:text-foreground">read.cv</a>
              <a href="mailto:hi@arjun.dev" className="hover:text-foreground">email</a>
            </div>
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

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border hairline hover:bg-navy hover:text-paper hover:border-navy transition-colors"
    >
      {children}
    </a>
  );
}
