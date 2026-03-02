"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Shield, Lock,
  CheckCircle2, AlertCircle, Info, Star, Key, Eye, EyeOff,
  ArrowRight, Copy, Search, Settings, User, Smartphone,
  ExternalLink, X, RefreshCw, Trash2, Plus,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-is-app-password",   label: "What is a Google App Password" },
  { id: "step1-open-gmail",       label: "Step 1 — Open Gmail & Account" },
  { id: "step2-security-settings",label: "Step 2 — Security & Sign-in" },
  { id: "step3-search-app-pw",    label: "Step 3 — Find App Passwords" },
  { id: "step4-verify-identity",  label: "Step 4 — Verify Your Identity" },
  { id: "step5-create-password",  label: "Step 5 — Create App Password" },
  { id: "step6-copy-use",         label: "Step 6 — Copy & Use in 360Airo" },
  { id: "troubleshooting",        label: "Troubleshooting" },
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
              placeholder="e.g. Why do I need an App Password?" />
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
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On this page</span>
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

// ─── Step wrapper ─────────────────────────────────────────────────────────────
function StepBadge({ num, color = "bg-blue-600" }: { num: number; color?: string }) {
  return (
    <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-[11px] font-black">{num}</span>
    </div>
  );
}

// ─── Screenshot mockup wrapper ────────────────────────────────────────────────
function ScreenFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-gray-500 font-medium ml-1">{label}</span>
      </div>
      {children}
    </div>
  );
}

