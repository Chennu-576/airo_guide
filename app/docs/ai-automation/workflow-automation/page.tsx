"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Zap,
  CheckCircle2, AlertCircle, Info, Star, Settings, Trash2,
  Search, Plus, RefreshCw, GitBranch, BarChart2,
  Activity, Play, Save, Maximize2, ZoomIn, ZoomOut, X,
  Brain, Layers, Target, Timer, Mail, Phone, Linkedin,
  Users, MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-is-workflow-automation", label: "What is Workflow Automation" },
  { id: "my-workflows-dashboard",      label: "My Workflows dashboard" },
  { id: "create-new-workflow",         label: "Create a new workflow" },
  { id: "automation-builder",          label: "Automation Builder" },
  { id: "node-types",                  label: "Node types" },
  { id: "workflow-templates",          label: "Workflow templates" },
  { id: "execute-monitor",             label: "Execute & monitor" },
  { id: "best-practices",              label: "Best practices" },
];

function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-violet-400 hover:text-violet-600 bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0,y:-6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
            exit={{ opacity:0,y:-6,scale:0.97 }} transition={{ duration:0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200"
              placeholder="e.g. How do I build a LinkedIn workflow?" />
            <button className="mt-2 w-full py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 transition">Ask</button>
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
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On this page</span>
          </div>
          <nav className="py-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior:"smooth" }); }}
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id
                    ? "text-violet-600 font-semibold bg-violet-50 border-r-2 border-violet-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function ScreenFrame({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {url && <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-500 font-mono truncate">🔒 {url}</div>}
      </div>
      {children}
    </div>
  );
}

