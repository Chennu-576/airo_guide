"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Users, Filter,
  PlusCircle, Download, Upload, Search, Mail, Linkedin, Phone,
  Tag, MoreHorizontal, CheckSquare, ArrowUpRight, Info, Globe,
  UserCheck, Building2, BarChart2, RefreshCw, Trash2, Settings,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "viewing-prospects",  label: "Viewing prospect information" },
  { id: "adding-prospects",   label: "Adding prospects" },
  { id: "filtering-prospects",label: "Filtering prospects" },
  { id: "managing-prospects", label: "Managing prospects" },
  { id: "bulk-actions",       label: "Bulk actions" },
];

// ─── Mock prospect rows ───────────────────────────────────────────────────────
const PROSPECTS = [
  { name: "James Anderson",  email: "james@techcorp.io",     company: "TechCorp",    linkedin: true,  campaign: "Cold Email Seq - 01", owner: "AS", domain: "techcorp.io",   status: "Approaching", selected: false },
  { name: "Sarah Mitchell",  email: "sarah@growthlab.com",   company: "GrowthLab",   linkedin: true,  campaign: "LinkedIn Drip - 03",  owner: "AS", domain: "growthlab.com", status: "Replied",     selected: false },
  { name: "Carlos Rivera",   email: "c.rivera@nexasys.com",  company: "Nexasys",     linkedin: false, campaign: "Cold Email Seq - 02", owner: "SH", domain: "",              status: "Approaching", selected: false },
  { name: "Priya Nair",      email: "priya@clrv.com",        company: "CLRV",        linkedin: true,  campaign: "Multichannel - 01",   owner: "SH", domain: "clrv.com",      status: "Opened",      selected: true  },
  { name: "David Chen",      email: "d.chen@infodyne.co",    company: "Infodyne",    linkedin: false, campaign: "Cold Email Seq - 01", owner: "AS", domain: "",              status: "Approaching", selected: false },
  { name: "Emily Watson",    email: "emily@brandrise.io",    company: "BrandRise",   linkedin: true,  campaign: "LinkedIn Drip - 02",  owner: "AS", domain: "",              status: "Unsubscribed",selected: false },
  { name: "Rajan Mehta",     email: "rajan@scalepath.com",   company: "ScalePath",   linkedin: false, campaign: "Cold Email Seq - 03", owner: "AS", domain: "",              status: "Approaching", selected: false },
];

