import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, AudioLines, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in — Video Speed Reader" },
    { name: "description", content: "Sign in or create your Video Speed Reader account." },
    { property: "og:title", content: "Sign in — Video Speed Reader" },
    { property: "og:description", content: "Access your transcript workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError(""); setMessage("");
    if (mode === "signin") {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) setError(authError.message); else await navigate({ to: "/dashboard", replace: true });
    } else {
      const { data, error: authError } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/auth" } });
      if (authError) setError(authError.message);
      else if (!data.session) setMessage("Check your inbox to confirm your email, then return to sign in.");
      else await navigate({ to: "/dashboard", replace: true });
    }
    setLoading(false);
  }

  async function signInWithGoogle() {
    setLoading(true); setError("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (result.error) { setError(result.error.message); setLoading(false); return; }
    if (!result.redirected) await navigate({ to: "/dashboard", replace: true });
  }

  return <main className="grid min-h-screen bg-background lg:grid-cols-[.8fr_1.2fr]">
    <section className="flex flex-col border-r border-border px-5 py-6 sm:px-10 lg:px-14">
      <Link to="/" className="flex w-fit items-center gap-2 text-sm font-semibold"><ArrowLeft className="size-4" /> Back home</Link>
      <div className="my-auto w-full max-w-md self-center py-12">
        <div className="mb-8 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-md bg-foreground text-background"><AudioLines /></span><span className="font-bold">Video Speed Reader</span></div>
        <h1 className="font-display text-4xl">{mode === "signin" ? "Welcome back." : "Create your account."}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{mode === "signin" ? "Your transcripts are waiting." : "Start turning recordings into useful text."}</p>
        <Button type="button" variant="outline" className="mt-8 h-11 w-full shadow-none" onClick={signInWithGoogle} disabled={loading}>Continue with Google</Button>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />OR CONTINUE WITH EMAIL<span className="h-px flex-1 bg-border" /></div>
        <form className="space-y-4" onSubmit={submit}>
          <div><label className="mb-2 block text-sm font-semibold" htmlFor="email">Email</label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 bg-card" placeholder="you@example.com" /></div>
          <div><div className="mb-2 flex justify-between"><label className="text-sm font-semibold" htmlFor="password">Password</label>{mode === "signin" && <Link to="/forgot-password" className="text-xs font-semibold text-primary">Forgot password?</Link>}</div><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 bg-card pr-11" placeholder="At least 8 characters" /><Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>
          {error && <p className="border-l-2 border-destructive pl-3 text-sm text-destructive">{error}</p>}
          {message && <p className="border-l-2 border-primary pl-3 text-sm">{message}</p>}
          <Button className="h-11 w-full shadow-none" disabled={loading}>{loading && <Loader2 className="animate-spin" />}{mode === "signin" ? "Sign in / 登入" : "Create account"}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">{mode === "signin" ? "New here?" : "Already have an account?"} <button className="font-semibold text-foreground underline underline-offset-4" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setMessage(""); }}>{mode === "signin" ? "Create an account" : "Sign in"}</button></p>
      </div>
    </section>
    <section className="paper-grid hidden items-center justify-center p-12 lg:flex"><div className="max-w-xl"><p className="font-display text-5xl leading-tight">“The recording is where the idea starts. The transcript is where it becomes useful.”</p><div className="mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-[.15em] text-primary"><span className="h-px w-12 bg-primary" /> Ready in about three minutes</div></div></section>
  </main>;
}