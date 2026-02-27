"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, RefreshCw,
  CheckCircle2, AlertCircle, Info, Star, Zap, Shield, Settings,
  PlusCircle, Activity, ArrowRight, ArrowLeft, X, Search, Filter,
  Flame, TrendingUp, BarChart2, Eye, EyeOff, Server, Lock,
  ToggleLeft, ToggleRight, Users, Globe,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-is-warmup",    label: "What is Email Warm-up" },
  { id: "warmup-dashboard",  label: "Warm-up dashboard" },
  { id: "add-account",       label: "Add New Account (3 steps)" },
  { id: "configure-settings",label: "Configure Account Settings" },
  { id: "warmup-metrics",    label: "Understanding warm-up metrics" },
  { id: "best-practices",    label: "Best practices" },
];

// ─── Ask AI ───────────────────────────────────────────────────────────────────
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
              placeholder="e.g. How long does warm-up take?" />
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
                }`}>{item.label}
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

// ─── Toggle component ─────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${checked ? "bg-blue-600" : "bg-gray-300"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

// ─── Warmup Dashboard Mockup (Image 1) ───────────────────────────────────────
function WarmupDashboardMockup() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const STATS = [
    { label:"Total Accounts", val:"2", icon:"✉️", iconBg:"bg-blue-500"   },
    { label:"Active",         val:"2", icon:"⚡", iconBg:"bg-green-500"  },
    { label:"Emails Sent",    val:"0", icon:"📈", iconBg:"bg-purple-500" },
    { label:"Warmup Emails",  val:"0", icon:"🔥", iconBg:"bg-orange-500" },
  ];

  const ACCOUNTS = [
    { initials:"M", color:"bg-blue-600",  email:"myaccount@360airo.com",  username:"myaccount@360airo.com", provider:"Smtp", dailyLimit:20, replyRate:"15%", maxPerDay:40, status:96 },
    { initials:"A", color:"bg-violet-600",email:"airo.outreach@gmail.com", username:"airo.outreach@gmail.com",provider:"Gmail",dailyLimit:30, replyRate:"18%", maxPerDay:50, status:88 },
  ];

  const filtered = ACCOUNTS.filter(a =>
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <BrowserFrame title="360Airo — Email Warmup">
        <div className="bg-gray-50 p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">Email Warmup</h3>
                <p className="text-xs text-gray-400">Manage and monitor your warmup accounts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition shadow-sm">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-90 transition shadow-md">
                <PlusCircle className="w-3.5 h-3.5" /> Add Account
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {STATS.map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
                <div className={`w-10 h-10 rounded-2xl ${s.iconBg} flex items-center justify-center mb-3 text-lg shadow-sm`}>
                  {s.icon}
                </div>
                <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
                <p className="text-2xl font-black text-gray-900">{s.val}</p>
              </div>
            ))}
          </div>

          {/* Search toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex-1 min-w-[180px] flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs shadow-sm">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by email or name…"
                className="bg-transparent outline-none flex-1 text-gray-600 placeholder-gray-300 text-xs" />
            </div>
            <div className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm">
              <Filter className="w-3 h-3 text-gray-400" />
              All statuses <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>

          {/* Account cards */}
          <div className="space-y-3">
            {filtered.map((acc, i) => (
              <motion.div key={acc.email} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                transition={{ delay:i*0.07 }}
                className="bg-white rounded-2xl border border-gray-200 px-5 py-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${acc.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-sm font-black">{acc.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{acc.email}</p>
                      <p className="text-[10px] text-gray-400">{acc.username}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Connected
                        </span>
                        <span className="text-[9px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">{acc.provider}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <p className="text-[9px] text-gray-400 font-medium">Sent Today</p>
                      <p className="text-sm font-black text-gray-800">0/{acc.dailyLimit}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-medium">Warmup</p>
                      <p className="text-sm font-black text-orange-500 flex items-center gap-1">0 🔥</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100">
                  {[
                    { label:"Daily Limit",  val:acc.dailyLimit },
                    { label:"Reply Rate",   val:acc.replyRate  },
                    { label:"Max/Day",      val:acc.maxPerDay  },
                    { label:"Status",       val:`${acc.status}%`, badge:true },
                  ].map(m => (
                    <div key={m.label}>
                      <p className="text-[9px] text-gray-400 font-medium mb-0.5">{m.label}</p>
                      {m.badge
                        ? <p className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            {m.val} <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          </p>
                        : <p className="text-xs font-bold text-gray-800">{m.val}</p>
                      }
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </BrowserFrame>

      {/* Modal overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
            <motion.div initial={{ opacity:0,y:20,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
              exit={{ opacity:0,y:20,scale:0.97 }} transition={{ duration:0.2 }}
              className="w-full max-w-md">
              <AddAccountWizard onClose={() => setShowModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Add Account Wizard (Images 2, 3, 4) ─────────────────────────────────────
function AddAccountWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1|2|3>(1);
  const [provider, setProvider] = useState("");
  const [providerOpen, setProviderOpen] = useState(false);
  const [form, setForm] = useState({
    email:"", displayName:"", smtpHost:"smtp.example.com",
    port:"587", useTls:true, username:"",
  });

  const PROVIDERS = ["Gmail","Outlook","Custom SMTP"];

  const STEPS = [
    { num:1, label:"Provider" },
    { num:2, label:"Details"  },
    { num:3, label:"Review"   },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-blue-50/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-bold text-gray-900">Add New Account</p>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
        {STEPS.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                step > s.num ? "bg-blue-600 text-white" : step === s.num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
              }`}>
                {step > s.num ? <CheckCircle2 className="w-3 h-3" /> : s.num}
              </div>
              <span className={`text-xs font-semibold ${step >= s.num ? "text-blue-600" : "text-gray-400"}`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px w-8 mx-1 ${step > s.num ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="px-5 py-5">
        {/* Step 1 — Provider */}
        {step === 1 && (
          <div>
            <p className="text-xs text-gray-500 mb-4">Select Email Provider</p>
            <div className="relative mb-6">
              <button onClick={() => setProviderOpen(p => !p)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 bg-white hover:border-blue-300 transition">
                {provider || "Choose provider"} <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <AnimatePresence>
                {providerOpen && (
                  <motion.div initial={{ opacity:0,y:-6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-6 }}
                    transition={{ duration:0.15 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                    {PROVIDERS.map(p => (
                      <button key={p} onClick={() => { setProvider(p); setProviderOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition ${provider === p ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"}`}>
                        {p}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-[10px] text-blue-500 mb-4">Select your email provider</p>
          </div>
        )}

        {/* Step 2 — Details */}
        {step === 2 && (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {[
              { label:"Email Address *",        key:"email",       placeholder:"you@example.com",      type:"email" },
              { label:"Display Name (optional)",key:"displayName", placeholder:"Your Name",            type:"text"  },
              { label:"SMTP Host *",            key:"smtpHost",    placeholder:"smtp.example.com",     type:"text", highlight:true },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">{field.label}</label>
                <input type={field.type}
                  value={form[field.key as keyof typeof form] as string}
                  onChange={e => setForm(p => ({...p, [field.key]:e.target.value}))}
                  placeholder={field.placeholder}
                  className={`w-full text-sm border rounded-xl px-3 py-2.5 outline-none focus:ring-2 ${
                    field.highlight ? "border-blue-400 focus:ring-blue-200 bg-blue-50/30" : "border-gray-200 focus:ring-blue-200 bg-white"
                  } text-gray-800`} />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">Port *</label>
                <input value={form.port} onChange={e => setForm(p => ({...p, port:e.target.value}))}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 bg-white" />
              </div>
              <div className="flex items-center gap-3 pt-5">
                <Toggle checked={form.useTls} onChange={() => setForm(p => ({...p, useTls:!p.useTls}))} />
                <span className="text-sm text-gray-700">Use TLS</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">Username/Email *</label>
              <input value={form.username || form.email}
                onChange={e => setForm(p => ({...p, username:e.target.value}))}
                placeholder="lucybrown0032@gmail.com"
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50/30 text-gray-700" />
            </div>
            <p className="text-[10px] text-blue-500">Enter account credentials</p>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-4 space-y-2.5">
              {[
                { label:"Provider", val: provider || "Smtp"               },
                { label:"Email",    val: form.email || "myaccount@360airo.com" },
                { label:"Host",     val: form.smtpHost                    },
                { label:"Port",     val: form.port                        },
                { label:"TLS",      val: form.useTls ? "Enabled" : "Disabled" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 w-16">{item.label}:</span>
                  <span className="font-bold text-gray-900">{item.val}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <p className="text-xs text-emerald-700">All settings verified. Click "Create Account" to finish.</p>
            </div>
            <p className="text-[10px] text-gray-400">Review and create</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
        <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition">
          Cancel
        </button>
        {step > 1 && (
          <button onClick={() => setStep(s => (s - 1) as 1|2|3)}
            className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition">
            Back
          </button>
        )}
        {step < 3
          ? <button onClick={() => setStep(s => (s + 1) as 1|2|3)} disabled={step === 1 && !provider}
              className="px-5 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          : <button className="px-5 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Create Account
            </button>
        }
      </div>
    </div>
  );
}

// ─── Configure Account Settings Mockup (Image 5) ─────────────────────────────
function ConfigureAccountMockup() {
  const [settings, setSettings] = useState({
    enableWarmup: true, dailyLimit: "20", rampUpPerDay: "2",
    replyRate: "15", maxPerDay: "40",
    readDelayMin: "30", readDelayMax: "180",
    randomizeRead: true, randomizeReply: true,
    starThreads: true, archiveThreads: false,
    useSignature: true,
    signature: "Best regards, Your Name",
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings(p => ({ ...p, [key]: !p[key] }));

  const num = (key: keyof typeof settings, val: string) =>
    setSettings(p => ({ ...p, [key]: val }));

  return (
    <BrowserFrame title="360Airo — Configure Account">
      <div className="bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <div>
              <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">Configure Account</p>
              <p className="text-sm font-bold text-gray-900">myaccount@360airo.com</p>
            </div>
            <button><X className="w-4 h-4 text-gray-400 hover:text-gray-600 transition" /></button>
          </div>

          <div className="px-5 py-4 space-y-4 max-h-[58vh] overflow-y-auto">
            {/* Warmup Settings */}
            <Section title="Warmup Settings">
              <ToggleRow label="Enable warmup" checked={settings.enableWarmup} onChange={() => toggle("enableWarmup")} />
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  { label:"Daily limit",    key:"dailyLimit"    },
                  { label:"Ramp up/day",   key:"rampUpPerDay"  },
                  { label:"Reply rate (%)",key:"replyRate"     },
                  { label:"Max/day",       key:"maxPerDay"     },
                ].map(f => (
                  <div key={f.key} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
                    <p className="text-[9px] text-gray-400 font-semibold mb-1">{f.label}</p>
                    <input value={settings[f.key as keyof typeof settings] as string}
                      onChange={e => num(f.key as keyof typeof settings, e.target.value)}
                      className="w-full text-sm font-black text-gray-900 bg-transparent outline-none" />
                  </div>
                ))}
              </div>
            </Section>

            {/* Delay & Randomization */}
            <Section title="Delay & Randomization">
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[
                  { label:"Read delay min (s)", key:"readDelayMin" },
                  { label:"Read delay max (s)", key:"readDelayMax" },
                ].map(f => (
                  <div key={f.key} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
                    <p className="text-[9px] text-gray-400 font-semibold mb-1">{f.label}</p>
                    <input value={settings[f.key as keyof typeof settings] as string}
                      onChange={e => num(f.key as keyof typeof settings, e.target.value)}
                      className="w-full text-sm font-black text-gray-900 bg-transparent outline-none" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ToggleRow label="Randomize read"  checked={settings.randomizeRead}  onChange={() => toggle("randomizeRead")}  />
                <ToggleRow label="Randomize reply" checked={settings.randomizeReply} onChange={() => toggle("randomizeReply")} />
              </div>
            </Section>

            {/* Thread Actions */}
            <Section title="Thread Actions">
              <div className="grid grid-cols-2 gap-3">
                <ToggleRow label="Star threads"    checked={settings.starThreads}    onChange={() => toggle("starThreads")}    />
                <ToggleRow label="Archive threads" checked={settings.archiveThreads} onChange={() => toggle("archiveThreads")} />
              </div>
            </Section>

            {/* Signature */}
            <Section title="Signature">
              <ToggleRow label="Use signature" checked={settings.useSignature} onChange={() => toggle("useSignature")} />
              {settings.useSignature && (
                <textarea rows={2} value={settings.signature}
                  onChange={e => setSettings(p => ({...p, signature:e.target.value}))}
                  className="w-full mt-3 text-xs border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 resize-none text-gray-600" />
              )}
            </Section>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50">
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> All saved
            </span>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition">
                <X className="w-3 h-3" /> Cancel
              </button>
              <button className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
                <Settings className="w-3 h-3" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
        <p className="text-xs font-bold text-gray-700">{title}</p>
      </div>
      <div className="p-3.5 space-y-1">{children}</div>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-gray-700">{label}</span>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Standalone wizard demo ───────────────────────────────────────────────────
function AddAccountWizardDemo() {
  return (
    <BrowserFrame title="360Airo — Add New Account (3-Step Wizard)">
      <div className="bg-gray-50/60 p-4">
        <div className="max-w-md mx-auto">
          <AddAccountWizard onClose={() => {}} />
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EmailWarmupPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-warmup");

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
                  <Link href="#" className="hover:text-blue-600 transition">Create Campaigns</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Email Warmup</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Email Warmup</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to use 360Airo's Email Warmup feature to gradually build sender reputation,
                    protect deliverability, and ensure your emails land in the inbox — not the spam folder.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* What is warmup */}
                <motion.div id="what-is-warmup" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    <strong>Email Warmup</strong> is the process of gradually increasing your daily send volume to build
                    trust with email providers like Gmail, Outlook, and Yahoo. New or idle email accounts that send
                    large volumes immediately are often flagged as spam. Warmup prevents this by simulating
                    natural email activity over several weeks.
                  </p>

                  {/* How it works timeline */}
                  <div className="relative pl-6 space-y-4 mb-5">
                    <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-orange-400 via-blue-400 to-emerald-400" />
                    {[
                      { color:"bg-orange-500", week:"Week 1–2", title:"Low volume, high reply rate",   desc:"360Airo sends 5–10 warmup emails per day to a trusted network of real inboxes. They open, reply, and mark as not spam — signalling your account is legitimate." },
                      { color:"bg-blue-500",   week:"Week 2–3", title:"Volume ramps up gradually",     desc:"Your daily limit increases by 2–5 emails per day (configurable as Ramp up/day). Reply rate stays high, building a strong positive sending history." },
                      { color:"bg-emerald-500",week:"Week 3–4", title:"Ready for full sending",        desc:"Your account has built enough trust to send campaign emails at full capacity. Status score approaches 90–100%, indicating a healthy sender reputation." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                        transition={{ delay:0.1+i*0.08 }}
                        className="relative flex gap-3 pl-3">
                        <div className={`absolute -left-4 top-1.5 w-3 h-3 rounded-full ${item.color} border-2 border-white shadow`} />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white ${item.color}`}>{item.week}</span>
                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-xs text-orange-700">
                    <Flame className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-orange-500" />
                    <span>
                      <strong>Never skip warmup on a new account.</strong> Sending cold outreach emails from an
                      un-warmed account is one of the most common reasons campaigns land in spam. Enable warmup
                      as soon as you add any account to 360Airo.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Warmup Dashboard */}
                <motion.div id="warmup-dashboard" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Warm-up dashboard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The Email Warmup page shows all your warm-up accounts with live stats — sent today,
                    warmup email count, daily limit, reply rate, max/day, and status score. Click
                    <strong> + Add Account</strong> in the mockup to open the full 3-step wizard.
                  </p>

                  <div className="mb-5"><WarmupDashboardMockup /></div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      { icon:Mail,     bg:"bg-blue-50",   color:"text-blue-600",   title:"Total Accounts",  desc:"How many email accounts have warmup configured in your workspace" },
                      { icon:Zap,      bg:"bg-emerald-50",color:"text-emerald-600",title:"Active",          desc:"Accounts currently running warmup — actively sending and receiving warmup emails each day" },
                      { icon:TrendingUp,bg:"bg-violet-50",color:"text-violet-600", title:"Emails Sent",     desc:"Total real campaign emails sent today across all warmup-connected accounts" },
                      { icon:Flame,    bg:"bg-orange-50", color:"text-orange-600", title:"Warmup Emails",   desc:"Number of automated warmup emails sent today by the warmup system (separate from your real campaigns)" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.15+i*0.05 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition">
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

                {/* Add Account Wizard */}
                <motion.div id="add-account" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Add New Account (3-step wizard)</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Click <strong>+ Add Account</strong> to open the 3-step wizard. The mockup below is fully
                    interactive — work through all three steps. Click Next to advance, Back to return.
                  </p>

                  <div className="mb-5"><AddAccountWizardDemo /></div>

                  {/* Step breakdown */}
                  <div className="space-y-3 mb-5">
                    {[
                      { num:"Step 1", color:"bg-blue-600",   title:"Select Provider",    desc:"Choose your email provider from the dropdown — Gmail, Outlook, or Custom SMTP. This determines which connection method is used in Step 2." },
                      { num:"Step 2", color:"bg-violet-600", title:"Enter Credentials",  desc:"Fill in your Email Address, Display Name (optional), SMTP Host, Port, TLS toggle, and Username. For Gmail and Outlook, you will be redirected to OAuth instead." },
                      { num:"Step 3", color:"bg-emerald-600",title:"Review & Create",    desc:"Review a summary of all your settings — Provider, Email, Host, Port, TLS status. If everything looks correct, click Create Account to add it to your workspace." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                        transition={{ delay:0.2+i*0.07 }}
                        className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                        <div className={`${item.color} text-white text-[9px] font-black px-2 py-1 rounded-lg flex-shrink-0 h-fit mt-0.5`}>{item.num}</div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {[
                      ["Gmail / Outlook","Selecting Gmail or Outlook skips manual SMTP entry — you authorise 360Airo via OAuth and the settings are configured automatically"],
                      ["Custom SMTP","For any other provider (Zoho, Yahoo, custom domain, etc.) — fill in your SMTP host, port, and TLS setting manually"],
                      ["TLS toggle","Enable Use TLS for all modern email providers. TLS encrypts your outgoing connection and is required by most providers on port 587"],
                      ["Create Account","Once created, the account appears immediately in the warmup list and you can configure its warmup settings from the account card"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Configure Settings */}
                <motion.div id="configure-settings" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">2</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Configure Account Settings</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Click the settings icon on any account card to open the Configure Account panel. All toggles
                    and inputs in the mockup below are fully interactive — try changing values.
                  </p>

                  <div className="mb-5"><ConfigureAccountMockup /></div>

                  {/* Settings reference */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="grid grid-cols-[1fr_2fr_1fr] bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Setting</div>
                      <div className="px-4 py-2.5 border-x border-gray-200">What it does</div>
                      <div className="px-4 py-2.5">Recommended</div>
                    </div>
                    {[
                      ["Enable warmup",      "Master toggle — turns warmup on or off for this account",                                                     "On"],
                      ["Daily limit",        "How many warmup emails to send per day at the start",                                                          "20"],
                      ["Ramp up/day",        "How many extra emails to add each day until Max/day is reached",                                               "2"],
                      ["Reply rate (%)",     "Percentage of warmup emails that receive a reply — higher is better for reputation",                           "15–20%"],
                      ["Max/day",            "Maximum warmup emails per day once fully ramped up",                                                           "40–50"],
                      ["Read delay min/max", "Simulates human reading time — adds a randomised delay before marking email as read (in seconds)",             "30–180s"],
                      ["Randomize read",     "Randomly varies the read delay within your min/max range — makes activity look more natural",                  "On"],
                      ["Randomize reply",    "Randomly varies reply timing — prevents patterns that spam filters look for",                                  "On"],
                      ["Star threads",       "Automatically stars warmup email threads in your inbox — signals to Gmail that these are important emails",    "On"],
                      ["Archive threads",    "Automatically archives warmup threads after interaction — keeps inbox clean",                                  "Off"],
                      ["Use signature",      "Appends your email signature to warmup emails — makes them look like real sent messages",                     "On"],
                    ].map(([setting, desc, rec], i) => (
                      <div key={setting} className={`grid grid-cols-[1fr_2fr_1fr] border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="px-4 py-2.5 font-semibold text-gray-800">{setting}</div>
                        <div className="px-4 py-2.5 text-gray-500 border-x border-gray-100">{desc}</div>
                        <div className="px-4 py-2.5 font-semibold text-emerald-600">{rec}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Warmup Metrics */}
                <motion.div id="warmup-metrics" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding warm-up metrics</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Each account card on the warmup dashboard shows four key metrics. Here is what each one
                    means and what to look out for.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      { icon:Mail,     bg:"bg-blue-50",   color:"text-blue-600",   title:"Daily Limit",   desc:"Current warmup send limit for today. This increases by the Ramp up/day amount each day until Max/day is reached — e.g. starts at 20, grows to 40 over 10 days" },
                      { icon:TrendingUp,bg:"bg-violet-50",color:"text-violet-600", title:"Reply Rate",    desc:"Percentage of warmup emails that received a reply. A healthy reply rate (15–20%) tells email providers your account sends content people want to receive" },
                      { icon:BarChart2, bg:"bg-emerald-50",color:"text-emerald-600",title:"Max/Day",      desc:"The maximum warmup volume your account will reach once fully ramped. Setting this between 40–50 is recommended for most outreach accounts" },
                      { icon:Shield,   bg:"bg-orange-50", color:"text-orange-600", title:"Status (%)",   desc:"Your overall sender reputation score — aim for 90%+ before running live campaigns. 96% means your account has excellent standing with email providers" },
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

                  {/* Status score guide */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Status Score</div>
                      <div className="px-4 py-2.5 border-x border-gray-200">What it means</div>
                      <div className="px-4 py-2.5">Action</div>
                    </div>
                    {[
                      ["🟢 90–100%","bg-emerald-50 text-emerald-700","Excellent sender reputation — ready for live campaigns","Launch campaigns with confidence"],
                      ["🟡 70–89%", "bg-amber-50 text-amber-700",   "Good but still building — warmup is working",           "Continue warmup for 1–2 more weeks"],
                      ["🔴 Below 70%","bg-red-50 text-red-600",     "Reputation risk — account may have had recent issues",  "Pause campaigns, increase warmup intensity"],
                    ].map(([score, cls, meaning, action]) => (
                      <div key={score} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 text-xs ${cls}`}>
                        <div className="px-4 py-2.5 font-bold">{score}</div>
                        <div className="px-4 py-2.5 border-x border-gray-100 text-gray-600">{meaning}</div>
                        <div className="px-4 py-2.5 text-gray-600">{action}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Best practices */}
                <motion.div id="best-practices" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Best practices</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:Flame,     color:"bg-orange-500", title:"Start warmup immediately",       desc:"Enable warmup as soon as you add a new account — don't wait. Even a few days of warmup before sending makes a significant difference to deliverability." },
                      { icon:TrendingUp,color:"bg-blue-500",   title:"Keep ramp up/day at 2–3",       desc:"A gradual ramp of 2–3 extra emails per day looks natural to email providers. Increasing too fast (10+) can trigger spam filters even during warmup." },
                      { icon:Shield,    color:"bg-emerald-500",title:"Don't run campaigns below 70%", desc:"Always check your Status score before launching a campaign. If an account drops below 70%, pause outreach and let warmup rebuild reputation first." },
                      { icon:Users,     color:"bg-violet-500", title:"Use multiple accounts",         desc:"For high-volume outreach, add 3–5 accounts and use inbox rotation. This spreads sends across accounts and protects each individual sender reputation." },
                      { icon:Settings,  color:"bg-teal-500",   title:"Keep signature consistent",    desc:"Use the same signature in warmup emails as you do in your real campaigns — consistency further strengthens your sender identity with email providers." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                          transition={{ delay:0.35+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> The 360Airo warmup network uses real inboxes — not bots. Replies are
                      genuine interactions that email providers see as positive signals. This is why 360Airo warmup
                      is significantly more effective than tools that simulate fake replies.
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