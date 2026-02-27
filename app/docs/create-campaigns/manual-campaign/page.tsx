"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, Sparkles,
  Users, Target, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, Info, Zap,
  BarChart2, Settings, Eye, Star, Check, Building2, Bold, Italic,
  Code, List, AlignLeft, Upload, Globe, Link2, Save, Play,
  Calendar, Shield, Type, FileText, PlusCircle, Timer, Send,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",             label: "What is a Manual Campaign" },
  { id: "step1-choose-approach",label: "Step 1 — Choose Your Approach" },
  { id: "step2-create-content", label: "Step 2 — Create Email Content" },
  { id: "step3-schedule-launch",label: "Step 3 — Review & Schedule Launch" },
  { id: "template-options",     label: "Template & import options" },
  { id: "variables",            label: "Using personalisation variables" },
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
              placeholder="e.g. How do I add a follow-up email?" />
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

// ─── Browser Chrome wrapper ───────────────────────────────────────────────────
function BrowserFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
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

// ─── Step 1 — Choose Approach ─────────────────────────────────────────────────
function ChooseApproachMockup() {
  const [selected, setSelected] = useState<"standard"|"ai">("standard");
  return (
    <BrowserFrame title="360Airo — Choose Your Approach">
      <div className="bg-gray-50 px-6 py-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-gray-900 mb-1">Choose Your Approach</h3>
          <p className="text-sm text-gray-500 mb-0.5">How would you like to create content for your campaign?</p>
          <p className="text-xs text-gray-400">Select between standard content creation or AI-powered personalisation</p>
        </div>

        {/* Campaign tag */}
        <div className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-xs mb-6 max-w-md mx-auto">
          <span className="text-blue-600 font-semibold">📊 Campaign: My Airo Campaign</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">👤 List: My Prospect List</span>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
          {/* Standard — selected */}
          <div onClick={() => setSelected("standard")}
            className={`rounded-xl border-2 p-5 cursor-pointer transition-all ${
              selected === "standard"
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selected==="standard"?"bg-blue-100":"bg-gray-100"}`}>
                <Mail className={`w-4.5 h-4.5 ${selected==="standard"?"text-blue-600":"text-gray-500"}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Standard Content</p>
                <p className="text-[10px] text-gray-400">Single template for all recipients</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {["Quick and easy setup","Consistent messaging","Perfect for announcements","Full content control"].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className={`rounded-lg px-3 py-2 text-[10px] mb-3 ${selected==="standard"?"bg-blue-100 text-blue-700":"bg-gray-100 text-gray-500"}`}>
              📝 Next: Create email content template
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Best For:</p>
              <p className="text-[10px] text-gray-600">Newsletters, product launches, event invitations</p>
            </div>
            {selected === "standard" && (
              <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-bold">
                <Check className="w-3.5 h-3.5" /> Selected
              </div>
            )}
          </div>

          {/* AI Personalisation */}
          <div onClick={() => setSelected("ai")}
            className={`relative rounded-xl border-2 p-5 cursor-pointer transition-all ${
              selected === "ai"
                ? "border-violet-500 bg-violet-50 shadow-md"
                : "border-gray-200 bg-white hover:border-violet-300"
            }`}>
            <div className="absolute -top-3 right-3">
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                AI POWERED
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">AI Personalisation</p>
                <p className="text-[10px] text-gray-400">Tailored emails for each recipient</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {["Personalized subject lines","Higher engagement rates","Smart content recommendations","Automated A/B testing"].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className={`rounded-lg px-3 py-2 text-[10px] mb-3 ${selected==="ai"?"bg-violet-100 text-violet-700":"bg-gray-100 text-gray-500"}`}>
              🤖 Next: Configure AI Assistant
            </div>
            <div className="mb-2">
              <p className="text-[9px] font-black text-violet-500 uppercase tracking-wider mb-1">Best For:</p>
              <p className="text-[10px] text-violet-700 font-medium">Sales outreach, customer retention, recommendations</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-gray-500">
              <span>🎯 Better targeting</span>
              <span>📈 Higher ROI</span>
            </div>
            {selected === "ai" && (
              <div className="mt-3 flex items-center gap-1 text-xs text-violet-600 font-bold">
                <Check className="w-3.5 h-3.5" /> Selected
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold px-8 py-3 rounded-xl hover:opacity-90 transition shadow-md">
            {selected === "standard" ? "Create Content →" : "Configure AI Assistant →"}
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Step 2 — Create Email Content ────────────────────────────────────────────
function CreateContentMockup() {
  const [subject, setSubject] = useState("Welcome to 360Airo! 👋");
  const [preheader, setPreheader] = useState("");
  const [bodyMode, setBodyMode] = useState<"plain"|"html">("plain");
  const [emailBody, setEmailBody] = useState(
`Hi {{first_name}},

Welcome to 360Airo — we're thrilled to have you on board!

Here's what you can expect:
• Quick Setup - Get started with multichannel outreach in minutes
• AI Content - Let our AI write personalised emails for every contact
• Built-in LeadFinder - Find and verify new prospects without leaving the platform
• 24/7 Support - Comprehensive guides and our team are here to help

Ready to launch your first campaign? Head to your Campaign Dashboard and click "Create Campaign".

Best regards,
The 360Airo Team
{{company_name}}`
  );

  return (
    <BrowserFrame title="360Airo — Create Your Email Content">
      {/* Top nav bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition">
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="text-blue-600 font-semibold">Step 2 of 3</span>
          <span className="text-gray-300">|</span>
          <span>Campaign Content</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 italic">My Airo Campaign</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-[10px] font-bold text-blue-600">100%</span>
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
            <Save className="w-3 h-3" /> Save
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
            Continue <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-5">
        <h3 className="text-lg font-black text-gray-900 text-center mb-4">Create Your Email Content</h3>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {[
            { icon:FileText, label:"Template Library" },
            { icon:Upload,   label:"Upload Template" },
            { icon:Globe,    label:"Import from URL" },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button key={item.label} className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
                <Icon className="w-3 h-3" /> {item.label}
              </button>
            );
          })}
          <button className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:opacity-90 transition">
            <Sparkles className="w-3 h-3" /> AI Assistant
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
            <Mail className="w-3 h-3 text-blue-500" /> 2 Emails
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
            <Timer className="w-3 h-3 text-orange-500" /> ~2 min read
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
            <Type className="w-3 h-3 text-violet-500" /> 96 words
          </span>
        </div>

        {/* Email Tracking Settings (collapsed) */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Email Tracking Settings</p>
              <p className="text-xs text-gray-400">Configure analytics and tracking options</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Email #1 editor */}
        <div className="bg-white border-2 border-blue-200 rounded-xl overflow-hidden shadow-sm">
          {/* Email header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-black">1</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">Email #1</span>
                  <span className="text-xs text-blue-600 font-semibold">(Initial)</span>
                </div>
                <p className="text-[10px] text-gray-400">Sent immediately</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Complete
              </span>
              <span className="text-[10px] text-gray-400 flex items-center gap-1"><Type className="w-3 h-3" /> 46 words</span>
              <span className="text-[10px] text-gray-400 flex items-center gap-1"><Timer className="w-3 h-3" /> 1 min</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Subject Line */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <label className="text-xs font-semibold text-gray-700">Subject Line</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="w-5 h-5 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><Bold className="w-3 h-3 text-gray-500" /></button>
                  <button className="w-5 h-5 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><Italic className="w-3 h-3 text-gray-500" /></button>
                  <button className="flex items-center gap-1 border border-gray-200 rounded px-1.5 py-0.5 text-[9px] text-gray-500 hover:bg-gray-50">
                    <Code className="w-3 h-3" /> Variables
                  </button>
                </div>
              </div>
              <input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full text-sm border-2 border-blue-200 bg-blue-50 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
              />
            </div>

            {/* Preheader */}
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Preheader Text <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input
                value={preheader}
                onChange={e => setPreheader(e.target.value)}
                placeholder="Preview text that appears after subject line..."
                className="w-full text-sm border border-gray-200 bg-white rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 text-gray-600 placeholder-gray-300"
              />
              <p className="text-[9px] text-gray-400 mt-1">This text appears in email previews. Keep it under 90 characters.</p>
            </div>

            {/* Email Content */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <AlignLeft className="w-3.5 h-3.5 text-gray-400" />
                  <label className="text-xs font-semibold text-gray-700">Email Content</label>
                </div>
                <div className="flex">
                  <button onClick={() => setBodyMode("plain")}
                    className={`text-[10px] font-semibold px-3 py-1 rounded-l-lg border transition ${bodyMode==="plain"?"bg-gray-900 text-white border-gray-900":"bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                    Plain Text
                  </button>
                  <button onClick={() => setBodyMode("html")}
                    className={`text-[10px] font-semibold px-3 py-1 rounded-r-lg border-t border-r border-b transition ${bodyMode==="html"?"bg-gray-900 text-white border-gray-900":"bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                    HTML
                  </button>
                </div>
              </div>
              {/* Formatting toolbar */}
              <div className="flex items-center gap-1.5 border border-gray-200 bg-gray-50 rounded-t-xl px-3 py-2">
                {[Bold, Italic, Code, List].map((Icon, i) => (
                  <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition">
                    <Icon className="w-3 h-3 text-gray-500" />
                  </button>
                ))}
              </div>
              <textarea
                rows={8}
                value={emailBody}
                onChange={e => setEmailBody(e.target.value)}
                className="w-full border border-t-0 border-gray-200 rounded-b-xl px-3 py-2.5 text-xs font-mono text-gray-700 bg-white outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Add follow-up */}
        <button className="mt-3 w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-3 text-xs text-gray-400 hover:border-blue-300 hover:text-blue-500 transition">
          <PlusCircle className="w-4 h-4" /> Add Follow-up Email
        </button>
      </div>
    </BrowserFrame>
  );
}

// ─── Step 3 — Review & Schedule ───────────────────────────────────────────────
function ReviewScheduleMockup() {
  const [scheduleMode, setScheduleMode] = useState<"basic"|"smart">("basic");
  const [startDate, setStartDate] = useState("2026-02-28");
  const [startTime, setStartTime] = useState("09:00");
  const [pause, setPause] = useState("5");

  const recipients = 5;
  const pauseNum = parseInt(pause) || 5;
  const totalMinutes = recipients * pauseNum;
  const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

  return (
    <BrowserFrame title="360Airo — Review & Schedule Campaign">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition">
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <div className="text-xs text-gray-500">
          <span className="text-blue-600 font-semibold">Step 3 of 3</span>
          <span className="text-gray-300 mx-2">|</span>
          <span>Schedule & Launch</span>
        </div>
      </div>

      <div className="bg-gray-50 p-5">
        <h3 className="text-lg font-black text-gray-900 mb-0.5">Review & Schedule Campaign</h3>
        <p className="text-sm text-gray-500 mb-4">Configure your campaign delivery settings and choose which email account to send from.</p>

        {/* Summary bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3 shadow-sm">
          {[
            { icon:"✉️", iconBg:"bg-blue-100",   label:"Campaign",       val:"My Airo Campaign" },
            { icon:"📋", iconBg:"bg-green-100",  label:"Email Sequence", val:"2 steps" },
            { icon:"👥", iconBg:"bg-orange-100", label:"Recipients",     val:`${recipients}` },
            { icon:"📅", iconBg:"bg-violet-100", label:"Launch Date",    val:`${startDate.replace(/-/g,"/")} at ${startTime}` },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 text-base`}>
                {item.icon}
              </div>
              <div>
                <p className="text-[9px] text-gray-400 font-medium">{item.label}</p>
                <p className="text-xs font-bold text-gray-800 leading-tight">{item.val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-4">
          {/* Email Sender */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">Email Sender</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">Choose which email account to send from</p>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Settings className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">Campaign Configuration</span>
              </div>
              <div className="mb-2">
                <p className="text-[10px] text-gray-500 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Email Account
                </p>
                <div className="flex items-center justify-between border border-gray-200 bg-white rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center">
                      <Mail className="w-2.5 h-2.5 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-700">myaccount@360airo.com</span>
                    <span className="text-[9px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">active</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <p className="text-[9px] text-gray-400 mt-1">Default Name • smtp/imap • Limit: 100/day</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span className="text-[10px] font-bold text-green-700">Selected Sender</span>
              </div>
              <p className="text-[10px] text-green-700">Emails will be sent from: <strong>myaccount@360airo.com</strong></p>
              <p className="text-[9px] text-green-600 mt-0.5">via SMTP/IMAP • active status</p>
              <p className="text-[9px] text-green-600">Daily capacity: 100 remaining</p>
            </div>
          </div>

          {/* Right column — Schedule + Delivery */}
          <div className="space-y-3">
            {/* Scheduler Mode */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-gray-900">Scheduler Mode</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">Choose scheduling mode</p>
              <div className="grid grid-cols-2 rounded-xl overflow-hidden border border-gray-200">
                <button onClick={() => setScheduleMode("basic")}
                  className={`py-2 text-xs font-bold transition ${scheduleMode==="basic"?"bg-gray-900 text-white":"bg-white text-gray-500 hover:bg-gray-50"}`}>
                  Basic
                </button>
                <button onClick={() => setScheduleMode("smart")}
                  className={`py-2 text-xs font-bold transition ${scheduleMode==="smart"?"bg-gray-900 text-white":"bg-white text-gray-500 hover:bg-gray-50"}`}>
                  Smart Scheduler
                </button>
              </div>
              <p className="text-[9px] text-gray-400 mt-2">
                {scheduleMode==="basic" ? "Manual execution workflow with custom timing" : "AI automatically optimises send times per contact timezone"}
              </p>
            </div>

            {/* Campaign Start */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-gray-900">Campaign Start</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[10px] text-gray-500 font-semibold block mb-1">Start Date</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-semibold block mb-1">Start Time</label>
                  <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-1">Timezone</label>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-2.5 py-2">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Globe className="w-3 h-3 text-gray-400" />
                    UTC (Coordinated Universal Time)
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Email Delivery */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-gray-900">Email Delivery</span>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-1 flex items-center gap-1">
                  <Timer className="w-3 h-3" /> Pause Between Emails (minutes)
                </label>
                <input type="number" value={pause} min={1} max={60}
                  onChange={e => setPause(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200 mb-1.5" />
                <p className="text-[9px] text-gray-400 mb-2.5">Time to wait between sending each individual email. Recommended: 5–10 minutes.</p>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-600 mb-1">Delivery Summary:</p>
                  {[
                    `${pause}-minute gap between each email`,
                    `Total time: ~${totalHours} hours for ${recipients} recipients`,
                    `Daily capacity check: ${recipients} recipients vs 100 remaining`,
                  ].map((line, i) => (
                    <p key={i} className="text-[10px] text-gray-500 flex items-start gap-1.5">
                      <span className="text-gray-400 mt-0.5">•</span>{line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-4">
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Editor
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition shadow-md">
            <Send className="w-4 h-4" /> Launch Campaign
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ManualCampaignPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("overview");

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
                  <span className="text-gray-700 font-medium">Manual Campaign</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manual Campaign</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to create a standard manual email campaign in 360Airo — write your own
                    email content, set a delivery schedule, choose your sender account, and launch to your audience.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Overview */}
                <motion.div id="overview" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    A <strong>Manual Campaign</strong> in 360Airo lets you write your own email content — a single template
                    sent to all recipients in your chosen audience list. This is the fastest way to send announcements,
                    newsletters, event invites, or product launches where one consistent message works for everyone.
                  </p>

                  {/* 3-step overview */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { num:"1", color:"bg-blue-600",   border:"border-blue-200",   bg:"bg-blue-50",   title:"Choose Approach",      desc:"Select Standard Content to write your own email template" },
                      { num:"2", color:"bg-violet-600", border:"border-violet-200", bg:"bg-violet-50", title:"Create Email Content",  desc:"Write subject line, preheader, and body. Add follow-up emails as needed" },
                      { num:"3", color:"bg-emerald-600",border:"border-emerald-200",bg:"bg-emerald-50",title:"Schedule & Launch",     desc:"Choose sender, set date/time, configure pacing, and launch" },
                    ].map((s, i) => (
                      <motion.div key={s.num} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                        transition={{ delay:0.1+i*0.07 }}
                        className={`rounded-xl border ${s.border} ${s.bg} p-4`}>
                        <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center mb-2`}>
                          <span className="text-white text-[10px] font-black">{s.num}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">{s.title}</p>
                        <p className="text-xs text-gray-600 leading-snug">{s.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Standard vs AI comparison */}
                  <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-600">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <span>
                      <strong className="text-gray-800">Manual vs AI Campaign:</strong> Manual campaigns use one email template for all recipients — fast to set up and ideal for broadcasts.
                      AI campaigns write a unique personalised email for every contact.
                      See <Link href="#" className="text-blue-600 hover:underline">AI Email Campaign</Link> if you need personalisation at scale.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 1 */}
                <motion.div id="step1-choose-approach" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Step 1 — Choose Your Approach</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    After naming your campaign and selecting your audience, 360Airo asks how you want to create your email content.
                    For a manual campaign, select <strong>Standard Content</strong>.
                  </p>

                  <div className="mb-5"><ChooseApproachMockup /></div>

                  {/* Comparison table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Feature</div>
                      <div className="px-4 py-2.5 text-center border-x border-gray-200 text-blue-600">Standard Content ✓</div>
                      <div className="px-4 py-2.5 text-center text-violet-500">AI Personalisation</div>
                    </div>
                    {[
                      ["Setup time",           "Minutes",          "Guided AI chat"],
                      ["Content per recipient","Same for all",     "Unique per person"],
                      ["Writing required",     "Yes — you write",  "AI writes for you"],
                      ["Best for",             "Announcements",    "Sales outreach"],
                      ["Credit type",          "Manual quota",     "AI quota"],
                    ].map(([feat, std, ai], i) => (
                      <div key={feat} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="px-4 py-2.5 font-medium text-gray-700">{feat}</div>
                        <div className="px-4 py-2.5 text-center text-blue-700 font-semibold border-x border-gray-100">{std}</div>
                        <div className="px-4 py-2.5 text-center text-gray-400">{ai}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {[
                      ["Standard Content","Click to select — this option lets you write one email template that goes to all recipients"],
                      ["AI Personalisation","The alternative — 360Airo's AI writes a unique email for every contact (see AI Email Campaign guide)"],
                      ["Next step shown","The 'Next: Create email content template' link inside the card tells you exactly what happens after you click Create Content →"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 2 */}
                <motion.div id="step2-create-content" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">2</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Step 2 — Create Email Content</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    Write your email here — subject line, optional preheader text, and the email body. You can add multiple
                    follow-up emails to create a sequence. All fields in the mockup below are fully interactive — try editing them.
                  </p>

                  <div className="mb-5"><CreateContentMockup /></div>

                  {/* Content options */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:FileText, bg:"bg-blue-50",   color:"text-blue-600",   title:"Template Library",   desc:"Choose from pre-built email templates — welcome emails, follow-ups, announcements, and more" },
                      { icon:Upload,   bg:"bg-violet-50", color:"text-violet-600", title:"Upload Template",    desc:"Import an existing HTML email template from your local files" },
                      { icon:Globe,    bg:"bg-emerald-50",color:"text-emerald-600",title:"Import from URL",    desc:"Pull in email content from a URL — useful for importing landing page copy" },
                      { icon:Sparkles, bg:"bg-orange-50", color:"text-orange-600", title:"AI Assistant",       desc:"Let 360Airo's AI write a draft for you — edit it to match your voice before sending" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.2+i*0.05 }}
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

                  <ul className="space-y-2">
                    {[
                      ["Subject Line","Write a compelling subject line — this is what your recipients see first in their inbox. Bold and Italic formatting and Variables are supported"],
                      ["Preheader Text","Optional — the preview text shown after the subject line in most email clients. Keep it under 90 characters for best display"],
                      ["Plain Text vs HTML","Toggle between writing in plain text (simple, high deliverability) or HTML (rich formatting, images)"],
                      ["Email Tracking Settings","Expand this section to configure open tracking, click tracking, and unsubscribe link settings"],
                      ["Add Follow-up Email","Click the '+' button to add a second or third email to create a multi-touch sequence within the same campaign"],
                      ["Word count & read time","360Airo shows live word count and estimated read time as you write — aim for 60–120 words for cold outreach"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 3 */}
                <motion.div id="step3-schedule-launch" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">3</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Step 3 — Review & Schedule Launch</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    The final step before your campaign goes live. Select your sender email account,
                    set your start date and time, configure your email pacing, and click Launch Campaign.
                    All fields in the mockup below are interactive — try changing the date, time, and pause minutes.
                  </p>

                  <div className="mb-5"><ReviewScheduleMockup /></div>

                  {/* Settings cards */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:Mail,     bg:"bg-blue-50",   color:"text-blue-600",   title:"Email Sender",       desc:"Choose which connected email account sends the campaign. Only active, verified accounts appear here" },
                      { icon:Timer,    bg:"bg-orange-50", color:"text-orange-600", title:"Scheduler Mode",     desc:"Basic: send at a set time. Smart Scheduler: 360Airo auto-picks the best time for each recipient" },
                      { icon:Calendar, bg:"bg-violet-50", color:"text-violet-600", title:"Campaign Start",     desc:"Set exact start date, time, and timezone. Leave date blank to send immediately" },
                      { icon:Shield,   bg:"bg-emerald-50",color:"text-emerald-600",title:"Email Delivery",    desc:"Pause between emails (minutes) controls sending pace — 5–10 minutes protects your sender reputation" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.25+i*0.05 }}
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

                  <ul className="space-y-2">
                    {[
                      ["Sender account","Select any active email account connected to your 360Airo workspace — SMTP/IMAP accounts are recommended"],
                      ["Basic vs Smart Scheduler","Basic mode gives you full control over send time. Smart Scheduler uses AI to optimise timing for each recipient's timezone and past engagement"],
                      ["Start Date & Time","Schedule the campaign to go out at a specific date and time, or leave it blank to begin sending immediately after launching"],
                      ["Pause Between Emails","Setting a gap of 5–10 minutes between each email makes your campaign look human-like and reduces spam risk"],
                      ["Delivery Summary","The calculated estimate shows total send time and daily capacity check — useful for planning large sends across multiple days"],
                      ["Launch Campaign","Click this once everything looks right — 360Airo queues your emails and begins sending at the scheduled time"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Template options */}
                <motion.div id="template-options" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Template & import options</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    360Airo gives you four ways to create your email content. You can mix and match — start with an AI draft,
                    then edit it manually for your preferred tone.
                  </p>
                  <div className="space-y-3">
                    {[
                      { step:"01", icon:FileText, color:"text-blue-600",   bg:"bg-blue-50",   title:"Template Library",  desc:"Browse and insert a pre-built email template. Templates are organised by use case — cold outreach, follow-up, announcement, and more. You can customise every element after inserting." },
                      { step:"02", icon:Upload,   color:"text-violet-600", bg:"bg-violet-50", title:"Upload Template",   desc:"Upload an HTML file from your computer. Useful if you have a branded email template designed by your team or a designer." },
                      { step:"03", icon:Globe,    color:"text-emerald-600",bg:"bg-emerald-50",title:"Import from URL",   desc:"Paste a URL and 360Airo will import the page content as your email body. Good for importing content from your website or blog posts." },
                      { step:"04", icon:Sparkles, color:"text-orange-600", bg:"bg-orange-50", title:"AI Assistant",      desc:"Click AI Assistant and describe what you want to say — 360Airo will write a first draft of your email content. Edit it to match your voice, then save and continue." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.step} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                          transition={{ delay:0.3+i*0.05 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[9px] font-black text-gray-400 tracking-widest">{item.step}</span>
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

                {/* Variables */}
                <motion.div id="variables" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Using personalisation variables</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Even in a standard campaign, you can add personalisation by using merge variables in your subject line
                    or email body. 360Airo automatically replaces these with each contact's actual data before sending.
                  </p>

                  {/* Variables table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Variable</div>
                      <div className="px-4 py-2.5 border-x border-gray-200">Replaced with</div>
                      <div className="px-4 py-2.5">Example output</div>
                    </div>
                    {[
                      ["{{first_name}}",    "Contact's first name",         "James"],
                      ["{{last_name}}",     "Contact's last name",          "Anderson"],
                      ["{{company_name}}", "Contact's company",             "TechCorp"],
                      ["{{job_title}}",     "Contact's job title",          "Head of Sales"],
                      ["{{email}}",         "Contact's email address",      "james@techcorp.io"],
                      ["{{location}}",      "Contact's city / country",     "New York, US"],
                    ].map(([variable, desc, example], i) => (
                      <div key={variable} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div className="px-4 py-2.5">
                          <code className="text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded font-mono text-[10px]">{variable}</code>
                        </div>
                        <div className="px-4 py-2.5 text-gray-500 border-x border-gray-100">{desc}</div>
                        <div className="px-4 py-2.5 text-gray-700 font-medium">{example}</div>
                      </div>
                    ))}
                  </div>

                  {/* Example */}
                  <div className="bg-gray-900 rounded-xl p-4 mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Example subject line:</p>
                    <p className="text-sm text-green-400 font-mono">{"Quick question for you, {{first_name}} at {{company_name}}"}</p>
                    <p className="text-[10px] text-gray-500 mt-2">→ Sent as: <span className="text-gray-300">"Quick question for you, James at TechCorp"</span></p>
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Note:</strong> Variables only work if the corresponding field is filled in for each contact.
                      If a contact has no first name on file, 360Airo will use your fallback value or leave the field blank.
                      Always check your prospect data before sending.
                    </span>
                  </div>
                </motion.div>

                {/* Pro tip */}
                <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700 mb-6">
                  <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                  <span>
                    <strong>Pro tip:</strong> For cold outreach, keep your initial email under 120 words, use a single
                    clear CTA, and set your pause between emails to at least 5 minutes. Add a follow-up email 3–5 days
                    later to significantly increase your reply rate without any extra effort.
                  </span>
                </div>

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