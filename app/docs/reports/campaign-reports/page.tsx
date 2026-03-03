"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  Mail, MailOpen, MousePointerClick, TrendingUp,
  BarChart2, Inbox, RefreshCw, Shield, Zap,
  Star, AlertCircle, Info, Send, Filter,
  Activity, Eye,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── Table of Contents ──
const TOC = [
  { id: "overview",       label: "Overview"          },
  { id: "how-to-access",  label: "How to access"     },
  { id: "report-metrics", label: "Report metrics"    },
  { id: "live-preview",   label: "Live preview"      },
  { id: "tips",           label: "Tips & best uses"  },
];

// ── Ask AI ──
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-teal-400 hover:text-teal-600 bg-white shadow-sm transition-colors"
      >
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-68 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50"
          >
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input
              autoFocus
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="e.g. Why is my open rate low?"
            />
            <button className="mt-2 w-full py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition">
              Ask
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── TOC Panel ──
function TOCPanel({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-52 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              On this page
            </span>
          </div>
          <nav className="py-1">
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block px-4 py-1.5 text-xs transition-all ${
                  active === item.id
                    ? "text-teal-600 font-semibold bg-teal-50 border-r-2 border-teal-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// ── Campaign report live preview widget ──
function CampaignReportPreview() {
  const [activeTab, setActiveTab] = useState<"overview" | "activity">("overview");

  const campaigns = [
    { name: "SaaS Founders — Q1",    sent: 2400, opens: 1128, clicks: 312, replies: 198 },
    { name: "Cold Email — DevTools", sent: 1850, opens: 870,  clicks: 204, replies: 143 },
    { name: "Re-engage — Mar 2026",  sent: 1200, opens: 696,  clicks: 171, replies: 89  },
    { name: "Inbound Follow-up",     sent: 950,  opens: 627,  clicks: 248, replies: 301 },
  ];

  const activity = [
    { action: "Email opened",   prospect: "Sarah M. · Notion",     time: "2m ago",  dot: "bg-teal-500"    },
    { action: "Link clicked",   prospect: "Tom E. · Vercel",       time: "8m ago",  dot: "bg-blue-500"    },
    { action: "Reply received", prospect: "Priya N. · Figma",      time: "15m ago", dot: "bg-violet-500"  },
    { action: "Email opened",   prospect: "James P. · Linear",     time: "22m ago", dot: "bg-teal-500"    },
    { action: "Meeting booked", prospect: "Anika R. · CloudWorks", time: "1h ago",  dot: "bg-emerald-500" },
    { action: "Reply received", prospect: "Dev K. · CredFlow",     time: "2h ago",  dot: "bg-violet-500"  },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Browser bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-400 font-mono truncate">
          🔒 app.360airo.com/reports/campaigns
        </div>
      </div>

      {/* Aggregate stats */}
      <div className="grid grid-cols-4 border-b border-gray-100 bg-white">
        {[
          { label: "Sent",    val: "6.4K", Icon: Send,              tc: "text-gray-600",   bg: "bg-gray-100"  },
          { label: "Opens",   val: "3.3K", Icon: MailOpen,          tc: "text-teal-600",   bg: "bg-teal-50"   },
          { label: "Clicks",  val: "935",  Icon: MousePointerClick, tc: "text-blue-600",   bg: "bg-blue-50"   },
          { label: "Replies", val: "731",  Icon: Inbox,             tc: "text-violet-600", bg: "bg-violet-50" },
        ].map(({ label, val, Icon, tc, bg }) => (
          <div key={label} className="px-3 py-3 border-r border-gray-100 last:border-r-0">
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`w-5 h-5 rounded-md ${bg} flex items-center justify-center`}>
                <Icon className={`w-3 h-3 ${tc}`} />
              </div>
              <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">
                {label}
              </span>
            </div>
            <p className="text-xl font-black text-gray-900">{val}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50">
        {(["overview", "activity"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition ${
              activeTab === tab
                ? "text-teal-600 border-b-2 border-teal-500 bg-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab === "overview" ? "Campaigns" : "Live Activity"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white">
        {activeTab === "overview" ? (
          <div className="divide-y divide-gray-50">
            <div className="grid grid-cols-[1fr_44px_44px_44px_44px] gap-2 px-4 py-2 bg-gray-50">
              {["Campaign", "Sent", "Open%", "Click%", "Reply%"].map((h) => (
                <span
                  key={h}
                  className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-right first:text-left"
                >
                  {h}
                </span>
              ))}
            </div>
            {campaigns.map((c, i) => {
              const openR  = Math.round((c.opens   / c.sent) * 100);
              const clickR = Math.round((c.clicks  / c.sent) * 100);
              const repR   = Math.round((c.replies / c.sent) * 100);
              return (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_44px_44px_44px_44px] items-center gap-2 px-4 py-2.5 hover:bg-gray-50/60 transition"
                >
                  <span className="text-xs font-semibold text-gray-800 truncate">{c.name}</span>
                  <span className="text-[10px] text-gray-500 text-right">{(c.sent / 1000).toFixed(1)}k</span>
                  <span className="text-[10px] font-black text-teal-700 text-right">{openR}%</span>
                  <span className="text-[10px] font-black text-blue-700 text-right">{clickR}%</span>
                  <span className="text-[10px] font-black text-violet-700 text-right">{repR}%</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.dot}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-gray-800">{a.action}</span>
                  <span className="text-xs text-gray-400 ml-2">{a.prospect}</span>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ──
export default function CampaignReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [activeToc, setActiveToc]     = useState("overview");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const observers: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 8 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
  });

  const stats = [
    { Icon: MailOpen,   value: "98%",  label: "Deliverability rate"   },
    { Icon: TrendingUp, value: "3x",   label: "Higher response rates" },
    { Icon: Activity,   value: "Live", label: "Real-time tracking"    },
    { Icon: RefreshCw,  value: "Auto", label: "Inbox rotation"        },
  ];

  const steps = [
    {
      num: "01",
      title: "Go to Reports",
      desc: 'Click "Reports" in your 360Airo sidebar to open the reporting dashboard.',
    },
    {
      num: "02",
      title: "Select a Campaign",
      desc: "Choose any active or completed email campaign to view its detailed performance breakdown.",
    },
    {
      num: "03",
      title: "Analyse your metrics",
      desc: "Review opens, clicks, replies, bounces, and deliverability — all updated in real time.",
    },
    {
      num: "04",
      title: "Optimise & iterate",
      desc: "Use AI insights to spot what's working, adjust subject lines or sequences, and relaunch with confidence.",
    },
  ];

  const metrics = [
    {
      Icon: Send,              bg: "bg-gray-100",    ic: "text-gray-600",
      label: "Emails Sent",
      desc:  "Total emails delivered across all connected inboxes. 360Airo's inbox rotation scales volume safely without risking your domain reputation.",
    },
    {
      Icon: Eye,               bg: "bg-teal-50",     ic: "text-teal-600",
      label: "Open Rate",
      desc:  "Powered by pixel tracking. Target ≥ 40% — 360Airo's AI-generated subject lines and dynamic variables are built to get you there.",
    },
    {
      Icon: MousePointerClick, bg: "bg-blue-50",     ic: "text-blue-600",
      label: "Click-Through Rate",
      desc:  "Tracks every prospect who clicked a tracked link. 360Airo wraps all URLs automatically — no manual setup needed.",
    },
    {
      Icon: Inbox,             bg: "bg-violet-50",   ic: "text-violet-600",
      label: "Reply Rate",
      desc:  "Replies tracked via your connected inbox. 360Airo's AI-personalised icebreakers consistently push reply rates from 5% to 18%+.",
    },
    {
      Icon: AlertCircle,       bg: "bg-red-50",      ic: "text-red-500",
      label: "Bounce Rate",
      desc:  "Hard + soft bounces as a % of attempted sends. 360Airo's built-in email verification keeps this under 3% before every campaign fires.",
    },
    {
      Icon: Shield,            bg: "bg-emerald-50",  ic: "text-emerald-600",
      label: "Deliverability",
      desc:  "Inbox placement rate across all sends. The warmup AI agent and inbox rotation in 360Airo keep deliverability consistently above 98%.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex">
            <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
              <div className="max-w-4xl">

                {/* ── Breadcrumb ── */}
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-teal-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-teal-600 transition">Reports</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Campaign Reports</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div {...fadeUp(0)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <BarChart2 className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Campaign Reports
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Measure every cold email campaign in real time — opens, clicks, replies, bounces,
                    and deliverability. 360Airo turns raw engagement data into clear actions so your
                    team closes more deals, faster.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Section 1: Overview ── */}
                <motion.section id="overview" {...fadeUp(0.06)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Overview</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {stats.map(({ Icon, value, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center text-center gap-1.5 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition"
                      >
                        <div className="p-2 rounded-lg bg-teal-50">
                          <Icon className="w-4 h-4 text-teal-600" />
                        </div>
                        <p className="text-xl font-black text-gray-900">{value}</p>
                        <p className="text-[11px] text-gray-400 font-medium leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2.5 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-xs text-teal-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      360Airo tracks every touchpoint — from the first send to a booked meeting — across{" "}
                      <strong>unlimited email accounts</strong> with inbox rotation, so your domain stays
                      healthy as you scale.
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 2: How to access ── */}
                <motion.section id="how-to-access" {...fadeUp(0.08)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">How to access</h2>
                  <div className="space-y-4">
                    {steps.map((s, i) => (
                      <motion.div
                        key={s.num}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + i * 0.07 }}
                        className="flex gap-4 items-start"
                      >
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {s.num}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 3: Report metrics ── */}
                <motion.section id="report-metrics" {...fadeUp(0.1)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-teal-600" /> Report metrics
                  </h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Every campaign report in 360Airo includes these six core metrics — tracked
                    per campaign and per prospect in real time.
                  </p>

                  {/* Benchmarks table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-4">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">
                        Core email metrics &amp; 360Airo benchmarks
                      </p>
                    </div>
                    {[
                      ["Open Rate",      "Unique opens ÷ delivered × 100",     "≥ 40%", "text-teal-700"    ],
                      ["Click Rate",     "Unique clicks ÷ delivered × 100",    "≥ 5%",  "text-blue-700"    ],
                      ["Reply Rate",     "Replies ÷ delivered × 100",          "≥ 8%",  "text-violet-700"  ],
                      ["Bounce Rate",    "Bounces ÷ attempted × 100",          "< 3%",  "text-red-600"     ],
                      ["Deliverability", "Inbox placement ÷ sent × 100",       "≥ 98%", "text-emerald-700" ],
                      ["CTOR",           "Unique clicks ÷ unique opens × 100", "≥ 20%", "text-amber-700"   ],
                    ].map(([metric, formula, bench, color], i) => (
                      <div
                        key={metric}
                        className={`grid grid-cols-[100px_1fr_52px] items-center px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <span className={`font-bold ${color}`}>{metric}</span>
                        <code className="text-[10px] text-gray-500 font-mono">{formula}</code>
                        <span className={`text-[10px] font-black text-right ${color}`}>{bench}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric cards */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {metrics.map(({ Icon, bg, ic, label, desc }) => (
                      <div
                        key={label}
                        className="flex gap-3 p-4 rounded-xl border border-gray-200 hover:shadow-sm transition"
                      >
                        <div className={`p-2 rounded-lg ${bg} flex-shrink-0 self-start`}>
                          <Icon className={`w-3.5 h-3.5 ${ic}`} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 mb-0.5">{label}</p>
                          <p className="text-xs text-gray-500 leading-snug">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 4: Live preview ── */}
                <motion.section id="live-preview" {...fadeUp(0.12)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Live preview</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Switch between the <strong>Campaigns tab</strong> for aggregate stats and the{" "}
                    <strong>Live Activity tab</strong> for a real-time feed of opens, clicks, and replies
                    as they happen.
                  </p>
                  <CampaignReportPreview />
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 5: Tips ── */}
                <motion.section id="tips" {...fadeUp(0.14)} className="mb-10">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-4.5 h-4.5 text-amber-500" /> Tips &amp; best uses
                  </h2>
                  <div className="space-y-2.5">
                    {[
                      {
                        Icon:  TrendingUp,
                        bg:    "bg-teal-50",
                        ic:    "text-teal-600",
                        title: "Low open rate? Fix the subject line first",
                        desc:  "If open rate is below 30%, the issue is almost always the subject line or sender name — not the body copy. Use 360Airo's AI to A/B test two variants before relaunching.",
                      },
                      {
                        Icon:  RefreshCw,
                        bg:    "bg-blue-50",
                        ic:    "text-blue-600",
                        title: "Use inbox rotation to scale safely",
                        desc:  "360Airo automatically rotates sends across all your connected email accounts, keeping each domain's daily volume low and deliverability consistently above 98%.",
                      },
                      {
                        Icon:  Zap,
                        bg:    "bg-violet-50",
                        ic:    "text-violet-600",
                        title: "Watch CTOR — not just clicks",
                        desc:  "A high click rate with a low CTOR means people click without reading. Rewrite the email body to build context before your CTA — 360Airo's AI SDR can draft this for you.",
                      },
                      {
                        Icon:  AlertCircle,
                        bg:    "bg-amber-50",
                        ic:    "text-amber-600",
                        title: "Bounces above 3%? Pause and verify",
                        desc:  "360Airo verifies emails before every send, but if bounces spike, pause the campaign immediately and re-verify your list under Lead Finder → Verification.",
                      },
                    ].map(({ Icon, bg, ic, title, desc }) => (
                      <div
                        key={title}
                        className="flex gap-3 p-4 rounded-xl border border-gray-200 hover:shadow-sm transition"
                      >
                        <div className={`p-2 rounded-lg ${bg} flex-shrink-0 self-start`}>
                          <Icon className={`w-3.5 h-3.5 ${ic}`} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 mb-0.5">{title}</p>
                          <p className="text-xs text-gray-500 leading-snug">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* ── Updated timestamp ── */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated March 2026</span>
                </div>

                {/* ── Prev / Next nav ── */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    Email Reports
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    Multichannel Reports
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </main>

            {/* ── Right TOC panel ── */}
            <TOCPanel active={activeToc} />
          </div>
        </div>
      </div>
    </div>
  );
}