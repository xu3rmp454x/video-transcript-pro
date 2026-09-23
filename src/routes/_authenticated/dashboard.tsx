import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AudioLines, LogOut, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({ head: () => ({ meta: [{ title: "Workspace — Video Speed Reader" }, { name: "description", content: "Upload videos and manage your transcripts." }, { property: "og:title", content: "Video Speed Reader workspace" }, { property: "og:description", content: "Your private video transcription workspace." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: Dashboard });

function Dashboard() {
  const navigate = useNavigate(); const inputRef = useRef<HTMLInputElement>(null); const [selected, setSelected] = useState<string | null>(null);
  async function signOut() { await supabase.auth.signOut(); await navigate({ to: "/auth", replace: true }); }
  return <div className="min-h-screen bg-background">
    <header className="border-b border-border bg-card"><div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between sm:px-8"><div className="flex min-w-0 items-center gap-3 font-bold"><span className="grid size-9 shrink-0 place-items-center rounded-md bg-foreground text-background"><AudioLines className="size-5" /></span><span className="truncate">Video Speed Reader</span></div><Button variant="outline" size="icon" className="size-11 shrink-0" onClick={signOut} aria-label="Sign out"><LogOut /></Button></div></header>
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
      <div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Video upload</p><h1 className="mt-2 font-display text-4xl sm:text-5xl">Turn recordings into words.</h1></div>
      <section className="mt-8 border border-foreground bg-card p-2 shadow-[6px_6px_0_var(--foreground)] sm:mt-10 sm:p-3 sm:shadow-[8px_8px_0_var(--foreground)]"><label htmlFor="video-upload" className="flex min-h-64 w-full cursor-pointer flex-col items-center justify-center border border-dashed border-border bg-background px-5 text-center transition-colors hover:bg-secondary/40"><span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"><UploadCloud /></span><h2 className="mt-5 text-lg font-bold">Drop a video here, or tap to upload</h2><p className="mt-2 text-sm text-muted-foreground">MP4, MOV, WebM, or M4V · up to 2 GB</p><span className="mt-5 min-h-11 rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background">Choose video</span></label><input id="video-upload" ref={inputRef} type="file" accept="video/mp4,video/quicktime,video/webm,video/x-m4v" className="sr-only" onChange={(event) => setSelected(event.target.files?.[0]?.name ?? null)} />{selected && <div className="grid grid-cols-1 gap-1 px-3 pb-1 pt-4 text-sm sm:grid-cols-[minmax(0,1fr)_auto]"><span className="min-w-0 break-words"><strong>Selected:</strong> {selected}</span><span className="text-muted-foreground">Upload processing is coming next.</span></div>}</section>
    </main>
  </div>;
}