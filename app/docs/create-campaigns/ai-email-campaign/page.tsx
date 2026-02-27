"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, Sparkles,
  Users, Target, ArrowRight, ArrowLeft, CheckCircle2, Info, Zap,
  BarChart2, Settings, Eye, AlertCircle, Star, Check, Building2,
  MessageSquare, Megaphone, Award, TrendingUp, RefreshCw, Send,
  Calendar, Shield, ChevronUp, PlusCircle, X, Edit3,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",             label: "What is AI Email Campaign" },
  { id: "step1-configure-ai",   label: "Step 1 — Configure AI Assistant" },
  { id: "step2-ai-chat",        label: "Step 2 — AI Strategist Chat" },
  { id: "step3-config-complete",label: "Step 3 — Configuration Complete" },
  { id: "step4-select-contacts",label: "Step 4 — Select Target Contacts" },
  { id: "step5-generate-emails",label: "Step 5 — Generate Email Pitches" },
  { id: "step6-validate-send",  label: "Step 6 — Validate & Send Campaign" },
];

// ─── AI config fields that user fills in ─────────────────────────────────────
const AI_CONFIG_FIELDS = [
  {
    icon: Building2,
    iconBg: "bg-blue-500",
    id: "company",
    label: "Company Overview",
    placeholder: "Describe your company — what you do, your industry, size, and what makes you unique. e.g. 360Airo is an AI-powered multichannel outreach platform helping sales teams automate LinkedIn, email, and calling sequences from one dashboard.",
    rows: 3,
  },
  {
    icon: Award,
    iconBg: "bg-violet-500",
    id: "product",
    label: "Products or Services to Promote",
    placeholder: "What specific product, service, or offer do you want to promote in this campaign? e.g. Our flagship product — multichannel outreach automation with AI content generation, inbox warmup, and built-in LeadFinder.",
    rows: 3,
  },
  {
    icon: Target,
    iconBg: "bg-emerald-500",
    id: "audience",
    label: "Target Audience",
    placeholder: "Who are you trying to reach? Include job titles, industries, and company sizes. e.g. Head of Sales, VP of Marketing, Founders at B2B SaaS companies with 10–200 employees.",
    rows: 3,
  },
  {
    icon: AlertCircle,
    iconBg: "bg-orange-500",
    id: "painpoints",
    label: "Key Pain Points",
    placeholder: "What challenges does your audience face that your product solves? e.g. Sales teams waste hours juggling multiple outreach tools, miss follow-ups, and struggle to personalise messages at scale.",
    rows: 3,
  },
  {
    icon: MessageSquare,
    iconBg: "bg-pink-500",
    id: "tone",
    label: "Tone and Style of Communication",
    placeholder: "How should the AI write? e.g. Professional but conversational. Direct and confident. No fluff. Short sentences. Avoid jargon. Sound like a real person, not a sales robot.",
    rows: 2,
  },
  {
    icon: Megaphone,
    iconBg: "bg-teal-500",
    id: "cta",
    label: "Primary Call-to-Action",
    placeholder: "What action should the email ask the reader to take? e.g. Book a free 20-minute demo to see 360Airo in action — or reply if they'd like a quick walkthrough.",
    rows: 2,
  },
  {
    icon: TrendingUp,
    iconBg: "bg-indigo-500",
    id: "uvp",
    label: "Unique Value Proposition",
    placeholder: "What makes your offer different from competitors? e.g. Unlike Apollo or Lemlist, 360Airo combines LinkedIn automation, cold email, calling, AND AI content generation in a single platform — no extra tools needed.",
    rows: 3,
  },
];

// ─── Mock AI chat messages ────────────────────────────────────────────────────
const AI_CHAT = [
  {
    from: "ai",
    text: "Hello! I'm excited to help you configure your email campaign. To start, could you provide some details about your company or business? Specifically, what industry are you in, and what are some key aspects of your business that you'd like to highlight?",
  },
  {
    from: "user",
    text: "360Airo is an AI-powered multichannel outreach platform for B2B sales teams. We help companies automate LinkedIn messages, cold emails, and calling sequences from a single dashboard. We combine AI-driven content generation with inbox warmup and a built-in LeadFinder tool.\nIndustry: SaaS, Sales Automation, AI Tools",
  },
];

