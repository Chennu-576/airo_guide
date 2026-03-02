"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Sparkles,
  CheckCircle2, AlertCircle, Info, Star, Settings, Inbox,
  Mail, MessageSquare, Brain, Zap, TrendingUp, Shield,
  ThumbsUp, ThumbsDown, Edit3, Send, RefreshCw, Eye,
  ChevronLeft, Tag, User, BarChart2, ArrowRight, X,
  Layers, Activity, ToggleLeft, ToggleRight, CornerDownRight,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── Type Definitions ─────────────────────────────────────────────────────────
type ColorScheme = {
  bg: string;
  border: string;
  text: string;
  dot: string;
};

type ColorPalette = {
  emerald: ColorScheme;
  red: ColorScheme;
  amber: ColorScheme;
  blue: ColorScheme;
  violet: ColorScheme;
  gray: ColorScheme;
  pink: ColorScheme;
  teal: ColorScheme;
  sky: ColorScheme;
};

// ─── Color Palette ────────────────────────────────────────────────────────────
const COLOR: ColorPalette = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-500"
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-500"
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-500"
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    dot: "bg-blue-500"
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    dot: "bg-violet-500"
  },
  gray: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
    dot: "bg-gray-400"
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    dot: "bg-pink-500"
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    dot: "bg-teal-500"
  },
  sky: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    dot: "bg-sky-500"
  }
};

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-is-ai-response",       label: "What is AI Response" },
  { id: "how-it-works",              label: "How it works" },
  { id: "campaign-inbox-mockup",     label: "AI Response in action" },
  { id: "enable-ai-response",        label: "Enable AI Response" },
  { id: "configure-ai-agent",        label: "Configure the AI agent" },
  { id: "auto-reply-vs-suggest",     label: "Auto-reply vs. Suggest only" },
  { id: "intent-detection",          label: "Intent detection" },
  { id: "best-practices",            label: "Best practices" },
];

