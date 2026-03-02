// app/docs/app-section/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Users, Filter,
  PlusCircle, Download, Upload, Search, Mail, Linkedin, Phone,
  Tag, MoreHorizontal, CheckSquare, ArrowUpRight, Info, Globe,
  UserCheck, Building2, BarChart2, RefreshCw, Trash2, Settings,
  Shield, Zap, Brain, MessageSquare, CreditCard, Award, Target,
  PieChart, Rocket, Sparkles, Lock, CheckCircle, XCircle,
  AlertCircle, ExternalLink, Github, Twitter, Instagram,
  Facebook, Youtube, HelpCircle, FileText, LifeBuoy, Database
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── Brand Colors ────────────────────────────────────────────────────────────
const brand = {
  primary: "#4931ed",
  secondary: "#a836ba",
  gradient: "linear-gradient(135deg, #4931ed, #a836ba)"
};

// ─── Table of Contents ───────────────────────────────────────────────────────
const TOC = [
  { id: "overview", label: "Platform Overview" },
  { id: "email-settings", label: "Email Settings" },
  { id: "linkedin-settings", label: "LinkedIn Settings" },
  { id: "call-settings", label: "Call Settings" },
  { id: "ai-automation", label: "AI Automation" },
  { id: "integration-settings", label: "Integrations" },
  { id: "team-settings", label: "Team Settings" },
  { id: "compliance", label: "Security & Compliance" },
  { id: "analytics", label: "Analytics & Reporting" },
  { id: "billing", label: "Billing & Usage" }
];

// ─── Mock Data ───────────────────────────────────────────────────────────────
const STATS = [
  { label: "Live Campaigns", value: "2.4K", icon: Rocket, change: "+12%" },
  { label: "Messages Sent", value: "1.8K", icon: Mail, change: "+8%" },
  { label: "Replies", value: "347", icon: MessageSquare, change: "+23%" },
  { label: "Deliverability", value: "98%", icon: CheckCircle, change: "+2%" }
];

const EMAIL_ACCOUNTS = [
  { email: "sales@airo.com", provider: "Gmail", health: "Excellent", dailyLimit: 500, used: 342, warmup: "Active", status: "Connected" },
  { email: "marketing@airo.com", provider: "Outlook", health: "Good", dailyLimit: 500, used: 489, warmup: "Active", status: "Connected" },
  { email: "support@airo.com", provider: "Custom", health: "Warning", dailyLimit: 300, used: 298, warmup: "Paused", status: "Connected" },
  { email: "hello@airo.com", provider: "Gmail", health: "Excellent", dailyLimit: 500, used: 156, warmup: "Active", status: "Connected" }
];

const LINKEDIN_ACCOUNTS = [
  { name: "John Smith", profile: "linkedin.com/in/johnsmith", connections: 850, status: "Active", dailyActions: 45 },
  { name: "Sarah Johnson", profile: "linkedin.com/in/sarahj", connections: 1200, status: "Active", dailyActions: 38 },
  { name: "Mike Chen", profile: "linkedin.com/in/mikechen", connections: 650, status: "Limited", dailyActions: 22 }
];

const PHONE_NUMBERS = [
  { number: "+1 (555) 123-4567", provider: "Twilio", status: "Active", used: 245, total: 1000, country: "US" },
  { number: "+44 20 1234 5678", provider: "Vonage", status: "Active", used: 89, total: 500, country: "UK" },
  { number: "+1 (555) 987-6543", provider: "Twilio", status: "Pending", used: 0, total: 1000, country: "US" }
];

const INTEGRATIONS = [
  { name: "HubSpot", icon: "HS", connected: true, category: "CRM" },
  { name: "Salesforce", icon: "SF", connected: true, category: "CRM" },
  { name: "Pipedrive", icon: "PD", connected: false, category: "CRM" },
  { name: "Zoho", icon: "ZH", connected: false, category: "CRM" },
  { name: "Slack", icon: "SL", connected: true, category: "Communication" },
  { name: "Gmail", icon: "GM", connected: true, category: "Email" },
  { name: "Outlook", icon: "OL", connected: false, category: "Email" },
  { name: "Zapier", icon: "ZP", connected: true, category: "Automation" }
];

