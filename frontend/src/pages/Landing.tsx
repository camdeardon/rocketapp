import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER (full width) */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-oxford_blue/5">
        <div className="h-16 w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <img src="/brand-assets/rocketlogo.png" alt="Rocket" className="h-10 w-auto" />
          <div className="flex items-center gap-3">
            <button className="secondary-button" onClick={() => navigate("/login")}>Sign In</button>
            <button className="main-button" onClick={() => navigate("/signup")}>Get Started</button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO (edge-to-edge band) */}
        <section className="relative overflow-hidden w-full">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-oxford_blue/90 via-oxford_blue/80 to-oxford_blue/70" />
          <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-sky_blue/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-dark_cyan/30 blur-3xl" />

          <div className="w-full px-4 sm:px-6 lg:px-10 pt-16 pb-20 grid gap-10 md:grid-cols-2 items-center">
            <div className="text-white space-y-6">
              <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight">
                Build Your Dream Team
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Match on skills, experience, interests, hobbies, and location — find collaborators who truly fit.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="main-button" onClick={() => navigate("/signup")}>Get Started</button>
                <button className="outline-button border-white/40 text-white hover:bg-white/10">Learn More</button>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70 pt-2">
                <span className="inline-block h-2 w-2 rounded-full bg-pistachio" />
                <span>AI‑powered matching across multiple dimensions</span>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <img
                src="/brand-assets/rocketicon.png"
                alt="Rocket"
                className="h-72 w-auto drop-shadow-[0_8px_40px_rgba(134,206,236,.45)] animate-float"
              />
            </div>
          </div>

          {/* shape divider to white section */}
          <svg className="block w-full text-white" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
            <path fill="currentColor" d="M0,80L1440,0L1440,80L0,80Z" />
          </svg>
        </section>

        {/* FEATURES (full width grid, responsive gutters) */}
        <section className="py-14 bg-white w-full">
          <div className="w-full px-4 sm:px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-oxford_blue text-left mb-8">Why choose Rocket?</h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <FeatureCard icon="🚀" title="AI‑Powered Matching"
                           desc="We analyze skills, experience, interests & location to surface the best collaborators." />
              <FeatureCard icon="🤝" title="Real Connections"
                           desc="Tinder‑style swipes plus deep profiles to find people you’d actually build with." />
              <FeatureCard icon="🧭" title="Founder‑Friendly"
                           desc="For builders at ideation or growth — meet co‑founders, joiners, and specialists." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (edge band, no center clamp) */}
        <section className="py-16 bg-tea_green-900 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-10">
            <h2 className="text-3xl font-bold text-oxford_blue mb-10">How it works</h2>
            <ol className="grid gap-6 md:grid-cols-4">
              <Step number="1" title="Create Profile" desc="Share goals, skills, interests & location." />
              <Step number="2" title="Get Matches" desc="Our engine ranks candidates across dimensions." />
              <Step number="3" title="Connect" desc="Message, swap calendars, and compare fit." />
              <Step number="4" title="Collaborate" desc="Kick off projects and track momentum." />
            </ol>
          </div>
        </section>

        {/* CTA (full width dark band) */}
        <section className="py-16 bg-oxford_blue text-white text-center w-full">
          <div className="w-full px-4 sm:px-6 lg:px-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to find your perfect match?</h2>
            <p className="text-white/90 mb-8">Join ambitious builders and meet the people who make ideas real.</p>
            <button className="main-button" onClick={() => navigate("/signup")}>Get Started Now</button>
          </div>
        </section>
      </main>

      {/* FOOTER (full width) */}
      <footer className="bg-white border-t border-oxford_blue/10 py-8 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 text-left">
          <img src="/brand-assets/rocketlogo.png" alt="Rocket Logo" className="h-10 w-auto mb-3" />
          <p className="text-battleship_gray">Supporting entrepreneurship through better matches.</p>
          <p className="text-xs text-battleship_gray mt-2">
            © {new Date().getFullYear()} Rocket. All rights reserved. British designed 🇬🇧 made in Toronto 🇨🇦
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white shadow-brand border border-oxford_blue/5 p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-oxford_blue mb-2">{title}</h3>
      <p className="text-battleship_gray">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <li className="relative rounded-2xl bg-white shadow-brand border border-oxford_blue/5 p-6">
      <div className="absolute -top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-tr from-dark_cyan to-sky_blue text-white font-bold flex items-center justify-center shadow-md">
        {number}
      </div>
      <h4 className="mt-8 text-lg font-semibold text-oxford_blue">{title}</h4>
      <p className="text-battleship_gray mt-1">{desc}</p>
    </li>
  );
}