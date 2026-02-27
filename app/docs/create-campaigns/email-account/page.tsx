"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, RefreshCw,
  CheckCircle2, AlertCircle, Info, Star, Zap, Shield, Settings,
  PlusCircle, Wifi, BarChart2, Edit3, Trash2, ArrowRight, X,
  Eye, EyeOff, Server, Lock, Globe, Activity, Users,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",         label: "What is Email Configuration" },
  { id: "dashboard",        label: "Email Configuration dashboard" },
  { id: "add-account",      label: "Add Email Account" },
  { id: "smtp-imap",        label: "SMTP / IMAP settings" },
  { id: "connect-warmup",   label: "Connect Warm-up" },
  { id: "managing-accounts",label: "Managing accounts" },
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
              placeholder="e.g. How do I connect Gmail?" />
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

// ─── Email Config Dashboard Mockup (Image 1) ─────────────────────────────────
function EmailConfigDashboardMockup() {
  const [showModal, setShowModal] = useState(false);

  const STATS = [
    { label:"Active Accounts", val:"1",   sub:"of 1 total",          icon:"✅", bg:"bg-green-50",   color:"text-green-700",  iconBg:"bg-green-500"   },
    { label:"Daily Limit",     val:"55",  sub:"emails per day",       icon:"✉️", bg:"bg-blue-50",    color:"text-blue-700",   iconBg:"bg-blue-500"    },
    { label:"Sent Today",      val:"0",   sub:"across all accounts",  icon:"📊", bg:"bg-purple-50",  color:"text-purple-700", iconBg:"bg-purple-500"  },
    { label:"Utilisation",     val:"0%",  sub:"of daily capacity",    icon:"⚙️", bg:"bg-orange-50",  color:"text-orange-700", iconBg:"bg-orange-500"  },
  ];

  return (
    <>
      <BrowserFrame title="360Airo — Email Configuration">
        <div className="bg-gray-50 p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-gray-900">Email Configuration</h3>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
                    <Wifi className="w-3 h-3" /> Online
                  </span>
                </div>
                <p className="text-xs text-gray-400">Manage your email accounts and SMTP settings</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition shadow-sm">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-md">
                🛒 Get Professional Email
              </button>
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-90 transition shadow-md">
                <PlusCircle className="w-3.5 h-3.5" /> Add Email Account
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {STATS.map(s => (
              <div key={s.label} className={`${s.bg} rounded-2xl border border-white p-4 shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <p className={`text-xs font-bold ${s.color}`}>{s.label}</p>
                  <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center text-base shadow-sm`}>
                    {s.icon}
                  </div>
                </div>
                <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Accounts list */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-900">Email Accounts</p>
                <p className="text-[10px] text-gray-400">Manage your configured email accounts</p>
              </div>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">1 / 50 accounts</span>
            </div>

            {/* Account row */}
            <div className="px-5 py-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-gray-900">myaccount@360airo.com</p>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                    <span className="text-[9px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">Verified</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><Server className="w-3 h-3" /> SMTP/IMAP</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 0/55 sent today</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-blue-500 transition" title="Activity">
                  <Activity className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition">
                  <RefreshCw className="w-3 h-3" /> Connect Warm-up
                </button>
                <button className="hover:text-blue-500 transition" title="Edit">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="hover:text-red-500 transition" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
            <motion.div initial={{ opacity:0,y:20,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
              exit={{ opacity:0,y:20,scale:0.97 }} transition={{ duration:0.2 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              <AddEmailAccountModal onClose={() => setShowModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Add Email Account Modal (Image 2) ───────────────────────────────────────
function AddEmailAccountModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"gmail"|"outlook"|"smtp">("smtp");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    smtpHost: "smtp.gmail.com", port: "465", tls: true, ssl: false,
    username: "myaccount@360airo.com", fromEmail: "myaccount@360airo.com", password: "••••••••••",
    protocol: "IMAP", server: "imap.gmail.com", imapPort: "993",
  });

  return (
    <div>
      {/* Modal header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="text-sm font-bold text-gray-900">Add Email Account</p>
          <p className="text-xs text-gray-400">Configure a new email account for sending campaigns.</p>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {[
          { key:"gmail",   label:"Gmail",   icon:"🇬" },
          { key:"outlook", label:"Outlook", icon:"🇴" },
          { key:"smtp",    label:"SMTP/IMAP",icon:"🖥" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition border-b-2 ${
              tab === t.key ? "border-blue-600 text-blue-600 bg-blue-50/50" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}>
            <span className="text-sm">{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div className="px-5 py-4 max-h-[60vh] overflow-y-auto space-y-4">
        {tab === "smtp" ? (
          <>
            {/* SMTP Settings */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-gray-900">SMTP Settings</span>
              </div>
              <div className="grid grid-cols-[1fr_100px] gap-3 mb-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">SMTP Host *</label>
                  <input value={form.smtpHost} onChange={e => setForm(p => ({...p, smtpHost:e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">Port *</label>
                  <input value={form.port} onChange={e => setForm(p => ({...p, port:e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white" />
                </div>
              </div>
              <div className="flex items-center gap-5">
                {[["tls","Use TLS"],["ssl","Use SSL"]].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form[key as "tls"|"ssl"]}
                      onChange={e => setForm(p => ({...p, [key]:e.target.checked}))}
                      className="w-3.5 h-3.5 accent-blue-600" />
                    <span className="text-xs text-gray-600">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Authentication */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-gray-900">Authentication</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">Username *</label>
                  <input value={form.username} onChange={e => setForm(p => ({...p, username:e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200 bg-white" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">From Email *</label>
                  <input value={form.fromEmail} onChange={e => setForm(p => ({...p, fromEmail:e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200 bg-white" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">Password *</label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={form.password}
                      onChange={e => setForm(p => ({...p, password:e.target.value}))}
                      className="w-full text-xs border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 pr-8 outline-none focus:ring-2 focus:ring-blue-200" />
                    <button onClick={() => setShowPass(p => !p)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Incoming Mail */}
            <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-bold text-gray-900">Incoming Mail</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">Protocol</label>
                  <select value={form.protocol} onChange={e => setForm(p => ({...p, protocol:e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-violet-200 bg-white">
                    <option>IMAP</option><option>POP3</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">Server</label>
                  <input value={form.server} onChange={e => setForm(p => ({...p, server:e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-violet-200 bg-white" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 mb-1 block">Port</label>
                  <input value={form.imapPort} onChange={e => setForm(p => ({...p, imapPort:e.target.value}))}
                    className="w-full text-xs border border-blue-200 bg-blue-50 rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Gmail / Outlook tab placeholder */
          <div className="flex flex-col items-center py-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-sm font-bold text-gray-700 mb-1">Connect via {tab === "gmail" ? "Gmail OAuth" : "Outlook OAuth"}</p>
            <p className="text-xs text-gray-400 mb-4 max-w-xs">Authorise 360Airo to send on behalf of your {tab === "gmail" ? "Google" : "Microsoft"} account — no password required.</p>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-md">
              Connect {tab === "gmail" ? "Gmail" : "Outlook"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
        <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-100 transition">
          Cancel
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold border border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition">
          <Activity className="w-3.5 h-3.5" /> Test Connection
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition shadow-md">
          <CheckCircle2 className="w-3.5 h-3.5" /> Save Configuration
        </button>
      </div>
    </div>
  );
}

// ─── Standalone modal demo ────────────────────────────────────────────────────
function AddAccountModalDemo() {
  return (
    <BrowserFrame title="360Airo — Add Email Account">
      <div className="bg-gray-50/60 p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
          <AddEmailAccountModal onClose={() => {}} />
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmailAccountPage() {
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
                  <Link href="#" className="hover:text-blue-600 transition">Create Campaigns</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Email Account</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Email Account</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to configure and manage your email accounts in 360Airo — connect Gmail, Outlook,
                    or any SMTP/IMAP provider, monitor your daily sending limits, and enable inbox warm-up
                    to protect your sender reputation.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Overview */}
                <motion.div id="overview" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    The <strong>Email Configuration</strong> page is where you connect the email accounts that 360Airo
                    uses to send your campaigns. Without a connected, verified email account, no campaign can go out.
                    You can connect up to 50 accounts per workspace and manage daily send limits, warm-up, and
                    SMTP settings from one place.
                  </p>

                  {/* 3 concept cards */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Mail,      bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"Connect Accounts",   desc:"Add Gmail, Outlook, or any custom SMTP/IMAP email account to 360Airo" },
                      { icon:BarChart2, bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"Monitor Limits",     desc:"Track daily send limits and utilisation across all your connected accounts" },
                      { icon:Shield,    bg:"bg-emerald-50", color:"text-emerald-600", border:"border-emerald-200", title:"Inbox Warm-up",      desc:"Enable warm-up on any account to gradually build sender reputation and avoid spam" },
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
                      <strong>Before launching any campaign,</strong> you must have at least one Active and Verified
                      email account connected to your 360Airo workspace. The account is selected during the
                      Review & Schedule step of campaign creation.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Dashboard section */}
                <motion.div id="dashboard" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Configuration dashboard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The Email Configuration page gives you a live overview of all connected email accounts, your
                    daily sending capacity, and account health. Click <strong>Add Email Account</strong> in the mockup
                    below to open the full account setup modal.
                  </p>

                  <div className="mb-5"><EmailConfigDashboardMockup /></div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {[
                      { icon:CheckCircle2, bg:"bg-emerald-50", color:"text-emerald-600", title:"Active Accounts",  desc:"Shows how many email accounts are currently active and able to send. Inactive or disconnected accounts do not count toward your daily limit" },
                      { icon:Mail,         bg:"bg-blue-50",    color:"text-blue-600",    title:"Daily Limit",      desc:"The total number of emails your workspace can send per day across all connected accounts. 55 is the default for a standard SMTP account" },
                      { icon:Activity,     bg:"bg-violet-50",  color:"text-violet-600",  title:"Sent Today",       desc:"Real-time counter of emails sent today across all accounts. Resets at midnight in your account timezone" },
                      { icon:BarChart2,    bg:"bg-orange-50",  color:"text-orange-600",  title:"Utilisation",      desc:"Percentage of your daily limit used today — a quick health check to see how close you are to your daily cap" },
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

                {/* Add Account */}
                <motion.div id="add-account" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Add Email Account</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Click <strong>+ Add Email Account</strong> from the Email Configuration dashboard to open the account
                    setup panel. Choose between Gmail, Outlook (OAuth), or any SMTP/IMAP provider. All fields in the mockup
                    below are fully interactive — try editing them.
                  </p>

                  <div className="mb-5"><AddAccountModalDemo /></div>

                  {/* Three provider cards */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { emoji:"🇬", bg:"bg-red-50",    border:"border-red-200",    color:"text-red-700",    title:"Gmail",       desc:"Connect via Google OAuth — no password needed. 360Airo requests only send permission. Best for Google Workspace accounts" },
                      { emoji:"🇴", bg:"bg-blue-50",   border:"border-blue-200",   color:"text-blue-700",   title:"Outlook",     desc:"Connect via Microsoft OAuth — ideal for Office 365 and Outlook.com accounts. Secure and no SMTP setup required" },
                      { emoji:"🖥", bg:"bg-gray-50",   border:"border-gray-200",   color:"text-gray-700",   title:"SMTP/IMAP",   desc:"Connect any email provider using your SMTP host, port, and login credentials. Supports all custom domains and providers" },
                    ].map((item, i) => (
                      <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                        transition={{ delay:0.2+i*0.05 }}
                        className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{item.emoji}</span>
                          <p className={`text-sm font-bold ${item.color}`}>{item.title}</p>
                        </div>
                        <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {[
                      ["Gmail / Outlook tabs","Select Gmail or Outlook and click Connect — you will be redirected to Google or Microsoft to authorise 360Airo. No password is stored"],
                      ["SMTP/IMAP tab","Fill in SMTP Host, Port, authentication credentials, and IMAP incoming mail settings. Use TLS (port 465 or 587) for secure connections"],
                      ["Test Connection","Click Test Connection before saving — 360Airo sends a test ping to verify your settings are correct"],
                      ["Save Configuration","Once the test passes, click Save Configuration — the account is created and listed in your Email Accounts section immediately"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* SMTP / IMAP settings */}
                <motion.div id="smtp-imap" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">SMTP / IMAP settings explained</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    If you are connecting a custom domain or non-Google/Microsoft provider, you will need to fill in your
                    SMTP and IMAP settings manually. Here is what each field means.
                  </p>

                  {/* Settings reference table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="grid grid-cols-[1fr_1.5fr_1fr] bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Field</div>
                      <div className="px-4 py-2.5 border-x border-gray-200">Description</div>
                      <div className="px-4 py-2.5">Common value</div>
                    </div>
                    {[
                      ["SMTP Host",   "Outgoing mail server address",                     "smtp.gmail.com"],
                      ["Port",        "SMTP port number (use 465 for TLS or 587 for SSL)","465 or 587"],
                      ["Use TLS",     "Enables TLS encryption for sending",               "✓ Recommended"],
                      ["Use SSL",     "Enables SSL encryption (alternative to TLS)",      "Use only one"],
                      ["Username",    "Your full email address used to authenticate",     "you@yourdomain.com"],
                      ["From Email",  "Email address shown to recipients as the sender",  "you@yourdomain.com"],
                      ["Password",    "Your email password or App Password",              "Use App Password for Gmail"],
                      ["Protocol",    "Incoming mail protocol for reading replies",       "IMAP (recommended)"],
                      ["IMAP Server", "Incoming mail server address",                     "imap.gmail.com"],
                      ["IMAP Port",   "IMAP port (993 for TLS, 143 for unencrypted)",    "993"],
                    ].map(([field, desc, val], i) => (
                      <div key={field} className={`grid grid-cols-[1fr_1.5fr_1fr] border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="px-4 py-2.5 font-semibold text-gray-800">{field}</div>
                        <div className="px-4 py-2.5 text-gray-500 border-x border-gray-100">{desc}</div>
                        <div className="px-4 py-2.5 font-mono text-[10px] text-violet-700">{val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Gmail App Password note */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-4">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-amber-800 mb-1">Gmail users — use an App Password</p>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          If your Google account has 2-Step Verification enabled (recommended), you cannot use your
                          regular password with SMTP. Instead, generate a Google App Password from your Google Account
                          security settings and paste it in the Password field.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>IMAP is required</strong> for 360Airo to read replies and track reply rates. If you only configure SMTP
                      without IMAP, you will lose reply detection and your campaign analytics will be incomplete.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Connect Warm-up */}
                <motion.div id="connect-warmup" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Warm-up</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Inbox warm-up gradually increases your daily send volume over time to build trust with email providers
                    like Gmail and Outlook. It is especially important for new or recently idle email accounts.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:Shield,    bg:"bg-emerald-50", color:"text-emerald-600", title:"What warm-up does",      desc:"360Airo sends a small number of automated emails per day to a network of real inboxes, and they reply and mark your emails as not spam — building your reputation gradually" },
                      { icon:Activity,  bg:"bg-blue-50",    color:"text-blue-600",    title:"When to enable it",     desc:"Enable warm-up on every new account before using it in a live campaign. Also re-enable it if an account has been idle for 30+ days" },
                      { icon:BarChart2, bg:"bg-violet-50",  color:"text-violet-600",  title:"How long it takes",     desc:"Most accounts need 2–4 weeks of warm-up before they are ready to send at full capacity. 360Airo shows your warm-up progress in the account settings" },
                      { icon:Zap,       bg:"bg-orange-50",  color:"text-orange-600",  title:"How to connect",        desc:"Click Connect Warm-up next to any account in the Email Accounts list — 360Airo takes care of the rest automatically without any further action needed" },
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

                  <div className="flex items-start gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-violet-500" />
                    <span>
                      <strong>Best practice:</strong> Never skip warm-up on a brand-new email account. Sending cold outreach
                      from a cold (un-warmed) account dramatically increases the chance of landing in spam — even with
                      well-written, personalised content. Start warm-up as soon as you add an account.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Managing accounts */}
                <motion.div id="managing-accounts" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing accounts</h2>

                  <div className="space-y-3 mb-5">
                    {[
                      { step:"01", icon:Activity,   color:"bg-blue-600",    title:"View account activity",   desc:"Click the activity icon (graph) next to any account to see a detailed send history — emails sent, bounces, replies detected, and daily usage charts." },
                      { step:"02", icon:Edit3,       color:"bg-violet-600",  title:"Edit settings",           desc:"Click the edit icon (pencil) to update SMTP settings, change the From Name, adjust daily send limits, or rotate to a different password." },
                      { step:"03", icon:RefreshCw,   color:"bg-emerald-600", title:"Reconnect warm-up",       desc:"If warm-up was disconnected or paused, click Connect Warm-up to re-enable it. Useful after a sending pause or account credential update." },
                      { step:"04", icon:Trash2,      color:"bg-red-500",     title:"Remove an account",       desc:"Click the delete icon to permanently remove an account. Any campaigns currently assigned to this account will be paused automatically." },
                      { step:"05", icon:PlusCircle,  color:"bg-orange-500",  title:"Add more accounts",       desc:"You can connect up to 50 accounts per workspace. Multiple accounts are used for inbox rotation — spreading sends across accounts to protect individual reputation." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                          transition={{ delay:0.35+i*0.05 }}
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

                  {/* Get Professional Email CTA */}
                  <div className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 p-5 text-white">
                    <h3 className="text-sm font-bold mb-1">Need a professional sending address?</h3>
                    <p className="text-xs text-orange-100 leading-relaxed mb-4">
                      Get a professional email address from 360Airo — a custom domain email pre-configured for
                      optimal deliverability, with warm-up already included. No SMTP setup required.
                    </p>
                    <button className="flex items-center gap-2 bg-white text-orange-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-50 transition shadow-md">
                      🛒 Get Professional Email <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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