// ─── Config complete cards ─────────────────────────────────────────────────────
const CONFIG_CARDS = [
  { icon: Building2, color: "text-blue-600",   label: "Company Info",    text: "360Airo is an AI-powered multichannel outreach platform helping B2B sales teams automate LinkedIn, email, and calling from one dashboard..." },
  { icon: Award,     color: "text-violet-600", label: "Product/Service", text: "Our flagship product — multichannel outreach automation with AI content generation, inbox warmup, and built-in LeadFinder tool..." },
  { icon: Target,    color: "text-emerald-600",label: "Target Audience", text: "Head of Sales, VP of Marketing, and Founders at B2B SaaS or services companies with 10–200 employees seeking outreach efficiency..." },
  { icon: AlertCircle,color:"text-orange-600",  label: "Pain Points",    text: "Sales teams waste hours juggling multiple outreach tools, miss follow-ups, and struggle to personalise messages at scale across channels..." },
];

// ─── Contacts table ───────────────────────────────────────────────────────────
const CONTACTS = [
  { initials:"DW", color:"bg-violet-500", name:"David Wilson",    email:"david.wilson@apexapartments.com",    company:"Apex Apartment Communities", title:"Regional Manager",          location:"Denver CO",       phone:"(303) 555-0321" },
  { initials:"EJ", color:"bg-teal-500",   name:"Emily Johnson",   email:"emily@beachfrontvacations.com",      company:"Beachfront Vacation Rentals", title:"Operations Director",       location:"Miami Beach FL",  phone:"(305) 555-0789" },
  { initials:"LG", color:"bg-pink-500",   name:"Lisa Garcia",     email:"lisa.garcia@communityfirsthoa.com",  company:"Community First HOA Mgmt",   title:"HOA Manager",               location:"Phoenix AZ",      phone:"(602) 555-0654" },
  { initials:"MR", color:"bg-blue-500",   name:"Mike Rodriguez",  email:"mike.rodriguez@metrocommercial.com", company:"Metro Commercial Properties", title:"Commercial Portfolio Mgr",  location:"Chicago IL",      phone:"(312) 555-0456" },
  { initials:"SC", color:"bg-emerald-500",name:"Sarah Chen",      email:"sarah.chen@premierestatespm.com",    company:"Premier Estates Property Mgmt",title:"Senior Property Manager",  location:"Austin TX",       phone:"(512) 555-0123" },
];

// ─── Generated email pitch ────────────────────────────────────────────────────
const GENERATED_PITCH = {
  subject: "Boost Outreach Efficiency at Apex with AI-Powered Automation",
  body: `Hi David,

I noticed that as Regional Manager at Apex Apartment Communities, you're likely managing outreach across multiple channels while keeping your team lean and efficient.

360Airo combines LinkedIn automation, cold email, and calling sequences in one platform — so your team can run personalised, multi-touch outreach without juggling multiple tools or missing follow-ups.

Our AI generates unique emails for each contact, while built-in inbox warmup protects your sender reputation and LeadFinder helps you find verified prospects without leaving the platform.

Would you be open to a quick 20-minute demo to see how 360Airo could work for your team at Apex?`,
};

// ─── Ask AI widget ────────────────────────────────────────────────────────────
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
              placeholder="e.g. How does AI generate my emails?" />
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

// ─── Step Header ──────────────────────────────────────────────────────────────
function SectionStep({ num, color, title, desc }: { num: string; color: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
        <span className="text-white text-[11px] font-black">{num}</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
    </div>
  );
}

