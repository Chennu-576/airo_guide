"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Zap, Users, Eye,
  MousePointerClick, MailCheck, AlertTriangle, BarChart2, Filter,
  PlusCircle, Download, SwitchCamera, Tag, Mail, Linkedin, Phone,
  MessageSquare, ArrowUpRight, ArrowDownRight, Info,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

const TOC = [
  { id: "what-is-dashboard",    label: "What is the campaign dashboard and how it helps" },
  { id: "performance-overview", label: "Performance overview metrics" },
  { id: "viewing-campaigns",    label: "Viewing campaign information" },
  { id: "key-info",             label: "Key information displayed" },
  { id: "managing-campaigns",   label: "Managing campaigns" },
  { id: "quick-actions",        label: "Quick actions" },
];

const STATS = [
  { icon: Zap,              iconBg: "bg-blue-500",    label: "Total Campaigns",   value: "12",    sub: "Active & completed",   change: "+5",    up: true,  progress: 4,   progressColor: "bg-blue-500",   cardBg: "bg-white"      },
  { icon: Users,            iconBg: "bg-violet-500",  label: "Total Recipients",  value: "511",   sub: "Reached contacts",     change: "+511",  up: true,  progress: 10,   progressColor: "bg-violet-400", cardBg: "bg-white"      },
  { icon: Eye,              iconBg: "bg-emerald-500", label: "Avg Open Rate",     value: "40.0%",  sub: "Email engagement",     change: "40%",    up: null,  progress: 30,   progressColor: "bg-emerald-400",cardBg: "bg-white"      },
  { icon: MousePointerClick,iconBg: "bg-orange-400",  label: "Avg Click Rate",    value: "29.0%",  sub: "Link interactions",    change: "10.3%", up: true, progress: 20,   progressColor: "bg-orange-400", cardBg: "bg-orange-50"  },
  { icon: MailCheck,        iconBg: "bg-emerald-500", label: "Emails Delivered",  value: "474",   sub: "Successfully sent",    change: "+474",  up: true,  progress: 1,   progressColor: "bg-emerald-400",cardBg: "bg-emerald-50" },
  { icon: AlertTriangle,    iconBg: "bg-red-500",     label: "Bounce Rate",       value: "0.0%",  sub: "Failed deliveries",    change: null,    up: null,  progress: 100, progressColor: "bg-red-500",    cardBg: "bg-red-50"     },
];

const QUICK_ACTIONS = [
  { icon: Zap,      iconBg: "bg-blue-500",   title: "Create Campaign",  desc: "Design and launch a new multichannel outreach campaign", badge: "Popular" },
  { icon: Users,    iconBg: "bg-violet-500", title: "Import Contacts",  desc: "Add new prospects via CSV or third-party integrations",  badge: null      },
  { icon: BarChart2,iconBg: "bg-emerald-500",title: "View Analytics",   desc: "Track performance metrics across all campaigns",         badge: null      },
];

const CAMPAIGN_ROWS = [
  { name: "360Airo Campaign - 01", channels: ["email","linkedin"],        status: "active", prospects: 63, progress: 72 },
  { name: "360Airo Campaign - 02", channels: ["email"],                   status: "new",    prospects: 0,  progress: 0  },
  { name: "360Airo Campaign - 03", channels: ["email","linkedin"],        status: "new",    prospects: 0,  progress: 0  },
  { name: "360Airo Campaign - 04", channels: ["email"],                   status: "new",    prospects: 0,  progress: 0  },
  { name: "360Airo Campaign - 05", channels: ["email","phone"],           status: "new",    prospects: 0,  progress: 0  },
  { name: "360Airo Campaign - 06", channels: ["email","linkedin","phone"],status: "new",    prospects: 63, progress: 0  },
];

