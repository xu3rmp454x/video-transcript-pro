import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({ head: () => ({ meta: [{ title: "Choose a new password — Video Speed Reader" }, { name: "description", content: "Choose a new password for your Video Speed Reader account." }, { property: "og:title", content: "Choose a new password — Video Speed Reader" }, { property: "og:description", content: "Securely update your password." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: ResetPassword });

function ResetPassword() {
  const navigate = useNavigate(); const [password, setPassword] = useState(""); const [ready, setReady] = useState(false); const [error, setError] = useState("");
  useEffect(() => { const recovery = window.location.hash.includes("type=recovery"); void supabase.auth.getSession().then(({ data }) => setReady(recovery || Boolean(data.session))); const { data } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") setReady(true); }); return () => data.subscription.unsubscribe(); }, []);
  async function submit(event: FormEvent) { event.preventDefault(); const { error: authError } = await supabase.auth.updateUser({ password }); if (authError) setError(authError.message); else await navigate({ to: "/dashboard", replace: true }); }
  return <main className="paper-grid grid min-h-screen place-items-center px-5"><form onSubmit={submit} className="w-full max-w-md border border-foreground bg-card p-8 shadow-[8px_8px_0_var(--foreground)]"><KeyRound className="size-9 text-primary" /><h1 className="mt-6 font-display text-4xl">Choose a new password.</h1><p className="mt-3 text-sm text-muted-foreground">{ready ? "Use at least eight characters." : "Open the password reset link from your email to continue."}</p>{ready && <><Input className="mt-6 h-11" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />{error && <p className="mt-3 text-sm text-destructive">{error}</p>}<Button className="mt-4 h-11 w-full">Update password</Button></>}</form></main>;
}