// ─── Mockup 1 — Gmail scheduled / profile (Image 1) ──────────────────────────
function GmailProfileMockup() {
  const [profileOpen, setProfileOpen] = useState(true);
  return (
    <ScreenFrame label="mail.google.com — Scheduled">
      <div className="bg-white flex">
        {/* Sidebar */}
        <div className="w-36 bg-white border-r border-gray-100 py-3 flex-shrink-0 hidden sm:block">
          <div className="mx-2 mb-3">
            <div className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-2xl cursor-pointer">☰ Compose</div>
          </div>
          {["Snoozed","Sent","Drafts","Purchases","Important","Scheduled","All Mail","Spam","Trash"].map((item, i) => (
            <div key={item}
              className={`px-4 py-1.5 text-xs cursor-pointer flex items-center justify-between
              ${item === "Scheduled" ? "bg-blue-50 font-bold text-blue-700 rounded-r-full" : "text-gray-600 hover:bg-gray-50"}`}>
              <span>{item}</span>
              {item === "Spam" && <span className="text-xs text-gray-400">5</span>}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 relative">
          {/* Top search bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 bg-gray-50/60">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">in:scheduled</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer"
                onClick={() => setProfileOpen(p => !p)}>L</div>
            </div>
          </div>
          <div className="px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
            <span>📤</span> Messages in Scheduled will be sent at their scheduled time.
          </div>

          {/* Profile dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div initial={{ opacity:0,y:-8,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
                exit={{ opacity:0,y:-8,scale:0.97 }} transition={{ duration:0.15 }}
                className="absolute right-3 top-14 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="text-xs text-gray-500">youraccount@gmail.com</span>
                  <button onClick={() => setProfileOpen(false)}><X className="w-3.5 h-3.5 text-gray-400" /></button>
                </div>
                <div className="py-5 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white text-2xl font-bold mb-2 ring-2 ring-teal-200">L</div>
                  <p className="text-base font-bold text-gray-900">Hi, Lucy!</p>
                  <button className="mt-2 text-xs border border-gray-300 rounded-full px-4 py-1.5 text-gray-700 hover:bg-gray-50 transition">
                    Manage your Google Account
                  </button>
                </div>
                <div className="border-t border-gray-100 px-4 py-3">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Show more accounts</span>
                    <div className="flex gap-1">
                      {["🟠","🔵","🟢"].map((c,i) => <span key={i}>{c}</span>)}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 px-4 py-2 flex gap-3 text-[10px] text-gray-400 justify-center">
                  <span>Privacy Policy</span><span>·</span><span>Terms of Service</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-between">
        <span>0% of 15 GB used</span>
        <span>Last account activity: 2 days ago</span>
      </div>
    </ScreenFrame>
  );
}

// ─── Mockup 2 — Google Account Security (Image 2) ─────────────────────────────
function GoogleAccountSecurityMockup() {
  return (
    <ScreenFrame label="myaccount.google.com — Security">
      <div className="bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-44 bg-white border-r border-gray-100 py-4 flex-shrink-0 hidden sm:block">
          <div className="text-xs font-bold text-gray-800 px-4 mb-3">Google Account</div>
          {[
            { label:"Home",                  emoji:"🏠" },
            { label:"Personal info",         emoji:"👤" },
            { label:"Security & sign-in",    emoji:"🔒", active:true },
            { label:"Google password",       emoji:"🔑" },
            { label:"Third-party apps",      emoji:"⚙️" },
            { label:"Data & privacy",        emoji:"🔐" },
            { label:"People & sharing",      emoji:"👥" },
            { label:"Payments",              emoji:"💳" },
          ].map(item => (
            <div key={item.label}
              className={`flex items-center gap-2.5 px-4 py-2 text-xs cursor-pointer transition ${
                item.active ? "bg-blue-50 text-blue-700 font-semibold rounded-r-full" : "text-gray-600 hover:bg-gray-50"
              }`}>
              <span>{item.emoji}</span>{item.label}
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1 px-5 py-5 overflow-x-auto">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Recent security activity</h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 shadow-sm">
            {[
              { title:"New sign-in on Windows",  sub:"Feb 23 · Telangana, India" },
              { title:"App password created",    sub:"Feb 17 · Telangana, India", highlight:true },
              { title:"Review security activity",sub:"", link:true },
            ].map((item, i) => (
              <div key={i} className={`px-4 py-3 border-b border-gray-50 last:border-0 ${item.highlight ? "bg-blue-50/40" : ""}`}>
                <p className={`text-xs font-semibold ${item.link ? "text-blue-500" : "text-gray-800"} cursor-pointer hover:underline`}>
                  {item.title}
                </p>
                {item.sub && <p className="text-[10px] text-gray-400 mt-0.5">{item.sub}</p>}
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-gray-800 mb-1">How you sign in to Google</h3>
          <p className="text-[10px] text-gray-400 mb-3">Make sure you can always access your Google Account by keeping this information up to date</p>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-800">2-Step Verification</p>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" /> On since Nov 24, 2025
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-black text-sm w-5">•••</span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Password</p>
                  <p className="text-[10px] text-gray-400">Last changed Jan 27</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm w-5">↗</span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Skip password when possible</p>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full mt-0.5">
                    ✓ On
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Mockup 3 — Search App Passwords (Image 3) ───────────────────────────────
function SearchAppPasswordsMockup() {
  const [query, setQuery] = useState("app");
  const [focused, setFocused] = useState(true);
  return (
    <ScreenFrame label="myaccount.google.com — Search">
      <div className="bg-gray-50 flex min-h-[220px]">
        <div className="w-44 bg-white border-r border-gray-100 py-4 flex-shrink-0 hidden sm:block">
          {[
            { label:"Home",             emoji:"🏠" },
            { label:"Personal info",    emoji:"👤" },
            { label:"Security & sign-in",emoji:"🔒", active:true },
            { label:"Google password",  emoji:"🔑" },
            { label:"Third-party apps", emoji:"⚙️" },
            { label:"Data & privacy",   emoji:"🔐" },
            { label:"People & sharing", emoji:"👥" },
          ].map(item => (
            <div key={item.label}
              className={`flex items-center gap-2.5 px-4 py-2 text-xs cursor-pointer transition ${
                item.active ? "bg-blue-50 text-blue-700 font-semibold rounded-r-full border-l-2 border-blue-500" : "text-gray-600 hover:bg-gray-50"
              }`}>
              <span>{item.emoji}</span>{item.label}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 relative">
          {/* Search bar */}
          <div className="flex items-center gap-2 border-b-2 border-blue-500 bg-white rounded-t-xl px-3 py-2.5 shadow-sm mb-0">
            <Search className="w-4 h-4 text-gray-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)}
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent"
              placeholder="Search Google Account" />
            <button onClick={() => { setQuery(""); setFocused(false); }}><X className="w-4 h-4 text-gray-400" /></button>
          </div>
          {/* Dropdown */}
          <AnimatePresence>
            {focused && query && (
              <motion.div initial={{ opacity:0,y:-4 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                className="bg-white border border-gray-200 rounded-b-xl shadow-xl z-10 overflow-hidden">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider px-4 py-2 border-b border-gray-100">Google Account results</p>
                {[
                  { title:"Your connections to third-party apps & services", sub:"Security" },
                  { title:"App passwords", sub:"Security", highlight:true },
                  { title:"Web & App Activity", sub:"Data & privacy" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50 last:border-0 ${item.highlight ? "bg-blue-50/60" : ""}`}>
                    <div className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <Settings className="w-3 h-3 text-gray-400" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${item.highlight ? "text-blue-700" : "text-gray-800"}`}>{item.title}</p>
                      <p className="text-[9px] text-gray-400">{item.sub}</p>
                    </div>
                  </div>
                ))}
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider px-4 py-2 border-t border-gray-100">Help Center articles</p>
                {["Sign in with app passwords","Manage app info from your devices","Sign in with your phone number instead of a username"].map((article, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition">
                    <div className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-3 h-3 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-700">{article}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Mockup 4 — Verify Identity (Image 4) ─────────────────────────────────────
function VerifyIdentityMockup() {
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");
  const [showCheck, setShowCheck] = useState(false);
  return (
    <ScreenFrame label="accounts.google.com — Verify">
      <div className="bg-white px-8 py-8 min-h-[220px] grid sm:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">G</span>
            </div>
          </div>
          <h3 className="text-2xl font-normal text-gray-900 mb-3">Welcome</h3>
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-xs text-gray-600 w-fit">
            <User className="w-3.5 h-3.5 text-gray-400" />
            youraccount@gmail.com
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-700 mb-3">To continue, first verify it's you</p>
          <div className="relative mb-2">
            <label className="absolute -top-2 left-3 text-[10px] text-blue-600 bg-white px-1">Enter your password</label>
            <input type={showPw ? "text" : "password"} value={pw}
              onChange={e => { setPw(e.target.value); setShowCheck(e.target.value.length > 0); }}
              placeholder=""
              className="w-full border-2 border-blue-500 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-4 cursor-pointer">
            <input type="checkbox" className="w-3.5 h-3.5 accent-blue-600" />
            Show password
          </label>
          <div className="flex items-center justify-end gap-4">
            <button className="text-sm text-blue-600 hover:underline">Forgot password?</button>
            <button onClick={() => setShowCheck(true)}
              className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Mockup 5 — App Passwords page (Image 5) ─────────────────────────────────
function AppPasswordsMockup() {
  const [appName, setAppName] = useState("360Airo");
  const [passwords, setPasswords] = useState([
    { name:"airoblogs", created:"Feb 17", lastUsed:"Feb 17" }
  ]);
  const [created, setCreated] = useState(false);
  const [generatedPw] = useState("upvr xxxx xxxx xxxx");

  const handleCreate = () => {
    if (!appName.trim()) return;
    setCreated(true);
  };

  return (
    <ScreenFrame label="myaccount.google.com — App passwords">
      {!created ? (
        <div className="bg-white px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <button className="text-gray-500 hover:text-gray-700"><ArrowRight className="w-4 h-4 rotate-180" /></button>
            <h3 className="text-xl font-normal text-gray-800">App passwords</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-1 max-w-lg">
            App passwords help you sign into your Google Account on older apps and services that don't support modern security standards.
          </p>
          <p className="text-xs text-gray-600 leading-relaxed mb-1 max-w-lg">
            App passwords are less secure than using up-to-date apps and services that use modern security standards. Before you create an app password, you should check to see if your app needs this in order to sign in.
          </p>
          <button className="text-xs text-blue-600 hover:underline mb-4">Learn more</button>

          {/* Existing passwords */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4 max-w-lg">
            <p className="text-sm font-semibold text-gray-800 mb-3">Your app passwords</p>
            {passwords.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700">{p.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">Created on {p.created}, last used on {p.lastUsed}</span>
                  <button className="text-gray-400 hover:text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">To create a new app specific password, type a name for it below…</p>
              <div className="relative border-2 border-blue-400 rounded-lg px-3 pt-4 pb-2 bg-blue-50/30">
                <label className="absolute top-1.5 left-3 text-[9px] text-blue-600 font-semibold">App name</label>
                <input value={appName} onChange={e => setAppName(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none text-gray-800" />
              </div>
              <div className="flex justify-end mt-3">
                <button onClick={handleCreate}
                  className="text-sm text-blue-700 border border-blue-300 rounded-full px-5 py-1.5 hover:bg-blue-50 transition font-medium">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Generated password screen (Image 6)
        <div className="bg-white px-6 py-5">
          <h3 className="text-xl font-normal text-gray-800 mb-5">Generated app password</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="rounded-lg border border-gray-200 p-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Email</label>
                  <input defaultValue="youraccount@gmail.com" readOnly
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Password</label>
                  <input type="password" defaultValue="••••••••••••" readOnly
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 outline-none" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-700 mb-2">Your app password for your device</p>
              <div className="bg-yellow-300 rounded-lg px-4 py-3 text-lg font-mono font-bold text-gray-800 tracking-widest text-center mb-3 select-all cursor-pointer shadow-sm">
                {generatedPw}
              </div>
              <p className="text-xs font-bold text-gray-700 mb-1">How to use it</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Go to 360Airo's Email Configuration page and paste this 16-character password into the Password field
                when adding your Gmail SMTP account. This replaces your regular Gmail password.
              </p>
              <div className="flex justify-end">
                <button onClick={() => setCreated(false)}
                  className="text-sm text-blue-600 font-medium hover:underline">DONE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ScreenFrame>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GoogleAppPasswordPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-app-password");
  const [copiedPw, setCopiedPw]           = useState(false);

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

  const handleCopy = () => {
    setCopiedPw(true);
    setTimeout(() => setCopiedPw(false), 2000);
  };

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
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">Channel Support</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Google App Password</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Google App Password</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    A step-by-step guide to generating a Google App Password so you can connect your Gmail
                    account to 360Airo using SMTP — required when 2-Step Verification is enabled on your Google account.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* What is section */}
                <motion.div id="what-is-app-password" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    When you have <strong>2-Step Verification (2FA)</strong> enabled on your Google account — which Google
                    strongly recommends — you cannot use your regular Gmail password to connect apps like 360Airo via SMTP.
                    Instead, Google requires you to generate a special <strong>App Password</strong>: a 16-character code
                    that grants one specific app access to your account without exposing your main password.
                  </p>

                  {/* Why needed callout */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Shield,   bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"Required with 2FA",   desc:"If 2-Step Verification is on (and it should be), your main Google password will not work for SMTP connections" },
                      { icon:Key,      bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"16-character code",   desc:"App Passwords are 16 characters long, generated by Google. Use one in the Password field when adding Gmail in 360Airo" },
                      { icon:Lock,     bg:"bg-emerald-50", color:"text-emerald-600", border:"border-emerald-200", title:"One-time display",    desc:"Google shows the password once — copy it immediately and paste it into 360Airo. You cannot view it again after closing" },
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

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>App Password not visible in your Google Account?</strong> The App Passwords option only
                      appears when 2-Step Verification is turned on. If you don't see it, enable 2-Step Verification
                      first at <span className="font-mono">myaccount.google.com/security</span> — then come back to this guide.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Step 1 */}
                <motion.div id="step1-open-gmail" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.12 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-3">
                    <StepBadge num={1} />
                    <h2 className="text-xl font-bold text-gray-900">Open Gmail and click your profile</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Open <strong>Gmail</strong> in your browser. Click your profile avatar in the top-right corner
                    to open the account menu. Then click <strong>Manage your Google Account</strong> to go to your
                    account settings. The mockup below is interactive — click the avatar to open the dropdown.
                  </p>
                  <div className="mb-5 ml-0"><GmailProfileMockup /></div>
                  <ul className="space-y-2 ml-0">
                    {[
                      ["Open Gmail","Go to mail.google.com in any browser — make sure you are signed in with the email account you want to connect to 360Airo"],
                      ["Click your profile avatar","Your circular profile picture appears in the top-right corner of Gmail next to the Google apps grid icon"],
                      ["Click 'Manage your Google Account'","This takes you to myaccount.google.com — the central settings page for your Google account"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Step 2 */}
                <motion.div id="step2-security-settings" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.14 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-3">
                    <StepBadge num={2} color="bg-violet-600" />
                    <h2 className="text-xl font-bold text-gray-900">Go to Security & sign-in</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    In your Google Account, click <strong>Security & sign-in</strong> in the left sidebar.
                    Confirm that <strong>2-Step Verification</strong> shows as On — this is required before
                    App Passwords will appear.
                  </p>
                  <div className="mb-5"><GoogleAccountSecurityMockup /></div>
                  <ul className="space-y-2">
                    {[
                      ["Security & sign-in","Click this in the left sidebar of your Google Account — it's the lock icon with the blue background"],
                      ["2-Step Verification must be On","Look for '2-Step Verification' under 'How you sign in to Google'. It must show a green 'On' badge. If it shows Off, enable it before continuing"],
                      ["App password created","If you have created app passwords before, you'll see 'App password created' in your Recent security activity — this is normal and expected"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Step 3 */}
                <motion.div id="step3-search-app-pw" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.16 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-3">
                    <StepBadge num={3} color="bg-emerald-600" />
                    <h2 className="text-xl font-bold text-gray-900">Search for "App Passwords"</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Use the <strong>Search Google Account</strong> bar at the top of myaccount.google.com.
                    Type <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-violet-700">app</code> and
                    click <strong>App passwords</strong> from the Security section in the dropdown results.
                    The search bar in the mockup below is interactive.
                  </p>
                  <div className="mb-5"><SearchAppPasswordsMockup /></div>
                  <ul className="space-y-2">
                    {[
                      ["Search bar shortcut","Typing 'app' in the Google Account search bar is the fastest way to find App Passwords — faster than navigating the Security page manually"],
                      ["Click 'App passwords'","Select the result under Security in the dropdown — NOT 'Your connections to third-party apps & services' which is a different page"],
                      ["Alternative navigation","You can also scroll down on the Security & sign-in page and look for 'App passwords' under the 'How you sign in' section"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Step 4 */}
                <motion.div id="step4-verify-identity" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.18 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-3">
                    <StepBadge num={4} color="bg-orange-500" />
                    <h2 className="text-xl font-bold text-gray-900">Verify your identity</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Google will ask you to re-enter your password before showing App Passwords — this is a
                    security check. Enter your regular Gmail password and click <strong>Next</strong>.
                    The mockup below is interactive — try typing in the password field.
                  </p>
                  <div className="mb-5"><VerifyIdentityMockup /></div>
                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      Use your regular Gmail password here — not an App Password. This is just Google verifying
                      it's really you before granting access to sensitive account settings.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Step 5 */}
                <motion.div id="step5-create-password" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-3">
                    <StepBadge num={5} color="bg-teal-600" />
                    <h2 className="text-xl font-bold text-gray-900">Create the App Password</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    On the App passwords page, type a name for your new password in the <strong>App name</strong> field
                    — for example <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-violet-700">360Airo</code>.
                    Then click <strong>Create</strong>. The mockup below is interactive — type a name and click Create to see the generated password screen.
                  </p>
                  <div className="mb-5"><AppPasswordsMockup /></div>
                  <ul className="space-y-2">
                    {[
                      ["App name field","Type any name you like — '360Airo' or 'Airo SMTP' works perfectly. The name is just for your reference so you can identify it later"],
                      ["Click Create","Google generates a unique 16-character App Password and displays it once. Have 360Airo's email configuration open in another tab so you can paste it immediately"],
                      ["Generated password format","The password appears as 4 groups of 4 characters separated by spaces, displayed in a yellow box — e.g. xxxx xxxx xxxx xxxx. Copy the entire string"],
                      ["Cannot view it again","Once you close this screen, the App Password is gone permanently. If you lose it, just delete the old one and create a new one"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Step 6 */}
                <motion.div id="step6-copy-use" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.22 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-3">
                    <StepBadge num={6} color="bg-pink-600" />
                    <h2 className="text-xl font-bold text-gray-900">Copy & paste into 360Airo</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Copy the generated 16-character App Password from Google, then go to 360Airo's
                    <strong> Email Configuration</strong> page. Click <strong>+ Add Email Account</strong>,
                    select SMTP/IMAP, and paste the App Password into the <strong>Password</strong> field.
                  </p>

                  {/* Where to paste guide */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">SMTP settings to use with Gmail + App Password</p>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {[
                        ["SMTP Host",     "smtp.gmail.com",                  "text-gray-800"],
                        ["Port",          "465 (TLS) or 587 (SSL)",          "text-gray-800"],
                        ["Username",      "youremail@gmail.com",             "text-blue-600"],
                        ["From Email",    "youremail@gmail.com",             "text-blue-600"],
                        ["Password",      "Paste your 16-character App Password here", "text-violet-700 font-bold"],
                        ["Use TLS",       "✓ Enabled",                       "text-emerald-600"],
                        ["IMAP Server",   "imap.gmail.com",                  "text-gray-800"],
                        ["IMAP Port",     "993",                             "text-gray-800"],
                      ].map(([field, val, cls]) => (
                        <div key={field} className="grid grid-cols-[140px_1fr] px-4 py-2.5 text-xs">
                          <span className="text-gray-500 font-medium">{field}</span>
                          <span className={`font-mono ${cls}`}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Copy widget */}
                  <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-wider mb-1">Your App Password goes here</p>
                      <p className="text-sm font-mono text-yellow-900 tracking-widest">xxxx xxxx xxxx xxxx</p>
                    </div>
                    <button onClick={handleCopy}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                        copiedPw ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                      }`}>
                      {copiedPw ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>

                  <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>After pasting:</strong> Click <strong>Test Connection</strong> in 360Airo's Add Email Account
                      panel. A green checkmark means the connection is working. Click <strong>Save Configuration</strong> to finalise.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Troubleshooting */}
                <motion.div id="troubleshooting" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
                  <div className="space-y-3">
                    {[
                      {
                        icon:AlertCircle, color:"bg-red-500",
                        problem:"App passwords option is not showing",
                        solution:"2-Step Verification is not enabled. Go to myaccount.google.com/security, scroll to '2-Step Verification', and turn it on. After enabling, the App passwords option will appear."
                      },
                      {
                        icon:X, color:"bg-orange-500",
                        problem:"Connection test fails in 360Airo",
                        solution:"Double-check that you pasted the App Password correctly (all 16 characters, no extra spaces). Also verify your SMTP Host is smtp.gmail.com, Port is 465, and Use TLS is enabled."
                      },
                      {
                        icon:Lock, color:"bg-violet-500",
                        problem:"'Invalid credentials' error",
                        solution:"Delete the old App Password in your Google Account, create a new one, and paste the new code into 360Airo. App Passwords sometimes expire or get revoked if account security settings change."
                      },
                      {
                        icon:Shield, color:"bg-blue-500",
                        problem:"Google blocked the sign-in attempt",
                        solution:"If Google sends you a 'suspicious sign-in blocked' email, that's normal — just make sure you're using an App Password (not your main password) in 360Airo and try the connection test again."
                      },
                      {
                        icon:RefreshCw, color:"bg-teal-500",
                        problem:"Lost or forgot the App Password",
                        solution:"You cannot recover a lost App Password — but that's fine. Go to App passwords in your Google Account, delete the old entry, and create a new one. Then update the password in 360Airo's Email Configuration."
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                          transition={{ delay:0.25+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-sm transition">
                          <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">Problem: {item.problem}</p>
                            <p className="text-sm text-gray-500 leading-relaxed"><strong className="text-gray-700">Fix:</strong> {item.solution}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> Create one App Password named "360Airo" and keep it dedicated to this
                      connection. If you ever need to revoke 360Airo's access, just delete that single App Password
                      in Google — your main password and other apps are unaffected.
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