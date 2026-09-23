import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({ head: () => ({ meta: [{ title: "Reset password — Video Speed Reader" }, { name: "description", content: "Request a secure Video Speed Reader password reset link." }, { property: "og:title", content: "Reset password — Video Speed Reader" }, { property: "og:description", content: "Request a password reset link." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: ForgotPassword });

function ForgotPassword() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); setError(""); const { error: authError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" }); if (authError) setError(authError.message); else setSent(true); }
  return <main className="paper-grid grid min-h-screen place-items-center px-5 py-12"><div className="w-full max-w-md border border-foreground bg-card p-7 shadow-[8px_8px_0_var(--foreground)] sm:p-9"><span className="grid size-11 place-items-center rounded-md bg-primary text-primary-foreground"><Mail /></span><h1 className="mt-7 font-display text-4xl">Reset your password.</h1>{sent ? <div className="mt-5"><p className="leading-7 text-muted-foreground">We sent a reset link to <strong className="text-foreground">{email}</strong>.</p><Button asChild variant="outline" className="mt-7 w-full"><Link to="/auth">Return to sign in</Link></Button></div> : <form onSubmit={submit} className="mt-6 space-y-4"><p className="text-sm leading-6 text-muted-foreground">Enter your account email and we’ll send you a secure reset link.</p><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-11" />{error && <p className="text-sm text-destructive">{error}</p>}<Button className="h-11 w-full">Send reset link</Button><Button asChild variant="ghost" className="w-full"><Link to="/auth"><ArrowLeft /> Back to sign in</Link></Button></form>}</div></main>;
}