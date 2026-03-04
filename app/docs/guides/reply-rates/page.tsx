"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  ChevronRight,
  Clock,
  BookOpen,
  MessageSquareReply,
  HelpCircle,
  TrendingDown,
  Zap,
  Globe,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  PackageCheck,
  Users,
  FlaskConical,
  GitBranch,
  Layers,
  MessageSquare,
  Pencil,
  SlidersHorizontal,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── TOC — mirrors SmartReach structure exactly ──
const TOC = [
  { id: "what-is-reply-rate",  label: "What is Reply Rate?"           },
  { id: "low-reply-reasons",   label: "Reasons for low reply rate"    },
  { id: "increase-within",     label: "Increase with 360Airo"         },
  { id: "external-factors",    label: "Other external factors"        },
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
              placeholder="e.g. Why is my reply rate low?"
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

// ── Section heading ──
function SectionHeading({
  icon: Icon,
  iconBg,
  iconColor,
  title,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
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
function BulletList({ items, dotColor = "bg-teal-500" }: { items: string[]; dotColor?: string }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-snug">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0 mt-1.5`} />
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
  type?: "info" | "warning" | "success";
  children: React.ReactNode;
}) {
  const map = {
    info:    { bg: "bg-blue-50",  border: "border-blue-100",  text: "text-blue-700",  Icon: Info          },
    warning: { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-700", Icon: AlertTriangle },
    success: { bg: "bg-teal-50",  border: "border-teal-100",  text: "text-teal-700",  Icon: CheckCircle2  },
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
export default function ReplyRatesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [activeToc, setActiveToc]     = useState("what-is-reply-rate");

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

  const lowReplyReasons = [
    "Poor timing — sending at the wrong day or hour for the prospect's timezone",
    "Over-promotion — leading with features, pricing, or a sales pitch too early",
    "Email too long — walls of text get ignored; aim for 3–5 sentences per email",
    "Confusing or weak CTA — one unclear ask is worse than no ask at all",
    "No personalisation — generic emails feel like broadcasts, not conversations",
    "Not staying updated with outreach trends — what worked 12 months ago may not work now",
    "Sent without a test — broken formatting, missing merge tags, or broken links kill replies",
    "No proofreading — typos and grammar errors destroy credibility instantly",
    "Inconsistent follow-up — stopping after one email leaves most replies on the table",
    "Low open rates — replies are impossible if the email was never opened",
    "Bad deliverability — emails going to spam can't be replied to",
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
      num: 1, icon: Pencil, iconBg: "bg-teal-50", iconColor: "text-teal-600",
      title: "Use AI-personalised icebreakers",
      desc: "360Airo's AI SDR writes a unique opening line for every prospect based on their LinkedIn, company, and role. Personalised openers lift reply rates from a 5% average to 15–18%. Enable it under Campaign → Content → AI Icebreaker.",
    },
    {
      num: 2, icon: FlaskConical, iconBg: "bg-violet-50", iconColor: "text-violet-600",
      title: "A/B test your email copy",
      desc: "Run two variants of your email — different subject lines, CTAs, or body copy — and let 360Airo automatically identify the winner based on reply rate. Set it up under Campaign → A/B Testing.",
    },
    {
      num: 3, icon: GitBranch, iconBg: "bg-blue-50", iconColor: "text-blue-600",
      title: "Set up smart follow-up sequences",
      desc: "Most replies come from follow-up emails, not the first touch. 360Airo's Email Sequence AI Agent creates multi-step follow-ups that automatically stop when a prospect replies. Build sequences under Campaign → Add Follow-Up Steps.",
    },
    {
      num: 4, icon: Layers, iconBg: "bg-indigo-50", iconColor: "text-indigo-600",
      title: "Launch multichannel outreach",
      desc: "Prospects who receive a LinkedIn message and an email reply at significantly higher rates than those receiving email alone. 360Airo's multichannel drip sequences touch the same prospect across email, LinkedIn, and WhatsApp in one coordinated flow.",
    },
    {
      num: 5, icon: Target, iconBg: "bg-amber-50", iconColor: "text-amber-600",
      title: "Write a single, clear CTA",
      desc: "The most common reply-killer is asking prospects to do too many things at once. 360Airo's AI SDR enforces one low-commitment CTA per email — typically a simple yes/no question or a 15-minute calendar link.",
    },
    {
      num: 6, icon: MessageSquare, iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
      title: "Manage replies in Campaign Inbox",
      desc: "360Airo's Campaign Inbox surfaces all replies, categorises them by sentiment (Positive / Neutral / Negative), and auto-pauses sequences when a prospect replies. Handle every reply from one place under Reports → Campaign Inbox.",
    },
    {
      num: 7, icon: SlidersHorizontal, iconBg: "bg-rose-50", iconColor: "text-rose-500",
      title: "Use the AI Response Agent",
      desc: "For high-volume campaigns, 360Airo's AI Response Agent drafts a personalised reply suggestion for every incoming message — saving your team hours per day while keeping conversations warm. Enable under Settings → AI Automation → Response Agent.",
    },
  ];

  const externalFactors: {
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    items: string[];
  }[] = [
    {
      icon: Users, iconBg: "bg-teal-50", iconColor: "text-teal-600",
      title: "Prospect list quality",
      items: [
        "Target decision-makers — not just anyone with an email address",
        "Narrow your ICP before launching — a tighter list always outperforms a broad one",
        "Verify your list with 360Airo before sending to eliminate invalid addresses",
        "Remove prospects who have been contacted 4+ times with no engagement",
      ],
    },
    {
      icon: Lightbulb, iconBg: "bg-amber-50", iconColor: "text-amber-600",
      title: "Email copy fundamentals",
      items: [
        "Open with the prospect — not your company, product, or achievements",
        "Keep body copy to 3–5 short sentences for maximum readability",
        "Sound like a human, not a marketing template — use conversational language",
        "Always proofread and send a test email before launching any campaign",
      ],
    },
    {
      icon: Globe, iconBg: "bg-blue-50", iconColor: "text-blue-600",
      title: "Timing & market conditions",
      items: [
        "Best sending days: Tuesday, Wednesday, Thursday",
        "Best windows: 8–10 AM or 2–4 PM in the prospect's local timezone",
        "Avoid sending during major holidays, fiscal year-end, or local events",
        "Stay updated with current outreach trends — B2B buying behaviour shifts every 6–12 months",
      ],
    },
    {
      icon: PackageCheck, iconBg: "bg-violet-50", iconColor: "text-violet-600",
      title: "Deliverability foundation",
      items: [
        "First fix open rates and deliverability — replies are impossible without delivery",
        "Ensure SPF, DKIM, and DMARC are authenticated on your sending domain",
        "Keep bounce rate below 2% to maintain a healthy sender score",
        "Use inbox rotation to avoid daily volume caps on individual inboxes",
      ],
    },
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
                  <span className="text-gray-700 font-medium">Reply Rate Cheat Sheet</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div {...fadeUp(0)} className="mb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <MessageSquareReply className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Reply Rate Cheat Sheet
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Boost cold email reply rates with 360Airo's built-in features. Learn
                    personalisation, A/B testing, multichannel outreach, and best practices for
                    higher engagement from your campaigns.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ════════════════════════════
                    1 — What is Reply Rate?
                ════════════════════════════ */}
                <motion.section id="what-is-reply-rate" {...fadeUp(0.05)} className="mb-10">
                  <SectionHeading
                    icon={HelpCircle}
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                    title="What is Reply Rate?"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A "reply" is any response received from a prospect during your campaign period.
                    Reply Rate is the ratio of total replies to the total number of prospects
                    contacted. <strong>The higher the reply rate, the better.</strong>
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    Unlike open rate — which only measures curiosity — reply rate measures actual
                    engagement. It's the metric most directly tied to pipeline and revenue
                    generated from cold outreach.
                  </p>

                  {/* Formula */}
                  <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">Formula</p>
                    <p className="text-sm font-mono font-bold text-gray-800">
                      Reply Rate = Total Replies ÷ Prospects Contacted × 100
                    </p>
                  </div>

                  {/* Benchmark strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {[
                      { label: "Cold email avg",    value: "1–5%",   color: "text-gray-700",    bg: "bg-gray-50"    },
                      { label: "Good",              value: "5–10%",  color: "text-teal-700",    bg: "bg-teal-50"    },
                      { label: "360Airo benchmark", value: "8–18%",  color: "text-emerald-700", bg: "bg-emerald-50" },
                      { label: "Excellent",         value: "> 20%",  color: "text-violet-700",  bg: "bg-violet-50"  },
                    ].map(({ label, value, color, bg }) => (
                      <div key={label} className={`${bg} border border-gray-200 rounded-xl p-3 text-center`}>
                        <p className={`text-xl font-black ${color}`}>{value}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>

                  <Callout type="info">
                    While it can be difficult to achieve a reply rate above 20%, it is very
                    important to first understand the reasons for low replies before changing your
                    copy or targeting. The root cause is often deliverability or open rate — not
                    the email body.
                  </Callout>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════
                    2 — Reasons for Low Reply Rate
                ════════════════════════════ */}
                <motion.section id="low-reply-reasons" {...fadeUp(0.07)} className="mb-10">
                  <SectionHeading
                    icon={TrendingDown}
                    iconBg="bg-red-50"
                    iconColor="text-red-500"
                    title="What are the reasons for a low or declining reply rate?"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Before changing your email copy, check every item on this list. Most low reply
                    rates trace back to one of these root causes:
                  </p>
                  <BulletList items={lowReplyReasons} dotColor="bg-red-400" />

                  <Callout type="warning">
                    <span>
                      <strong>Start with deliverability and open rate.</strong> If your open rate
                      is below 20%, fixing copy won't move the needle — emails need to land in the
                      inbox and get opened before a reply is even possible. See the{" "}
                      <Link href="#" className="underline underline-offset-2 font-semibold">
                        Open Rate Cheat Sheet
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="underline underline-offset-2 font-semibold">
                        Bounce Rate Cheat Sheet
                      </Link>{" "}
                      first.
                    </span>
                  </Callout>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════
                    3 — Increase Within 360Airo
                ════════════════════════════ */}
                <motion.section id="increase-within" {...fadeUp(0.09)} className="mb-10">
                  <SectionHeading
                    icon={Zap}
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                    title="How to Increase Reply Rates within 360Airo"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    To drive better reply rates, start by improving open rates and deliverability
                    first — then layer in these 360Airo-specific features. Each maps to a
                    specific setting in your dashboard.
                  </p>
                  <div className="space-y-3">
                    {within360Airo.map((card) => (
                      <TipCard key={card.num} {...card} />
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ════════════════════════════
                    4 — External Factors
                ════════════════════════════ */}
                <motion.section id="external-factors" {...fadeUp(0.11)} className="mb-10">
                  <SectionHeading
                    icon={Globe}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    title="Other External Factors that Improve Reply Rates"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Platform features can only go so far. These fundamentals apply to any cold
                    email strategy and have the highest impact on sustained reply rates.
                  </p>

                  <div className="space-y-4">
                    {externalFactors.map(({ icon: Icon, iconBg, iconColor, title, items }) => (
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

                  <Callout type="success">
                    360Airo customers using AI icebreakers + multichannel sequences + A/B testing
                    together consistently see reply rates of{" "}
                    <strong>12–18%</strong> — compared to a cold email industry average of 1–5%.
                    Enable all three for maximum impact.
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
                    Bounce Rate Cheat Sheet
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    Common Spam-Trigger Words
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