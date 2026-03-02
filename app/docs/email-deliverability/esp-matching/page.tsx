"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail,
  CheckCircle2, AlertCircle, Info, Zap, Shield, Settings,
  ArrowRight, Globe, Activity, Users, RefreshCw, Server,
  BarChart2, Shuffle, Router, Inbox,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",     label: "What is ESP Matching" },
  { id: "how-it-works", label: "How does it work" },
  { id: "performance",  label: "Campaign performance" },
  { id: "setup",        label: "Setting up ESP Matching" },
  { id: "faqs",         label: "Common FAQs" },
];

// ─── AskAI ────────────────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-blue-400 hover:text-blue-600 bg-white shadow-sm transition-colors"
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
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50"
          >
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input
              autoFocus
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How does ESP Matching work?"
            />
            <button className="mt-2 w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
              Ask
            </button>
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
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Table of Contents
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
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id
                    ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500"
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

// ─── ESP Matching Flow Mockup ─────────────────────────────────────────────────
function ESPMatchingFlowMockup() {
  const [activeRoute, setActiveRoute] = useState<"google" | "microsoft" | null>(null);

  const senders = [
    { label: "Google Workspace", color: "bg-red-50 border-red-200 text-red-700", dot: "bg-red-400", type: "google" as const },
    { label: "Microsoft Outlook", color: "bg-blue-50 border-blue-200 text-blue-700", dot: "bg-blue-500", type: "microsoft" as const },
  ];

  const recipients = [
    { label: "alice@gmail.com", type: "google" as const, color: "text-red-600 bg-red-50 border-red-200" },
    { label: "bob@outlook.com", type: "microsoft" as const, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { label: "carol@gmail.com", type: "google" as const, color: "text-red-600 bg-red-50 border-red-200" },
    { label: "dan@hotmail.com", type: "microsoft" as const, color: "text-blue-600 bg-blue-50 border-blue-200" },
  ];

  return (
    <BrowserFrame title="360Airo — ESP Matching Engine">
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
                <Shuffle className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-gray-900">ESP Matching</h3>
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
                  ✓ Active
                </span>
                <span className="text-[10px] font-bold text-violet-700 bg-violet-100 border border-violet-200 px-2 py-0.5 rounded-full">
                  Expert Plan
                </span>
              </div>
              <p className="text-xs text-gray-400">Auto-routing emails through matching providers</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <Settings className="w-3.5 h-3.5" /> Configure
          </button>
        </div>

        {/* Routing Diagram */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Live Routing Map</p>
          <div className="flex items-center justify-between gap-4">
            {/* Senders */}
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Senders</p>
              {senders.map((s) => (
                <button
                  key={s.type}
                  onMouseEnter={() => setActiveRoute(s.type)}
                  onMouseLeave={() => setActiveRoute(null)}
                  className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 text-xs font-semibold transition ${s.color} ${
                    activeRoute === s.type ? "shadow-md scale-105" : "hover:shadow-sm"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                  {s.label}
                </button>
              ))}
            </div>

            {/* Engine */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex flex-col items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
                <span className="text-white text-[8px] font-black leading-none mt-0.5">ESP</span>
              </div>
              <p className="text-[9px] font-bold text-gray-400 text-center">Matching<br />Engine</p>
            </div>

            {/* Recipients */}
            <div className="flex flex-col gap-2 flex-1 items-end">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recipients</p>
              {recipients.map((r, i) => (
                <div
                  key={i}
                  className={`border rounded-xl px-3 py-1.5 text-[10px] font-semibold transition ${r.color} ${
                    activeRoute === r.type ? "shadow-md scale-105 ring-2 ring-offset-1 ring-current/20" : ""
                  }`}
                >
                  {r.label}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-4">
            Hover a sender to see matching recipients highlighted
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Matched Routes", val: "2", sub: "Google + Microsoft", icon: "🔀", bg: "bg-violet-50", color: "text-violet-700", iconBg: "bg-violet-500" },
            { label: "Market Coverage", val: "80%+", sub: "of all recipients", icon: "🌍", bg: "bg-blue-50", color: "text-blue-700", iconBg: "bg-blue-500" },
            { label: "Deliverability", val: "↑ High", sub: "inbox placement", icon: "✅", bg: "bg-green-50", color: "text-green-700", iconBg: "bg-green-500" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl border border-white p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-bold ${s.color}`}>{s.label}</p>
                <div className={`w-8 h-8 rounded-xl ${s.iconBg} flex items-center justify-center text-sm shadow-sm`}>
                  {s.icon}
                </div>
              </div>
              <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Campaign Settings Mockup ─────────────────────────────────────────────────
function CampaignESPMockup() {
  const [espEnabled, setEspEnabled] = useState(true);

  return (
    <BrowserFrame title="360Airo — Campaign Settings · Email Accounts">
      <div className="bg-gray-50/60 p-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <p className="text-sm font-bold text-gray-900">Email Account Assignment</p>
              <p className="text-[11px] text-gray-400">Choose how 360Airo routes outbound emails</p>
            </div>
            <span className="text-[10px] font-bold text-green-700 bg-green-100 border border-green-200 px-2.5 py-1 rounded-full">
              2 accounts connected
            </span>
          </div>

          <div className="px-5 py-4 space-y-3">
            {/* ESP Matching toggle row */}
            <div className={`flex items-start gap-3 p-4 rounded-xl border-2 transition ${
              espEnabled ? "border-violet-300 bg-violet-50/50" : "border-gray-200 bg-gray-50"
            }`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Shuffle className={`w-4 h-4 ${espEnabled ? "text-violet-600" : "text-gray-400"}`} />
                  <p className={`text-sm font-bold ${espEnabled ? "text-violet-900" : "text-gray-600"}`}>
                    ESP Matching
                  </p>
                  {espEnabled && (
                    <span className="text-[9px] font-bold text-violet-700 bg-violet-200 px-1.5 py-0.5 rounded-full">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Automatically match each recipient with the inbox from the same email provider — Google → Google, Microsoft → Microsoft.
                </p>
              </div>
              <button
                onClick={() => setEspEnabled((p) => !p)}
                className={`relative w-10 h-5.5 rounded-full transition flex-shrink-0 mt-0.5 ${
                  espEnabled ? "bg-violet-600" : "bg-gray-300"
                }`}
                style={{ minWidth: "2.5rem", height: "1.375rem" }}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    espEnabled ? "left-[calc(100%-1.125rem)]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Connected accounts */}
            {[
              { email: "sender@company.com", provider: "Google Workspace", badge: "bg-red-100 text-red-700 border-red-200", icon: "🇬", sent: "0/55 today" },
              { email: "outreach@company.com", provider: "Microsoft Outlook", badge: "bg-blue-100 text-blue-700 border-blue-200", icon: "🇴", sent: "0/50 today" },
            ].map((acc, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-lg shadow-sm">
                    {acc.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{acc.email}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${acc.badge}`}>
                        {acc.provider}
                      </span>
                      <span className="text-[9px] text-gray-400 flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5" /> {acc.sent}
                      </span>
                    </div>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How do I set up ESP matching in 360Airo?",
    a: "Connect multiple inboxes from different providers in your 360Airo account. Once connected, ESP matching activates automatically when you launch a campaign. It is available on the Expert and Agency plans with no manual activation needed.",
    icon: Settings,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    q: "How does ESP matching work if I don't have a Google or Microsoft account?",
    a: "ESP matching currently applies to Google Workspace and Outlook accounts only. These two providers cover over 80% of the global market share. If neither is connected, ESP matching will not apply to your campaigns at this time.",
    icon: Globe,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    q: "Can ESP matching improve my campaign performance?",
    a: "Yes. Same-provider routing builds stronger sender reputation — emails from a Google inbox to a Gmail recipient are naturally trusted more, reducing spam triggers and increasing inbox placement.",
    icon: BarChart2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    q: "What happens if I have more Outlook recipients than available Outlook sender inboxes?",
    a: "If the number of Outlook recipients exceeds your available Outlook sender inboxes, 360Airo automatically routes the overflow through your other connected inboxes. Your campaign continues without interruption.",
    icon: Shuffle,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    q: "Do I need to manually match ESPs for each contact?",
    a: "No. 360Airo's ESP Matching Engine automatically detects each recipient's provider and routes through the best matching inbox. The entire process is hands-free once your accounts are connected.",
    icon: Zap,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  {
    q: "Can I use ESP matching with only one type of inbox connected?",
    a: "ESP matching requires at least one Google Workspace inbox and one Microsoft Outlook inbox to route between. With only one provider type connected, there is no alternate inbox to match against, so the feature will not activate.",
    icon: Inbox,
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
];

// ─── FAQ Item Component with Collapsible Answer ───────────────────────────────
function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      className={`rounded-xl border ${faq.border} overflow-hidden bg-white`}
    >
      {/* Question Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
      >
        <div className={`flex items-start gap-3 px-4 py-3.5 ${faq.bg} hover:opacity-90 transition`}>
          <div className="flex items-center gap-2 flex-1">
            <span className={`text-xs font-black ${faq.color} min-w-[1.25rem]`}>{index + 1}.</span>
            <Icon className={`w-3.5 h-3.5 ${faq.color} flex-shrink-0`} />
            <p className="text-sm font-semibold text-gray-900 flex-1">{faq.q}</p>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Answer - Collapsible */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed pl-8">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ESPMatchingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeToc, setActiveToc] = useState("overview");

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
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
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
                <motion.nav
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6"
                >
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">Email Deliverability</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">ESP Matching</span>
                </motion.nav>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ESP Matching</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Improve email deliverability by automatically routing each outbound email through the inbox
                    that matches your recipient's email provider — Google to Google, Microsoft to Microsoft — for
                    higher inbox placement and stronger sender reputation.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Overview ── */}
                <motion.div
                  id="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    <strong>ESP Matching</strong> (Email Service Provider Matching) is a 360Airo deliverability feature
                    that analyses each recipient's email provider and automatically selects the best matching sender
                    inbox for that email. Rather than sending all campaign emails from a single inbox, 360Airo
                    intelligently distributes sends to maximise provider-to-provider trust.
                  </p>

                  {/* 3 concept cards */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      {
                        icon: Shuffle,
                        bg: "bg-violet-50",
                        color: "text-violet-600",
                        border: "border-violet-200",
                        title: "Smart Routing",
                        desc: "Automatically routes each email through the inbox that matches the recipient's provider",
                      },
                      {
                        icon: Shield,
                        bg: "bg-emerald-50",
                        color: "text-emerald-600",
                        border: "border-emerald-200",
                        title: "Better Reputation",
                        desc: "Same-provider sends are trusted more — fewer spam flags and stronger sender scores",
                      },
                      {
                        icon: BarChart2,
                        bg: "bg-blue-50",
                        color: "text-blue-600",
                        border: "border-blue-200",
                        title: "Higher Inbox Rate",
                        desc: "More of your emails land in the inbox instead of spam or promotions tabs",
                      },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={card.title}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
                          className={`rounded-xl border ${card.border} ${card.bg} p-4`}
                        >
                          <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                          <p className={`text-sm font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>ESP Matching is available on Expert and Agency plans.</strong> It activates automatically
                      once you have both a Google Workspace and a Microsoft Outlook inbox connected to your 360Airo workspace.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── How It Works ── */}
                <motion.div
                  id="how-it-works"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-10"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How does it work?</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The ESP Matching Engine sits between your connected inboxes and your campaign recipients. It
                    detects each recipient's provider in real time and routes the outbound email through the inbox
                    that shares the same provider — entirely automatically. Hover the sender buttons in the mockup
                    below to see the routing in action.
                  </p>

                  <div className="mb-5">
                    <ESPMatchingFlowMockup />
                  </div>

                  {/* Step-by-step */}
                  <div className="space-y-3 mb-5">
                    {[
                      {
                        step: "01",
                        color: "bg-violet-600",
                        icon: Mail,
                        title: "Recipient provider is detected",
                        desc: "When 360Airo prepares to send an email, it checks the recipient's domain (e.g. @gmail.com or @outlook.com) and identifies the underlying email provider — Google Workspace or Microsoft.",
                      },
                      {
                        step: "02",
                        color: "bg-blue-600",
                        icon: Zap,
                        title: "Best matching inbox is selected",
                        desc: "The ESP Matching Engine scans your connected inboxes and selects the one from the same provider. If the recipient uses Gmail, 360Airo sends from your Google Workspace inbox. Outlook recipient? Microsoft inbox is used.",
                      },
                      {
                        step: "03",
                        color: "bg-emerald-600",
                        icon: ArrowRight,
                        title: "Email is routed and delivered",
                        desc: "The email is dispatched from the matched inbox. The recipient receives an email from a familiar, trusted provider — improving deliverability, open rates, and reducing spam classification.",
                      },
                      {
                        step: "04",
                        color: "bg-orange-500",
                        icon: Shuffle,
                        title: "Overflow is handled automatically",
                        desc: "If you have more recipients on one provider than available matched inboxes, 360Airo automatically overflows those sends to your other connected inboxes so your campaign never stalls.",
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.05 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition"
                        >
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

                {/* ── Campaign Performance ── */}
                <motion.div
                  id="performance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-10"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Can ESP Matching improve my campaign performance?
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Yes. ESP matching improves campaign performance by increasing deliverability and reducing
                    the chance of emails being marked as spam. When sender and recipient use the same email
                    provider, there is a higher level of inherent trust — leading to better inbox placement,
                    higher open rates, and stronger overall campaign health.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      {
                        icon: Inbox,
                        bg: "bg-emerald-50",
                        color: "text-emerald-600",
                        border: "border-emerald-200",
                        title: "Higher Inbox Placement",
                        desc: "Matched providers carry stronger mutual trust, meaning your emails are far less likely to be flagged or filtered.",
                      },
                      {
                        icon: Shield,
                        bg: "bg-violet-50",
                        color: "text-violet-600",
                        border: "border-violet-200",
                        title: "Lower Spam Risk",
                        desc: "Same-provider routing reduces the triggers that spam filters use to classify cold outreach as junk mail.",
                      },
                      {
                        icon: BarChart2,
                        bg: "bg-blue-50",
                        color: "text-blue-600",
                        border: "border-blue-200",
                        title: "Better Reply Rates",
                        desc: "More emails reaching the inbox directly translates into higher open rates and more replies to your campaigns.",
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className={`rounded-xl border ${item.border} ${item.bg} p-4`}
                        >
                          <Icon className={`w-5 h-5 ${item.color} mb-2`} />
                          <p className={`text-sm font-bold ${item.color} mb-1`}>{item.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Industry insight:</strong> Google Workspace and Microsoft Outlook together account for
                      over 80% of business email market share. By matching these two providers alone, ESP Matching covers
                      the vast majority of your recipients automatically.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Setting Up ── */}
                <motion.div
                  id="setup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">✓</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Setting up ESP Matching</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    There is no manual setup — ESP Matching activates automatically when the right conditions are met.
                    The interactive mockup below shows how it appears in your campaign settings.
                  </p>

                  <div className="mb-5">
                    <CampaignESPMockup />
                  </div>

                  {/* Requirements table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="grid grid-cols-[1fr_1.5fr_1fr] bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Requirement</div>
                      <div className="px-4 py-2.5 border-x border-gray-200">Details</div>
                      <div className="px-4 py-2.5">Status</div>
                    </div>
                    {[
                      ["Expert / Agency Plan", "ESP Matching is only available on Expert and Agency tier plans", "Required"],
                      ["Google Workspace Inbox", "At least one active Google Workspace account connected in Email Configuration", "Needed for Google routing"],
                      ["Microsoft Outlook Inbox", "At least one active Outlook / Microsoft 365 account connected in Email Configuration", "Needed for Microsoft routing"],
                      ["Active Campaign", "ESP Matching activates automatically when you launch a campaign — no toggle needed", "Auto-activates"],
                    ].map(([req, detail, status], i) => (
                      <div
                        key={req}
                        className={`grid grid-cols-[1fr_1.5fr_1fr] border-b border-gray-100 last:border-0 text-xs ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                      >
                        <div className="px-4 py-2.5 font-semibold text-gray-800">{req}</div>
                        <div className="px-4 py-2.5 text-gray-500 border-x border-gray-100">{detail}</div>
                        <div className="px-4 py-2.5 font-mono text-[10px] text-violet-700">{status}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      <strong>Only one provider connected?</strong> If you only have Google Workspace or only Microsoft
                      Outlook accounts connected, ESP Matching will not activate — there are no alternate inboxes to
                      route between. Connect both provider types to unlock the feature.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── FAQs ── */}
                <motion.div
                  id="faqs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-10"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Common FAQs related to ESP Matching</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Everything you need to know about using ESP Matching in 360Airo.
                  </p>

                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <FAQItem key={i} faq={faq} index={i} />
                    ))}
                  </div>
                </motion.div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 8 months ago</span>
                </div>

                <div className="border-t border-gray-200 my-8" />

                {/* Prev / Next nav */}
                <div className="flex items-center justify-between gap-4">
                  <Link
                    href="/docs/email-deliverability/email-validation/force-send"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Force Send Invalid Emails
                  </Link>
                  <Link
                    href="/docs/email-deliverability/block-list"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition"
                  >
                    Block List
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