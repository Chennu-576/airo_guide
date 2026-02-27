"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail, Upload,
  Users, Search, Filter, RefreshCw, Star, Check, AlertCircle, Info,
  ArrowRight, ArrowLeft, CheckCircle2, BarChart2, Eye, Grid3x3,
  List, Tag, Building2, User, Phone, Globe, FileText, Zap, Target,
  LayoutGrid, Settings, X, PlusCircle, MousePointerClick, TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-is-email-list",  label: "What is an Email List" },
  { id: "email-lists-overview",label: "Email Lists overview dashboard" },
  { id: "upload-csv",          label: "Upload Email List (CSV)" },
  { id: "field-mapping",       label: "Field Mapping" },
  { id: "managing-lists",      label: "Managing your lists" },
  { id: "list-quality",        label: "List quality & data scores" },
];

// ─── Mock lists ───────────────────────────────────────────────────────────────
const LISTS = [
  { name:"Bulk SaaS Outreach", status:"active", quality:"good",  qualityColor:"text-orange-500", contacts:151, openRate:"40%", valid:151, duplicates:3,  gradient:"from-blue-500 to-violet-500" },
  { name:"Gmail Prospects",    status:"active", quality:"fair",  qualityColor:"text-red-500",    contacts:15,  openRate:"10%", valid:15,  duplicates:0,  gradient:"from-blue-500 to-pink-500"   },
  { name:"Warm Leads Q1",      status:"active", quality:"good",  qualityColor:"text-emerald-600",contacts:3,   openRate:"30%", valid:3,   duplicates:0,  gradient:"from-violet-500 to-blue-500" },
];

// ─── CSV preview data ─────────────────────────────────────────────────────────
const CSV_PREVIEW = [
  { name:"Emily Hasegawa",   email:"Emily.Leadflux@outloo..." },
  { name:"Michael King",     email:"Michael.Leadflux@outl..." },
  { name:"Sarah Hallquist",  email:"Sarah.Leadflux@outloo..." },
  { name:"Christopher Gerry",email:"Christopher.Leadflux@..." },
  { name:"Ashley Powers",    email:"Ashley.Leadflux@outlo..." },
];

