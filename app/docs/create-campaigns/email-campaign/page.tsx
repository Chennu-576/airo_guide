"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, Sparkles,
  Users, Target, ArrowRight, ArrowLeft, CheckCircle2, Info, Zap,
  BarChart2, Settings, Eye, Play, AlertCircle, Star, Check,
  Megaphone, FlaskConical, Globe, PlusCircle, ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "step1-campaign-details",  label: "Step 1 — Campaign Details" },
  { id: "step2-choose-approach",   label: "Step 2 — Choose Your Approach" },
  { id: "step3-configure-ai",      label: "Step 3 — Configure AI Assistant" },
  { id: "campaign-preview",        label: "Campaign Preview panel" },
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
              placeholder="e.g. How do I create an email campaign?" />
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
                }`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBadge({ step, total, label }: { step: number; total: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs text-gray-500 font-medium">Step {step} of {total}</span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all ${i < step ? "bg-blue-600 w-6" : "bg-gray-200 w-4"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Step 1 Mockup ─────────────────────────────────────────────────────────────
function Step1Mockup() {
  const [name, setName] = useState("My Airo Campaign");
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      {/* Browser chrome */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">360Airo — Create New Campaign</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-5">
        <StepBadge step={1} total={3} label="Campaign Details" />
        <h3 className="text-xl font-black text-gray-900 mb-0.5">Create New Campaign</h3>
        <p className="text-sm text-gray-500 mb-5">Set up your campaign name and choose which audience to target</p>

        <div className="grid lg:grid-cols-[1fr_280px] gap-4">
          {/* Left form */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-900">Campaign Details</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Enter your campaign information and select your target audience</p>

            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Campaign Name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                className="w-full text-sm border border-blue-200 bg-blue-50 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
                placeholder="e.g. Q1 SaaS Outreach" />
              <p className="text-[10px] text-gray-400 mt-1">Choose a descriptive name that helps you identify this campaign later</p>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Target Audience</label>
              <p className="text-[10px] text-gray-400 mb-2">Select which email list to send this campaign to</p>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 bg-white cursor-pointer hover:border-blue-300 transition">
                <div>
                  <p className="text-xs font-semibold text-gray-800">My Prospect List</p>
                  <p className="text-[10px] text-gray-400">No description</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Users className="w-3 h-3" /> 5 contacts
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <button className="text-sm text-gray-400 hover:text-gray-600 transition">Clear Form</button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-md">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4 h-fit">
            <div>
              <p className="text-sm font-bold text-gray-900 mb-3">Campaign Preview</p>
              <p className="text-[10px] text-gray-400 mb-3">Review your campaign setup</p>
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-3">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Campaign Name</p>
                <p className="text-xs font-semibold text-gray-800">{name || "—"}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Target Audience</p>
                <p className="text-xs font-semibold text-gray-800">My Prospect List</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[9px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  <Users className="w-2.5 h-2.5" /> 5 contacts
                </span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-2">Progress</p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-600">Step 1 of 3</span>
                <span className="text-[10px] font-bold text-blue-600">33%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width:"33%" }} />
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-2">Next Steps</p>
              <div className="space-y-1.5">
                {[{ n:2, label:"Choose Your Approach" },{ n:3, label:"Review & Launch" }].map(s => (
                  <div key={s.n} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-[8px] text-white font-bold">{s.n}</span>
                    </div>
                    <span className="text-[10px] text-gray-600">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-2">Credits</p>
              {[["Manual Campaigns (Monthly)","0/100","100 messages remaining"],["AI-Personalized (Daily)","0/50","50 messages remaining"]].map(([label,val,sub]) => (
                <div key={label} className="mb-2">
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[9px] text-gray-600">{label}</span>
                    <span className="text-[9px] font-bold text-gray-700">{val}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-0.5">
                    <div className="h-full bg-blue-400 rounded-full w-0" />
                  </div>
                  <p className="text-[9px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 Mockup ─────────────────────────────────────────────────────────────
function Step2Mockup() {
  const [selected, setSelected] = useState<"standard"|"ai">("ai");
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">360Airo — Choose Your Approach</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-5">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 mb-4 transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Setup
        </button>
        <StepBadge step={2} total={3} label="Choose Approach" />
        <h3 className="text-xl font-black text-gray-900 mb-0.5">Choose Your Approach</h3>
        <p className="text-sm text-gray-500 mb-1">How would you like to create content for your campaign?</p>
        <p className="text-xs text-gray-400 mb-5">Select between standard content creation or AI-powered personalisation</p>

        {/* Campaign tag */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs mb-5 flex-wrap">
          <span className="text-blue-600 font-semibold">📊 Campaign: My Airo Campaign</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">👤 List: My Prospect List</span>
        </div>

        {/* Choice cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          {/* Standard */}
          <div onClick={() => setSelected("standard")}
            className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${selected === "standard" ? "border-gray-400 bg-white shadow-md" : "border-gray-200 bg-white hover:border-gray-300"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Mail className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Standard Content</p>
                <p className="text-[10px] text-gray-400">Single template for all recipients</p>
              </div>
            </div>
            <ul className="space-y-1.5 mb-3">
              {["Quick and easy setup","Consistent messaging","Perfect for announcements","Full content control"].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 rounded-lg px-3 py-2 text-[10px] text-gray-500 mb-3">
              📝 Next: Create email content template
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Best For:</p>
              <p className="text-[10px] text-gray-600">Newsletters, product launches, event invitations</p>
            </div>
            {selected === "standard" && (
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-600 font-semibold">
                <Check className="w-3.5 h-3.5 text-gray-600" /> Selected
              </div>
            )}
          </div>

          {/* AI */}
          <div onClick={() => setSelected("ai")}
            className={`rounded-xl border-2 p-4 cursor-pointer transition-all relative ${selected === "ai" ? "border-violet-500 bg-violet-50 shadow-md" : "border-gray-200 bg-white hover:border-violet-300"}`}>
            <div className="absolute -top-2.5 right-3">
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                AI Powered
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">AI Personalisation</p>
                <p className="text-[10px] text-gray-400">Tailored emails for each recipient</p>
              </div>
            </div>
            <ul className="space-y-1.5 mb-3">
              {["Personalized subject lines","Higher engagement rates","Smart content recommendations","Automated A/B testing"].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className="bg-violet-100 rounded-lg px-3 py-2 text-[10px] text-violet-700 mb-3">
              🤖 Next: Configure AI Assistant
            </div>
            <div className="mb-2">
              <p className="text-[9px] font-black text-violet-500 uppercase tracking-wider mb-1">Best For:</p>
              <p className="text-[10px] text-violet-700 font-medium">Sales outreach, customer retention, recommendations</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-gray-500">
              <span>🎯 Better targeting</span>
              <span>📈 Higher ROI</span>
            </div>
            {selected === "ai" && (
              <div className="mt-3 flex items-center gap-1 text-xs text-violet-600 font-semibold">
                <Check className="w-3.5 h-3.5" /> Selected
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 transition shadow-md">
            {selected === "ai" ? "Configure AI Assistant" : "Create Email Template"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 Mockup ─────────────────────────────────────────────────────────────
function Step3Mockup() {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">360Airo — Configure AI Assistant</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-5">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 mb-4 transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Choose Approach
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">Configure AI Assistant</h3>
            <p className="text-xs text-gray-500">Set up AI personalisation for your campaign</p>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 grid grid-cols-3 gap-3 shadow-sm">
          {[
            { icon:"🎯", label:"Campaign", value:"My Airo Campaign" },
            { icon:"📊", label:"Email List", value:"My Prospect List · 5 contacts" },
            { icon:"⚙️", label:"AI Status", value:"Pending Setup", badge:true },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{item.icon}</span>
              <div>
                <p className="text-[9px] text-gray-400 font-medium">{item.label}</p>
                {item.badge
                  ? <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md">⏳ {item.value}</span>
                  : <p className="text-[10px] font-semibold text-gray-800">{item.value}</p>
                }
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_240px] gap-4">
          {/* Left config */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">AI Assistant Configuration</span>
            </div>
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-4 shadow-inner relative">
                <Bot className="w-8 h-8 text-violet-500" />
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1.5">Let's Configure Your AI Assistant</p>
              <p className="text-xs text-gray-500 leading-relaxed mb-5 max-w-xs">
                Our AI will ask strategic questions to create highly personalised email content for your 5 contacts.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full mb-5">
                {[
                  { icon:Target, label:"Smart Targeting", desc:"Audience-specific messaging" },
                  { icon:Sparkles, label:"AI Personalisation", desc:"Unique content per contact", active:true },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={`rounded-xl border p-3 text-center ${item.active ? "border-violet-200 bg-violet-50" : "border-gray-200 bg-gray-50"}`}>
                      <Icon className={`w-5 h-5 mx-auto mb-1.5 ${item.active ? "text-violet-500" : "text-gray-400"}`} />
                      <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                      <p className="text-[10px] text-gray-400">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
              <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-md">
                🤖 Start AI Configuration <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right AI panel */}
          <div className="rounded-xl bg-gradient-to-b from-violet-600 to-blue-700 p-4 text-white shadow-md h-fit">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span className="text-sm font-bold">AI Personalisation</span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 mb-3">
              <p className="text-[10px] font-bold text-violet-200 mb-2">✉️ For Each Contact:</p>
              {["Personalized subject line","Tailored email content","Relevant pain points","Custom call-to-action"].map(f => (
                <div key={f} className="flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-3 h-3 text-green-300 flex-shrink-0" />
                  <span className="text-[10px] text-white/90">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/10 rounded-xl p-3 mb-3">
              <p className="text-[10px] font-bold text-violet-200 mb-2">⚙️ Using Your Configuration:</p>
              {["Business information","Product/service details","Target audience insights","Communication preferences"].map(f => (
                <div key={f} className="flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-3 h-3 text-green-300 flex-shrink-0" />
                  <span className="text-[10px] text-white/90">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-[10px] font-bold text-violet-200 mb-1">→ Next Steps</p>
              <p className="text-[10px] text-white/80">Answer AI questions → Review generated content → Launch campaign</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmailCampaignPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("step1-campaign-details");

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const observers: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
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
                  <span className="text-gray-700 font-medium">Email Campaign</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Email Campaign</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to create a professional email campaign in 360Airo — from naming your
                    campaign and selecting your audience, to choosing between standard content or
                    AI-powered personalisation, and launching to your prospects.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Intro + overview */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    Creating an email campaign in 360Airo is a simple 3-step process. You set up your
                    campaign details, choose how you want to create your content (manually or with AI),
                    configure your approach, and launch to your selected audience.
                  </p>

                  {/* 3-step overview */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { step:"01", icon:Target,   color:"text-blue-600",   bg:"bg-blue-50",   border:"border-blue-200",   title:"Campaign Details",    desc:"Name your campaign and select your target audience list" },
                      { step:"02", icon:Sparkles,  color:"text-violet-600", bg:"bg-violet-50", border:"border-violet-200", title:"Choose Approach",      desc:"Pick Standard Content or AI Personalisation for your emails" },
                      { step:"03", icon:Bot,       color:"text-teal-600",   bg:"bg-teal-50",   border:"border-teal-200",   title:"Configure & Launch",  desc:"Set up your AI assistant or template, then review and launch" },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.div key={s.step} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.1+i*0.07 }}
                          className={`rounded-xl border ${s.border} ${s.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black text-gray-400 tracking-widest">{s.step}</span>
                            <Icon className={`w-4 h-4 ${s.color}`} />
                          </div>
                          <p className={`text-sm font-bold ${s.color} mb-1`}>{s.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{s.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── STEP 1 ── */}
                <motion.div id="step1-campaign-details" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Step 1 — Campaign Details</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-8">
                    Set up your campaign name and choose which audience to target. This is where every email campaign begins.
                  </p>

                  <div className="mb-5"><Step1Mockup /></div>

                  <ul className="space-y-2">
                    {[
                      ["Campaign Name","Give your campaign a clear, descriptive name so you can easily identify it later — e.g. \"Q1 SaaS Cold Outreach\" or \"Enterprise Follow-Up May\""],
                      ["Target Audience","Select the prospect list you want to send this campaign to. Your lists are managed in the Prospects section"],
                      ["Contact count","The number of contacts in your selected list is shown next to the list name — e.g. 5 contacts"],
                      ["Clear Form","Use this to reset the form fields if you need to start over before proceeding"],
                      ["Next →","Click Next to proceed to Step 2 — Choose Your Approach"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── STEP 2 ── */}
                <motion.div id="step2-choose-approach" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">2</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Step 2 — Choose Your Approach</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-8">
                    Decide how you want to create your email content — a single template for everyone, or AI-personalised emails for each contact.
                  </p>

                  <div className="mb-5"><Step2Mockup /></div>

                  {/* Comparison table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Feature</div>
                      <div className="px-4 py-2.5 text-center border-x border-gray-200">Standard Content</div>
                      <div className="px-4 py-2.5 text-center text-violet-600">AI Personalisation</div>
                    </div>
                    {[
                      ["Setup time",          "Minutes",     "Guided by AI"],
                      ["Content per contact", "Same for all","Unique per person"],
                      ["Subject lines",       "Manual",      "AI-generated"],
                      ["A/B Testing",         "Manual",      "Automated"],
                      ["Best for",            "Announcements","Sales outreach"],
                      ["Credits used",        "Manual quota", "AI quota"],
                    ].map(([feat, std, ai], i) => (
                      <div key={feat} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="px-4 py-2.5 font-medium text-gray-700">{feat}</div>
                        <div className="px-4 py-2.5 text-center text-gray-500 border-x border-gray-100">{std}</div>
                        <div className="px-4 py-2.5 text-center text-violet-600 font-semibold">{ai}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {[
                      ["Standard Content","Best for newsletters, announcements, and product launches where one message fits all recipients"],
                      ["AI Personalisation","Best for cold sales outreach, customer retention, and upsell campaigns — 360Airo's AI writes unique emails for each contact"],
                      ["AI POWERED badge","This badge on the AI option signals that 360Airo's AI engine handles content generation for you"],
                      ["Next step shown","Each option shows you exactly what happens next — so you always know where you're going"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── STEP 3 ── */}
                <motion.div id="step3-configure-ai" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">3</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Step 3 — Configure AI Assistant</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-8">
                    If you selected AI Personalisation, 360Airo's AI Assistant will guide you through a series of strategic questions to generate unique, highly personalised emails for every contact in your list.
                  </p>

                  <div className="mb-5"><Step3Mockup /></div>

                  {/* AI personalisation detail cards */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:Mail,     bg:"bg-blue-50",   color:"text-blue-600",   title:"Personalised Subject Lines", desc:"The AI generates a unique subject line for each contact based on their company, role, and likely pain points" },
                      { icon:Target,   bg:"bg-violet-50", color:"text-violet-600", title:"Tailored Email Content",     desc:"Each email body is written specifically for that recipient — referencing their industry, company size, or role" },
                      { icon:Zap,      bg:"bg-orange-50", color:"text-orange-600", title:"Relevant Pain Points",       desc:"The AI identifies and references challenges that are relevant to each individual contact's situation" },
                      { icon:Sparkles, bg:"bg-teal-50",   color:"text-teal-600",   title:"Custom Call-to-Action",     desc:"Each email ends with a personalised CTA tailored to what is most likely to resonate with that contact" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.25+i*0.05 }}
                          className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition">
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

                  <ul className="space-y-2">
                    {[
                      ["AI Status: Pending Setup","This badge means the AI hasn't been configured yet — click Start AI Configuration to begin"],
                      ["Business information","The AI will ask about your product or service so it can reference it naturally in each email"],
                      ["Target audience insights","Tell the AI who your ideal customer is so it tailors the tone and content accordingly"],
                      ["Communication preferences","Set your preferred tone — professional, conversational, or direct — and the AI will match it"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Campaign Preview ── */}
                <motion.div id="campaign-preview" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Campaign Preview panel</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Throughout the campaign creation process, the right-hand <strong>Campaign Preview</strong> panel keeps you informed of your progress and remaining steps.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon:Eye,       bg:"bg-blue-50",   color:"text-blue-600",   title:"Campaign Name",   desc:"Live preview of your campaign name as you type it" },
                      { icon:Users,     bg:"bg-violet-50", color:"text-violet-600", title:"Target Audience",  desc:"Shows selected list name and contact count at a glance" },
                      { icon:BarChart2, bg:"bg-emerald-50",color:"text-emerald-600",title:"Progress Bar",     desc:"Step indicator with percentage (33% → 66% → 100%) as you advance" },
                      { icon:ArrowRight,bg:"bg-orange-50", color:"text-orange-600", title:"Next Steps",       desc:"Shows upcoming steps so you always know what's coming next" },
                      { icon:Zap,       bg:"bg-teal-50",   color:"text-teal-600",   title:"Credits",         desc:"Displays your Manual and AI-Personalized monthly/daily credit usage" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.3+i*0.05 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition">
                          <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Footer */}
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