const CH_ICONS: Record<string, any> = {
  email:    <Mail      className="w-3 h-3 text-blue-500" />,
  linkedin: <Linkedin  className="w-3 h-3 text-blue-700" />,
  phone:    <Phone     className="w-3 h-3 text-green-600" />,
  whatsapp: <MessageSquare className="w-3 h-3 text-emerald-500" />,
};

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
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200" placeholder="e.g. How do I filter campaigns?" />
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
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${active === item.id ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function CampaignDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-dashboard");

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
                <motion.nav initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">App Section</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Campaign Dashboard</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Campaign Dashboard</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Learn how to use the 360Airo campaign dashboard to view, manage, and monitor your multichannel
                    outreach campaigns with filtering, progress tracking, and team switching.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* What is the dashboard */}
                <motion.div id="what-is-dashboard" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">What is the campaign dashboard and how it helps</h2>

                  {/* Dashboard screenshot */}
                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md mb-5">
                    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-[7px] font-black">360</span>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">360Airo — Campaign Dashboard</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="relative bg-gray-50">
                      <img
                        src="/images/airo-campaign-dashboard.png"
                        alt="360Airo Campaign Dashboard — Performance Overview"
                        className="w-full object-cover object-top"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    The 360Airo campaign dashboard provides a one-glance view of all your campaigns and live
                    performance metrics in one place. It helps you monitor campaign performance, track email
                    delivery, and manage multiple outreach campaigns efficiently.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    If you are an agency user, you can easily switch between different client teams using the
                    team switcher at the top of the dashboard. This makes it simple to manage and monitor
                    multiple accounts from a single login.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Performance Overview */}
                <motion.div id="performance-overview" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Performance overview metrics</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    When you open the 360Airo dashboard you will see a <strong className="text-gray-700">Performance Overview</strong> section
                    that tracks your email marketing metrics in real-time across all active campaigns.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {STATS.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div key={stat.label} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15+i*0.05 }}
                          className={`rounded-xl border border-gray-200 p-4 ${stat.cardBg} shadow-sm hover:shadow-md transition`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-sm`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            {stat.change && (
                              <div className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                                {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                {stat.change}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
                          <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{stat.sub}</p>
                          <div className="mt-3">
                            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${stat.progressColor}`} style={{ width:`${Math.max(stat.progress,2)}%` }} />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">{stat.progress}% of target</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>All metrics update in real-time as your campaigns run. Click any metric card to drill into detailed analytics for that specific KPI.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Viewing campaign info */}
                <motion.div id="viewing-campaigns" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Viewing campaign information:</h2>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-500 flex-1 min-w-[140px] max-w-xs">
                        <Filter className="w-3 h-3 text-gray-400" /> Find Campaign by Name or Email
                      </div>
                      <div className="flex items-center gap-1 border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 text-xs text-gray-600">
                        <Users className="w-3 h-3 text-gray-400" /> All team members <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1 border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 text-xs text-gray-600">
                        All statuses <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
                        <Download className="w-3 h-3" /> Download CSV
                      </div>
                      <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
                        <PlusCircle className="w-3.5 h-3.5" /> Create campaign
                      </button>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-4 py-2 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider gap-2">
                      <span>Campaign</span><span>Channel</span><span>Owner</span><span>Tags</span><span>Prospects</span><span>Progress</span>
                    </div>
                    {CAMPAIGN_ROWS.map((row, i) => (
                      <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] px-4 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition items-center gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${row.status === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>{row.status}</span>
                          <span className="text-xs text-gray-700 font-medium truncate">{row.name}</span>
                        </div>
                        <div className="flex items-center gap-1">{row.channels.map(ch => <span key={ch} title={ch}>{CH_ICONS[ch]}</span>)}</div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"><span className="text-[9px] text-white font-bold">AS</span></div>
                        <div><Tag className="w-3 h-3 text-gray-300" /></div>
                        <span className="text-xs text-gray-600">{row.prospects || "—"}</span>
                        <div className="w-16">
                          {row.progress > 0 ? (
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width:`${row.progress}%` }} />
                            </div>
                          ) : <span className="text-[10px] text-gray-300">—</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {[
                      ["Access campaign",    "Click on any campaign name to open and manage it"],
                      ["Check channel usage","Look at channel icons to see which methods (Email, LinkedIn, WhatsApp, Phone) each campaign uses"],
                      ["Monitor progress",   "The progress bar shows how far through the sequence your prospects have moved"],
                      ["Filter campaigns",   "Use the search bar, team filter, or status dropdown to find specific campaigns quickly"],
                      ["Download CSV",       "Export your campaign list and stats for reporting or further analysis"],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{title}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Managing campaigns */}
                <motion.div id="managing-campaigns" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Managing campaigns:</h2>
                  <div className="space-y-3">
                    {[
                      { step:"01", title:"Create a new campaign",   desc:'Click the blue "Create campaign" button at the top right of the dashboard. Choose between Email, LinkedIn, Multichannel Drip, or Calling campaigns.' },
                      { step:"02", title:"Open and edit a campaign", desc:"Click any campaign name to open its full editor. From there you can update sequences, add prospects, and adjust settings." },
                      { step:"03", title:"Pause or resume campaigns",desc:"Use the three-dot menu on any campaign row to pause, resume, duplicate, or delete a campaign at any time." },
                      { step:"04", title:"Monitor real-time stats",  desc:"The Performance Overview at the top of the dashboard updates live — track Total Campaigns, Recipients, Open Rate, Click Rate, Emails Delivered, and Bounce Rate." },
                      { step:"05", title:"Download campaign data",   desc:"Use the Download CSV option in the toolbar to export campaign lists and stats for reporting or team sharing." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.05 }}
                        className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* Quick Actions */}
                <motion.div id="quick-actions" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Quick actions</h2>
                  <p className="text-sm text-gray-500 mb-5">Jump into your most common tasks directly from the dashboard.</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {QUICK_ACTIONS.map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.div key={action.title} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35+i*0.07 }}
                          className="relative rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition cursor-pointer group">
                          {action.badge && (
                            <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">{action.badge}</span>
                          )}
                          <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center mb-3 shadow-sm`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-sm font-bold text-gray-900">{action.title}</p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{action.desc}</p>
                          <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-semibold group-hover:underline">
                            Get started <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </motion.div>
                      );
                    })}
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