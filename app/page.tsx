"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Thermometer,
  Sparkles,
  LayoutList,
  BarChart2,
  Users,
  Search,
  Puzzle,
  ChevronRight,
  Clock,
  Bot,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AnimatePresence as AP } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Features data ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: "multichannel",
    icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Multichannel Outreach",
    description:
      "Reach prospects through multiple channels — email, LinkedIn, phone calls, and WhatsApp — all in one sequence or spaced out in a drip flow to increase response rates.",
  },
  {
    id: "email-scale",
    icon: Mail,
    color: "text-violet-500",
    bg: "bg-violet-50",
    title: "Cold Email at Scale",
    description:
      "Send cold emails at scale using multiple inboxes and smart rotation. Auto-rotating sender accounts protect your domain reputation while maximising deliverability.",
  },
  {
    id: "domain-warmup",
    icon: Thermometer,
    color: "text-orange-500",
    bg: "bg-orange-50",
    title: "Domain & Inbox Warmup",
    description:
      "Buy fully authenticated domains and email accounts ready for outreach. Warm up your inboxes and domains automatically to protect your sender reputation.",
  },
  {
    id: "ai-content",
    icon: Sparkles,
    color: "text-pink-500",
    bg: "bg-pink-50",
    title: "AI-Powered Content",
    description:
      "Write personalized AI-powered content — unique icebreakers, subject lines, and follow-ups crafted for every individual prospect in seconds.",
  },
  {
    id: "sequences",
    icon: LayoutList,
    color: "text-teal-500",
    bg: "bg-teal-50",
    title: "Multi-Step Sequences",
    description:
      "Build and manage multi-step sequences with advanced scheduling and logic. Automatically pause outreach when a meeting is booked so nothing slips through the cracks.",
  },
  {
    id: "analytics",
    icon: BarChart2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    title: "Real-Time Analytics",
    description:
      "Track email performance in real-time — opens, clicks, replies, and more. AI insights evolve with your data so you continuously optimise campaign performance.",
  },
  {
    id: "lead-finder",
    icon: Search,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    title: "Built-in LeadFinder",
    description:
      "Find leads directly inside the platform using the built-in LeadFinder tool. Discover verified business emails, phone numbers, and company data without leaving the dashboard.",
  },
  {
    id: "team-collab",
    icon: Users,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    title: "Team Collaboration",
    description:
      "Collaborate with team members, assign prospects, and track individual performance. Agencies can manage multiple clients under one dashboard with custom analytics.",
  },
  {
    id: "integrations",
    icon: Puzzle,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    title: "Integrations",
    description:
      "Integrate with CRMs, lead gen tools, and automation platforms — HubSpot, Salesforce, Pipedrive, Zoho, Slack, Gmail, Outlook, and Zapier — for unified workflows.",
  },
];

// ─── Ask AI Button ────────────────────────────────────────────────────────────
function AskAIButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 text-xs font-medium border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors"
        onClick={() => setOpen((p) => !p)}
      >
        <Bot className="w-3.5 h-3.5" />
        Ask AI
        <ChevronRight
          className={cn("w-3 h-3 transition-transform", open && "rotate-90")}
        />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50"
          >
            <p className="text-xs text-slate-500 mb-2">
              Ask anything about 360Airo…
            </p>
            <input
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How do I warm up my inbox?"
              autoFocus
            />
            <Button size="sm" className="mt-2 w-full text-xs">
              Ask
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Feature Item ─────────────────────────────────────────────────────────────
function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;
  return (
    <motion.li
      id={feature.id}
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex gap-3 py-3 border-b border-slate-100 last:border-0 group"
    >
      <div
        className={cn(
          "mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          feature.bg
        )}
      >
        <Icon className={cn("w-4 h-4", feature.color)} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
          {feature.title}
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mt-0.5">
          {feature.description}
        </p>
      </div>
    </motion.li>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="lg:ml-64 px-4 py-8">
          <div className="h-96" />
        </div>
      </div>
    );
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

        {/* Main content — offset by sidebar width on desktop */}
        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-10">

              {/* ── Main content ── */}
              <main className="flex-1 min-w-0 max-w-4xl">

                {/* Page heading */}
                <motion.div
                  id="about"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    About 360Airo
                  </h1>
                  <p className="mt-2 text-slate-500 text-sm leading-relaxed max-w-xl">
                    Find answers, guides, and best practices for using 360Airo.
                    Explore our help center to set up, run, and optimise your outreach
                    campaigns.
                  </p>
                </motion.div>

                <Separator className="my-6" />

                {/* Video embed */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8"
                >
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 aspect-video flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900/80" />
                    <div className="relative z-10 text-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1" />
                      </div>
                      <p className="text-white font-semibold text-sm">
                        360Airo Product Walkthrough
                      </p>
                      <p className="text-slate-300 text-xs mt-1">
                        AI-Powered Email Outreach Platform — Full Demo
                      </p>
                    </div>
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <Badge variant="secondary" className="text-[10px] bg-black/50 text-white border-0">
                        Watch Later
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] bg-black/50 text-white border-0">
                        Share
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[7px] font-black">A</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      360Airo Platform — Official Product Demo
                    </p>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1 text-xs text-slate-400 hover:text-red-600 transition-colors"
                    >
                      Watch on YouTube
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>

                {/* Intro text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 space-y-3"
                >
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <a
                      href="https://360airo.com"
                      className="text-blue-600 font-medium hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      360Airo
                    </a>{" "}
                    is an AI-powered multichannel sales outreach platform built for
                    teams that want to scale faster. It helps businesses of all sizes
                    automate personalized outreach campaigns, improve email
                    deliverability, and book more meetings at scale.
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Whether you're an individual founder, an SDR team, an agency, or a
                    recruiter, 360Airo offers all the tools you need to run
                    high-performing outbound campaigns — from cold email and LinkedIn
                    automation to smart calling and CRM sync — all from a single,
                    intuitive dashboard.
                  </p>
                </motion.div>

                {/* What can you do section */}
                <motion.div
                  id="what-can-you-do"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    What can you do with 360Airo?
                  </h2>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    360Airo unifies prospect discovery, multichannel outreach, analytics,
                    and CRM sync in one place so your team operates with clarity and speed.
                  </p>

                  <ul className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm px-4">
                    {FEATURES.map((feature, i) => (
                      <FeatureItem key={feature.id} feature={feature} index={i} />
                    ))}
                  </ul>
                </motion.div>

                {/* Updated time */}
                <div className="mt-10 flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 14 days ago</span>
                </div>
              </main>

              {/* ── Right sidebar ── */}
              <aside className="w-full lg:w-56 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="mb-4">
                    <AskAIButton />
                  </div>
                  <div className="mt-4 border border-blue-100 rounded-xl bg-blue-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-semibold text-blue-700">
                        360 Academy
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 leading-relaxed">
                      Learn outreach best practices with structured courses and playbooks.
                    </p>
                    <a
                      href="https://360airo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Explore Academy
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}