"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Search, Filter,
  Building2, Users, Briefcase, MapPin, User, Mail, Phone, Globe,
  CreditCard, PlusCircle, Download, ArrowUpRight, Info, CheckCircle2,
  Zap, Tag, BarChart2, Star, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "leadfinder-credits",   label: "LeadFinder Credits" },
  { id: "left-panel-filters",   label: "Left panel lead filters" },
  { id: "apply-filters",        label: "Apply filters to target your ideal prospects" },
  { id: "center-panel-results", label: "Center panel search results" },
  { id: "top-bar-credits",      label: "Top bar credit management" },
  { id: "top-right-actions",    label: "Top right lead actions" },
];

// ─── Left panel filter fields ─────────────────────────────────────────────────
const FILTER_FIELDS = [
  { icon: Building2,  label: "Company Type",  placeholder: "Select Options…", hasDropdown: true  },
  { icon: Briefcase,  label: "Industry",      placeholder: "e.g. SaaS, Fintech", hasDropdown: false },
  { icon: Users,      label: "Company Size",  placeholder: "e.g. 11–50",      hasDropdown: false },
  { icon: Briefcase,  label: "Job Title",     placeholder: "e.g. Head of Sales", hasDropdown: false },
  { icon: MapPin,     label: "Location",      placeholder: "e.g. United States", hasDropdown: false },
  { icon: User,       label: "First Name",    placeholder: "e.g. James",      hasDropdown: false },
  { icon: User,       label: "Last Name",     placeholder: "e.g. Anderson",   hasDropdown: false },
  { icon: Mail,       label: "Email",         placeholder: "e.g. @company.com", hasDropdown: false },
  { icon: Phone,      label: "Phone",         placeholder: "Include phone",   hasDropdown: false },
  { icon: Building2,  label: "Company Name",  placeholder: "e.g. TechCorp",   hasDropdown: false },
];

// ─── Mock search result rows ──────────────────────────────────────────────────
const RESULTS = [
  { name: "James Anderson",  title: "Head of Sales",       company: "TechCorp",     location: "New York, US",   email: true,  phone: false, linkedin: true  },
  { name: "Priya Sharma",    title: "VP of Marketing",     company: "GrowthLab",    location: "London, UK",     email: true,  phone: true,  linkedin: true  },
  { name: "Carlos Rivera",   title: "CEO",                 company: "Nexasys",      location: "Mumbai, IN",     email: true,  phone: false, linkedin: false },
  { name: "Emily Watson",    title: "Sales Director",      company: "BrandRise",    location: "Berlin, DE",     email: true,  phone: true,  linkedin: true  },
  { name: "Rajan Mehta",     title: "Founder",             company: "ScalePath",    location: "Bangalore, IN",  email: true,  phone: false, linkedin: true  },
];

