import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, Compass, Layers3, Target } from "lucide-react";
import { MobileNavigation, Reveal } from "./interactions";

const bookingUrl = "https://calendly.com/yash-balakri/coffee-chat-yash-balakrishnan?month=2026-11";

const approach = [
  { title: "Personalized Guidance", description: "Support tailored to individual strengths, challenges, and academic goals.", icon: Compass },
  { title: "Stronger Foundations", description: "Develop the knowledge, problem-solving skills, and confidence needed for lasting progress.", icon: Layers3 },
  { title: "Goal-Oriented Preparation", description: "A focused approach that turns ambitious goals into actionable next steps.", icon: Target },
];

function Wordmark() {
  return <span className="wordmark">BalaPrep<span>.</span></span>;
}

function BookingLink({ children, compact = false }: { children: string; compact?: boolean }) {
  return (
    <a className={compact ? "nav-book" : "button"} href={bookingUrl} target="_blank" rel="noopener noreferrer">
      {children}<ArrowUpRight size={compact ? 15 : 18} aria-hidden />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function NavigationLinks() {
  return <><a href="#about">About</a><a href="#approach">Our Approach</a><BookingLink compact>Book a Call</BookingLink></>;
}

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header shell">
        <nav aria-label="Main navigation" className="nav">
          <a href="#top" aria-label="BalaPrep home"><Wordmark /></a>
          <div className="desktop-links"><NavigationLinks /></div>
          <MobileNavigation><NavigationLinks /></MobileNavigation>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-inner shell">
            <Reveal hero><p className="pill"><span /> Introducing BalaPrep</p></Reveal>
            <Reveal hero delay={0.06}>
              <h1 id="hero-title">Your potential.<br /><span>Our priority.</span></h1>
            </Reveal>
            <Reveal hero delay={0.12}>
              <p className="hero-copy">Personalized academic preparation designed to help students build confidence, sharpen their skills, and reach their goals.</p>
            </Reveal>
            <Reveal hero delay={0.18} className="hero-actions">
              <BookingLink>Book a Free Consultation</BookingLink>
              <a className="text-link" href="#about">Explore BalaPrep <ArrowDown size={15} aria-hidden /></a>
            </Reveal>
          </div>
          <div className="hero-foot shell" aria-hidden="true"><span>Academic preparation</span><span className="hero-rule" /><ArrowDownRight size={15} /></div>
        </section>

        <section id="about" className="section shell about" aria-labelledby="about-title">
          <Reveal className="about-copy">
            <p className="eyebrow"><span>01</span> About BalaPrep</p>
            <h2 id="about-title">Preparation<br />with purpose.</h2>
            <p className="section-copy">At BalaPrep, we believe meaningful progress starts with the right guidance. Our approach emphasizes personalized support, strong fundamentals, and the confidence to take on new challenges.</p>
          </Reveal>
          <Reveal delay={0.08} className="visual-wrap">
            <div className="visual" aria-hidden="true">
              <svg viewBox="0 0 480 260" preserveAspectRatio="xMidYMid slice" fill="none">
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="#5e8abb" strokeOpacity=".16" /></pattern>
                  <linearGradient id="trace" x1="90" y1="211" x2="385" y2="50" gradientUnits="userSpaceOnUse"><stop stopColor="#4a82bd" stopOpacity=".18" /><stop offset="1" stopColor="#b2d9ff" /></linearGradient>
                </defs>
                <rect width="480" height="260" fill="url(#grid)" />
                <path d="M82 205h80l60-57h59l89-88" stroke="url(#trace)" strokeWidth="2" />
                <path d="M82 225h94l61-57h59l89-88M82 185h66l60-57h58l89-88" stroke="#4a82bd" strokeOpacity=".23" />
                <g fill="#121c2a" stroke="#79a9da"><circle cx="162" cy="205" r="4" /><circle cx="222" cy="148" r="4" /><circle cx="281" cy="148" r="4" /></g>
                <circle cx="370" cy="60" r="15" fill="#4a82bd" fillOpacity=".14" stroke="#4a82bd" strokeOpacity=".45" />
                <circle cx="370" cy="60" r="5" fill="#b2d9ff" />
              </svg>
              <span className="visual-label"><span /> Progress, step by step</span>
            </div>
          </Reveal>
        </section>

        <section id="approach" className="section shell approach" aria-labelledby="approach-title">
          <Reveal>
            <p className="eyebrow"><span>02</span> Our Approach</p>
            <h2 id="approach-title">Built around your growth.</h2>
          </Reveal>
          <ol className="cards">
            {approach.map(({ title, description, icon: Icon }, index) => (
              <li key={title}>
                <Reveal stagger={(index + 1) * 0.07} className="card">
                  <div className="card-top"><span className="card-icon"><Icon size={20} strokeWidth={1.6} aria-hidden /></span><span className="card-number" aria-hidden="true">0{index + 1}</span></div>
                  <h3>{title}</h3><p>{description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="shell closing" aria-labelledby="closing-title">
          <div className="closing-panel">
            <Reveal>
              <p className="eyebrow"><span>03</span> Let’s Talk</p>
              <h2 id="closing-title">Ready to take the next step?</h2>
              <p className="section-copy">Let's talk about your goals and how BalaPrep can help you move forward.</p>
              <BookingLink>Schedule a Coffee Chat</BookingLink>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="shell footer">
        <a href="#top" aria-label="BalaPrep home"><Wordmark /></a>
        <small>© 2026 BalaPrep. All rights reserved.</small>
        <a className="text-link" href="#top">Back to top <ArrowUp size={14} aria-hidden /></a>
      </footer>
    </div>
  );
}
