"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Mail,
  Thermometer,
  Sparkles,
  LayoutList,
  BarChart2,
  Search,
  Users,
  Puzzle,
  Clock,
  Bot,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";
import { AnimatePresence } from "framer-motion";

// ─── Feature table data (matching 360Airo's actual features) ─────────────────

const FEATURE_TABLE = [
  {
    category: "Channels & Campaigns",
    icon: MessageSquare,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    rows: [
      "Email",
      "LinkedIn",
      "Cold Calling",
      "WhatsApp",
      "Multichannel Drips",
      "AI Magic Content",
      "Task Manager",
    ],
  },
  {
    category: "Cold Email at Scale",
    icon: Mail,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    rows: [
      "Unlimited Campaigns",
      "Email Tasks",
      "Unlimited Sequences",
      "Editable Preview",
      "Unified Campaign Inbox",
      "Team Inbox",
      "Open & Click Tracking",
      "A/B Testing",
      "Different Send & Receive Emails",
      "Domain-level Limits",
      "Inbox Rotation",
    ],
  },
  {
    category: "Domain & Inbox Warmup",
    icon: Thermometer,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    rows: [
      "Automated Inbox Warmup",
      "Buy Authenticated Domains",
      "Sender Reputation Protection",
      "Blacklist Monitoring",
      "Custom Tracking Domains",
      "SPF / DKIM / DMARC Setup",
      "Email Throttling",
    ],
  },
  {
    category: "AI-Powered Content",
    icon: Sparkles,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    rows: [
      "AI Icebreaker Generation",
      "Personalised Subject Lines",
      "Dynamic Follow-up Writing",
      "Spintax Support",
      "Magic Content Editor",
      "AI Response Agent",
      "Sentiment Classifier",
    ],
  },
  {
    category: "Multi-Step Sequences",
    icon: LayoutList,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    rows: [
      "Multi-channel Drip Sequences",
      "Advanced Scheduling & Logic",
      "Auto-pause on Meeting Booked",
      "Out-of-Office Detection",
      "Workflow Automation",
      "ESP Matching",
      "Sequence Capacity Controls",
    ],
  },
  {
    category: "Real-Time Analytics",
    icon: BarChart2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    rows: [
      "Campaign Reports",
      "Email Open & Click Tracking",
      "Reply Rate Analytics",
      "Multichannel Reports",
      "Deliverability Monitoring",
      "AI Optimisation Insights",
      "Team Performance Tracking",
    ],
  },
  {
    category: "Built-in LeadFinder",
    icon: Search,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    rows: [
      "Verified Business Emails",
      "Phone Number Discovery",
      "Company Data Enrichment",
      "Prospect Qualification",
      "CSV Import & Export",
      "Third-party Prospect Import",
      "Duplicate Detection",
    ],
  },
  {
    category: "Team Collaboration",
    icon: Users,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    rows: [
      "Role-based Permissions",
      "Multi-client Agency Features",
      "Shared Team Inbox",
      "Prospect Assignment",
      "Individual Performance Tracking",
      "2FA Security",
      "Custom Analytics per Client",
    ],
  },
  {
    category: "Integrations",
    icon: Puzzle,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    rows: [
      "HubSpot",
      "Salesforce",
      "Pipedrive",
      "Zoho CRM",
      "Slack",
      "Zapier",
      "Make.com",
      "Calendly",
      "Gmail & Outlook",
      "Webhooks",
      "Clay & RB2B",
    ],
  },
];

// ─── Flat table rows (3-column like the image) ────────────────────────────────

const FLAT_TABLE_COLS = [
  {
    header: "Channels & Campaigns",
    rows: ["Email", "LinkedIn", "Calling", "WhatsApp", "Multichannel Drips", "AI Magic Content", "Task Manager", "LinkedIn Full Automation", "LinkedIn Co-pilot Mode"],
  },
  {
    header: "Cold Email at Scale",
    rows: ["No. of Campaigns", "Email Tasks", "Unlimited Sequences", "Editable Preview", "Unified Campaign Inbox", "Team Inbox", "Open & Click Tracking", "A/B Testing", "Different Send & Receive Emails", "Domain-level Limits", "Inbox Rotation"],
  },
  {
    header: "Intelligent Auto-Pause",
    rows: ["Reply Detection", "Same Domain Reply Detection", "Spam Keyword Detection", "Global Blacklist Monitoring", "Broken Links", "Missing Merge-Tags", "Invalid Email", "Email Bounce Threshold Hit", "Manual Reply Sent"],
  },
];