// ─── Interactive AI Config Form ───────────────────────────────────────────────
function AIConfigForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<string>("company");
  const filledCount = Object.values(values).filter(v => v.trim()).length;
  const total = AI_CONFIG_FIELDS.length;

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      {/* Browser chrome */}
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

      <div className="bg-gray-50 px-5 py-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900">Configure AI Assistant</h3>
            <p className="text-xs text-gray-500">Set up AI personalisation for your campaign</p>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4 grid grid-cols-3 gap-3 shadow-sm">
          {[
            { emoji:"🎯", label:"Campaign",   val:"My Airo Campaign" },
            { emoji:"📊", label:"Email List", val:"My Prospect List · 5 contacts" },
            { emoji:"⚙️", label:"AI Status",  val:"Pending Setup", badge:true },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{item.emoji}</span>
              <div>
                <p className="text-[9px] text-gray-400 font-medium">{item.label}</p>
                {item.badge
                  ? <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md">⏳ {item.val}</span>
                  : <p className="text-[10px] font-semibold text-gray-800">{item.val}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">{filledCount} of {total} fields completed</span>
          <span className="text-xs font-bold text-violet-600">{Math.round((filledCount/total)*100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width:`${Math.max((filledCount/total)*100, 3)}%` }} />
        </div>

        {/* Accordion fields */}
        <div className="space-y-2 mb-4">
          {AI_CONFIG_FIELDS.map((field) => {
            const Icon = field.icon;
            const isOpen = expanded === field.id;
            const hasValue = !!(values[field.id]?.trim());
            return (
              <div key={field.id}
                className={`rounded-xl border transition-all ${isOpen ? "border-violet-300 shadow-sm" : "border-gray-200"} bg-white overflow-hidden`}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  onClick={() => setExpanded(isOpen ? "" : field.id)}>
                  <div className={`w-7 h-7 rounded-lg ${field.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 flex-1">{field.label}</span>
                  {hasValue && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                      exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }}>
                      <div className="px-4 pb-3">
                        <textarea
                          rows={field.rows}
                          value={values[field.id] || ""}
                          onChange={e => setValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 resize-none text-gray-700 placeholder-gray-300 bg-gray-50"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Fill all fields for best AI personalisation results</p>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-md">
            <Bot className="w-4 h-4" /> Start AI Configuration <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AI Chat Mockup ───────────────────────────────────────────────────────────
function AIChatMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">360Airo — AI Email Strategist</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      {/* Chat header */}
      <div className="bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">AI Email Strategist</p>
              <p className="text-[10px] text-violet-200">Creating 5 personalised emails</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white font-bold">25%</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <X className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-violet-200 font-medium bg-white/20 px-2 py-0.5 rounded-full">Step 2 of 8</span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width:"25%" }} />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-gray-50 p-4 space-y-3 max-h-72 overflow-y-auto">
        {AI_CHAT.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.from === "ai" ? "bg-violet-100" : "bg-gray-200"
            }`}>
              {msg.from === "ai"
                ? <Bot className="w-3.5 h-3.5 text-violet-600" />
                : <Users className="w-3.5 h-3.5 text-gray-500" />
              }
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
              msg.from === "ai"
                ? "bg-white border border-gray-200 text-gray-700 shadow-sm"
                : "bg-gradient-to-br from-violet-600 to-blue-600 text-white"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        <div className="flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
            <Bot className="w-3.5 h-3.5 text-violet-600" />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay:`${i*150}ms` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Chat input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-2">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-400">
          Type your answer here…
        </div>
        <button className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
      <div className="bg-white px-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
          <Sparkles className="w-3 h-3 text-violet-400" /> AI Configuration
        </div>
        <div className="flex gap-1.5">
          {Array.from({length:8}).map((_,i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 2 ? "bg-violet-500" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Config Complete Mockup ───────────────────────────────────────────────────
function ConfigCompleteMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">360Airo — Configuration Complete</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
            <Bot className="w-4 h-4 text-violet-600" />
          </div>
          <span className="text-sm font-bold text-gray-800">AI Assistant Configuration</span>
        </div>

        {/* Complete status */}
        <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-sm font-bold text-gray-900">Configuration Complete</span>
          </div>
          <span className="ml-auto text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✓ Ready for Contact Selection</span>
          <span className="text-[10px] text-gray-400">2/27/2026</span>
        </div>

        {/* Config cards */}
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {CONFIG_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${card.color}`} />
                  <span className="text-xs font-bold text-gray-800">{card.label}</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-3">{card.text}</p>
                <button className="text-[10px] text-violet-600 font-semibold mt-1.5 hover:underline">Read more</button>
              </div>
            );
          })}
        </div>

        {/* Config settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-bold text-gray-800">Configuration Settings</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-[10px] border border-violet-200 text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full font-medium">Tone: Professional & Friendly</span>
            <span className="text-[10px] border border-blue-200 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full font-medium">Email Style: Balanced</span>
          </div>
          <div className="bg-blue-50 rounded-lg px-3 py-2 text-[10px] text-blue-700 mb-2 leading-relaxed">
            CTA: Book a Free 20-Min Demo to see 360Airo in action. Schedule a Consultation to understand how automation can fit your workflow. Or reply with questions.
          </div>
          <div>
            <p className="text-[9px] text-gray-400 mb-0.5">Value Proposition:</p>
            <p className="text-[10px] text-gray-600">360Airo replaces 5+ tools with one platform — LinkedIn, email, calling, AI content generation, inbox warmup, and LeadFinder all in one...</p>
            <button className="text-[10px] text-violet-600 font-semibold hover:underline">Read more</button>
          </div>
        </div>

        {/* Next Steps + Action buttons */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
              <RefreshCw className="w-3.5 h-3.5" /> Reconfigure
            </button>
            <button className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
              <Eye className="w-3.5 h-3.5" /> View Full Details
            </button>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition shadow-md">
            <Users className="w-4 h-4" /> Select Target Contacts <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Contacts Table Mockup ────────────────────────────────────────────────────
function ContactsTableMockup() {
  const [selected, setSelected] = useState<number[]>([0,1,2,3,4]);
  const toggle = (i: number) => setSelected(p => p.includes(i) ? p.filter(x => x!==i) : [...p, i]);

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">360Airo — Select Target Audience</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-[10px] border border-gray-200 rounded px-2 py-0.5 text-gray-600">≡ Table</button>
          <button className="flex items-center gap-1 text-[10px] border border-gray-200 rounded px-2 py-0.5 text-gray-500">⊞ Cards</button>
          <div className="flex gap-1.5 ml-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-md">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Select Target Audience</h3>
            <p className="text-xs text-gray-500">Choose contacts for AI personalisation</p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-3 grid grid-cols-2 sm:grid-cols-4 gap-3 shadow-sm">
          {[
            { emoji:"🎯", label:"Campaign",           val:"My Airo Campaign", sub:"AI Personalised" },
            { emoji:"📊", label:"Email List",         val:"My Prospect List", sub:"Connected" },
            { emoji:"👥", label:"Available Contacts", val:"5 contacts",       sub:"Ready for AI" },
            { emoji:"✨", label:"Selected",           val:`${selected.length} contacts`, sub:"Step: 2/4" },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-2">
              <span className="text-sm">{item.emoji}</span>
              <div>
                <p className="text-[9px] text-gray-400">{item.label}</p>
                <p className="text-[10px] font-bold text-gray-800">{item.val}</p>
                <p className={`text-[9px] ${item.label==="Selected" ? "text-violet-600 font-semibold" : "text-gray-400"}`}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex-1 min-w-[160px] bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-400 flex items-center gap-2">
            <Eye className="w-3 h-3" /> Search contacts…
          </div>
          <select className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 outline-none">
            <option>All Statuses</option>
          </select>
          <button className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition">
            Deselect All
          </button>
          <button className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg ml-auto hover:opacity-90 transition shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Continue with {selected.length} contacts →
          </button>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          <div className="grid grid-cols-[28px_2fr_2.5fr_2fr_1.5fr_1.5fr_1.2fr_1fr] px-3 py-2 bg-gray-50 border-b border-gray-100 text-[9px] font-bold text-gray-500 uppercase tracking-wider gap-2 items-center">
            <input type="checkbox" checked={selected.length===CONTACTS.length} onChange={() => setSelected(selected.length===CONTACTS.length ? [] : CONTACTS.map((_,i)=>i))} className="w-3 h-3 accent-violet-600" />
            <span>Name</span><span>Email</span><span>Company</span><span>Job Title</span><span>Location</span><span>Phone</span><span>AI Potential</span>
          </div>
          {CONTACTS.map((c, i) => (
            <div key={i} onClick={() => toggle(i)}
              className={`grid grid-cols-[28px_2fr_2.5fr_2fr_1.5fr_1.5fr_1.2fr_1fr] px-3 py-2.5 border-b border-gray-50 last:border-0 items-center gap-2 cursor-pointer transition
                ${selected.includes(i) ? "bg-violet-50 hover:bg-violet-50" : "hover:bg-gray-50"}`}>
              <input type="checkbox" checked={selected.includes(i)} onChange={() => toggle(i)} className="w-3 h-3 accent-violet-600" onClick={e => e.stopPropagation()} />
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-6 h-6 rounded-full ${c.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[8px] text-white font-bold">{c.initials}</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-800 truncate">{c.name}</span>
              </div>
              <span className="text-[9px] text-blue-600 truncate">{c.email}</span>
              <span className="text-[9px] text-gray-600 truncate">{c.company}</span>
              <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded truncate">{c.title}</span>
              <span className="text-[9px] text-gray-500">{c.location}</span>
              <span className="text-[9px] text-gray-500">{c.phone}</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-[9px] text-green-600 font-medium">6 fields</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Generate Emails Mockup ───────────────────────────────────────────────────
function GenerateEmailsMockup() {
  const [generated, setGenerated] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
            <span className="text-white text-[7px] font-black">360</span>
          </div>
          <span className="text-xs text-gray-600 font-medium">360Airo — AI Generated Email Preview</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="bg-gray-50 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-md">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">AI Generated Email Preview</h3>
            <p className="text-xs text-gray-500">{generated ? "✨ 3 PREVIEW emails generated (showing sample of 5 total contacts)" : "Ready to generate PREVIEW emails for 5 contacts"}</p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-3 grid grid-cols-2 sm:grid-cols-4 gap-3 shadow-sm text-xs">
          {[
            { label:"Campaign",       val:"My Airo Campaign",  sub:"AI Powered",    subColor:"text-violet-600" },
            { label:"Total Selected", val:"5 contacts",        sub:"From list",      subColor:"text-gray-400"   },
            { label:"Generated",      val:generated?"3 emails":"0 emails", sub:generated?"2 still need generation":"5 still need generation", subColor:generated?"text-emerald-600":"text-gray-400" },
            { label:"Status",         val:generated?"3 approved":"0 approved", sub:"Step: 3/4", subColor:generated?"text-emerald-600":"text-gray-400" },
          ].map(item => (
            <div key={item.label}>
              <p className="text-[9px] text-gray-400 font-medium">{item.label}</p>
              <p className={`text-xs font-bold ${item.label==="Generated"&&generated?"text-emerald-600":item.label==="Status"&&generated?"text-violet-600":"text-gray-800"}`}>{item.val}</p>
              <p className={`text-[9px] ${item.subColor}`}>{item.sub}</p>
            </div>
          ))}
        </div>

        {!generated ? (
          /* Pre-generate state */
          <div className="rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 p-6 flex flex-col items-center text-center text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <p className="text-base font-bold mb-1">Ready to Generate AI Emails</p>
            <p className="text-xs text-violet-200 mb-4">Generate personalised emails for your 5 contacts using AI</p>
            <button onClick={() => setGenerated(true)}
              className="flex items-center gap-2 bg-white text-violet-700 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-violet-50 transition shadow-md">
              <Sparkles className="w-4 h-4" /> Generate Email Pitches →
            </button>
          </div>
        ) : (
          /* Post-generate state */
          <div>
            {/* Stats row */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {[
                { val:"5", label:"Total Contacts",  color:"text-gray-800" },
                { val:"3", label:"Generated",        color:"text-blue-600" },
                { val:"3", label:"Approved",         color:"text-emerald-600" },
                { val:"2", label:"Pending",          color:"text-orange-500" },
                { val:"0", label:"Rejected",         color:"text-red-500" },
                { val:"85%",label:"Avg Confidence",  color:"text-violet-600" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-2.5 text-center shadow-sm">
                  <p className={`text-lg font-black ${s.color}`}>{s.val}</p>
                  <p className="text-[9px] text-gray-400 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex-1 min-w-[160px] bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[10px] text-gray-400">
                Search pitches by name, email, or subject…
              </div>
              <select className="text-[10px] border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 outline-none">
                <option>All Status</option>
              </select>
              <button className="text-[10px] border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 flex items-center gap-1">
                <Check className="w-3 h-3" /> Approve All
              </button>
              <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition ml-auto">
                <Calendar className="w-3 h-3" /> Validate & Schedule All (5) →
              </button>
            </div>

            {/* Progress line */}
            <div className="text-[10px] text-gray-500 mb-1">
              <span className="font-semibold">Campaign Progress: </span>3 of 5 emails generated (60%) • 3 approved • 0 pending review • 2 awaiting generation • 0 rejected
            </div>
            <div className="flex items-center gap-1 text-[10px] text-orange-500 mb-3">
              <AlertCircle className="w-3 h-3" /> 2 contacts still need email generation
            </div>

            {/* Email card */}
            <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-600">DW</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">David Wilson</p>
                    <p className="text-[10px] text-gray-400">david.wilson@apexapartments.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-gray-500">85% Confidence</span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Approved</span>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wide">Subject Line</span>
                </div>
                <p className="text-xs font-semibold text-gray-900 mb-3">{GENERATED_PITCH.subject}</p>
                <div className="bg-gray-50 rounded-xl p-3 text-[10px] text-gray-700 leading-relaxed whitespace-pre-line max-h-28 overflow-y-auto border border-gray-100">
                  {GENERATED_PITCH.body}
                </div>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
                {[
                  { label:"✓ Approved", cls:"bg-emerald-500 text-white hover:bg-emerald-600" },
                  { label:"✕ Reject",   cls:"border border-gray-200 text-gray-600 hover:bg-gray-50" },
                  { label:"✎ Edit",     cls:"border border-gray-200 text-gray-600 hover:bg-gray-50" },
                  { label:"↺ Regenerate",cls:"border border-gray-200 text-gray-600 hover:bg-gray-50" },
                ].map(btn => (
                  <button key={btn.label} className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg transition ${btn.cls}`}>{btn.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Validate & Send Mockup ───────────────────────────────────────────────────
function ValidateSendMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md bg-white">
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 text-white" />
          <span className="text-xs text-white font-bold">Validate & Send Campaign</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-4">
        <div className="grid lg:grid-cols-[1fr_220px] gap-4">
          {/* Left — Validation */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-sm font-bold text-gray-900">Validation</span>
                  <span className="ml-2 text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Score: 90</span>
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full" style={{ width:"90%" }} />
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mb-3">Confirm sender, context, and readiness before launching for better deliverability and engagement.</p>

              <p className="text-[10px] font-bold text-gray-600 mb-1.5">Sender Accounts <span className="text-gray-400 font-normal">1 selected</span></p>
              <div className="border border-gray-200 rounded-lg px-3 py-2 mb-3 flex items-center justify-between">
                <span className="text-xs text-gray-700">myaccount@360airo.com</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-[10px] font-bold text-gray-600 mb-1">Company Info</p>
                  <textarea className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-[10px] text-gray-600 bg-gray-50 resize-none outline-none" rows={3}
                    defaultValue="360Airo is an AI-powered multichannel outreach platform helping B2B sales teams automate LinkedIn, email, and calling sequences from a single dashboard..." />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-600 mb-1">Target Audience</p>
                  <textarea className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-[10px] text-gray-600 bg-gray-50 resize-none outline-none" rows={3}
                    defaultValue="Head of Sales, VP of Marketing, Founders at B2B SaaS companies with 10–200 employees seeking outreach efficiency and pipeline growth..." />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
                  <Shield className="w-3.5 h-3.5" /> Validate Campaign
                </button>
                {[["Spam","8"],["Deliverability","90"],["Engagement","80"]].map(([label,val]) => (
                  <span key={label} className="text-[10px] text-gray-500">{label}: <strong className="text-gray-800">{val}</strong></span>
                ))}
              </div>
            </div>

            {/* Contacts & Estimated Outcome */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm">
                <p className="text-xs font-bold text-gray-800 mb-2">Contacts</p>
                {[["Total","5"],["Approved Pitches","3"],["To Generate","2"],["With Website Data","0"]].map(([k,v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                    <span className="text-[10px] text-gray-500">{k}</span>
                    <span className="text-[10px] font-bold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm">
                <p className="text-xs font-bold text-gray-800 mb-2">Estimated Outcome</p>
                {[["Estimated Success Rate","75%"],["Estimated Duration","2 hours"]].map(([k,v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                    <span className="text-[10px] text-gray-500">{k}</span>
                    <span className="text-[10px] font-bold text-emerald-600">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Send panel */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-fit space-y-3">
            <div>
              <p className="text-xs font-bold text-gray-900">Send</p>
              <p className="text-[10px] text-gray-400">Schedule and set pacing before launch</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-600 mb-1.5">Scheduler Mode</p>
              <div className="grid grid-cols-2 rounded-xl overflow-hidden border border-gray-200">
                <button className="py-2 text-[10px] font-bold bg-gray-900 text-white">Basic</button>
                <button className="py-2 text-[10px] text-gray-500 hover:bg-gray-50 transition">Smart Scheduler</button>
              </div>
              <p className="text-[9px] text-gray-400 mt-1">Manual execution workflow with custom timing</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-600 mb-1.5">Schedule</p>
              <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden border border-gray-200">
                {["Send now","Today 9 AM","Tomorrow 9 AM"].map((t,i) => (
                  <button key={t} className={`py-1.5 text-[9px] font-medium transition ${i===0 ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-600 mb-1">Email gap (minutes)</p>
              <input type="number" defaultValue={15} className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 outline-none focus:ring-2 focus:ring-orange-200" />
              <p className="text-[9px] text-gray-400 mt-1">Controls pacing to protect reputation</p>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition text-white text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-2">
              🚀 Launch Campaign
            </button>
            <div className="border-t border-gray-100 pt-2 space-y-1.5">
              {[["Recipients","5"],["Pacing","4/hr"],["ETA","2 hours"],["Status","Ready"]].map(([k,v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[10px] text-gray-500">{k}</span>
                  <span className={`text-[10px] font-bold ${v==="Ready"?"bg-gray-900 text-white px-2 py-0.5 rounded-full":"text-gray-800"}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AIEmailCampaignPage() {
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

  const STEPS = [
    { num:"1", color:"bg-violet-600", id:"step1-configure-ai",    title:"Configure AI Assistant",    desc:"Fill in your company, product, audience, pain points, tone, CTA, and value proposition" },
    { num:"2", color:"bg-pink-600",   id:"step2-ai-chat",         title:"AI Strategist Chat",         desc:"The AI asks you strategic questions to extract the best content for personalisation" },
    { num:"3", color:"bg-blue-600",   id:"step3-config-complete", title:"Configuration Complete",     desc:"Review your AI configuration summary before selecting target contacts" },
    { num:"4", color:"bg-teal-600",   id:"step4-select-contacts", title:"Select Target Contacts",     desc:"Choose which contacts from your list to personalise emails for" },
    { num:"5", color:"bg-emerald-600",id:"step5-generate-emails", title:"Generate Email Pitches",     desc:"360Airo's AI writes a unique personalised email for every selected contact" },
    { num:"6", color:"bg-orange-500", id:"step6-validate-send",   title:"Validate & Send Campaign",  desc:"Review validation score, set your schedule and pacing, then launch" },
  ];

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
                  <span className="text-gray-700 font-medium">AI Email Campaign</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-black bg-gradient-to-r from-violet-600 to-blue-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">AI Powered</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AI Email Campaign</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to create a fully AI-personalised email campaign in 360Airo — where you define your business
                    context and the AI writes a unique, targeted email for every single contact in your list.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Overview */}
                <motion.div id="overview" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    Unlike standard email campaigns that send the same message to everyone, an <strong>AI Email Campaign</strong> in
                    360Airo generates a completely unique, personalised email for each contact — tailored to their company, role,
                    and likely pain points. You provide the business context once; the AI does the writing for everyone.
                  </p>

                  {/* 6-step visual */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                    {STEPS.map((s, i) => (
                      <motion.a href={`#${s.id}`}
                        key={s.id}
                        initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                        transition={{ delay:0.1+i*0.06 }}
                        onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior:"smooth" }); }}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-violet-300 hover:shadow-sm transition cursor-pointer group">
                        <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <span className="text-white text-[10px] font-black">{s.num}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-violet-600 transition leading-tight">{s.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>How it works:</strong> You define your business context once — company overview, product, target audience,
                      pain points, tone, CTA, and value proposition. 360Airo's AI then generates a unique email for every contact,
                      referencing their specific company, role, and industry.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 1 */}
                <motion.div id="step1-configure-ai" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <SectionStep num="1" color="bg-violet-600" title="Step 1 — Configure AI Assistant" desc="" />
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    Before the AI can personalise emails for your contacts, you need to tell it about your business. Fill in all 7 fields
                    below — the more detail you provide, the more accurate and personalised your generated emails will be.
                  </p>

                  <div className="mb-5"><AIConfigForm /></div>

                  {/* Field descriptions */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {AI_CONFIG_FIELDS.map((field, i) => {
                      const Icon = field.icon;
                      return (
                        <motion.div key={field.id} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.15+i*0.04 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition">
                          <div className={`w-7 h-7 rounded-lg ${field.iconBg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{field.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                              {field.id === "company" && "Describe your business, industry, and what makes you unique. The AI will reference this as your sender context."}
                              {field.id === "product" && "What are you promoting? Be specific — product name, key features, and what problem it solves."}
                              {field.id === "audience" && "Who should receive this campaign? Include job titles, industries, and company types for the best targeting."}
                              {field.id === "painpoints" && "What challenges does your audience face? The AI will reference these pain points to make emails feel relevant."}
                              {field.id === "tone" && "How should the AI write? Professional, conversational, direct, casual — choose what fits your brand."}
                              {field.id === "cta" && "What action should every email end with? Book a demo, reply, schedule a call, download a resource — be specific."}
                              {field.id === "uvp" && "Why should someone choose you over a competitor? The AI will weave this into each personalised email."}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Tip:</strong> You only need to configure the AI once per campaign type. If you run similar campaigns regularly,
                      you can duplicate the configuration and adjust just the target audience or CTA.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 2 */}
                <motion.div id="step2-ai-chat" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <SectionStep num="2" color="bg-pink-600" title="Step 2 — AI Strategist Chat" desc="" />
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    After clicking "Start AI Configuration", the AI Email Strategist opens a guided chat. It asks you 8 strategic
                    questions to extract the right context for personalising your emails. Answer each question as specifically as possible.
                  </p>

                  <div className="mb-5"><AIChatMockup /></div>

                  <ul className="space-y-2">
                    {[
                      ["8-step guided conversation","The AI works through 8 questions covering your business, product, audience, pain points, tone, CTA, value proposition, and communication style"],
                      ["Progress indicator","The progress bar at the top shows how many steps remain — Step 2 of 8 = 25% complete"],
                      ["Detailed answers work best","Give the AI full sentences and context, not just keywords — the more detail, the better it personalises each email"],
                      ["Industry & role specificity","Mention specific industries, job titles, and use cases — the AI will reference these when writing to matching contacts"],
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
                <motion.div id="step3-config-complete" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.22 }} className="mb-10">
                  <SectionStep num="3" color="bg-blue-600" title="Step 3 — Configuration Complete" desc="" />
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    Once the AI chat finishes, you'll see a Configuration Complete summary showing everything the AI has captured — company info, product details, target audience, pain points, tone, CTA, and value proposition.
                  </p>

                  <div className="mb-5"><ConfigCompleteMockup /></div>

                  <ul className="space-y-2">
                    {[
                      ["Configuration Complete badge","Green badge confirms the AI has all the information it needs to generate personalised emails"],
                      ["Review all 4 cards","Check Company Info, Product/Service, Target Audience, and Pain Points — click Read more on each to see the full text"],
                      ["Configuration Settings","Review the tone, email style, CTA, and value proposition the AI will use across all emails"],
                      ["Reconfigure if needed","If something looks wrong, click Reconfigure to go back through the AI chat and update your answers"],
                      ["Next Steps panel","The right sidebar shows you the 4-step journey: Configure AI → Select Contacts → Generate Emails → Review & Send"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 4 */}
                <motion.div id="step4-select-contacts" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.24 }} className="mb-10">
                  <SectionStep num="4" color="bg-teal-600" title="Step 4 — Select Target Contacts" desc="" />
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    Choose which contacts from your prospect list to personalise emails for. Each contact shows an
                    AI Potential score based on how many data fields are available for personalisation.
                  </p>

                  <div className="mb-5"><ContactsTableMockup /></div>

                  <ul className="space-y-2">
                    {[
                      ["Table or Cards view","Switch between a detailed table view and a card view using the toggle in the top right"],
                      ["AI Potential — 6 fields","Contacts with more data fields (name, company, title, location, phone, LinkedIn) give the AI more to work with for personalisation"],
                      ["Select or deselect all","Use the master checkbox to select all contacts, or click individual rows to pick specific ones"],
                      ["Search and filter","Use the search bar or status filter to quickly find specific contacts within large lists"],
                      ["Continue with X contacts","The button shows the live count of selected contacts — click to proceed to email generation"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 5 */}
                <motion.div id="step5-generate-emails" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.26 }} className="mb-10">
                  <SectionStep num="5" color="bg-emerald-600" title="Step 5 — Generate Email Pitches" desc="" />
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    Click "Generate Email Pitches" and 360Airo's AI writes a unique, personalised email for each selected contact —
                    using your configuration data and each contact's specific company, role, and location. Click the button in the mockup below to preview the result.
                  </p>

                  <div className="mb-5"><GenerateEmailsMockup /></div>

                  <ul className="space-y-2">
                    {[
                      ["Preview emails before sending","Review every AI-generated email before it goes out — you can approve, reject, edit, or regenerate each one"],
                      ["Confidence score","Each email shows an AI confidence percentage (e.g. 85%) indicating how well the email was tailored to that specific contact"],
                      ["Approve / Reject / Edit","Approve emails you're happy with, reject ones that miss the mark, or click Edit to make manual changes before sending"],
                      ["Regenerate","Not happy with a pitch? Click Regenerate to have the AI write a fresh version for that specific contact"],
                      ["Approve All","Once you've reviewed the emails, use Approve All to quickly approve every generated pitch at once"],
                      ["Campaign Progress bar","Track how many emails are generated vs pending — the bar updates as the AI processes each contact in the background"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* STEP 6 */}
                <motion.div id="step6-validate-send" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.28 }} className="mb-10">
                  <SectionStep num="6" color="bg-orange-500" title="Step 6 — Validate & Send Campaign" desc="" />
                  <p className="text-sm text-gray-500 mb-5 ml-10">
                    Before launching, 360Airo validates your campaign for spam risk, deliverability, and engagement readiness.
                    Set your sender account, schedule, and email pacing — then click Launch Campaign.
                  </p>

                  <div className="mb-5"><ValidateSendMockup /></div>

                  <ul className="space-y-2">
                    {[
                      ["Validation Score","Your campaign gets a score out of 100 for Spam risk, Deliverability, and Engagement — aim for 80+ before launching"],
                      ["Sender Accounts","Select which email account(s) to send from — multiple accounts use inbox rotation to protect deliverability"],
                      ["Scheduler Mode","Basic mode lets you set a manual send time. Smart Scheduler automatically optimises send times based on contact timezone and behaviour"],
                      ["Email gap (minutes)","Controls the pacing between emails — 15 minutes is recommended to protect your sender reputation and avoid spam triggers"],
                      ["Estimated Outcome","360Airo shows an estimated success rate and campaign duration before you launch so you know what to expect"],
                      ["Launch Campaign","Once validated and scheduled, click the Launch Campaign button — your personalised emails will send at your chosen time"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pro tip */}
                  <div className="mt-5 flex items-start gap-2.5 bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-violet-500" />
                    <span>
                      <strong>Pro tip:</strong> For the highest reply rates with AI Email Campaigns, keep your list under 200 contacts,
                      fill in all 7 AI configuration fields in detail, and set your email gap to at least 10–15 minutes.
                      Smaller, highly personalised sends consistently outperform large generic blasts.
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