import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, AudioLines, Check, Clock3, FileText, Languages, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Speed Reader — Video to transcript in three minutes" },
      { name: "description", content: "Upload a video and get a clean Chinese or English transcript in three minutes." },
      { property: "og:title", content: "Video Speed Reader" },
      { property: "og:description", content: "Upload your video, get a clean transcript in three minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: FileText, number: "01", title: "高準確度逐字稿", english: "High-accuracy transcripts", body: "Powered by OpenAI Whisper, with reliable Chinese and English transcription.", detail: "中文 · English" },
  { icon: Clock3, number: "02", title: "三分鐘交付", english: "Three-minute turnaround", body: "Your video is processed in the background. We’ll email you when it’s ready.", detail: "Process · Notify · Done" },
  { icon: ShieldCheck, number: "03", title: "可商用授權", english: "Commercial-use ready", body: "You own the transcript output. Edit it, publish it, and use it however you like.", detail: "Your content · Your rights" },
];

function Index() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="grid size-9 place-items-center rounded-md bg-foreground text-background"><AudioLines className="size-5" /></span>
            <span className="hidden sm:inline">Video Speed Reader</span>
          </Link>
          <Button asChild className="h-11 px-5 shadow-none"><Link to="/auth">Sign in / 登入 <ArrowRight /></Link></Button>
        </div>
      </header>

      <main>
        <section className="paper-grid relative border-b border-border">
          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary"><span className="h-px w-10 bg-primary" /> Video to text, without the wait</div>
              <h1 className="font-display text-6xl leading-[.9] sm:text-7xl lg:text-[6.5rem]">Video<br /><span className="text-primary">Speed</span> Reader</h1>
              <p className="mt-9 max-w-2xl text-2xl font-semibold leading-snug sm:text-3xl">上傳影片，三分鐘內拿到逐字稿。</p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Upload your video, get a clean transcript in three minutes.</p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button asChild size="lg" className="h-13 px-7 text-base shadow-none"><Link to="/auth">Start transcribing <ArrowRight /></Link></Button>
                <div className="flex items-center gap-2 text-sm font-semibold"><Check className="size-4 text-primary" /> Chinese & English</div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="absolute -left-5 -top-5 hidden border border-foreground bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[.14em] sm:block">3 min turnaround</div>
              <div className="border border-foreground bg-card shadow-[12px_12px_0_var(--foreground)]">
                <div className="flex items-center justify-between border-b border-foreground px-5 py-4">
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground"><AudioLines className="size-4" /></span><div><p className="text-sm font-bold">creator-interview.mp4</p><p className="text-xs text-muted-foreground">48:22 · Mandarin</p></div></div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">Ready</span>
                </div>
                <div className="space-y-5 p-5 sm:p-7">
                  <div className="flex gap-4"><span className="font-mono text-xs text-primary">00:00</span><p className="text-sm leading-6">我們今天要談的是，如何把一段長影片變成真正有價值的內容資產。</p></div>
                  <div className="flex gap-4"><span className="font-mono text-xs text-primary">00:12</span><p className="text-sm leading-6">The goal isn’t just transcription. It’s making every recorded idea searchable and reusable.</p></div>
                  <div className="flex gap-4"><span className="font-mono text-xs text-primary">00:27</span><p className="text-sm leading-6">從課程筆記、部落格文章，到團隊知識庫，一份乾淨的逐字稿就是起點。</p></div>
                  <div className="flex items-center gap-3 border-t border-border pt-5"><div className="flex h-8 flex-1 items-end gap-1">{[35,70,48,85,57,30,72,94,52,66,38,80,46,68,32,88,58,40].map((height, index) => <span key={index} className="w-full bg-primary/70" style={{ height: `${height}%` }} />)}</div><Languages className="size-5 text-muted-foreground" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-12 grid gap-4 lg:grid-cols-2"><h2 className="font-display text-4xl sm:text-5xl">From recording to<br />ready-to-use words.</h2><p className="max-w-lg self-end text-muted-foreground lg:justify-self-end">Built for creators, educators, and engineers who would rather use their ideas than retype them.</p></div>
          <div className="grid border-l border-t border-border md:grid-cols-3">
            {features.map(({ icon: Icon, number, title, english, body, detail }) => <article key={number} className="group min-h-80 border-b border-r border-border bg-card p-7 transition-colors hover:bg-secondary/50"><div className="flex items-start justify-between"><Icon className="size-7 text-primary" /><span className="font-mono text-xs text-muted-foreground">{number}</span></div><h3 className="mt-16 text-xl font-bold">{title}</h3><p className="mt-1 text-sm font-semibold text-primary">{english}</p><p className="mt-5 text-sm leading-6 text-muted-foreground">{body}</p><p className="mt-7 border-t border-border pt-4 text-xs font-bold uppercase tracking-[.12em]">{detail}</p></article>)}
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground bg-foreground text-background"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8"><p className="font-semibold">Video Speed Reader</p><p className="opacity-70">© 2026 Video Speed Reader</p></div></footer>
    </div>
  );
}
