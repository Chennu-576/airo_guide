"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronDown,
  ChevronRight,
  Clock,
  BookOpen,
  Gift,
  Link2,
  Share2,
  DollarSign,
  BarChart2,
  Users,
  Star,
  Info,
  CheckCircle2,
  Zap,
  TrendingUp,
  Eye,
  Wallet,
  AlertCircle,
  Repeat2,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── Table of Contents ──
const TOC = [
  { id: "overview",     label: "Overview"        },
  { id: "how-it-works", label: "How it works"    },
  { id: "rewards",      label: "Rewards & perks" },
  { id: "tracking",     label: "Track referrals" },
  { id: "faqs",         label: "FAQs"            },
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
              placeholder="e.g. How do I find my referral link?"
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

        {/* CTA card */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-4 text-white">
          <p className="text-xs font-bold mb-1">Ready to earn?</p>
          <p className="text-[10px] opacity-80 mb-3 leading-snug">
            Get your unique referral link in under a minute.
          </p>
          <Link
            href="https://360airo.com/features/360airo-referral-program"
            target="_blank"
            className="block text-center text-[10px] font-black bg-white text-teal-700 rounded-lg py-1.5 hover:bg-teal-50 transition"
          >
            Get My Link →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Referral dashboard mock ──
function ReferralDashboard() {
  const referrals = [
    { name: "Alex Carter",   company: "SalesForge", status: "Active",  earned: "$23.70", joined: "Jan 12" },
    { name: "Priya Menon",   company: "LeadBridge", status: "Active",  earned: "$15.80", joined: "Feb 3"  },
    { name: "James Okafor",  company: "CloudWorks", status: "Pending", earned: "—",      joined: "Mar 1"  },
    { name: "Nadia Petrova", company: "CredFlow",   status: "Active",  earned: "$47.40", joined: "Dec 28" },
  ];

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
          🔒 app.360airo.com/settings/referral
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 border-b border-gray-100 bg-white">
        {[
          { label: "Total Refs", val: "12",     color: "text-gray-900"   },
          { label: "Active",     val: "9",      color: "text-teal-700"   },
          { label: "Pending",    val: "3",      color: "text-amber-600"  },
          { label: "Earned",     val: "$86.90", color: "text-violet-700" },
        ].map(({ label, val, color }) => (
          <div key={label} className="px-3 py-3 border-r border-gray-100 last:border-r-0 text-center">
            <p className={`text-lg font-black ${color}`}>{val}</p>
            <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Referral link row */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex-shrink-0">
          Your link
        </span>
        <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[10px] text-gray-500 font-mono truncate">
          https://360airo.com/?ref=<span className="text-teal-600 font-black">your-unique-id</span>
        </div>
        <button className="text-[10px] font-bold text-teal-600 border border-teal-200 bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition flex-shrink-0">
          Copy
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_80px_64px_64px] gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
        {["Referral", "Company", "Status", "Earned"].map((h) => (
          <span
            key={h}
            className="text-[9px] font-black text-gray-400 uppercase tracking-wider last:text-right"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Table rows */}
      <div className="bg-white divide-y divide-gray-50">
        {referrals.map((r, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_80px_64px_64px] items-center gap-2 px-4 py-2.5 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
            }`}
          >
            <div>
              <p className="text-xs font-semibold text-gray-800">{r.name}</p>
              <p className="text-[10px] text-gray-400">{r.joined}</p>
            </div>
            <span className="text-[10px] text-gray-500 truncate">{r.company}</span>
            <span
              className={`text-[9px] font-black px-1.5 py-0.5 rounded-full text-center ${
                r.status === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {r.status}
            </span>
            <span className="text-[10px] font-black text-violet-700 text-right">{r.earned}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Accordion FAQ item ──
function FAQItem({ q, a, delay = 0 }: { q: string; a: string; delay?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay }}
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors ${
          open ? "bg-teal-50" : "bg-white hover:bg-gray-50"
        }`}
      >
        <span className={`text-sm font-semibold ${open ? "text-teal-700" : "text-gray-800"}`}>
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform ${
            open ? "rotate-180 text-teal-600" : "text-gray-400"
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 bg-white">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ──
export default function ReferralProgramPage() {
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

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 8 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
  });

  // ── Steps data ──
  const steps: { num: string; Icon: React.ElementType; title: string; desc: string }[] = [
    {
      num: "01", Icon: CheckCircle2,
      title: "Log in to 360Airo",
      desc:  "Sign in and navigate to Settings → Your Account → Referral Program → Checkout Dashboard.",
    },
    {
      num: "02", Icon: Link2,
      title: "Copy your unique referral link",
      desc:  "Your personalised referral link is ready instantly — no application or approval required.",
    },
    {
      num: "03", Icon: Share2,
      title: "Share it anywhere",
      desc:  "Send it via email, LinkedIn, Twitter, your blog, or directly to teammates and clients.",
    },
    {
      num: "04", Icon: DollarSign,
      title: "Earn recurring rewards",
      desc:  "Get rewarded for every person who subscribes through your link. Rewards are credited after your referral completes two full months on a paid plan.",
    },
  ];

  // ── Perks data — only valid lucide-react icons ──
  const perks: { Icon: React.ElementType; bg: string; ic: string; title: string; desc: string }[] = [
    {
      Icon: TrendingUp, bg: "bg-teal-50",   ic: "text-teal-600",
      title: "Recurring rewards",
      desc:  "Earn a percentage of every active referral's subscription — not a one-time payment. The longer they stay, the more you earn.",
    },
    {
      Icon: Wallet,     bg: "bg-violet-50", ic: "text-violet-600",
      title: "Wallet credit or cash payout",
      desc:  "Choose between 360Airo wallet credits (applied to your own subscription) or a cash-based payout — whichever suits you.",
    },
    {
      Icon: Repeat2,    bg: "bg-blue-50",   ic: "text-blue-600",
      title: "No referral cap",
      desc:  "There is no limit on how many people you can refer. Refer 1 or 100 — every successful signup earns you rewards.",
    },
    {
      Icon: Eye,        bg: "bg-emerald-50",ic: "text-emerald-600",
      title: "Real-time dashboard",
      desc:  "Track every click, signup, and earning in your referral dashboard. Full visibility from referral to payout — no guesswork.",
    },
    {
      Icon: Star,       bg: "bg-amber-50",  ic: "text-amber-600",
      title: "Community perks for top referrers",
      desc:  "Top referrers get exclusive bonuses, early feature access, and spotlight mentions in the 360Airo community.",
    },
    {
      Icon: Users,      bg: "bg-rose-50",   ic: "text-rose-500",
      title: "Open to everyone",
      desc:  "Freelancers, founders, consultants, bloggers, students — if you believe in smarter outreach, you already qualify.",
    },
  ];

  // ── FAQ data ──
  const faqs = [
    {
      q: "Who is eligible to join the 360Airo referral program?",
      a: "Anyone with a 360Airo account can join — there is no special approval process. Freelancers, founders, marketers, bloggers, and agency owners are all welcome.",
    },
    {
      q: "When do I receive my referral rewards?",
      a: "Your reward is credited after your referred user completes two full months on a paid plan. For example, if they subscribe today, your reward becomes available after 60 days.",
    },
    {
      q: "Are referral rewards recurring?",
      a: "Yes. You earn a recurring percentage of your referral's active subscription fee — not just a one-time bonus. As long as they stay subscribed, you keep earning.",
    },
    {
      q: "Can I refer multiple people?",
      a: "Absolutely — there is no limit. The more successful referrals you make, the more you earn. There is no cap on your total rewards.",
    },
    {
      q: "Are there any restrictions I should know about?",
      a: "Referrals must be new customers who have not previously signed up for 360Airo. They must sign up using your unique referral link to be eligible. Self-referrals are not permitted.",
    },
    {
      q: "Is it free to join the referral program?",
      a: "Yes — joining the 360Airo referral program is completely free. There are no fees or minimum requirements to participate.",
    },
    {
      q: "How transparent is the tracking and payout system?",
      a: "Every referral — from click to conversion — is logged in your dashboard. You can see which channels perform best, how much you have earned, and the status of each referral. No hidden policies, no guesswork.",
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
                  <Link href="#" className="hover:text-teal-600 transition">Referral</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Referral Program</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div {...fadeUp(0)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Referral Program
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Turn your network into a revenue stream. Refer anyone to 360Airo and earn
                    recurring rewards for every active subscription — no cap, no expiry, full
                    transparency.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Section 1: Overview ── */}
                <motion.section id="overview" {...fadeUp(0.06)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Overview</h2>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {[
                      { Icon: DollarSign, value: "Recurring", label: "Rewards per referral"    },
                      { Icon: Repeat2,    value: "Unlimited", label: "Referrals allowed"        },
                      { Icon: Zap,        value: "Instant",   label: "Link, no approval needed" },
                      { Icon: BarChart2,  value: "Live",      label: "Dashboard tracking"       },
                    ].map(({ Icon, value, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center text-center gap-1.5 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition"
                      >
                        <div className="p-2 rounded-lg bg-teal-50">
                          <Icon className="w-4 h-4 text-teal-600" />
                        </div>
                        <p className="text-sm font-black text-gray-900">{value}</p>
                        <p className="text-[11px] text-gray-400 font-medium leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-xs text-teal-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      The 360Airo Referral Program is built on one idea —{" "}
                      <strong>growth feels better when it's shared</strong>. Refer your network to
                      smarter outreach and earn recurring rewards every time someone joins and stays
                      subscribed through your link.
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 2: How it works ── */}
                <motion.section id="how-it-works" {...fadeUp(0.08)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-5">How it works</h2>

                  <div className="space-y-4 mb-6">
                    {steps.map((s, i) => (
                      <motion.div
                        key={s.num}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + i * 0.07 }}
                        className="flex gap-4 items-start"
                      >
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {s.num}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      Your reward is credited{" "}
                      <strong>after your referral completes two full months</strong> on a paid plan —
                      ensuring both sides get genuine value from the relationship.
                    </span>
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 3: Rewards & perks ── */}
                <motion.section id="rewards" {...fadeUp(0.1)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" /> Rewards &amp; perks
                  </h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    This is not a one-time reward system — it's a partnership that grows alongside
                    your influence. Here's everything you get.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {perks.map(({ Icon, bg, ic, title, desc }) => (
                      <div
                        key={title}
                        className="flex gap-3 p-4 rounded-xl border border-gray-200 hover:shadow-sm transition"
                      >
                        <div className={`p-2 rounded-lg ${bg} flex-shrink-0 self-start`}>
                          <Icon className={`w-3.5 h-3.5 ${ic}`} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 mb-0.5">{title}</p>
                          <p className="text-xs text-gray-500 leading-snug">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 4: Track referrals ── */}
                <motion.section id="tracking" {...fadeUp(0.12)} className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Track referrals</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Every referral you make is logged from click to conversion. Your dashboard
                    shows signups, earnings, payout status, and which channels perform best — all
                    in real time.
                  </p>
                  <ReferralDashboard />
                </motion.section>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 5: FAQs ── */}
                <motion.section id="faqs" {...fadeUp(0.14)} className="mb-10">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" /> FAQs
                  </h2>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <FAQItem key={i} q={faq.q} a={faq.a} delay={0.14 + i * 0.04} />
                    ))}
                  </div>
                </motion.section>

                {/* ── CTA banner ── */}
                <motion.div
                  {...fadeUp(0.18)}
                  className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-6 text-white mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-base font-bold mb-1">Ready to start earning?</p>
                    <p className="text-xs opacity-80 leading-snug max-w-sm">
                      Get your unique referral link in under a minute — no application, no waiting,
                      no cap on what you can earn.
                    </p>
                  </div>
                  <Link
                    href="https://360airo.com/features/360airo-referral-program"
                    target="_blank"
                    className="flex-shrink-0 text-xs font-black bg-white text-teal-700 px-5 py-2.5 rounded-xl hover:bg-teal-50 transition shadow-sm"
                  >
                    Get My Referral Link →
                  </Link>
                </motion.div>

                {/* ── Updated timestamp ── */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated March 2026</span>
                </div>

                {/* ── Prev / Next nav ── */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                    Billing FAQs
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    Troubleshoot
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