const TEAM_MEMBERS = [
  { name: "Alex Rivera", email: "alex@airo.com", role: "Admin", campaigns: 12, prospects: 1250, status: "Active" },
  { name: "Emma Watson", email: "emma@airo.com", role: "Manager", campaigns: 8, prospects: 890, status: "Active" },
  { name: "James Chen", email: "james@airo.com", role: "SDR", campaigns: 5, prospects: 2100, status: "Active" },
  { name: "Lisa Park", email: "lisa@airo.com", role: "SDR", campaigns: 6, prospects: 1800, status: "Away" }
];

// ─── Ask AI Component ────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-[#4931ed] hover:text-[#4931ed] bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }} transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo settings…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#4931ed] focus:border-transparent"
              placeholder="e.g. How do I connect email accounts?" />
            <button className="mt-2 w-full py-1.5 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition"
              style={{ background: brand.gradient }}>Ask</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── TOC Panel ───────────────────────────────────────────────────────────────
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
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id
                    ? "text-[#4931ed] font-semibold bg-[#4931ed]/5 border-r-2 border-[#4931ed]"
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

// ─── Settings Card Component ─────────────────────────────────────────────────
function SettingsCard({ title, description, icon: Icon, href, gradient = false, stats }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link href={href}>
        <div className="h-full p-5 rounded-xl border border-gray-200 bg-white hover:border-[#4931ed]/30 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg" 
              style={{ background: gradient ? brand.gradient : "#4931ed10" }}>
              <Icon className="w-4 h-4" style={{ color: gradient ? "white" : brand.primary }} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#4931ed] transition-colors">
                {title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {description}
              </p>
              {stats && (
                <div className="mt-2 flex items-center gap-2 text-[10px]">
                  <span className="font-medium text-gray-900">{stats.value}</span>
                  <span className="text-green-600">{stats.change}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeToc, setActiveToc] = useState("overview");

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
                <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-[#4931ed] transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-[#4931ed] transition">App Section</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Settings</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    The All-in-One AI Outreach Platform — Connect, Engage, and Close — Smarter Than Ever
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Overview Section */}
                <motion.section id="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" style={{ color: brand.primary }} />
                    Platform Overview
                  </h2>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {STATS.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="rounded-xl border border-gray-200 p-4 bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-1.5 rounded-lg" style={{ background: "#4931ed10" }}>
                              <Icon className="w-3.5 h-3.5" style={{ color: brand.primary }} />
                            </div>
                            <span className="text-[10px] font-medium text-green-600">{stat.change}</span>
                          </div>
                          <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    360Airo is an AI-driven multichannel outreach platform that reaches prospects where they're most active 
                    while keeping every message personal, timely, and authentic. Simplify and organize your sales pipeline 
                    with the most powerful AI-powered outreach tool designed for teams that want to scale faster.
                  </p>

                  <div className="flex items-start gap-2.5 bg-[#4931ed]/5 border border-[#4931ed]/20 rounded-xl px-4 py-3 text-xs">
                    <Target className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: brand.primary }} />
                    <span className="text-gray-700">
                      <strong className="text-gray-900">5,000+ businesses trust us</strong> • 12M+ outreach actions • 40% more meetings • 3x faster response
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* Email Settings Section */}
                <motion.section id="email-settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5" style={{ color: brand.primary }} />
                    Email Settings
                  </h2>

                  {/* Email Accounts Table */}
                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md mb-5">
                    {/* Browser chrome */}
                    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md" style={{ background: brand.gradient }}>
                          <span className="text-white text-[7px] font-black flex items-center justify-center h-full">AI</span>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">360Airo — Email Accounts</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                    </div>

                    {/* Table header */}
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider gap-2">
                      <span>Email Account</span>
                      <span>Provider</span>
                      <span>Health</span>
                      <span>Daily Limit</span>
                      <span>Used</span>
                      <span>Warm-up</span>
                      <span>Status</span>
                    </div>

                    {/* Rows */}
                    {EMAIL_ACCOUNTS.map((account, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.14 + i * 0.03 }}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] px-4 py-3 border-b border-gray-50 last:border-0 items-center text-xs hover:bg-gray-50">
                        <span className="font-medium text-gray-900">{account.email}</span>
                        <span className="text-gray-600">{account.provider}</span>
                        <span className="flex items-center gap-1">
                          {account.health === "Excellent" ? <CheckCircle className="w-3 h-3 text-green-500" /> : 
                           account.health === "Good" ? <CheckCircle className="w-3 h-3 text-blue-500" /> : 
                           <AlertCircle className="w-3 h-3 text-yellow-500" />}
                          <span>{account.health}</span>
                        </span>
                        <span>{account.dailyLimit}</span>
                        <span>{account.used}</span>
                        <span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            account.warmup === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {account.warmup}
                          </span>
                        </span>
                        <span className="text-green-600">{account.status}</span>
                      </motion.div>
                    ))}

                    {/* Add account button */}
                    <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
                      <button className="flex items-center gap-1 text-xs" style={{ color: brand.primary }}>
                        <PlusCircle className="w-3.5 h-3.5" /> Add email account
                      </button>
                    </div>
                  </div>

                  {/* Email features grid */}
                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <SettingsCard 
                      title="Unlimited Email Accounts"
                      description="Add unlimited sending accounts with smart inbox rotation for safe scalability"
                      icon={CreditCard}
                      href="/settings/email/accounts"
                      stats={{ value: "4 connected", change: "+2 this month" }}
                    />
                    <SettingsCard 
                      title="Deliverability Tools"
                      description="98% deliverability rate with auto-warmup, SPF/DKIM/DMARC verification"
                      icon={Shield}
                      href="/settings/email/deliverability"
                    />
                    <SettingsCard 
                      title="Domain Health"
                      description="Monitor and improve your sender reputation with real-time health checks"
                      icon={Globe}
                      href="/settings/email/domains"
                    />
                    <SettingsCard 
                      title="Email Verification"
                      description="Automatically verify emails when prospects are added - flag invalid or duplicates"
                      icon={CheckCircle}
                      href="/settings/email/verification"
                    />
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* LinkedIn Settings Section */}
                <motion.section id="linkedin-settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Linkedin className="w-5 h-5" style={{ color: brand.primary }} />
                    LinkedIn Settings
                  </h2>

                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md mb-5">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-700">Connected LinkedIn Accounts</span>
                      <button className="text-xs" style={{ color: brand.primary }}>+ Connect new</button>
                    </div>
                    
                    {LINKEDIN_ACCOUNTS.map((account, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.18 + i * 0.04 }}
                        className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0077b5] bg-opacity-10 flex items-center justify-center">
                            <Linkedin className="w-4 h-4 text-[#0077b5]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{account.name}</p>
                            <p className="text-[10px] text-gray-500">{account.profile}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs font-medium text-gray-900">{account.connections}</p>
                            <p className="text-[9px] text-gray-500">connections</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium text-gray-900">{account.dailyActions}</p>
                            <p className="text-[9px] text-gray-500">daily actions</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            account.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {account.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 mb-4">
                    <SettingsCard 
                      title="Connection Requests"
                      description="Send personalized connection requests automatically with AI-generated icebreakers"
                      icon={Users}
                      href="/settings/linkedin/connections"
                    />
                    <SettingsCard 
                      title="Follow-up Messages"
                      description="Automated follow-ups after connection with smart timing for 3x higher response"
                      icon={MessageSquare}
                      href="/settings/linkedin/followups"
                    />
                    <SettingsCard 
                      title="InMail Campaigns"
                      description="Run InMail sequences with A/B testing and performance tracking"
                      icon={Mail}
                      href="/settings/linkedin/inmail"
                    />
                    <SettingsCard 
                      title="Smart Timing"
                      description="AI identifies best times to send based on prospect activity patterns"
                      icon={Clock}
                      href="/settings/linkedin/timing"
                    />
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* Call Settings Section */}
                <motion.section id="call-settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5" style={{ color: brand.primary }} />
                    Call Settings
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {PHONE_NUMBERS.map((phone, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22 + i * 0.04 }}
                        className="rounded-xl border border-gray-200 p-4 hover:border-[#4931ed]/30 transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{phone.number}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{phone.provider} • {phone.country}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            phone.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {phone.status}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                            <span>Usage</span>
                            <span>{phone.used} / {phone.total} mins</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ 
                              width: `${(phone.used / phone.total) * 100}%`,
                              background: brand.gradient 
                            }} />
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-xl border-2 border-dashed border-gray-200 p-4 flex items-center justify-center hover:border-[#4931ed]/30 transition cursor-pointer group">
                      <div className="text-center">
                        <PlusCircle className="w-5 h-5 mx-auto mb-2" style={{ color: brand.primary }} />
                        <p className="text-xs font-medium text-gray-900 group-hover:text-[#4931ed]">Add phone number</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 bg-gradient-to-r from-[#4931ed]/5 to-[#a836ba]/5 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white">
                          <CreditCard className="w-4 h-4" style={{ color: brand.primary }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Call balance usage</p>
                          <p className="text-xs text-gray-600">1,245 minutes remaining • 355 used this month</p>
                        </div>
                      </div>
                      <button className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: brand.gradient }}>
                        Buy credits
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>40% more qualified meetings</strong> — Calls integrated with CRM automatically log every touchpoint 
                      for complete customer journey visibility.
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* AI Automation Section */}
                <motion.section id="ai-automation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" style={{ color: brand.primary }} />
                    AI Automation
                  </h2>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: Sparkles, title: "Icebreaker Generation", desc: "Generate personalized icebreakers in seconds with proven templates and dynamic variables" },
                      { icon: Target, title: "Lead Scoring", desc: "Score leads based on engagement and intent patterns automatically" },
                      { icon: Zap, title: "Dynamic Timing", desc: "Adjust campaign timing dynamically based on prospect behavior" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.26 + i * 0.05 }}
                          className="rounded-xl border border-gray-200 p-4 hover:border-[#4931ed]/30 transition">
                          <div className="w-8 h-8 rounded-lg bg-[#4931ed]/10 flex items-center justify-center mb-2.5">
                            <Icon className="w-4 h-4" style={{ color: brand.primary }} />
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    {[
                      { step: "01", title: "Auto-pause on meetings", desc: "AI automatically pauses outreach when a meeting is booked" },
                      { step: "02", title: "Content personalization", desc: "AI writes better intros than most SDRs - 18% reply rate increase" },
                      { step: "03", title: "Pattern recognition", desc: "Studies campaigns, identifies patterns, and continually optimizes performance" },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#4931ed]/30 transition">
                        <div className="w-7 h-7 rounded-full text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                          style={{ background: brand.gradient }}>
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* Integration Settings Section */}
                <motion.section id="integration-settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" style={{ color: brand.primary }} />
                    Integrations
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {INTEGRATIONS.map((integration, i) => (
                      <motion.div key={integration.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.02 }}
                        className={`rounded-xl border p-3 text-center transition ${
                          integration.connected 
                            ? "border-[#4931ed]/30 bg-[#4931ed]/5" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}>
                        <div className="w-8 h-8 rounded-lg bg-white mx-auto mb-2 flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold" style={{ color: brand.primary }}>{integration.icon}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-900">{integration.name}</p>
                        <p className="text-[9px] text-gray-500 mt-0.5">{integration.category}</p>
                        {integration.connected && (
                          <span className="mt-1 inline-block px-1 py-0.5 bg-green-100 text-green-700 text-[8px] font-bold rounded">
                            Connected
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Integrations</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { name: "HubSpot", desc: "Sync contacts and activities bidirectionally" },
                        { name: "Salesforce", desc: "Push/pull leads, opportunities, and tasks" },
                        { name: "Slack", desc: "Get notifications for replies and meetings" },
                        { name: "Zapier", desc: "Connect with 3000+ apps via webhooks" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: brand.primary }} />
                          <div>
                            <p className="text-xs font-medium text-gray-900">{item.name}</p>
                            <p className="text-[10px] text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* Team Settings Section */}
                <motion.section id="team-settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" style={{ color: brand.primary }} />
                    Team Settings
                  </h2>

                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md mb-5">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-700">Team Members</span>
                      <button className="text-xs flex items-center gap-1" style={{ color: brand.primary }}>
                        <PlusCircle className="w-3 h-3" /> Invite member
                      </button>
                    </div>

                    <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_1fr] bg-gray-50 border-b border-gray-200 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">
                      <span>Name</span>
                      <span>Email</span>
                      <span>Role</span>
                      <span>Campaigns</span>
                      <span>Prospects</span>
                      <span>Status</span>
                    </div>

                    {TEAM_MEMBERS.map((member, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.34 + i * 0.03 }}
                        className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_1fr] px-4 py-3 border-b border-gray-50 last:border-0 items-center text-xs hover:bg-gray-50">
                        <span className="font-medium text-gray-900">{member.name}</span>
                        <span className="text-gray-600">{member.email}</span>
                        <span className="text-gray-600">{member.role}</span>
                        <span>{member.campaigns}</span>
                        <span>{member.prospects.toLocaleString()}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold w-fit ${
                          member.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {member.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <SettingsCard 
                      title="Roles & Permissions"
                      description="Set role-based access to campaigns and settings (Admin, Manager, SDR, etc.)"
                      icon={Shield}
                      href="/settings/team/roles"
                    />
                    <SettingsCard 
                      title="Performance Tracking"
                      description="Monitor individual and team performance metrics across all campaigns"
                      icon={BarChart2}
                      href="/settings/team/performance"
                    />
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* Security & Compliance Section */}
                <motion.section id="compliance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5" style={{ color: brand.primary }} />
                    Security & Compliance
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {[
                      { title: "GDPR Compliance", desc: "Full compliance with European data protection regulations", icon: Shield },
                      { title: "CAN-SPAM Act", desc: "Strict adherence to US commercial email laws", icon: FileText },
                      { title: "Enterprise Encryption", desc: "AES-256 encryption for all data at rest and in transit", icon: Lock },
                      { title: "Permission Controls", desc: "Granular access controls for team members", icon: Users },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.38 + i * 0.04 }}
                          className="flex items-start gap-3 p-4 rounded-xl border border-gray-200">
                          <div className="p-2 rounded-lg bg-[#4931ed]/10">
                            <Icon className="w-4 h-4" style={{ color: brand.primary }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-xs text-green-700">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Compliance status:</strong> All systems are fully compliant with GDPR, CAN-SPAM, and CCPA regulations. 
                      Regular security audits performed.
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* Analytics & Reporting Section */}
                <motion.section id="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5" style={{ color: brand.primary }} />
                    Analytics & Reporting
                  </h2>

                  <div className="rounded-xl border border-gray-200 p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Key Performance Indicators</h3>
                      <select className="text-xs border border-gray-200 rounded-lg px-2 py-1">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last quarter</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: "Open Rate", value: "68%", change: "+5%" },
                        { label: "Click Rate", value: "24%", change: "+3%" },
                        { label: "Reply Rate", value: "18%", change: "+8%" },
                        { label: "Meeting Rate", value: "12%", change: "+4%" },
                      ].map((metric, i) => (
                        <div key={i} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                          <p className="text-[10px] text-gray-500">{metric.label}</p>
                          <span className="text-[8px] text-green-600">{metric.change}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <SettingsCard 
                      title="Campaign Performance"
                      description="Track opens, clicks, replies, and meetings per campaign with AI insights"
                      icon={PieChart}
                      href="/settings/analytics/campaigns"
                    />
                    <SettingsCard 
                      title="Channel Attribution"
                      description="See which channels (email, LinkedIn, calls) drive the most engagement"
                      icon={Target}
                      href="/settings/analytics/channels"
                    />
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* Billing & Usage Section */}
                <motion.section id="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46 }} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" style={{ color: brand.primary }} />
                    Billing & Usage
                  </h2>

                  <div className="rounded-xl border border-gray-200 p-4 bg-gradient-to-r from-[#4931ed]/5 to-[#a836ba]/5 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Current Plan</p>
                        <p className="text-xl font-bold text-gray-900">Growth Pro</p>
                        <p className="text-xs text-gray-600 mt-1">$499/month • Billed annually</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Next billing</p>
                        <p className="text-sm font-semibold text-gray-900">May 15, 2024</p>
                        <button className="mt-2 text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: brand.gradient }}>
                          Manage plan
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" style={{ color: brand.primary }} />
                        <span className="text-sm font-medium text-gray-900">Email credits</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">24,500 / 50,000 used</span>
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: "49%", background: brand.gradient }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: brand.primary }} />
                        <span className="text-sm font-medium text-gray-900">Team seats</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">8 / 10 used</span>
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: "80%", background: brand.gradient }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4" style={{ color: brand.primary }} />
                        <span className="text-sm font-medium text-gray-900">Prospect storage</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">45,200 / 100,000 used</span>
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: "45%", background: brand.gradient }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Footer timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 pt-4 border-t border-gray-100">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 3 days ago</span>
                </div>

              </div>
            </main>

            {/* TOC right panel */}
            <TableOfContents active={activeToc} />
          </div>
        </div>
      </div>
    </div>
  );
}