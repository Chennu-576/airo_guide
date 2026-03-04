"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  ChevronRight,
  Clock,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Settings,
  Lightbulb,
  PackageCheck,
  Info,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Shield,
  Zap,
  MailWarning,
  SlidersHorizontal,
  BadgeAlert,
  CircleSlash,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── TOC — mirrors SmartReach structure ──
const TOC = [
  { id: "what-is-bounce",   label: "What is email bounce?"    },
  { id: "how-it-works",     label: "How it works"             },
  { id: "types",            label: "Types of email bounces"   },
  { id: "soft-bounce",      label: "↳ Soft bounce"            },
  { id: "hard-bounce",      label: "↳ Hard bounce"            },
  { id: "reduce-within",    label: "Reduce with 360Airo"      },
  { id: "best-practices",   label: "General best practices"   },
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
              placeholder="e.g. Why is my bounce rate high?"
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
                className={`block py-1.5 text-xs transition-all leading-snug ${
                  item.label.startsWith("↳")
                    ? "pl-7 pr-4"
                    : "px-4"
                } ${
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

// ── Sub-heading ──
function SubHeading({ title }: { title: string }) {
  return (
    <h3 className="text-base font-bold text-gray-800 mb-2 mt-5">{title}</h3>
  );
}

// ── Bullet list ──
function BulletList({ items, color = "bg-teal-500" }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-snug">
          <span className={`w-1.5 h-1.5 rounded-full ${color} flex-shrink-0 mt-1.5`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Callout ──
function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "success" | "danger";
  children: React.ReactNode;
}) {
  const map = {
    info:    { bg: "bg-blue-50",   border: "border-blue-100",   text: "text-blue-700",   Icon: Info          },
    warning: { bg: "bg-amber-50",  border: "border-amber-100",  text: "text-amber-700",  Icon: AlertTriangle },
    success: { bg: "bg-teal-50",   border: "border-teal-100",   text: "text-teal-700",   Icon: CheckCircle2  },
    danger:  { bg: "bg-red-50",    border: "border-red-100",    text: "text-red-700",    Icon: XCircle       },
  }[type];
  const { bg, border, text, Icon } = map;
  return (
    <div className={`flex items-start gap-2.5 ${bg} border ${border} rounded-xl px-4 py-3 text-xs ${text} mt-4`}>
      <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
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
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white bg-teal-600">
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

// ── Main Page ──
export default function BounceRatesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [activeToc, setActiveToc]     = useState("what-is-bounce");

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

  // ── Data ──

  const softBounces = [
    "Full inbox or mail server capacity reached",
    "Recipient's server temporarily down or overloaded",
    "Email size too large for the receiving server",
    "Server blocking due to temporary poor reputation",
    "Sender's server being temporarily blacklisted",
    "Recipient using an auto-responder or out-of-office",
  ];

  const hardBounces = [
    "Incorrect or non-existent email address",
    "Failed email validation — address never existed",
    "Suspended or deactivated email account",
    "Blocked email address by the recipient's server",
    "Organisation blocking all external emails",
    "Recipient's domain policy filtering your domain",
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
      num: 1, icon: CheckCircle2, iconBg: "bg-teal-50", iconColor: "text-teal-600",
      title: "Run email verification before every campaign",
      desc:  "360Airo's built-in Email Validation Agent checks every address on your prospect list before a single email goes out. It flags invalid, risky, and catch-all addresses automatically. Go to Lead Finder → Verify List before launching.",
    },
    {
      num: 2, icon: CircleSlash, iconBg: "bg-red-50", iconColor: "text-red-500",
      title: "Hard bounces are auto-suppressed",
      desc:  "When 360Airo detects a hard bounce, that email address is immediately added to your suppression list. It will never be contacted again across any campaign in your account — protecting your sender reputation automatically.",
    },
    {
      num: 3, icon: RefreshCw, iconBg: "bg-violet-50", iconColor: "text-violet-600",
      title: "Enable inbox rotation to spread sending volume",
      desc:  "High volume from a single inbox is a top cause of soft bounces triggered by server throttling. 360Airo's inbox rotation distributes sends across all connected accounts. Enable it under Campaign → Settings → Inbox Rotation.",
    },
    {
      num: 4, icon: Shield, iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
      title: "Activate the Warmup AI Agent for new domains",
      desc:  "Cold domains sending at volume get blocked immediately. 360Airo's warmup agent gradually builds domain reputation before you scale — reducing both hard and soft bounces caused by reputation-based rejections. Turn it on under Settings → Email Accounts → Warmup.",
    },
    {
      num: 5, icon: BadgeAlert, iconBg: "bg-amber-50", iconColor: "text-amber-600",
      title: "Monitor bounce rate per campaign in Reports",
      desc:  "360Airo surfaces bounce rates per campaign in real time. If any campaign crosses 3%, 360Airo flags it automatically and recommends pausing to protect your domain. View under Reports → Campaign Reports → Bounce Rate.",
    },
    {
      num: 6, icon: Zap, iconBg: "bg-blue-50", iconColor: "text-blue-600",
      title: "Use the Global Blacklist Monitor",
      desc:  "360Airo's AI agent continuously scans major blacklists for your sending domains and alerts you the moment one is flagged. Catch blacklisting within hours — not weeks. Enable under Settings → Deliverability → Blacklist Monitor.",
    },
  ];

  const bestPracticeGroups: {
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    items: string[];
  }[] = [
    {
      icon: SlidersHorizontal, iconBg: "bg-teal-50", iconColor: "text-teal-600",
      title: "List hygiene",
      items: [
        "Verify your entire list before every new campaign — not just once",
        "Remove hard bounces immediately and permanently",
        "Re-verify lists older than 6 months before reusing them",
        "Never purchase or scrape email lists — they have extremely high bounce rates",
      ],
    },
    {
      icon: Shield, iconBg: "bg-blue-50", iconColor: "text-blue-600",
      title: "Domain & sender health",
      items: [
        "Always authenticate your domain with SPF, DKIM, and DMARC records",
        "Warm up new domains and inboxes over 2–4 weeks before scaling",
        "Keep sending volume gradual — sudden spikes trigger server blocks",
        "Check your domain against major blacklists weekly",
      ],
    },
    {
      icon: Lightbulb, iconBg: "bg-amber-50", iconColor: "text-amber-600",
      title: "Campaign settings",
      items: [
        "Keep bounce rate below 3% to protect sender reputation",
        "Pause any campaign that crosses 5% bounce rate immediately",
        "Use inbox rotation to distribute daily sending across multiple accounts",
        "Avoid sending to catch-all domains at high volume without verification",
      ],
    },
  ];

  const planRows = [
    { feature: "Bounce rate tracking",          starter: "✓",       growth: "✓",         pro: "✓"              },
    { feature: "Per-campaign bounce report",     starter: "✓",       growth: "✓",         pro: "✓"              },
    { feature: "Auto hard bounce suppression",   starter: "✓",       growth: "✓",         pro: "✓"              },
    { feature: "Email Validation Agent",         starter: "Limited", growth: "Unlimited", pro: "Unlimited"      },
    { feature: "Warmup AI Agent",                starter: "Basic",   growth: "Full",      pro: "Full + Priority"},
    { feature: "Inbox rotation",                 starter: "—",       growth: "✓",         pro: "✓"              },
    { feature: "Global Blacklist Monitor",       starter: "—",       growth: "✓",         pro: "✓"              },
    { feature: "Bounce alert & auto-pause",      starter: "—",       growth: "✓",         pro: "✓"              },
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
                  <Link href="#" className="hover:text-teal-600 transition">Guides &amp; Cheat Sheets</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Bounce Rate Cheat Sheet</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div {...fadeUp(0)} className="mb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <MailWarning className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Bounce Rate Cheat Sheet
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Learn how to reduce email bounce rates in 360Airo with proven strategies,
                    built-in email validation, and deliverability best practices for cold email
                    campaigns.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ════════════════════════════
                    1 — What is email bounce?
                ════════════════════════════ */}
                <motion.section id="what-is-bounce" {...fadeUp(0.05)} className="mb-10">
                  <SectionHeading
                    icon={HelpCircle}
                    iconBg="bg-red-50"
                    iconColor="text-red-500"
                    title="What is email bounce and how does it affect your campaigns?"
                  />

                  <p className="text-sm text-gray-600 leading-relaxed">
                    An email bounce is an error message you receive when your cold email fails to
                    deliver. Your email server — or the recipient's mail server — sends back a
                    Non-Delivery Report (NDR) explaining why the email couldn't be delivered.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    In 360Airo, you can view bounced emails and their reasons by navigating to your
                    campaign reports. Bounces directly damage your sender reputation — the higher
                    your bounce rate, the more likely future emails land in spam or get blocked
                    entirely.
                  </p>

                  {/* Benchmark strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    {[
                      { label: "Target",           value: "< 2%",  color: "text-emerald-700", bg: "bg-emerald-50" },
                      { label: "Acceptable",        value: "2–3%",  color: "text-teal-700",    bg: "bg-teal-50"    },
                      { label: "Pause & review",    value: "3–5%",  color: "text-amber-600",   bg: "bg-amber-50"   },
                      { label: "Critical — stop",   value: "> 5%",  color: "text-red-600",     bg: "bg-red-50"     },
                    ].map(({ label, value, color, bg }) => (
                      <div key={label} className={`${bg} border border-gray-200 rounded-xl p-3 text-center`}>
                        <p className={`text-xl font-black ${color}`}>{value}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>

                  <Callout type="danger">
                    A bounce rate above <strong>5%</strong> will trigger automatic campaign pausing
                    in 360Airo and may flag your domain with major email providers. Always verify
                    your prospect list before launching.
                  </Callout>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════
                    2 — How it Works
                ════════════════════════════ */}
                <motion.section id="how-it-works" {...fadeUp(0.07)} className="mb-10">
                  <SectionHeading
                    icon={Settings}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    title="How it Works"
                  />

                  <SubHeading title="Understanding bounce rate" />
                  <p className="text-md text-gray-600 leading-relaxed">
                    Bounce rate shows the percentage of emails that failed to deliver compared to
                    your total emails sent. Lower bounce rates indicate better cold email
                    deliverability and overall campaign health.
                  </p>

                  {/* Formula */}
                  <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Formula</p>
                    <p className="text-sm font-mono font-bold text-gray-800">
                      Bounce Rate = Bounced Emails ÷ Emails Sent × 100
                    </p>
                  </div>

                  <Callout type="info">
                    360Airo tracks bounces <strong>per campaign and per email address</strong> in
                    real time. Hard bounces are automatically suppressed from all future sends the
                    moment they are detected.
                  </Callout>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════
                    3 — Types of Bounces
                ════════════════════════════ */}
                <motion.section id="types" {...fadeUp(0.09)} className="mb-2">
                  <SectionHeading
                    icon={AlertTriangle}
                    iconBg="bg-amber-50"
                    iconColor="text-amber-600"
                    title="Types of Email Bounces"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    There are two categories of email bounces. Knowing the difference tells you
                    exactly what action to take in 360Airo.
                  </p>
                </motion.section>

                {/* ── Soft Bounce ── */}
                <motion.section id="soft-bounce" {...fadeUp(0.1)} className="mb-8 mt-6">
                  <div className="rounded-xl border border-amber-200 overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3.5 bg-amber-50 border-b border-amber-100">
                      <RefreshCw className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-amber-800">Soft Bounce</p>
                        <p className="text-[11px] text-amber-600">Temporary delivery failures that may succeed if retried</p>
                      </div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        Soft bounces are temporary. 360Airo automatically retries soft-bounced
                        emails based on your campaign retry settings. If the same address soft
                        bounces repeatedly, it gets flagged for manual review.
                      </p>
                      <BulletList items={softBounces} color="bg-amber-400" />
                    </div>
                  </div>
                </motion.section>

                {/* ── Hard Bounce ── */}
                <motion.section id="hard-bounce" {...fadeUp(0.11)} className="mb-10">
                  <div className="rounded-xl border border-red-200 overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3.5 bg-red-50 border-b border-red-100">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-red-700">Hard Bounce</p>
                        <p className="text-[11px] text-red-500">Permanent delivery failures that won't succeed</p>
                      </div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        Hard bounces are permanent. 360Airo immediately suppresses hard-bounced
                        addresses from your entire account — they are never contacted again. These
                        are the most damaging to your sender reputation and must be minimised
                        through proper list verification.
                      </p>
                      <BulletList items={hardBounces} color="bg-red-400" />
                    </div>
                  </div>

                  <Callout type="warning">
                    Hard bounces are permanent signals to email providers that you are sending to
                    bad data. Even <strong>2–3 hard bounces per 100 emails</strong> can trigger
                    spam filters. Run 360Airo's Email Validation Agent before every campaign to
                    catch these before they happen.
                  </Callout>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════
                    4 — Reduce Within 360Airo
                ════════════════════════════ */}
                <motion.section id="reduce-within" {...fadeUp(0.13)} className="mb-10">
                  <SectionHeading
                    icon={Zap}
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                    title="Strategies to Reduce Bounce Rates — Within 360Airo"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    360Airo has six built-in tools to keep your bounce rate below 2%. Each maps
                    directly to a setting in your dashboard.
                  </p>
                  <div className="space-y-3">
                    {within360Airo.map((card) => (
                      <TipCard key={card.num} {...card} />
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════
                    5 — General Best Practices
                ════════════════════════════ */}
                <motion.section id="best-practices" {...fadeUp(0.15)} className="mb-10">
                  <SectionHeading
                    icon={Lightbulb}
                    iconBg="bg-yellow-50"
                    iconColor="text-yellow-600"
                    title="General Best Practices"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Platform features help — but these fundamentals apply to any cold email
                    strategy and dramatically reduce your bounce rate from day one.
                  </p>

                  <div className="space-y-4">
                    {bestPracticeGroups.map(({ icon: Icon, iconBg, iconColor, title, items }) => (
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

                {/* ════════════════════════════
                    6 — Plan Availability
                ════════════════════════════ */}
                <motion.section id="plan-availability" {...fadeUp(0.17)} className="mb-10">
                  <SectionHeading
                    icon={PackageCheck}
                    iconBg="bg-violet-50"
                    iconColor="text-violet-600"
                    title="Plan Availability"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Basic bounce tracking is available on all 360Airo plans. Advanced protection —
                    including unlimited verification, inbox rotation, and blacklist monitoring —
                    requires Growth or above.
                  </p>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="grid grid-cols-[1fr_72px_80px_72px] bg-gray-50 px-4 py-2.5 border-b border-gray-200 gap-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Feature</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Starter</span>
                      <span className="text-[10px] font-black text-teal-600 uppercase tracking-wider text-center">Growth</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Pro</span>
                    </div>

                    {/* Rows */}
                    {planRows.map(({ feature, starter, growth, pro }, i) => (
                      <div
                        key={feature}
                        className={`grid grid-cols-[1fr_72px_80px_72px] items-center px-4 py-2.5 gap-2 border-b border-gray-100 last:border-0 text-xs ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                        }`}
                      >
                        <span className="font-semibold text-gray-700">{feature}</span>
                        <span className={`text-center font-medium ${
                          starter === "✓" ? "text-emerald-600" :
                          starter === "—" ? "text-gray-300" : "text-gray-500"
                        }`}>{starter}</span>
                        <span className={`text-center font-black ${
                          growth === "✓" || growth === "Full" || growth === "Unlimited"
                            ? "text-teal-700" : "text-gray-300"
                        }`}>{growth}</span>
                        <span className={`text-center font-medium ${
                          pro === "✓" || pro.includes("Full") || pro === "Unlimited"
                            ? "text-gray-700" : "text-gray-300"
                        }`}>{pro}</span>
                      </div>
                    ))}
                  </div>

                  <Callout type="success">
                    All plans include automatic hard bounce suppression and per-campaign bounce
                    tracking. Upgrade to Growth to unlock unlimited verification, inbox rotation,
                    and the Global Blacklist Monitor.{" "}
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
                    Open Rate Cheat Sheet
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    Reply Rate Cheat Sheet
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