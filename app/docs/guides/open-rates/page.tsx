"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  ChevronRight,
  Clock,
  BookOpen,
  MailOpen,
  Info,
  HelpCircle,
  Settings,
  Lightbulb,
  PackageCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  TrendingUp,
  Zap,
  Shield,
  RefreshCw,
  Users,
  Timer,
  SlidersHorizontal,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── TOC items — mirrors SmartReach structure ──
const TOC = [
  { id: "what-is-open-rate",  label: "What is Open Rate?"         },
  { id: "how-it-works",       label: "How it works"               },
  { id: "common-reasons",     label: "Common reasons for low rate"},
  { id: "improve-within",     label: "Improve with 360Airo"       },
  { id: "best-practices",     label: "General best practices"     },
  { id: "plan-availability",  label: "Plan availability"          },
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
            className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50"
          >
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input
              autoFocus
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-200"
              placeholder="e.g. Why is my open rate low?"
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
    <div className="hidden xl:block w-56 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Table of contents
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

// ── Reusable section heading ──
function SectionHeading({
  icon: Icon,
  iconColor,
  iconBg,
  title,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
}) {
  return (
    <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2.5">
      <span className={`p-1.5 rounded-lg ${iconBg} flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </span>
      {title}
    </h2>
  );
}

// ── Bullet list ──
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-snug">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 mt-1.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Numbered tip card ──
function TipCard({
  num,
  icon: Icon,
  iconBg,
  iconColor,
  title,
  desc,
}: {
  num: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition">
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white bg-teal-600`}>
          {num}
        </div>
        <div className={`p-1.5 rounded-lg ${iconBg}`}>
          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 mb-0.5">{title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Info callout ──
function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "success";
  children: React.ReactNode;
}) {
  const styles = {
    info:    { bg: "bg-blue-50",   border: "border-blue-100",   text: "text-blue-700",   Icon: Info          },
    warning: { bg: "bg-amber-50",  border: "border-amber-100",  text: "text-amber-700",  Icon: AlertTriangle },
    success: { bg: "bg-teal-50",   border: "border-teal-100",   text: "text-teal-700",   Icon: CheckCircle2  },
  }[type];

  const { bg, border, text, Icon } = styles;
  return (
    <div className={`flex items-start gap-2.5 ${bg} border ${border} rounded-xl px-4 py-3 text-xs ${text} mt-4`}>
      <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

// ── Main Page ──
export default function OpenRatesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [activeToc, setActiveToc]     = useState("what-is-open-rate");

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

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 8 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
  });

  // ── Section data ──

  const commonReasons = [
    "Weak or generic subject lines with no personalisation",
    "Poor email timing — sending on Monday mornings or Friday afternoons",
    "Generic sender names like info@ or sales@ instead of a real name",
    "Emails landing in spam folders due to poor domain health",
    "Low-quality or unverified prospect lists with high bounce rates",
    "Missing personalisation — prospects don't feel the email is for them",
    "Spam-triggering keywords in subject lines (FREE, GUARANTEED, ACT NOW)",
    "Bounced or invalid email addresses dragging down sender reputation",
  ];

  const within360Airo: {
    num: number;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    desc: string;
  }[] = [
    {
      num: 1, icon: Zap, iconBg: "bg-teal-50", iconColor: "text-teal-600",
      title: "Use AI-generated subject lines",
      desc:  "360Airo's AI SDR writes and A/B tests subject lines for every campaign. Enable it under Campaign → Content → AI Subject Line. Campaigns using AI subject lines see up to 3x higher open rates.",
    },
    {
      num: 2, icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-600",
      title: "Personalise with merge tags",
      desc:  "Use {{firstName}}, {{company}}, or {{jobTitle}} in your subject line. Personalised subjects lift open rates by 20–30%. Add them in the subject line field when creating your campaign.",
    },
    {
      num: 3, icon: RefreshCw, iconBg: "bg-violet-50", iconColor: "text-violet-600",
      title: "Enable inbox rotation",
      desc:  "Spread sends across multiple inboxes to keep each domain's daily volume low. This protects your sender reputation and maintains 98%+ deliverability. Go to Campaign → Settings → Inbox Rotation.",
    },
    {
      num: 4, icon: Shield, iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
      title: "Activate the Warmup AI Agent",
      desc:  "New domains need reputation before high-volume sends. 360Airo's warmup agent gradually builds trust with receiving servers. Turn it on under Settings → Email Accounts → Warmup.",
    },
    {
      num: 5, icon: CheckCircle2, iconBg: "bg-amber-50", iconColor: "text-amber-600",
      title: "Verify your prospect list",
      desc:  "360Airo's built-in email verification flags invalid and risky addresses before you send. Run verification under Lead Finder → Verify List. Keeping bounce rate below 3% is critical to inbox placement.",
    },
    {
      num: 6, icon: Timer, iconBg: "bg-rose-50", iconColor: "text-rose-500",
      title: "Schedule by prospect timezone",
      desc:  "360Airo auto-detects each prospect's timezone and delivers emails at the optimal local time. Enable it in Campaign → Settings → Sending Schedule → Use Prospect Timezone.",
    },
  ];

  const bestPractices: {
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    items: string[];
  }[] = [
    {
      icon: FileText, iconBg: "bg-teal-50", iconColor: "text-teal-600",
      title: "Subject line rules",
      items: [
        "Keep it under 50 characters to avoid mobile truncation",
        "Lead with a question or a specific value hook",
        "Avoid ALL CAPS, exclamation marks, and promotional language",
        "Test 2 variants per campaign using 360Airo A/B testing",
      ],
    },
    {
      icon: SlidersHorizontal, iconBg: "bg-blue-50", iconColor: "text-blue-600",
      title: "Sender identity",
      items: [
        "Always send from a real first-name email (e.g. alex@yourdomain.com)",
        "Set up SPF, DKIM, and DMARC on your sending domain",
        "Use a professional signature that matches your sender name",
        "Avoid no-reply or generic alias addresses",
      ],
    },
    {
      icon: TrendingUp, iconBg: "bg-violet-50", iconColor: "text-violet-600",
      title: "Timing & frequency",
      items: [
        "Best days: Tuesday, Wednesday, Thursday",
        "Best windows: 8–10 AM or 2–4 PM in the recipient's timezone",
        "Space follow-ups 3–5 business days apart",
        "Cap sequences at 4–6 touches before retiring the prospect",
      ],
    },
  ];

  const planRows = [
    { feature: "Open rate tracking",        starter: "✓",        growth: "✓",        pro: "✓"              },
    { feature: "Per-prospect open tracking", starter: "✓",        growth: "✓",        pro: "✓"              },
    { feature: "AI subject line generator", starter: "—",        growth: "✓",        pro: "✓"              },
    { feature: "A/B subject line testing",  starter: "—",        growth: "✓",        pro: "✓"              },
    { feature: "Inbox rotation",            starter: "—",        growth: "✓",        pro: "✓"              },
    { feature: "Prospect timezone sending", starter: "✓",        growth: "✓",        pro: "✓"              },
    { feature: "Warmup AI Agent",           starter: "Basic",    growth: "Full",     pro: "Full + Priority" },
    { feature: "Email verification",        starter: "Limited",  growth: "Unlimited",pro: "Unlimited"      },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation onToggleSidebar={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex">
            <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
              <div className="max-w-4xl">

                {/* ── Breadcrumb ── */}
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-teal-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-teal-600 transition">Guides & Cheat Sheets</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Open Rate Cheat Sheet</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div {...fadeUp(0)} className="mb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <MailOpen className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Open Rate Cheat Sheet
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Everything you need to understand, diagnose, and improve your cold email open
                    rates — with 360Airo-specific steps you can take right now.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ════════════════════════════════════
                    SECTION 1 — What is Open Rate
                ════════════════════════════════════ */}
                <motion.section id="what-is-open-rate" {...fadeUp(0.05)} className="mb-10">
                  <SectionHeading
                    icon={HelpCircle}
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                    title="What is Open Rate and How Does it Help?"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Open rate shows how many prospects opened your cold emails compared to the
                    total number of emails delivered. It is the first signal in your funnel — if
                    nobody opens, nothing else matters.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    This metric helps you measure the effectiveness of your subject lines, sender
                    name, sending time, and overall domain health. In 360Airo, open rate is tracked
                    per campaign and per individual prospect in real time.
                  </p>

                  {/* Formula card */}
                  <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Formula</p>
                      <p className="text-sm font-mono font-bold text-gray-800">
                        Open Rate = Unique Opens ÷ Emails Delivered × 100
                      </p>
                    </div>
                  </div>

                  {/* Benchmark strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {[
                      { label: "Cold email avg",    value: "20–30%", color: "text-gray-700",    bg: "bg-gray-50"    },
                      { label: "Good",              value: "30–45%", color: "text-teal-700",    bg: "bg-teal-50"    },
                      { label: "360Airo benchmark", value: "40–55%", color: "text-emerald-700", bg: "bg-emerald-50" },
                      { label: "Investigate if",    value: "< 20%",  color: "text-red-600",     bg: "bg-red-50"     },
                    ].map(({ label, value, color, bg }) => (
                      <div
                        key={label}
                        className={`${bg} border border-gray-200 rounded-xl p-3 text-center`}
                      >
                        <p className={`text-lg font-black ${color}`}>{value}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════════════
                    SECTION 2 — How it Works
                ════════════════════════════════════ */}
                <motion.section id="how-it-works" {...fadeUp(0.07)} className="mb-10">
                  <SectionHeading
                    icon={Settings}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    title="How it Works"
                  />

                  <h3 className="text-base font-bold text-gray-800 mb-2">Understanding Open Rate Tracking</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Open rate tracking works by inserting a tiny invisible pixel image into each
                    outgoing email. When a prospect opens the email and their client loads images,
                    the pixel fires and records the open event in 360Airo's reporting dashboard.
                  </p>

                  <Callout type="warning">
                    <span>
                      <strong>Tracking is not always 100% accurate.</strong> Some factors cause
                      opens to be undercounted or overcounted — keep this context in mind when
                      reading your reports.
                    </span>
                  </Callout>

                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    {[
                      { Icon: XCircle, color: "text-red-400", bg: "bg-red-50",    label: "Undercounting causes",
                        items: ["Email clients blocking image loading by default", "Text-only email preferences", "Mobile apps displaying plain text only", "Email apps that never report open events"] },
                      { Icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50", label: "Overcounting causes",
                        items: ["Apple Mail Privacy Protection (MPP) pre-loads pixels", "Email security scanners triggering the pixel", "Forwarded emails opening multiple times", "Preview pane auto-loading images"] },
                    ].map(({ Icon, color, bg, label, items }) => (
                      <div key={label} className={`rounded-xl border border-gray-200 overflow-hidden`}>
                        <div className={`${bg} px-4 py-2.5 flex items-center gap-2 border-b border-gray-100`}>
                          <Icon className={`w-3.5 h-3.5 ${color}`} />
                          <span className="text-xs font-bold text-gray-700">{label}</span>
                        </div>
                        <div className="bg-white px-4 py-3 space-y-1.5">
                          {items.map((it) => (
                            <p key={it} className="text-xs text-gray-500 flex items-start gap-2 leading-snug">
                              <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />
                              {it}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Callout type="info">
                    360Airo separates <strong>Apple MPP opens</strong> in your campaign report so
                    they don't inflate your true open rate. Filter by "Actual Opens" for an
                    accurate read.
                  </Callout>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════════════
                    SECTION 3 — Common Reasons
                ════════════════════════════════════ */}
                <motion.section id="common-reasons" {...fadeUp(0.09)} className="mb-10">
                  <SectionHeading
                    icon={AlertTriangle}
                    iconBg="bg-amber-50"
                    iconColor="text-amber-600"
                    title="Common Reasons for Low Open Rates"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    If your open rates fall below industry benchmarks, check these factors first
                    before making any campaign changes:
                  </p>
                  <BulletList items={commonReasons} />
                  <Callout type="warning">
                    A sudden drop in open rate — especially across multiple campaigns — almost
                    always signals a <strong>deliverability problem</strong> (domain blacklisted or
                    SPF/DKIM broken), not a subject line issue. Check Settings → Domain Health
                    first.
                  </Callout>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════════════
                    SECTION 4 — Improve Within 360Airo
                ════════════════════════════════════ */}
                <motion.section id="improve-within" {...fadeUp(0.11)} className="mb-10">
                  <SectionHeading
                    icon={Zap}
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                    title="Strategies to Improve Open Rates — Within 360Airo"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    360Airo has six built-in levers you can pull right now. Each one maps to a
                    specific setting in your dashboard.
                  </p>
                  <div className="space-y-3">
                    {within360Airo.map((card) => (
                      <TipCard key={card.num} {...card} />
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════════════
                    SECTION 5 — General Best Practices
                ════════════════════════════════════ */}
                <motion.section id="best-practices" {...fadeUp(0.13)} className="mb-10">
                  <SectionHeading
                    icon={Lightbulb}
                    iconBg="bg-yellow-50"
                    iconColor="text-yellow-600"
                    title="General Best Practices"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Platform settings only go so far — these fundamentals apply to any cold email
                    strategy regardless of tool.
                  </p>
                  <div className="space-y-4">
                    {bestPractices.map(({ icon: Icon, iconBg, iconColor, title, items }) => (
                      <div key={title} className="rounded-xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <span className={`p-1.5 rounded-lg ${iconBg}`}>
                            <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
                          </span>
                          <p className="text-sm font-bold text-gray-800">{title}</p>
                        </div>
                        <div className="bg-white px-4 pb-4">
                          <BulletList items={items} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════════════
                    SECTION 6 — Plan Availability
                ════════════════════════════════════ */}
                <motion.section id="plan-availability" {...fadeUp(0.15)} className="mb-10">
                  <SectionHeading
                    icon={PackageCheck}
                    iconBg="bg-violet-50"
                    iconColor="text-violet-600"
                    title="Plan Availability"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Open rate tracking is available on all 360Airo plans. Advanced features like
                    AI subject line generation and inbox rotation require Growth or above.
                  </p>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Table header */}
                    <div className="grid grid-cols-[1fr_72px_80px_72px] bg-gray-50 px-4 py-2.5 border-b border-gray-200 gap-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Feature</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Starter</span>
                      <span className="text-[10px] font-black text-teal-600 uppercase tracking-wider text-center">Growth</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Pro</span>
                    </div>

                    {/* Table rows */}
                    {planRows.map(({ feature, starter, growth, pro }, i) => (
                      <div
                        key={feature}
                        className={`grid grid-cols-[1fr_72px_80px_72px] items-center px-4 py-2.5 gap-2 border-b border-gray-100 last:border-0 text-xs ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                        }`}
                      >
                        <span className="font-semibold text-gray-700">{feature}</span>
                        <span className={`text-center font-medium ${starter === "✓" ? "text-emerald-600" : starter === "—" ? "text-gray-300" : "text-gray-500"}`}>
                          {starter}
                        </span>
                        <span className={`text-center font-black ${growth === "✓" || growth === "Full" || growth === "Unlimited" ? "text-teal-700" : "text-gray-300"}`}>
                          {growth}
                        </span>
                        <span className={`text-center font-medium ${pro === "✓" || pro.includes("Full") || pro === "Unlimited" ? "text-gray-700" : "text-gray-300"}`}>
                          {pro}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Callout type="success">
                    All plans include unlimited open rate tracking with per-prospect visibility.
                    Upgrade to Growth to unlock AI subject lines, A/B testing, and inbox rotation.{" "}
                    <Link href="/pricing" className="font-bold underline underline-offset-2">
                      View pricing →
                    </Link>
                  </Callout>
                </motion.section>

                {/* ── Timestamp ── */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated March 2026</span>
                </div>

                {/* ── Prev / Next ── */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    Best Practices for Cold Emailing
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    Bounce Rate Cheat Sheet
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </main>

            {/* ── Right TOC ── */}
            <TOCPanel active={activeToc} />
          </div>
        </div>
      </div>
    </div>
  );
}