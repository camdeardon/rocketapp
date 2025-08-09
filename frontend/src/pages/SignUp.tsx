import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.type === "checkbox" ? (e.target as any).checked : e.target.value;
      setForm((s) => ({ ...s, [k]: v }));
    };

  const validate = () => {
    if (!form.username.trim()) return "Username is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Valid email required.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.agree) return "You must accept the Terms.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) return setErr(v);
    setErr(null);
    setLoading(true);
    try {
      // 1) Create account
      await api.post("/api/accounts/register/", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      // 2) Get JWT and stash it
      const tok = await api.post("/api/accounts/token/", {
        username: form.username.trim(),
        password: form.password,
      });

      localStorage.setItem("access", tok.access);
      localStorage.setItem("refresh", tok.refresh);

      // 3) Route to app home or profile setup
      navigate("/dashboard"); // change as needed
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.error ||
        Object.values(e?.response?.data || {})?.[0] ||
        "Sign up failed. Please try again.";
      setErr(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full border-b border-oxford_blue/10">
        <div className="h-16 w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <img src="/brand-assets/rocketlogo.png" alt="Rocket" className="h-10 w-auto" />
          <button className="secondary-button" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </header>

      <main className="flex-1 grid md:grid-cols-2">
        {/* Left: pitch */}
        <section className="hidden md:flex flex-col justify-center p-10 lg:p-16 bg-gradient-to-br from-oxford_blue via-oxford_blue/90 to-oxford_blue/80 text-white">
          <h1 className="font-display text-4xl font-extrabold mb-4">Join Rocket</h1>
          <p className="text-white/90 text-lg">
            Match with collaborators on skills, experience, interests, and location. Build faster with the right people.
          </p>
          <div className="mt-8 grid gap-4">
            <Badge>AI‑powered matching</Badge>
            <Badge>Tinder‑style discovery</Badge>
            <Badge>Deep profiles & projects</Badge>
          </div>
        </section>

        {/* Right: form */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-oxford_blue mb-6">Create your account</h2>

            {err && (
              <div className="mb-4 rounded-xl border border-melon-400 bg-melon-900/40 px-4 py-3 text-oxford_blue">
                {err}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Username">
                <input
                  className="w-full rounded-xl border border-oxford_blue/15 px-4 py-3 outline-none focus:border-dark_cyan focus:ring-2 focus:ring-dark_cyan/30"
                  value={form.username}
                  onChange={onChange("username")}
                  autoComplete="username"
                  required
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  className="w-full rounded-xl border border-oxford_blue/15 px-4 py-3 outline-none focus:border-dark_cyan focus:ring-2 focus:ring-dark_cyan/30"
                  value={form.email}
                  onChange={onChange("email")}
                  autoComplete="email"
                  required
                />
              </Field>

              <Field label="Password">
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className="w-full rounded-xl border border-oxford_blue/15 px-4 py-3 pr-12 outline-none focus:border-dark_cyan focus:ring-2 focus:ring-dark_cyan/30"
                    value={form.password}
                    onChange={onChange("password")}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-battleship_gray hover:text-oxford_blue"
                    onClick={() => setShowPw((s) => !s)}
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-sm text-battleship_gray mt-1">Use at least 8 characters.</p>
              </Field>

              <Field label="Confirm Password">
                <input
                  type="password"
                  className="w-full rounded-xl border border-oxford_blue/15 px-4 py-3 outline-none focus:border-dark_cyan focus:ring-2 focus:ring-dark_cyan/30"
                  value={form.confirm}
                  onChange={onChange("confirm")}
                  autoComplete="new-password"
                  required
                />
              </Field>

              <label className="flex items-center gap-3 text-sm text-oxford_blue">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={onChange("agree")}
                  className="h-4 w-4 rounded border-oxford_blue/30 text-dark_cyan focus:ring-dark_cyan"
                />
                I agree to the <a className="underline hover:opacity-80" href="/terms">Terms</a> and{" "}
                <a className="underline hover:opacity-80" href="/privacy">Privacy</a>.
              </label>

              <button
                className="main-button w-full disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-4 text-sm text-battleship_gray">
              Already have an account?{" "}
              <button className="underline hover:text-oxford_blue" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-oxford_blue mb-1">{label}</span>
      {children}
    </label>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-sm">
      {children}
    </span>
  );
}