// ─── Credit cost cards ────────────────────────────────────────────────────────
const CREDIT_COSTS = [
  { icon: Mail,  iconBg: "bg-blue-500",   label: "Email + LinkedIn",  cost: "5 credits",  desc: "Find verified email address and LinkedIn profile URL" },
  { icon: Phone, iconBg: "bg-orange-500", label: "Phone Number",      cost: "30 credits", desc: "Discover direct dial or mobile phone number" },
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
          <motion.div initial={{ opacity:0, y:-6, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-6, scale:0.97 }} transition={{ duration:0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How do I find leads by industry?" />
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LeadFinderPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("leadfinder-credits");
  const [searched, setSearched]           = useState(false);

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
                <motion.nav initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">App Section</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">LeadFinder</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">LeadFinder</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to use the 360Airo LeadFinder to discover high-quality prospects with
                    targeted filters, manage credits, and import leads directly into your campaigns.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Intro */}
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
                  className="text-sm text-gray-700 leading-relaxed mb-8">
                  The LeadFinder in 360Airo helps you discover high-quality prospects using targeted
                  filters. Finding and importing leads costs credits — manage your balance from the
                  top bar to ensure uninterrupted prospecting.
                </motion.p>

                {/* ── LeadFinder Credits ── */}
                <motion.div id="leadfinder-credits" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.12 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Lead Finder Credits</h2>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {CREDIT_COSTS.map((c, i) => {
                      const Icon = c.icon;
                      return (
                        <motion.div key={c.label} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                          transition={{ delay:0.12+i*0.07 }}
                          className="rounded-xl border border-gray-200 p-4 flex items-start gap-3 hover:shadow-sm transition">
                          <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-sm font-bold text-gray-900">{c.label}</p>
                              <span className="text-xs font-black text-white bg-blue-600 px-2 py-0.5 rounded-full">{c.cost}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <ul className="space-y-1.5">
                    {[
                      "Finding phone number costs 30 credits, while finding both email and LinkedIn costs 5 credits",
                      "Credits are deducted only when a valid result is returned — no charge for empty results",
                      "Buy additional credits any time from the top bar using the \"+ Add credits\" button",
                      "View your full credit usage history to track spending across your team",
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Left panel filters (with interactive mockup) ── */}
                <motion.div id="left-panel-filters" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.16 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Left panel lead filters:</h2>

                  {/* LeadFinder UI Mockup */}
                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md mb-5">

                    {/* Browser chrome */}
                    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-[7px] font-black">360</span>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">360Airo — LeadFinder</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                    </div>

                    {/* Top bar */}
                    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-gray-900">Lead Finder</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs">
                          <CreditCard className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">Credit Balance</span>
                          <span className="font-black text-blue-600">4,264</span>
                        </div>
                        <button className="text-xs text-blue-600 border border-blue-200 rounded-lg px-2.5 py-1.5 hover:bg-blue-50 transition">
                          See credit usage history
                        </button>
                        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
                          <PlusCircle className="w-3 h-3" /> Add credits
                        </button>
                      </div>
                    </div>

                    {/* Main layout */}
                    <div className="flex min-h-[420px] bg-gray-50">

                      {/* Left filters panel */}
                      <div className="w-48 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
                        <div className="px-3 py-2.5 border-b border-gray-100">
                          <span className="text-xs font-bold text-gray-700">Filters</span>
                        </div>
                        {FILTER_FIELDS.map((field, i) => {
                          const Icon = field.icon;
                          return (
                            <div key={field.label}
                              className="flex items-center justify-between px-3 py-2 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer group">
                              <div className="flex items-center gap-2 min-w-0">
                                <Icon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                <span className="text-xs text-gray-700 truncate">{field.label}</span>
                              </div>
                              <PlusCircle className="w-3 h-3 text-gray-300 group-hover:text-blue-500 transition flex-shrink-0" />
                            </div>
                          );
                        })}
                      </div>

                      {/* Center panel */}
                      <div className="flex-1 flex flex-col">
                        {/* Top actions bar */}
                        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSearched(true)}
                            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm">
                            <Download className="w-3 h-3" /> Import leads
                          </button>
                        </div>

                        {/* Results or empty state */}
                        <div className="flex-1 flex items-center justify-center p-6">
                          {!searched ? (
                            <div className="text-center">
                              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                                <Filter className="w-5 h-5 text-gray-400" />
                              </div>
                              <p className="text-sm text-gray-500">Select at least one filter from the left panel to find leads</p>
                            </div>
                          ) : (
                            <div className="w-full">
                              <div className="text-xs text-gray-500 mb-2 px-1">Showing {RESULTS.length} results</div>
                              <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                                {/* Results header */}
                                <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] px-3 py-2 bg-gray-50 border-b border-gray-100 text-[9px] font-bold text-gray-500 uppercase tracking-wider gap-2">
                                  <span>Name / Title</span><span>Company</span><span>Location</span><span>Email</span><span>Phone</span>
                                </div>
                                {RESULTS.map((r, ri) => (
                                  <div key={ri} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr] px-3 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition items-center gap-2">
                                    <div>
                                      <p className="text-xs font-semibold text-gray-800">{r.name}</p>
                                      <p className="text-[10px] text-gray-400">{r.title}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-600 truncate">{r.company}</span>
                                    <span className="text-[10px] text-gray-500 truncate">{r.location}</span>
                                    <div>{r.email
                                      ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                      : <span className="text-gray-300 text-[10px]">—</span>}
                                    </div>
                                    <div>{r.phone
                                      ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                      : <span className="text-gray-300 text-[10px]">—</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 mb-4">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>You must apply <strong>at least one filter</strong> before LeadFinder will return results. Use the interactive mockup above — click "Import leads" to preview results.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Apply filters ── */}
                <motion.div id="apply-filters" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply filters to target your ideal prospects:</h2>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:Building2, bg:"bg-blue-50",   color:"text-blue-600",   title:"Company Type",  desc:"Filter by business category — SaaS, Agency, E-commerce, Startup, Enterprise, and more" },
                      { icon:Briefcase, bg:"bg-violet-50", color:"text-violet-600", title:"Industry",      desc:"Target specific sectors like Technology, Finance, Healthcare, Marketing, or Manufacturing" },
                      { icon:Users,     bg:"bg-emerald-50",color:"text-emerald-600",title:"Company Size",  desc:"Filter by headcount — 1–10, 11–50, 51–200, 201–500, 500+ employees" },
                      { icon:Briefcase, bg:"bg-orange-50", color:"text-orange-600", title:"Job Title",     desc:"Find decision makers by role — CEO, VP of Sales, Head of Marketing, Founder, etc." },
                      { icon:MapPin,    bg:"bg-pink-50",   color:"text-pink-600",   title:"Location",      desc:"Target prospects by country, state, or city — great for geo-specific outreach" },
                      { icon:Mail,      bg:"bg-teal-50",   color:"text-teal-600",   title:"Email / Phone", desc:"Filter prospects who have verified email, phone number, or both available" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                          transition={{ delay:0.2+i*0.05 }}
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
                      ["Company type",  "Filter by business category"],
                      ["Industry",      "Target specific sectors"],
                      ["Company size",  "Filter by employee count"],
                      ["Job title",     "Find the right decision-makers"],
                      ["Location",      "Target prospects in specific regions or countries"],
                      ["First / Last name", "Search for a specific person by name"],
                      ["Email",         "Filter by confirmed email availability"],
                      ["Phone",         "Include only prospects with verified phone numbers"],
                      ["Company name",  "Search for prospects at a specific company"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Center panel results ── */}
                <motion.div id="center-panel-results" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Center panel search results:</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Once you apply at least one filter, the center panel displays a list of matching
                    prospects. Each result shows the contact's name, job title, company, location, and
                    data availability (email, phone, LinkedIn).
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:User,     bg:"bg-blue-50",   color:"text-blue-600",   title:"Name & Title",     desc:"Full name and job title of each matched prospect" },
                      { icon:Building2,bg:"bg-violet-50", color:"text-violet-600", title:"Company Info",      desc:"Company name, industry, and size where available" },
                      { icon:MapPin,   bg:"bg-orange-50", color:"text-orange-600", title:"Location",          desc:"City, country or region of each prospect" },
                      { icon:Mail,     bg:"bg-emerald-50",color:"text-emerald-600",title:"Email Available",   desc:"Green tick if a verified email address can be found" },
                      { icon:Phone,    bg:"bg-pink-50",   color:"text-pink-600",   title:"Phone Available",   desc:"Green tick if a phone number is available (costs 30 credits)" },
                      { icon:Zap,      bg:"bg-teal-50",   color:"text-teal-600",   title:"LinkedIn Profile",  desc:"Direct link to the prospect's LinkedIn profile" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                          transition={{ delay:0.25+i*0.05 }}
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

                <div className="border-t border-gray-200 my-8" />

                {/* ── Top bar credit management ── */}
                <motion.div id="top-bar-credits" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Top bar credit management:</h2>

                  {/* Credit bar mockup */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-white px-4 py-3 flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs">
                        <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-500">Credit Balance</span>
                        <span className="font-black text-blue-600 text-sm">4,264</span>
                      </div>
                      <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 rounded-lg px-3 py-2 hover:bg-blue-100 transition font-medium">
                        See credit usage history
                      </button>
                      <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition ml-auto">
                        <PlusCircle className="w-3.5 h-3.5" /> + Add credits
                      </button>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {[
                      ["Credit balance",       "Always visible at the top — shows your current available credits"],
                      ["Credit usage history", "Click to view a full log of when and how credits were spent across your team"],
                      ["Add credits",          "Top up your balance instantly using the \"+ Add credits\" button"],
                      ["Team credit sharing",  "Agency accounts share a single credit pool across all client workspaces"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Top right lead actions ── */}
                <motion.div id="top-right-actions" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Top right lead actions:</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Once your search returns results, use the action buttons in the top-right area of
                    the center panel to manage and import your discovered leads.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:Download,    bg:"bg-emerald-500", title:"Import Leads",       desc:"Push all selected results directly into your 360Airo Prospects list or into a specific campaign" },
                      { icon:Users,       bg:"bg-blue-500",    title:"Add to Campaign",    desc:"Enrol discovered leads straight into an active outreach sequence without leaving LeadFinder" },
                      { icon:Tag,         bg:"bg-violet-500",  title:"Tag Prospects",      desc:"Apply tags like Hot Lead or VIP to selected results before importing" },
                      { icon:BarChart2,   bg:"bg-orange-500",  title:"Export to CSV",      desc:"Download your search results as a CSV file for use in other tools or sharing with your team" },
                    ].map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.div key={action.title} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                          transition={{ delay:0.35+i*0.06 }}
                          className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition cursor-pointer group">
                          <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <Icon className="w-4.5 h-4.5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition">{action.title}</p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{action.desc}</p>
                            <span className="inline-flex items-center gap-1 mt-1.5 text-xs text-blue-600 font-medium group-hover:underline">
                              Learn more <ArrowUpRight className="w-3 h-3" />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Pro tip */}
                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> Use LeadFinder to build highly targeted lists, then immediately enrol them
                      in a Multichannel Drip sequence — combining Email + LinkedIn + Calling for the highest reply rates.
                    </span>
                  </div>
                </motion.div>

                {/* Footer timestamp */}
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