// ─── Ask AI ───────────────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-sky-400 hover:text-sky-600 bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0,y:-6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
            exit={{ opacity:0,y:-6,scale:0.97 }} transition={{ duration:0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-200"
              placeholder="e.g. Can AI Response auto-send replies?" />
            <button className="mt-2 w-full py-1.5 bg-sky-500 text-white text-xs font-semibold rounded-lg hover:bg-sky-600 transition">Ask</button>
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
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On this page</span>
          </div>
          <nav className="py-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior:"smooth" }); }}
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id
                    ? "text-sky-600 font-semibold bg-sky-50 border-r-2 border-sky-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// ─── Screen Frame ─────────────────────────────────────────────────────────────
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

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, color = "bg-sky-500" }: { checked: boolean; onChange: () => void; color?: string }) {
  return (
    <button onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${checked ? color : "bg-gray-300"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

// ─── Intent badge ─────────────────────────────────────────────────────────────
function IntentBadge({ intent }: { intent: string }) {
  const MAP: Record<string, string> = {
    "Interested":      "bg-emerald-100 text-emerald-700",
    "Not Interested":  "bg-red-100 text-red-700",
    "Out of Office":   "bg-amber-100 text-amber-700",
    "More Info":       "bg-blue-100 text-blue-700",
    "Meeting Request": "bg-violet-100 text-violet-700",
    "Unsubscribe":     "bg-gray-100 text-gray-600",
    "Do Not Contact":  "bg-pink-100 text-pink-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full ${MAP[intent] ?? "bg-gray-100 text-gray-600"}`}>
      <Tag className="w-2.5 h-2.5" /> {intent}
    </span>
  );
}

// ─── MOCKUP 1 — Campaign Inbox with AI Response ───────────────────────────────
function CampaignInboxMockup() {
  const THREADS = [
    {
      id: 1,
      name: "Sarah Mitchell",
      email: "s.mitchell@acmecorp.com",
      preview: "Hey, this actually looks like something we could use — can you send over pricing?",
      time: "2 min ago",
      unread: true,
      intent: "Interested",
      avatar: "SM",
      color: "bg-emerald-600",
    },
    {
      id: 2,
      name: "James Harrington",
      email: "james@techsphere.io",
      preview: "Thanks for reaching out. I'm going to be honest — not the right time for us.",
      time: "18 min ago",
      unread: false,
      intent: "Not Interested",
      avatar: "JH",
      color: "bg-red-500",
    },
    {
      id: 3,
      name: "Priya Nair",
      email: "p.nair@globex.co",
      preview: "I'm out of the office until March 12th. For urgent matters please contact…",
      time: "1 hr ago",
      unread: false,
      intent: "Out of Office",
      avatar: "PN",
      color: "bg-amber-500",
    },
    {
      id: 4,
      name: "Michael Torres",
      email: "mtorres@vertex.com",
      preview: "Could you clarify how the LinkedIn automation piece works exactly? Want to under…",
      time: "3 hr ago",
      unread: false,
      intent: "More Info",
      avatar: "MT",
      color: "bg-blue-600",
    },
  ];

  const [active, setActive]         = useState(THREADS[0]);
  const [aiMode, setAiMode]         = useState<"suggest" | "auto">("suggest");
  const [aiDraft, setAiDraft]       = useState(`Hi Sarah,\n\nThank you for your interest in 360Airo! I'd be happy to share our pricing details with you.\n\nWe offer flexible plans based on team size and features needed. I'd love to schedule a quick 20-minute call to understand your specific requirements and provide a tailored quote.\n\nWould Thursday or Friday this week work for you?\n\nBest regards,\nYour Name`);
  const [editMode, setEditMode]     = useState(false);
  const [sent, setSent]             = useState(false);
  const [regenerating, setRegen]    = useState(false);

  const handleRegen = () => {
    setRegen(true);
    setTimeout(() => {
      setAiDraft(`Hi Sarah,\n\nGreat to hear from you — happy to share pricing!\n\n360Airo plans start from $49/month for small teams and scale with your usage. The best fit depends on how many email accounts and prospects you're working with.\n\nWant to jump on a 15-minute call so I can walk you through the options?\n\nTalk soon,\nYour Name`);
      setRegen(false);
    }, 1200);
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <ScreenFrame url="app.360airo.com/campaign-inbox">
      <div className="flex h-[480px] bg-white">
        {/* Thread list */}
        <div className="w-64 flex-shrink-0 border-r border-gray-200 flex flex-col">
          <div className="px-3 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-black text-gray-800 flex items-center gap-1.5"><Inbox className="w-3.5 h-3.5 text-sky-500" /> Campaign Inbox</p>
              <span className="text-[9px] font-black text-sky-600 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI ON
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {THREADS.map(t => (
              <button key={t.id} onClick={() => { setActive(t); setSent(false); setEditMode(false); }}
                className={`w-full text-left px-3 py-3 hover:bg-sky-50/50 transition ${active.id === t.id ? "bg-sky-50 border-r-2 border-sky-400" : ""}`}>
                <div className="flex items-start gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className={`text-xs font-bold truncate ${t.unread ? "text-gray-900" : "text-gray-600"}`}>{t.name}</p>
                      <span className="text-[9px] text-gray-400 flex-shrink-0">{t.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 truncate leading-snug mb-1.5">{t.preview}</p>
                    <IntentBadge intent={t.intent} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Thread view */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Thread header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-white flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${active.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                {active.avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{active.name}</p>
                <p className="text-[10px] text-gray-400">{active.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IntentBadge intent={active.intent} />
              <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
                <Settings className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Prospect message */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/40">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${active.color} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5`}>
                {active.avatar}
              </div>
              <div className="flex-1">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-sm">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {active.id === 1 && "Hey, this actually looks like something we could use internally. Can you send over pricing details and maybe a quick demo? I'm trying to build a case for my manager."}
                    {active.id === 2 && "Thanks for reaching out. To be honest with you — it's not the right time for us right now. We're pretty locked into our existing tools. Maybe reach out again in Q4."}
                    {active.id === 3 && "I'm currently out of the office and will return on March 12th. For urgent matters, please contact operations@globex.co. I'll respond to all emails on my return."}
                    {active.id === 4 && "Could you clarify how the LinkedIn automation piece works? Specifically, does it use my own LinkedIn account or a separate account? I want to make sure we're within LinkedIn's terms before I commit."}
                  </p>
                  <p className="text-[9px] text-gray-400 mt-2">{active.time}</p>
                </div>
              </div>
            </div>

            {/* AI suggestion banner */}
            <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} key={active.id}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-50 to-violet-50 border border-sky-200 rounded-xl px-3 py-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-sky-700">360Airo AI Response Agent</p>
                <p className="text-[9px] text-gray-500">Draft ready · Intent detected: <strong className="text-gray-700">{active.intent}</strong></p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[9px] font-bold text-sky-600 bg-sky-100 px-1.5 py-0.5 rounded-full">
                  {aiMode === "suggest" ? "Suggest mode" : "Auto-reply mode"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* AI draft reply panel */}
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <p className="text-xs font-bold text-gray-800">AI Draft Reply</p>
                {sent && (
                  <motion.span initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }}
                    className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Sent ✓
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={handleRegen}
                  className={`flex items-center gap-1 text-[10px] font-bold text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition ${regenerating ? "opacity-60 pointer-events-none" : ""}`}>
                  <RefreshCw className={`w-3 h-3 ${regenerating ? "animate-spin" : ""}`} />
                  {regenerating ? "Generating…" : "Regenerate"}
                </button>
                <button onClick={() => setEditMode(p => !p)}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition ${editMode ? "bg-sky-50 text-sky-700 border-sky-300" : "text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
                <button onClick={handleSend}
                  className="flex items-center gap-1.5 text-[10px] font-black text-white bg-gradient-to-r from-sky-500 to-violet-500 px-3 py-1.5 rounded-lg hover:opacity-90 transition shadow-sm">
                  <Send className="w-3 h-3" /> Send Reply
                </button>
              </div>
            </div>
            <div className="px-4 py-3">
              {editMode ? (
                <textarea value={aiDraft} onChange={e => setAiDraft(e.target.value)} rows={5}
                  className="w-full text-xs text-gray-700 leading-relaxed outline-none resize-none border border-sky-200 rounded-xl px-3 py-2.5 bg-sky-50/30 focus:border-sky-400 transition font-mono" />
              ) : (
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{aiDraft.split("\n").slice(0,4).join("\n")}</p>
              )}
              <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 flex-1">Was this draft helpful?</p>
                <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-emerald-600 transition">
                  <ThumbsUp className="w-3 h-3" /> Yes
                </button>
                <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-red-500 transition">
                  <ThumbsDown className="w-3 h-3" /> No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 2 — AI Response Settings ─────────────────────────────────────────
function AIResponseSettingsMockup() {
  const [enabled, setEnabled]        = useState(true);
  const [mode, setMode]              = useState<"suggest"|"auto">("suggest");
  const [tone, setTone]              = useState("Professional");
  const [toneOpen, setToneOpen]      = useState(false);
  const [context, setContext]        = useState("360Airo is a multichannel outreach platform that helps B2B teams automate email, LinkedIn, and SMS campaigns with AI personalisation. We work with sales teams of 5–200 people.");
  const [autoIntents, setAutoIntents]= useState<string[]>(["Out of Office"]);
  const [saved, setSaved]            = useState(false);

  const TONES = ["Professional","Friendly","Concise","Empathetic","Direct"];
  const INTENTS = ["Interested","Not Interested","Out of Office","More Info","Meeting Request","Unsubscribe"];

  const toggleIntent = (i: string) => setAutoIntents(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <ScreenFrame url="app.360airo.com/settings/ai-response">
      <div className="bg-gray-50 p-5">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">AI Response Agent</p>
                <p className="text-xs text-gray-400">Configure how AI drafts and sends replies</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Enable */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Enable AI Response Agent</p>
                  <p className="text-xs text-gray-400 mt-0.5">AI reads incoming replies and drafts context-aware responses</p>
                </div>
                <Toggle checked={enabled} onChange={() => setEnabled(p => !p)} />
              </div>
              {enabled && (
                <motion.div initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:"auto" }}
                  className="mt-3 flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-[10px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  AI Response Agent is active on all campaign inboxes
                </motion.div>
              )}
            </div>

            {/* Mode */}
            <div className="px-5 py-4">
              <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-sky-500" /> Response Mode
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(["suggest","auto"] as const).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`rounded-xl border-2 px-4 py-3 text-left transition ${mode===m ? "border-sky-400 bg-sky-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {m === "suggest"
                        ? <Eye className={`w-3.5 h-3.5 ${mode===m?"text-sky-600":"text-gray-400"}`} />
                        : <Send className={`w-3.5 h-3.5 ${mode===m?"text-sky-600":"text-gray-400"}`} />
                      }
                      <p className={`text-xs font-bold ${mode===m?"text-sky-700":"text-gray-600"}`}>
                        {m === "suggest" ? "Suggest Only" : "Auto-Reply"}
                      </p>
                      {mode===m && <CheckCircle2 className="w-3 h-3 text-sky-500 ml-auto flex-shrink-0" />}
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">
                      {m==="suggest"
                        ? "AI drafts a reply for you to review, edit, and send manually"
                        : "AI sends replies automatically for selected intent categories"}
                    </p>
                  </button>
                ))}
              </div>

              {/* Auto-reply intents */}
              {mode === "auto" && (
                <motion.div initial={{ opacity:0,y:4 }} animate={{ opacity:1,y:0 }} className="mt-3">
                  <p className="text-[10px] font-bold text-gray-500 mb-2">Auto-send for these intents:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {INTENTS.map(i => (
                      <button key={i} onClick={() => toggleIntent(i)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition ${
                          autoIntents.includes(i)
                            ? "bg-sky-500 text-white border-sky-500"
                            : "bg-white text-gray-600 border-gray-200 hover:border-sky-300"
                        }`}>{i}</button>
                    ))}
                  </div>
                  <p className="text-[9px] text-amber-600 mt-2 flex items-start gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    Avoid auto-replying to Interested or Meeting Request intents — these need human review
                  </p>
                </motion.div>
              )}
            </div>

            {/* Tone */}
            <div className="px-5 py-4">
              <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-violet-500" /> Reply Tone
              </p>
              <div className="relative">
                <button onClick={() => setToneOpen(p => !p)}
                  className="w-full flex items-center justify-between border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white hover:border-sky-300 transition font-medium">
                  {tone}
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${toneOpen?"rotate-180":""}`} />
                </button>
                <AnimatePresence>
                  {toneOpen && (
                    <motion.div initial={{ opacity:0,y:-4 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                      {TONES.map(t => (
                        <button key={t} onClick={() => { setTone(t); setToneOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between ${tone===t?"bg-sky-50 text-sky-700 font-bold":"text-gray-700 hover:bg-gray-50"}`}>
                          {t}
                          {tone===t && <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Context */}
            <div className="px-5 py-4">
              <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-500" /> Company Context
              </p>
              <p className="text-[10px] text-gray-400 mb-2 leading-relaxed">
                Describe your product, ICP, and value props. The AI uses this to write contextually relevant replies.
              </p>
              <textarea value={context} onChange={e => setContext(e.target.value)} rows={4}
                className="w-full text-xs border-2 border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-sky-300 transition resize-none leading-relaxed text-gray-700" />
              <p className="text-[9px] text-gray-400 mt-1">{context.length} / 500 characters</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            {saved
              ? <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Settings saved</span>
              : <span className="text-xs text-gray-400">Changes not saved</span>
            }
            <div className="flex gap-2">
              <button className="text-xs font-semibold border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-100 transition text-gray-600">Cancel</button>
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                className="text-xs font-bold bg-gradient-to-r from-sky-500 to-violet-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 3 — Intent detection showcase ─────────────────────────────────────
function IntentDetectionMockup() {
  const [activeIndex, setActiveIndex] = useState(0);

  const EXAMPLES = [
    {
      intent: "Interested",
      color: "emerald" as keyof ColorPalette,
      message: "Hey, this actually looks relevant for what we're building. Can you share more details on pricing and onboarding?",
      action: "Drafts a warm, enthusiastic reply with next steps — pricing info, demo booking link, or calendar link.",
      stops: true,
    },
    {
      intent: "Not Interested",
      color: "red" as keyof ColorPalette,
      message: "Thanks but we already have something similar in place. Don't think it's a fit right now.",
      action: "Drafts a graceful exit reply acknowledging their response and keeping the door open for the future. Marks prospect status as 'Not Interested' and pauses campaign.",
      stops: true,
    },
    {
      intent: "Out of Office",
      color: "amber" as keyof ColorPalette,
      message: "I'm on holiday until March 15th and will have limited access to email. For urgent queries contact ops@company.com.",
      action: "Drafts a brief, friendly holding reply. Adds a follow-up task to re-contact the prospect on their return date.",
      stops: false,
    },
    {
      intent: "More Info",
      color: "blue" as keyof ColorPalette,
      message: "Could you explain how the LinkedIn automation works? Does it use my personal account and is it within LinkedIn's Terms of Service?",
      action: "Drafts a detailed, informative reply addressing the specific question asked. AI pulls from your Company Context to give accurate answers.",
      stops: false,
    },
    {
      intent: "Meeting Request",
      color: "violet" as keyof ColorPalette,
      message: "I'd actually love to jump on a call. Are you free this Thursday or Friday afternoon?",
      action: "Drafts a reply with your availability or calendar link. Marks the prospect as 'Meeting Requested' and creates a task for follow-up.",
      stops: true,
    },
    {
      intent: "Unsubscribe",
      color: "gray" as keyof ColorPalette,
      message: "Please remove me from your mailing list.",
      action: "Drafts a clean unsubscribe confirmation. Automatically adds the prospect to your block list and stops all further campaign emails.",
      stops: true,
    },
  ];

  const ex = EXAMPLES[activeIndex];
  const colors = COLOR[ex.color];

  return (
    <ScreenFrame url="app.360airo.com/campaign-inbox — intent detection demo">
      <div className="bg-gray-50 p-5">
        {/* Intent selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {EXAMPLES.map((e, i) => {
            const dotColor = COLOR[e.color].dot;
            return (
              <button key={e.intent} onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full border transition ${
                  activeIndex === i
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}>
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                {e.intent}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeIndex} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-6 }} transition={{ duration:0.2 }}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Prospect message */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-gray-600" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-700">Prospect reply</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-700 italic leading-relaxed">"{ex.message}"</p>
                </div>
              </div>

              {/* AI detection */}
              <div className={`px-4 py-3 border-b ${colors.border} ${colors.bg}`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-[10px] font-black text-gray-700">AI detected intent:</p>
                  <IntentBadge intent={ex.intent} />
                </div>
                <div className="flex items-start gap-1.5 mt-2">
                  <CornerDownRight className={`w-3 h-3 ${colors.text} flex-shrink-0 mt-0.5`} />
                  <p className={`text-[10px] ${colors.text} leading-relaxed font-medium`}>{ex.action}</p>
                </div>
              </div>

              {/* Campaign action */}
              <div className="px-4 py-3 bg-white flex items-center gap-3 flex-wrap">
                <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full ${ex.stops ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                  {ex.stops
                    ? <><span className="w-2 h-2 rounded-full bg-red-400" /> Campaign paused for this prospect</>
                    : <><span className="w-2 h-2 rounded-full bg-emerald-400" /> Campaign continues normally</>
                  }
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200">
                  <Sparkles className="w-2.5 h-2.5" /> AI draft ready to review
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ScreenFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AIResponsePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-ai-response");

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    if (!isMounted) return;
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
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-sky-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-sky-600 transition">AI Automation</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">AI Response Agent</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center shadow-md flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AI Response Agent</h1>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    360Airo's AI Response Agent reads every reply that lands in your Campaign Inbox, detects the
                    prospect's intent, and drafts a context-aware reply on your behalf — ready to send in one click,
                    or auto-sent automatically based on your settings.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── What is AI Response ──────────────────────────── */}
                <motion.div id="what-is-ai-response" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    When a prospect replies to your outreach email, 360Airo's AI reads the message, identifies
                    what the prospect wants — interested, needs more information, out of office, or unsubscribing —
                    and immediately drafts an appropriate, human-sounding reply. You can review and send with
                    one click, edit it first, or let the AI send certain categories automatically.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Brain,      bg:"bg-sky-50",    color:"text-sky-600",    border:"border-sky-200",    title:"Intent detection",   desc:"AI reads every inbound reply and classifies the prospect's intent into one of seven categories — Interested, Not Interested, Out of Office, More Info, Meeting Request, Unsubscribe, or Do Not Contact" },
                      { icon:Sparkles,   bg:"bg-violet-50", color:"text-violet-600", border:"border-violet-200", title:"Contextual drafting", desc:"Drafts are generated using your Company Context — the product description, ICP, and value props you provide in settings. Every draft is relevant, not generic" },
                      { icon:Zap,        bg:"bg-emerald-50",color:"text-emerald-600",border:"border-emerald-200",title:"Two operating modes", desc:"Run in Suggest Only mode (you review every draft before sending) or Auto-Reply mode (AI sends replies automatically for intents you choose, like Out of Office)" },
                    ].map((card,i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1+i*0.07 }}
                          className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
                          <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                          <p className={`text-sm font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-xs text-sky-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      AI Response works inside your <strong>Campaign Inbox</strong> — the unified inbox where
                      all replies from your campaigns arrive. You access it via <strong>Sidebar → Inbox</strong>.
                      Each reply thread shows the AI draft alongside the prospect's original message.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── How it works ─────────────────────────────────── */}
                <motion.div id="how-it-works" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">How it works</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    AI Response runs automatically in the background the moment a prospect reply is received.
                    Here is the full sequence from inbound reply to sent response:
                  </p>

                  {/* Step cards */}
                  <div className="space-y-2 mb-5">
                    {[
                      {
                        step:1, icon:Mail,       bg:"bg-sky-50",    border:"border-sky-200",    color:"text-sky-700",
                        title:"Reply received",
                        desc:"A prospect replies to one of your campaign emails. 360Airo receives the message in your Campaign Inbox in real time.",
                      },
                      {
                        step:2, icon:Brain,      bg:"bg-violet-50", border:"border-violet-200", color:"text-violet-700",
                        title:"AI reads and classifies",
                        desc:"The AI Response Agent reads the full message body, subject line, and conversation history. It classifies the reply into one of seven intent categories.",
                      },
                      {
                        step:3, icon:Sparkles,   bg:"bg-emerald-50",border:"border-emerald-200",color:"text-emerald-700",
                        title:"Draft generated",
                        desc:"A contextually relevant reply is drafted using your Company Context, the detected intent, your chosen tone, and any prior conversation history in the thread.",
                      },
                      {
                        step:4, icon:Eye,        bg:"bg-amber-50",  border:"border-amber-200",  color:"text-amber-700",
                        title:"Review or auto-send",
                        desc:"In Suggest Only mode, the draft appears in the inbox ready for you to review, edit, or discard. In Auto-Reply mode, selected intent categories are sent automatically without review.",
                      },
                      {
                        step:5, icon:Activity,   bg:"bg-pink-50",   border:"border-pink-200",   color:"text-pink-700",
                        title:"Prospect status updated",
                        desc:"Based on the detected intent, 360Airo automatically updates the prospect's status in your campaign — pausing further outreach for Not Interested, adding follow-up tasks for Out of Office, and so on.",
                      },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.step} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.12+i*0.06 }}
                          className={`flex items-start gap-4 p-4 rounded-xl border ${item.border} ${item.bg}`}>
                          <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className={`w-7 h-7 rounded-xl bg-white border ${item.border} flex items-center justify-center`}>
                              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                            </div>
                            <span className={`text-[9px] font-black ${item.color}`}>0{item.step}</span>
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${item.color} mb-0.5`}>{item.title}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── AI Response in action ────────────────────────── */}
                <motion.div id="campaign-inbox-mockup" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.14 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">AI Response in action</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The Campaign Inbox below is fully interactive. Click each thread to see the AI draft for that
                    prospect's reply. You can regenerate the draft, edit it inline, or send it — all functional.
                  </p>
                  <div className="mb-5"><CampaignInboxMockup /></div>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Campaign Inbox AI actions explained</p>
                    </div>
                    {[
                      ["AI Draft panel",    "Appears below the prospect's message — shows the full draft reply AI has prepared"],
                      ["Regenerate",        "Discards the current draft and generates a completely new one. Useful if the first draft misses the tone or context"],
                      ["Edit",             "Opens the draft in an inline text editor — make any changes before sending"],
                      ["Send Reply",       "Sends the AI draft (edited or original) as your reply to the prospect immediately"],
                      ["Thumbs up / down", "Rate the quality of the AI draft — your feedback improves future drafts for your account"],
                      ["AI ON badge",      "Green indicator in the inbox header confirming the AI Response Agent is active for this inbox"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[140px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Enable AI Response ───────────────────────────── */}
                <motion.div id="enable-ai-response" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Enable AI Response</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    AI Response is off by default. Enable it once in Settings and it applies to all campaign inboxes
                    across your account automatically.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {[
                      ["Open Settings",         "Click your profile avatar in the top navigation bar, then select Settings"],
                      ["Go to AI Response",     "Navigate to Settings → AI Automation → AI Response Agent"],
                      ["Enable the toggle",     "Flip the Enable AI Response Agent toggle to ON — the green confirmation banner will appear"],
                      ["Choose your mode",      "Select Suggest Only (recommended to start) or Auto-Reply. You can change this at any time"],
                      ["Add Company Context",   "Paste a 1–3 sentence description of your product and ideal customer. This is the most important step for reply quality"],
                      ["Save and close",        "Click Save Settings — AI Response is now active on all inboxes immediately"],
                    ].map(([title,desc],i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 list-none">
                        <span className="mt-1.5 w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-black text-[10px] flex items-center justify-center flex-shrink-0">{i+1}</span>
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      Once enabled, AI Response immediately activates on all existing campaign inboxes —
                      including inboxes from campaigns that are already running. No need to re-configure individual campaigns.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Configure AI Agent ───────────────────────────── */}
                <motion.div id="configure-ai-agent" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.18 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Configure the AI agent</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    All settings in the panel below are interactive. Toggle enable/disable, switch modes, pick a tone,
                    and edit your Company Context. Click Save Settings to confirm — it shows a green confirmation.
                  </p>
                  <div className="mb-5"><AIResponseSettingsMockup /></div>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Settings reference</p>
                    </div>
                    {[
                      ["Enable AI Response",   "On",              "Master toggle. Activates AI Response on all campaign inboxes account-wide"],
                      ["Response Mode",        "Suggest Only",    "Suggest Only: AI drafts, you send. Auto-Reply: AI sends automatically for selected intents"],
                      ["Auto-reply intents",   "Out of Office",   "When in Auto-Reply mode, choose which intent categories can be sent without human review"],
                      ["Reply Tone",           "Professional",    "Sets the voice and style of all AI-generated drafts. Options: Professional, Friendly, Concise, Empathetic, Direct"],
                      ["Company Context",      "Required",        "A description of your product, ICP, and value props — the single biggest factor in draft quality. Update this as your messaging evolves"],
                    ].map(([label, rec, desc], i) => (
                      <div key={label} className={`px-4 py-3 border-b border-gray-100 last:border-0 ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-xs font-bold text-gray-800">{label}</span>
                          <span className="text-[9px] font-black text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded-full">Recommended: {rec}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Auto-reply vs Suggest only ───────────────────── */}
                <motion.div id="auto-reply-vs-suggest" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Auto-reply vs. Suggest only</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Choosing the right mode depends on how much trust you want to place in the AI at this stage
                    and how high-touch your outreach is. Most teams start with Suggest Only and graduate to
                    selective Auto-Reply after a few weeks.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {[
                      {
                        mode:"Suggest Only",
                        icon:Eye,
                        bg:"bg-sky-50", border:"border-sky-200", color:"text-sky-700",
                        pros:["Every reply reviewed before sending","Full control over every conversation","Best for high-value prospects where tone matters most","Allows you to add personal details AI wouldn't know"],
                        cons:["Requires your time to review each draft","Slower response time to inbound replies"],
                        bestFor:"Teams new to AI Response, high-ACV outreach, or anyone who wants a human sign-off before every reply",
                      },
                      {
                        mode:"Auto-Reply",
                        icon:Zap,
                        bg:"bg-violet-50", border:"border-violet-200", color:"text-violet-700",
                        pros:["Instant replies 24/7 — no delay even overnight","Scales to hundreds of concurrent threads","Ideal for Out of Office, Unsubscribe, and Do Not Contact intents","Frees your team to focus on warm conversations"],
                        cons:["Requires careful intent selection — don't auto-send for Interested","Needs a strong Company Context to stay accurate"],
                        bestFor:"High-volume outreach teams, or for specific low-risk intents like Out of Office and Unsubscribe",
                      },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.mode} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2+i*0.08 }}
                          className={`rounded-xl border-2 ${item.border} ${item.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-8 h-8 rounded-xl bg-white border ${item.border} flex items-center justify-center`}>
                              <Icon className={`w-4 h-4 ${item.color}`} />
                            </div>
                            <p className={`text-sm font-bold ${item.color}`}>{item.mode}</p>
                          </div>
                          <div className="space-y-1.5 mb-3">
                            {item.pros.map((p,j) => (
                              <div key={j} className="flex items-start gap-1.5 text-[10px] text-gray-700">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {p}
                              </div>
                            ))}
                            {item.cons.map((c,j) => (
                              <div key={j} className="flex items-start gap-1.5 text-[10px] text-gray-500">
                                <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                                {c}
                              </div>
                            ))}
                          </div>
                          <p className={`text-[10px] font-bold ${item.color} leading-snug`}>Best for: <span className="font-normal text-gray-600">{item.bestFor}</span></p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Never auto-reply to Interested or Meeting Request intents.</strong> These prospects
                      have shown genuine buying interest and deserve a personalised human reply. Use Suggest Only
                      for these categories so you can tailor each response individually.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Intent detection ─────────────────────────────── */}
                <motion.div id="intent-detection" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Intent detection</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Click each intent category below to see a real prospect reply example and how 360Airo's
                    AI responds to it — including what campaign action is taken automatically.
                  </p>
                  <div className="mb-5"><IntentDetectionMockup /></div>

                  {/* Intent reference table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Intent categories — full reference</p>
                    </div>
                    {[
                      { intent:"Interested",      dot:"bg-emerald-400", action:"Draft warm reply + next steps",              campaign:"Pause — awaiting human follow-up" },
                      { intent:"Not Interested",  dot:"bg-red-400",     action:"Draft graceful exit reply",                  campaign:"Pause campaign for this prospect"  },
                      { intent:"Out of Office",   dot:"bg-amber-400",   action:"Draft brief holding reply + set follow-up task", campaign:"Campaign continues; re-engage on return date" },
                      { intent:"More Info",        dot:"bg-blue-400",    action:"Draft detailed answer using Company Context", campaign:"Campaign continues normally"       },
                      { intent:"Meeting Request", dot:"bg-violet-400",  action:"Draft reply with availability / calendar link", campaign:"Pause — mark as Meeting Requested" },
                      { intent:"Unsubscribe",     dot:"bg-gray-400",    action:"Draft unsubscribe confirmation",              campaign:"Stop all emails + add to block list" },
                      { intent:"Do Not Contact",  dot:"bg-pink-400",    action:"No reply drafted (DNC)",                      campaign:"Stop all emails + add to block list" },
                    ].map((item,i) => (
                      <div key={item.intent} className={`grid grid-cols-[120px_1fr_1fr] gap-2 px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="flex items-center gap-1.5 font-bold text-gray-800">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                          {item.intent}
                        </div>
                        <span className="text-gray-600">{item.action}</span>
                        <span className="text-gray-400 text-[10px]">{item.campaign}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Best practices ───────────────────────────────── */}
                <motion.div id="best-practices" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Best practices</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:Layers,    color:"bg-sky-500",     title:"Write a detailed Company Context",              desc:"This is the single most impactful setting. Spend 5 minutes writing a clear description of your product, your ideal customer profile, and the key value propositions you lead with. The AI uses this on every single draft — a vague context produces vague replies." },
                      { icon:Eye,       color:"bg-violet-600",  title:"Start with Suggest Only for 2–3 weeks",         desc:"Before trusting the AI to send anything automatically, spend time reviewing drafts and using the thumbs up/down to train the quality of your account's AI. After 50–100 rated drafts, Auto-Reply becomes far more reliable." },
                      { icon:Shield,    color:"bg-emerald-600", title:"Never auto-reply to Interested replies",        desc:"When a prospect shows interest, they deserve a human reply that acknowledges their specific situation and next steps. Letting AI auto-send a generic reply to a warm lead is one of the most damaging mistakes you can make in outreach." },
                      { icon:Tag,       color:"bg-amber-500",   title:"Trust intent detection — but verify edge cases", desc:"AI intent classification is highly accurate but not infallible. Edge cases like sarcasm ('Oh sure, sounds great 🙄'), ambiguous replies, or non-English messages may be misclassified. Review these manually." },
                      { icon:RefreshCw, color:"bg-pink-600",    title:"Update Company Context as your pitch evolves",  desc:"If you change your messaging, pricing structure, or ICP, update your Company Context immediately. Stale context produces outdated replies — especially problematic for More Info and Interested categories." },
                      { icon:BarChart2, color:"bg-teal-600",    title:"Use intent data to improve campaigns",          desc:"Your intent distribution tells you a lot about your messaging quality. If 40%+ of replies are Not Interested, your targeting or subject line needs work. If 20%+ are More Info, your email body needs to answer more questions upfront." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.25+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-sky-200 hover:shadow-sm transition">
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

                  {/* Quick reference */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">AI Response Agent — quick reference</p>
                    </div>
                    {[
                      ["Where to find it",      "Settings → AI Automation → AI Response Agent"],
                      ["Where drafts appear",   "Campaign Inbox → any reply thread → AI Draft panel below the message"],
                      ["Default mode",          "Suggest Only — AI drafts, you review and send"],
                      ["Intent categories",     "7 categories: Interested, Not Interested, Out of Office, More Info, Meeting Request, Unsubscribe, Do Not Contact"],
                      ["Company Context",       "Required for good drafts — describe your product, ICP, and value props (max 500 chars)"],
                      ["Tone options",          "Professional, Friendly, Concise, Empathetic, Direct"],
                      ["Auto-reply safe intents","Out of Office and Unsubscribe — always use Suggest Only for Interested and Meeting Request"],
                      ["Feedback",              "Thumbs up / down on each draft trains your account's AI over time"],
                    ].map(([field,val],i) => (
                      <div key={field} className={`grid grid-cols-[170px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{field}</span>
                        <span className="text-gray-700">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-xs text-sky-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-sky-500" />
                    <span>
                      <strong>Pro tip:</strong> Teams that use AI Response see a 3–5× improvement in reply-to-meeting
                      conversion rates compared to manual reply management. The biggest reason is speed — replying
                      within minutes of a prospect's message, rather than hours or the next business day, is
                      the single largest lever in converting a warm reply into a booked meeting.
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