// ─── Field mapping fields ─────────────────────────────────────────────────────
const MAPPING_FIELDS = [
  { icon:Mail,      iconBg:"bg-emerald-500", label:"Email Address", desc:"Primary email address (required)", required:true,  mapped:"Email",   status:"mapped"   },
  { icon:User,      iconBg:"bg-gray-400",    label:"First Name",    desc:"Contact's first name",             required:false, mapped:"First Name",        status:"mapped"  },
  { icon:User,      iconBg:"bg-gray-400",    label:"Last Name",     desc:"Contact's last name",              required:false, mapped:"Last Name",        status:"mapped"  },
  { icon:Tag,       iconBg:"bg-gray-400",    label:"Title",         desc:"Job title or professional position",required:false,mapped:"job title",        status:"mapped"  },
  { icon:Building2, iconBg:"bg-blue-500",    label:"Company Name",  desc:"Company or organisation name",     required:false, mapped:"Company", status:"mapped"   },
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
              placeholder="e.g. How do I upload a CSV list?" />
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

// ─── Email Lists Dashboard Mockup (Image 1) ───────────────────────────────────
function EmailListsDashboardMockup() {
  const [view, setView] = useState<"grid"|"list">("grid");
  const [search, setSearch] = useState("");

  const STATS = [
    { label:"Total Lists",     val:"5",   sub:"Active campaigns",    color:"text-blue-600",    icon:"🗂️",  bg:"bg-blue-50"    },
    { label:"Total Contacts",  val:"180", sub:"Valid contacts",      color:"text-teal-600",    icon:"👥",  bg:"bg-teal-50"    },
    { label:"This Month",      val:"+20",  sub:"New additions",       color:"text-violet-600",  icon:"📈",  bg:"bg-violet-50"  },
    { label:"Avg. Quality",    val:"52%", sub:"Data quality score",  color:"text-amber-600",   icon:"⭐",  bg:"bg-amber-50"   },
    { label:"Open Rate",       val:"40%",  sub:"Average opens",       color:"text-rose-600",    icon:"✉️",  bg:"bg-rose-50"    },
    { label:"Click Rate",      val:"24%",  sub:"Average clicks",      color:"text-cyan-600",    icon:"🎯",  bg:"bg-cyan-50"    },
  ];

  const filtered = LISTS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BrowserFrame title="360Airo — Email Lists">
      <div className="bg-gray-50 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">Email Lists</h3>
              <p className="text-xs text-gray-400">Welcome back! Manage your email campaigns</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
            <button className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-90 transition shadow-md">
              <Upload className="w-3 h-3" /> Upload Email List
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
          {STATS.map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-white p-3 shadow-sm`}>
              <div className="flex items-center justify-between mb-1">
                <p className={`text-[9px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</p>
                <span className="text-sm">{s.icon}</span>
              </div>
              <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
              <p className="text-[9px] text-gray-500">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex-1 min-w-[180px] flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-400 shadow-sm">
            <Search className="w-3.5 h-3.5 flex-shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search lists by name, description, or tags…"
              className="bg-transparent outline-none flex-1 text-gray-600 placeholder-gray-300" />
          </div>
          <div className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm">
            All Status <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <Filter className="w-3 h-3" /> Filters
          </button>
          <div className="ml-auto flex rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            <button onClick={() => setView("grid")}
              className={`flex items-center gap-1 px-3 py-2 text-xs transition ${view==="grid"?"bg-gray-900 text-white":"text-gray-500 hover:bg-gray-50"}`}>
              <LayoutGrid className="w-3.5 h-3.5" /> Grid
            </button>
            <button onClick={() => setView("list")}
              className={`flex items-center gap-1 px-3 py-2 text-xs border-l border-gray-200 transition ${view==="list"?"bg-gray-900 text-white":"text-gray-500 hover:bg-gray-50"}`}>
              <List className="w-3.5 h-3.5" /> List
            </button>
          </div>
        </div>

        {/* Cards / List */}
        {view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((list, i) => (
              <motion.div key={list.name} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                transition={{ delay:i*0.06 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group">
                {/* Gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${list.gradient}`} />
                <div className="p-4">
                  {/* Status badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">active</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1
                      ${list.quality==="good"?"bg-emerald-50 text-emerald-600":list.quality==="fair"?"bg-amber-50 text-amber-600":"bg-red-50 text-red-500"}`}>
                      {list.quality==="good" ? <CheckCircle2 className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />}
                      {list.quality}
                    </span>
                  </div>
                  <p className={`text-base font-black mb-0.5 group-hover:text-blue-600 transition ${list.quality==="poor"?"text-blue-500":list.quality==="good"?"text-gray-900":"text-gray-900"}`}>
                    {list.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mb-3">No description provided</p>
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-100">
                      <p className="text-lg font-black text-blue-700">{list.contacts}</p>
                      <p className="text-[9px] text-blue-500 font-semibold">Valid Contacts</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-2.5 text-center border border-emerald-100">
                      <p className="text-lg font-black text-emerald-600">{list.openRate}</p>
                      <p className="text-[9px] text-emerald-500 font-semibold">Open Rate</p>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="border-t border-gray-100 pt-2.5 flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs font-black text-blue-600">{list.valid}</p>
                      <p className="text-[9px] text-gray-400">Valid</p>
                    </div>
                    {list.duplicates > 0 && (
                      <div className="text-center">
                        <p className="text-xs font-black text-orange-500">{list.duplicates}</p>
                        <p className="text-[9px] text-gray-400">Duplicates</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-[9px] font-bold text-gray-500 uppercase tracking-wider gap-2">
              <span>List Name</span><span>Status</span><span>Contacts</span><span>Open Rate</span><span>Quality</span>
            </div>
            {filtered.map((list, i) => (
              <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${list.gradient}`} />
                  <span className="text-xs font-semibold text-gray-800">{list.name}</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full w-fit">{list.status}</span>
                <span className="text-xs font-bold text-blue-600">{list.contacts}</span>
                <span className="text-xs text-gray-500">{list.openRate}</span>
                <span className={`text-[10px] font-bold ${list.quality==="good"?"text-emerald-600":list.quality==="fair"?"text-amber-600":"text-red-500"}`}>{list.quality}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

// ─── Upload CSV Mockup (Image 2) ──────────────────────────────────────────────
function UploadCSVMockup() {
  const [listName, setListName] = useState("My Airo Campaign List");
  const [desc, setDesc] = useState("");
  const [uploaded, setUploaded] = useState(false);

  return (
    <BrowserFrame title="360Airo — Upload Email List">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Email Lists
          </button>
          <span className="text-gray-300">|</span>
          <div>
            <p className="text-sm font-bold text-gray-900">Upload Email List</p>
            <p className="text-[10px] text-gray-400">Import contacts from CSV file</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Settings className="w-3.5 h-3.5" /> Dashboard
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-gray-500">Progress</span>
        <span className="text-[10px] text-gray-400">Step 1 of 2</span>
      </div>
      <div className="h-1.5 bg-gray-200">
        <div className="h-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all" style={{ width:"50%" }} />
      </div>

      <div className="bg-gray-50 p-5">
        <div className="grid lg:grid-cols-[1fr_280px] gap-4">
          {/* Left */}
          <div className="space-y-4">
            {/* List Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 mb-0.5">List Information</h4>
              <p className="text-xs text-gray-400 mb-4">Basic details about your email list</p>

              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">List Name</label>
                <input value={listName} onChange={e => setListName(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 text-gray-800" />
                {listName.trim().length > 2 && (
                  <p className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Looks good
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)}
                  placeholder="Describe the purpose of this list…"
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 text-gray-600 placeholder-gray-300 resize-none" />
              </div>
            </div>

            {/* Upload CSV */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 mb-0.5">Upload CSV File</h4>
              <p className="text-xs text-gray-400 mb-4">Select your CSV file containing contact information</p>

              {!uploaded ? (
                <div onClick={() => setUploaded(true)}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center text-center hover:border-blue-300 hover:bg-blue-50/30 transition cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-sm font-semibold text-gray-600">Drop your CSV here or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">Supports .csv files up to 10MB</p>
                  <button className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">
                    Browse File
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">contacts_list.csv</p>
                        <p className="text-[10px] text-gray-500">5 rows • 5 columns</p>
                      </div>
                    </div>
                    <button onClick={() => setUploaded(false)}>
                      <X className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[["5","Rows"],["5","Columns"],["5","KB"]].map(([val, label]) => (
                      <div key={label} className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                        <p className="text-base font-black text-blue-600">{val}</p>
                        <p className="text-[9px] text-gray-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold py-3.5 rounded-xl hover:opacity-90 transition shadow-md">
              Continue to Field Mapping <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-gray-400">Ready to map 5 contacts</p>
          </div>

          {/* Right Preview */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-0.5">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Preview</span>
              </div>
              <p className="text-[10px] text-gray-400 mb-3">Live preview of your data</p>

              {uploaded ? (
                <>
                  <div className="mb-2">
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Columns (5)</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Prospect Name","Email","Company","Subject","Email Body"].map(col => (
                        <span key={col} className="text-[9px] border border-gray-200 rounded-md px-2 py-0.5 text-gray-600">{col}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 overflow-hidden mb-3">
                    <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200 px-3 py-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider gap-2">
                      <span>Prospect Name</span><span>Email</span>
                    </div>
                    {CSV_PREVIEW.map((row, i) => (
                      <div key={i} className="grid grid-cols-2 px-3 py-1.5 border-b border-gray-50 last:border-0 text-[10px] gap-2">
                        <span className="text-gray-700 truncate">{row.name}</span>
                        <span className="text-blue-500 truncate">{row.email}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-100">
                      <p className="text-xl font-black text-blue-600">5</p>
                      <p className="text-[9px] text-blue-500 font-semibold">Contacts</p>
                    </div>
                    <div className="bg-violet-50 rounded-xl p-2.5 text-center border border-violet-100">
                      <p className="text-xl font-black text-violet-600">5</p>
                      <p className="text-[9px] text-violet-500 font-semibold">Fields</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="w-8 h-8 text-gray-200 mb-2" />
                  <p className="text-xs text-gray-400">Upload a CSV to preview your data</p>
                </div>
              )}
            </div>

            {/* Upload limit */}
            <div className="bg-white rounded-xl border border-amber-200 p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-800 mb-2">Total Upload Limit</p>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-black text-gray-800">180/100</span>
                <span className="text-xs font-bold text-red-500">185%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-red-500 rounded-full w-full" />
              </div>
              <p className="text-[9px] text-gray-500 mb-0.5">180 used • 5 in this file • 0 remaining</p>
              <div className="flex items-center gap-1 text-[9px] text-amber-600 font-semibold">
                <AlertCircle className="w-3 h-3" /> Upload limit reached
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2">Credits</p>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Contact Upload Limit</span>
                <span className="font-bold text-red-500">180/100</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Field Mapping Mockup (Image 3) ──────────────────────────────────────────
function FieldMappingMockup() {
  const [mappings, setMappings] = useState<Record<string, string>>({
    "Email Address": "Email",
    "First Name": "",
    "Last Name": "",
    "Title": "",
    "Company Name": "Company",
  });

  const OPTIONS = ["", "Email", "First Name", "Last Name", "Company", "Phone", "Job Title", "Location", "LinkedIn URL"];

  const mapped = Object.values(mappings).filter(v => v !== "").length;
  const total = MAPPING_FIELDS.length;

  return (
    <BrowserFrame title="360Airo — Field Mapping">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-gray-500">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Upload
          </button>
          <span className="text-gray-300">|</span>
          <div>
            <p className="text-sm font-bold text-gray-900">Field Mapping</p>
            <p className="text-[10px] text-gray-400">5 rows • 5 columns • 13 contact fields</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Mapping Progress</span>
          <span className="text-gray-500 font-semibold">Step 2 of 2</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200">
        <div className="h-full bg-gradient-to-r from-blue-600 to-violet-600" style={{ width:"100%" }} />
      </div>

      <div className="bg-gray-50 p-5">
        {/* Contact limit info */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-[10px] text-blue-700 mb-4">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span><strong>Contact limit:</strong> 1000/12500 contacts used. After this upload: 1005/12500.</span>
        </div>

        {/* File info */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-2.5 mb-4 shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs font-bold text-gray-800">contacts_list.csv</p>
              <p className="text-[9px] text-gray-400">4.6 KB • Creating "My Airo Campaign List"</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{total} Fields Available</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-4">
          {/* Left — mapping form */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-0.5">Map CSV Columns to Contact Fields</h4>
            <p className="text-xs text-gray-400 mb-4">Connect each CSV column to the appropriate contact field. Smart auto-mapping has been applied.</p>

            <div className="space-y-2">
              {MAPPING_FIELDS.map((field) => {
                const Icon = field.icon;
                const currentVal = mappings[field.label] || "";
                const isMapped = currentVal !== "";
                return (
                  <div key={field.label}
                    className={`rounded-xl border p-3 bg-white transition ${field.required ? "border-emerald-200 bg-emerald-50/40" : isMapped ? "border-blue-200" : "border-gray-200"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-lg ${field.iconBg} flex items-center justify-center`}>
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-gray-800">{field.label}</p>
                          {field.required && (
                            <span className="text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full">Required</span>
                          )}
                          {isMapped && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />}
                        </div>
                        <p className="text-[9px] text-gray-400">{field.desc}</p>
                      </div>
                    </div>
                    <select
                      value={currentVal}
                      onChange={e => setMappings(prev => ({ ...prev, [field.label]: e.target.value }))}
                      className={`w-full text-xs border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 transition
                        ${isMapped ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 bg-gray-50"}`}>
                      <option value="">✕ Skip this field</option>
                      {OPTIONS.filter(o => o !== "").map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-3">
            {/* Mapping Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-900">Mapping Status</span>
              </div>
              {[
                { label:"Fields Mapped",    val:`${mapped} of ${total}` },
                { label:"Required Fields",  val:"Complete", badge:true },
                { label:"Total Rows",       val:"5" },
                { label:"Contact Limit",    val:"1000/12500" },
                { label:"Remaining",        val:"11500 contacts", dark:true },
                { label:"Progress",         val:`${Math.round((mapped/total)*100)}%` },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] text-gray-500">{item.label}</span>
                  {item.badge
                    ? <span className="text-[9px] font-black bg-gray-900 text-white px-2 py-0.5 rounded-full">Complete</span>
                    : item.dark
                    ? <span className="text-[9px] font-black bg-gray-900 text-white px-2 py-0.5 rounded-full">{item.val}</span>
                    : <span className="text-[10px] font-bold text-gray-800">{item.val}</span>
                  }
                </div>
              ))}
              {mapped < total && (
                <div className="mt-2 flex items-start gap-1.5 text-[9px] text-blue-600">
                  <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{total - mapped} optional fields unmapped. Map them for better email personalisation.</span>
                </div>
              )}
            </div>

            {/* Data Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-violet-500" />
                <span className="text-sm font-bold text-gray-900">Data Preview</span>
              </div>
              <p className="text-[10px] text-gray-400 mb-3">Sample of mapped contact data</p>
              <div className="space-y-2">
                {[
                  { email:"Emily.Leadflux@outlook.com",  company:"ELS Architecture and Urban…", size:"ELS Architecture and Urban D…" },
                  { email:"Michael.Leadflux@outlook.c…", company:"Schlouch Incorporated",        size:"Schlouch Incorporated" },
                  { email:"Sarah.Leadflux@outlook.com",  company:"HPM, Inc.",                    size:"HPM, Inc." },
                ].map((row, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 p-2.5 bg-gray-50 text-[9px] space-y-1">
                    <div className="flex items-start gap-2">
                      <Mail className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div><span className="text-gray-400">Email Address: </span><span className="font-semibold text-gray-700">{row.email}</span></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building2 className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div><span className="text-gray-400">Company Name: </span><span className="font-semibold text-gray-700">{row.company}</span></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div><span className="text-gray-400">Employee Size: </span><span className="font-semibold text-gray-700">{row.size}</span></div>
                    </div>
                  </div>
                ))}
                <p className="text-[9px] text-center text-gray-400">Showing 3 of 5 rows</p>
              </div>
            </div>

            {/* Create button */}
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold py-3 rounded-xl hover:opacity-90 transition shadow-md">
              <Zap className="w-4 h-4" /> Create Email List
            </button>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmailListPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-email-list");

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
      o.observe(el);
      obs.push(o);
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
                  <span className="text-gray-700 font-medium">Email List</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Email List</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to manage your email lists in 360Airo — view list quality scores, upload
                    contacts via CSV, map your data fields, and organise your audiences for campaigns.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* What is an email list */}
                <motion.div id="what-is-email-list" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    An <strong>Email List</strong> in 360Airo is a saved collection of contacts that you target with your campaigns.
                    Each list tracks contact quality, open rates, duplicates, and data completeness — helping you understand
                    the health of your audience before you send.
                  </p>

                  {/* 3 concept cards */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Mail,      bg:"bg-blue-50",   color:"text-blue-600",   border:"border-blue-200",   title:"Upload & Organise",  desc:"Import contacts from CSV and organise them into named lists for each campaign" },
                      { icon:BarChart2, bg:"bg-violet-50", color:"text-violet-600", border:"border-violet-200", title:"Track Quality",       desc:"Each list shows a quality score — Good, Fair, or Poor — based on email validity and duplicates" },
                      { icon:Target,    bg:"bg-emerald-50",color:"text-emerald-600",border:"border-emerald-200",title:"Target Campaigns",    desc:"Select your list as the target audience when creating any campaign in 360Airo" },
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
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Overview dashboard */}
                <motion.div id="email-lists-overview" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Lists overview dashboard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The Email Lists page gives you a complete view of all your saved contact lists, their quality scores,
                    contact counts, and open rates. Switch between Grid and List views. Click the mockup to explore — try switching views and searching.
                  </p>

                  <div className="mb-5"><EmailListsDashboardMockup /></div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:BarChart2, bg:"bg-blue-50",   color:"text-blue-600",   title:"Stats Overview",   desc:"Six summary cards at the top show Total Lists, Total Contacts, This Month additions, Average Quality, Open Rate, and Click Rate across all lists" },
                      { icon:LayoutGrid,bg:"bg-violet-50", color:"text-violet-600", title:"Grid / List View", desc:"Toggle between Grid view (visual cards with contact stats) and List view (compact rows) using the top-right toggle" },
                      { icon:Search,    bg:"bg-emerald-50",color:"text-emerald-600",title:"Search & Filter",  desc:"Search lists by name, description, or tags. Filter by status (active, paused, archived) or apply custom filters" },
                      { icon:TrendingUp,bg:"bg-orange-50", color:"text-orange-600", title:"Quality Badges",   desc:"Each card shows a quality badge: Good (green), Fair (amber), or Poor (red) — based on valid email percentage and duplicate count" },
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

                {/* Upload CSV */}
                <motion.div id="upload-csv" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Upload Email List (CSV)</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Click <strong>Upload Email List</strong> from the Email Lists dashboard to begin. Step 1 of 2 lets you
                    name your list and upload a CSV file. Try clicking the upload zone in the mockup below.
                  </p>

                  <div className="mb-5"><UploadCSVMockup /></div>

                  <ul className="space-y-2 mb-4">
                    {[
                      ["List Name","Give your list a clear, descriptive name — e.g. \"Q1 SaaS Outreach\" or \"Warm Leads March 2026\". 360Airo will validate the name and show a green 'Looks good' confirmation"],
                      ["Description (Optional)","Add context about the list's purpose — useful for teams managing multiple campaigns across lists"],
                      ["Upload CSV","Drop your CSV file into the upload zone or click Browse File. 360Airo supports .csv files up to 10MB and shows a live file summary: rows, columns, and file size"],
                      ["Preview panel","The right-hand Preview panel shows a live sample of your data including detected columns and the first 5 rows"],
                      ["Upload Limit","Your Contact Upload Limit is shown in the preview panel — if you exceed it, 360Airo shows a warning before you proceed"],
                      ["Continue to Field Mapping","Once your CSV is uploaded, click Continue to Field Mapping to proceed to Step 2"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CSV format tip */}
                  <div className="bg-gray-900 rounded-xl p-4 mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Recommended CSV format:</p>
                    <p className="text-xs text-green-400 font-mono">Email, First Name, Last Name, Company, Job Title, Phone, LinkedIn URL</p>
                    <p className="text-[10px] text-gray-500 mt-2">→ Row 1 should be your column headers. Each row below is one contact.</p>
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Email column is required.</strong> All other columns (First Name, Company, etc.) are optional but improve
                      AI personalisation quality significantly. Add as many data columns as you have available.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Field Mapping */}
                <motion.div id="field-mapping" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.25 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-black">2</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Field Mapping</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Step 2 maps each column from your CSV to a 360Airo contact field. Smart auto-mapping is applied
                    automatically — you review and adjust. Change any dropdown in the mockup below to see it update live.
                  </p>

                  <div className="mb-5"><FieldMappingMockup /></div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon:Mail,     bg:"bg-emerald-50",color:"text-emerald-600",title:"Email Address (Required)", desc:"This is the only required field. Every contact must have a valid email address — it is the primary identifier in 360Airo" },
                      { icon:Check,    bg:"bg-blue-50",   color:"text-blue-600",   title:"Smart Auto-Mapping",      desc:"360Airo automatically detects common column names (Email, First Name, Company, etc.) and maps them for you — saving manual effort" },
                      { icon:X,        bg:"bg-gray-100",  color:"text-gray-500",   title:"Skip this field",         desc:"If a column in your CSV isn't needed or doesn't match a contact field, select 'Skip this field' to ignore it during import" },
                      { icon:Eye,      bg:"bg-violet-50", color:"text-violet-600", title:"Data Preview panel",      desc:"The right panel shows a sample of how your data will look after mapping — verify names, companies, and emails look correct before creating the list" },
                      { icon:Settings, bg:"bg-orange-50", color:"text-orange-600", title:"Mapping Status",          desc:"Tracks how many fields are mapped, required field completion, total rows, contact limit, and remaining capacity" },
                      { icon:Zap,      bg:"bg-teal-50",   color:"text-teal-600",   title:"Create Email List",       desc:"Click Create Email List once you are satisfied with your field mapping — the contacts are imported and the list is created immediately" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
                          transition={{ delay:0.25+i*0.05 }}
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
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Managing lists */}
                <motion.div id="managing-lists" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing your lists</h2>
                  <div className="space-y-3">
                    {[
                      { step:"01", title:"Open a list",          desc:"Click any list card to open the full list view — see all contacts, their email status, campaign activity, and quality details." },
                      { step:"02", title:"Add contacts",         desc:"Upload additional contacts to an existing list by clicking the list and using the Add Contacts or Upload CSV button inside the list view." },
                      { step:"03", title:"Remove duplicates",    desc:"360Airo automatically detects and flags duplicate email addresses within a list. Use the Duplicates filter to review and remove them." },
                      { step:"04", title:"Archive or delete",    desc:"Lists that are no longer in use can be archived (hidden from view but preserved) or deleted permanently from the list settings menu." },
                      { step:"05", title:"Use in a campaign",    desc:"When creating any campaign, select this list as the Target Audience in Step 1 — Campaign Details." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                        transition={{ delay:0.3+i*0.05 }}
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

                {/* List quality */}
                <motion.div id="list-quality" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">List quality & data scores</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    360Airo assigns a quality score to every email list based on the validity and completeness of the
                    contact data. Higher quality lists lead to better deliverability and personalisation results.
                  </p>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-2.5">Quality Score</div>
                      <div className="px-4 py-2.5 border-x border-gray-200">What it means</div>
                      <div className="px-4 py-2.5">What to do</div>
                    </div>
                    {[
                      ["✅ Good",   "bg-emerald-50 text-emerald-700","90%+ valid emails, low duplicates, strong data completeness","Ready to send — use this list with confidence for AI or manual campaigns"],
                      ["⚠️ Fair",  "bg-amber-50 text-amber-700",   "60–89% valid emails or moderate duplicates","Review and clean your list — remove invalid emails and duplicates before sending"],
                      ["❌ Poor",  "bg-red-50 text-red-600",       "Under 60% valid emails, many duplicates, or incomplete data","Re-verify and re-import — using this list risks hurting your sender reputation"],
                    ].map(([label, cls, meaning, action]) => (
                      <div key={label} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 text-xs ${cls}`}>
                        <div className={`px-4 py-3 font-bold`}>{label}</div>
                        <div className="px-4 py-3 border-x border-gray-100 text-gray-600">{meaning}</div>
                        <div className="px-4 py-3 text-gray-600">{action}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 mb-4">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Deliverability tip:</strong> Always aim for a Good quality score before launching a campaign.
                      Sending to lists with many invalid emails increases your bounce rate and can damage your sender reputation,
                      causing future emails to land in spam.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> The more contact fields you include in your CSV (first name, company, job title,
                      location), the better 360Airo's AI can personalise emails for each contact — improving reply rates even on
                      manual campaigns that use personalisation variables.
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