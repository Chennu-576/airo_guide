"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  MailOpen, MousePointerClick, Eye, Link2,
  BarChart2, AlertCircle, Info, Star,
  Send, Inbox, Globe, Shield,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

const TOC = [
  { id: "how-it-works",   label: "How it works"         },
  { id: "open-tracking",  label: "Open tracking"        },
  { id: "click-tracking", label: "Click tracking"       },
  { id: "metrics",        label: "Metrics & benchmarks" },
  { id: "limitations",    label: "Limitations"          },
  { id: "settings",       label: "Settings"             },
];

function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-teal-400 hover:text-teal-600 bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0,y:-6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
            exit={{ opacity:0,y:-6,scale:0.97 }} transition={{ duration:0.15 }}
            className="absolute right-0 mt-2 w-68 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="e.g. Why is my open rate 0%?" />
            <button className="mt-2 w-full py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition">Ask</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TOCPanel({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-52 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On this page</span>
          </div>
          <nav className="py-1">
            {TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior:"smooth" }); }}
                className={`block px-4 py-1.5 text-xs transition-all ${
                  active === item.id
                    ? "text-teal-600 font-semibold bg-teal-50 border-r-2 border-teal-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function ScreenFrame({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {url && <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-400 font-mono truncate">🔒 {url}</div>}
      </div>
      {children}
    </div>
  );
}

function TrackingDashboard() {
  const [metric, setMetric] = useState<"opens"|"clicks"|"replies">("opens");
  const [expanded, setExpanded] = useState<number|null>(0);

  const ROWS = [
    { name:"SaaS Founders — Q1",    sent:240, opens:108, clicks:47, replies:22 },
    { name:"Cold Email — DevTools", sent:185, opens:74,  clicks:31, replies:14 },
    { name:"Re-engage — Mar 2026",  sent:120, opens:66,  clicks:18, replies:9  },
    { name:"Inbound Follow-up",     sent:95,  opens:61,  clicks:29, replies:31 },
  ];

  const CONFIG = {
    opens:   { key:"opens",   bar:"bg-teal-500",   pct:"text-teal-700",   active:"bg-teal-600 text-white border-teal-600",    idle:"text-teal-700 border-teal-300"    },
    clicks:  { key:"clicks",  bar:"bg-blue-500",   pct:"text-blue-700",   active:"bg-blue-600 text-white border-blue-600",    idle:"text-blue-700 border-blue-300"    },
    replies: { key:"replies", bar:"bg-violet-500", pct:"text-violet-700", active:"bg-violet-600 text-white border-violet-600",idle:"text-violet-700 border-violet-300" },
  };

  const c = CONFIG[metric];
  const pct = (n:number,d:number) => d ? `${Math.round((n/d)*100)}%` : "0%";

  return (
    <ScreenFrame url="app.360airo.com/reports/track-emails">
      <div className="grid grid-cols-4 border-b border-gray-100 bg-white">
        {[
          { label:"Sent",   val:"640", Icon:Send,             tc:"text-gray-600",   bg:"bg-gray-100"   },
          { label:"Opens",  val:"309", Icon:MailOpen,         tc:"text-teal-600",   bg:"bg-teal-50"    },
          { label:"Clicks", val:"125", Icon:MousePointerClick,tc:"text-blue-600",   bg:"bg-blue-50"    },
          { label:"Replies",val:"76",  Icon:Inbox,            tc:"text-violet-600", bg:"bg-violet-50"  },
        ].map(({ label,val,Icon,tc,bg }) => (
          <div key={label} className="px-4 py-3 border-r border-gray-100 last:border-r-0">
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`w-5 h-5 rounded-md ${bg} flex items-center justify-center`}>
                <Icon className={`w-3 h-3 ${tc}`} />
              </div>
              <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">{label}</span>
            </div>
            <p className="text-xl font-black text-gray-900">{val}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50 flex-wrap">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider mr-1">Show:</span>
        {(["opens","clicks","replies"] as const).map((m) => (
          <button key={m} onClick={() => setMetric(m)}
            className={`text-[10px] font-bold px-3 py-1 rounded-full border transition ${metric===m ? CONFIG[m].active : `bg-white ${CONFIG[m].idle}`}`}>
            {m.charAt(0).toUpperCase()+m.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white divide-y divide-gray-50">
        {ROWS.map((r,i) => {
          const val  = r[c.key as keyof typeof r] as number;
          const rate = Math.round((val/r.sent)*100);
          return (
            <div key={r.name}>
              <button onClick={() => setExpanded(expanded===i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50/70 transition text-left">
                <span className="text-xs font-semibold text-gray-800 flex-1 truncate">{r.name}</span>
                <span className="text-[10px] text-gray-400 w-8 text-right flex-shrink-0">{r.sent}</span>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  <motion.div initial={{ width:0 }} animate={{ width:`${rate}%` }}
                    transition={{ duration:0.6, delay:i*0.07 }} className={`h-full rounded-full ${c.bar}`} />
                </div>
                <span className={`text-[10px] font-black w-8 text-right flex-shrink-0 ${c.pct}`}>{rate}%</span>
              </button>
              <AnimatePresence>
                {expanded===i && (
                  <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }}
                    exit={{ height:0,opacity:0 }} transition={{ duration:0.18 }} className="overflow-hidden">
                    <div className="grid grid-cols-4 gap-2 px-4 pb-3 pt-1 bg-teal-50/20">
                      {[
                        { l:"Open rate",  v:pct(r.opens,r.sent),  color:"text-teal-700"   },
                        { l:"Click rate", v:pct(r.clicks,r.sent), color:"text-blue-700"   },
                        { l:"Reply rate", v:pct(r.replies,r.sent),color:"text-violet-700" },
                        { l:"CTOR",       v:pct(r.clicks,r.opens),color:"text-amber-700"  },
                      ].map(({ l,v,color }) => (
                        <div key={l} className="bg-white rounded-xl border border-gray-200 px-2 py-2 text-center">
                          <p className={`text-sm font-black ${color}`}>{v}</p>
                          <p className="text-[8px] text-gray-400 mt-0.5">{l}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </ScreenFrame>
  );
}

export default function TrackEmailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [activeToc, setActiveToc]     = useState("how-it-works");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin:"-20% 0px -70% 0px" }
      );
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const fadeUp = (delay = 0) => ({
    initial:    { opacity:0, y:8 },
    animate:    { opacity:1, y:0 },
    transition: { duration:0.35, delay },
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex">
            <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
              <div className="max-w-4xl">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-teal-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-teal-600 transition">Reports</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Track Emails</span>
                </nav>

                {/* Hero */}
                <motion.div {...fadeUp(0)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <MailOpen className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Track Email Opens &amp; Clicks</h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    360Airo automatically tracks every email open and link click across all your campaigns —
                    per campaign and per prospect in real time — using a tracking pixel and link wrapping.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Section 1: How it works ── */}
                <motion.section id="how-it-works" {...fadeUp(0.08)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">How it works</h2>
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      {
                        Icon:Link2, bg:"bg-teal-50", border:"border-teal-200", color:"text-teal-700",
                        title:"Pixel — open tracking",
                        desc:"A 1×1 invisible image is embedded in every email. When the recipient opens it, their client loads the image from 360Airo's server — recording the open, timestamp, and device.",
                      },
                      {
                        Icon:Link2, bg:"bg-blue-50", border:"border-blue-200", color:"text-blue-700",
                        title:"Link wrapping — click tracking",
                        desc:"Every URL is replaced with a 360Airo tracking URL before sending. A click redirects through 360Airo (logging the event) to the original destination — imperceptibly fast.",
                      },
                    ].map(({ Icon,bg,border,color,title,desc }) => (
                      <div key={title} className={`rounded-xl border ${border} ${bg} p-4`}>
                        <Icon className={`w-4 h-4 ${color} mb-2`} />
                        <p className={`text-sm font-bold ${color} mb-1`}>{title}</p>
                        <p className="text-xs text-gray-600 leading-snug">{desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <div className="bg-gray-900 rounded-xl px-4 py-3">
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold mb-2">Pixel (in email HTML)</p>
                      <code className="text-[10px] text-emerald-400 font-mono">
                        {`<img src="https://track.360airo.com/`}<span className="text-amber-300">px/abc123</span>{`" width="1" height="1" />`}
                      </code>
                    </div>
                    <div className="bg-gray-900 rounded-xl px-4 py-3">
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold mb-2">Wrapped tracking link</p>
                      <code className="text-[10px] text-emerald-400 font-mono break-all">
                        {`https://track.360airo.com/click/`}<span className="text-amber-300">def456</span>{`?dest=360airo.com/pricing`}
                      </code>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-xs text-teal-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>Both are <strong>enabled by default</strong>. Disable either under <strong>Campaign Settings → Content Settings</strong> or globally in <strong>Settings → Tracking</strong>.</span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 2: Open tracking ── */}
                <motion.section id="open-tracking" {...fadeUp(0.1)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Eye className="w-4.5 h-4.5 text-teal-600" /> Open tracking
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Each pixel has a unique URL per prospect per email. Every image load registers an open event instantly. 360Airo records:
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {[
                      ["First open time",   "Exact timestamp of the first open"],
                      ["Open count",        "Total opens — repeated opens signal high interest"],
                      ["Device & client",   "Desktop/mobile + email client from request headers"],
                      ["Location (approx)", "City/country from the IP address that loaded the pixel"],
                    ].map(([l,d],i) => (
                      <div key={l} className={`grid grid-cols-[150px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="font-semibold text-gray-600">{l}</span>
                        <span className="text-gray-500">{d}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 3: Click tracking ── */}
                <motion.section id="click-tracking" {...fadeUp(0.12)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MousePointerClick className="w-4.5 h-4.5 text-blue-600" /> Click tracking
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Every link is wrapped before delivery. The redirect is invisible — under 100 ms. 360Airo records:
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {[
                      ["Which link clicked", "Exact original destination URL — see which CTA each prospect clicked"],
                      ["Click timestamp",    "Date and time of each click event"],
                      ["Unique vs total",    "Unique = first click per prospect · Total = all clicks including re-clicks"],
                      ["Click-to-open",      "Whether the click came from a previously-opened email — identifies hot prospects"],
                    ].map(([l,d],i) => (
                      <div key={l} className={`grid grid-cols-[150px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="font-semibold text-gray-600">{l}</span>
                        <span className="text-gray-500">{d}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 4: Metrics ── */}
                <motion.section id="metrics" {...fadeUp(0.14)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <BarChart2 className="w-4.5 h-4.5 text-violet-600" /> Metrics &amp; benchmarks
                  </h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Toggle between Opens / Clicks / Replies in the dashboard below. Click any row to expand its full rate breakdown.
                  </p>

                  <div className="mb-5"><TrackingDashboard /></div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Metric definitions &amp; cold-email benchmarks</p>
                    </div>
                    {[
                      ["Open Rate",   "Unique opens ÷ delivered × 100",    "≥ 40%", "text-teal-700"   ],
                      ["Click Rate",  "Unique clicks ÷ delivered × 100",   "≥ 5%",  "text-blue-700"   ],
                      ["CTOR",        "Unique clicks ÷ unique opens × 100","≥ 20%", "text-amber-700"  ],
                      ["Reply Rate",  "Replies ÷ delivered × 100",         "≥ 8%",  "text-violet-700" ],
                      ["Bounce Rate", "Bounces ÷ attempted × 100",         "< 3%",  "text-red-600"    ],
                    ].map(([metric,formula,bench,color],i) => (
                      <div key={metric} className={`grid grid-cols-[90px_1fr_55px] items-center px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className={`font-bold ${color}`}>{metric}</span>
                        <code className="text-[10px] text-gray-500 font-mono">{formula}</code>
                        <span className={`text-[10px] font-black text-right ${color}`}>{bench}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 5: Limitations ── */}
                <motion.section id="limitations" {...fadeUp(0.16)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-500" /> Limitations
                  </h2>
                  <div className="space-y-2.5">
                    {[
                      { tag:"High impact",   tagColor:"bg-red-100 text-red-700",    title:"Apple Mail Privacy Protection (MPP)",    desc:"iOS 15+ pre-fetches pixels regardless of actual reads, inflating open rates. 360Airo flags MPP opens separately so you can filter them." },
                      { tag:"Medium impact", tagColor:"bg-amber-100 text-amber-700", title:"Security gateways (Proofpoint, Mimecast)", desc:"Enterprise scanners follow all links to check for malware, logging false click events. 360Airo detects bot-like patterns and labels them separately." },
                      { tag:"Medium impact", tagColor:"bg-amber-100 text-amber-700", title:"Images disabled by default (Outlook)",     desc:"If images never load, the pixel never fires — even if the email is read. Open rates undercount actual readership in Outlook-heavy environments." },
                      { tag:"Info",          tagColor:"bg-gray-100 text-gray-600",   title:"Replies tracked via inbox — not pixel",   desc:"Reply rate is tracked by monitoring your connected inbox, not by pixel. Ensure your sending and reply-receiving account are the same in Settings." },
                    ].map((item,i) => (
                      <div key={i} className="flex gap-3 p-4 rounded-xl border border-gray-200 hover:shadow-sm transition">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <p className="text-xs font-bold text-gray-900">{item.title}</p>
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 6: Settings ── */}
                <motion.section id="settings" {...fadeUp(0.18)} className="mb-10">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe className="w-4.5 h-4.5 text-violet-600" /> Settings
                  </h2>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-4">
                    {[
                      ["Open tracking",  "Campaign Settings → Content Settings → Track Opens",   "On by default"              ],
                      ["Click tracking", "Campaign Settings → Content Settings → Track Clicks",  "On by default"              ],
                      ["Global default", "Settings → Tracking",                                  "Applies to all new campaigns"],
                      ["Custom domain",  "Settings → Tracking → Custom Tracking Domain",         "Requires DNS CNAME"         ],
                    ].map(([setting,where,note],i) => (
                      <div key={setting} className={`grid grid-cols-[130px_1fr_auto] items-start gap-3 px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="font-semibold text-gray-700">{setting}</span>
                        <span className="text-gray-500">{where}</span>
                        <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">{note}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700 mb-3">
                    <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span><strong>Deliverability tip:</strong> Set up a custom tracking domain (e.g. <code className="bg-white px-1 py-0.5 rounded text-[10px]">track.yourdomain.com</code>) to brand your tracking links and avoid shared-domain reputation issues.</span>
                  </div>

                  <div className="flex items-start gap-2.5 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-xs text-teal-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-teal-500" />
                    <span><strong>Pro tip:</strong> A prospect with 3+ opens and a link click but no reply is warm — they're actively researching. Prioritise these for personalised manual follow-ups over prospects with zero engagement.</span>
                  </div>
                </motion.section>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 14 days ago</span>
                </div>

              </div>
            </main>
            <TOCPanel active={activeToc} />
          </div>
        </div>
      </div>
    </div>
  );
}