"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  CreditCard, ArrowUpCircle, ArrowDownCircle, CheckCircle2,
  Zap, Star, Info, AlertCircle, Shield,
  Settings, RefreshCw, ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── Types ──
type PlanId = "starter" | "growth" | "enterprise";

// ── Table of Contents ──
const TOC = [
  { id: "overview",       label: "Overview"           },
  { id: "how-it-works",   label: "How it works"       },
  { id: "plans",          label: "Plan comparison"    },
  { id: "tips",           label: "Tips & notes"       },
];

// ── Ask AI ──
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-teal-400 hover:text-teal-600 bg-white shadow-sm transition-colors"
      >
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-68 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50"
          >
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input
              autoFocus
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="e.g. How do I upgrade my plan?"
            />
            <button className="mt-2 w-full py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition">
              Ask
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── TOC Panel ──
function TOCPanel({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-52 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              On this page
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
                className={`block px-4 py-1.5 text-xs transition-all ${
                  active === item.id
                    ? "text-teal-600 font-semibold bg-teal-50 border-r-2 border-teal-500"
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

// ── Billing UI mock ──
function BillingPreview() {
  const [selected, setSelected] = useState<PlanId>("growth");

  const plans = [
    {
      id:    "starter" as PlanId,
      name:  "Starter",
      price: "$29",
      desc:  "For founders & early-stage teams",
      color: "border-gray-200",
      ring:  "ring-gray-300",
      badge: "Popular" 
    },
    {
      id:    "growth" as PlanId,
      name:  "Growth",
      price: "$79",
      desc:  "Most popular for scaling teams",
      color: "border-teal-400",
      ring:  "ring-teal-400",
      badge: "Best Value",
    },
    {
      id:    "enterprise" as PlanId,
      name:  "Enterprise",
      price: "$149",
      desc:  "For agencies & enterprise teams",
      color: "border-gray-200",
      ring:  "ring-gray-300",
      badge: "Advanced",
    },
  ];

  const getPrice = (id: PlanId) => {
    switch(id) {
      case "starter": return "$29";
      case "growth": return "$79";
      case "enterprise": return "$149";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Browser bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-400 font-mono truncate">
          🔒 app.360airo.com/settings/billing
        </div>
      </div>

      <div className="bg-white p-4 sm:p-5">
        {/* Current plan strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 px-3 py-2.5 bg-teal-50 border border-teal-100 rounded-xl">
          <div>
            <p className="text-[10px] text-teal-600 font-black uppercase tracking-wider mb-0.5">
              Current Plan
            </p>
            <p className="text-sm font-bold text-gray-900">Growth — $79 / month</p>
          </div>
          <span className="text-[9px] font-black bg-teal-600 text-white px-2 py-0.5 rounded-full w-fit">
            Active
          </span>
        </div>

        {/* Plan selector */}
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">
          Select a new plan
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                selected === p.id
                  ? `${p.color} ring-2 ${p.ring} bg-teal-50/30`
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-black bg-teal-600 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  {p.badge}
                </span>
              )}
              <p className="text-xs font-bold text-gray-900 mb-0.5">{p.name}</p>
              <p className="text-base font-black text-teal-700">{p.price}</p>
              <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{p.desc}</p>
              {selected === p.id && (
                <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5 text-teal-600" />
              )}
            </button>
          ))}
        </div>

        {/* Confirm row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-semibold">Net amount payable</p>
            <p className="text-sm font-black text-gray-900">
              {getPrice(selected)} / month
            </p>
          </div>
          <button className="text-xs font-bold bg-teal-600 text-white px-4 py-1.5 rounded-lg hover:bg-teal-700 transition w-full sm:w-auto">
            Update Plan
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Animation helper ──
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay },
});

// ── Main page ──
export default function ChangeSubscriptionPlanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [activeToc, setActiveToc]     = useState("overview");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const observers: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const steps = [
    {
      num:   "01",
      Icon:  Settings,
      title: "Go to Settings → Billing",
      desc:  'Click your avatar or the gear icon in the 360Airo dashboard, then select "Settings" and open the "Billing" tab.',
    },
    {
      num:   "02",
      Icon:  RefreshCw,
      title: "Click Update Subscription",
      desc:  'On the Billing page, click the "Update Subscription" button to open the plan selector.',
    },
    {
      num:   "03",
      Icon:  CheckCircle2,
      title: "Choose your plan & confirm",
      desc:  'Select the plan that fits your team — Starter, Growth, or Pro — then click "Update Plan" to apply the change immediately.',
    },
  ];

  const planFeatures = [
    {
      feature:  "Email accounts",
      starter:  "3",
      growth:   "Unlimited",
      enterprise: "Unlimited",
    },
    {
      feature:  "Prospects / month",
      starter:  "1,000",
      growth:   "10,000",
      enterprise: "Unlimited",
    },
    {
      feature:  "AI SDR",
      starter:  "—",
      growth:   "✓",
      enterprise: "✓",
    },
    {
      feature:  "LinkedIn outreach",
      starter:  "—",
      growth:   "✓",
      enterprise: "✓",
    },
    {
      feature:  "CRM integrations",
      starter:  "Basic",
      growth:   "Full",
      enterprise: "Full + Priority",
    },
    {
      feature:  "Team members",
      starter:  "1",
      growth:   "5",
      enterprise: "Unlimited",
    },
    {
      feature:  "Inbox rotation",
      starter:  "—",
      growth:   "✓",
      enterprise: "✓",
    },
    {
      feature:  "Dedicated support",
      starter:  "Email",
      growth:   "Priority email",
      enterprise: "Priority + Slack",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex flex-col xl:flex-row">
            <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
              <div className="max-w-4xl">

                {/* ── Breadcrumb ── */}
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 sm:mb-6 flex-wrap">
                  <Link href="/docs" className="hover:text-teal-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="/docs/billing" className="hover:text-teal-600 transition">Billing</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Change Subscription Plan</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div {...fadeUp(0)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                      Change Subscription Plan
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Upgrade or downgrade your 360Airo subscription in just 3 steps — directly
                    from your billing settings. Changes take effect immediately, no cancellation needed.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-5 sm:my-7" />

                {/* ── Section 1: Overview ── */}
                <motion.section id="overview" {...fadeUp(0.06)} className="mb-6 sm:mb-8">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Overview</h2>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
                    {[
                      { Icon: ArrowUpCircle,   value: "Instant",  label: "Upgrades applied immediately"  },
                      { Icon: ArrowDownCircle, value: "Flexible", label: "Downgrade anytime"              },
                      { Icon: Shield,          value: "Safe",     label: "No data lost on plan change"   },
                      { Icon: Zap,             value: "3 steps",  label: "Fast & simple process"         },
                    ].map(({ Icon, value, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center text-center gap-1 p-2 sm:p-4 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition"
                      >
                        <div className="p-1.5 sm:p-2 rounded-lg bg-teal-50">
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
                        </div>
                        <p className="text-xs sm:text-sm font-black text-gray-900">{value}</p>
                        <p className="text-[9px] sm:text-[11px] text-gray-400 font-medium leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 bg-teal-50 border border-teal-100 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-teal-700">
                    <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      You can upgrade or downgrade your 360Airo plan at any time from{" "}
                      <strong>Settings → Billing</strong>. Upgrades take effect immediately;
                      downgrades apply at the end of your current billing cycle.
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-6 sm:my-8" />

                {/* ── Section 2: How it works ── */}
                <motion.section id="how-it-works" {...fadeUp(0.08)} className="mb-6 sm:mb-8">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-5">How it works</h2>

                  {/* Steps */}
                  <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-7">
                    {steps.map((s, i) => (
                      <motion.div
                        key={s.num}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + i * 0.08 }}
                        className="flex gap-3 sm:gap-4 items-start"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-600 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {s.num}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-gray-800">{s.title}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive billing preview */}
                  <BillingPreview />

                  <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs text-blue-700 mt-3 sm:mt-4">
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      Not sure which plan fits your team?{" "}
                      <Link href="/pricing" className="font-semibold underline underline-offset-2 hover:text-blue-900 transition">
                        View full plan comparison on our Pricing page →
                      </Link>
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-6 sm:my-8" />

                {/* ── Section 3: Plan comparison ── */}
                <motion.section id="plans" {...fadeUp(0.1)} className="mb-6 sm:mb-8">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" /> Plan comparison
                  </h2>
                  <p className="text-[10px] sm:text-sm text-gray-500 mb-4 sm:mb-5 leading-relaxed">
                    Every 360Airo plan includes unlimited sending accounts, free email verification,
                    AI content generation, and GDPR-compliant outreach. Here's what differs:
                  </p>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Header - Responsive */}
                    <div className="hidden sm:grid grid-cols-[1fr_80px_100px_80px] px-4 py-2.5 bg-gray-50 border-b border-gray-200 gap-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Feature</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Starter</span>
                      <span className="text-[10px] font-black text-teal-600 uppercase tracking-wider text-center">Growth</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Enterprise</span>
                    </div>

                    {/* Mobile Header */}
                    <div className="sm:hidden grid grid-cols-[1fr_60px_70px_60px] px-3 py-2 bg-gray-50 border-b border-gray-200 gap-1">
                      <span className="text-[8px] font-black text-gray-400 uppercase">Feature</span>
                      <span className="text-[8px] font-black text-gray-400 uppercase text-center">S</span>
                      <span className="text-[8px] font-black text-teal-600 uppercase text-center">G</span>
                      <span className="text-[8px] font-black text-gray-400 uppercase text-center">E</span>
                    </div>

                    {/* Rows */}
                    {planFeatures.map(({ feature, starter, growth, enterprise }, i) => (
                      <div
                        key={feature}
                        className={`grid grid-cols-[1fr_60px_70px_60px] sm:grid-cols-[1fr_80px_100px_80px] items-center px-3 sm:px-4 py-2 sm:py-2.5 gap-1 sm:gap-2 border-b border-gray-100 last:border-0 text-[9px] sm:text-xs ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <span className="font-semibold text-gray-700 truncate">{feature}</span>
                        <span className="text-center text-gray-400 font-medium">{starter}</span>
                        <span className="text-center text-teal-700 font-black">{growth}</span>
                        <span className="text-center text-gray-600 font-medium">{enterprise}</span>
                      </div>
                    ))}

                    {/* Price footer */}
                    <div className="grid grid-cols-[1fr_60px_70px_60px] sm:grid-cols-[1fr_80px_100px_80px] items-center px-3 sm:px-4 py-2 sm:py-3 gap-1 sm:gap-2 bg-gray-50 border-t border-gray-200">
                      <span className="text-[9px] sm:text-xs font-black text-gray-700">Price / month</span>
                      <span className="text-center text-[9px] sm:text-xs font-black text-gray-600">$29</span>
                      <span className="text-center text-xs sm:text-sm font-black text-teal-700">$79</span>
                      <span className="text-center text-[9px] sm:text-xs font-black text-gray-600">$149</span>
                    </div>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-6 sm:my-8" />

                {/* ── Section 4: Tips & notes ── */}
                <motion.section id="tips" {...fadeUp(0.12)} className="mb-8 sm:mb-10">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-amber-500" /> Tips &amp; notes
                  </h2>
                  <div className="space-y-2 sm:space-y-2.5">
                    {[
                      {
                        Icon:  ArrowUpCircle,
                        bg:    "bg-teal-50",
                        ic:    "text-teal-600",
                        title: "Upgrades are instant",
                        desc:  "When you upgrade, new features and limits unlock immediately. Your next invoice is prorated for the remainder of your billing cycle — you only pay for what you use.",
                      },
                      {
                        Icon:  ArrowDownCircle,
                        bg:    "bg-blue-50",
                        ic:    "text-blue-600",
                        title: "Downgrades apply at cycle end",
                        desc:  "Downgrading keeps your current plan active until the end of the billing period. You won't lose access mid-cycle, and no refund is issued for the remaining days.",
                      },
                      {
                        Icon:  Shield,
                        bg:    "bg-emerald-50",
                        ic:    "text-emerald-600",
                        title: "Your data is always safe",
                        desc:  "Changing your plan never deletes campaigns, prospects, or reports. If you downgrade below a limit (e.g. team members), excess seats are deactivated — not deleted.",
                      },
                      {
                        Icon:  AlertCircle,
                        bg:    "bg-amber-50",
                        ic:    "text-amber-600",
                        title: "Need a custom plan?",
                        desc:  "Running a large agency or enterprise team? Contact the 360Airo team directly — custom seat counts, dedicated onboarding, and SLA agreements are available on request.",
                      },
                    ].map(({ Icon, bg, ic, title, desc }) => (
                      <div
                        key={title}
                        className="flex gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-gray-200 hover:shadow-sm transition"
                      >
                        <div className={`p-1.5 sm:p-2 rounded-lg ${bg} flex-shrink-0 self-start`}>
                          <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${ic}`} />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">{title}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 leading-snug">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* ── Updated timestamp ── */}
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 mt-4 sm:mt-2">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Updated March 2026</span>
                </div>

                {/* ── Prev / Next nav ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-200">
                  <Link
                    href="/docs/billing/edit-role-permissions"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    Edit Role Permissions
                  </Link>
                  <Link
                    href="/docs/billing/faqs"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition w-full sm:w-auto justify-center sm:justify-end"
                  >
                    Billing FAQs
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </main>

            {/* ── Right TOC panel ── */}
            <TOCPanel active={activeToc} />
          </div>
        </div>
      </div>
    </div>
  );
}