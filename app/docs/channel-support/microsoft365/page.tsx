"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, Shield,
  CheckCircle2, AlertCircle, Info, Star, Key, Lock, Settings,
  ExternalLink, X, ArrowRight, ArrowLeft, Copy, RefreshCw,
  User, Globe, Server, Activity, Zap, Building2, Eye, EyeOff,
  MonitorSmartphone, Wifi,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",             label: "Overview" },
  { id: "prerequisites",        label: "Prerequisites" },
  { id: "step1-open-email-config", label: "Step 1 — Open Email Config" },
  { id: "step2-add-account",    label: "Step 2 — Add Email Account" },
  { id: "step3-select-outlook", label: "Step 3 — Select Outlook" },
  { id: "step4-microsoft-login",label: "Step 4 — Microsoft Sign-in" },
  { id: "step5-grant-permission",label: "Step 5 — Grant Permission" },
  { id: "step6-connected",      label: "Step 6 — Account Connected" },
  { id: "smtp-fallback",        label: "SMTP fallback method" },
  { id: "troubleshooting",      label: "Troubleshooting" },
];

// ─── Ask AI ───────────────────────────────────────────────────────────────────
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
              placeholder="e.g. How do I connect Outlook to 360Airo?"
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
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On this page</span>
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

// ─── Browser / Screen wrapper ─────────────────────────────────────────────────
function ScreenFrame({ title, children, url }: { title: string; children: React.ReactNode; url?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {url && (
          <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-500 font-mono truncate">
            🔒 {url}
          </div>
        )}
        {!url && <span className="text-xs text-gray-600 font-medium">{title}</span>}
      </div>
      {children}
    </div>
  );
}

// ─── Step badge ───────────────────────────────────────────────────────────────
function StepBadge({ num, color = "bg-blue-600" }: { num: number; color?: string }) {
  return (
    <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-[11px] font-black">{num}</span>
    </div>
  );
}

