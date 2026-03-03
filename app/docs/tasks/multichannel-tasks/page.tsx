"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  CheckCircle2, Info, Zap, Shield, Users, MessageSquare,
  UserPlus, Play, Settings, ListChecks, Star, ArrowRight,
  Phone, Mail, Chrome, Filter, SlidersHorizontal, Calendar,
  Flag, MoreHorizontal, BadgeCheck, CircleDot, Layers,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

const TOC = [
  { id: "overview",   label: "What is the Task Manager" },
  { id: "dashboard",  label: "Task Manager dashboard"   },
  { id: "task-types", label: "Task types"               },
  { id: "managing",   label: "Managing tasks"           },
  { id: "faqs",       label: "FAQs"                     },
];

const taskTypes = [
  { icon: UserPlus,      color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200",    title: "LinkedIn Connection Request", desc: "Sends a personalised connection request. Requires the 360Airo Chrome extension and an active LinkedIn session.",         badge: "Manual", badgeColor: "bg-amber-100 text-amber-700" },
  { icon: MessageSquare, color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200",  title: "LinkedIn Message",            desc: "Sends a pre-written (editable) message to a first-degree LinkedIn connection. Content pre-filled from your sequence.",   badge: "Manual", badgeColor: "bg-amber-100 text-amber-700" },
  { icon: Users,         color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", title: "LinkedIn Profile View",        desc: "Visits a prospect's LinkedIn profile to warm them up before a connection request or message. Quick — just one click.",     badge: "Manual", badgeColor: "bg-amber-100 text-amber-700" },
  { icon: Phone,         color: "text-orange-600",  bg: "bg-orange-50",  border: "border-orange-200",  title: "Call Task",                   desc: "Reminds you to call a prospect at the scheduled time. Opens the 360Airo dialler or logs the call as complete after you've made it.", badge: "Manual", badgeColor: "bg-amber-100 text-amber-700" },
  { icon: Mail,          color: "text-pink-600",    bg: "bg-pink-50",    border: "border-pink-200",    title: "Email (Manual)",              desc: "A manually triggered email step — useful when you want to review and personalise the message before sending.",             badge: "Manual", badgeColor: "bg-amber-100 text-amber-700" },
  { icon: MessageSquare, color: "text-teal-600",    bg: "bg-teal-50",    border: "border-teal-200",    title: "WhatsApp / SMS",              desc: "Prompts you to send a WhatsApp or SMS message. Pre-written content from your sequence is shown and editable before sending.", badge: "Manual", badgeColor: "bg-amber-100 text-amber-700" },
];

const faqs = [
  { q: "Do I need a LinkedIn profile to use multichannel tasks?",         a: "A LinkedIn profile is required only for LinkedIn-related tasks (connection requests, messages, profile views). All other channels — email, call, WhatsApp, SMS — work without any LinkedIn account.",                                                                                                          icon: Users,         color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200",    activeBorder: "border-blue-400"    },
  { q: "Do I need LinkedIn Sales Navigator for multichannel outreach?",   a: "No. LinkedIn outreach in 360Airo works with free, Premium, and Sales Navigator accounts. Sales Navigator only becomes relevant if you want to send InMails to prospects you're not connected with.",                                                                                                            icon: BadgeCheck,    color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200",  activeBorder: "border-violet-400"  },
  { q: "How many LinkedIn connection requests can I send per week?",       a: "LinkedIn allows 20–25 connection requests per day and around 100 per week on standard accounts. Accounts with a high Social Selling Index score may reach up to 200 per week. 360Airo lets you cap this in campaign settings.",                                                                               icon: Shield,        color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", activeBorder: "border-emerald-400" },
  { q: "Can I use LinkedIn InMail without Sales Navigator?",               a: "InMail is available on all paid LinkedIn plans (Premium, Recruiter Lite, Sales Navigator). Free accounts can only message first-degree connections. InMails have a 2,000 character limit and allow messaging anyone, regardless of connection status.",                                                         icon: Mail,          color: "text-orange-600",  bg: "bg-orange-50",  border: "border-orange-200",  activeBorder: "border-orange-400"  },
  { q: "Is Chrome browser required for multichannel tasks?",               a: "Yes — the 360Airo Chrome extension is required for LinkedIn tasks. It acts as the bridge between 360Airo's task queue and your LinkedIn browser session. Other task types (call, email, WhatsApp) work without the extension.",                                                                                icon: Chrome,        color: "text-pink-600",    bg: "bg-pink-50",    border: "border-pink-200",    activeBorder: "border-pink-400"    },
  { q: "Can I schedule and automate LinkedIn tasks?",                      a: "Tasks can be scheduled — they appear as reminders on the due date in 360Airo's Task Manager. However, execution is always manual: you complete each LinkedIn action yourself using the extension. Full automation of LinkedIn activity is not recommended as it risks account restrictions.",                   icon: Calendar,      color: "text-teal-600",    bg: "bg-teal-50",    border: "border-teal-200",    activeBorder: "border-teal-400"    },
  { q: "Is there a due date and priority option for tasks?",               a: "Yes. Every task in 360Airo has a due date and a priority level. You can sort and filter your task queue by date or priority so you always work on the most important outreach first.",                                                                                                                          icon: Flag,          color: "text-gray-600",    bg: "bg-gray-50",    border: "border-gray-200",    activeBorder: "border-gray-400"    },
];

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
              placeholder="e.g. How do I complete a LinkedIn task?" />
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
                  active === item.id ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

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

function TaskDashboardMockup() {
  const [activeTab, setActiveTab] = useState<"all"|"linkedin"|"call"|"email">("all");
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const allTasks = [
    { id:0, prospect:"Sarah Chen",   company:"Acme Corp",    action:"Connection Request", channel:"linkedin", icon:UserPlus,      color:"bg-blue-50 text-blue-700",      dot:"bg-blue-500",    priority:"high",   due:"Today"    },
    { id:1, prospect:"James Miller", company:"TechFlow Inc", action:"LinkedIn Message",   channel:"linkedin", icon:MessageSquare, color:"bg-violet-50 text-violet-700",   dot:"bg-violet-500",  priority:"medium", due:"Today"    },
    { id:2, prospect:"Priya Sharma", company:"StartupX",     action:"Call",               channel:"call",     icon:Phone,         color:"bg-orange-50 text-orange-700",   dot:"bg-orange-500",  priority:"high",   due:"Today"    },
    { id:3, prospect:"David Park",   company:"GrowthLabs",   action:"Profile View",       channel:"linkedin", icon:Users,         color:"bg-emerald-50 text-emerald-700", dot:"bg-emerald-500", priority:"low",    due:"Tomorrow" },
    { id:4, prospect:"Lisa Wang",    company:"CloudBase",    action:"Manual Email",       channel:"email",    icon:Mail,          color:"bg-pink-50 text-pink-700",       dot:"bg-pink-500",    priority:"medium", due:"Today"    },
  ];
  const filtered = activeTab === "all" ? allTasks : allTasks.filter(t => t.channel === activeTab);
  const priorityColor: Record<string,string> = { high:"bg-red-100 text-red-700 border-red-200", medium:"bg-amber-100 text-amber-700 border-amber-200", low:"bg-gray-100 text-gray-500 border-gray-200" };
  const tabs = [
    { key:"all",     label:"All Tasks", count:allTasks.length },
    { key:"linkedin",label:"LinkedIn",  count:allTasks.filter(t=>t.channel==="linkedin").length },
    { key:"call",    label:"Calls",     count:allTasks.filter(t=>t.channel==="call").length },
    { key:"email",   label:"Email",     count:allTasks.filter(t=>t.channel==="email").length },
  ] as const;

  return (
    <BrowserFrame title="360Airo — Multichannel Task Manager">
      <div className="bg-gray-50 p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
                <ListChecks className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Task Manager</p>
              <p className="text-xs text-gray-400">{doneIds.length}/{allTasks.length} completed today</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 transition shadow-sm"><Filter className="w-3.5 h-3.5" /> Filter</button>
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 transition shadow-sm"><SlidersHorizontal className="w-3.5 h-3.5" /> Sort</button>
            <button className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-90 transition shadow-md"><Play className="w-3.5 h-3.5" /> Run Tasks</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label:"Due Today",    val:allTasks.filter(t=>t.due==="Today").length,   color:"text-blue-700",  bg:"bg-blue-50",  border:"border-blue-200"  },
            { label:"Completed",    val:doneIds.length,                               color:"text-green-700", bg:"bg-green-50", border:"border-green-200" },
            { label:"Pending",      val:allTasks.length-doneIds.length,               color:"text-amber-700", bg:"bg-amber-50", border:"border-amber-200" },
            { label:"High Priority",val:allTasks.filter(t=>t.priority==="high").length,color:"text-red-700",  bg:"bg-red-50",   border:"border-red-200"   },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3 text-center shadow-sm`}>
              <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-1.5 mb-3 flex-wrap">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeTab===t.key ? "bg-blue-600 text-white border-transparent shadow-md" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
              }`}>
              {t.label}
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${activeTab===t.key?"bg-white/20 text-white":"bg-gray-100 text-gray-500"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map(task => {
              const Icon = task.icon;
              const isDone = doneIds.includes(task.id);
              return (
                <motion.div key={task.id} layout initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,scale:0.97 }} transition={{ duration:0.18 }}
                  className={`flex items-center gap-3 bg-white rounded-xl border px-4 py-3 shadow-sm transition-all ${isDone?"border-green-200 opacity-55":"border-gray-100 hover:border-gray-200"}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${task.color}`}><Icon className="w-3.5 h-3.5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-bold text-gray-900">{task.prospect}<span className="font-normal text-gray-400"> · {task.company}</span></p>
                      <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${priorityColor[task.priority]}`}>{task.priority}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-gray-500">{task.action}</p>
                      <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{task.due}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="text-gray-300 hover:text-gray-500 transition"><MoreHorizontal className="w-4 h-4" /></button>
                    <button onClick={() => setDoneIds(p => isDone ? p.filter(x=>x!==task.id) : [...p,task.id])}
                      className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition ${isDone?"bg-green-50 border-green-300 text-green-700":"bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600"}`}>
                      {isDone ? <><CheckCircle2 className="w-3 h-3" /> Done</> : <>Execute</>}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <Chrome className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-bold text-blue-800">360Airo Chrome Extension required for LinkedIn tasks</p>
            <p className="text-[10px] text-blue-600">Keep the extension active in Chrome while executing LinkedIn actions.</p>
          </div>
          <button className="text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-300 px-2.5 py-1.5 rounded-lg hover:bg-blue-200 transition flex-shrink-0">Install</button>
        </div>
      </div>
    </BrowserFrame>
  );
}

function TaskDetailMockup() {
  const [edited, setEdited] = useState("Hi Sarah, I came across your profile at Acme Corp and was really impressed by your work in enterprise SaaS. I'd love to connect and share some ideas around scaling outreach — would be great to have you in my network!");
  return (
    <BrowserFrame title="360Airo — Task Detail · LinkedIn Message">
      <div className="bg-gray-50/60 p-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">LinkedIn Message</p>
                <p className="text-[10px] text-gray-400">Sarah Chen · Acme Corp</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">High</span>
              <span className="text-[9px] font-bold bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">Due Today</span>
            </div>
          </div>
          <div className="px-5 py-3 border-b border-gray-100 bg-amber-50/50">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Notes</p>
            <p className="text-xs text-gray-600">Met at SaaStr 2024 · Interested in outreach automation · Follow up re: Q4 budget</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Message content <span className="normal-case font-normal text-gray-400">(editable before sending)</span></p>
            <textarea value={edited} onChange={e => setEdited(e.target.value)} rows={4}
              className="w-full text-xs border border-blue-200 bg-blue-50/30 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-200 resize-none leading-relaxed text-gray-700" />
            <p className="text-[10px] text-gray-400 mt-1 text-right">{edited.length} / 2000 chars</p>
          </div>
          <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-gray-100 bg-gray-50">
            <button className="px-4 py-2 text-xs font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-100 transition">Skip</button>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition">
                <Calendar className="w-3.5 h-3.5" /> Reschedule
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const Icon = faq.icon;
        const isOpen = openIndex === i;
        return (
          <motion.div key={i} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3+i*0.04 }}
            className={`rounded-xl border overflow-hidden transition-colors ${isOpen?faq.activeBorder:faq.border}`}>
            <button onClick={() => toggle(i)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isOpen?faq.bg:"bg-white hover:bg-gray-50"}`}>
              <span className={`text-xs font-black min-w-[1.25rem] flex-shrink-0 ${faq.color}`}>{i+1}.</span>
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${faq.color}`} />
              <p className="flex-1 text-sm font-semibold text-gray-900">{faq.q}</p>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${faq.color} ${isOpen?"rotate-180":""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="ans" initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }}
                  exit={{ height:0,opacity:0 }} transition={{ duration:0.22,ease:"easeInOut" }} className="overflow-hidden">
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
                    <p className="text-sm text-gray-600 leading-relaxed pl-[3.25rem]">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function MultichannelTaskPage() {
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
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveToc(id); }, { rootMargin:"-30% 0px -60% 0px" });
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

                <motion.nav initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">Tasks</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Manage Multichannel Tasks</span>
                </motion.nav>

                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Multichannel Tasks</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    The 360Airo Task Manager organises all your daily LinkedIn, call, email, and WhatsApp outreach
                    actions into a structured, prioritised queue — so you always know exactly what to do next and for whom.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Overview */}
                <motion.div id="overview" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    When you add <strong>manual steps</strong> to a campaign sequence — LinkedIn connection requests, calls, messages —
                    360Airo automatically queues them as tasks on the due date. Each task shows pre-written content and prospect notes,
                    and you can edit before marking done. A campaign sequence <strong>will not advance</strong> to the next step until the current task is marked complete.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:Layers,    bg:"bg-blue-50",    color:"text-blue-600",    border:"border-blue-200",    title:"Structured Queue",  desc:"All daily tasks across every campaign are grouped by channel in one organised view" },
                      { icon:CircleDot, bg:"bg-violet-50",  color:"text-violet-600",  border:"border-violet-200",  title:"Sequence Control",  desc:"A campaign won't move to the next step until you mark the current task as done" },
                      { icon:Star,      bg:"bg-emerald-50", color:"text-emerald-600", border:"border-emerald-200", title:"Editable Content",  desc:"Review and personalise pre-filled message content for any prospect before sending" },
                    ].map((card, i) => {
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
                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <Chrome className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span><strong>Chrome extension required for LinkedIn tasks.</strong> Install the 360Airo Task Manager extension from the Chrome Web Store. Other task types (call, email, WhatsApp) work without it.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Dashboard */}
                <motion.div id="dashboard" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Manager dashboard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The dashboard shows every pending task grouped by channel. Use tabs to focus on one channel at a time.
                    Click <strong>Execute</strong> on any task to mark it done — try it in the interactive mockup below.
                  </p>
                  <div className="mb-5"><TaskDashboardMockup /></div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon:Filter,           bg:"bg-blue-50",   color:"text-blue-600",   border:"border-blue-200",   title:"Channel tabs",         desc:"Filter tasks by LinkedIn, Calls, Email or view all at once — keeps your workflow focused on one action type at a time." },
                      { icon:Flag,             bg:"bg-red-50",    color:"text-red-600",    border:"border-red-200",    title:"Priority & due date",  desc:"Each task has a due date and priority (high / medium / low). Sort by priority to tackle the most important prospects first." },
                      { icon:SlidersHorizontal,bg:"bg-violet-50", color:"text-violet-600", border:"border-violet-200", title:"Filter & sort",        desc:"Filter by campaign, assignee, or status. Sort by due date or priority to build your ideal daily execution order." },
                      { icon:ListChecks,       bg:"bg-emerald-50",color:"text-emerald-600",border:"border-emerald-200",title:"Completion tracking",  desc:"The stats strip shows today's totals — due, completed, pending, and high priority — so you always know where you stand." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15+i*0.05 }}
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

                {/* Task Types */}
                <motion.div id="task-types" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Task types</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    360Airo supports six manual task types across all outreach channels. Each task shows the prospect's notes and pre-filled content — editable before you mark it done.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    {taskTypes.map((t, i) => {
                      const Icon = t.icon;
                      return (
                        <motion.div key={t.title} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2+i*0.05 }}
                          className={`rounded-xl border ${t.border} ${t.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 ${t.color}`} />
                            <p className={`text-sm font-bold ${t.color}`}>{t.title}</p>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${t.badgeColor} ml-auto`}>{t.badge}</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-snug">{t.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span><strong>All task types are manual by design.</strong> 360Airo queues and schedules them automatically, but you execute each action yourself — keeping your outreach authentic and your accounts safe.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Managing tasks */}
                <motion.div id="managing" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Managing tasks</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Every task has pre-filled content from your campaign sequence — but you can edit it before sending. The mockup below shows a real task detail view. Try editing the message content.
                  </p>
                  <div className="mb-5"><TaskDetailMockup /></div>
                  <div className="space-y-2">
                    {[
                      { step:"01", color:"bg-blue-600",    icon:ListChecks,   title:"Open the task",          desc:"Click any task in the queue to open the detail panel. You'll see the prospect's notes, campaign context, and pre-filled message content." },
                      { step:"02", color:"bg-violet-600",  icon:Star,         title:"Review & edit content",  desc:"The message or connection note is pre-filled from your campaign template. Edit it to personalise for this specific prospect before executing." },
                      { step:"03", color:"bg-emerald-600", icon:CheckCircle2, title:"Execute and mark done",  desc:"Perform the action on LinkedIn, call the prospect, or send the message — then click Mark as Done. The campaign sequence advances to the next step." },
                      { step:"04", color:"bg-orange-500",  icon:Calendar,     title:"Reschedule if needed",   desc:"If today isn't the right time, reschedule the task to a future date. It reappears in your queue on the new due date without disrupting the campaign." },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.25+i*0.05 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                          <div className={`w-7 h-7 rounded-full ${item.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>{item.step}</div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <Icon className="w-3.5 h-3.5 text-gray-400" />
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

                {/* FAQs */}
                <motion.div id="faqs" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">FAQs</h2>
                  <p className="text-sm text-gray-500 mb-5">Common questions about multichannel tasks in 360Airo. Click to expand.</p>
                  <FAQList />
                </motion.div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 7 months ago</span>
                </div>

                <div className="border-t border-gray-200 my-8" />

                {/* Learn About */}
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { href:"/docs/tasks/run-multichannel-task",        icon:Play,  color:"text-blue-600",   bg:"bg-blue-50",   border:"border-blue-200",   title:"Run Multichannel Daily Task",  desc:"Step-by-step guide to executing your daily task queue efficiently" },
                    { href:"/docs/linkedin-outreach/semi-automation",  icon:Users, color:"text-violet-600", bg:"bg-violet-50", border:"border-violet-200", title:"LinkedIn Semi-Automation",     desc:"Learn how to set up LinkedIn manual tasks inside a drip campaign" },
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

                <div className="flex items-center justify-between gap-4">
                  <Link href="/docs/cold-calling/calling-faqs"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Calling FAQs
                  </Link>
                  <Link href="/docs/tasks/run-multichannel-task"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-600 transition">
                    Run Multichannel Daily Task <ChevronRight className="w-4 h-4" />
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