"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Zap, Star,
  CheckCircle2, AlertCircle, Info, Play, Pause, Settings, Trash2,
  Search, Filter, Plus, ArrowRight, Users, Mail, MessageSquare,
  Phone, Linkedin, RefreshCw, GitBranch, BarChart2, TrendingUp,
  Activity, Shield, Eye, X, Save, Maximize2, ZoomIn, ZoomOut,
  Workflow as WorkflowIcon, Brain, Layers, Target, Timer,
  LayoutDashboard,
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

// ─── Ask AI ───────────────────────────────────────────────────────────────────
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

// ─── Screen Frame ─────────────────────────────────────────────────────────────
function ScreenFrame({ title, url, children, noPad }: { title: string; url?: string; children: React.ReactNode; noPad?: boolean }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {url
          ? <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-500 font-mono truncate">🔒 {url}</div>
          : <span className="text-xs text-gray-600 font-medium">{title}</span>}
      </div>
      {children}
    </div>
  );
}

// ─── Node badge ───────────────────────────────────────────────────────────────
function NodeTypeBadge({ type }: { type: "TRIGGER" | "DATA" | "AI" | "LOGIC" | "ACTION" }) {
  const MAP = {
    TRIGGER: "bg-blue-100 text-blue-700",
    DATA:    "bg-emerald-100 text-emerald-700",
    AI:      "bg-violet-100 text-violet-700",
    LOGIC:   "bg-amber-100 text-amber-700",
    ACTION:  "bg-pink-100 text-pink-700",
  };
  return <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${MAP[type]}`}>{type}</span>;
}

// ─── MOCKUP 1 — My Workflows Dashboard ───────────────────────────────────────
function WorkflowsDashboardMockup() {
  const [tab, setTab]       = useState<"All"|"Active"|"Archived">("All");
  const [search, setSearch] = useState("");

  const WORKFLOWS = [
    {
      name:"LinkedIn Outreach",     nodes:6,  status:"Active",
      executions:24, lastRun:"2 hours ago",  color:"bg-blue-600",
      icon:"🔗", channels:["LinkedIn","SMS"],
    },
    {
      name:"Cold Email Follow-Up",  nodes:4,  status:"Active",
      executions:87, lastRun:"30 min ago",   color:"bg-violet-600",
      icon:"📧", channels:["Email"],
    },
    {
      name:"Prospect Re-engage",    nodes:5,  status:"Archived",
      executions:12, lastRun:"3 days ago",   color:"bg-gray-400",
      icon:"♻️", channels:["Email","LinkedIn"],
    },
  ];

  const filtered = WORKFLOWS.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) &&
    (tab === "All" || w.status === tab)
  );

  const STATS = [
    { label:"Total Workflows",    val:"3",  icon:Zap,          bg:"bg-blue-50",   iconBg:"bg-blue-100",   iconColor:"text-blue-600"   },
    { label:"Email Replies Sent", val:"87", icon:Mail,         bg:"bg-emerald-50",iconBg:"bg-emerald-100",iconColor:"text-emerald-600" },
    { label:"Requests Sent",      val:"24", icon:Linkedin,     bg:"bg-violet-50", iconBg:"bg-violet-100", iconColor:"text-violet-600"  },
    { label:"Total Executions",   val:"123",icon:Play,         bg:"bg-amber-50",  iconBg:"bg-amber-100",  iconColor:"text-amber-600"   },
  ];

  return (
    <ScreenFrame title="360Airo — My Workflows" url="app.360airo.com/ai-automation">
      <div className="bg-[#f8f9fc] p-5">
        {/* Command center header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-sm">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Automation Command Center
                </span>
              </div>
              <h3 className="text-2xl font-black text-gray-900">My Workflows</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monitor runs, accounts, and performance from one place</p>
            </div>
            <button className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition shadow-md flex-shrink-0">
              <Plus className="w-3.5 h-3.5" /> Create New Automation
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {STATS.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-white shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-tight">{s.label}</p>
                  <div className={`w-8 h-8 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${s.iconColor}`} />
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-900">0</p>
              </div>
            );
          })}
        </div>

        {/* Search + tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-4">
          <div className="flex items-center gap-3 p-3 border-b border-gray-100 flex-wrap">
            <div className="flex-1 min-w-[160px] flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Search workflows…" />
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {(["All","Active","Archived"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${tab===t?"bg-gray-900 text-white shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-400">
              <p className="text-2xl mb-2">🔍</p>
              No workflows found
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((w, i) => (
                <motion.div key={w.name} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.05 }}
                  className="px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50 transition flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${w.color} flex items-center justify-center text-base shadow-sm flex-shrink-0`}>
                      {w.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900">{w.name}</p>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${w.status==="Active"?"text-emerald-700 bg-emerald-100":"text-gray-500 bg-gray-100"}`}>
                          {w.status}
                        </span>
                        <span className="text-[9px] text-gray-400 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full">{w.nodes} nodes</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-400 flex-wrap">
                        <span>Executions: <strong className="text-gray-700">{w.executions}</strong></span>
                        <span>Last run: <strong className="text-gray-700">{w.lastRun}</strong></span>
                        <span className="flex items-center gap-1">
                          {w.channels.map(c => (
                            <span key={c} className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-full border border-blue-100">{c}</span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-violet-50 hover:border-violet-300 transition">
                      <Play className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
                      <Settings className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition">
                      <Trash2 className="w-3 h-3 text-gray-400" />
                    </button>
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

// ─── MOCKUP 2 — Automation Builder ────────────────────────────────────────────
function AutomationBuilderMockup() {
  const [selectedNode, setSelectedNode] = useState<string|null>("send-sms");
  const [nodeFilter, setNodeFilter]     = useState<"All"|"Trigger"|"Data"|"AI"|"Logic"|"Action">("All");
  const [zoom, setZoom]                 = useState(80);
  const [nodeSearch, setNodeSearch]     = useState("");

  const FLOW_NODES = [
    { id:"select-list",    label:"Select List",      sub:"LinkedIn contact list",   icon:"👥", dot:"bg-blue-500"    },
    { id:"linkedin-acct",  label:"LinkedIn Account", sub:"Connect LinkedIn",        icon:"🔗", dot:"bg-blue-500"    },
    { id:"ai-draft",       label:"AI LinkedIn Draft",sub:"Personalize LinkedIn...", icon:"🤖", dot:"bg-gray-800"    },
    { id:"send-connection",label:"Send Connection",  sub:"Send connection...",      icon:"➕", dot:"bg-blue-500"    },
    { id:"send-message",   label:"Send Message",     sub:"Send message...",         icon:"💬", dot:"bg-blue-500"    },
    { id:"send-sms",       label:"Send SMS",         sub:"Send SMS...",             icon:"📱", dot:"bg-blue-500"    },
  ];

  const SIDEBAR_NODES = [
    { label:"Campaign",        sub:"Select campaign",  type:"TRIGGER" as const, icon:Target  },
    { label:"Fetch Responses", sub:"Get responses",    type:"DATA" as const,    icon:RefreshCw },
    { label:"Delay",           sub:"Wait period",      type:"LOGIC" as const,   icon:Timer   },
    { label:"Send Email",      sub:"Send email",       type:"ACTION" as const,  icon:Mail    },
    { label:"AI Draft",        sub:"Personalise text", type:"AI" as const,      icon:Brain   },
    { label:"Send LinkedIn",   sub:"Send connection",  type:"ACTION" as const,  icon:Linkedin},
    { label:"Branch / If",     sub:"Conditional logic",type:"LOGIC" as const,   icon:GitBranch},
    { label:"Send SMS",        sub:"Twilio SMS",       type:"ACTION" as const,  icon:Phone   },
  ];

  const filtered = SIDEBAR_NODES.filter(n => {
    const matchType = nodeFilter === "All" || n.type === nodeFilter.toUpperCase();
    const matchSearch = n.label.toLowerCase().includes(nodeSearch.toLowerCase());
    return matchType && matchSearch;
  });

  const FLOW_STEPS = ["Select List","LinkedIn Account","Send Connection","Send Message","Send SMS"];

  return (
    <ScreenFrame title="360Airo — Automation Builder" url="app.360airo.com/ai-automation/builder">
      {/* Builder top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm font-black text-gray-900">LinkedIn Outreach</p>
            <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full border border-gray-200">6 nodes</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <ZoomOut className="w-3.5 h-3.5 cursor-pointer hover:text-gray-700" onClick={() => setZoom(z => Math.max(50,z-10))} />
            <span className="font-mono font-bold text-gray-600 w-8 text-center">{zoom}%</span>
            <ZoomIn className="w-3.5 h-3.5 cursor-pointer hover:text-gray-700" onClick={() => setZoom(z => Math.min(150,z+10))} />
            <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-gray-700 ml-1" />
          </div>
          <button className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-600 transition shadow-sm">
            <Play className="w-3 h-3" /> Execute
          </button>
          <button className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-gray-800 transition shadow-sm">
            <Save className="w-3 h-3" /> Save
          </button>
        </div>
        {/* Flow bar */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-[10px] flex-wrap">
          <span className="font-bold text-gray-400 uppercase tracking-wider">FLOW</span>
          {FLOW_STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" /><span className="font-semibold text-gray-700">{step}</span></span>
              {i < FLOW_STEPS.length - 1 && <span className="text-gray-300">→</span>}
            </span>
          ))}
          <div className="ml-2 flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5 text-orange-700 font-bold">
            <AlertCircle className="w-3 h-3" /> Setup 2/5 — Missing: List selected · LinkedIn account selected
          </div>
        </div>
      </div>

      <div className="flex h-72 overflow-hidden">
        {/* Left node panel */}
        <div className="w-52 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <button className="w-full flex items-center gap-2 justify-center bg-violet-50 border-b border-violet-100 py-2.5 text-xs font-bold text-violet-700 hover:bg-violet-100 transition">
            <Brain className="w-3.5 h-3.5" /> Templates
          </button>
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-[10px] font-black text-gray-700 mb-2 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Node Filters
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {(["All","Trigger","Data","AI","Logic","Action"] as const).map(f => (
                <button key={f} onClick={() => setNodeFilter(f)}
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition ${nodeFilter===f?"bg-gray-900 text-white":"bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                  {f === "All" ? `All (${SIDEBAR_NODES.length})` : f}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-gray-400">Showing {filtered.length} / {SIDEBAR_NODES.length} nodes</p>
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
            {filtered.map(n => {
              const Icon = n.icon;
              return (
                <div key={n.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition cursor-grab active:cursor-grabbing">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3 h-3 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-800">{n.label}</p>
                      <p className="text-[9px] text-gray-400">{n.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <NodeTypeBadge type={n.type} />
                    <Plus className="w-3 h-3 text-gray-400 hover:text-violet-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-[#f0f2f7] overflow-hidden relative" style={{ backgroundImage:"radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize:"20px 20px" }}>
          <div className="absolute inset-0 flex items-center justify-start pl-8 gap-2 overflow-x-auto overflow-y-hidden">
            {FLOW_NODES.map((node, i) => (
              <div key={node.id} className="flex items-center gap-0 flex-shrink-0">
                <motion.div
                  initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.07 }}
                  onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                  className={`bg-white rounded-xl border-2 cursor-pointer transition-all shadow-md px-3 py-2.5 min-w-[110px] ${
                    selectedNode === node.id
                      ? "border-blue-500 shadow-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${selectedNode===node.id?"bg-blue-600":"bg-gray-800"}`}>
                      <span className="text-[9px]">
                        {node.id==="select-list"?"👥":node.id==="linkedin-acct"?"🔗":node.id==="ai-draft"?"🤖":node.id==="send-connection"?"➕":node.id==="send-message"?"💬":"📱"}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-900 leading-tight">{node.label}</p>
                  </div>
                  <p className="text-[9px] text-gray-400 truncate max-w-[90px]">{node.sub}</p>
                </motion.div>
                {i < FLOW_NODES.length - 1 && (
                  <div className="flex items-center flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${node.dot} mx-1`} />
                    <div className="w-5 h-px border-t-2 border-dashed border-gray-400" />
                    <div className={`w-2 h-2 rounded-full ${FLOW_NODES[i+1].dot} mx-1`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right config panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div initial={{ x:30, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ x:30, opacity:0 }} transition={{ duration:0.2 }}
              className="w-52 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto">
              <div className="flex items-center justify-between px-3 py-3 border-b border-gray-100">
                <div>
                  <p className="text-xs font-black text-gray-900">Configuration</p>
                  <p className="text-[9px] text-gray-400">Editing: <span className="font-bold text-gray-700">Send SMS</span></p>
                </div>
                <button onClick={() => setSelectedNode(null)} className="w-5 h-5 rounded flex items-center justify-center hover:bg-gray-100">
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
              <div className="px-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl p-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500">Twilio SMS follow-up</p>
                    <p className="text-xs font-bold text-gray-900">Send SMS</p>
                  </div>
                </div>
                <label className="text-[9px] font-bold text-gray-500 block mb-1">Node Label</label>
                <input defaultValue="Send SMS"
                  className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-violet-300 transition" />
              </div>
              <div className="px-3 py-3">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-3">
                  <p className="text-[9px] text-blue-700 leading-relaxed">
                    <span className="font-black">SMS Follow-up:</span> Sends Twilio SMS after LinkedIn acceptance and chosen day delay.
                  </p>
                </div>
                <label className="text-[9px] font-bold text-gray-500 block mb-1">Twilio Config</label>
                <select className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 outline-none focus:border-violet-300 bg-white">
                  <option>Select Twilio config…</option>
                </select>
                <p className="text-[9px] text-gray-400 mt-1">Loading Twilio configs…</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 3 — Create workflow: Template picker ──────────────────────────────
function TemplatePickerMockup() {
  const [selected, setSelected] = useState<string|null>(null);
  const TEMPLATES = [
    { name:"LinkedIn Outreach + SMS",  nodes:6, icon:"🔗", color:"bg-blue-600",   tags:["LinkedIn","SMS","AI"],       desc:"Connect on LinkedIn, personalise with AI, follow up via Twilio SMS" },
    { name:"Cold Email Sequence",      nodes:4, icon:"📧", color:"bg-violet-600", tags:["Email","AI"],                desc:"AI-personalised cold email with 3 automatic follow-ups" },
    { name:"Prospect Re-engagement",   nodes:5, icon:"♻️", color:"bg-emerald-600",tags:["Email","LinkedIn"],          desc:"Re-engage cold leads with a multichannel touchpoint sequence" },
    { name:"Inbound Lead Nurture",     nodes:7, icon:"🎯", color:"bg-orange-500", tags:["Email","Delay","AI"],        desc:"Trigger email nurture sequence when a prospect opens a campaign email" },
    { name:"Demo Follow-Up",           nodes:3, icon:"📅", color:"bg-pink-500",   tags:["Email","SMS"],               desc:"Send personalised follow-up 24 hours after a demo meeting" },
    { name:"Blank Workflow",           nodes:0, icon:"✨", color:"bg-gray-500",   tags:["Custom"],                    desc:"Start from scratch with an empty canvas" },
  ];

  return (
    <ScreenFrame title="360Airo — Choose Template" url="app.360airo.com/ai-automation/new">
      <div className="bg-gray-50 p-5">
        <div className="mb-4">
          <p className="text-sm font-black text-gray-900 mb-0.5">Choose a Template</p>
          <p className="text-xs text-gray-400">Start from a proven workflow or build from scratch</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TEMPLATES.map((t, i) => (
            <motion.button key={t.name} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.05 }}
              onClick={() => setSelected(t.name === selected ? null : t.name)}
              className={`text-left bg-white rounded-2xl border-2 p-4 transition-all shadow-sm hover:shadow-md ${
                selected === t.name ? "border-violet-400 shadow-violet-100" : "border-gray-200 hover:border-gray-300"
              }`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center text-xl shadow-sm flex-shrink-0`}>
                  {t.icon}
                </div>
                {selected === t.name && (
                  <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0 mt-1" />
                )}
              </div>
              <p className="text-xs font-bold text-gray-900 mb-1">{t.name}</p>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-2">{t.desc}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {t.nodes > 0 && (
                  <span className="text-[9px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded-full">{t.nodes} nodes</span>
                )}
                {t.tags.map(tag => (
                  <span key={tag} className="text-[9px] bg-violet-50 text-violet-600 font-bold px-1.5 py-0.5 rounded-full border border-violet-100">{tag}</span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
        {selected && (
          <motion.div initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }}
            className="mt-4 flex items-center justify-between bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-2xl px-5 py-3.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold">Selected: {selected}</span>
            </div>
            <button className="bg-white text-violet-700 text-xs font-black px-4 py-2 rounded-xl hover:bg-violet-50 transition shadow-sm">
              Open in Builder →
            </button>
          </motion.div>
        )}
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 4 — Execution log / monitoring ────────────────────────────────────
function ExecutionLogMockup() {
  const [expanded, setExpanded] = useState<number|null>(0);

  const EXECUTIONS = [
    {
      id:"EX-1042", workflow:"LinkedIn Outreach", status:"Completed", time:"2 min ago",
      steps:[
        { label:"Select List",    status:"done", output:"48 prospects loaded"          },
        { label:"LinkedIn Account",status:"done", output:"Connected: @airo_sales"      },
        { label:"AI LinkedIn Draft",status:"done",output:"Personalised 48 messages"   },
        { label:"Send Connection",  status:"done", output:"48 requests sent"            },
        { label:"Send Message",     status:"done", output:"36 accepted, 36 messages"   },
        { label:"Send SMS",         status:"done", output:"12 SMS sent via Twilio"      },
      ],
    },
    {
      id:"EX-1041", workflow:"Cold Email Sequence", status:"Running", time:"12 min ago",
      steps:[
        { label:"Campaign Trigger", status:"done",    output:"Triggered by campaign open"    },
        { label:"Fetch Responses",  status:"done",    output:"87 opens fetched"               },
        { label:"AI Draft",         status:"running", output:"Drafting personalised emails…" },
        { label:"Send Email",       status:"pending", output:"Waiting…"                       },
      ],
    },
    {
      id:"EX-1039", workflow:"Prospect Re-engage", status:"Failed", time:"1 day ago",
      steps:[
        { label:"Select List",     status:"done",   output:"22 prospects loaded"         },
        { label:"Delay (3 days)",  status:"done",   output:"Waited 3 days"               },
        { label:"Send LinkedIn",   status:"failed", output:"Error: Account disconnected" },
        { label:"Send Email",      status:"skipped",output:"Skipped due to previous error"},
      ],
    },
  ];

  const statusColor = (s: string) => ({
    done:"text-emerald-600 bg-emerald-50",
    running:"text-blue-600 bg-blue-50",
    pending:"text-gray-500 bg-gray-100",
    failed:"text-red-600 bg-red-50",
    skipped:"text-amber-600 bg-amber-50",
  }[s] ?? "text-gray-500 bg-gray-100");

  const execStatusColor = (s: string) => ({
    Completed: "text-emerald-700 bg-emerald-100",
    Running:   "text-blue-700 bg-blue-100",
    Failed:    "text-red-700 bg-red-100",
  }[s] ?? "text-gray-600 bg-gray-100");

  return (
    <ScreenFrame title="360Airo — Execution Log" url="app.360airo.com/ai-automation/logs">
      <div className="bg-gray-50 p-5">
        <p className="text-sm font-black text-gray-900 mb-4">Execution History</p>
        <div className="space-y-3">
          {EXECUTIONS.map((ex, i) => (
            <div key={ex.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition text-left"
                onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ex.status==="Completed"?"bg-emerald-500":ex.status==="Running"?"bg-blue-500":"bg-red-400"}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-gray-900">{ex.workflow}</p>
                      <span className="text-[9px] font-mono text-gray-400">{ex.id}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{ex.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${execStatusColor(ex.status)}`}>{ex.status}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expanded===i?"rotate-180":""}`} />
                </div>
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} transition={{ duration:0.2 }}>
                    <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                      <div className="space-y-1.5">
                        {ex.steps.map((step, j) => (
                          <div key={j} className="flex items-center gap-3 text-xs">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              step.status==="done"?"bg-emerald-500":step.status==="running"?"bg-blue-500":step.status==="failed"?"bg-red-400":step.status==="pending"?"bg-gray-300":"bg-amber-400"
                            }`} />
                            <span className="font-semibold text-gray-700 w-32 truncate flex-shrink-0">{step.label}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${statusColor(step.status)}`}>{step.status}</span>
                            <span className="text-gray-400 text-[10px] truncate">{step.output}</span>
                          </div>
                        ))}
                      </div>
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

// ─── Main Page ────────────────────────────────────────────────────────────────
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
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin:"-20% 0px -70% 0px" }
      );
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

                {/* Title block */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Workflow Automation</h1>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    360Airo's Workflow Automation lets you build end-to-end multichannel outreach sequences
                    using a visual node-based builder — combining LinkedIn, email, SMS, and AI personalisation
                    into fully automated workflows with zero code.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── What is workflow automation ──────────────────────── */}
                <motion.div id="what-is-workflow-automation" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    A <strong>workflow</strong> in 360Airo is a sequence of connected <strong>nodes</strong> — each
                    node representing one action, trigger, or logic step. You connect nodes visually in the
                    Automation Builder canvas, configure each step, and 360Airo executes the entire sequence
                    automatically on your behalf.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Zap,      bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"Visual node builder",   desc:"Drag and drop nodes onto a canvas, connect them with arrows, and build complex multi-step automations without writing a single line of code" },
                      { icon:Brain,    bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"AI-powered actions",    desc:"Every workflow can include AI Draft nodes that personalise LinkedIn messages, emails, and SMS at scale using your prospect's profile data" },
                      { icon:Layers,   bg:"bg-emerald-50", color:"text-emerald-600", border:"border-emerald-200", title:"Multichannel by default", desc:"LinkedIn, email, SMS, and delays all live in the same canvas — mix and sequence channels exactly the way your outreach strategy demands" },
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
                    <span>
                      <strong>Workflow Automation</strong> is found in the sidebar under <strong>AI Automation</strong>.
                      This is separate from Email Campaign sequences — workflows give you full control over
                      multichannel logic, conditions, delays, and AI personalisation in one place.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── My Workflows Dashboard ───────────────────────────── */}
                <motion.div id="my-workflows-dashboard" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">My Workflows dashboard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The My Workflows dashboard is the home screen of AI Automation. It shows all your workflows
                    with live execution counts, status, and channel tags. Use the search bar and status tabs —
                    both are interactive in the mockup below.
                  </p>
                  <div className="mb-5"><WorkflowsDashboardMockup /></div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Dashboard stats explained</p>
                    </div>
                    {[
                      ["Total Workflows",    "Number of workflow automations you've created (Active + Archived)"],
                      ["Email Replies Sent", "Total email replies generated and sent by workflows across all executions"],
                      ["Requests Sent",      "Total LinkedIn connection requests and other outreach requests sent by workflows"],
                      ["Total Executions",   "How many times all your workflows have been run — each execution processes your prospect list from start to finish"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[160px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Create new workflow ──────────────────────────────── */}
                <motion.div id="create-new-workflow" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.14 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Create a new workflow</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Click <strong>+ Create New Automation</strong> on the dashboard to open the template picker.
                    Choose a pre-built template to start with a fully configured node setup, or select
                    <strong> Blank Workflow</strong> to start from an empty canvas. All cards are interactive below.
                  </p>
                  <div className="mb-5"><TemplatePickerMockup /></div>
                  <ul className="space-y-2">
                    {[
                      ["LinkedIn Outreach + SMS",  "6-node workflow: Select List → LinkedIn Account → AI Draft → Send Connection → Send Message → Send SMS. Best for LinkedIn-first outreach with SMS follow-up"],
                      ["Cold Email Sequence",       "4-node workflow: AI drafts and sends a personalised cold email with up to 3 follow-ups based on whether the prospect opened the previous email"],
                      ["Prospect Re-engagement",    "5-node multichannel sequence that re-engages cold leads with a LinkedIn touch followed by a personalised email"],
                      ["Blank Workflow",            "Start with an empty canvas and drag in any combination of trigger, data, AI, logic, and action nodes"],
                    ].map(([title,desc],i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 list-none">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Automation Builder ───────────────────────────────── */}
                <motion.div id="automation-builder" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Automation Builder</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The Automation Builder is 360Airo's visual workflow canvas. The mockup below is fully
                    interactive — click any node to open its Configuration panel on the right. Use the filter
                    chips and search bar in the left node library to find specific nodes. Zoom with the + / - buttons.
                  </p>
                  <div className="mb-5"><AutomationBuilderMockup /></div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Layers,    bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"Left panel — Node Library", desc:"Browse and search all available nodes. Filter by type (Trigger, Data, AI, Logic, Action). Drag any node onto the canvas to add it to your workflow." },
                      { icon:Target,    bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"Centre — Canvas",           desc:"The main editing area where you connect nodes. Nodes appear as cards; click one to configure it. Use the zoom controls or pinch-to-zoom to navigate large workflows." },
                      { icon:Settings,  bg:"bg-emerald-50", color:"text-emerald-600", border:"border-emerald-200", title:"Right panel — Configuration",desc:"When you click a node, its settings appear here. Configure inputs, credentials, AI prompts, delays, and conditions specific to that node type." },
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

                  {/* Flow breadcrumb explanation */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Builder UI elements explained</p>
                    </div>
                    {[
                      ["Flow bar",          "The horizontal bar at the top showing each node in sequence — gives a birds-eye view of your workflow without scrolling the canvas"],
                      ["Setup X/5 badge",   "Orange badge showing how many required fields are still incomplete. Clicking it lists exactly which fields are missing"],
                      ["Node connection",   "Nodes connect via dashed lines with coloured dots. Blue dots are active connections; grey/dark dots indicate an AI or conditional branch node"],
                      ["Execute button",    "Runs the workflow immediately. 360Airo processes your entire prospect list through every node in sequence"],
                      ["Save button",       "Saves the current node layout and all configuration settings without running the workflow"],
                      ["Zoom controls",     "Use + / - or the slider to zoom the canvas. 80% is the default view for most workflows. Fullscreen button expands the canvas to fill the window"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[140px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Node types ───────────────────────────────────────── */}
                <motion.div id="node-types" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.18 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Node types</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Every workflow is built from five categories of nodes. Combine them in any order to build
                    the outreach logic your campaigns require.
                  </p>

                  <div className="space-y-3 mb-5">
                    {[
                      {
                        type:"TRIGGER", icon:Zap, bg:"bg-blue-50", border:"border-blue-200", color:"text-blue-700",
                        title:"Trigger nodes",
                        desc:"The entry point of every workflow. Defines what event starts execution.",
                        nodes:[
                          { name:"Campaign",       detail:"Fires when a prospect meets a condition in a running campaign (e.g. opened email, clicked link)" },
                          { name:"Scheduled",      detail:"Runs the workflow at a defined time or on a recurring schedule (daily, weekly)" },
                          { name:"Manual",         detail:"Triggered manually from the dashboard by clicking Execute" },
                        ],
                      },
                      {
                        type:"DATA", icon:Target, bg:"bg-emerald-50", border:"border-emerald-200", color:"text-emerald-700",
                        title:"Data nodes",
                        desc:"Fetch or prepare the prospect data your workflow will act on.",
                        nodes:[
                          { name:"Select List",       detail:"Loads a prospect list from your 360Airo Email Lists — all prospects in the list will flow through the workflow" },
                          { name:"Fetch Responses",   detail:"Pulls response data from a running campaign — useful for follow-up workflows triggered by replies or opens" },
                        ],
                      },
                      {
                        type:"AI", icon:Brain, bg:"bg-violet-50", border:"border-violet-200", color:"text-violet-700",
                        title:"AI nodes",
                        desc:"Use 360Airo's AI to personalise messages at scale.",
                        nodes:[
                          { name:"AI LinkedIn Draft", detail:"Generates a personalised LinkedIn message for each prospect using their profile, company, and role data" },
                          { name:"AI Email Draft",    detail:"Creates a personalised cold email body for each prospect — uses merge tags and AI context for human-like personalisation" },
                        ],
                      },
                      {
                        type:"LOGIC", icon:GitBranch, bg:"bg-amber-50", border:"border-amber-200", color:"text-amber-700",
                        title:"Logic nodes",
                        desc:"Control the flow of your workflow with conditions and delays.",
                        nodes:[
                          { name:"Delay",   detail:"Pauses the workflow for a set number of hours or days before continuing to the next node" },
                          { name:"Branch",  detail:"Splits the workflow into two paths based on a condition (e.g. 'if LinkedIn accepted → path A; else → path B')" },
                        ],
                      },
                      {
                        type:"ACTION", icon:Play, bg:"bg-pink-50", border:"border-pink-200", color:"text-pink-700",
                        title:"Action nodes",
                        desc:"The steps that actually do something — send a message, make a call, update a field.",
                        nodes:[
                          { name:"Send Connection",  detail:"Sends a LinkedIn connection request (with optional personalised note) to each prospect" },
                          { name:"Send Message",     detail:"Sends a LinkedIn direct message once the prospect has accepted the connection request" },
                          { name:"Send Email",       detail:"Sends an email via your connected sender account — works with all ESPs and respects warmup limits" },
                          { name:"Send SMS",         detail:"Sends an SMS via your Twilio integration — requires a Twilio config to be connected in Settings" },
                          { name:"LinkedIn Account", detail:"Connects a LinkedIn account to the workflow — all LinkedIn action nodes in this workflow use this account" },
                        ],
                      },
                    ].map((cat,i) => {
                      const Icon = cat.icon;
                      return (
                        <motion.div key={cat.type} initial={{ opacity:0,x:-8 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.18+i*0.06 }}
                          className={`rounded-xl border ${cat.border} ${cat.bg} overflow-hidden`}>
                          <div className="px-4 py-3 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-white border ${cat.border} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-4 h-4 ${cat.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className={`text-sm font-bold ${cat.color}`}>{cat.title}</p>
                                <NodeTypeBadge type={cat.type as any} />
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
                            </div>
                          </div>
                          <div className="border-t border-white/50 divide-y divide-white/50">
                            {cat.nodes.map(n => (
                              <div key={n.name} className="px-4 py-2 flex items-start gap-2 bg-white/50">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor:"currentColor" }} />
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

                {/* ── Workflow templates ───────────────────────────────── */}
                <motion.div id="workflow-templates" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Workflow templates</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    360Airo ships with a library of pre-built workflow templates covering the most common
                    outreach patterns. You can also access templates from <strong>within the builder</strong>
                    by clicking the Templates button at the top of the left panel.
                  </p>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Pre-built workflow templates</p>
                    </div>
                    {[
                      ["LinkedIn Outreach + SMS",  "6", "LinkedIn, SMS, AI",    "Connect on LinkedIn → AI personalised message → Twilio SMS follow-up after acceptance"],
                      ["Cold Email Sequence",       "4", "Email, AI",            "AI-personalised cold email with 2 automatic follow-ups on open or no-reply"],
                      ["Prospect Re-engagement",    "5", "Email, LinkedIn",      "Re-engage prospects who went cold with a LinkedIn touch + personalised email"],
                      ["Inbound Lead Nurture",      "7", "Email, Delay, AI",     "Triggered when a prospect opens your campaign email — sends a warm nurture sequence"],
                      ["Demo Follow-Up",            "3", "Email, SMS",           "Sends personalised follow-up 24 hours after a demo call via email + SMS"],
                      ["Event Invitation",          "4", "Email, LinkedIn, AI",  "Invite prospects to a webinar or event with AI-personalised copy across both channels"],
                    ].map(([name,nodes,channels,desc],i) => (
                      <div key={name} className={`grid grid-cols-[1fr_50px_110px] gap-2 px-4 py-3 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <div>
                          <p className="font-bold text-gray-800 mb-0.5">{name}</p>
                          <p className="text-[10px] text-gray-400 leading-relaxed">{desc}</p>
                        </div>
                        <span className="text-gray-400 font-mono text-center self-start pt-0.5">{nodes} nodes</span>
                        <span className="text-[9px] text-violet-600 font-semibold self-start pt-0.5 leading-relaxed">{channels}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Execute & monitor ────────────────────────────────── */}
                <motion.div id="execute-monitor" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Execute & monitor</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Once your workflow is configured, hit <strong>Execute</strong> to run it. 360Airo processes
                    every prospect in your list through all nodes in sequence. Track progress in real time in the
                    execution log — click any execution row to expand its step-by-step status.
                  </p>
                  <div className="mb-5"><ExecutionLogMockup /></div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:CheckCircle2, bg:"bg-emerald-50", border:"border-emerald-200", color:"text-emerald-700", title:"Completed",   desc:"All nodes ran successfully for every prospect in the list. Check step outputs for counts and details." },
                      { icon:Activity,     bg:"bg-blue-50",    border:"border-blue-200",    color:"text-blue-700",    title:"Running",     desc:"Currently in progress. You can view which node is active in real time by expanding the execution row." },
                      { icon:AlertCircle,  bg:"bg-red-50",     border:"border-red-200",     color:"text-red-700",     title:"Failed",      desc:"One or more nodes encountered an error. Expand the row to see which step failed and why — e.g. disconnected LinkedIn account." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22+i*0.07 }}
                          className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className={`w-4 h-4 ${item.color}`} />
                            <p className={`text-sm font-bold ${item.color}`}>{item.title}</p>
                          </div>
                          <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Before executing:</strong> Make sure all required nodes are configured and the Setup
                      badge reads <strong>Setup 5/5</strong> (no missing fields). Running a workflow with missing
                      configurations will result in a Failed execution.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Best practices ───────────────────────────────────── */}
                <motion.div id="best-practices" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Best practices</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:Target,      color:"bg-violet-600",  title:"Always start with a template",                     desc:"Templates are pre-validated, proven workflows built around 360Airo's best-performing outreach patterns. Customise from a template rather than building from scratch — you'll save hours and avoid common configuration mistakes." },
                      { icon:Brain,       color:"bg-blue-600",    title:"Use AI Draft nodes for every personalised message",  desc:"AI Draft nodes use your prospect's name, company, title, and industry to craft messages that feel 1:1 even at scale. Generic broadcast messages get flagged as spam by LinkedIn and email providers — personalisation is not optional." },
                      { icon:Timer,       color:"bg-emerald-600", title:"Add Delay nodes between every channel touch",        desc:"Never send a LinkedIn connection request and an email on the same day. Use Delay nodes to space touches by 24–72 hours minimum. This mirrors human behaviour and avoids appearing automated to spam filters." },
                      { icon:GitBranch,   color:"bg-amber-500",   title:"Use Branch nodes for condition-based paths",         desc:"Build separate paths for prospects who accepted your LinkedIn request vs those who didn't, or for opens vs no-opens. Branch nodes let you treat different prospect segments appropriately within a single workflow." },
                      { icon:BarChart2,   color:"bg-pink-600",    title:"Review execution logs after every run",              desc:"Expand each execution row to check step-by-step outputs. Look for unexpected drop-offs between nodes — e.g. if 48 connections were sent but only 12 messages were sent, check whether LinkedIn acceptance rates are lower than expected." },
                      { icon:RefreshCw,   color:"bg-teal-600",    title:"Archive rather than delete completed workflows",     desc:"Archiving a workflow preserves all its execution history and metrics. Deleting removes everything permanently. If you think you might re-use a workflow or want to reference its performance data, archive it instead." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.25+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-violet-200 hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Quick reference */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                      <p className="text-xs font-bold text-gray-700">Workflow Automation — quick reference</p>
                    </div>
                    {[
                      ["Where to find it",     "Sidebar → AI Automation → My Workflows"],
                      ["Create workflow",       "Click + Create New Automation → choose template or start blank"],
                      ["Node types",           "Trigger, Data, AI, Logic, Action (11 nodes total across all types)"],
                      ["LinkedIn requirement", "A connected LinkedIn account is required for LinkedIn action nodes"],
                      ["SMS requirement",      "A Twilio config must be connected in Settings for Send SMS nodes"],
                      ["Execution",            "Click Execute in the builder — processes the full prospect list through all nodes"],
                      ["Status scores",        "Completed, Running, Failed — expand any row for step-by-step output"],
                      ["Templates",            "6 pre-built templates available; also accessible from within the builder"],
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
                      <strong>Pro tip:</strong> The most effective 360Airo workflows combine at least three channels —
                      LinkedIn connection, personalised email, and SMS follow-up. Three-touch multichannel
                      sequences consistently outperform single-channel campaigns by 2–3× on reply rate, because
                      each channel reaches prospects in a different context and at a different time of day.
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