const STATUS_STYLE: Record<string, string> = {
  Approaching:  "bg-blue-100 text-blue-700",
  Replied:      "bg-green-100 text-green-700",
  Opened:       "bg-violet-100 text-violet-700",
  Unsubscribed: "bg-red-100 text-red-600",
  Bounced:      "bg-orange-100 text-orange-600",
};

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
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }} transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How do I import prospects?" />
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
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
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
export default function ProspectsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("viewing-prospects");

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
              <div className="max-w-3xl">

                {/* Breadcrumb */}
                <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">App Section</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Prospects</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Prospects</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to use the 360Airo prospects section to manage, filter, and organise
                    your leads across all campaigns with bulk import and tracking features.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Intro */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  className="text-sm text-gray-700 leading-relaxed mb-8">
                  The prospects section is your master list of all contacts across campaigns. It helps
                  you manage, filter, and analyse prospect data in one centralised location for
                  efficient multichannel outreach.
                </motion.p>

                {/* ── Viewing prospects ── */}
                <motion.div id="viewing-prospects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Viewing prospect information:</h2>

                  {/* Prospects table mockup */}
                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md mb-5">

                    {/* Browser chrome */}
                    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-[7px] font-black">360</span>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">360Airo — Prospects</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                    </div>

                    {/* Table toolbar */}
                    <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-sm font-bold text-gray-900">Prospects</span>
                        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-500 bg-gray-50">
                          All prospects <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition">
                          <Download className="w-3 h-3" /> Save as row view
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border-b border-gray-100 px-4 py-2 flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-500 flex-1 min-w-[160px] max-w-xs">
                        <Search className="w-3 h-3 text-gray-400" /> Search prospects
                      </div>
                      <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
                        <Filter className="w-3 h-3 text-gray-400" /> Filters
                      </button>
                      <span className="text-xs text-gray-400">Showing 500 results</span>
                      <div className="ml-auto flex items-center gap-2">
                        <button className="flex items-center gap-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
                          <Settings className="w-3 h-3" /> Show columns
                        </button>
                        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
                          <PlusCircle className="w-3.5 h-3.5" /> Add prospects
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Count bar */}
                    <div className="bg-gray-50 border-b border-gray-100 px-4 py-1.5">
                      <span className="text-[10px] text-gray-500">Showing 1–500 of 1,511 items</span>
                    </div>

                    {/* Table header */}
                    <div className="grid grid-cols-[24px_2fr_2fr_1.2fr_1fr_2fr_1fr_1.2fr] bg-gray-50 border-b border-gray-200 px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider gap-2 items-center">
                      <CheckSquare className="w-3.5 h-3.5 text-gray-400" />
                      <span>Prospect & category</span>
                      <span>Contact info</span>
                      <span>Company</span>
                      <span>LinkedIn</span>
                      <span>Active campaigns</span>
                      <span>Owner</span>
                      <span>Domain</span>
                    </div>

                    {/* Rows */}
                    {PROSPECTS.map((p, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.04 }}
                        className={`grid grid-cols-[24px_2fr_2fr_1.2fr_1fr_2fr_1fr_1.2fr] px-4 py-2.5 border-b border-gray-50 last:border-0 items-center gap-2 text-xs transition
                          ${p.selected ? "bg-blue-50 hover:bg-blue-50" : "hover:bg-gray-50"}`}>
                        <input type="checkbox" defaultChecked={p.selected} className="w-3.5 h-3.5 accent-blue-600 rounded" />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${STATUS_STYLE[p.status] || "bg-gray-100 text-gray-500"}`}>
                            {p.status}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-blue-600 truncate">{p.email}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Mail className="w-2.5 h-2.5 text-green-500" />
                            <span className="text-[9px] text-green-600">Verified</span>
                          </div>
                        </div>
                        <span className="text-gray-600 truncate">{p.company}</span>
                        <div>
                          {p.linkedin
                            ? <Linkedin className="w-3.5 h-3.5 text-blue-700" />
                            : <span className="text-gray-300 text-[10px]">—</span>}
                        </div>
                        <span className="text-gray-500 truncate text-[10px]">{p.campaign}</span>
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-[9px] text-white font-bold">{p.owner}</span>
                        </div>
                        <span className="text-blue-500 truncate text-[10px]">{p.domain || "—"}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Inline bullet descriptions — exactly like your image */}
                  <div className="text-sm text-gray-700 leading-relaxed space-y-1">
                    <p>
                      <strong className="text-gray-900">Review prospect details</strong> — See names and status (Approaching, Replied, Opened, etc.)
                      <strong className="text-gray-900"> Check contact info</strong> — View verified email addresses and validation status
                      <strong className="text-gray-900"> Access company data</strong> — See organisation details and domains
                      <strong className="text-gray-900"> Monitor campaigns</strong> — View which active campaigns include each prospect
                      <strong className="text-gray-900"> Track ownership</strong> — See which team member owns each prospect
                    </p>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Adding prospects ── */}
                <motion.div id="adding-prospects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Adding prospects:</h2>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: PlusCircle, bg: "bg-blue-50",   color: "text-blue-600",   border: "border-blue-200",   title: "Add Manually",    desc: 'Click "Add prospects" and enter individual contact details directly' },
                      { icon: Upload,     bg: "bg-violet-50", color: "text-violet-600", border: "border-violet-200", title: "Upload via CSV",   desc: "Import bulk prospect lists using a formatted CSV file" },
                      { icon: Search,     bg: "bg-emerald-50",color: "text-emerald-600",border: "border-emerald-200",title: "Use LeadFinder",   desc: "Discover and add verified prospects directly from the built-in LeadFinder" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.06 }}
                          className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mb-2.5 shadow-sm">
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <p className={`text-sm font-bold ${item.color} mb-1`}>{item.title}</p>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {[
                      ['Click "Add prospects" button', "Located at the top right of the prospects list"],
                      ["Upload via CSV", "Import bulk lists using a formatted CSV — download our template for the correct column format"],
                      ["Add manually", "Enter individual prospect details — name, email, company, LinkedIn URL, and phone"],
                      ["Use third-party import", "Pull contacts directly from HubSpot, Salesforce, Pipedrive, or Clay"],
                      ["Use LeadFinder", "Search for verified business emails and company data without leaving 360Airo"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      360Airo automatically verifies email addresses when prospects are added.
                      Invalid or duplicate emails are flagged before adding to your list.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Filtering prospects ── */}
                <motion.div id="filtering-prospects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Filtering prospects:</h2>

                  {/* Filter options visual */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-700">Available Filters</span>
                    </div>
                    <div className="p-4 grid sm:grid-cols-2 gap-2">
                      {[
                        { label: "Status",           icon: UserCheck,  options: ["Approaching","Replied","Opened","Bounced","Unsubscribed"] },
                        { label: "Active Campaign",  icon: BarChart2,  options: ["Cold Email Seq - 01","LinkedIn Drip - 03","Multichannel - 01"] },
                        { label: "Owner",            icon: Users,      options: ["All team members","My prospects","Unassigned"] },
                        { label: "Company Domain",   icon: Globe,      options: ["Has domain","No domain","Custom domain filter"] },
                        { label: "Channel",          icon: Mail,       options: ["Email","LinkedIn","Phone","WhatsApp"] },
                        { label: "Tags",             icon: Tag,        options: ["Hot lead","Follow up","VIP","Not interested"] },
                      ].map((filter, i) => {
                        const Icon = filter.icon;
                        return (
                          <div key={filter.label} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition">
                            <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-3 h-3 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800">{filter.label}</p>
                              <p className="text-[10px] text-gray-400">{filter.options.slice(0,2).join(", ")}…</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {[
                      ["Filter by status",   "Show only Approaching, Replied, Opened, Bounced, or Unsubscribed prospects"],
                      ["Filter by campaign", "See all prospects enrolled in a specific outreach campaign"],
                      ["Filter by owner",    "View prospects assigned to specific team members or unassigned ones"],
                      ["Filter by channel",  "Find prospects being reached via Email, LinkedIn, Calling, or WhatsApp"],
                      ["Filter by tags",     "Use custom tags like Hot Lead, VIP, or Follow Up to segment your list"],
                      ["Search by name or email", "Use the search bar to quickly find any individual prospect"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Managing prospects ── */}
                <motion.div id="managing-prospects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Managing prospects:</h2>
                  <div className="space-y-3">
                    {[
                      { step:"01", title:"View prospect profile",    desc:"Click any prospect name to open their full profile — contact info, company details, active campaigns, email history, and LinkedIn activity." },
                      { step:"02", title:"Edit contact details",     desc:"Update name, email, phone, LinkedIn URL, company, and custom fields directly from the prospect profile." },
                      { step:"03", title:"Assign to team member",    desc:"Use the owner dropdown to assign any prospect to a specific team member for personalised follow-up." },
                      { step:"04", title:"Add tags",                 desc:"Tag prospects with labels like Hot Lead, VIP, or Follow Up to segment and prioritise your outreach list." },
                      { step:"05", title:"Remove from campaign",     desc:"Unenroll a prospect from a specific campaign without deleting them from your master prospects list." },
                      { step:"06", title:"Mark as unsubscribed",     desc:"Manually mark a prospect as unsubscribed to ensure they are excluded from all future outreach sequences." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Bulk actions ── */}
                <motion.div id="bulk-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Bulk actions</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Select multiple prospects using the checkboxes to perform actions on your entire selection at once.
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { icon: PlusCircle,  bg: "bg-blue-50",   color: "text-blue-600",   title: "Add to Campaign",    desc: "Enrol selected prospects into any active campaign sequence" },
                      { icon: Trash2,      bg: "bg-red-50",    color: "text-red-600",    title: "Delete Prospects",   desc: "Permanently remove selected prospects from your account" },
                      { icon: Download,    bg: "bg-emerald-50",color: "text-emerald-600",title: "Export to CSV",      desc: "Download a CSV file of all selected prospects and their data" },
                      { icon: Tag,         bg: "bg-violet-50", color: "text-violet-600", title: "Add / Remove Tags",  desc: "Apply or remove tags from multiple prospects simultaneously" },
                      { icon: Users,       bg: "bg-orange-50", color: "text-orange-600", title: "Reassign Owner",     desc: "Transfer ownership of selected prospects to another team member" },
                      { icon: RefreshCw,   bg: "bg-teal-50",   color: "text-teal-600",   title: "Re-verify Emails",  desc: "Run email verification again on all selected prospect addresses" },
                    ].map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.div key={action.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + i * 0.05 }}
                          className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition cursor-pointer group">
                          <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-4 h-4 ${action.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">{action.title}</p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{action.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Footer timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 14 days ago</span>
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