// ─── MOCKUP 1 — 360Airo Email Configuration page ────────────────────────────
function EmailConfigMockup({ onAddClick }: { onAddClick: () => void }) {
  const STATS = [
    { label: "Active Accounts", val: "1", sub: "of 1 total",          bg: "bg-green-50",   color: "text-green-700",  icon: "✅" },
    { label: "Daily Limit",     val: "55", sub: "emails per day",      bg: "bg-blue-50",    color: "text-blue-700",   icon: "✉️" },
    { label: "Sent Today",      val: "0",  sub: "across all accounts", bg: "bg-purple-50",  color: "text-purple-700", icon: "📊" },
    { label: "Utilisation",     val: "0%", sub: "of daily capacity",   bg: "bg-orange-50",  color: "text-orange-700", icon: "⚙️" },
  ];
  return (
    <ScreenFrame title="360Airo — Email Configuration" url="app.360airo.com/settings/email">
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-gray-900">Email Configuration</h3>
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
                  <Wifi className="w-3 h-3" /> Online
                </span>
              </div>
              <p className="text-xs text-gray-400">Manage your email accounts and SMTP settings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md">
              🛒 Get Professional Email
            </button>
            <button
              onClick={onAddClick}
              className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md hover:opacity-90 transition"
            >
              + Add Email Account
            </button>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {STATS.map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl border border-white p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-[10px] font-bold ${s.color}`}>{s.label}</p>
                <span className="text-base">{s.icon}</span>
              </div>
              <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
        {/* Account row */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <div>
              <p className="text-sm font-bold text-gray-900">Email Accounts</p>
              <p className="text-[10px] text-gray-400">Manage your configured email accounts</p>
            </div>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
              1 / 50 accounts
            </span>
          </div>
          <div className="px-5 py-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-gray-900">myaccount@360airo.com</p>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </span>
                  <span className="text-[9px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><Server className="w-3 h-3" /> SMTP/IMAP</span>
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 0/55 sent today</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-blue-500 transition" title="Activity"><Activity className="w-4 h-4" /></button>
              <button className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition">
                <RefreshCw className="w-3 h-3" /> Warm-up
              </button>
              <button className="hover:text-red-500 transition" title="Delete">✕</button>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 2 — Add Account modal with tab picker ─────────────────────────────
function AddAccountModal({ onClose, onSelectOutlook }: { onClose: () => void; onSelectOutlook: () => void }) {
  const [tab, setTab] = useState<"gmail" | "outlook" | "smtp">("outlook");
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full mx-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-blue-50/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Add Email Account</p>
            <p className="text-xs text-gray-400">Connect an email account to 360Airo</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {[
          { key: "gmail",   label: "Gmail",      icon: "🇬" },
          { key: "outlook", label: "Outlook",    icon: "🇲" },
          { key: "smtp",    label: "SMTP/IMAP",  icon: "🖥" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition border-b-2 ${
              tab === t.key
                ? "border-blue-600 text-blue-600 bg-blue-50/50"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="text-base">{t.icon}</span> {t.label}
          </button>
        ))}
      </div>
      <div className="px-6 py-8">
        {tab === "outlook" ? (
          <div className="flex flex-col items-center text-center">
            {/* Microsoft logo-style */}
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-4 shadow-md">
              <span className="text-3xl">🪟</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Connect Microsoft 365</h3>
            <p className="text-xs text-gray-400 max-w-xs mb-6 leading-relaxed">
              Authorise 360Airo to send emails on behalf of your Microsoft 365 or Outlook account via secure OAuth — no password required.
            </p>
            <div className="w-full bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 text-xs text-blue-700 flex items-start gap-2 text-left">
              <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
              <span>You will be redirected to Microsoft to sign in and grant permission. 360Airo only receives send access — your password is never stored.</span>
            </div>
            <button
              onClick={onSelectOutlook}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              <span className="text-base">🪟</span> Continue with Microsoft
            </button>
          </div>
        ) : tab === "gmail" ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
              <span className="text-3xl">🇬</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Connect Gmail / Google Workspace</h3>
            <p className="text-xs text-gray-400 max-w-xs mb-6 leading-relaxed">
              Use Google OAuth for seamless connection, or use an App Password for SMTP setup.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
              <span className="text-base">🇬</span> Continue with Google
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Server className="w-7 h-7 text-gray-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Connect via SMTP / IMAP</h3>
            <p className="text-xs text-gray-400 max-w-xs mb-6 leading-relaxed">
              Use your server credentials to connect any email provider manually.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-800 transition shadow-md">
              Configure SMTP Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MOCKUP 3 — Microsoft login page ─────────────────────────────────────────
function MicrosoftLoginMockup({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState("yourname@outlook.com");
  return (
    <ScreenFrame title="Microsoft Sign-in" url="login.microsoftonline.com">
      <div className="bg-white min-h-[280px] flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          {/* MS logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              <div className="bg-red-500 rounded-sm" />
              <div className="bg-green-500 rounded-sm" />
              <div className="bg-blue-500 rounded-sm" />
              <div className="bg-yellow-400 rounded-sm" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Microsoft</span>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-1">Sign in</h2>
          <p className="text-xs text-gray-400 mb-4">to continue to 360Airo</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 mb-3"
            placeholder="Email, phone, or Skype"
          />
          <p className="text-xs text-blue-600 hover:underline cursor-pointer mb-5">No account? Create one!</p>
          <div className="flex items-center justify-between">
            <button className="text-xs text-blue-600 hover:underline">Sign-in options</button>
            <button
              onClick={onNext}
              className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center">
            Terms of use &nbsp;·&nbsp; Privacy &amp; cookies &nbsp;·&nbsp; ...
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 4 — Microsoft password entry ─────────────────────────────────────
function MicrosoftPasswordMockup({ onNext }: { onNext: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  return (
    <ScreenFrame title="Microsoft — Enter password" url="login.microsoftonline.com">
      <div className="bg-white min-h-[280px] flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              <div className="bg-red-500 rounded-sm" />
              <div className="bg-green-500 rounded-sm" />
              <div className="bg-blue-500 rounded-sm" />
              <div className="bg-yellow-400 rounded-sm" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Microsoft</span>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-1">Enter password</h2>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <User className="w-3.5 h-3.5" />
            yourname@outlook.com
            <span className="text-blue-500 hover:underline cursor-pointer">↩</span>
          </div>
          <div className="relative mb-3">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-sm px-3 py-2.5 pr-10 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <button
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-blue-600 hover:underline cursor-pointer mb-5">Forgot password?</p>
          <div className="flex items-center justify-between">
            <button className="text-xs text-blue-600 hover:underline">Other ways to sign in</button>
            <button
              onClick={onNext}
              className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 5 — Microsoft permissions grant screen ───────────────────────────
function MicrosoftPermissionsMockup({ onAllow, onCancel }: { onAllow: () => void; onCancel: () => void }) {
  return (
    <ScreenFrame title="Microsoft — Permissions requested" url="login.microsoftonline.com/oauth2/authorize">
      <div className="bg-white min-h-[320px] flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              <div className="bg-red-500 rounded-sm" />
              <div className="bg-green-500 rounded-sm" />
              <div className="bg-blue-500 rounded-sm" />
              <div className="bg-yellow-400 rounded-sm" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Microsoft</span>
          </div>

          {/* App identity */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white text-[10px] font-black">360</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">360Airo</p>
              <p className="text-[10px] text-gray-400">app.360airo.com</p>
            </div>
          </div>

          <h2 className="text-base font-semibold text-gray-900 mb-1">Permissions requested</h2>
          <p className="text-xs text-gray-500 mb-4">
            <span className="text-blue-600 font-semibold">360Airo</span> is requesting permission to:
          </p>

          <div className="space-y-2 mb-5">
            {[
              { icon: Mail,     perm: "Send emails on your behalf",            detail: "Used to send campaign emails from your Outlook address" },
              { icon: Eye,      perm: "Read your email messages and settings", detail: "Used to detect replies and track campaign engagement" },
              { icon: User,     perm: "Access your profile information",       detail: "Used to display your name and email in 360Airo" },
              { icon: Globe,    perm: "Maintain access while you are away",    detail: "Used to keep the connection active so campaigns run on schedule" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.perm} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{item.perm}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">
            By accepting, you allow this app to use your information in accordance with their terms of service and privacy policy. You can change these permissions at any time in your{" "}
            <span className="text-blue-500">Microsoft account settings</span>.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 text-sm border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onAllow}
              className="flex-1 py-2.5 text-sm bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition shadow-md"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 6 — Connected success screen ─────────────────────────────────────
function ConnectedSuccessMockup() {
  return (
    <ScreenFrame title="360Airo — Account Connected" url="app.360airo.com/settings/email">
      <div className="bg-gray-50 p-6">
        {/* Success banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3.5 mb-5 shadow-sm"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-800">Microsoft 365 account connected successfully!</p>
            <p className="text-xs text-emerald-600">yourname@outlook.com is now active and ready to send campaigns.</p>
          </div>
        </motion.div>

        {/* Account row */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900">Email Accounts</p>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
              2 / 50 accounts
            </span>
          </div>

          {/* Existing account */}
          <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between flex-wrap gap-2 opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Mail className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">myaccount@360airo.com</p>
                <p className="text-[9px] text-gray-400">SMTP/IMAP · 0/55 sent today</p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Active</span>
          </div>

          {/* New Microsoft account */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="px-5 py-4 flex items-center justify-between flex-wrap gap-3 bg-blue-50/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-lg">🪟</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-gray-900">yourname@outlook.com</p>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </span>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    🪟 Microsoft 365
                  </span>
                  <span className="text-[9px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> OAuth 2.0</span>
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 0/100 sent today</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-blue-500 transition"><Activity className="w-4 h-4" /></button>
              <button className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition">
                <RefreshCw className="w-3 h-3" /> Warm-up
              </button>
              <button className="hover:text-red-500 transition">✕</button>
            </div>
          </motion.div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Full interactive flow mockup (steps 1–6 combined) ───────────────────────
function InteractiveFlow() {
  const [stage, setStage] = useState<"dashboard" | "modal" | "login" | "password" | "permissions" | "success">("dashboard");

  return (
    <div>
      {/* Stage indicator */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {(["dashboard","modal","login","password","permissions","success"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <button
              onClick={() => setStage(s)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition ${
                stage === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
            {i < 5 && <ChevronRight className="w-3 h-3 text-gray-300" />}
          </div>
        ))}
        <span className="text-[10px] text-gray-400 ml-1">Click steps to navigate</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={stage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {stage === "dashboard" && (
            <EmailConfigMockup onAddClick={() => setStage("modal")} />
          )}
          {stage === "modal" && (
            <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center min-h-[400px] border border-gray-200">
              <AddAccountModal onClose={() => setStage("dashboard")} onSelectOutlook={() => setStage("login")} />
            </div>
          )}
          {stage === "login" && (
            <MicrosoftLoginMockup onNext={() => setStage("password")} />
          )}
          {stage === "password" && (
            <MicrosoftPasswordMockup onNext={() => setStage("permissions")} />
          )}
          {stage === "permissions" && (
            <MicrosoftPermissionsMockup onAllow={() => setStage("success")} onCancel={() => setStage("dashboard")} />
          )}
          {stage === "success" && (
            <ConnectedSuccessMockup />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── SMTP Fallback mockup ─────────────────────────────────────────────────────
function SmtpFallbackMockup() {
  const [form, setForm] = useState({
    smtpHost: "smtp.office365.com", port: "587", tls: true,
    username: "yourname@company.com", fromEmail: "yourname@company.com", password: "",
    imapServer: "outlook.office365.com", imapPort: "993",
  });
  const [showPw, setShowPw] = useState(false);

  return (
    <ScreenFrame title="360Airo — SMTP/IMAP for Microsoft 365" url="app.360airo.com/settings/email">
      <div className="bg-gray-50 p-5">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-bold text-gray-900">Configure Microsoft 365 via SMTP</p>
            <p className="text-xs text-gray-400">Use these settings if OAuth is not available for your account</p>
          </div>
          <div className="p-5 space-y-4">
            {/* SMTP */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-gray-800">SMTP Settings</span>
              </div>
              <div className="grid grid-cols-[1fr_100px] gap-3 mb-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">SMTP Host *</label>
                  <input value={form.smtpHost} onChange={e => setForm(p => ({...p, smtpHost: e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">Port *</label>
                  <input value={form.port} onChange={e => setForm(p => ({...p, port: e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 bg-white font-mono" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                <input type="checkbox" checked={form.tls} onChange={e => setForm(p => ({...p, tls: e.target.checked}))}
                  className="w-3.5 h-3.5 accent-blue-600" />
                Use TLS (recommended for port 587)
              </label>
            </div>
            {/* Auth */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-gray-800">Authentication</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Username *",   key: "username",  type: "email" },
                  { label: "From Email *", key: "fromEmail", type: "email" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[10px] font-bold text-gray-500 block mb-1">{f.label}</label>
                    <input type={f.type} value={form[f.key as keyof typeof form] as string}
                      onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200 bg-white" />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">Password *</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={form.password}
                      onChange={e => setForm(p => ({...p, password: e.target.value}))}
                      placeholder="Your Microsoft 365 password"
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 pr-8 outline-none focus:ring-2 focus:ring-emerald-200 bg-white" />
                    <button onClick={() => setShowPw(s => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* IMAP */}
            <div className="rounded-xl border border-violet-100 bg-violet-50/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-bold text-gray-800">Incoming Mail (IMAP)</span>
              </div>
              <div className="grid grid-cols-[1fr_90px] gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">IMAP Server *</label>
                  <input value={form.imapServer} onChange={e => setForm(p => ({...p, imapServer: e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200 bg-white font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">Port *</label>
                  <input value={form.imapPort} onChange={e => setForm(p => ({...p, imapPort: e.target.value}))}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200 bg-white font-mono" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 text-xs font-bold border border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Test Connection
              </button>
              <button className="flex-1 py-2.5 text-xs font-bold bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition shadow-md flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Microsoft365Page() {
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
        { rootMargin: "-20% 0px -70% 0px" }
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
                <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">Channel Support</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Microsoft 365</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-2xl">🪟</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Connect Microsoft 365</h1>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    A step-by-step guide to connecting your Microsoft 365 or Outlook.com account to 360Airo
                    using secure OAuth 2.0 — so your campaigns send directly from your business email address.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Overview */}
                <motion.div id="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    360Airo connects to Microsoft 365 and Outlook.com via <strong>OAuth 2.0</strong> — the same secure
                    authorisation standard used by major apps like Slack, Notion, and Salesforce. You sign in with
                    Microsoft, grant 360Airo permission to send on your behalf, and you're done. No passwords stored,
                    no SMTP credentials to manage.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: Shield,   bg: "bg-blue-50",    color: "text-blue-600",    border: "border-blue-200",   title: "OAuth 2.0 — secure",   desc: "360Airo never sees or stores your Microsoft password. You grant access directly through Microsoft's own sign-in page" },
                      { icon: Zap,      bg: "bg-violet-50",  color: "text-violet-600",  border: "border-violet-200", title: "2-minute setup",       desc: "The entire connection takes under 2 minutes — click Connect, sign in to Microsoft, click Accept, and you are ready" },
                      { icon: Building2,bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-200",title: "Works with",           desc: "Microsoft 365 Business, Office 365, Outlook.com personal accounts, and Exchange Online — all supported" },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
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
                      <strong>Microsoft 365 admin?</strong> If your organisation uses Microsoft 365 and has admin-controlled
                      OAuth consent policies, your IT admin may need to pre-approve 360Airo before individual users can connect.
                      See the <Link href="#troubleshooting" className="font-bold underline">Troubleshooting</Link> section for admin consent instructions.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Prerequisites */}
                <motion.div id="prerequisites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h2>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Before you begin, make sure the following are in place:
                  </p>
                  <div className="space-y-2 mb-5">
                    {[
                      { icon: CheckCircle2, color: "text-emerald-500", title: "An active Microsoft 365 account", desc: "Any paid Microsoft 365 plan (Business Basic, Business Standard, E3, etc.) or a personal Outlook.com account will work" },
                      { icon: CheckCircle2, color: "text-emerald-500", title: "SMTP AUTH enabled on your account", desc: "For Microsoft 365 Business accounts, SMTP AUTH must be enabled by your IT admin at the mailbox level before 360Airo can connect" },
                      { icon: CheckCircle2, color: "text-emerald-500", title: "A 360Airo account with Email Configuration access", desc: "You need access to the Email Configuration section of 360Airo. This is available on all plans" },
                      { icon: AlertCircle,  color: "text-amber-500",   title: "Admin consent may be required",   desc: "If your Microsoft 365 tenant has restricted third-party OAuth apps, your IT admin must approve 360Airo in the Microsoft Entra admin centre before you can connect" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + i * 0.06 }}
                          className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 transition bg-white">
                          <Icon className={`w-4 h-4 ${item.color} flex-shrink-0 mt-0.5`} />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Interactive walkthrough */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black bg-blue-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">Interactive</span>
                    <h2 className="text-xl font-bold text-gray-900">Full connection walkthrough</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Work through every step of the connection flow below. Click buttons in each screen to advance to the next stage, or use the numbered step indicators at the top to jump directly.
                  </p>
                  <InteractiveFlow />
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Step by step text guide */}
                {[
                  {
                    id: "step1-open-email-config",
                    num: 1,
                    color: "bg-blue-600",
                    title: "Open Email Configuration in 360Airo",
                    intro: "Log in to 360Airo and navigate to Settings → Email Configuration. This is where all your connected sending accounts are managed.",
                    bullets: [
                      ["Settings menu", "Click the Settings icon in the left sidebar of 360Airo, then select Email Configuration from the submenu"],
                      ["Email Accounts section", "The Email Configuration page shows all connected accounts, your daily sending limit, and current utilisation"],
                      ["+ Add Email Account button", "Click this blue gradient button in the top-right corner to open the account connection panel"],
                    ],
                  },
                  {
                    id: "step2-add-account",
                    num: 2,
                    color: "bg-violet-600",
                    title: "Add Email Account — choose Outlook",
                    intro: "The Add Email Account panel has three tabs — Gmail, Outlook, and SMTP/IMAP. Click the Outlook tab to see the Microsoft 365 connection option.",
                    bullets: [
                      ["Outlook tab", "Click Outlook in the tab row. You will see a brief description of the OAuth connection and a Continue with Microsoft button"],
                      ["No credentials needed", "Unlike SMTP setup, OAuth does not require you to enter your email password in 360Airo at any point"],
                      ["Continue with Microsoft", "Click this button — your browser will redirect to Microsoft's official sign-in page at login.microsoftonline.com"],
                    ],
                  },
                  {
                    id: "step3-select-outlook",
                    num: 3,
                    color: "bg-emerald-600",
                    title: "You are redirected to Microsoft",
                    intro: "Your browser opens Microsoft's authentication page. The URL will show login.microsoftonline.com — this confirms you are on a genuine Microsoft page, not a third-party site.",
                    bullets: [
                      ["Check the URL", "Always verify you are on login.microsoftonline.com before entering your Microsoft credentials — 360Airo never handles your password"],
                      ["Enter your email address", "Type your full Microsoft 365 or Outlook.com email address (e.g. yourname@company.com or yourname@outlook.com)"],
                      ["Click Next", "Microsoft will move to the password step"],
                    ],
                  },
                  {
                    id: "step4-microsoft-login",
                    num: 4,
                    color: "bg-orange-500",
                    title: "Enter your Microsoft password",
                    intro: "Microsoft asks for your account password. This is entered directly on Microsoft's servers — 360Airo receives no part of this interaction.",
                    bullets: [
                      ["Enter your password", "Type your regular Microsoft 365 or Outlook password and click Sign in"],
                      ["Multi-factor authentication", "If MFA is enabled on your account, Microsoft will prompt for your authenticator app code or SMS verification — complete it as usual"],
                      ["Stay signed in prompt", "Microsoft may ask 'Stay signed in?' — either option works for the 360Airo connection"],
                    ],
                  },
                  {
                    id: "step5-grant-permission",
                    num: 5,
                    color: "bg-teal-600",
                    title: "Review and grant permissions",
                    intro: "Microsoft shows a permissions consent screen listing exactly what 360Airo is requesting access to. Review the permissions, then click Accept.",
                    bullets: [
                      ["Send emails on your behalf", "This allows 360Airo to send campaign emails from your Microsoft address — the core permission required"],
                      ["Read email messages", "Used to detect replies from your prospects so 360Airo can update campaign status and stop follow-ups automatically on reply"],
                      ["Access profile information", "Fetches your display name and email address to label the account inside 360Airo"],
                      ["Maintain access offline", "Allows 360Airo to keep the connection active so scheduled campaigns continue even when you're not logged into 360Airo"],
                      ["Click Accept", "Accepting redirects you back to 360Airo — the connection is established instantly"],
                    ],
                  },
                  {
                    id: "step6-connected",
                    num: 6,
                    color: "bg-pink-600",
                    title: "Account connected — ready to send",
                    intro: "You are redirected back to 360Airo's Email Configuration page. Your Microsoft 365 account now appears in the Email Accounts list with an Active and Verified status.",
                    bullets: [
                      ["Active badge", "The green Active badge confirms 360Airo can send emails through this account immediately"],
                      ["Verified badge", "Microsoft's OAuth flow verifies your account ownership — no extra verification steps needed"],
                      ["OAuth 2.0 label", "The account shows 'OAuth 2.0' as the connection type — unlike SMTP accounts which show SMTP/IMAP"],
                      ["Enable Warm-up", "Click Connect Warm-up next to the new account to start building sender reputation before your first campaign"],
                      ["Use in campaigns", "When creating a campaign, select this account as your sender in the Review & Schedule step"],
                    ],
                  },
                ].map((step, i) => (
                  <motion.div key={step.id} id={step.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }} className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                      <StepBadge num={step.num} color={step.color} />
                      <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 ml-10 leading-relaxed">{step.intro}</p>
                    <ul className="space-y-2 ml-0">
                      {step.bullets.map(([title, desc], j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                          <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                        </li>
                      ))}
                    </ul>
                    {i < 5 && <div className="border-t border-gray-200 mt-8" />}
                  </motion.div>
                ))}

                <div className="border-t border-gray-200 my-8" />

                {/* SMTP Fallback */}
                <motion.div id="smtp-fallback" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">SMTP fallback method</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    If OAuth is not available for your Microsoft 365 plan or your admin has blocked third-party OAuth, you
                    can connect using SMTP/IMAP instead. Use the settings below. All fields in the mockup are interactive.
                  </p>

                  <div className="mb-5"><SmtpFallbackMockup /></div>

                  {/* SMTP reference table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Microsoft 365 SMTP / IMAP settings reference</p>
                    </div>
                    {[
                      ["SMTP Host",   "smtp.office365.com",       "Outgoing mail server for all Microsoft 365 accounts"],
                      ["SMTP Port",   "587",                       "Use 587 with TLS enabled (STARTTLS)"],
                      ["Use TLS",     "✓ Enabled",                 "Required — STARTTLS on port 587"],
                      ["Username",    "yourname@company.com",      "Your full Microsoft 365 email address"],
                      ["Password",    "Your M365 password",        "Must be your account password — App Passwords are not available in M365"],
                      ["IMAP Server", "outlook.office365.com",     "Incoming mail server for reply detection"],
                      ["IMAP Port",   "993",                       "Use 993 with TLS/SSL"],
                    ].map(([field, val, note], i) => (
                      <div key={field} className={`grid grid-cols-[140px_180px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{field}</span>
                        <span className="font-mono text-violet-700 font-bold">{val}</span>
                        <span className="text-gray-500">{note}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>SMTP AUTH must be enabled</strong> — by default, Microsoft 365 Business accounts have SMTP AUTH
                      disabled for security. Your IT admin must enable it at the mailbox level in the Microsoft 365 admin centre
                      before SMTP connections will work. See <Link href="#troubleshooting" className="font-bold underline">Troubleshooting</Link> below.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Troubleshooting */}
                <motion.div id="troubleshooting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      {
                        icon: Shield, color: "bg-blue-500",
                        problem: "Admin consent required — OAuth blocked",
                        solution: "Your Microsoft 365 tenant has restricted third-party app access. Your IT admin must go to Microsoft Entra admin centre → Enterprise applications → Consent and permissions → and either grant tenant-wide consent for 360Airo, or allow users to consent to apps.",
                      },
                      {
                        icon: Lock, color: "bg-orange-500",
                        problem: "SMTP AUTH disabled — connection fails",
                        solution: "Microsoft 365 Business plans disable SMTP AUTH by default. Your IT admin needs to enable it. In the Microsoft 365 admin centre → Users → Active users → select the mailbox → Mail → Manage email apps → enable Authenticated SMTP.",
                      },
                      {
                        icon: AlertCircle, color: "bg-red-500",
                        problem: "550 5.4.1 error — recipient not authorised",
                        solution: "This error means Microsoft is blocking outbound emails. Your domain likely needs SPF and DKIM records configured. Check that your sending domain has an SPF record including Microsoft's servers and that DKIM signing is enabled in Microsoft 365.",
                      },
                      {
                        icon: RefreshCw, color: "bg-violet-500",
                        problem: "Connection works but then stops",
                        solution: "OAuth tokens expire or get revoked when you change your Microsoft password or revoke app access. Go to 360Airo's Email Configuration, remove the account, and reconnect it through the OAuth flow again.",
                      },
                      {
                        icon: User, color: "bg-teal-500",
                        problem: "Wrong account connected",
                        solution: "If Microsoft signed you in with the wrong account, delete the account from 360Airo's Email Configuration page, then click + Add Email Account again. On the Microsoft sign-in page, click 'Use another account' to choose the correct email address.",
                      },
                      {
                        icon: MonitorSmartphone, color: "bg-pink-500",
                        problem: "MFA is blocking the connection",
                        solution: "Complete the MFA prompt on your phone or authenticator app when Microsoft asks during the OAuth flow. 360Airo only needs you to complete MFA once — after the OAuth token is issued, future campaign sends do not require MFA.",
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.32 + i * 0.05 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                          <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">Problem: {item.problem}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              <strong className="text-gray-700">Fix:</strong> {item.solution}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> For the best deliverability with Microsoft 365, use OAuth (not SMTP) and enable
                      360Airo's inbox warm-up on your new account. Also configure SPF, DKIM, and DMARC records on your sending
                      domain — this is the single biggest factor in whether your emails land in the inbox or spam.
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