"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, Shield,
  CheckCircle2, AlertCircle, Info, Star, Flame, TrendingUp,
  Activity, RefreshCw, BarChart2, Settings, Zap, Users,
  Play, Pause, ArrowRight, Trash2, Eye, Search, Filter,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-is-inbox-warmup",    label: "What is Inbox Warmup" },
  { id: "why-warmup-matters",      label: "Why warming up matters" },
  { id: "warmup-timeline",         label: "The warmup timeline" },
  { id: "warmup-dashboard",        label: "Warmup dashboard" },
  { id: "add-account",             label: "Add an account to warmup" },
  { id: "configure-settings",      label: "Configure settings" },
  { id: "understanding-metrics",   label: "Understanding metrics" },
  { id: "best-practices",          label: "Best practices" },
];

// ─── Ask AI ───────────────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-orange-400 hover:text-orange-600 bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-6, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-6, scale:0.97 }} transition={{ duration:0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="e.g. How long should I warm up my account?" />
            <button className="mt-2 w-full py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 transition">Ask</button>
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
                    ? "text-orange-600 font-semibold bg-orange-50 border-r-2 border-orange-500"
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
function ScreenFrame({ title, url, children }: { title: string; url?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {url
          ? <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-500 font-mono truncate">🔒 {url}</div>
          : <span className="text-xs text-gray-600 font-medium">{title}</span>}
      </div>
      {children}
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, color = "bg-orange-500" }: { checked: boolean; onChange: () => void; color?: string }) {
  return (
    <button onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${checked ? color : "bg-gray-300"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

// ─── Status Score Badge ───────────────────────────────────────────────────────
function StatusBadge({ score }: { score: number }) {
  if (score >= 90) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
      <CheckCircle2 className="w-3 h-3" /> {score}% Excellent
    </span>
  );
  if (score >= 70) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
      <Activity className="w-3 h-3" /> {score}% Building
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
      <AlertCircle className="w-3 h-3" /> {score}% Low
    </span>
  );
}

// ─── MOCKUP 1 — Warmup Dashboard ─────────────────────────────────────────────
function WarmupDashboardMockup() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const [filterOpen, setFilterOpen] = useState(false);

  const ACCOUNTS = [
    {
      initials:"M", color:"bg-blue-600",
      email:"myaccount@360airo.com", provider:"Smtp",
      status:"Connected", score:96, sentToday:0, warmupToday:0,
      dailyLimit:20, replyRate:15, maxPerDay:40,
    },
    {
      initials:"A", color:"bg-violet-600",
      email:"airo.outreach@gmail.com", provider:"Gmail",
      status:"Connected", score:88, sentToday:3, warmupToday:3,
      dailyLimit:30, replyRate:18, maxPerDay:50,
    },
    {
      initials:"S", color:"bg-orange-500",
      email:"sales@360airo.com", provider:"Microsoft 365",
      status:"Warming", score:62, sentToday:8, warmupToday:8,
      dailyLimit:15, replyRate:12, maxPerDay:30,
    },
  ];

  const filtered = ACCOUNTS.filter(a =>
    a.email.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All statuses" || a.status === filter)
  );

  const STATS = [
    { label:"Total Accounts", val:"3", icon:"✉️", bg:"bg-blue-50",   color:"text-blue-700"   },
    { label:"Active",         val:"3", icon:"⚡", bg:"bg-emerald-50",color:"text-emerald-700" },
    { label:"Emails Sent",    val:"11",icon:"📈", bg:"bg-violet-50", color:"text-violet-700"  },
    { label:"Warmup Emails",  val:"11",icon:"🔥", bg:"bg-orange-50", color:"text-orange-700"  },
  ];

  return (
    <ScreenFrame title="360Airo — Email Warmup" url="app.360airo.com/warmup">
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">Email Warmup</h3>
              <p className="text-xs text-gray-400">Build sender reputation for better deliverability</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm hover:bg-gray-50 transition">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md hover:opacity-90 transition">
              + Add Account
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {STATS.map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-white shadow-sm`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-[10px] font-bold ${s.color}`}>{s.label}</p>
                <span className="text-base">{s.icon}</span>
              </div>
              <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex-1 min-w-[180px] flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 text-xs outline-none bg-transparent text-gray-700 placeholder-gray-400"
              placeholder="Search accounts…" />
          </div>
          <div className="relative">
            <button onClick={() => setFilterOpen(p => !p)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm hover:bg-gray-50 transition">
              <Filter className="w-3.5 h-3.5" /> {filter}
              <ChevronDown className={`w-3 h-3 transition-transform ${filterOpen?"rotate-180":""}`} />
            </button>
            <AnimatePresence>
              {filterOpen && (
                <motion.div initial={{ opacity:0,y:-4 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                  className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                  {["All statuses","Connected","Warming","Paused"].map(f => (
                    <button key={f} onClick={() => { setFilter(f); setFilterOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs transition ${filter===f?"bg-orange-50 text-orange-600 font-bold":"text-gray-600 hover:bg-gray-50"}`}>
                      {f}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Account cards */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-400">No accounts match your search</div>
          )}
          {filtered.map((acc, i) => (
            <motion.div key={acc.email} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.05 }}
              className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${acc.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                    {acc.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-gray-900">{acc.email}</p>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{acc.status}</span>
                      <span className="text-[9px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{acc.provider}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-400 flex-wrap">
                      <span>Sent Today: <strong className="text-gray-700">{acc.sentToday}/{acc.dailyLimit}</strong></span>
                      <span>Warmup: <strong className="text-orange-600">{acc.warmupToday} 🔥</strong></span>
                      <span>Reply Rate: <strong className="text-gray-700">{acc.replyRate}%</strong></span>
                      <span>Max/Day: <strong className="text-gray-700">{acc.maxPerDay}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge score={acc.score} />
                  <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition" title="Settings">
                    <Settings className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition" title="Remove">
                    <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                  <span>Warmup Status</span>
                  <span className={`font-bold ${acc.score >= 90 ? "text-emerald-600" : acc.score >= 70 ? "text-amber-600" : "text-red-500"}`}>
                    {acc.score}%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width:0 }} animate={{ width:`${acc.score}%` }} transition={{ duration:0.8, delay:i*0.1 }}
                    className={`h-full rounded-full ${acc.score >= 90 ? "bg-emerald-500" : acc.score >= 70 ? "bg-amber-400" : "bg-red-400"}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 2 — 3-Step Add Account Wizard ────────────────────────────────────
function AddAccountWizard() {
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState("");
  const [provOpen, setProvOpen] = useState(false);
  const [form, setForm] = useState({ email:"", displayName:"", smtpHost:"smtp.example.com", port:"587", tls:true, username:"" });

  const PROVIDERS = ["Gmail","Microsoft 365 / Outlook","Custom SMTP","Zoho Mail"];

  const canNext = step === 1 ? provider !== "" : step === 2 ? form.email !== "" : true;

  return (
    <ScreenFrame title="360Airo — Add Warmup Account Wizard">
      <div className="bg-gray-50 p-5">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Step progress */}
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              {[1,2,3].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                    step > s ? "bg-emerald-500 text-white" : step === s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}>
                    {step > s ? <CheckCircle2 className="w-3.5 h-3.5" /> : s}
                  </div>
                  <span className={`text-[10px] font-semibold ${step===s?"text-blue-600":"text-gray-400"}`}>
                    {["Provider","Details","Review"][i]}
                  </span>
                  {i < 2 && <div className={`h-px w-8 ${step > s+1 ? "bg-emerald-300" : "bg-gray-200"} flex-shrink-0`} />}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1 */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity:0,x:10 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-10 }}>
                  <p className="text-sm font-bold text-gray-900 mb-1">Select Email Provider</p>
                  <p className="text-xs text-gray-400 mb-4">Choose your email service provider to begin warmup</p>
                  <div className="relative mb-4">
                    <button onClick={() => setProvOpen(p => !p)}
                      className="w-full flex items-center justify-between px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm text-gray-700 bg-white hover:border-blue-300 transition">
                      <span className={provider ? "text-gray-900 font-medium" : "text-gray-400"}>{provider || "Select a provider…"}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${provOpen?"rotate-180":""}`} />
                    </button>
                    <AnimatePresence>
                      {provOpen && (
                        <motion.div initial={{ opacity:0,y:-4 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                          {PROVIDERS.map(p => (
                            <button key={p} onClick={() => { setProvider(p); setProvOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center gap-2 ${
                                provider===p?"bg-blue-50 text-blue-600 font-semibold":"text-gray-700 hover:bg-gray-50"
                              }`}>
                              <span>{p==="Gmail"?"🇬":p==="Microsoft 365 / Outlook"?"🪟":p==="Zoho Mail"?"🟠":"🖥"}</span>
                              {p}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {provider && (
                    <motion.div initial={{ opacity:0,y:4 }} animate={{ opacity:1,y:0 }}
                      className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 text-xs text-blue-700">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>Selected: <strong>{provider}</strong>. Click Next to configure your account credentials.</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity:0,x:10 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-10 }}>
                  <p className="text-sm font-bold text-gray-900 mb-1">Account Details</p>
                  <p className="text-xs text-gray-400 mb-4">Enter account credentials for {provider}</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 block mb-1">Email Address *</label>
                      <input value={form.email} onChange={e => setForm(p => ({...p,email:e.target.value}))}
                        className="w-full text-sm border-2 border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 transition"
                        placeholder="yourname@gmail.com" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 block mb-1">Display Name (optional)</label>
                      <input value={form.displayName} onChange={e => setForm(p => ({...p,displayName:e.target.value}))}
                        className="w-full text-sm border-2 border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 transition"
                        placeholder="Your Name" />
                    </div>
                    <div className="grid grid-cols-[1fr_80px] gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 block mb-1">SMTP Host</label>
                        <input value={form.smtpHost} onChange={e => setForm(p => ({...p,smtpHost:e.target.value}))}
                          className="w-full text-xs border-2 border-blue-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 bg-blue-50/30 font-mono transition" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 block mb-1">Port</label>
                        <input value={form.port} onChange={e => setForm(p => ({...p,port:e.target.value}))}
                          className="w-full text-xs border-2 border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 font-mono transition" />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.tls} onChange={e => setForm(p => ({...p,tls:e.target.checked}))}
                        className="w-3.5 h-3.5 accent-blue-600" />
                      <span className="text-xs text-gray-600">Enable TLS</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity:0,x:10 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-10 }}>
                  <p className="text-sm font-bold text-gray-900 mb-1">Review & Confirm</p>
                  <p className="text-xs text-gray-400 mb-4">Review your account details before adding to warmup</p>
                  <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-4">
                    {[
                      ["Provider",     provider                       ],
                      ["Email",        form.email || "yourname@gmail.com"],
                      ["SMTP Host",    form.smtpHost                  ],
                      ["Port",         form.port                      ],
                      ["TLS",          form.tls ? "Enabled" : "Disabled"],
                    ].map(([label,val],i) => (
                      <div key={label} className={`grid grid-cols-[100px_1fr] px-3 py-2 text-xs border-b border-gray-100 last:border-0 ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-400 font-semibold">{label}</span>
                        <span className="text-gray-800 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 text-xs text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>All settings verified. Click <strong>Create Account</strong> to begin warming up this account.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer nav */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <button onClick={() => setStep(1)}
              className="text-xs text-gray-400 hover:text-gray-600 transition">Cancel</button>
            <div className="flex gap-2">
              {step > 1 && (
                <button onClick={() => setStep(s => s-1)}
                  className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-100 transition text-gray-600">
                  ← Back
                </button>
              )}
              <button onClick={() => { if (step < 3) setStep(s => s+1); }}
                disabled={!canNext}
                className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm ${
                  canNext
                    ? step === 3
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}>
                {step === 3 ? <><CheckCircle2 className="w-3.5 h-3.5" /> Create Account</> : <>Next →</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 3 — Configure Settings panel ─────────────────────────────────────
function ConfigureSettingsMockup() {
  const [settings, setSettings] = useState({
    warmupEnabled: true,
    dailyLimit:    20,
    rampUpPerDay:  2,
    replyRate:     15,
    maxPerDay:     40,
    readDelayMin:  30,
    readDelayMax:  180,
    randomizeRead:  true,
    randomizeReply: true,
    starThreads:   true,
    archiveThreads:false,
    useSignature:  true,
    signature:     "Best regards,\nYour Name",
  });
  const set = (k: keyof typeof settings, v: any) => setSettings(p => ({ ...p, [k]: v }));
  const [saved, setSaved] = useState(false);

  return (
    <ScreenFrame title="360Airo — Configure Warmup Account" url="app.360airo.com/warmup/configure">
      <div className="bg-gray-50 p-5">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Title bar */}
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Configure Account</p>
                <p className="text-xs text-gray-400">myaccount@360airo.com</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Warmup Settings */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-500" />
                <p className="text-xs font-black text-gray-800 uppercase tracking-wider">Warmup Settings</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Enable warmup</p>
                  <p className="text-xs text-gray-400">Send warmup emails daily to build sender reputation</p>
                </div>
                <Toggle checked={settings.warmupEnabled} onChange={() => set("warmupEnabled",!settings.warmupEnabled)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label:"Daily limit",   key:"dailyLimit",   unit:"emails/day" },
                  { label:"Ramp up/day",   key:"rampUpPerDay", unit:"emails" },
                  { label:"Reply rate",    key:"replyRate",    unit:"%" },
                  { label:"Max/day",       key:"maxPerDay",    unit:"emails" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[10px] font-bold text-gray-500 block mb-1">{f.label}</label>
                    <div className="flex items-center gap-1.5">
                      <input type="number" value={settings[f.key as keyof typeof settings] as number}
                        onChange={e => set(f.key as keyof typeof settings, parseInt(e.target.value)||0)}
                        className="flex-1 text-sm border-2 border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-orange-300 transition font-mono" />
                      <span className="text-[9px] text-gray-400 flex-shrink-0">{f.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delay & Randomization */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-blue-500" />
                <p className="text-xs font-black text-gray-800 uppercase tracking-wider">Delay & Randomization</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[
                  { label:"Read delay min", key:"readDelayMin", unit:"seconds" },
                  { label:"Read delay max", key:"readDelayMax", unit:"seconds" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[10px] font-bold text-gray-500 block mb-1">{f.label}</label>
                    <div className="flex items-center gap-1.5">
                      <input type="number" value={settings[f.key as keyof typeof settings] as number}
                        onChange={e => set(f.key as keyof typeof settings, parseInt(e.target.value)||0)}
                        className="flex-1 text-sm border-2 border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-blue-300 transition font-mono" />
                      <span className="text-[9px] text-gray-400 flex-shrink-0">{f.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {[
                  { label:"Randomize read time",  key:"randomizeRead"  },
                  { label:"Randomize reply time", key:"randomizeReply" },
                ].map(f => (
                  <div key={f.key} className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{f.label}</p>
                    <Toggle checked={settings[f.key as keyof typeof settings] as boolean}
                      onChange={() => set(f.key as keyof typeof settings, !settings[f.key as keyof typeof settings])}
                      color="bg-blue-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* Thread Actions */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-violet-500" />
                <p className="text-xs font-black text-gray-800 uppercase tracking-wider">Thread Actions</p>
              </div>
              <div className="space-y-2.5">
                {[
                  { label:"Star warmup threads",    key:"starThreads"    },
                  { label:"Archive warmup threads", key:"archiveThreads" },
                ].map(f => (
                  <div key={f.key} className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">{f.label}</p>
                    <Toggle checked={settings[f.key as keyof typeof settings] as boolean}
                      onChange={() => set(f.key as keyof typeof settings, !settings[f.key as keyof typeof settings])}
                      color="bg-violet-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-500" />
                <p className="text-xs font-black text-gray-800 uppercase tracking-wider">Signature</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-700">Use email signature</p>
                <Toggle checked={settings.useSignature} onChange={() => set("useSignature",!settings.useSignature)} color="bg-amber-500" />
              </div>
              {settings.useSignature && (
                <motion.div initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:"auto" }}>
                  <textarea value={settings.signature}
                    onChange={e => set("signature",e.target.value)}
                    rows={3}
                    className="w-full text-xs border-2 border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-amber-300 transition resize-none font-mono" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            {saved
              ? <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> All saved ✓</span>
              : <span className="text-xs text-gray-400">Unsaved changes</span>
            }
            <div className="flex gap-2">
              <button className="text-xs font-semibold border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-100 transition text-gray-600">Cancel</button>
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                className="text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 4 — Warmup Progress Visual ───────────────────────────────────────
function WarmupProgressMockup() {
  const [day, setDay] = useState(14);

  const getScore = (d: number) => {
    if (d <= 7) return Math.round(20 + (d / 7) * 30);
    if (d <= 21) return Math.round(50 + ((d-7) / 14) * 35);
    return Math.min(98, Math.round(85 + ((d-21) / 7) * 13));
  };

  const score = getScore(day);
  const emailsPerDay = Math.min(40, 5 + day * 2);

  return (
    <ScreenFrame title="360Airo — Warmup Progress Simulator">
      <div className="bg-gray-50 p-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <p className="text-sm font-black text-gray-900">Warmup Progress Simulator</p>
              <p className="text-xs text-gray-400">Drag the slider to see how score builds over time</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Day</span>
              <span className="text-2xl font-black text-blue-600">{day}</span>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-6">
            <input type="range" min="1" max="28" value={day} onChange={e => setDay(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-orange-500" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>Day 1</span>
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Day 28</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label:"Status Score",    val:`${score}%`,         color: score>=90?"text-emerald-600":score>=70?"text-amber-500":"text-red-500", bg:score>=90?"bg-emerald-50":score>=70?"bg-amber-50":"bg-red-50" },
              { label:"Emails/Day",      val:emailsPerDay,         color:"text-blue-600",   bg:"bg-blue-50"   },
              { label:"Est. Inbox Rate", val:`${Math.min(97,40+score*0.55).toFixed(0)}%`, color:"text-violet-600", bg:"bg-violet-50" },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                <p className="text-[10px] text-gray-500 mb-1">{s.label}</p>
                <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Score bar */}
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>Sender reputation score</span>
              <span className="font-bold text-gray-600">{score}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <motion.div animate={{ width:`${score}%` }} transition={{ duration:0.4 }}
                className={`h-full rounded-full ${score>=90?"bg-gradient-to-r from-emerald-400 to-teal-400":score>=70?"bg-gradient-to-r from-amber-400 to-orange-400":"bg-gradient-to-r from-red-400 to-orange-400"}`} />
            </div>
            <div className="flex justify-between text-[10px] mt-1.5 font-semibold">
              <span className="text-red-400">↑ Risk</span>
              <span className="text-amber-400">Building</span>
              <span className="text-emerald-400">Ready ↑</span>
            </div>
          </div>

          {/* Status message */}
          <motion.div key={Math.floor(score/20)} initial={{ opacity:0,y:4 }} animate={{ opacity:1,y:0 }}
            className={`mt-4 rounded-xl px-4 py-3 text-xs font-medium flex items-start gap-2 ${
              score >= 90
                ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
                : score >= 70
                ? "bg-amber-50 border border-amber-100 text-amber-700"
                : "bg-red-50 border border-red-100 text-red-700"
            }`}>
            {score >= 90
              ? <><CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> <span><strong>Ready to launch campaigns!</strong> Your sender reputation is excellent. You can safely start sending cold outreach at full volume.</span></>
              : score >= 70
              ? <><Activity className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> <span><strong>Still building.</strong> Good progress — continue warmup for another {28-day} days before launching campaigns at full volume.</span></>
              : <><AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> <span><strong>Too early.</strong> Do not start campaigns yet — your sender reputation is low and emails will likely land in spam.</span></>
            }
          </motion.div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InboxWarmupPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-inbox-warmup");

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
                  <Link href="#" className="hover:text-orange-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-orange-600 transition">Email Deliverability</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Inbox Warmup</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md flex-shrink-0">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inbox Warmup</h1>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    A step-by-step guide to warming up your email accounts in 360Airo — gradually building sender
                    reputation so your outreach campaigns land in the inbox, not the spam folder.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── What is inbox warmup ─────────────────────────────── */}
                <motion.div id="what-is-inbox-warmup" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    <strong>Inbox warmup</strong> is the process of gradually increasing your email sending volume
                    from a new or dormant email account. Email providers like Gmail and Microsoft 365 judge new
                    senders by their history — a brand-new account that suddenly sends 500 emails per day looks
                    suspicious and will be flagged as spam. Warmup builds that history organically by exchanging
                    small volumes of real, human-like emails over several weeks.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Flame,      bg:"bg-orange-50",  color:"text-orange-600",  border:"border-orange-200",  title:"Builds reputation",   desc:"360Airo sends warmup emails to a network of real inboxes. Replies, opens, and engagement signal to providers that your account is trustworthy" },
                      { icon:TrendingUp, bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"Gradual ramp-up",     desc:"Starts at 5–10 emails per day and increases by 2–5 per day over 3–4 weeks until you reach your target sending volume" },
                      { icon:Shield,     bg:"bg-emerald-50", color:"text-emerald-600", border:"border-emerald-200", title:"Real interactions",   desc:"360Airo uses genuine inbox-to-inbox interactions — not bots or fake engagement — making the warmup signal authentic and effective" },
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

                  <div className="flex items-start gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-xs text-orange-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Never skip warmup on a new account.</strong> Sending cold outreach from an unwarmed
                      email address — even with great content — will result in most of your emails landing in spam
                      and can permanently damage that account's sender reputation.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Why warmup matters ───────────────────────────────── */}
                <motion.div id="why-warmup-matters" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Why warming up matters</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Email providers use machine learning models that evaluate every new sender's behaviour patterns.
                    Warmup teaches these models that your account is a legitimate, engaged human sender — not a
                    spammer or bulk mailer.
                  </p>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:BarChart2,  bg:"bg-blue-50",    color:"text-blue-600",    title:"Establishes sending history",     desc:"Email servers track how long an account has been sending, at what volume, and with what engagement. Warmup creates a clean, growing history that unlocks higher volume thresholds over time." },
                      { icon:Activity,   bg:"bg-emerald-50", color:"text-emerald-600", title:"Generates positive engagement signals", desc:"When warmup emails are opened, read, replied to, and starred, it signals high-quality content to spam filters. 360Airo's warmup network does all of this automatically for your account." },
                      { icon:Shield,     bg:"bg-violet-50",  color:"text-violet-600",  title:"Prevents spam classification",    desc:"Spam filters are most aggressive toward new senders. A properly warmed account builds a sender score that classifies it alongside trusted, established senders — giving your real campaigns a massive head start." },
                      { icon:TrendingUp, bg:"bg-orange-50",  color:"text-orange-600",  title:"Unlocks your full daily limit",   desc:"Most email providers impose daily sending limits on new accounts. Warmup signals responsible sending behaviour, which increases these limits over time — sometimes dramatically within the first 30 days." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.12+i*0.06 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-sm transition">
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
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Warmup timeline ──────────────────────────────────── */}
                <motion.div id="warmup-timeline" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.14 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">The warmup timeline</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    A full warmup cycle typically takes 3–4 weeks. The interactive simulator below lets you drag
                    to any day and see exactly what your status score, sending volume, and estimated inbox placement
                    rate will look like at that point.
                  </p>

                  <div className="mb-5"><WarmupProgressMockup /></div>

                  {/* Phase cards */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      {
                        phase:"Week 1–2", icon:"🌱", bg:"bg-orange-50", border:"border-orange-200", color:"text-orange-700",
                        title:"Low volume — high engagement",
                        details:["5–10 warmup emails per day","Very high open and reply rates","Score climbs from ~20% to ~50%","Do NOT run campaigns yet"],
                      },
                      {
                        phase:"Week 2–3", icon:"📈", bg:"bg-amber-50", border:"border-amber-200", color:"text-amber-700",
                        title:"Ramp-up phase",
                        details:["Volume increases 2–5 emails/day","Consistent reply and open signals","Score reaches 70–85%","Small test campaigns OK"],
                      },
                      {
                        phase:"Week 3–4", icon:"🚀", bg:"bg-emerald-50", border:"border-emerald-200", color:"text-emerald-700",
                        title:"Full capacity",
                        details:["90–100% status score achieved","Daily limit fully unlocked","Inbox placement at peak","Launch campaigns with confidence"],
                      },
                    ].map((item,i) => (
                      <motion.div key={item.phase} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.14+i*0.08 }}
                        className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <p className={`text-[10px] font-black uppercase tracking-wider ${item.color}`}>{item.phase}</p>
                            <p className="text-xs font-bold text-gray-800">{item.title}</p>
                          </div>
                        </div>
                        <ul className="space-y-1">
                          {item.details.map((d,j) => (
                            <li key={j} className="flex items-center gap-1.5 text-[10px] text-gray-600">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.color.replace("text-","bg-")}`} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Warmup dashboard ─────────────────────────────────── */}
                <motion.div id="warmup-dashboard" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Warmup dashboard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The Email Warmup dashboard shows all accounts currently in your warmup pool with live status,
                    scores, and daily activity. Use the search bar and status filter — both are interactive in the
                    mockup below.
                  </p>
                  <div className="mb-5"><WarmupDashboardMockup /></div>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Dashboard columns explained</p>
                    </div>
                    {[
                      ["Sent Today",   "Total emails sent from this account today (warmup + campaign combined)"],
                      ["Warmup 🔥",    "Number of warmup emails sent today — separate from campaign emails"],
                      ["Daily Limit",  "The current maximum emails allowed per day on this account (grows during warmup)"],
                      ["Reply Rate",   "Percentage of warmup emails that receive a reply — higher is better (target: 15–20%)"],
                      ["Max/Day",      "The target maximum sending volume once warmup is fully complete"],
                      ["Status Score", "0–100 composite score representing your sender reputation. 90+ = ready for campaigns"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[130px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Add account ──────────────────────────────────────── */}
                <motion.div id="add-account" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.18 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Add an account to warmup</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Click <strong>+ Add Account</strong> on the warmup dashboard to open the 3-step wizard.
                    The wizard below is fully interactive — select a provider, fill in details, and review
                    before creating.
                  </p>
                  <div className="mb-5"><AddAccountWizard /></div>
                  <ul className="space-y-2">
                    {[
                      ["Step 1 — Provider",  "Select your email service provider from the dropdown. Gmail, Microsoft 365, Zoho Mail, and Custom SMTP are all supported"],
                      ["Step 2 — Details",   "Enter your email address, optional display name, and SMTP host configuration. 360Airo pre-fills common values for known providers"],
                      ["Step 3 — Review",    "Confirm all settings before creating. A green confirmation message appears when everything is valid — click Create Account to begin warmup immediately"],
                    ].map(([title,desc],i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 list-none">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Configure settings ───────────────────────────────── */}
                <motion.div id="configure-settings" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Configure settings</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Click the Settings icon on any account card to open the Configure Account panel.
                    All toggles and inputs in the mockup below are fully interactive.
                  </p>
                  <div className="mb-5"><ConfigureSettingsMockup /></div>

                  {/* Settings reference */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Settings reference</p>
                    </div>
                    {[
                      ["Enable warmup",        "On",          "Turn warmup on or off for this account. Disabling pauses warmup emails but does not reset your score"],
                      ["Daily limit",           "20",          "How many warmup emails to send per day. Start low; 360Airo will ramp up automatically"],
                      ["Ramp up / day",         "2",           "Number of additional warmup emails added each day. Recommended: 2–3"],
                      ["Reply rate",            "15–20%",      "Target percentage of warmup emails that should receive a reply. Higher increases trust signals"],
                      ["Max / day",             "40–50",       "The ceiling for warmup volume once fully ramped. Do not exceed your provider's actual limits"],
                      ["Read delay min/max",    "30s – 180s",  "Simulates realistic human reading time before marking a warmup email as read"],
                      ["Randomize read/reply",  "On",          "Adds natural variation to delay times, making the warmup pattern look authentically human"],
                      ["Star threads",          "On",          "Stars warmup email threads in your inbox — signals high value to spam algorithms"],
                      ["Archive threads",       "Off",         "Archives warmup emails after processing. Useful for keeping your inbox clean during warmup"],
                      ["Use signature",         "On",          "Includes your email signature in warmup messages. Keeps warmup emails consistent with your real sending style"],
                    ].map(([label,recommended,desc],i) => (
                      <div key={label} className={`px-4 py-3 border-b border-gray-100 last:border-0 ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-xs font-bold text-gray-800">{label}</span>
                          <span className="text-[9px] font-black text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full">Recommended: {recommended}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Understanding metrics ────────────────────────────── */}
                <motion.div id="understanding-metrics" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding metrics</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The status score is the most important number on your warmup dashboard. Here's how to read it
                    and what each tier means for your campaigns.
                  </p>

                  {/* Status score guide */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Status score guide</p>
                    </div>
                    {[
                      { range:"90–100%", icon:"🟢", bg:"bg-emerald-50", border:"border-emerald-100", color:"text-emerald-700",
                        label:"Excellent", action:"Launch campaigns with confidence at full daily volume. Your sender reputation is strong." },
                      { range:"70–89%",  icon:"🟡", bg:"bg-amber-50",   border:"border-amber-100",   color:"text-amber-700",
                        label:"Good — still building", action:"You can run small test campaigns. Continue warmup for 1–2 more weeks before scaling to full volume." },
                      { range:"Below 70%",icon:"🔴", bg:"bg-red-50",    border:"border-red-100",     color:"text-red-700",
                        label:"Reputation risk", action:"Do not run campaigns. Pause outreach and allow warmup to continue. Running campaigns now will damage your score further." },
                    ].map((item,i) => (
                      <div key={item.range} className={`${item.bg} border-b ${item.border} last:border-0 px-4 py-3`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">{item.icon}</span>
                          <span className={`text-sm font-bold ${item.color}`}>{item.range}</span>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${item.border} ${item.color} bg-white`}>{item.label}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.action}</p>
                      </div>
                    ))}
                  </div>

                  {/* Metric cards */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon:Flame,     color:"text-orange-600", bg:"bg-orange-50", border:"border-orange-200",
                        title:"Warmup emails / day",
                        desc:"The number of inbox-to-inbox warmup exchanges sent per day. This number should grow by your ramp-up setting every day until you hit your Max/Day limit." },
                      { icon:Activity,  color:"text-emerald-600",bg:"bg-emerald-50",border:"border-emerald-200",
                        title:"Reply rate",
                        desc:"The percentage of your warmup emails that receive a reply. Replies are the single strongest trust signal — aim for 15–20%. Below 10% means the warmup is less effective." },
                      { icon:BarChart2, color:"text-blue-600",   bg:"bg-blue-50",   border:"border-blue-200",
                        title:"Daily limit",
                        desc:"Your current maximum sending volume — including both warmup and campaign emails. This number increases automatically as your score improves." },
                      { icon:TrendingUp,color:"text-violet-600", bg:"bg-violet-50", border:"border-violet-200",
                        title:"Max / day",
                        desc:"The target ceiling for this account's sending volume once warmup is complete. Set this to match your provider's safe limits (typically 40–100 for Gmail, higher for Outlook)." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22+i*0.07 }}
                          className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 ${item.color}`} />
                            <p className={`text-sm font-bold ${item.color}`}>{item.title}</p>
                          </div>
                          <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Best practices ───────────────────────────────────── */}
                <motion.div id="best-practices" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Best practices</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:Flame,      color:"bg-orange-500",  title:"Start warmup immediately on every new account",        desc:"The moment you add a new email account, start warmup. There is no downside to warming up in parallel with other prep work — and every day of warmup you skip is a day you lose from your reputation build-up." },
                      { icon:TrendingUp, color:"bg-blue-600",    title:"Keep ramp-up at 2–3 emails per day",                   desc:"A ramp-up rate of more than 3 emails/day can trigger sudden volume spikes that look suspicious to spam filters. Slow and steady wins — 2 per day is the sweet spot for most providers." },
                      { icon:Shield,     color:"bg-emerald-600", title:"Don't launch campaigns below 70% status score",        desc:"Even if you're impatient, running cold outreach at a status score below 70% will result in most emails hitting spam. The warmup investment pays off massively in campaign performance." },
                      { icon:Users,      color:"bg-violet-600",  title:"Warm up multiple accounts simultaneously",             desc:"If you plan to run inbox rotation or ESP matching, start warming up all your sender accounts at the same time. A pool of warmed accounts is exponentially more powerful than one single warmed account." },
                      { icon:Star,       color:"bg-amber-500",   title:"Keep your email signature consistent",                 desc:"Use the same signature in warmup as in your real campaigns. Signature consistency is a minor but real trust signal — spam filters notice when the signature on a 'cold' email doesn't match the account's warmup history." },
                      { icon:Activity,   color:"bg-teal-600",    title:"Monitor reply rate weekly",                            desc:"A healthy warmup reply rate is 15–20%. If your reply rate drops below 10%, your warmup emails may be getting caught by spam filters at the destination — check your settings and consider reducing your daily volume temporarily." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.25+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-sm transition">
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

                  {/* Quick reference table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Inbox Warmup — quick reference</p>
                    </div>
                    {[
                      ["How long does it take",  "3–4 weeks for a full warmup cycle to reach 90%+ status score"],
                      ["When to start campaigns","Status score 90%+ for full volume; 70%+ for small test campaigns only"],
                      ["Recommended ramp-up",    "2 emails/day increase — goes from ~5/day to 40+/day by week 4"],
                      ["Target reply rate",      "15–20% — the primary trust signal for email providers"],
                      ["Real inboxes used",      "Yes — 360Airo uses real inbox-to-inbox interactions, not bot traffic"],
                      ["Can I pause warmup",     "Yes — pausing stops warmup emails but does not reset your score"],
                      ["Multiple accounts",      "Yes — warm up all accounts simultaneously for best results"],
                      ["Combines well with",     "ESP Matching, Inbox Rotation, Email Throttling"],
                    ].map(([field,val],i) => (
                      <div key={field} className={`grid grid-cols-[180px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{field}</span>
                        <span className="text-gray-700">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> 360Airo's warmup uses real inboxes — not bots or simulated traffic.
                      Genuine interactions (open, read, reply, star) carry far more weight with spam filter algorithms
                      than synthetic engagement does. This is the single biggest advantage 360Airo's warmup has over
                      cheaper alternatives.
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