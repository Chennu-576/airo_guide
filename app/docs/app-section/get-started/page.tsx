"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  ChevronRight,
  Clock,
  Mail,
  Linkedin,
  Phone,
  MessageSquare,
  BarChart2,
  Search,
  Settings,
  Users,
  Inbox,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Headphones,
  CalendarDays,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "getting-started", label: "Getting started with your quick start page" },
 
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
              placeholder="e.g. How do I connect my inbox?"
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

// ─── TOC Sidebar ──────────────────────────────────────────────────────────────
function TableOfContents({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-56 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <div className="mb-3">
          <AskAI />
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Table of Contents
            </span>
          </div>
          <nav className="py-1">
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block px-4 py-1.5 text-xs transition-all leading-snug ${
                  active === item.id
                    ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
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
export default function QuickStartPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeToc, setActiveToc] = useState("getting-started");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const ids = TOC.map((t) => t.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveToc(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isMounted]);

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation onToggleSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex">

            {/* ── Main content ── */}
            <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
              <div className="max-w-4xl">

                {/* Breadcrumb */}
                <motion.nav
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6"
                >
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">Quick Start</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Quick Start</span>
                </motion.nav>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Quick Start
                  </h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Get started with 360Airo in minutes. This quick start guide walks you through
                    setting up your account, connecting inboxes, and launching your first
                    multichannel outreach campaign.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Getting started section ── */}
                <motion.div
                  id="getting-started"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-10"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Getting started with your quick start page:
                  </h2>

                  {/* ── Get Started mockup — mirrors your uploaded image style ── */}
                  <div className="rounded-2xl border border-gray-200 shadow-md overflow-hidden mb-6">
                    <div className="grid lg:grid-cols-2">

                      {/* LEFT — branding + headline + 3 feature cards (like left half of your image) */}
                      <div className="bg-gray-50 px-8 py-10 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-gray-200">

                        {/* Logo + brand */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-md">
                            <span className="text-white text-[10px] font-black tracking-tight">360</span>
                          </div>
                          <span className="text-lg font-black text-blue-600 tracking-tight">360 AIRO</span>
                        </div>

                        {/* Headline + sub */}
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 leading-snug mb-3">
                            AI-Powered Multichannel<br />Outreach Platform
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            Connect, engage, and close — smarter than ever. Automate LinkedIn messages,
                            cold emails, and calling sequences from a single intuitive dashboard.
                          </p>
                        </div>

                        {/* 3 feature cards — same card grid as your image */}
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            {
                              icon: Mail,
                              iconBg: "bg-blue-100",
                              iconColor: "text-blue-600",
                              title: "Smart Campaigns",
                              desc: "AI-powered email personalisation",
                            },
                            {
                              icon: BarChart2,
                              iconBg: "bg-violet-100",
                              iconColor: "text-violet-600",
                              title: "Advanced Analytics",
                              desc: "Detailed performance insights",
                            },
                            {
                              icon: Users,
                              iconBg: "bg-emerald-100",
                              iconColor: "text-emerald-600",
                              title: "List Management",
                              desc: "Organise your prospects",
                            },
                          ].map((card) => {
                            const Icon = card.icon;
                            return (
                              <div
                                key={card.title}
                                className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md transition"
                              >
                                <div className={`w-10 h-10 rounded-full ${card.iconBg} flex items-center justify-center`}>
                                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                                </div>
                                <p className="text-xs font-bold text-gray-800 leading-tight">{card.title}</p>
                                <p className="text-[10px] text-gray-400 leading-tight">{card.desc}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* RIGHT — Sign In / Sign Up form card (like right half of your image) */}
                      <div className="bg-white px-8 py-8 flex flex-col gap-6">

                        {/* Sign In / Sign Up tabs */}
                        <div className="flex rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                          <button className="flex-1 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                            Sign In
                          </button>
                          <button className="flex-1 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition">
                            Sign Up
                          </button>
                        </div>

                        {/* Form card */}
                        <div className="rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-5">
                          <div className="text-center">
                            <h4 className="text-xl font-black text-gray-900">Sign Up</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Create your account</p>
                          </div>

                          {/* Full Name */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700">Full Name</label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-blue-400 focus-within:bg-white transition">
                              <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <input
                                type="text"
                                placeholder="John Doe"
                                className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700">Email Address</label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-blue-400 focus-within:bg-white transition">
                              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <input
                                type="email"
                                placeholder="you@example.com"
                                className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700">Password</label>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-blue-400 focus-within:bg-white transition">
                              <Settings className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <input
                                type="password"
                                placeholder="Minimum 6 characters"
                                className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* CTA */}
                          <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition shadow-md">
                            Sign Up
                          </button>
                        </div>

                        {/* Footer note */}
                        <p className="text-center text-[10px] text-gray-400">
                          By continuing, you agree to our{" "}
                          <a href="https://360airo.com/Privacy-Policy-Page" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Terms of Service</a>
                          {" "}and{" "}
                          <a href="https://360airo.com/Privacy-Policy-Page" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Privacy Policy</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points below */}
                  <ul className="space-y-2">
                    {[
                      "Create your account — Sign up with your name, email, and password to get instant access to 360Airo",
                      "Connect your outreach channels — Link your email inbox, LinkedIn account, and phone number from the dashboard",
                      "Import or find leads — Upload a CSV or use the built-in LeadFinder to discover verified prospects",
                      "Launch your first campaign — Build a multichannel sequence and let 360Airo's AI handle personalisation and follow-ups",
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Need help ── */}
                <motion.div
                  id="need-help"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white mb-10"
                >
                  <h2 className="text-lg font-bold mb-1">Need help with your account?</h2>
                  <p className="text-sm text-blue-100 leading-relaxed mb-4 max-w-xl">
                    Get in touch with our support team. We're here to provide personalised help and
                    guidance whenever you need it — from setting up your first campaign to advanced
                    automation workflows.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://360airo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition shadow"
                    >
                      <CalendarDays className="w-4 h-4" />
                      Book a demo
                    </a>
                    <a
                      href="https://360airo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-400 transition border border-blue-400"
                    >
                      <Headphones className="w-4 h-4" />
                      Contact support
                    </a>
                    <a
                      href="https://360airo.com/360-academy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-400 transition border border-blue-400"
                    >
                      <BookOpen className="w-4 h-4" />
                      360 Academy
                    </a>
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