function NodeTypeBadge({ type }: { type: "TRIGGER"|"DATA"|"AI"|"LOGIC"|"ACTION" }) {
  const MAP = {
    TRIGGER:"bg-blue-100 text-blue-700",
    DATA:   "bg-emerald-100 text-emerald-700",
    AI:     "bg-violet-100 text-violet-700",
    LOGIC:  "bg-amber-100 text-amber-700",
    ACTION: "bg-pink-100 text-pink-700",
  };
  return <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${MAP[type]}`}>{type}</span>;
}

// ─── MOCKUP 1: My Workflows Dashboard ─────────────────────────────────────────
function WorkflowsDashboardMockup() {
  const [tab, setTab]       = useState<"All"|"Active"|"Archived">("All");
  const [search, setSearch] = useState("");

  const WORKFLOWS = [
    { name:"LinkedIn Outreach",    nodes:6, status:"Active",   executions:24, lastRun:"2 hours ago", color:"bg-blue-600",   icon:"🔗", channels:["LinkedIn","SMS"] },
    { name:"Cold Email Follow-Up", nodes:4, status:"Active",   executions:87, lastRun:"30 min ago",  color:"bg-violet-600", icon:"📧", channels:["Email"]          },
    { name:"Prospect Re-engage",   nodes:5, status:"Archived", executions:12, lastRun:"3 days ago",  color:"bg-gray-400",   icon:"♻️", channels:["Email","LinkedIn"] },
  ];

  const filtered = WORKFLOWS.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) &&
    (tab === "All" || w.status === tab)
  );

  const STATS = [
    { label:"TOTAL WORKFLOWS",    icon:Zap,           iconBg:"bg-blue-100",   iconColor:"text-blue-600"   },
    { label:"EMAIL REPLIES SENT", icon:MessageSquare, iconBg:"bg-emerald-100",iconColor:"text-emerald-600" },
    { label:"REQUESTS SENT",      icon:Linkedin,      iconBg:"bg-indigo-100", iconColor:"text-indigo-600"  },
    { label:"TOTAL EXECUTIONS",   icon:Play,          iconBg:"bg-amber-100",  iconColor:"text-amber-600"   },
  ];

  return (
    <ScreenFrame url="app.360airo.com/ai-automation">
      <div className="bg-[#f4f6fb] p-5">
        {/* Command centre */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-sm">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1 mb-2 shadow-sm">
                <Activity className="w-3 h-3 text-teal-500" /> Automation Command Center
              </div>
              <h3 className="text-2xl font-black text-gray-900">My Workflows</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monitor runs, accounts, and performance from one place</p>
            </div>
            <button className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow hover:bg-gray-800 transition flex-shrink-0">
              <Plus className="w-3.5 h-3.5" /> Create New Automation
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {STATS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider leading-tight">{s.label}</p>
                  <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${s.iconColor}`} />
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-900">0</p>
              </div>
            );
          })}
        </div>

        {/* Search + tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 py-3 flex-wrap gap-y-2">
            <div className="flex-1 min-w-[160px] flex items-center gap-2 text-gray-400">
              <Search className="w-4 h-4 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Search workflows…" />
            </div>
            <div className="flex items-center rounded-xl overflow-hidden border border-gray-200">
              {(["All","Active","Archived"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`text-xs font-bold px-4 py-2 transition-all ${tab===t?"bg-gray-900 text-white":"text-gray-500 hover:bg-gray-50"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">Loading workflows…</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((w, i) => (
                <motion.div key={w.name} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.05 }}
                  className="px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50 transition flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${w.color} flex items-center justify-center text-base shadow-sm flex-shrink-0`}>{w.icon}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900">{w.name}</p>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${w.status==="Active"?"text-emerald-700 bg-emerald-100":"text-gray-500 bg-gray-100"}`}>{w.status}</span>
                        <span className="text-[9px] text-gray-400 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">{w.nodes} nodes</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-400 flex-wrap">
                        <span>Executions: <strong className="text-gray-700">{w.executions}</strong></span>
                        <span>Last run: <strong className="text-gray-700">{w.lastRun}</strong></span>
                        {w.channels.map(c => (
                          <span key={c} className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-full border border-blue-100">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-violet-50 hover:border-violet-300 transition"><Play className="w-3 h-3 text-gray-400" /></button>
                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"><Settings className="w-3 h-3 text-gray-400" /></button>
                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition"><Trash2 className="w-3 h-3 text-gray-400" /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 2: Empty Builder with Templates panel ─────────────────────────────
function EmptyBuilderMockup() {
  const [selectedTemplate, setSelectedTemplate] = useState<string|null>(null);
  const [nodeFilter, setNodeFilter]             = useState("All (11)");
  const [nodeSearch, setNodeSearch]             = useState("");

  const TEMPLATES = [
    { emoji:"🚀", name:"Complete Email Automati…", steps:6, desc:"End-to-end automated email response flow" },
    { emoji:"⚡", name:"Quick Email Reply",         steps:4, desc:"Fast automated email responses"          },
    { emoji:"🔗", name:"LinkedIn Outreach",         steps:6, desc:"Invite first, then check acceptance and send follow-up" },
  ];

  const SIDEBAR_NODES = [
    { label:"Campaign",        sub:"Select campaign",    type:"TRIGGER" as const, icon:Target    },
    { label:"Fetch Responses", sub:"Get responses",      type:"DATA" as const,    icon:RefreshCw },
    { label:"Delay",           sub:"Wait period",        type:"LOGIC" as const,   icon:Timer     },
    { label:"AI Mail Draft",   sub:"Generate email reply",type:"AI" as const,     icon:Brain     },
    { label:"Send Email",      sub:"Send email",         type:"ACTION" as const,  icon:Mail      },
    { label:"Send LinkedIn",   sub:"Send connection",    type:"ACTION" as const,  icon:Linkedin  },
    { label:"Send SMS",        sub:"Twilio SMS",         type:"ACTION" as const,  icon:Phone     },
  ];

  const FILTERS = ["All (11)","Trigger (2)","Data (1)","Ai (2)","Logic (1)","Action (5)"];

  return (
    <ScreenFrame url="app.360airo.com/ai-automation/builder/new">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm font-black text-gray-900">Unified Automation</p>
          <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full border border-gray-200">0 nodes</span>
          <div className="flex-1" />
          <Search className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700" />
        </div>
        <div className="px-4 pb-2.5 flex items-center gap-2 flex-wrap">
          <p className="text-xs text-gray-400">Add nodes to visualize workflow path.</p>
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
            <AlertCircle className="w-3 h-3" /> Setup 1/5
          </span>
          <span className="text-[10px] text-gray-400 hidden sm:inline">Missing: List selected • LinkedIn account selected • Connection node added • Follow-up configured</span>
        </div>
      </div>

      <div className="flex h-[440px]">
        {/* Left panel */}
        <div className="w-56 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          {/* Templates */}
          <div className="border-b border-gray-100">
            <div className="px-4 py-3 flex items-center justify-between">
              <p className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                <span className="text-violet-500 text-base">✦</span> Templates
              </p>
              <X className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            <p className="px-4 text-[10px] text-gray-400 mb-3">Start from a ready flow and customize.</p>
            <div className="px-3 pb-3 space-y-2">
              {TEMPLATES.map(t => (
                <button key={t.name}
                  onClick={() => setSelectedTemplate(t.name === selectedTemplate ? null : t.name)}
                  className={`w-full text-left bg-white border rounded-xl p-3 transition-all hover:shadow-sm ${selectedTemplate===t.name?"border-violet-300 bg-violet-50/30":"border-gray-200 hover:border-gray-300"}`}>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <p className="text-[11px] font-bold text-gray-900 flex items-center gap-1">
                      <span>{t.emoji}</span> {t.name}
                    </p>
                    <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full flex-shrink-0">{t.steps} steps</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-snug">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Node Filters */}
          <div className="px-3 py-3 border-b border-gray-100">
            <p className="text-[10px] font-black text-gray-700 mb-2 flex items-center gap-1.5">
              <Layers className="w-3 h-3" /> Node Filters
            </p>
            <div className="flex flex-wrap gap-1 mb-1.5">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setNodeFilter(f)}
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition ${
                    nodeFilter===f?"bg-gray-900 text-white border-gray-900":"bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}>{f}</button>
              ))}
            </div>
            <p className="text-[9px] text-gray-400">Showing 11 / 11 nodes</p>
          </div>

          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5">
              <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <input value={nodeSearch} onChange={e => setNodeSearch(e.target.value)}
                className="flex-1 text-[10px] bg-transparent outline-none placeholder-gray-400"
                placeholder="Search nodes…" />
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {SIDEBAR_NODES.filter(n => n.label.toLowerCase().includes(nodeSearch.toLowerCase())).map(n => {
              const Icon = n.icon;
              return (
                <div key={n.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition cursor-grab">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-800">{n.label}</p>
                      <p className="text-[9px] text-gray-400">{n.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <NodeTypeBadge type={n.type} />
                    <Plus className="w-3 h-3 text-gray-400 ml-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty canvas */}
        <div className="flex-1 bg-white flex items-center justify-center"
          style={{ backgroundImage:"radial-gradient(circle,#e2e8f0 1px,transparent 1px)", backgroundSize:"24px 24px" }}>
          <div className="flex flex-col items-center gap-4 select-none">
            <button className="w-16 h-16 rounded-2xl bg-teal-200/70 hover:bg-teal-300/80 transition flex items-center justify-center shadow-sm">
              <Plus className="w-7 h-7 text-teal-600" strokeWidth={2.5} />
            </button>
            <div className="text-center">
              <p className="text-xl font-black text-gray-800">Build Your Workflow</p>
              <p className="text-xs text-gray-400 mt-1">Drag nodes from the sidebar or use a template</p>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 3: Builder with nodes + config (matches screenshots 3 & 4) ────────
function BuilderWithNodesMockup() {
  type NodeId = "select-list"|"linkedin-acct";
  const [selectedNode, setSelectedNode]   = useState<NodeId>("select-list");
  const [setupComplete, setSetupComplete] = useState(false);
  const [zoom, setZoom]                   = useState(90);
  const [emailList, setEmailList]         = useState("Select a list...");
  const [linkedinAcc, setLinkedinAcc]     = useState("lucybrown0032 • ✓ Connected");
  const [listOpen, setListOpen]           = useState(false);
  const [accOpen, setAccOpen]             = useState(false);
  const [nodeSearch, setNodeSearch]       = useState("");

  const EMAIL_LISTS   = ["Select a list…","Q1 Prospects","LinkedIn Leads","SaaS Founders","Cold Outreach 2026"];
  const LI_ACCOUNTS   = ["lucybrown0032 • ✓ Connected","johnsmith_outreach • ✓ Connected","airo_sales_2 • ✗ Disconnected"];
  const FLOW_STEPS    = ["Select List","LinkedIn Account","Send Connection","Send Message","Send SMS"];

  const CANVAS_NODES = [
    { id:"select-list",    label:"Select List",      sub:"LinkedIn contact list",  dotColor:"bg-teal-400" },
    { id:"linkedin-acct",  label:"LinkedIn Account", sub:"Connect LinkedIn",       dotColor:"bg-teal-400" },
    { id:"ai-draft",       label:"AI LinkedIn Draft",sub:"Personalize LinkedIn messa…", dotColor:"bg-gray-800" },
    { id:"send-connection",label:"Send Connection",  sub:"Send connection…",       dotColor:"bg-teal-400" },
  ] as const;

  const SIDEBAR_NODES = [
    { label:"Campaign",        sub:"Select campaign",    type:"TRIGGER" as const, icon:Target    },
    { label:"Fetch Responses", sub:"Get responses",      type:"DATA" as const,    icon:RefreshCw },
    { label:"Delay",           sub:"Wait period",        type:"LOGIC" as const,   icon:Timer     },
    { label:"AI Mail Draft",   sub:"Generate email reply",type:"AI" as const,     icon:Brain     },
  ];

  const setupNum = setupComplete ? 4 : 2;

  return (
    <ScreenFrame url="app.360airo.com/ai-automation/builder">
      {/* Tab bar */}
      <div className="bg-gray-900 flex border-b border-gray-700">
        <button className="px-5 py-2.5 text-xs font-bold text-white bg-gray-700">Automation Builder</button>
        <button className="px-5 py-2.5 text-xs text-gray-400 hover:text-white transition">My Workflows</button>
      </div>

      {/* Builder header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-2.5 flex-wrap gap-y-2">
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-500">🔗</span>
          <p className="text-sm font-black text-gray-900">LinkedIn Outreach</p>
          <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full border border-gray-200">6 nodes</span>
          <div className="flex-1" />
          <ZoomOut className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-700" onClick={() => setZoom(z=>Math.max(50,z-10))} />
          <span className="text-[11px] font-mono font-bold text-gray-600 w-8 text-center">{zoom}%</span>
          <ZoomIn className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-700" onClick={() => setZoom(z=>Math.min(150,z+10))} />
          <Maximize2 className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-700" />
          <button className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-600 transition shadow-sm">
            <Play className="w-3 h-3" /> Execute
          </button>
          <button className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-gray-800 transition shadow-sm">
            <Save className="w-3 h-3" /> Save
          </button>
        </div>
        {/* Flow bar */}
        <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-2 text-[10px] flex-wrap">
          <span className="font-black text-gray-400 uppercase tracking-wider text-[9px]">FLOW</span>
          {FLOW_STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span className="font-semibold text-gray-700">{step}</span>
              {i < FLOW_STEPS.length - 1 && <span className="text-gray-300">→</span>}
            </span>
          ))}
        </div>
        {/* Setup badge */}
        <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-2 flex-wrap">
          <button onClick={() => setSetupComplete(p=>!p)}
            className={`flex items-center gap-1.5 text-[10px] font-bold rounded-full px-2.5 py-1 border transition cursor-pointer ${
              setupComplete
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-amber-50 text-amber-600 border-amber-200"
            }`}>
            {setupComplete
              ? <><CheckCircle2 className="w-3 h-3" /> Setup 4/5</>
              : <><AlertCircle className="w-3 h-3" /> Setup 2/5</>
            }
          </button>
          {!setupComplete && (
            <span className="text-[10px] text-gray-400">Missing: List selected • LinkedIn account selected</span>
          )}
        </div>
      </div>

      <div className="flex h-[360px]">
        {/* Left panel */}
        <div className="w-52 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          <button className="w-full flex items-center gap-2 justify-center bg-teal-50 border-b border-teal-100 py-2.5 text-xs font-bold text-teal-700 hover:bg-teal-100 transition">
            <span className="text-violet-500 text-sm">✦</span> Templates
          </button>
          <div className="px-3 py-3 border-b border-gray-100">
            <p className="text-[10px] font-black text-gray-700 mb-2 flex items-center gap-1"><Layers className="w-3 h-3" /> Node Filters</p>
            <div className="flex flex-wrap gap-1 mb-1">
              {["All (11)","Trigger (2)","Data (1)","Ai (2)"].map(f => (
                <button key={f} className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-white text-gray-500 border-gray-200 hover:border-gray-400 transition">{f}</button>
              ))}
            </div>
            <div className="flex gap-1">
              {["Logic (1)","Action (5)"].map(f => (
                <button key={f} className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-white text-gray-500 border-gray-200 hover:border-gray-400 transition">{f}</button>
              ))}
            </div>
            <p className="text-[9px] text-gray-400 mt-1.5">Showing 11 / 11 nodes</p>
          </div>
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5">
              <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <input value={nodeSearch} onChange={e => setNodeSearch(e.target.value)}
                className="flex-1 text-[10px] bg-transparent outline-none placeholder-gray-400" placeholder="Search nodes…" />
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {SIDEBAR_NODES.map(n => {
              const Icon = n.icon;
              return (
                <div key={n.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 cursor-grab transition">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-800">{n.label}</p>
                      <p className="text-[9px] text-gray-400">{n.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <NodeTypeBadge type={n.type} />
                    <Plus className="w-3 h-3 text-gray-400 ml-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white overflow-hidden relative"
          style={{ backgroundImage:"radial-gradient(circle,#e2e8f0 1px,transparent 1px)", backgroundSize:"24px 24px" }}>
          <div className="absolute inset-0 flex items-center justify-start px-8 gap-1 overflow-x-auto overflow-y-hidden">
            {CANVAS_NODES.map((node, i) => (
              <div key={node.id} className="flex items-center flex-shrink-0">
                {i > 0 && (
                  <div className="flex items-center mx-1">
                    <div className="w-3 h-px border-t border-dashed border-gray-300" />
                    <span className={`w-2.5 h-2.5 rounded-full ${node.dotColor} border-2 border-white shadow mx-0.5 flex-shrink-0`} />
                    <div className="w-3 h-px border-t border-dashed border-gray-300" />
                  </div>
                )}
                {i === 0 && (
                  <span className="w-3 h-3 rounded-full bg-teal-400 border-2 border-white shadow mr-1 flex-shrink-0" />
                )}
                <motion.div
                  initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }} transition={{ delay:i*0.07 }}
                  onClick={() => { if(node.id==="select-list"||node.id==="linkedin-acct") setSelectedNode(node.id as NodeId); }}
                  className={`bg-white rounded-2xl border-2 cursor-pointer transition-all shadow px-4 py-3 min-w-[130px] ${
                    selectedNode===node.id ? "border-teal-400 shadow-teal-100 shadow-md" : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      node.id==="ai-draft" ? "bg-gray-100" : "bg-blue-50"
                    }`}>
                      {node.id==="select-list"    ? <Users className="w-3.5 h-3.5 text-blue-600" />
                        : node.id==="linkedin-acct" ? <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        : node.id==="ai-draft"      ? <Brain className="w-3.5 h-3.5 text-gray-600" />
                        : <Plus className="w-3.5 h-3.5 text-blue-600" />
                      }
                    </div>
                    <p className="text-[11px] font-bold text-gray-900">{node.label}</p>
                  </div>
                  <p className="text-[9px] text-gray-400 truncate max-w-[110px]">{node.sub}</p>
                </motion.div>
                {i === CANVAS_NODES.length - 1 && (
                  <div className="flex items-center ml-1">
                    <div className="w-3 h-px border-t border-dashed border-gray-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-white shadow mx-0.5 flex-shrink-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Canvas hints */}
          <div className="absolute bottom-3 left-4 flex items-center gap-4 text-[9px] text-gray-400 font-medium pointer-events-none">
            <span>▷ Space  Pan</span>
            <span>± Zoom</span>
            <span>⊙ Click output → input</span>
          </div>
        </div>

        {/* Right config panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div initial={{ x:30,opacity:0 }} animate={{ x:0,opacity:1 }} exit={{ x:30,opacity:0 }} transition={{ duration:0.18 }}
              className="w-60 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div>
                  <p className="text-xs font-black text-gray-900">Configuration</p>
                  <p className="text-[9px] text-gray-400">Editing: <span className="font-bold text-gray-700">{selectedNode==="select-list"?"Select List":"LinkedIn Account"}</span></p>
                </div>
                <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-gray-100"
                  onClick={() => setSelectedNode("select-list")}>
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>

              <div className="px-4 py-3 border-b border-gray-100">
                {/* Node icon card */}
                <div className={`flex items-center gap-3 rounded-xl p-3 mb-3 ${selectedNode==="select-list"?"bg-blue-50":"bg-indigo-50"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedNode==="select-list"?"bg-blue-100":"bg-indigo-100"}`}>
                    {selectedNode==="select-list"
                      ? <Users className="w-5 h-5 text-blue-600" />
                      : <Linkedin className="w-5 h-5 text-indigo-600" />
                    }
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500">{selectedNode==="select-list"?"LinkedIn contact list":"Connect LinkedIn"}</p>
                    <p className="text-xs font-bold text-gray-900">{selectedNode==="select-list"?"Select List":"LinkedIn Account"}</p>
                  </div>
                </div>

                {/* Node label */}
                <label className="text-[9px] font-bold text-gray-500 block mb-1">Node Label</label>
                <input defaultValue={selectedNode==="select-list"?"Select List":"LinkedIn Account"}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-teal-300 transition mb-3" />

                {/* Info */}
                <div className={`rounded-lg px-3 py-2 mb-3 ${selectedNode==="select-list"?"bg-emerald-50 border border-emerald-200":"bg-indigo-50 border border-indigo-200"}`}>
                  <p className={`text-[9px] leading-relaxed ${selectedNode==="select-list"?"text-emerald-700":"text-indigo-700"}`}>
                    {selectedNode==="select-list"
                      ? <><span className="font-black">Select Email List:</span> Choose an email list for outreach.</>
                      : <><span className="font-black">LinkedIn Account:</span> Select LinkedIn account for sending messages/connections.</>
                    }
                  </p>
                </div>

                {/* Dropdown */}
                <label className="text-[9px] font-bold text-gray-500 block mb-1">
                  {selectedNode==="select-list"?"Email List":"LinkedIn Account"}
                </label>

                {selectedNode==="select-list" ? (
                  <div className="relative">
                    <button onClick={() => setListOpen(p=>!p)}
                      className={`w-full text-left text-xs border-2 rounded-xl px-3 py-2 flex items-center justify-between transition ${
                        emailList==="Select a list..."?"border-teal-300 bg-teal-50/30 text-gray-400":"border-gray-200 text-gray-800"
                      }`}>
                      {emailList}
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${listOpen?"rotate-180":""}`} />
                    </button>
                    <AnimatePresence>
                      {listOpen && (
                        <motion.div initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                          {EMAIL_LISTS.map(l => (
                            <button key={l} onClick={() => { setEmailList(l); setListOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-xs transition flex items-center justify-between ${
                                emailList===l?"bg-teal-50 text-teal-700 font-bold":"text-gray-700 hover:bg-gray-50"
                              }`}>
                              {l}
                              {emailList===l && <CheckCircle2 className="w-3 h-3 text-teal-500 flex-shrink-0" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="relative">
                    <button onClick={() => setAccOpen(p=>!p)}
                      className="w-full text-left text-xs border-2 border-gray-200 rounded-xl px-3 py-2 flex items-center justify-between hover:border-gray-300 transition text-gray-800">
                      {linkedinAcc}
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${accOpen?"rotate-180":""}`} />
                    </button>
                    <AnimatePresence>
                      {accOpen && (
                        <motion.div initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                          {LI_ACCOUNTS.map(a => (
                            <button key={a} onClick={() => { setLinkedinAcc(a); setAccOpen(false); }}
                              className={`w-full text-left px-3 py-2 text-xs transition flex items-center justify-between ${
                                linkedinAcc===a?"bg-indigo-50 text-indigo-700 font-bold":"text-gray-700 hover:bg-gray-50"
                              }`}>
                              {a}
                              {linkedinAcc===a && <CheckCircle2 className="w-3 h-3 text-indigo-500 flex-shrink-0" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold text-gray-500">Status</span>
                  <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                  </span>
                </div>
                {selectedNode==="linkedin-acct" && (
                  <div className="mt-2">
                    <span className="text-[9px] font-bold text-gray-500 block mb-1">Selected Account</span>
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                      <span className="text-[10px] font-semibold text-emerald-800">lucybrown0032</span>
                      <span className="text-[9px] font-black text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Active
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 4: Execution log ──────────────────────────────────────────────────
function ExecutionLogMockup() {
  const [expanded, setExpanded] = useState<number|null>(0);

  const EXECUTIONS = [
    { id:"EX-1042", workflow:"LinkedIn Outreach",    status:"Completed", time:"2 min ago",
      steps:[
        { label:"Select List",      status:"done",    output:"48 prospects loaded"           },
        { label:"LinkedIn Account", status:"done",    output:"Connected: lucybrown0032"       },
        { label:"AI LinkedIn Draft",status:"done",    output:"Personalised 48 messages"       },
        { label:"Send Connection",  status:"done",    output:"48 requests sent"               },
        { label:"Send Message",     status:"done",    output:"36 accepted, 36 messages"       },
        { label:"Send SMS",         status:"done",    output:"12 SMS sent via Twilio"          },
      ]},
    { id:"EX-1041", workflow:"Cold Email Follow-Up", status:"Running",   time:"12 min ago",
      steps:[
        { label:"Campaign Trigger", status:"done",    output:"Triggered by campaign open"     },
        { label:"Fetch Responses",  status:"done",    output:"87 opens fetched"               },
        { label:"AI Mail Draft",    status:"running", output:"Drafting personalised emails…"  },
        { label:"Send Email",       status:"pending", output:"Waiting…"                       },
      ]},
    { id:"EX-1039", workflow:"Prospect Re-engage",   status:"Failed",    time:"1 day ago",
      steps:[
        { label:"Select List",     status:"done",    output:"22 prospects loaded"          },
        { label:"Delay (3 days)",  status:"done",    output:"Waited 3 days"                },
        { label:"Send LinkedIn",   status:"failed",  output:"Error: Account disconnected"  },
        { label:"Send Email",      status:"skipped", output:"Skipped due to previous error" },
      ]},
  ];

  const stepDotColor = (s: string) => ({
    done:"bg-emerald-500", running:"bg-blue-500", failed:"bg-red-400", pending:"bg-gray-300", skipped:"bg-amber-400"
  }[s] ?? "bg-gray-300");

  const stepBadge = (s: string) => ({
    done:"text-emerald-600 bg-emerald-50", running:"text-blue-600 bg-blue-50",
    failed:"text-red-600 bg-red-50", pending:"text-gray-500 bg-gray-100", skipped:"text-amber-600 bg-amber-50"
  }[s] ?? "text-gray-500 bg-gray-100");

  const execBadge = (s: string) => ({
    Completed:"text-emerald-700 bg-emerald-100", Running:"text-blue-700 bg-blue-100", Failed:"text-red-700 bg-red-100"
  }[s] ?? "text-gray-600 bg-gray-100");

  return (
    <ScreenFrame url="app.360airo.com/ai-automation/logs">
      <div className="bg-gray-50 p-5">
        <p className="text-sm font-black text-gray-900 mb-4">Execution History</p>
        <div className="space-y-3">
          {EXECUTIONS.map((ex, i) => (
            <div key={ex.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition text-left"
                onClick={() => setExpanded(expanded===i?null:i)}>
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ex.status==="Completed"?"bg-emerald-500":ex.status==="Running"?"bg-blue-500":"bg-red-400"}`} />
                  <div>
                    <div className="flex items-center gap-2"><p className="text-xs font-bold text-gray-900">{ex.workflow}</p><span className="text-[9px] font-mono text-gray-400">{ex.id}</span></div>
                    <p className="text-[10px] text-gray-400">{ex.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${execBadge(ex.status)}`}>{ex.status}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expanded===i?"rotate-180":""}`} />
                </div>
              </button>
              <AnimatePresence>
                {expanded===i && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.2}}>
                    <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-1.5">
                      {ex.steps.map((step,j) => (
                        <div key={j} className="flex items-center gap-3 text-xs">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stepDotColor(step.status)}`} />
                          <span className="font-semibold text-gray-700 w-32 truncate flex-shrink-0">{step.label}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${stepBadge(step.status)}`}>{step.status}</span>
                          <span className="text-[10px] text-gray-400 truncate">{step.output}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkflowAutomationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-workflow-automation");

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    if (!isMounted) return;
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveToc(id); }, { rootMargin:"-20% 0px -70% 0px" });
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
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-violet-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-violet-600 transition">AI Automation</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Workflow Automation</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Workflow Automation</h1>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    360Airo's Workflow Automation lets you build end-to-end multichannel outreach sequences using a
                    visual node-based builder — combining LinkedIn, email, SMS, and AI personalisation into fully
                    automated workflows with zero code.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* What is */}
                <motion.div id="what-is-workflow-automation" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    A <strong>workflow</strong> in 360Airo is a sequence of connected <strong>nodes</strong> — each node representing one
                    action, trigger, or logic step. You connect nodes visually on the Automation Builder canvas, configure each step,
                    and 360Airo executes the entire sequence automatically.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Zap,    bg:"bg-violet-50", color:"text-violet-600", border:"border-violet-200", title:"Visual node builder",    desc:"Drag and drop nodes onto a canvas and build complex multi-step automations without writing a single line of code" },
                      { icon:Brain,  bg:"bg-blue-50",   color:"text-blue-600",   border:"border-blue-200",   title:"AI-powered actions",     desc:"Include AI Draft nodes that personalise LinkedIn messages, emails, and SMS at scale using each prospect's profile data" },
                      { icon:Layers, bg:"bg-emerald-50",color:"text-emerald-600",border:"border-emerald-200",title:"Multichannel by default", desc:"LinkedIn, email, SMS, and delays all live in the same canvas — mix and sequence channels exactly as your strategy demands" },
                    ].map((card,i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1+i*0.07 }}
                          className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
                          <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                          <p className={`text-sm font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span><strong>Workflow Automation</strong> is found in the sidebar under <strong>AI Automation</strong>. It's separate from Email Campaign sequences — workflows give you full control over multichannel logic, conditions, delays, and AI personalisation in one place.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Dashboard */}
                <motion.div id="my-workflows-dashboard" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">My Workflows dashboard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The home screen of AI Automation. Shows all your workflows with live execution counts, status, and channel tags. Search and filter tabs are both interactive in the mockup below.
                  </p>
                  <div className="mb-5"><WorkflowsDashboardMockup /></div>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">Dashboard stats explained</p></div>
                    {[
                      ["Total Workflows",    "Number of workflow automations you've created (Active + Archived)"],
                      ["Email Replies Sent", "Total email replies generated and sent by all workflows across all executions"],
                      ["Requests Sent",      "Total LinkedIn connection requests and other outreach requests sent by workflows"],
                      ["Total Executions",   "How many times all your workflows have been run — each execution processes your full prospect list"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[160px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Create new */}
                <motion.div id="create-new-workflow" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.14 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Create a new workflow</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Click <strong>+ Create New Automation</strong> to open the builder. The Templates panel opens by default with three ready-to-use flows. Click any template card to load it, or click the teal <strong>+</strong> button in the canvas centre to start blank. All template cards and node filters are interactive in the mockup below.
                  </p>
                  <div className="mb-5"><EmptyBuilderMockup /></div>
                  <ul className="space-y-2">
                    {[
                      ["🚀 Complete Email Automation (6 steps)", "End-to-end automated email response flow with trigger, AI drafting, send, and follow-up"],
                      ["⚡ Quick Email Reply (4 steps)",          "Lightweight flow for fast automated email responses — ideal for quick follow-up sequences"],
                      ["🔗 LinkedIn Outreach (6 steps)",          "Invite first, check acceptance, then send a personalised follow-up message or SMS"],
                      ["Build from scratch",                      "Click the teal + button in the canvas centre to add nodes one by one from the library"],
                    ].map(([title,desc],i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 list-none">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Builder */}
                <motion.div id="automation-builder" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Automation Builder</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The builder below is fully interactive. <strong>Click "Select List"</strong> to open its configuration (email list dropdown). <strong>Click "LinkedIn Account"</strong> to see its config with the connected account selector. Click the <strong>Setup badge</strong> to toggle between incomplete (2/5) and near-complete (4/5) states. All dropdowns work.
                  </p>
                  <div className="mb-5"><BuilderWithNodesMockup /></div>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Layers,   bg:"bg-violet-50", color:"text-violet-600", border:"border-violet-200", title:"Left — Node Library",  desc:"Browse all 11 nodes by category. Filter by Trigger, Data, AI, Logic, or Action. Search by name. Drag any node onto the canvas." },
                      { icon:Target,   bg:"bg-blue-50",   color:"text-blue-600",   border:"border-blue-200",   title:"Centre — Canvas",      desc:"Dot-grid editing area. Nodes appear as white cards connected by dashed lines and teal dots. Click any node to configure it." },
                      { icon:Settings, bg:"bg-emerald-50",color:"text-emerald-600",border:"border-emerald-200",title:"Right — Configuration", desc:"Clicking a node opens its settings here — email list selection, LinkedIn account, AI prompts, delays, and node labels." },
                    ].map((card,i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16+i*0.07 }}
                          className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
                          <Icon className={`w-4 h-4 ${card.color} mb-2`} />
                          <p className={`text-xs font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-[11px] text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">Builder UI elements explained</p></div>
                    {[
                      ["Flow bar",         "Top horizontal bar showing every node in sequence — bird's-eye view without scrolling the canvas"],
                      ["Setup X/5 badge",  "Amber = missing required fields. Green = mostly complete and ready to execute. Click to see what's missing"],
                      ["Node connections", "Teal dots + dashed lines connect nodes. Dark dot = AI/branch node. Connections are drawn automatically"],
                      ["Canvas hints",     "Bottom bar: Space=Pan, ± Zoom, Click output → input — keyboard and mouse shortcuts for navigating the canvas"],
                      ["Execute button",   "Runs the workflow immediately — processes the entire prospect list through all nodes in sequence"],
                      ["Save button",      "Saves the current layout and all configuration settings without running the workflow"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[140px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Node types */}
                <motion.div id="node-types" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.18 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Node types</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Every workflow is built from five categories. The builder's left panel shows all 11 nodes — filter by category to find what you need.
                  </p>
                  <div className="space-y-3 mb-5">
                    {[
                      { type:"TRIGGER" as const, icon:Zap,      bg:"bg-blue-50",    border:"border-blue-200",    color:"text-blue-700",    title:"Trigger nodes (2)",
                        nodes:[{ name:"Campaign", detail:"Fires when a prospect meets a campaign condition (email opened, clicked, replied)" }, { name:"Scheduled", detail:"Runs at a defined time or on a recurring schedule" }] },
                      { type:"DATA" as const,    icon:Target,   bg:"bg-emerald-50", border:"border-emerald-200", color:"text-emerald-700", title:"Data nodes (1)",
                        nodes:[{ name:"Fetch Responses", detail:"Pulls response data from a running campaign — opens, clicks, or replies" }] },
                      { type:"AI" as const,      icon:Brain,    bg:"bg-violet-50",  border:"border-violet-200",  color:"text-violet-700",  title:"AI nodes (2)",
                        nodes:[{ name:"AI LinkedIn Draft", detail:"Generates a personalised LinkedIn message per prospect using their profile and company data" }, { name:"AI Mail Draft", detail:"Creates a personalised cold email body using merge tags and AI context" }] },
                      { type:"LOGIC" as const,   icon:GitBranch,bg:"bg-amber-50",   border:"border-amber-200",   color:"text-amber-700",   title:"Logic nodes (1)",
                        nodes:[{ name:"Delay", detail:"Pauses the workflow for a set number of hours or days before moving to the next node" }] },
                      { type:"ACTION" as const,  icon:Play,     bg:"bg-pink-50",    border:"border-pink-200",    color:"text-pink-700",    title:"Action nodes (5)",
                        nodes:[
                          { name:"Select List",      detail:"Loads a prospect list from your Email Lists — all prospects flow through the workflow" },
                          { name:"LinkedIn Account", detail:"Connects a LinkedIn account — all LinkedIn nodes in this workflow use this account" },
                          { name:"Send Connection",  detail:"Sends a LinkedIn connection request (with optional personalised note)" },
                          { name:"Send Message",     detail:"Sends a LinkedIn direct message once the prospect has accepted the connection" },
                          { name:"Send SMS",         detail:"Sends an SMS via your Twilio integration — requires a Twilio config in Settings" },
                        ] },
                    ].map((cat,i) => {
                      const Icon = cat.icon;
                      return (
                        <motion.div key={cat.type} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.18+i*0.06 }}
                          className={`rounded-xl border ${cat.border} ${cat.bg} overflow-hidden`}>
                          <div className="px-4 py-3 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-white border ${cat.border} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-4 h-4 ${cat.color}`} />
                            </div>
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-bold ${cat.color}`}>{cat.title}</p>
                              <NodeTypeBadge type={cat.type} />
                            </div>
                          </div>
                          <div className="border-t border-white/60 divide-y divide-white/60">
                            {cat.nodes.map(n => (
                              <div key={n.name} className="px-4 py-2 bg-white/50 flex items-start gap-2">
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.color.replace("text-","bg-")} opacity-50`} />
                                <div>
                                  <span className={`text-xs font-semibold ${cat.color} mr-1.5`}>{n.name}</span>
                                  <span className="text-xs text-gray-500">{n.detail}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Templates */}
                <motion.div id="workflow-templates" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Workflow templates</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    360Airo ships with three pre-built templates accessible both from the Create New screen and from the Templates button inside the builder.
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">Pre-built workflow templates</p></div>
                    {[
                      ["🚀 Complete Email Automation","6","Email, AI",         "End-to-end automated email response flow — trigger, AI draft, send, follow-ups"],
                      ["⚡ Quick Email Reply",         "4","Email, AI",         "Fast automated email responses for campaign replies — minimal setup required"],
                      ["🔗 LinkedIn Outreach",         "6","LinkedIn, SMS, AI", "Invite first, check acceptance, then send personalised follow-up or SMS"],
                    ].map(([name,steps,channels,desc],i) => (
                      <div key={name} className={`grid grid-cols-[1fr_55px_115px] gap-2 px-4 py-3 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div><p className="font-bold text-gray-800 mb-0.5">{name}</p><p className="text-[10px] text-gray-400">{desc}</p></div>
                        <span className="text-gray-400 font-mono text-center self-start pt-0.5">{steps} steps</span>
                        <span className="text-[9px] text-violet-600 font-semibold self-start pt-0.5">{channels}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Execute */}
                <motion.div id="execute-monitor" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Execute & monitor</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Once your Setup badge shows <strong>Setup 5/5</strong>, click <strong>Execute</strong>. Track every run in the execution log — click any row to expand step-by-step output.
                  </p>
                  <div className="mb-5"><ExecutionLogMockup /></div>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:CheckCircle2, bg:"bg-emerald-50", border:"border-emerald-200", color:"text-emerald-700", title:"Completed", desc:"All nodes ran successfully. Check step outputs for counts." },
                      { icon:Activity,     bg:"bg-blue-50",    border:"border-blue-200",    color:"text-blue-700",    title:"Running",   desc:"In progress — expand the row to see which node is active." },
                      { icon:AlertCircle,  bg:"bg-red-50",     border:"border-red-200",     color:"text-red-700",     title:"Failed",    desc:"A node hit an error. Expand to see which step failed and why." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22+i*0.07 }}
                          className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-1"><Icon className={`w-4 h-4 ${item.color}`} /><p className={`text-sm font-bold ${item.color}`}>{item.title}</p></div>
                          <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span><strong>Before executing:</strong> Ensure all required nodes are configured and the Setup badge shows <strong>Setup 5/5</strong>. Running with missing fields results in a Failed execution.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Best practices */}
                <motion.div id="best-practices" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Best practices</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:Target,    color:"bg-violet-600", title:"Always start with a template",                      desc:"Templates are pre-validated, proven workflows. Customise from a template rather than building from scratch — the LinkedIn Outreach and Complete Email Automation templates cover 90% of common use cases." },
                      { icon:Brain,     color:"bg-blue-600",   title:"Use AI Draft nodes for every personalised message",  desc:"AI Draft nodes use your prospect's name, company, title, and industry to craft messages that feel 1:1 at scale. Generic messages get flagged as spam — personalisation is essential." },
                      { icon:Timer,     color:"bg-emerald-600",title:"Add Delay nodes between every channel touch",        desc:"Never send a LinkedIn connection request and an email on the same day. Space touches 24–72 hours apart to mirror human behaviour and avoid triggering spam filters." },
                      { icon:GitBranch, color:"bg-amber-500",  title:"Reach Setup 5/5 before executing",                  desc:"The Setup badge tells you exactly what's missing. An amber badge means the workflow will fail. Always reach Setup 5/5 (green) before clicking Execute." },
                      { icon:BarChart2, color:"bg-pink-600",   title:"Review execution logs after every run",             desc:"Expand each row and check step-by-step outputs. Unexpected drop-offs between nodes signal a configuration or account issue worth investigating." },
                      { icon:RefreshCw, color:"bg-teal-600",   title:"Archive rather than delete completed workflows",    desc:"Archiving preserves all execution history. Deleting removes everything permanently. Archive workflows you might re-use or want to reference later." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.25+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-violet-200 hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}><Icon className="w-4 h-4 text-white" /></div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">Workflow Automation — quick reference</p></div>
                    {[
                      ["Where to find it",    "Sidebar → AI Automation → My Workflows"],
                      ["Create workflow",      "+ Create New Automation → choose template or blank canvas"],
                      ["Total node types",     "11 nodes: 2 Trigger, 1 Data, 2 AI, 1 Logic, 5 Action"],
                      ["LinkedIn requirement", "A connected LinkedIn account required for LinkedIn action nodes"],
                      ["SMS requirement",      "A Twilio config must be connected in Settings for Send SMS nodes"],
                      ["Setup badge",          "Amber (incomplete) → Green (ready). Must reach 5/5 before executing"],
                      ["Templates available",  "3 built-in: Complete Email Automation, Quick Email Reply, LinkedIn Outreach"],
                      ["Execution",            "Click Execute → processes full prospect list through all nodes in sequence"],
                    ].map(([field,val],i) => (
                      <div key={field} className={`grid grid-cols-[160px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{field}</span>
                        <span className="text-gray-700">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-violet-500" />
                    <span>
                      <strong>Pro tip:</strong> The most effective 360Airo workflows combine at least three channels — LinkedIn connection, personalised email, and SMS follow-up. Three-touch multichannel sequences consistently outperform single-channel campaigns by 2–3× on reply rate.
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