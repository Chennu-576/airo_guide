"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  CheckCircle2, AlertCircle, Info, Zap, Shield, Users,
  MessageSquare, UserPlus, Timer, BarChart2, Eye,
  ArrowRight, Star, TrendingUp, AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",       label: "Why best practices matter" },
  { id: "best-practices", label: "Best practices" },
  { id: "limits",         label: "LinkedIn limits" },
  { id: "faqs",           label: "FAQs" },
];

// ─── Best Practices Data ──────────────────────────────────────────────────────
const practices = [
  {
    step: "01", color: "bg-blue-600", iconBg: "bg-blue-50", iconColor: "text-blue-600",
    border: "border-blue-200", bg: "bg-blue-50/40", icon: UserPlus,
    title: "Personalise connection requests",
    summary: "Use merge tags to make every request feel human.",
    detail: "Use merge tags like {{first_name}} and {{company}} so each connection request feels written just for that person. LinkedIn rewards genuine networking — personalised requests consistently see higher acceptance rates.",
    example: `"Hi {{first_name}}, I noticed your work at {{company}} and thought we'd have a lot to talk about around {{industry}}."`,
    tip: "Keep it under 300 characters — shorter notes get accepted more often.",
  },
  {
    step: "02", color: "bg-violet-600", iconBg: "bg-violet-50", iconColor: "text-violet-600",
    border: "border-violet-200", bg: "bg-violet-50/40", icon: Shield,
    title: "Limit daily connection requests",
    summary: "Send 10–20 requests per day — no more.",
    detail: "360Airo lets you set a daily cap for connection requests. Staying in the 10–20 range keeps you well inside LinkedIn's safe limits, avoiding spam flags and account restrictions.",
    example: null,
    tip: "Set your limit in 360Airo's campaign settings before launching.",
  },
  {
    step: "03", color: "bg-emerald-600", iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
    border: "border-emerald-200", bg: "bg-emerald-50/40", icon: Timer,
    title: "Space out actions with drip campaigns",
    summary: "Add 3–5 day gaps between each touchpoint.",
    detail: "Configure delays between connection requests and follow-up messages in 360Airo's drip campaign settings. Gradual outreach mimics natural human interaction and keeps LinkedIn's spam detectors quiet.",
    example: null,
    tip: "Day 1: Connection request → Day 4: Welcome message → Day 8: Value message.",
  },
  {
    step: "04", color: "bg-orange-500", iconBg: "bg-orange-50", iconColor: "text-orange-600",
    border: "border-orange-200", bg: "bg-orange-50/40", icon: MessageSquare,
    title: "Cap daily messages",
    summary: "Keep first-degree messages at 50–75 per day.",
    detail: "LinkedIn has unofficial messaging thresholds. Keeping daily messages between 50–75 for first-degree connections reduces the risk of triggering spam filters while still giving you solid outreach volume.",
    example: null,
    tip: "Split sends across morning and afternoon for a more natural pattern.",
  },
  {
    step: "05", color: "bg-pink-600", iconBg: "bg-pink-50", iconColor: "text-pink-600",
    border: "border-pink-200", bg: "bg-pink-50/40", icon: Eye,
    title: "Engage before messaging",
    summary: "Visit profiles and send emails before LinkedIn touches.",
    detail: "Use 360Airo to automate profile visits before sending a message — it warms up the prospect. Even better: combine LinkedIn with a couple of email touchpoints first so the LinkedIn message feels like a continuation, not a cold start.",
    example: null,
    tip: "Profile view → Email #1 → Email #2 → LinkedIn connection → LinkedIn message.",
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Will 360Airo get my LinkedIn account restricted?",
    a: "Not if you follow the limits in this guide. 360Airo is built to respect LinkedIn's daily action thresholds. As long as you configure the recommended caps in campaign settings, your account stays safe.",
    icon: Shield, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", activeBorder: "border-violet-400",
  },
  {
    q: "Can I run LinkedIn and email outreach together?",
    a: "Yes — and you should. 360Airo's multichannel campaigns let you combine email and LinkedIn touchpoints in a single sequence. Leading with 1–2 emails before your LinkedIn connection request dramatically improves acceptance rates.",
    icon: Zap, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", activeBorder: "border-blue-400",
  },
  {
    q: "How many connection requests can I send per week?",
    a: "LinkedIn's recommended safe range is around 80 per week (20 per day) for standard accounts. Premium and Sales Navigator accounts get slightly more flexibility at 20–30 per day.",
    icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", activeBorder: "border-emerald-400",
  },
  {
    q: "What's the best time to send LinkedIn messages?",
    a: "Tuesday to Thursday, between 8–10 AM or 5–6 PM in the recipient's timezone, tends to yield the highest response rates. 360Airo's timezone-based sending handles this automatically.",
    icon: Clock, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", activeBorder: "border-orange-400",
  },
];

