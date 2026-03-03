"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Linkedin,
  CheckCircle2, AlertCircle, Info, Star, UserPlus, Eye,
  MessageSquare, Mail, Heart, Award, Users, Send, Zap,
  ArrowRight, Play, Pause, SkipForward, Settings, Activity,
  TrendingUp, Shield, Timer, BarChart2, RefreshCw, Bell,
  UserCheck, ThumbsUp, ChevronLeft, X, Plus, Layers,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-are-linkedin-actions", label: "What are LinkedIn Actions" },
  { id: "all-actions",               label: "All 7 action types" },
  { id: "actions-in-sequence",       label: "Actions in a sequence" },
  { id: "action-limits",             label: "Daily limits & safety" },
  { id: "connection-request",        label: "Connection Request" },
  { id: "view-profile",              label: "View Profile" },
  { id: "follow",                    label: "Follow" },
  { id: "send-message",              label: "Send Message" },
  { id: "inmail",                    label: "InMail" },
  { id: "endorse-skills",            label: "Endorse Skills" },
  { id: "best-practices",            label: "Best practices" },
];

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
              placeholder="e.g. What is the daily limit for connection requests?" />
            <button className="mt-2 w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">Ask</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TableOfContents({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-56 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On this page</span>
          </div>
          <nav className="py-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
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

function ScreenFrame({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {url && <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-500 font-mono truncate">🔒 {url}</div>}
      </div>
      {children}
    </div>
  );
}

// ─── ACTION CARD CONFIG ───────────────────────────────────────────────────────
const ACTIONS = [
  {
    id: "connection-request",
    icon: UserPlus,
    label: "Connection Request",
    shortLabel: "Connect",
    color: "blue",
    bg: "bg-blue-600",
    lightBg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-700",
    dailyLimit: "20–100/day",
    requiresDegree: "2nd / 3rd degree",
    noteLimit: "300 chars",
    delay: "Recommended",
    description: "Sends a LinkedIn connection request with an optional personalised note. The most common entry point to a LinkedIn outreach sequence.",
    whenToUse: "Use as the first step when targeting prospects who are not yet in your network. All follow-up actions (message, InMail) only make sense after connection is accepted.",
    tips: [
      "Keep the note under 200 characters for best acceptance rates",
      "Mention something specific — their role, company, or a shared connection",
      "Never pitch in the connection note — just establish relevance",
      "Add a 24–48h delay before the next action after sending",
    ],
  },
  {
    id: "view-profile",
    icon: Eye,
    label: "View Profile",
    shortLabel: "View",
    color: "indigo",
    bg: "bg-indigo-600",
    lightBg: "bg-indigo-50",
    border: "border-indigo-200",
    textColor: "text-indigo-700",
    dailyLimit: "Up to 200/day",
    requiresDegree: "Any degree",
    noteLimit: "N/A",
    delay: "Optional",
    description: "Visits the prospect's LinkedIn profile. This triggers a 'profile view' notification to the prospect — warming them up before your connection request or message arrives.",
    whenToUse: "Use as the very first action in a sequence, 24–48 hours before your connection request. The 'someone viewed your profile' notification piques curiosity and increases connection acceptance rates.",
    tips: [
      "Always place View Profile before the connection request for best results",
      "No message or note required — just the profile visit",
      "Works for any connection degree — even 3rd degree and beyond",
      "High daily limit makes it the safest warm-up action",
    ],
  },
  {
    id: "follow",
    icon: Heart,
    label: "Follow",
    shortLabel: "Follow",
    color: "pink",
    bg: "bg-pink-600",
    lightBg: "bg-pink-50",
    border: "border-pink-200",
    textColor: "text-pink-700",
    dailyLimit: "Up to 150/day",
    requiresDegree: "Any degree",
    noteLimit: "N/A",
    delay: "Optional",
    description: "Follows the prospect's LinkedIn profile. They receive a notification that you followed them — another warm-up signal before your connection request lands.",
    whenToUse: "Use alongside or after View Profile for an additional warm-up touch. Particularly effective for high-profile prospects (founders, executives) who post content — following shows genuine interest.",
    tips: [
      "Combine with View Profile for a double warm-up before the connection request",
      "Works even for people you're not connected with",
      "Avoid following and connecting the same day — spread actions over 2–3 days",
      "Best results with prospects who are active LinkedIn content creators",
    ],
  },
  {
    id: "send-message",
    icon: MessageSquare,
    label: "Send Message",
    shortLabel: "Message",
    color: "emerald",
    bg: "bg-emerald-600",
    lightBg: "bg-emerald-50",
    border: "border-emerald-200",
    textColor: "text-emerald-700",
    dailyLimit: "Up to 100/day",
    requiresDegree: "1st degree only",
    noteLimit: "Unlimited",
    delay: "Required",
    description: "Sends a direct LinkedIn message to 1st-degree connections. This is the primary follow-up action after a connection request is accepted.",
    whenToUse: "Use after a connection request is accepted. This is where you make your actual pitch — context has been established, the prospect knows who you are, so a direct message is welcome rather than cold.",
    tips: [
      "Only works for 1st-degree connections — non-connections are automatically skipped",
      "Use merge tags ({{first_name}}, {{company}}) for personalisation at scale",
      "Keep the opening line short — get to value in the first sentence",
      "Add at least a 1-day delay after connection acceptance before messaging",
    ],
  },
  {
    id: "inmail",
    icon: Mail,
    label: "InMail",
    shortLabel: "InMail",
    color: "amber",
    bg: "bg-amber-500",
    lightBg: "bg-amber-50",
    border: "border-amber-200",
    textColor: "text-amber-700",
    dailyLimit: "Limited by credits",
    requiresDegree: "Any degree",
    noteLimit: "200 chars subject, 2000 body",
    delay: "Recommended",
    description: "Sends a LinkedIn InMail — a paid sponsored message that reaches prospects regardless of connection status. Requires LinkedIn Premium or Sales Navigator InMail credits.",
    whenToUse: "Use for high-value prospects where a connection request has been ignored or declined, or when you need to reach 2nd/3rd degree contacts with a direct message immediately without waiting for connection.",
    tips: [
      "InMail credits are limited (typically 20–50/month on premium plans) — use selectively",
      "Subject line is the most important field — keep it under 10 words",
      "InMails with free response option (recipient can reply for free) get 2× higher response rates",
      "Best for senior prospects, executives, and decision-makers who get many connection requests",
    ],
  },
  {
    id: "endorse-skills",
    icon: Award,
    label: "Endorse Skills",
    shortLabel: "Endorse",
    color: "violet",
    bg: "bg-violet-600",
    lightBg: "bg-violet-50",
    border: "border-violet-200",
    textColor: "text-violet-700",
    dailyLimit: "Up to 50/day",
    requiresDegree: "1st degree only",
    noteLimit: "N/A",
    delay: "Recommended",
    description: "Endorses one or more of the prospect's listed LinkedIn skills. They receive a notification — this is a powerful warm-up action that builds genuine goodwill before your follow-up message.",
    whenToUse: "Use after connecting, before your first direct message. An endorsement notification is highly noticeable and feels personal — it tells the prospect you've actually looked at their profile in detail.",
    tips: [
      "Only works for 1st-degree connections — connect first, then endorse",
      "Endorse skills that are actually relevant to their role — avoid random endorsements",
      "Best placed 1–2 days after connection acceptance and before the first message",
      "Creates strong reciprocity — prospects endorsed by you are significantly more likely to reply",
    ],
  },
];

// ─── MOCKUP 1: All Actions Overview Panel ─────────────────────────────────────
function ActionsOverviewMockup() {
  const [activeAction, setActiveAction] = useState(ACTIONS[0]);

  return (
    <ScreenFrame url="app.360airo.com/linkedin-outreach/actions">
      <div className="flex h-[420px] bg-white">
        {/* Left: action list */}
        <div className="w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="px-3 py-3 border-b border-gray-200">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Linkedin className="w-3 h-3 text-blue-600" /> LinkedIn Actions
            </p>
          </div>
          {ACTIONS.map(action => {
            const Icon = action.icon;
            return (
              <button key={action.id} onClick={() => setActiveAction(action)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all border-l-2 ${
                  activeAction.id === action.id
                    ? `${action.lightBg} border-${action.color}-500 border-l-2`
                    : "border-transparent hover:bg-white"
                }`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeAction.id === action.id ? action.bg : "bg-gray-200"
                }`}>
                  <Icon className={`w-3 h-3 ${activeAction.id === action.id ? "text-white" : "text-gray-500"}`} />
                </div>
                <span className={`text-xs font-semibold ${activeAction.id === action.id ? action.textColor : "text-gray-600"}`}>
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: action detail */}
        <AnimatePresence mode="wait">
          <motion.div key={activeAction.id} initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-10 }}
            transition={{ duration:0.15 }} className="flex-1 p-5 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${activeAction.bg} flex items-center justify-center shadow-sm flex-shrink-0`}>
                {(() => { const Icon = activeAction.icon; return <Icon className="w-5 h-5 text-white" />; })()}
              </div>
              <div>
                <h4 className={`text-sm font-black ${activeAction.textColor}`}>{activeAction.label}</h4>
                <p className="text-[10px] text-gray-400">{activeAction.description.split(".")[0]}.</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label:"Daily limit",       value: activeAction.dailyLimit },
                { label:"Requires",          value: activeAction.requiresDegree },
                { label:"Delay advised",     value: activeAction.delay },
              ].map(stat => (
                <div key={stat.label} className={`rounded-xl ${activeAction.lightBg} border ${activeAction.border} px-3 py-2`}>
                  <p className="text-[8px] font-black text-gray-500 uppercase tracking-wider mb-0.5">{stat.label}</p>
                  <p className={`text-xs font-bold ${activeAction.textColor}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* When to use */}
            <div className={`rounded-xl ${activeAction.lightBg} border ${activeAction.border} px-4 py-3 mb-4`}>
              <p className={`text-[9px] font-black uppercase tracking-wider ${activeAction.textColor} mb-1`}>When to use</p>
              <p className="text-xs text-gray-700 leading-relaxed">{activeAction.whenToUse}</p>
            </div>

            {/* Tips */}
            <div>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-wider mb-2">Tips</p>
              <div className="space-y-1.5">
                {activeAction.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className={`w-3 h-3 flex-shrink-0 mt-0.5 ${activeAction.textColor}`} />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 2: Sequence Builder with Actions ──────────────────────────────────
function SequenceBuilderMockup() {
  const DEFAULT_SEQUENCE = [
    { id:1, action:"View Profile",        icon:Eye,         bg:"bg-indigo-600", delay:null,   delayVal:0  },
    { id:2, action:"Follow",              icon:Heart,       bg:"bg-pink-600",   delay:"1 day",  delayVal:1  },
    { id:3, action:"Connection Request",  icon:UserPlus,    bg:"bg-blue-600",   delay:"1 day",  delayVal:1  },
    { id:4, action:"Send Message",        icon:MessageSquare,bg:"bg-emerald-600",delay:"2 days", delayVal:2  },
    { id:5, action:"Endorse Skills",      icon:Award,       bg:"bg-violet-600", delay:"1 day",  delayVal:1  },
  ];

  const [sequence, setSequence]   = useState(DEFAULT_SEQUENCE);
  const [running, setRunning]     = useState(false);
  const [activeStep, setActiveStep] = useState<number|null>(null);

  const addAction = (type: typeof ACTIONS[0]) => {
    setSequence(prev => [...prev, {
      id: Date.now(),
      action: type.label,
      icon: type.icon,
      bg: type.bg,
      delay: "1 day",
      delayVal: 1,
    }]);
  };

  const removeStep = (id: number) => setSequence(prev => prev.filter(s => s.id !== id));

  const simulate = () => {
    setRunning(true);
    setActiveStep(0);
    sequence.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), i * 700);
    });
    setTimeout(() => { setRunning(false); setActiveStep(null); }, sequence.length * 700 + 400);
  };

  return (
    <ScreenFrame url="app.360airo.com/linkedin-outreach/sequence/build">
      <div className="bg-white">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-black text-gray-900">Sequence Builder</p>
            <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-full">{sequence.length} steps</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={simulate} disabled={running}
              className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg transition ${
                running ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}>
              {running ? <><RefreshCw className="w-3 h-3 animate-spin" /> Simulating…</> : <><Play className="w-3 h-3" /> Simulate</>}
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sequence timeline */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[380px]">
            <div className="space-y-0">
              {sequence.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep === i;
                return (
                  <div key={step.id} className="flex gap-3">
                    {/* Left timeline */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <motion.div
                        animate={{ scale: isActive ? [1, 1.15, 1] : 1 }}
                        transition={{ duration:0.3 }}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-all ${
                          isActive ? `${step.bg} ring-4 ring-offset-1 ring-blue-200` : step.bg
                        }`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                      {i < sequence.length - 1 && (
                        <div className="flex flex-col items-center mt-1 mb-1">
                          <div className="w-px h-3 bg-gray-200" />
                          {step.delay && (
                            <div className="bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5 flex items-center gap-1 my-0.5">
                              <Timer className="w-2.5 h-2.5 text-gray-400" />
                              <span className="text-[8px] font-bold text-gray-500">{step.delay}</span>
                            </div>
                          )}
                          <div className="w-px h-3 bg-gray-200" />
                        </div>
                      )}
                    </div>
                    {/* Step content */}
                    <div className={`flex-1 mb-1 rounded-xl border px-3 py-2.5 transition-all ${
                      isActive ? "border-blue-300 bg-blue-50/40 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-900">{step.action}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5">
                            Step {i + 1}
                            {step.delay && ` · Wait ${step.delay} before this step`}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isActive && (
                            <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }}
                              className="text-[9px] font-black text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                              <Activity className="w-2.5 h-2.5" /> Running
                            </motion.span>
                          )}
                          <button onClick={() => removeStep(step.id)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-red-50 transition">
                            <X className="w-3 h-3 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add step */}
              <div className="flex gap-3 mt-2">
                <div className="w-8 flex-shrink-0" />
                <button className="flex-1 border-2 border-dashed border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition flex items-center justify-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Add Action
                </button>
              </div>
            </div>
          </div>

          {/* Right: quick-add panel */}
          <div className="w-36 flex-shrink-0 border-l border-gray-200 bg-gray-50 p-2.5 overflow-y-auto max-h-[380px]">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-wider mb-2">Add Action</p>
            <div className="space-y-1.5">
              {ACTIONS.map(a => {
                const Icon = a.icon;
                return (
                  <button key={a.id} onClick={() => addAction(a)}
                    className="w-full flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-2 hover:border-blue-300 hover:bg-blue-50/30 transition">
                    <div className={`w-5 h-5 rounded-md ${a.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700 truncate">{a.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 3: Daily Limits Dashboard ────────────────────────────────────────
function DailyLimitsMockup() {
  const LIMITS = [
    { action:"Connection Request", used:34,  max:80,  color:"bg-blue-500",   safe:80  },
    { action:"View Profile",       used:142, max:200, color:"bg-indigo-500", safe:200 },
    { action:"Follow",             used:60,  max:150, color:"bg-pink-500",   safe:150 },
    { action:"Send Message",       used:45,  max:100, color:"bg-emerald-500",safe:100 },
    { action:"InMail",             used:8,   max:20,  color:"bg-amber-500",  safe:20  },
    { action:"Endorse Skills",     used:22,  max:50,  color:"bg-violet-500", safe:50  },
  ];

  return (
    <ScreenFrame url="app.360airo.com/linkedin-outreach/limits">
      <div className="bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-black text-gray-900">Daily Action Usage</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Resets every 24 hours · Today, Tuesday</p>
          </div>
          <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full flex items-center gap-1">
            <Shield className="w-3 h-3" /> Within safe limits
          </span>
        </div>
        <div className="space-y-3">
          {LIMITS.map((item, i) => {
            const pct = Math.round((item.used / item.max) * 100);
            const barColor = pct > 85 ? "bg-red-400" : pct > 65 ? "bg-amber-400" : item.color;
            return (
              <motion.div key={item.action} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.05 }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-700">{item.action}</span>
                  <span className={`text-[10px] font-bold ${pct > 85 ? "text-red-500" : pct > 65 ? "text-amber-600" : "text-gray-500"}`}>
                    {item.used} / {item.max}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ delay:0.2+i*0.05, duration:0.6, ease:"easeOut" }}
                    className={`h-full rounded-full ${barColor}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-[10px] text-amber-700">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>360Airo automatically pauses actions when 90% of daily limits are reached to protect your account from LinkedIn restrictions.</span>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 4: Sample high-performing sequence ───────────────────────────────
function SampleSequenceMockup() {
  const STEPS = [
    { day:"Day 1",     icon:Eye,          bg:"bg-indigo-500", label:"View Profile",       note:"Triggers 'someone viewed your profile' notification" },
    { day:"Day 2",     icon:Heart,        bg:"bg-pink-500",   label:"Follow",             note:"Second warm-up touch — builds curiosity" },
    { day:"Day 3",     icon:UserPlus,     bg:"bg-blue-600",   label:"Connection Request", note:"Now they recognise you from 2 previous interactions" },
    { day:"Accepted",  icon:MessageSquare,bg:"bg-emerald-600",label:"Send Message",       note:"Your personalised pitch — sent once they accept" },
    { day:"+2 days",   icon:Award,        bg:"bg-violet-600", label:"Endorse Skills",     note:"Goodwill action — boosts reply rate significantly" },
    { day:"+3 days",   icon:Mail,         bg:"bg-amber-500",  label:"Auto Email",         note:"Follow-up email if no reply after 3 days" },
  ];

  return (
    <ScreenFrame url="360Airo recommended sequence — 6-step LinkedIn + Email">
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-amber-500" />
          <p className="text-xs font-black text-gray-900">Recommended 6-Step Sequence</p>
          <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Highest reply rate</span>
        </div>
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center flex-shrink-0">
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.08 }}
                  className="flex flex-col items-center w-28">
                  <div className="text-[9px] font-black text-gray-400 mb-2">{step.day}</div>
                  <div className={`w-10 h-10 rounded-2xl ${step.bg} flex items-center justify-center shadow-md mb-2 flex-shrink-0`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-800 text-center leading-tight mb-1">{step.label}</p>
                  <p className="text-[8px] text-gray-400 text-center leading-snug">{step.note}</p>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className="flex items-center mx-1 flex-shrink-0 mt-[-20px]">
                    <div className="w-4 h-px border-t-2 border-dashed border-gray-300" />
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label:"Avg acceptance rate", val:"38%",  color:"text-blue-600"    },
            { label:"Avg reply rate",       val:"22%",  color:"text-emerald-600" },
            { label:"Avg sequence time",    val:"9 days", color:"text-violet-600" },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-center">
              <p className={`text-base font-black ${stat.color}`}>{stat.val}</p>
              <p className="text-[8px] text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LinkedInActionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-are-linkedin-actions");

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    if (!isMounted) return;
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveToc(id); }, { rootMargin: "-20% 0px -70% 0px" });
      o.observe(el);
      obs.push(o);
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
                <motion.nav initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">LinkedIn Outreach</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">LinkedIn Actions</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">LinkedIn Actions</h1>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    LinkedIn Actions are the individual building blocks of every LinkedIn outreach sequence in
                    360Airo. Each action performs a specific activity on LinkedIn — from viewing a profile to
                    sending a connection request or endorsing skills — and can be combined in any order with
                    delays to build a complete multi-touch outreach sequence.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── What are LinkedIn Actions ── */}
                <motion.div id="what-are-linkedin-actions" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    Every LinkedIn campaign in 360Airo is built from a sequence of actions. You choose which
                    actions to include, in what order, and how long to wait between each one. 360Airo then
                    executes the entire sequence automatically from your connected LinkedIn account.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                    {ACTIONS.map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.div key={action.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.06 }}
                          className={`rounded-xl border ${action.border} ${action.lightBg} p-3.5 flex items-center gap-3`}>
                          <div className={`w-8 h-8 rounded-xl ${action.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className={`text-xs font-bold ${action.textColor}`}>{action.label}</p>
                            <p className="text-[9px] text-gray-400 mt-0.5">{action.dailyLimit}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      All actions run from your connected LinkedIn account — they appear as human activity.
                      360Airo respects daily limits for each action type and automatically pauses when limits
                      approach to protect your account from LinkedIn restrictions.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── All 7 Actions Interactive Panel ── */}
                <motion.div id="all-actions" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">All 6 action types</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Click any action in the left panel to see its daily limit, when to use it, and best practice
                    tips. All 6 actions are interactive.
                  </p>
                  <ActionsOverviewMockup />
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Actions in a sequence ── */}
                <motion.div id="actions-in-sequence" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.14 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Actions in a sequence</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Build your sequence by adding actions in order with delays between each step. The builder
                    below is interactive — click any action in the right panel to add it, remove steps with
                    the × button, and click <strong>Simulate</strong> to watch the sequence run step by step.
                  </p>
                  <div className="mb-5"><SequenceBuilderMockup /></div>

                  <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700 mb-5">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Warm-up before connecting.</strong> Always place <strong>View Profile</strong> and/or
                      <strong> Follow</strong> 24–48 hours before your Connection Request. Prospects who've
                      already seen your name accept at 2× the rate of cold requests.
                    </span>
                  </div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Sequence rules & logic</p>
                    </div>
                    {[
                      ["Action order",       "Actions execute in the order you've placed them in the sequence — top to bottom"],
                      ["Delays between steps","You can set a delay (hours or days) between any two actions — give time for notifications to land"],
                      ["Conditional skipping","If a Connection Request is declined or not accepted, dependent steps like Send Message are automatically skipped"],
                      ["1st-degree check",   "Send Message and Endorse Skills only fire for 1st-degree connections — others are automatically skipped"],
                      ["Credit check",       "InMail steps are skipped if you've run out of InMail credits — no error, just skipped with a log entry"],
                      ["Daily limit pausing","If a daily limit is hit mid-sequence, 360Airo queues remaining actions and resumes the next day"],
                    ].map(([label, desc], i) => (
                      <div key={label} className={`grid grid-cols-[170px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Recommended sequence ── */}
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Recommended 6-step sequence</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The sequence below is the highest-performing LinkedIn outreach pattern in 360Airo based on
                    average acceptance and reply rates across all accounts.
                  </p>
                  <SampleSequenceMockup />
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Daily limits ── */}
                <motion.div id="action-limits" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.16 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Daily limits & account safety</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Every LinkedIn action has a safe daily limit. 360Airo tracks your usage in real time and
                    automatically pauses when limits approach 90% to prevent LinkedIn account restrictions.
                  </p>
                  <div className="mb-5"><DailyLimitsMockup /></div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Daily limits per action type</p>
                    </div>
                    {[
                      ["Connection Request", "20–100/day",     "Depends on account age, SSI score, and history. New accounts start at ~20/day"],
                      ["View Profile",       "Up to 200/day",  "Safest action — high limit, low risk. Ideal for warm-up at scale"],
                      ["Follow",             "Up to 150/day",  "Safe and high-limit. Works for any connection degree"],
                      ["Send Message",       "Up to 100/day",  "1st-degree only. Premium accounts may have higher limits"],
                      ["InMail",             "20–50/month",    "Monthly credit limit set by your LinkedIn plan. Cannot be exceeded"],
                      ["Endorse Skills",     "Up to 50/day",   "1st-degree only. Lower limit but high reciprocity value per action"],
                    ].map(([action, limit, note], i) => (
                      <div key={action} className={`grid grid-cols-[150px_110px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-800 font-semibold">{action}</span>
                        <span className="text-blue-600 font-bold">{limit}</span>
                        <span className="text-gray-500">{note}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Account age matters.</strong> LinkedIn accounts created less than 3 months ago
                      have significantly lower safe limits (often 10–15 connection requests/day). Run at 50%
                      of stated limits for the first 30 days to build account trust before scaling up.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Individual action deep-dives ── */}
                {[
                  { id:"connection-request", action:ACTIONS[0] },
                  { id:"view-profile",       action:ACTIONS[1] },
                  { id:"follow",             action:ACTIONS[2] },
                  { id:"send-message",       action:ACTIONS[3] },
                  { id:"inmail",             action:ACTIONS[4] },
                  { id:"endorse-skills",     action:ACTIONS[5] },
                ].map(({ id, action }, idx) => {
                  const Icon = action.icon;
                  return (
                    <motion.div key={id} id={id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                      transition={{ delay:0.18+idx*0.04 }} className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-4.5 h-4.5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{action.label}</h2>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{action.description}</p>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                          { label:"Daily limit",        val:action.dailyLimit          },
                          { label:"Requires",           val:action.requiresDegree      },
                          { label:"Char limit",         val:action.noteLimit           },
                        ].map(stat => (
                          <div key={stat.label} className={`rounded-xl border ${action.border} ${action.lightBg} px-3 py-2.5`}>
                            <p className="text-[8px] font-black text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className={`text-xs font-bold ${action.textColor}`}>{stat.val}</p>
                          </div>
                        ))}
                      </div>

                      <div className={`rounded-xl border ${action.border} ${action.lightBg} px-4 py-3 mb-4`}>
                        <p className={`text-[9px] font-black ${action.textColor} uppercase tracking-wider mb-1`}>When to use</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{action.whenToUse}</p>
                      </div>

                      <div className="space-y-1.5 mb-4">
                        {action.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${action.textColor}`} />
                            {tip}
                          </div>
                        ))}
                      </div>

                      {idx < 5 && <div className="border-t border-gray-200 my-8" />}
                    </motion.div>
                  );
                })}

                {/* ── Best practices ── */}
                <motion.div id="best-practices" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Best practices</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:Eye,         color:"bg-indigo-600", title:"Always warm up before connecting",                desc:"Place View Profile (and optionally Follow) at least 24 hours before your Connection Request. Prospects who recognise your name accept at 2× the rate of cold outreach. This single change has the highest impact on acceptance rate." },
                      { icon:Timer,       color:"bg-blue-600",   title:"Never run all actions on the same day",           desc:"Spread your sequence over 7–14 days minimum. LinkedIn's algorithm flags accounts that send connection requests and messages within hours of each other. Human-paced sequences always outperform rushed ones in both acceptance and reply rates." },
                      { icon:UserPlus,    color:"bg-emerald-600",title:"Connection note under 200 characters",            desc:"Longer notes get lower acceptance rates. The note is not the pitch — it's just the handshake. Mention their company or role, be specific, and keep it conversational. The pitch comes after they accept." },
                      { icon:MessageSquare,color:"bg-violet-600",title:"Message personalisation is mandatory",            desc:"Generic messages get ignored. Use {{first_name}}, {{company}}, and {{title}} merge tags in every Send Message step. Adding just the prospect's first name boosts reply rates by 30–40% compared to plain messages." },
                      { icon:Award,       color:"bg-pink-600",   title:"Endorse before your follow-up message",          desc:"Place the Endorse Skills action 1–2 days before your follow-up message. Prospects who've just received an endorsement notification are in a reciprocal mindset — reply rates after endorsements are significantly higher." },
                      { icon:Shield,      color:"bg-amber-500",  title:"Never max out daily limits",                     desc:"Stay below 80% of daily limits for each action type. 360Airo manages this automatically, but avoid launching multiple campaigns simultaneously against the same LinkedIn account — the combined usage can push you into restricted territory." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.35+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">LinkedIn Actions — quick reference</p>
                    </div>
                    {[
                      ["Total action types",          "6: Connection Request, View Profile, Follow, Send Message, InMail, Endorse Skills"],
                      ["Safest action",                "View Profile — up to 200/day, works for any connection degree"],
                      ["Most impactful action",        "Connection Request — the entry point to all follow-up actions"],
                      ["1st-degree only actions",      "Send Message and Endorse Skills — non-connections are skipped automatically"],
                      ["Requires LinkedIn credits",    "InMail only — limited by your LinkedIn plan (20–50/month)"],
                      ["Auto skip on declined",        "If Connection Request is declined, all dependent actions are automatically skipped"],
                      ["Daily limit auto-pause",       "360Airo pauses actions at 90% of each daily limit to protect your account"],
                      ["Best sequence length",         "5–7 steps spread over 9–14 days for maximum acceptance and reply rate"],
                    ].map(([field, val], i) => (
                      <div key={field} className={`grid grid-cols-[210px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{field}</span>
                        <span className="text-gray-700">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> The View Profile → Follow → Connection Request warm-up trio
                      consistently achieves 35–45% connection acceptance rates, compared to 15–20% for cold
                      connection requests with no prior interaction. Those extra 20 percentage points are the
                      difference between a thriving LinkedIn campaign and one that stalls on Step 1.
                    </span>
                  </div>
                </motion.div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 14 days ago</span>
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