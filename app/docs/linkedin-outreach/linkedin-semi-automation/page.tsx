"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  CheckCircle2, AlertCircle, Info, Zap, Shield, Users,
  MessageSquare, UserPlus, Play, Settings, Puzzle,
  Star, ArrowRight, MousePointer, ListChecks, BadgeCheck,
  ClipboardList, Chrome,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",       label: "What is semi-automation" },
  { id: "requirements",   label: "Plan requirements" },
  { id: "add-account",    label: "Add LinkedIn account" },
  { id: "setup-campaign", label: "Set up a campaign" },
  { id: "execute-tasks",  label: "Execute tasks" },
  { id: "faqs",           label: "FAQs" },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How is semi-automation different from full automation?",
    a: "Semi-automation requires you to manually approve and execute each LinkedIn action via the 360Airo browser extension. Full automation runs those actions without any intervention. Semi-automation is safer for your LinkedIn account and keeps you in control.",
    icon: Zap,
    color: "text-violet-600", bg: "bg-violet-50",
    border: "border-violet-200", activeBorder: "border-violet-400",
  },
  {
    q: "Do I need LinkedIn Premium for semi-automation?",
    a: "No — LinkedIn Premium is only required if you want to send InMails. Connection requests, profile views, and messages to first-degree connections all work perfectly on a free LinkedIn account.",
    icon: BadgeCheck,
    color: "text-blue-600", bg: "bg-blue-50",
    border: "border-blue-200", activeBorder: "border-blue-400",
  },
  {
    q: "What happens if I don't complete tasks immediately?",
    a: "Tasks stay in your queue until you complete them. Your campaign sequence won't progress to the next step for that prospect until the pending task is executed, so timely action keeps your cadence on schedule.",
    icon: ClipboardList,
    color: "text-emerald-600", bg: "bg-emerald-50",
    border: "border-emerald-200", activeBorder: "border-emerald-400",
  },
  {
    q: "What plan includes LinkedIn manual tasks?",
    a: "LinkedIn semi-automation (manual tasks) is included in the Sales Engagement plan. If you need full automation, there is a $49 add-on per LinkedIn account on top of your existing plan.",
    icon: Star,
    color: "text-orange-600", bg: "bg-orange-50",
    border: "border-orange-200", activeBorder: "border-orange-400",
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
            <input autoFocus
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How do I execute a LinkedIn task?" />
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
                  active === item.id
                    ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
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

// ─── Add LinkedIn Account Mockup ─────────────────────────────────────────────
function AddLinkedInAccountMockup() {
  const [step, setStep] = useState(1);

  const steps = [
    { num: 1, label: "Install Extension",   icon: Chrome,       color: "bg-blue-600"    },
    { num: 2, label: "Open Settings",       icon: Settings,     color: "bg-violet-600"  },
    { num: 3, label: "Add Account",         icon: UserPlus,     color: "bg-emerald-600" },
    { num: 4, label: "Skip Automations",    icon: MousePointer, color: "bg-orange-500"  },
  ];

  const content: Record<number, React.ReactNode> = {
    1: (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-3">
          <Chrome className="w-7 h-7 text-blue-600" />
        </div>
        <p className="text-sm font-bold text-gray-900 mb-1">Install the 360Airo Extension</p>
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-4">
          Download the 360Airo Task Manager extension from the Chrome Web Store. It lets you execute LinkedIn tasks directly from your browser.
        </p>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md">
          <Chrome className="w-3.5 h-3.5" /> Add to Chrome
        </button>
      </div>
    ),
    2: (
      <div className="p-4 space-y-2">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Settings navigation</p>
        {["General Settings", "LinkedIn Accounts", "Add New Account →"].map((item, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs font-medium transition ${
            i === 2 ? "bg-violet-50 border-violet-200 text-violet-700" : "bg-gray-50 border-gray-200 text-gray-600"
          }`}>
            <ChevronRight className="w-3.5 h-3.5" />
            {item}
          </div>
        ))}
      </div>
    ),
    3: (
      <div className="p-4 space-y-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account details</p>
        {[
          { label: "LinkedIn Profile URL", placeholder: "https://linkedin.com/in/yourname", val: "linkedin.com/in/john-doe" },
          { label: "Login Country",        placeholder: "Select country…",                  val: "United States" },
          { label: "Account Owner",        placeholder: "Select team member…",              val: "John Doe" },
        ].map(f => (
          <div key={f.label}>
            <label className="text-[10px] font-bold text-gray-600 mb-1 block">{f.label}</label>
            <div className="w-full text-xs border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 text-blue-800 font-medium">
              {f.val}
            </div>
          </div>
        ))}
      </div>
    ),
    4: (
      <div className="flex flex-col items-center py-6 text-center px-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-3">
          <MousePointer className="w-7 h-7 text-orange-500" />
        </div>
        <p className="text-sm font-bold text-gray-900 mb-1">Skip full automation</p>
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-4">
          On the final screen, click <strong>"Continue without automations"</strong> to set up the account in semi-automation (Co-pilot) mode.
        </p>
        <button className="flex items-center gap-2 border border-orange-300 text-orange-600 bg-orange-50 text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-100 transition">
          Continue without automations →
        </button>
      </div>
    ),
  };

  return (
    <BrowserFrame title="360Airo — Add LinkedIn Account">
      <div className="bg-gray-50 p-5">
        {/* Step tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {steps.map(s => {
            const Icon = s.icon;
            return (
              <button key={s.num} onClick={() => setStep(s.num)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  step === s.num
                    ? `${s.color} text-white border-transparent shadow-md`
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}>
                <Icon className="w-3.5 h-3.5" />
                Step {s.num}: {s.label}
              </button>
            );
          })}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-6 }} transition={{ duration:0.18 }}>
              {content[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4 justify-center">
          {steps.map(s => (
            <button key={s.num} onClick={() => setStep(s.num)}
              className={`w-2 h-2 rounded-full transition-all ${step === s.num ? `${s.color} w-5` : "bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Campaign Setup Mockup ────────────────────────────────────────────────────
function CampaignSetupMockup() {
  const sequence = [
    { type: "Email",              label: "Email #1 — Intro",             day: "Day 1",  icon: MessageSquare, color: "bg-violet-100 text-violet-700", dot: "bg-violet-500",  badge: "Automated"   },
    { type: "LinkedIn View",      label: "View Profile",                 day: "Day 3",  icon: Users,         color: "bg-blue-100 text-blue-700",     dot: "bg-blue-500",    badge: "Manual task" },
    { type: "LinkedIn Connect",   label: "Send Connection Request",      day: "Day 4",  icon: UserPlus,      color: "bg-emerald-100 text-emerald-700",dot: "bg-emerald-500", badge: "Manual task" },
    { type: "LinkedIn Message",   label: "LinkedIn Message #1",          day: "Day 7",  icon: MessageSquare, color: "bg-orange-100 text-orange-700",  dot: "bg-orange-500",  badge: "Manual task" },
    { type: "Email",              label: "Email #2 — Follow-up",         day: "Day 10", icon: MessageSquare, color: "bg-pink-100 text-pink-700",      dot: "bg-pink-500",    badge: "Automated"   },
  ];

  return (
    <BrowserFrame title="360Airo — Campaign Builder · LinkedIn Sequence">
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <p className="text-sm font-black text-gray-900">LinkedIn Semi-Auto Sequence</p>
            <p className="text-xs text-gray-400">Drip campaign · Manual LinkedIn steps</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-violet-700 bg-violet-100 border border-violet-200 px-2.5 py-1 rounded-full">5 steps</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">⚙ Draft</span>
          </div>
        </div>

        {/* Sequence */}
        <div className="space-y-2">
          {sequence.map((s, i) => {
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
                    <p className="text-xs font-bold text-gray-900">{s.label}</p>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      s.badge === "Automated"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {s.badge === "Automated" ? "⚡ Automated" : "👆 " + s.badge}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg flex-shrink-0">{s.day}</span>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-amber-700">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
          <span>Steps labelled <strong>Manual task</strong> appear in your Tasks page and require execution via the 360Airo browser extension.</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Execute Tasks Mockup ─────────────────────────────────────────────────────
function ExecuteTasksMockup() {
  const [done, setDone] = useState<number[]>([]);

  const tasks = [
    { prospect: "Sarah Chen",    action: "View Profile",          company: "Acme Corp",     icon: Users,         color: "bg-blue-50 text-blue-700 border-blue-200"    },
    { prospect: "James Miller",  action: "Send Connection",        company: "TechFlow Inc",  icon: UserPlus,      color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { prospect: "Priya Sharma",  action: "Send LinkedIn Message",  company: "StartupX",      icon: MessageSquare, color: "bg-orange-50 text-orange-700 border-orange-200"  },
  ];

  return (
    <BrowserFrame title="360Airo — Multichannel Tasks">
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-md">
              <ListChecks className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Today's LinkedIn Tasks</p>
              <p className="text-xs text-gray-400">{done.length}/{tasks.length} completed · Use extension to execute</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-blue-700 transition shadow-md">
            <Play className="w-3.5 h-3.5" /> Run Tasks
          </button>
        </div>

        {/* Task rows */}
        <div className="space-y-2">
          {tasks.map((t, i) => {
            const Icon = t.icon;
            const isDone = done.includes(i);
            return (
              <div key={i} className={`flex items-center gap-3 bg-white rounded-xl border px-4 py-3 shadow-sm transition ${isDone ? "border-green-200 opacity-60" : "border-gray-100"}`}>
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${t.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">{t.prospect}
                    <span className="font-normal text-gray-400"> · {t.company}</span>
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{t.action}</p>
                </div>
                <button onClick={() => setDone(p => isDone ? p.filter(x => x !== i) : [...p, i])}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition ${
                    isDone
                      ? "bg-green-50 border-green-300 text-green-700"
                      : "bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"
                  }`}>
                  {isDone ? <><CheckCircle2 className="w-3 h-3" /> Done</> : <>Execute</>}
                </button>
              </div>
            );
          })}
        </div>

        {/* Extension CTA */}
        <div className="mt-4 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <Chrome className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-bold text-blue-800">360Airo Extension required</p>
            <p className="text-[10px] text-blue-600">Open LinkedIn in your browser with the extension active to execute tasks.</p>
          </div>
          <button className="text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-300 px-2.5 py-1.5 rounded-lg hover:bg-blue-200 transition flex-shrink-0">
            Install
          </button>
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
              <span className={`text-xs font-black min-w-[1.25rem] flex-shrink-0 ${faq.color}`}>{i + 1}.</span>
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${faq.color}`} />
              <p className="flex-1 text-sm font-semibold text-gray-900">{faq.q}</p>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${faq.color} ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="answer"
                  initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                  exit={{ height:0, opacity:0 }} transition={{ duration:0.22, ease:"easeInOut" }}
                  className="overflow-hidden">
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
export default function LinkedInSemiAutomationPage() {
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
        { rootMargin: "-30% 0px -60% 0px" }
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
                  <span className="text-gray-700 font-medium">Semi-Automation</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">LinkedIn Semi-Automation</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Run organised LinkedIn outreach campaigns with manual task control — keeping your account
                    safe while 360Airo handles the scheduling, sequencing, and prompts.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Overview ── */}
                <motion.div id="overview" initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    <strong>Semi-automation (Co-pilot mode)</strong> is the middle ground between fully manual LinkedIn
                    outreach and full automation. 360Airo queues your LinkedIn tasks — profile views, connection
                    requests, messages — and you execute them one by one via the browser extension. You stay in
                    control; 360Airo keeps everything organised.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: Shield,    bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-200", title: "Account Safe",      desc: "Manual execution means LinkedIn never sees bot-like behaviour — your account stays restriction-free" },
                      { icon: ListChecks,bg: "bg-blue-50",    color: "text-blue-600",    border: "border-blue-200",    title: "Organised Queue",   desc: "360Airo queues every LinkedIn action so you always know exactly what to do next, and for whom" },
                      { icon: Zap,       bg: "bg-violet-50",  color: "text-violet-600",  border: "border-violet-200",  title: "Mixed Automation",  desc: "Emails send automatically; LinkedIn steps become tasks you approve — best of both worlds" },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.1+i*0.07 }}
                          className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
                          <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                          <p className={`text-sm font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Auto vs Semi comparison */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Feature</div>
                      <div className="px-4 py-2.5 border-x border-gray-200 text-amber-600">Semi-Auto (Co-pilot)</div>
                      <div className="px-4 py-2.5 text-violet-600">Full Automation</div>
                    </div>
                    {[
                      ["LinkedIn actions",       "Manual via extension",  "Runs automatically"   ],
                      ["Email steps",            "Fully automated",       "Fully automated"      ],
                      ["Account risk",           "Very low",              "Moderate"             ],
                      ["Plan requirement",       "Sales Engagement",      "$49 add-on / account" ],
                      ["Control level",          "High — you approve each","Hands-off"           ],
                    ].map(([feat, semi, full], i) => (
                      <div key={feat} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="px-4 py-2.5 font-semibold text-gray-800">{feat}</div>
                        <div className="px-4 py-2.5 text-amber-700 border-x border-gray-100 font-medium">{semi}</div>
                        <div className="px-4 py-2.5 text-violet-700 font-medium">{full}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Plan Requirements ── */}
                <motion.div id="requirements" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan requirements</h2>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BadgeCheck className="w-5 h-5 text-blue-600" />
                        <p className="text-sm font-bold text-blue-800">Sales Engagement Plan</p>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        LinkedIn semi-automation (manual tasks) is included in the Sales Engagement plan. No add-ons needed — connect your account and start running campaigns straight away.
                      </p>
                    </div>
                    <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-violet-600" />
                        <p className="text-sm font-bold text-violet-800">Full Automation Add-on</p>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Want fully automated LinkedIn actions? Add the <strong>$49/month per LinkedIn account</strong> automation add-on to your Sales Engagement plan.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span><strong>Available on free trial.</strong> You can test LinkedIn semi-automation during your 360Airo trial — no plan upgrade required to explore the feature.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Add LinkedIn Account ── */}
                <motion.div id="add-account" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Add your LinkedIn account</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Click through each step in the mockup below to see exactly how to connect your LinkedIn account to 360Airo for semi-automation.
                  </p>

                  <div className="mb-5"><AddLinkedInAccountMockup /></div>

                  <div className="space-y-2">
                    {[
                      { step:"01", color:"bg-blue-600",    icon:Chrome,       title:"Install the extension",     desc:"Download the 360Airo Task Manager from the Chrome Web Store — it's the bridge between 360Airo and your LinkedIn browser session." },
                      { step:"02", color:"bg-violet-600",  icon:Settings,     title:"Go to LinkedIn Settings",   desc:"In 360Airo, navigate to Settings → General Settings → LinkedIn Accounts to manage all connected LinkedIn profiles." },
                      { step:"03", color:"bg-emerald-600", icon:UserPlus,     title:"Submit your account details",desc:"Enter your LinkedIn profile URL, the country you access LinkedIn from, and assign an account owner from your 360Airo team." },
                      { step:"04", color:"bg-orange-500",  icon:MousePointer, title:'Click "Continue without automations"', desc:"On the final step, choose this option to set up the account in Co-pilot (semi-auto) mode — skipping the full automation setup." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                          transition={{ delay:0.2+i*0.05 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                          <div className={`w-7 h-7 rounded-full ${item.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            {item.step}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <Icon className="w-3.5 h-3.5 text-gray-400" />
                              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Set Up Campaign ── */}
                <motion.div id="setup-campaign" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">2</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Set up a semi-automation campaign</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Build a Drip campaign with LinkedIn <strong>manual steps</strong> mixed into your sequence.
                    Emails send automatically; LinkedIn actions become tasks you execute via the extension.
                  </p>

                  <div className="mb-5"><CampaignSetupMockup /></div>

                  <div className="space-y-2">
                    {[
                      { step:"01", color:"bg-violet-600",  icon:Puzzle,       title:"Create a Drip campaign",    desc:"Go to Campaigns → New Campaign → Drip Campaign. Drip campaigns support mixed channels including email and LinkedIn manual steps." },
                      { step:"02", color:"bg-blue-600",    icon:Users,        title:"Add prospects",             desc:"Upload your prospect list via CSV, CRM sync, or manually. Each prospect will move through the sequence at the same cadence." },
                      { step:"03", color:"bg-emerald-600", icon:ListChecks,   title:"Build your LinkedIn sequence",desc:"In the Content step, add LinkedIn touchpoints using Manual step blocks — profile view, connection request, or message. Mix in automated email steps for a full multichannel sequence." },
                      { step:"04", color:"bg-orange-500",  icon:Play,         title:"Launch and execute via Tasks",desc:"Launch the campaign. As LinkedIn steps become due for each prospect, they appear on your Tasks page ready to execute with one click via the extension." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                          transition={{ delay:0.25+i*0.05 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-violet-200 hover:shadow-sm transition">
                          <div className={`w-7 h-7 rounded-full ${item.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            {item.step}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <Icon className="w-3.5 h-3.5 text-gray-400" />
                              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Execute Tasks ── */}
                <motion.div id="execute-tasks" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">3</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Execute semi-automation tasks</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    When LinkedIn steps are due, they appear on the Tasks page. Use the interactive mockup below —
                    click Execute to mark tasks done, just like the real 360Airo experience.
                  </p>

                  <div className="mb-5"><ExecuteTasksMockup /></div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      { icon:ListChecks, bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"Navigate to Tasks",       desc:"Go to the Multichannel Tasks section in 360Airo. Tasks are grouped by due date and campaign so you can work through them efficiently." },
                      { icon:Chrome,     bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"Use the extension",       desc:"With the 360Airo extension active in Chrome, click Execute on any task — the extension opens the correct LinkedIn profile and pre-fills the action." },
                      { icon:CheckCircle2,bg:"bg-emerald-50",color:"text-emerald-600", border:"border-emerald-200", title:"Mark tasks complete",     desc:"After performing the action on LinkedIn, mark the task complete in 360Airo. The campaign sequence then advances to the next step for that prospect." },
                      { icon:Star,       bg:"bg-amber-50",   color:"text-amber-600",   border:"border-amber-200",   title:"Complete daily for best results",desc:"Aim to clear your LinkedIn task queue each day. Timely execution keeps your campaign cadence on schedule and your outreach feeling fresh." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.3+i*0.05 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Learn more:</strong> See the full guide on{" "}
                      <Link href="/docs/linkedin-outreach/run-multichannel-task" className="underline underline-offset-2 hover:text-blue-900 transition">
                        how to run a multichannel daily task
                      </Link>{" "}
                      for a step-by-step walkthrough of the Tasks page.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── FAQs ── */}
                <motion.div id="faqs" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">FAQs</h2>
                  <p className="text-sm text-gray-500 mb-5">Common questions about LinkedIn semi-automation in 360Airo. Click to expand.</p>
                  <FAQList />
                </motion.div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 6 months ago</span>
                </div>

                <div className="border-t border-gray-200 my-8" />

                {/* Learn About cards */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { href:"/docs/linkedin-outreach/run-multichannel-task", icon:ListChecks, color:"text-blue-600",   bg:"bg-blue-50",   border:"border-blue-200",   title:"Run Multichannel Daily Task", desc:"Step-by-step guide to working through your daily task queue" },
                    { href:"/docs/linkedin-outreach/automation",            icon:Zap,        color:"text-violet-600", bg:"bg-violet-50", border:"border-violet-200", title:"LinkedIn Automation",         desc:"Upgrade to full automation with the $49/month add-on" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}
                        className={`flex items-start gap-3 p-4 rounded-xl border ${item.border} ${item.bg} hover:shadow-sm transition group`}>
                        <div className={`w-9 h-9 rounded-xl bg-white border ${item.border} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold ${item.color} mb-0.5`}>{item.title}</p>
                          <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
                        </div>
                        <ArrowRight className={`w-4 h-4 ${item.color} flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform`} />
                      </Link>
                    );
                  })}
                </div>

                {/* Prev / Next nav */}
                <div className="flex items-center justify-between gap-4">
                  <Link href="/docs/linkedin-outreach/automation"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    LinkedIn Automation
                  </Link>
                  <Link href="/docs/linkedin-outreach/best-practices"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    LinkedIn Best Practices
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