// ─── AskAI ────────────────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-blue-400 hover:text-blue-600 bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0,y:-6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
            exit={{ opacity:0,y:-6,scale:0.97 }} transition={{ duration:0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How many LinkedIn messages per day?" />
            <button className="mt-2 w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">Ask</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── TOC Panel ────────────────────────────────────────────────────────────────
function TableOfContents({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-56 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Table of Contents</span>
          </div>
          <nav className="py-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior:"smooth" }); }}
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// ─── Browser Frame ────────────────────────────────────────────────────────────
function BrowserFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">{title}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── LinkedIn Campaign Sequence Mockup ───────────────────────────────────────
function LinkedInSequenceMockup() {
  const steps = [
    { day:"Day 1",  action:"Profile View",        icon:Eye,          color:"bg-blue-100 text-blue-700",    dot:"bg-blue-500",    status:"Automated"    },
    { day:"Day 2",  action:"Email #1",             icon:MessageSquare,color:"bg-violet-100 text-violet-700",dot:"bg-violet-500",  status:"Personalised" },
    { day:"Day 4",  action:"Connection Request",   icon:UserPlus,     color:"bg-emerald-100 text-emerald-700",dot:"bg-emerald-500",status:"With note"    },
    { day:"Day 7",  action:"LinkedIn Message #1",  icon:MessageSquare,color:"bg-orange-100 text-orange-700", dot:"bg-orange-500",  status:"If connected" },
    { day:"Day 10", action:"Email #2",             icon:MessageSquare,color:"bg-pink-100 text-pink-700",     dot:"bg-pink-500",    status:"Follow-up"    },
    { day:"Day 14", action:"LinkedIn Message #2",  icon:MessageSquare,color:"bg-amber-100 text-amber-700",   dot:"bg-amber-500",   status:"Value add"    },
  ];

  return (
    <BrowserFrame title="360Airo — LinkedIn Outreach Sequence">
      <div className="bg-gray-50 p-5">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900">Multichannel LinkedIn Sequence</h3>
              <p className="text-xs text-gray-400">Best-practice drip · 14-day cadence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full">6 steps</span>
            <span className="text-[10px] font-bold text-green-700 bg-green-100 border border-green-200 px-2.5 py-1 rounded-full">✓ Active</span>
          </div>
        </div>

        <div className="space-y-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-black text-gray-500">{i + 1}</span>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-bold text-gray-900">{s.action}</p>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${s.color}`}>{s.status}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg flex-shrink-0">{s.day}</span>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label:"Avg Acceptance Rate", val:"38%", sub:"connection requests",   icon:"🤝", bg:"bg-blue-50",   color:"text-blue-700",   iconBg:"bg-blue-500"   },
            { label:"Reply Rate",          val:"12%", sub:"across all touchpoints", icon:"💬", bg:"bg-violet-50", color:"text-violet-700", iconBg:"bg-violet-500" },
            { label:"Safe Daily Actions",  val:"75",  sub:"messages + requests",    icon:"🛡", bg:"bg-green-50",  color:"text-green-700",  iconBg:"bg-green-500"  },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl border border-white p-3.5 shadow-sm`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-[10px] font-bold ${s.color}`}>{s.label}</p>
                <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center text-sm shadow-sm`}>{s.icon}</div>
              </div>
              <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
              <p className="text-[9px] text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Limits Table Mockup ──────────────────────────────────────────────────────
function LinkedInLimitsMockup() {
  const rows = [
    { action:"View Profile",        free:"~100–150 / day",        premium:"300–1,000+ / day",       risk:"low"    },
    { action:"Connection Requests", free:"20 / day (~80 / week)", premium:"20–30 / day",             risk:"medium" },
    { action:"Messages",            free:"~20 / day",             premium:"20 / day",                risk:"medium" },
    { action:"InMails",             free:"5 / month",             premium:"15–50+ / month",          risk:"low"    },
  ];
  const riskColors: Record<string,string> = {
    low:    "bg-green-100 text-green-700 border-green-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <BrowserFrame title="360Airo — LinkedIn Action Limits Reference">
      <div className="bg-gray-50/60 p-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr_1.2fr_80px] bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <div className="px-4 py-3">Action</div>
            <div className="px-4 py-3 border-x border-gray-200">Free Account</div>
            <div className="px-4 py-3 border-r border-gray-200">Premium / Sales Nav</div>
            <div className="px-4 py-3">Risk</div>
          </div>
          {rows.map((row, i) => (
            <div key={row.action} className={`grid grid-cols-[1.2fr_1fr_1.2fr_80px] border-b border-gray-100 last:border-0 text-xs items-center ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
              <div className="px-4 py-3 font-semibold text-gray-800">{row.action}</div>
              <div className="px-4 py-3 text-gray-600 border-x border-gray-100 font-mono text-[11px]">{row.free}</div>
              <div className="px-4 py-3 text-gray-600 border-r border-gray-100 font-mono text-[11px]">{row.premium}</div>
              <div className="px-4 py-3">
                <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${riskColors[row.risk]}`}>{row.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── FAQ Toggle Accordion ─────────────────────────────────────────────────────
function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const Icon = faq.icon;
        const isOpen = openIndex === i;
        return (
          <motion.div key={i} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
            transition={{ delay:0.3+i*0.05 }}
            className={`rounded-xl border overflow-hidden transition-colors ${isOpen ? faq.activeBorder : faq.border}`}>
            <button onClick={() => toggle(i)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isOpen ? faq.bg : "bg-white hover:bg-gray-50"}`}>
              <span className={`text-xs font-black min-w-[1.25rem] flex-shrink-0 ${faq.color}`}>{i+1}.</span>
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${faq.color}`} />
              <p className="flex-1 text-sm font-semibold text-gray-900">{faq.q}</p>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${faq.color} ${isOpen?"rotate-180":""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="answer" initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }}
                  exit={{ height:0,opacity:0 }} transition={{ duration:0.22,ease:"easeInOut" }} className="overflow-hidden">
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
                    <p className="text-sm text-gray-600 leading-relaxed pl-[3.25rem]">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LinkedInBestPracticesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("overview");

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin:"-30% 0px -60% 0px" }
      );
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, [isMounted]);

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation onToggleSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex">
            <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
              <div className="max-w-4xl">

                {/* Breadcrumb */}
                <motion.nav initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">LinkedIn Outreach</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Best Practices</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">LinkedIn Outreach Best Practices</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Follow these guidelines to run LinkedIn outreach through 360Airo safely —
                    personalised, within LinkedIn's limits, and built for genuine results.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Overview ── */}
                <motion.div id="overview" initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    LinkedIn actively monitors outreach behaviour. Accounts that send too many requests, message
                    too fast, or use generic copy get flagged — and restricted. These best practices keep your
                    account safe while maximising connection acceptance and reply rates.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:TrendingUp, bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"Higher Acceptance", desc:"Personalised, dripped requests get 2–3× more acceptances than bulk cold sends" },
                      { icon:Shield,     bg:"bg-emerald-50", color:"text-emerald-600", border:"border-emerald-200", title:"Account Safety",    desc:"Respecting daily limits keeps your LinkedIn account free from restrictions" },
                      { icon:Star,       bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"Better Replies",    desc:"Warming up with profile views and emails before messaging improves reply rates" },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.1+i*0.07 }} className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
                          <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                          <p className={`text-sm font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span><strong>These best practices align with LinkedIn's official guidelines.</strong> Following them in 360Airo ensures your outreach stays compliant while still delivering strong campaign results.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Best Practices ── */}
                <motion.div id="best-practices" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Best practices</h2>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Implement all five steps before launching any LinkedIn campaign in 360Airo. The sequence mockup shows what a healthy multichannel cadence looks like in practice.
                  </p>
                  <div className="mb-6"><LinkedInSequenceMockup /></div>
                  <div className="space-y-3">
                    {practices.map((p, i) => {
                      const Icon = p.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                          transition={{ delay:0.15+i*0.06 }}
                          className={`rounded-xl border ${p.border} ${p.bg} overflow-hidden`}>
                          <div className="flex gap-4 p-4">
                            <div className={`w-7 h-7 rounded-full ${p.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              {p.step}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <Icon className={`w-4 h-4 ${p.iconColor} flex-shrink-0`} />
                                <p className="text-sm font-bold text-gray-900">{p.title}</p>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.iconBg} ${p.iconColor}`}>{p.summary}</span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed mb-2">{p.detail}</p>
                              {p.example && (
                                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 mb-2">
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Example</p>
                                  <p className="text-xs text-gray-700 italic">{p.example}</p>
                                </div>
                              )}
                              <div className="flex items-start gap-1.5">
                                <Star className={`w-3 h-3 flex-shrink-0 mt-0.5 ${p.iconColor}`} />
                                <p className="text-xs text-gray-500">{p.tip}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── LinkedIn Limits ── */}
                <motion.div id="limits" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">LinkedIn limits</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Reference these limits when configuring your 360Airo campaign settings. Stay within the free account ranges for safest results — even on premium accounts.
                  </p>
                  <div className="mb-5"><LinkedInLimitsMockup /></div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                      <span><strong>Premium limits aren't a green light to send more.</strong> Even with Sales Navigator, aggressive sending patterns can trigger LinkedIn's spam detection. Stick to gradual ramp-ups.</span>
                    </div>
                    <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span><strong>360Airo enforces these limits automatically.</strong> Set your daily caps once in campaign settings and 360Airo handles the throttling so you never accidentally exceed them.</span>
                    </div>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── FAQs ── */}
                <motion.div id="faqs" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">FAQs</h2>
                  <p className="text-sm text-gray-500 mb-5">Common questions about LinkedIn outreach in 360Airo. Click to expand.</p>
                  <FAQList />
                </motion.div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 7 months ago</span>
                </div>

                <div className="border-t border-gray-200 my-8" />

                {/* Prev / Next */}
                <div className="flex items-center justify-between gap-4">
                  <Link href="/docs/linkedin-outreach/semi-automation"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    LinkedIn Semi-Automation
                  </Link>
                  <Link href="/docs/cold-calling/calling"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    Calling
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </main>
            <TableOfContents active={activeToc} />
          </div>
        </div>
      </div>
    </div>
  );
}