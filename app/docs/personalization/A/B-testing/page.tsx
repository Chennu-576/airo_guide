"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Info,
  FlaskConical, TrendingUp, BarChart2, Zap, Star, ArrowRight,
  PlusCircle, Play, Trash2, PauseCircle, CheckCircle2,
  MailOpen, MessageSquare, Users, SplitSquareHorizontal,
  ToggleLeft, ToggleRight, Eye, MousePointerClick,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",   label: "What is A/B testing"    },
  { id: "how",        label: "How it works"            },
  { id: "setup",      label: "Setting up variants"     },
  { id: "results",    label: "Check results"           },
  { id: "manage",     label: "Manage variants"         },
  { id: "faqs",       label: "FAQs"                    },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What should I A/B test first?",
    a: "Start with subject lines — they have the biggest impact on open rates and are the easiest single variable to isolate. Once you've found a winning subject line, move to testing email body elements like the opening line, call-to-action, or email length for reply rate improvements.",
    icon: FlaskConical, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", activeBorder: "border-violet-400",
  },
  {
    q: "Can I add new variants after starting a campaign?",
    a: "Yes. You can add new variants to an active campaign at any time. New prospects added after that point will be distributed across all active variants — including the newly added ones. Prospects who already received an earlier step are unaffected.",
    icon: PlusCircle, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", activeBorder: "border-blue-400",
  },
  {
    q: "How long should I run an A/B test?",
    a: "Wait until each variant has been sent to at least 50–100 prospects before drawing conclusions. Running a test on fewer prospects risks making decisions based on noise rather than genuine performance differences.",
    icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", activeBorder: "border-emerald-400",
  },
  {
    q: "What happens when I delete a variant?",
    a: "The variant and all its stats are permanently removed. Remaining variants are renamed sequentially (deleting B makes C the new B). All future prospects in the campaign receive only the surviving variants. This cannot be undone.",
    icon: Trash2, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", activeBorder: "border-red-400",
  },
  {
    q: "How are prospects split across variants?",
    a: "360Airo distributes prospects randomly and roughly evenly across all active variants per step. With 200 prospects and 2 variants, each gets ~100. Importantly, variant assignment is independent per step — a prospect receiving Variant A in Step 1 may receive Variant B in Step 2.",
    icon: SplitSquareHorizontal, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", activeBorder: "border-orange-400",
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
              placeholder="e.g. How do I set up A/B testing?" />
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

// ─── Variant Builder Mockup ───────────────────────────────────────────────────
function VariantBuilderMockup() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [variants, setVariants] = useState([
    { label: "A", subject: "Quick question, {{first_name}}", body: "Hi {{first_name}},\n\nI noticed {{company}} is scaling fast — wanted to share how 360Airo helped similar teams cut outreach time by 40%.\n\nWorth a quick 15-min call this week?" },
    { label: "B", subject: "{{first_name}}, saw your recent post", body: "Hi {{first_name}},\n\nYour recent post about growth caught my eye. We help teams like {{company}} automate outreach without losing the personal touch.\n\nOpen to a short chat?" },
  ]);

  const addVariant = () => {
    if (variants.length >= 5) return;
    const labels = ["A","B","C","D","E"];
    setVariants(v => [...v, { label: labels[v.length], subject: "", body: "" }]);
    setActiveVariant(variants.length);
  };

  const current = variants[activeVariant];

  return (
    <BrowserFrame title="360Airo — Campaign Builder · Email Step · A/B Variants">
      <div className="bg-gray-50 p-5">
        {/* Variant tabs */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">Variants:</span>
          {variants.map((v, i) => (
            <button key={i} onClick={() => setActiveVariant(i)}
              className={`w-8 h-8 rounded-xl text-xs font-black border transition shadow-sm ${
                activeVariant === i
                  ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white border-transparent shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}>{v.label}</button>
          ))}
          {variants.length < 5 && (
            <button onClick={addVariant}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 transition">
              <PlusCircle className="w-3.5 h-3.5" /> Add Variant
            </button>
          )}
          <span className="text-[10px] text-gray-400 ml-auto">{variants.length}/5 variants</span>
        </div>

        {/* Editor panel */}
        <AnimatePresence mode="wait">
          <motion.div key={activeVariant}
            initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-6 }} transition={{ duration:0.18 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Variant badge */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-[10px] font-black">{current.label}</span>
                </div>
                <span className="text-xs font-bold text-gray-700">Variant {current.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                  ~50% of prospects
                </span>
              </div>
            </div>

            {/* Subject */}
            <div className="px-4 pt-4 pb-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Subject Line</label>
              <input
                value={current.subject}
                onChange={e => setVariants(v => v.map((x,i) => i===activeVariant ? {...x,subject:e.target.value} : x))}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 font-medium"
                placeholder="Enter subject line…" />
            </div>

            {/* Body */}
            <div className="px-4 pb-4">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Email Body</label>
              <textarea
                value={current.body}
                onChange={e => setVariants(v => v.map((x,i) => i===activeVariant ? {...x,body:e.target.value} : x))}
                rows={5}
                className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 resize-none leading-relaxed text-gray-700"
                placeholder="Write your email body…" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Split preview */}
        <div className="mt-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Prospect split preview</p>
          <div className="flex items-center gap-2 mb-2">
            {variants.map((v, i) => (
              <div key={i} className="flex-1 text-center">
                <div className={`h-6 rounded-lg text-[10px] font-black text-white flex items-center justify-center ${
                  i===0?"bg-violet-500":i===1?"bg-blue-500":i===2?"bg-emerald-500":i===3?"bg-orange-500":"bg-pink-500"
                }`}>
                  {v.label} · {Math.round(100/variants.length)}%
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 text-center">
            200 prospects → ~{Math.round(200/variants.length)} per variant
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Results Mockup ───────────────────────────────────────────────────────────
function ResultsMockup() {
  const variants = [
    { label:"A", subject:"Quick question, {{first_name}}",    sent:102, opens:48, replies:12, openPct:47, replyPct:12, winner:true  },
    { label:"B", subject:"{{first_name}}, saw your post",     sent:98,  opens:31, replies:7,  openPct:32, replyPct:7,  winner:false },
  ];

  return (
    <BrowserFrame title="360Airo — Campaign Reports · A/B Variant Performance">
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">A/B Variant Results</p>
              <p className="text-xs text-gray-400">Step 1 — Email · 200 prospects total</p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
            ✓ Enough data to decide
          </span>
        </div>

        {/* Variant cards */}
        <div className="space-y-3 mb-4">
          {variants.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${v.winner ? "border-green-300" : "border-gray-200"}`}>
              {/* Top bar */}
              <div className={`flex items-center justify-between px-4 py-3 border-b ${v.winner?"bg-green-50 border-green-200":"bg-gray-50 border-gray-100"}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white ${
                    i===0?"bg-violet-600":"bg-blue-600"
                  }`}>{v.label}</div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Variant {v.label}</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{v.subject}</p>
                  </div>
                </div>
                {v.winner && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-green-600 text-white px-2.5 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Winner
                  </span>
                )}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 divide-x divide-gray-100 px-2 py-1">
                {[
                  { label:"Sent",    val:v.sent,             sub:"prospects",   icon:Users,          color:"text-gray-700"   },
                  { label:"Opens",   val:`${v.openPct}%`,    sub:`${v.opens} opens`,  icon:MailOpen, color:"text-violet-700" },
                  { label:"Replies", val:`${v.replyPct}%`,   sub:`${v.replies} replies`,icon:MessageSquare,color:"text-blue-700"},
                  { label:"CTR",     val:`${Math.round(v.replyPct/v.openPct*100)}%`, sub:"reply/open",icon:MousePointerClick,color:"text-emerald-700"},
                ].map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="px-3 py-3 text-center">
                      <Icon className={`w-3.5 h-3.5 ${s.color} mx-auto mb-1`} />
                      <p className={`text-base font-black ${s.color}`}>{s.val}</p>
                      <p className="text-[9px] text-gray-400">{s.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bar */}
              <div className="px-4 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] text-gray-400 w-12">Open rate</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <motion.div
                      initial={{ width:0 }} animate={{ width:`${v.openPct}%` }}
                      transition={{ duration:0.8, delay:0.3+i*0.1 }}
                      className={`h-2 rounded-full ${v.winner?"bg-gradient-to-r from-green-400 to-emerald-500":"bg-gradient-to-r from-gray-300 to-gray-400"}`} />
                  </div>
                  <span className={`text-[10px] font-bold w-8 text-right ${v.winner?"text-green-700":"text-gray-500"}`}>{v.openPct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-400 w-12">Reply rate</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <motion.div
                      initial={{ width:0 }} animate={{ width:`${v.replyPct*4}%` }}
                      transition={{ duration:0.8, delay:0.4+i*0.1 }}
                      className={`h-2 rounded-full ${v.winner?"bg-gradient-to-r from-blue-400 to-violet-500":"bg-gradient-to-r from-gray-300 to-gray-400"}`} />
                  </div>
                  <span className={`text-[10px] font-bold w-8 text-right ${v.winner?"text-blue-700":"text-gray-500"}`}>{v.replyPct}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-xs text-blue-700">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Variant A is the clear winner.</strong> Pause or delete Variant B to send all remaining prospects through the better-performing version.
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Manage Variants Mockup ───────────────────────────────────────────────────
function ManageVariantsMockup() {
  const [variantStates, setVariantStates] = useState([
    { label:"A", subject:"Quick question, {{first_name}}",   active:true,  winner:true  },
    { label:"B", subject:"{{first_name}}, saw your post",    active:true,  winner:false },
    { label:"C", subject:"Idea for {{company}}'s outreach",  active:false, winner:false },
  ]);
  const [deleted, setDeleted] = useState<number | null>(null);

  const toggle = (i: number) => setVariantStates(v => v.map((x,idx) => idx===i ? {...x,active:!x.active} : x));
  const del = (i: number) => {
    setDeleted(i);
    setTimeout(() => {
      setVariantStates(v => v.filter((_,idx)=>idx!==i).map((x,idx)=>({...x,label:["A","B","C","D","E"][idx]})));
      setDeleted(null);
    }, 600);
  };

  return (
    <BrowserFrame title="360Airo — Email Step Editor · Manage Variants">
      <div className="bg-gray-50 p-5">
        <p className="text-xs text-gray-500 mb-3 font-medium">
          Toggle to pause a variant temporarily, or delete to remove it permanently.
        </p>
        <div className="space-y-2">
          <AnimatePresence>
            {variantStates.map((v, i) => (
              <motion.div key={v.label}
                layout
                initial={{ opacity:0, y:6 }} animate={{ opacity: deleted===i ? 0.3 : 1, y:0, scale: deleted===i ? 0.97 : 1 }}
                exit={{ opacity:0, height:0, marginBottom:0 }}
                transition={{ duration:0.2 }}
                className={`flex items-center gap-3 bg-white rounded-xl border px-4 py-3 shadow-sm transition-all ${
                  v.winner ? "border-green-300" : v.active ? "border-gray-200" : "border-gray-100 opacity-60"
                }`}>
                {/* Badge */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${
                  !v.active ? "bg-gray-400" : i===0?"bg-violet-600":i===1?"bg-blue-600":"bg-emerald-600"
                }`}>{v.label}</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-bold text-gray-900 truncate max-w-[180px]">{v.subject}</p>
                    {v.winner && <span className="text-[9px] font-bold bg-green-100 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full">Winner</span>}
                    {!v.active && <span className="text-[9px] font-bold bg-gray-100 text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-full">Paused</span>}
                  </div>
                </div>

                {/* Toggle */}
                <button onClick={() => toggle(i)}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition flex-shrink-0 ${
                    v.active
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}>
                  {v.active
                    ? <><ToggleRight className="w-3.5 h-3.5" /> Active</>
                    : <><ToggleLeft className="w-3.5 h-3.5" /> Paused</>}
                </button>

                {/* Delete */}
                <button onClick={() => del(i)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-700">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-500" />
          <span>
            <strong>Deleting is permanent.</strong> All stats for a deleted variant are removed and remaining variants are renamed. Use the toggle to pause instead if you're unsure.
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── FAQ Toggle ───────────────────────────────────────────────────────────────
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
                <motion.div key="ans" initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }}
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
export default function ABTestingPage() {
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
                  <Link href="#" className="hover:text-blue-600 transition">Personalization</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">A/B Testing</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">A/B Testing</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Test up to 5 email variants per step — different subject lines or body content — and let
                    360Airo automatically split prospects across them so you can find what actually gets opens and replies.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Overview ── */}
                <motion.div id="overview" initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    A/B testing in 360Airo lets you add up to <strong>5 variants (A–E)</strong> to any email step
                    in a campaign. Prospects are split evenly and randomly across all active variants.
                    After enough data is collected, you can pause or delete the underperforming variant and
                    route all future prospects to the winner.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:FlaskConical,       bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"Up to 5 variants",   desc:"Test subject lines A through E against each other in a single campaign step" },
                      { icon:SplitSquareHorizontal,bg:"bg-blue-50",  color:"text-blue-600",    border:"border-blue-200",    title:"Auto split",          desc:"360Airo randomly distributes prospects evenly — no manual segmentation needed" },
                      { icon:TrendingUp,          bg:"bg-emerald-50",color:"text-emerald-600", border:"border-emerald-200", title:"Data-driven wins",    desc:"See open rates and reply rates per variant, then kill what's not working" },
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

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Best practice:</strong> Test one element at a time — either the subject line
                      (for open rates) or the email body (for reply rates). Testing both at once makes it
                      impossible to know which change caused the difference.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── How it works ── */}
                <motion.div id="how" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Four steps from setup to winner — each one is covered in detail in the sections below.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { step:"01", color:"bg-violet-600", border:"border-violet-200", bg:"bg-violet-50/40", icon:PlusCircle,    title:"Add variants",        desc:"Create up to 5 email variants per step with different subjects or body content in the campaign builder." },
                      { step:"02", color:"bg-blue-600",   border:"border-blue-200",   bg:"bg-blue-50/40",   icon:Play,          title:"Launch campaign",     desc:"Start your campaign — 360Airo auto-splits prospects evenly and randomly across all active variants." },
                      { step:"03", color:"bg-emerald-600",border:"border-emerald-200",bg:"bg-emerald-50/40",icon:BarChart2,     title:"Check results",       desc:"View per-variant open and reply rates in campaign reports once you have 50–100 sends per variant." },
                      { step:"04", color:"bg-orange-500", border:"border-orange-200", bg:"bg-orange-50/40", icon:Zap,           title:"Kill the loser",      desc:"Pause or delete the underperforming variant — all future prospects go to the winner automatically." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.15+i*0.07 }}
                          className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-7 h-7 rounded-full ${item.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0`}>
                              {item.step}
                            </div>
                            <Icon className="w-4 h-4 text-gray-500" />
                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed pl-9">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Setup variants ── */}
                <motion.div id="setup" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[11px] font-black">1</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Setting up variants</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    In the campaign builder, open any email step and click <strong>Add Variant</strong>.
                    Each variant gets its own subject line and body. Try editing them in the interactive mockup below.
                  </p>
                  <div className="mb-5"><VariantBuilderMockup /></div>

                  <div className="space-y-2">
                    {[
                      { step:"A", color:"bg-violet-600", title:"Navigate to your email step",    desc:"In the campaign builder, click on an email step in your sequence to open the content editor." },
                      { step:"B", color:"bg-blue-600",   title:"Click Add Variant",              desc:"Hit the Add Variant button to create a new tab (B, C, D, E). Each variant has its own independent subject line and body." },
                      { step:"C", color:"bg-emerald-600",title:"Write different versions",       desc:"Change the subject line to test open rates, or write a different email body to test replies. Keep everything else identical so results are clean." },
                      { step:"D", color:"bg-orange-500", title:"Save and launch",                desc:"Save your variants and proceed to launch. 360Airo auto-splits your prospect list evenly across all active variants from the moment the campaign starts." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                        transition={{ delay:0.2+i*0.05 }}
                        className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-violet-200 hover:shadow-sm transition">
                        <div className={`w-7 h-7 rounded-full ${item.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Check results ── */}
                <motion.div id="results" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[11px] font-black">2</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Check results & optimise</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Once each variant has reached <strong>50–100 sends</strong>, head to Campaign Reports
                    to compare performance. The mockup below shows what a typical result looks like.
                  </p>
                  <div className="mb-5"><ResultsMockup /></div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700">
                      <MailOpen className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span><strong>Open rate</strong> tells you if your subject line is working. Compare variant open rates first — if one is 15%+ higher, that's your winner.</span>
                    </div>
                    <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span><strong>Reply rate</strong> tells you if your body content is compelling. A high open rate but low reply rate means the subject promised more than the email delivered.</span>
                    </div>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Manage variants ── */}
                <motion.div id="manage" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[11px] font-black">3</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage variants</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Once you have a winner, remove the loser. You can <strong>toggle off</strong> a variant
                    to pause it temporarily, or <strong>delete</strong> it permanently. Try both in the mockup below.
                  </p>
                  <div className="mb-5"><ManageVariantsMockup /></div>

                  {/* Delete example */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 mb-3">
                    <p className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5" /> Delete example
                    </p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Say you have a campaign with Step 1 using Variants A and B. You've sent to 40 prospects (20 each).
                      You delete Variant B. The remaining 60 prospects all receive Variant A. Variant B's stats are gone permanently
                      and Variant C (if it existed) would be renamed B.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-xs text-emerald-700">
                      <ToggleRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span><strong>Use the toggle to pause</strong> if you want to stop a variant temporarily without losing its historical data. You can re-enable it any time.</span>
                    </div>
                    <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
                      <Trash2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span><strong>Delete is permanent.</strong> Use it only when you're confident a variant is a loser and don't need to reference its historical stats again.</span>
                    </div>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── FAQs ── */}
                <motion.div id="faqs" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">FAQs</h2>
                  <p className="text-sm text-gray-500 mb-5">Common questions about A/B testing in 360Airo. Click to expand.</p>
                  <FAQList />
                </motion.div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 7 months ago</span>
                </div>

                <div className="border-t border-gray-200 my-8" />

                {/* Learn About */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { href:"/docs/personalization/pause-ab-variant", icon:PauseCircle,   color:"text-violet-600", bg:"bg-violet-50", border:"border-violet-200", title:"Pause A/B Test Variants",  desc:"How to pause a specific variant without deleting it or stopping the campaign" },
                    { href:"/docs/personalization/merge-tags",        icon:MessageSquare, color:"text-blue-600",   bg:"bg-blue-50",   border:"border-blue-200",   title:"Merge Tags",               desc:"Personalise every email with dynamic fields like first name and company" },
                  ].map(item => {
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

                {/* Prev / Next */}
                <div className="flex items-center justify-between gap-4">
                  <Link href="/docs/tasks/run-daily-task"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Run Multichannel Daily Task
                  </Link>
                  <Link href="/docs/personalization/merge-tags"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    Merge Tags
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