const FLAT_TABLE_COLS2 = [
  {
    header: "AI Content",
    rows: ["AI Icebreakers", "Personalised Subject Lines", "Dynamic Follow-ups", "Spintax Support", "Magic Content Editor", "AI Response Agent", "Sentiment Classifier Agent"],
  },
  {
    header: "Domain & Inbox Warmup",
    rows: ["Automated Inbox Warmup", "Buy Authenticated Domains", "Sender Reputation Protection", "Blacklist Monitoring", "Custom Tracking Domains", "SPF / DKIM / DMARC Setup", "Email Throttling"],
  },
  {
    header: "Real-Time Analytics",
    rows: ["Campaign Reports", "Email Open & Click Tracking", "Reply Rate Analytics", "Multichannel Reports", "Deliverability Monitoring", "AI Optimisation Insights", "Team Performance Tracking"],
  },
];

const FLAT_TABLE_COLS3 = [
  {
    header: "Built-in LeadFinder",
    rows: ["Verified Business Emails", "Phone Number Discovery", "Company Data Enrichment", "Prospect Qualification", "CSV Import & Export", "Third-party Prospect Import", "Duplicate Detection"],
  },
  {
    header: "Team & Agency",
    rows: ["Role-based Permissions", "Multi-client Agency Features", "Shared Team Inbox", "Prospect Assignment", "Individual Performance Tracking", "2FA Security", "Custom Analytics per Client"],
  },
  {
    header: "Integrations",
    rows: ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Slack", "Zapier", "Make.com", "Calendly", "Gmail & Outlook", "Webhooks", "Clay & RB2B"],
  },
];

// ─── Ask AI ───────────────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-blue-400 hover:text-blue-600 bg-white shadow-sm transition-colors"
      >
        <Bot className="w-3.5 h-3.5" />
        Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50"
          >
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input
              autoFocus
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. What channels does 360Airo support?"
            />
            <button className="mt-2 w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
              Ask
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Feature Table Component ──────────────────────────────────────────────────
function FeatureTable({ cols }: { cols: typeof FLAT_TABLE_COLS }) {
  const maxRows = Math.max(...cols.map((c) => c.rows.length));

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {cols.map((col) => (
              <th
                key={col.header}
                className="text-left px-5 py-3 font-bold text-gray-800 italic border-r border-gray-200 last:border-r-0"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxRows }).map((_, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              {cols.map((col) => (
                <td
                  key={col.header}
                  className="px-5 py-2.5 text-gray-700 border-r border-gray-100 last:border-r-0"
                >
                  {col.rows[rowIdx] ? (
                    <span className={col.rows[rowIdx].startsWith("LinkedIn") || col.rows[rowIdx].startsWith("AI") ? "font-semibold text-gray-900" : ""}>
                      {col.rows[rowIdx]}
                    </span>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FeaturesSnapshotPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navigation */}
      <Navigation onToggleSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex">

            {/* Doc body */}
            <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
              <div className="max-w-5xl">

                {/* Page title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-2"
                >
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Features Snapshot
                  </h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Explore all 360Airo features including multichannel outreach, cold email at scale,
                    LinkedIn automation, AI content, deliverability tools, and team management capabilities.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Feature cards grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-10"
                >
                  {FEATURE_TABLE.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <motion.div
                        key={f.category}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex flex-col items-center text-center p-3 rounded-xl border ${f.border} ${f.bg} gap-2`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm`}>
                          <Icon className={`w-4 h-4 ${f.color}`} />
                        </div>
                        <span className={`text-xs font-semibold ${f.color} leading-tight`}>
                          {f.category}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Table 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Channels, Email & Auto-Pause
                  </h2>
                  <FeatureTable cols={FLAT_TABLE_COLS} />
                </motion.div>

                {/* Table 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    AI Content, Warmup & Analytics
                  </h2>
                  <FeatureTable cols={FLAT_TABLE_COLS2} />
                </motion.div>

                {/* Table 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    LeadFinder, Team & Integrations
                  </h2>
                  <FeatureTable cols={FLAT_TABLE_COLS3} />
                </motion.div>

                {/* Feature detail cards */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Feature Details
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {FEATURE_TABLE.map((f, i) => {
                      const Icon = f.icon;
                      return (
                        <motion.div
                          key={f.category}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + i * 0.05 }}
                          className={`rounded-xl border ${f.border} p-4`}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-7 h-7 rounded-lg ${f.bg} flex items-center justify-center`}>
                              <Icon className={`w-3.5 h-3.5 ${f.color}`} />
                            </div>
                            <span className="text-sm font-bold text-gray-900">{f.category}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {f.rows.slice(0, 5).map((row) => (
                              <li key={row} className="flex items-start gap-2 text-xs text-gray-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                {row}
                              </li>
                            ))}
                            {f.rows.length > 5 && (
                              <li className={`text-xs font-semibold ${f.color} mt-1`}>
                                +{f.rows.length - 5} more
                              </li>
                            )}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Footer timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 14 days ago</span>
                </div>

              </div>
            </main>

            {/* Ask AI right panel */}
            <div className="hidden xl:flex flex-col pt-10 pr-8 w-36 flex-shrink-0">
              <AskAI />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}