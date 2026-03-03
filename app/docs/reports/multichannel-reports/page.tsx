"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  Mail, Linkedin, MessageCircle, Phone, CheckSquare,
  BarChart2, Users, Layers, Zap, Info,
  AlertCircle, Star, Shield, Send, Inbox,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── Table of Contents ──
const TOC = [
  { id: "overview",          label: "Overview"           },
  { id: "how-to-access",     label: "How to access"      },
  { id: "channel-breakdown", label: "Channel breakdown"  },
  { id: "contributors",      label: "Top contributors"   },
  { id: "tips",              label: "Tips & best uses"   },
];

// ── Ask AI widget (same as your track-emails page) ──
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
              placeholder="e.g. How do I view top contributors?"
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

// ── Live channel status badge ──
function StatusBadge({ status }: { status: "Live" | "Coming Soon" }) {
  return (
    <span
      className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
        status === "Live"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}

// ── Mini report preview widget ──
function ReportPreview() {
  const rows = [
    { name: "LinkedIn",      completed: 84, assigned: 100, color: "bg-blue-500"    },
    { name: "Email",         completed: 72, assigned: 90,  color: "bg-teal-500"    },
    { name: "WhatsApp",      completed: 61, assigned: 75,  color: "bg-emerald-500" },
    { name: "General Tasks", completed: 45, assigned: 60,  color: "bg-violet-500"  },
    { name: "SMS",           completed: 12, assigned: 40,  color: "bg-amber-400"   },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Fake browser bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-400 font-mono truncate">
          🔒 app.360airo.com/reports/tasks
        </div>
      </div>

      {/* Top stat strip */}
      <div className="grid grid-cols-4 border-b border-gray-100 bg-white">
        {[
          { label: "Total Tasks", val: "365", Icon: Layers,   tc: "text-gray-600",   bg: "bg-gray-100"    },
          { label: "Completed",   val: "274", Icon: CheckSquare, tc: "text-teal-600", bg: "bg-teal-50"    },
          { label: "Assigned",    val: "365", Icon: Users,    tc: "text-blue-600",   bg: "bg-blue-50"     },
          { label: "Pending",     val: "91",  Icon: Send,     tc: "text-amber-600",  bg: "bg-amber-50"    },
        ].map(({ label, val, Icon, tc, bg }) => (
          <div key={label} className="px-4 py-3 border-r border-gray-100 last:border-r-0">
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

      {/* Channel rows */}
      <div className="bg-white divide-y divide-gray-50">
        <div className="grid grid-cols-[1fr_60px_80px_48px] gap-3 px-4 py-2 bg-gray-50 border-b border-gray-100">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Channel</span>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-right">Done</span>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Progress</span>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-right">Rate</span>
        </div>
        {rows.map((r, i) => {
          const rate = Math.round((r.completed / r.assigned) * 100);
          return (
            <div key={r.name} className="grid grid-cols-[1fr_60px_80px_48px] items-center gap-3 px-4 py-3">
              <span className="text-xs font-semibold text-gray-800">{r.name}</span>
              <span className="text-xs text-gray-500 text-right">{r.completed}/{r.assigned}</span>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rate}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`h-full rounded-full ${r.color}`}
                />
              </div>
              <span className="text-[10px] font-black text-right text-teal-700">{rate}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main page ──
export default function MultichannelReportsPage() {
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

  const channels = [
    {
      Icon: Mail,          label: "Email",
      tracks: "Sent · Opens · Replies · Clicks",
      bg: "bg-teal-50",   iconColor: "text-teal-600",
      status: "Live" as const,
    },
    {
      Icon: Linkedin,      label: "LinkedIn",
      tracks: "Connection Requests · Messages · InMail",
      bg: "bg-blue-50",   iconColor: "text-blue-600",
      status: "Live" as const,
    },
    {
      Icon: MessageCircle, label: "WhatsApp",
      tracks: "Messages Sent · Delivered · Replied",
      bg: "bg-emerald-50",iconColor: "text-emerald-600",
      status: "Live" as const,
    },
    {
      Icon: CheckSquare,   label: "General Tasks",
      tracks: "Created · Assigned · Completed",
      bg: "bg-violet-50", iconColor: "text-violet-600",
      status: "Live" as const,
    },
    {
      Icon: Phone,         label: "SMS",
      tracks: "Messages Sent · Replied",
      bg: "bg-amber-50",  iconColor: "text-amber-600",
      status: "Coming Soon" as const,
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Go to Reports",
      desc: 'Navigate to the "Reports" section from your Airo sidebar.',
    },
    {
      num: "02",
      title: "Open Tasks Tab",
      desc: 'Click on "Tasks" to open the multichannel task reporting view.',
    },
    {
      num: "03",
      title: "View Top Contributors",
      desc: "See the top 5 team members ranked by task assignments and completions.",
    },
    {
      num: "04",
      title: "Filter by Channel",
      desc: "Break down completed tasks by Email, LinkedIn, WhatsApp, General Tasks, or SMS.",
    },
  ];

  const stats = [
    { Icon: Users,    value: "Top 5", label: "Contributors"   },
    { Icon: Layers,   value: "5+",    label: "Channels"       },
    { Icon: BarChart2,value: "Live",  label: "Real-time Data" },
    { Icon: Zap,      value: "100%",  label: "Task Visibility"},
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
                  <span className="text-gray-700 font-medium">Multichannel Reports</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div {...fadeUp(0)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <BarChart2 className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Multichannel Reports
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Track task performance across every outreach channel — Email, LinkedIn,
                    WhatsApp, and more — all from one unified dashboard in 360Airo.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Section 1: Overview ── */}
                <motion.section id="overview" {...fadeUp(0.06)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Overview</h2>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {stats.map(({ Icon, value, label }) => (
                      <div key={label} className="flex flex-col items-center text-center gap-1.5 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition">
                        <div className="p-2 rounded-lg bg-teal-50">
                          <Icon className="w-4 h-4 text-teal-600" />
                        </div>
                        <p className="text-xl font-black text-gray-900">{value}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-xs text-teal-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      Multichannel Reports give you a <strong>single view</strong> of all task activity across your
                      team and channels — no need to check each channel separately.
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

                {/* ── Section 3: Channel breakdown ── */}
                <motion.section id="channel-breakdown" {...fadeUp(0.1)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Channel breakdown</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    View completed task counts per channel. Each channel tracks its own relevant metrics.
                  </p>

                  {/* Report preview widget */}
                  <div className="mb-5">
                    <ReportPreview />
                  </div>

                  {/* Channel table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Supported channels &amp; what they track</p>
                    </div>
                    {channels.map(({ Icon, label, tracks, bg, iconColor, status }, i) => (
                      <div
                        key={label}
                        className={`flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 last:border-0 ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${bg}`}>
                            <Icon className={`w-4 h-4 ${iconColor}`} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{label}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{tracks}</p>
                          </div>
                        </div>
                        <StatusBadge status={status} />
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 4: Top contributors ── */}
                <motion.section id="contributors" {...fadeUp(0.12)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-4.5 h-4.5 text-teal-600" /> Top contributors
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    The Tasks report surfaces the <strong>top 5 team members</strong> by task assignments
                    and completions — making it easy to spot your highest performers and balance workloads.
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {[
                      ["What you see",      "Top 5 contributors ranked by tasks assigned & completed"       ],
                      ["Why it matters",    "Spot overloaded reps or under-utilised team capacity at a glance"],
                      ["How to act on it",  "Reassign tasks or adjust campaign sequences from the Tasks view" ],
                    ].map(([l, d], i) => (
                      <div
                        key={l}
                        className={`grid grid-cols-[140px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <span className="font-semibold text-gray-600">{l}</span>
                        <span className="text-gray-500">{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700 mt-3">
                    <Inbox className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      Contributor data refreshes in <strong>real time</strong> — rankings update as your
                      team completes or gets assigned new tasks throughout the day.
                    </span>
                  </div>
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
                        Icon: Shield,
                        bg:   "bg-teal-50",
                        ic:   "text-teal-600",
                        title: "Filter by channel to find gaps",
                        desc:  "If LinkedIn tasks are piling up incomplete, it's a signal to review sequences or redistribute to other channels that are performing.",
                      },
                      {
                        Icon: BarChart2,
                        bg:   "bg-violet-50",
                        ic:   "text-violet-600",
                        title: "Use contributor rankings for 1:1s",
                        desc:  "Pull the top-5 leaderboard before weekly check-ins — it gives concrete, data-backed talking points on rep performance.",
                      },
                      {
                        Icon: AlertCircle,
                        bg:   "bg-amber-50",
                        ic:   "text-amber-600",
                        title: "SMS is under development",
                        desc:  "SMS task tracking is coming soon. Email, LinkedIn, WhatsApp, and General Tasks are all live and tracked in real time.",
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
                    Types of Campaign Reports
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    LeadFinder
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