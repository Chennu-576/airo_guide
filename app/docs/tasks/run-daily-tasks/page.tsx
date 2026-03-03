"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  CheckCircle2, Info, Users, MessageSquare, UserPlus,
  Play, ListChecks, ArrowRight, Phone, Mail, Chrome,
  Calendar, Flag, MoreHorizontal, SkipForward, BellOff,
  Trash2, CircleCheck, Zap, AlarmClock, Filter,
  MousePointerClick, LayoutList,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "overview",    label: "How it works"         },
  { id: "navigate",   label: "Step 1 – Navigate"     },
  { id: "select",     label: "Step 2 – Select tasks" },
  { id: "run",        label: "Step 3 – Run tasks"    },
  { id: "statuses",   label: "Task statuses"         },
  { id: "actions",    label: "Status actions"        },
];

// ─── Status tab data ──────────────────────────────────────────────────────────
const statusTabs = [
  { key: "today",     label: "Today",     color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200",    dot: "bg-blue-500"    },
  { key: "upcoming",  label: "Upcoming",  color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200",  dot: "bg-violet-500"  },
  { key: "due",       label: "Due",       color: "text-red-600",     bg: "bg-red-50",     border: "border-red-200",     dot: "bg-red-500"     },
  { key: "completed", label: "Completed", color: "text-green-600",   bg: "bg-green-50",   border: "border-green-200",   dot: "bg-green-500"   },
  { key: "skipped",   label: "Skipped",   color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200",   dot: "bg-amber-500"   },
  { key: "snoozed",   label: "Snoozed",   color: "text-orange-600",  bg: "bg-orange-50",  border: "border-orange-200",  dot: "bg-orange-500"  },
  { key: "archived",  label: "Archived",  color: "text-gray-500",    bg: "bg-gray-50",    border: "border-gray-200",    dot: "bg-gray-400"    },
] as const;

// ─── Action options data ──────────────────────────────────────────────────────
const actionOptions = [
  {
    icon: CircleCheck,
    color: "text-green-600",   bg: "bg-green-50",   border: "border-green-200",
    title: "Mark Task Complete",
    desc:  "Marks the task as done. The campaign is considered complete for this prospect — no further steps.",
    badge: "Ends sequence",    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: Zap,
    color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200",
    title: "Done and Proceed",
    desc:  "Marks the task as done and automatically starts the next task in the campaign sequence for this prospect.",
    badge: "Advances sequence",badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: SkipForward,
    color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200",
    title: "Skip",
    desc:  "Marks this task as skipped and automatically moves to the next task in the sequence — useful when a prospect is unreachable right now.",
    badge: "Advances sequence",badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: AlarmClock,
    color: "text-orange-600",  bg: "bg-orange-50",  border: "border-orange-200",
    title: "Snooze",
    desc:  "Marks the task as snoozed. It reappears in your task list once the snooze period ends — nothing is lost or skipped.",
    badge: "Reappears later",  badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    icon: Trash2,
    color: "text-red-600",     bg: "bg-red-50",     border: "border-red-200",
    title: "Delete",
    desc:  "Permanently removes this task. Use carefully — deleted tasks cannot be recovered and the campaign will not reschedule this step.",
    badge: "Permanent",        badgeColor: "bg-red-100 text-red-700",
  },
];

// ─── AskAI ────────────────────────────────────────────────────────────────────
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
            <input autoFocus
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How do I snooze a task?" />
            <button className="mt-2 w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
              Ask
            </button>
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
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Table of Contents
            </span>
          </div>
          <nav className="py-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id
                    ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>{item.label}</a>
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
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center flex-shrink-0">
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

// ─── Step 1 – Navigate Mockup ─────────────────────────────────────────────────
function NavigateMockup() {
  const navItems = [
    { icon: LayoutList,  label: "Dashboard",     active: false },
    { icon: Mail,        label: "Campaigns",     active: false },
    { icon: Users,       label: "Prospects",     active: false },
    { icon: ListChecks,  label: "Tasks",         active: true  },
    { icon: Phone,       label: "Calling",       active: false },
  ];

  return (
    <BrowserFrame title="360Airo — Left Navigation Panel">
      <div className="bg-gray-50 p-5">
        <div className="flex gap-3">
          {/* Sidebar strip */}
          <div className="w-44 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
            <div className="px-3 py-3 border-b border-gray-100 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                <span className="text-white text-[8px] font-black">360</span>
              </div>
              <span className="text-xs font-bold text-gray-800">360Airo</span>
            </div>
            <div className="py-2">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label}
                    className={`flex items-center gap-2.5 px-3 py-2.5 mx-2 rounded-xl text-xs font-semibold transition ${
                      item.active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}>
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {item.label}
                    {item.active && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main panel preview */}
          <div className="flex-1 bg-white rounded-2xl border border-blue-200 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
                <ListChecks className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Tasks</p>
                <p className="text-xs text-gray-400">Your daily multichannel queue</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <p className="text-xs text-blue-700">
                Click <strong>Tasks</strong> in the left panel to open the Task Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Step 2 – Task List Mockup ────────────────────────────────────────────────
function TaskListMockup() {
  const [activeStatus, setActiveStatus] = useState<string>("today");
  const [activeChannel, setActiveChannel] = useState<string>("all");
  const [assignee, setAssignee] = useState("All Assignees");

  const channels = [
    { key: "all",      label: "All",      icon: LayoutList  },
    { key: "linkedin", label: "LinkedIn", icon: UserPlus    },
    { key: "email",    label: "Email",    icon: Mail        },
    { key: "call",     label: "Call",     icon: Phone       },
    { key: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  ];

  const tasks = [
    { id: 0, prospect: "Sarah Chen",   company: "Acme Corp",    channel: "linkedin", action: "Connection Request", priority: "high"   },
    { id: 1, prospect: "James Miller", company: "TechFlow Inc", channel: "linkedin", action: "LinkedIn Message",   priority: "medium" },
    { id: 2, prospect: "Priya Sharma", company: "StartupX",     channel: "call",     action: "Call",               priority: "high"   },
    { id: 3, prospect: "Lisa Wang",    company: "CloudBase",    channel: "email",    action: "Manual Email",       priority: "medium" },
  ];

  const channelIcon: Record<string, typeof UserPlus> = {
    linkedin: UserPlus, email: Mail, call: Phone, whatsapp: MessageSquare,
  };
  const channelColor: Record<string, string> = {
    linkedin: "bg-blue-50 text-blue-700", email: "bg-pink-50 text-pink-700",
    call: "bg-orange-50 text-orange-700", whatsapp: "bg-emerald-50 text-emerald-700",
  };
  const priorityColor: Record<string, string> = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const filtered = activeChannel === "all" ? tasks : tasks.filter(t => t.channel === activeChannel);

  return (
    <BrowserFrame title="360Airo — Task Manager · Today's Tasks">
      <div className="bg-gray-50 p-5">
        {/* Assignee dropdown */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">Assignee:</span>
          </div>
          <div className="relative">
            <select
              value={assignee}
              onChange={e => setAssignee(e.target.value)}
              className="text-xs border border-gray-200 bg-white rounded-lg px-3 py-1.5 pr-7 outline-none focus:ring-2 focus:ring-blue-200 font-medium text-gray-700 appearance-none">
              <option>All Assignees</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 mb-3 overflow-x-auto pb-1 flex-wrap">
          {statusTabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveStatus(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap transition ${
                activeStatus === tab.key
                  ? `${tab.bg} ${tab.color} ${tab.border} shadow-sm`
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
              }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Channel filter */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {channels.map(ch => {
            const Icon = ch.icon;
            return (
              <button key={ch.key} onClick={() => setActiveChannel(ch.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  activeChannel === ch.key
                    ? "bg-blue-600 text-white border-transparent shadow-md"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                }`}>
                <Icon className="w-3 h-3" />
                {ch.label}
              </button>
            );
          })}
        </div>

        {/* Task rows */}
        <div className="space-y-2">
          {filtered.map(task => {
            const Icon = channelIcon[task.channel] ?? Mail;
            return (
              <motion.div key={task.id} layout
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:border-gray-200 transition">
                <input type="checkbox" className="w-3.5 h-3.5 accent-blue-600 flex-shrink-0" />
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${channelColor[task.channel]}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">
                    {task.prospect}
                    <span className="font-normal text-gray-400"> · {task.company}</span>
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{task.action}</p>
                </div>
                <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-full flex-shrink-0 ${priorityColor[task.priority]}`}>
                  {task.priority}
                </span>
                <button className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition flex-shrink-0">
                  Run
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Run selected bar */}
        <div className="mt-4 flex items-center justify-between gap-3 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-3.5 h-3.5 accent-white flex-shrink-0" defaultChecked />
            <p className="text-xs font-bold text-white">Select all · {filtered.length} tasks</p>
          </div>
          <button className="flex items-center gap-1.5 bg-white text-blue-700 text-xs font-black px-4 py-2 rounded-xl hover:bg-blue-50 transition shadow-md">
            <Play className="w-3.5 h-3.5" /> Run selected tasks
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Step 3 – Run Task Pop-up Mockup ─────────────────────────────────────────
function RunTaskMockup() {
  const [taskIdx, setTaskIdx] = useState(0);
  const [content, setContent] = useState(
    "Hi Sarah, I came across your profile at Acme Corp and was really impressed by your work in enterprise SaaS. I'd love to connect and share some ideas — would be great to have you in my network!"
  );
  const [done, setDone] = useState(false);

  const tasks = [
    { prospect: "Sarah Chen",   company: "Acme Corp",    action: "Connection Request", channel: "linkedin", note: "Met at SaaStr 2024 · Interested in outreach tools"         },
    { prospect: "James Miller", company: "TechFlow Inc", action: "LinkedIn Message",   channel: "linkedin", note: "Follow up from cold email · Decision maker for Q4 budget"  },
    { prospect: "Priya Sharma", company: "StartupX",     action: "Call",               channel: "call",     note: "Warm lead — clicked email link twice · Best time: mornings" },
  ];

  const current = tasks[taskIdx];
  const defaultContent = [
    "Hi Sarah, I came across your profile at Acme Corp and was really impressed by your work in enterprise SaaS. I'd love to connect and share some ideas — would be great to have you in my network!",
    "Hi James, just following up on my earlier email — I'd love to chat more about how 360Airo could help TechFlow's outreach this quarter. Let me know if you're open to a quick call!",
    "Hi Priya, calling to follow up on our email conversation. Would love to walk you through what 360Airo can do for StartupX — takes just 15 mins.",
  ];

  const goNext = () => {
    if (taskIdx < tasks.length - 1) {
      setTaskIdx(i => i + 1);
      setContent(defaultContent[taskIdx + 1]);
      setDone(false);
    }
  };

  return (
    <BrowserFrame title="360Airo — Run Task · Pop-up Window">
      <div className="bg-gray-50/60 p-4">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-4">
          {tasks.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < taskIdx ? "bg-green-400" : i === taskIdx ? "bg-blue-500" : "bg-gray-200"}`} />
          ))}
          <span className="text-[10px] text-gray-400 font-bold ml-1">{taskIdx + 1}/{tasks.length}</span>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Task header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                current.channel === "linkedin" ? "bg-blue-50 border-blue-200" : "bg-orange-50 border-orange-200"
              }`}>
                {current.channel === "linkedin"
                  ? <UserPlus className="w-4 h-4 text-blue-600" />
                  : <Phone className="w-4 h-4 text-orange-600" />}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{current.action}</p>
                <p className="text-[10px] text-gray-400">{current.prospect} · {current.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">High</span>
              <span className="text-[9px] font-bold bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">Today</span>
            </div>
          </div>

          {/* Notes */}
          <div className="px-5 py-3 border-b border-gray-100 bg-amber-50/50">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Notes</p>
            <p className="text-xs text-gray-600 leading-relaxed">{current.note}</p>
          </div>

          {/* Content */}
          {current.channel !== "call" ? (
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Message content <span className="normal-case font-normal text-gray-400">(editable before sending)</span>
              </p>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={3}
                className="w-full text-xs border border-blue-200 bg-blue-50/30 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 resize-none leading-relaxed text-gray-700" />
              <p className="text-[10px] text-gray-400 mt-1 text-right">{content.length} / 300 chars</p>
            </div>
          ) : (
            <div className="px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Ready to call?</p>
                <p className="text-xs text-gray-500">Open the 360Airo dialler or make the call manually, then choose a status below.</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-5 gap-1.5 px-5 pb-4 pt-1">
            {[
              { label: "Complete",      icon: CircleCheck,  style: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md col-span-2", action: () => { setDone(true); setTimeout(goNext, 700); } },
              { label: "Done & Next",   icon: Zap,          style: "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md col-span-2",  action: goNext },
              { label: "Skip",          icon: SkipForward,  style: "bg-white border border-amber-200 text-amber-600 hover:bg-amber-50",              action: goNext },
              { label: "Snooze",        icon: AlarmClock,   style: "bg-white border border-orange-200 text-orange-600 hover:bg-orange-50",           action: () => {}  },
              { label: "Delete",        icon: Trash2,       style: "bg-white border border-red-200 text-red-600 hover:bg-red-50",                     action: () => {} },
            ].map((btn, i) => {
              const Icon = btn.icon;
              return (
                <button key={i} onClick={btn.action}
                  className={`flex items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-bold border transition ${btn.style} ${(btn.label==="Skip"||btn.label==="Snooze"||btn.label==="Delete")?"col-span-1":""}`}>
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span className="hidden sm:inline">{btn.label}</span>
                </button>
              );
            })}
          </div>

          {/* Done overlay */}
          <AnimatePresence>
            {done && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                  <p className="text-sm font-bold text-green-700">Task Complete</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Status Actions Mockup ────────────────────────────────────────────────────
function StatusActionsMockup() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <BrowserFrame title="360Airo — Task Status Actions">
      <div className="bg-gray-50 p-5">
        <p className="text-xs text-gray-500 mb-3 font-medium">
          Click any action to preview what it does:
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {actionOptions.map((opt, i) => {
            const Icon = opt.icon;
            const isSelected = selected === i;
            return (
              <motion.button key={i} onClick={() => setSelected(isSelected ? null : i)}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected ? `${opt.bg} ${opt.border} shadow-sm` : "bg-white border-gray-200 hover:border-gray-300"
                }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${opt.bg}`}>
                    <Icon className={`w-3.5 h-3.5 ${opt.color}`} />
                  </div>
                  <p className="text-xs font-bold text-gray-900">{opt.title}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto ${opt.badgeColor}`}>
                    {opt.badge}
                  </span>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.p key="desc" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                      className={`text-xs leading-relaxed overflow-hidden ${opt.color}`}>
                      {opt.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
        <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 text-xs text-blue-700">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Tip:</strong> Use <strong>Done and Proceed</strong> as your default action — it marks the task complete and immediately queues the next step in the sequence.
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RunDailyTaskPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("overview");

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin: "-30% 0px -60% 0px" }
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
                <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">Tasks</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Run Multichannel Daily Task</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Run Multichannel Daily Task
                  </h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    A step-by-step guide to executing your daily LinkedIn, email, call, and WhatsApp tasks
                    in 360Airo — including how to navigate the task list, run tasks one by one or in bulk,
                    and update each task's status.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Overview ── */}
                <motion.div id="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    Each time a manual step in a campaign sequence comes due, 360Airo adds it to your Task Manager.
                    Tasks are grouped by <strong>status</strong> (Today, Upcoming, Due…) and <strong>channel</strong>
                    (LinkedIn, Email, Call…). Work through them daily — each completed task advances the campaign
                    sequence for that prospect automatically.
                  </p>

                  {/* 3 concept cards */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: MousePointerClick, bg: "bg-blue-50",    color: "text-blue-600",    border: "border-blue-200",    title: "Run one by one",   desc: "Open each task individually via pop-up — review notes, edit content, then choose a status action" },
                      { icon: ListChecks,        bg: "bg-violet-50",  color: "text-violet-600",  border: "border-violet-200",  title: "Run in bulk",      desc: "Select multiple tasks and click Run selected tasks to process them in quick succession" },
                      { icon: Zap,               bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-200", title: "5 status options", desc: "Complete, Done & Proceed, Skip, Snooze, or Delete — each advances your sequences differently" },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
                          className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
                          <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                          <p className={`text-sm font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <Chrome className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      <strong>Chrome extension required for LinkedIn tasks.</strong> Make sure the 360Airo
                      extension is installed and active in Chrome before running any LinkedIn actions.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 1 Navigate ── */}
                <motion.div id="navigate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[11px] font-black">1</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Open the Tasks tab</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Click <strong>Tasks</strong> in the left navigation panel of 360Airo to open the Task Manager.
                    This is your daily execution hub — all manual tasks from every active campaign land here.
                  </p>
                  <NavigateMockup />
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 2 Select ── */}
                <motion.div id="select" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[11px] font-black">2</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Filter and select your tasks</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Use the <strong>status tabs</strong> (Today, Upcoming, Due…) and <strong>channel filter</strong>
                    (LinkedIn, Email, Call, WhatsApp) to narrow your view. Choose an assignee, then select
                    tasks individually or all at once before clicking Run.
                  </p>
                  <div className="mb-5"><TaskListMockup /></div>
                  <div className="space-y-2">
                    {[
                      { step: "A", color: "bg-blue-600",    title: "Choose a status tab",    desc: "By default you land on Today. Switch to Due to catch overdue tasks, or Upcoming to preview what's coming next." },
                      { step: "B", color: "bg-violet-600",  title: "Filter by channel",      desc: "Click a channel pill (LinkedIn, Email, Call, WhatsApp) to see only tasks of that type — keeps your focus sharp." },
                      { step: "C", color: "bg-emerald-600", title: "Pick an assignee",       desc: "If your team has multiple users, filter by assignee to see only tasks assigned to a specific person." },
                      { step: "D", color: "bg-orange-500",  title: "Select tasks to run",    desc: "Tick individual checkboxes or use Select all, then click Run or Run selected tasks to open the execution pop-up." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-violet-200 hover:shadow-sm transition">
                        <div className={`w-7 h-7 rounded-full ${item.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 3 Run ── */}
                <motion.div id="run" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }} className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[11px] font-black">3</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Run tasks one by one</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 ml-10 leading-relaxed">
                    Each selected task opens in a pop-up window. Review the prospect's notes, edit the
                    pre-filled message content if needed, then choose a status action. Use the interactive
                    mockup below — click the action buttons to simulate running through tasks.
                  </p>
                  <div className="mb-5 relative"><RunTaskMockup /></div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Editable content.</strong> Every task pre-fills message content from your
                        campaign template. Edit it per prospect before executing for maximum personalisation.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Follow the same process for all channels.</strong> LinkedIn, email, WhatsApp,
                        and call tasks all use the same pop-up flow — just a different action at the end.
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Status Tabs ── */}
                <motion.div id="statuses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Task statuses</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Tasks in 360Airo move through 7 status states. Understanding each one helps you stay on
                    top of your queue and know where every task stands.
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-[100px_1fr] bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-3">Status</div>
                      <div className="px-4 py-3 border-l border-gray-200">What it means</div>
                    </div>
                    {[
                      { status: "Today",     dot: "bg-blue-500",    desc: "Tasks that are due and ready to run today. Start here every morning." },
                      { status: "Upcoming",  dot: "bg-violet-500",  desc: "Tasks scheduled for future dates — nothing to action yet." },
                      { status: "Due",       dot: "bg-red-500",     desc: "Tasks past their due date that haven't been run yet. Clear these first." },
                      { status: "Completed", dot: "bg-green-500",   desc: "Tasks marked as done — the campaign sequence advanced for these prospects." },
                      { status: "Skipped",   dot: "bg-amber-500",   desc: "Tasks you chose to skip — the sequence advanced to the next step." },
                      { status: "Snoozed",   dot: "bg-orange-500",  desc: "Tasks you deferred — they'll reappear when the snooze period ends." },
                      { status: "Archived",  dot: "bg-gray-400",    desc: "Tasks that are no longer active — deleted or expired from old campaigns." },
                    ].map((row, i) => (
                      <div key={row.status} className={`grid grid-cols-[100px_1fr] border-b border-gray-100 last:border-0 text-xs ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <div className="px-4 py-3 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${row.dot}`} />
                          <span className="font-semibold text-gray-800">{row.status}</span>
                        </div>
                        <div className="px-4 py-3 text-gray-600 border-l border-gray-100">{row.desc}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Status Actions ── */}
                <motion.div id="actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Status actions</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    When running a task, you have five actions to choose from. Each one updates the task status
                    and affects the campaign sequence differently. <strong>Click any action card</strong> in the
                    mockup below to see exactly what it does.
                  </p>
                  <div className="mb-5"><StatusActionsMockup /></div>

                  {/* Quick reference table */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-[1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <div className="px-4 py-3">Action</div>
                      <div className="px-4 py-3 border-x border-gray-200">Task status after</div>
                      <div className="px-4 py-3">Campaign sequence</div>
                    </div>
                    {[
                      { action: "Mark Complete", after: "Completed", seq: "Ends — no more steps for this prospect" },
                      { action: "Done & Proceed",after: "Completed", seq: "Advances to next step automatically"    },
                      { action: "Skip",          after: "Skipped",   seq: "Advances to next step automatically"    },
                      { action: "Snooze",        after: "Snoozed",   seq: "Paused — resumes after snooze expires"  },
                      { action: "Delete",        after: "Removed",   seq: "Step is gone permanently"               },
                    ].map((row, i) => (
                      <div key={row.action} className={`grid grid-cols-[1fr_1fr_1fr] border-b border-gray-100 last:border-0 text-xs ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <div className="px-4 py-3 font-semibold text-gray-800">{row.action}</div>
                        <div className="px-4 py-3 text-gray-600 border-x border-gray-100">{row.after}</div>
                        <div className="px-4 py-3 text-gray-600">{row.seq}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 7 months ago</span>
                </div>

                <div className="border-t border-gray-200 my-8" />

                {/* Learn About */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { href: "/docs/tasks/multi-channel-task",         icon: ListChecks, color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-200",   title: "Manage Multichannel Tasks",  desc: "Overview of the Task Manager dashboard, task types, and filters" },
                    { href: "/docs/linkedin-outreach/semi-automation", icon: UserPlus,  color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", title: "LinkedIn Semi-Automation",   desc: "Set up LinkedIn manual tasks inside a drip campaign sequence"    },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}
                        className={`flex items-start gap-3 p-4 rounded-xl border ${item.border} ${item.bg} hover:shadow-sm transition group`}>
                        <div className={`w-9 h-9 rounded-xl bg-white border ${item.border} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold ${item.color} mb-0.5`}>{item.title}</p>
                          <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
                        </div>
                        <ArrowRight className={`w-4 h-4 ${item.color} flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform`} />
                      </Link>
                    );
                  })}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center justify-between gap-4">
                  <Link href="/docs/tasks/multi-channel-task"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Manage Multichannel Tasks
                  </Link>
                  <Link href="/docs/personalization/ab-testing"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    A/B Testing
                    <ChevronRight className="w-4 h-4" />
                  </Link>
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