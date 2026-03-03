"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen,
  CreditCard, HelpCircle, RefreshCw, AlertCircle,
  FileText, Shield, Zap, Phone, Info,
  ArrowUpCircle, ArrowDownCircle, XCircle, CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ── Table of Contents ──
const TOC = [
  { id: "plans-billing",  label: "Plans & billing"   },
  { id: "payments",       label: "Payments"          },
  { id: "changes",        label: "Changes & cancels" },
  { id: "invoices",       label: "Invoices & tax"    },
  { id: "calling",        label: "Calling credits"   },
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
              placeholder="e.g. How do I get an invoice?"
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

// ── Accordion FAQ item ──
function FAQItem({
  q,
  a,
  delay = 0,
}: {
  q: string;
  a: React.ReactNode;
  delay?: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 text-xs text-gray-500 leading-relaxed border-t border-gray-100 bg-white">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── FAQ section wrapper ──
function FAQSection({
  id,
  icon: Icon,
  iconBg,
  iconColor,
  title,
  faqs,
  delay = 0,
}: {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  faqs: { q: string; a: React.ReactNode }[];
  delay?: number;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="mb-8"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        {title}
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} delay={delay + i * 0.04} />
        ))}
      </div>
    </motion.section>
  );
}

// ── Main page ──
export default function BillingFAQsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [activeToc, setActiveToc]     = useState("plans-billing");

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

  const path = (
    <code className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-mono">
      Avatar → Settings → Billing → Subscription
    </code>
  );

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
                  <Link href="#" className="hover:text-teal-600 transition">Billing</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Billing FAQs</span>
                </nav>

                {/* ── Hero ── */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Billing FAQs
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Everything you need to know about your 360Airo subscription — payments,
                    plan changes, invoices, calling credits, and more.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── Quick answers strip ── */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
                >
                  {[
                    { Icon: CreditCard,     value: "Card / PayPal", label: "Accepted payments"    },
                    { Icon: CheckCircle2,   value: "Free trial",    label: "No credit card needed" },
                    { Icon: RefreshCw,      value: "Auto-renews",   label: "Cancel anytime"        },
                    { Icon: FileText,       value: "Instant",       label: "Invoice on every pay"  },
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
                </motion.div>

                {/* ── Section 1: Plans & Billing ── */}
                <FAQSection
                  id="plans-billing"
                  icon={Zap}
                  iconBg="bg-teal-50"
                  iconColor="text-teal-600"
                  title="Plans & billing"
                  delay={0.08}
                  faqs={[
                    {
                      q: "Does 360Airo offer monthly and annual billing?",
                      a: (
                        <>
                          Yes. You can choose between <strong>monthly</strong> or{" "}
                          <strong>annual billing</strong>. Annual plans come with a discount — you
                          can compare and switch at any time from your Billing settings.{" "}
                          <Link href="/pricing" className="text-teal-600 underline underline-offset-2 font-semibold">
                            View pricing →
                          </Link>
                        </>
                      ),
                    },
                    {
                      q: "Is there a free trial available?",
                      a: (
                        <>
                          Yes — 360Airo offers a <strong>free trial</strong> so you can explore the
                          platform before committing. No credit card is required to get started.{" "}
                          <Link href="/pricing" className="text-teal-600 underline underline-offset-2 font-semibold">
                            Start your free trial →
                          </Link>
                        </>
                      ),
                    },
                    {
                      q: "Is there a setup fee?",
                      a: "No — there are no hidden or additional setup fees. Your subscription price includes full access to all platform features based on your chosen plan.",
                    },
                    {
                      q: "Do I get a discount for annual or bulk commitments?",
                      a: "Yes. Annual plans are discounted compared to monthly billing. For enterprise-level or agency bulk discounts, contact the 360Airo sales team directly.",
                    },
                    {
                      q: "Does the plan price include email accounts and domain setup?",
                      a: "Your subscription covers full access to 360Airo features. Unlimited email accounts are included with Growth and Pro plans. Custom domain setup for tracking is available within the platform — no extra charge.",
                    },
                  ]}
                />

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 2: Payments ── */}
                <FAQSection
                  id="payments"
                  icon={CreditCard}
                  iconBg="bg-blue-50"
                  iconColor="text-blue-600"
                  title="Payments"
                  delay={0.1}
                  faqs={[
                    {
                      q: "What payment methods does 360Airo accept?",
                      a: (
                        <>
                          360Airo accepts <strong>credit/debit cards</strong> and{" "}
                          <strong>PayPal</strong>. For enterprise plans, wire transfers may also be
                          arranged — contact support to set this up.
                        </>
                      ),
                    },
                    {
                      q: "Will my subscription renew automatically?",
                      a: "Yes — all subscriptions auto-renew at the end of each billing cycle (monthly or annual). You'll receive a reminder email before renewal. Cancel any time from your Billing settings before the renewal date to avoid being charged.",
                    },
                    {
                      q: "What happens if my payment fails?",
                      a: (
                        <>
                          360Airo will notify you via email if a payment fails. You'll have a short
                          grace period to update your payment details at {path} before your account
                          is paused.
                        </>
                      ),
                    },
                    {
                      q: "Do you charge VAT, GST, or other taxes?",
                      a: (
                        <>
                          Applicable taxes are added at checkout based on your region. For example,
                          Indian customers are charged <strong>18% GST</strong> on top of their
                          subscription price when billing in INR. The final amount including tax is
                          always shown before you confirm payment.
                        </>
                      ),
                    },
                    {
                      q: "How do I update my billing details or payment method?",
                      a: <>You can update your payment method at any time from {path}. Changes apply to your next renewal.</>,
                    },
                  ]}
                />

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 3: Changes & Cancellations ── */}
                <FAQSection
                  id="changes"
                  icon={ArrowUpCircle}
                  iconBg="bg-violet-50"
                  iconColor="text-violet-600"
                  title="Changes & cancellations"
                  delay={0.12}
                  faqs={[
                    {
                      q: "Can I upgrade or downgrade my plan at any time?",
                      a: (
                        <>
                          Yes. Upgrades take effect <strong>immediately</strong>; downgrades apply
                          at the end of your current billing cycle. Go to {path} to change your
                          plan.
                        </>
                      ),
                    },
                    {
                      q: "Can I switch from monthly to annual billing?",
                      a: "Yes — you can switch to an annual plan at any time. Billing is adjusted based on the remaining days in your current monthly cycle, and you'll benefit from the annual discount immediately.",
                    },
                    {
                      q: "Can I pause my subscription?",
                      a: "360Airo does not currently offer a pause option. If you need a break, you can cancel your plan and reactivate later — your data is retained for 90 days after cancellation.",
                    },
                    {
                      q: "What happens when I cancel my subscription?",
                      a: "After cancellation, you retain full access until the end of your current billing period. After that, your account is paused. Your data (campaigns, prospects, reports) is kept for 90 days — export everything before the window closes.",
                    },
                    {
                      q: "What is 360Airo's refund policy?",
                      a: "Monthly plans are non-refundable. For annual plans, refund requests are reviewed case-by-case — reach out to the support team within 7 days of renewal if you believe a refund is warranted.",
                    },
                    {
                      q: "Can I request a custom plan for my team?",
                      a: "Yes. If your team has specific seat counts, volume needs, or SLA requirements, contact the 360Airo sales team for a tailored plan and enterprise onboarding.",
                    },
                  ]}
                />

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 4: Invoices & Tax ── */}
                <FAQSection
                  id="invoices"
                  icon={FileText}
                  iconBg="bg-emerald-50"
                  iconColor="text-emerald-600"
                  title="Invoices & tax"
                  delay={0.14}
                  faqs={[
                    {
                      q: "Can I download an invoice for my payment?",
                      a: <>Yes. Invoices are generated automatically after every payment. Download them from {path} — scroll down to the Invoice History section.</>,
                    },
                    {
                      q: "What happens if I exceed my plan's sending limits?",
                      a: "If you hit your monthly prospect or sending limit, outreach pauses until the next billing cycle resets your quota — or you can upgrade immediately to unlock higher limits.",
                    },
                  ]}
                />

                <div className="border-t border-gray-200 my-8" />

                {/* ── Section 5: Calling Credits ── */}
                <FAQSection
                  id="calling"
                  icon={Phone}
                  iconBg="bg-amber-50"
                  iconColor="text-amber-600"
                  title="Calling credits"
                  delay={0.16}
                  faqs={[
                    {
                      q: "How do I buy calling credits?",
                      a: (
                        <>
                          Calling credits are purchased separately from your subscription. Navigate
                          to{" "}
                          <code className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-mono">
                            Billing → Top Up Calling Credits
                          </code>{" "}
                          to add credits. They are deducted only when you make calls — there is no
                          automatic monthly deduction.
                        </>
                      ),
                    },
                    {
                      q: "How are calling credits consumed?",
                      a: (
                        <>
                          Credits are deducted based on actual call duration and the destination
                          country. Rates vary by region — for example, calls to the{" "}
                          <strong>UK and USA</strong> are charged at approximately{" "}
                          <strong>$0.040 per minute</strong>, giving you ~1,250 minutes per $50 of
                          credit. Credits do not expire monthly — they roll over until exhausted.
                        </>
                      ),
                    },
                  ]}
                />

                {/* ── Still need help callout ── */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.18 }}
                  className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-xl px-5 py-4 mb-8"
                >
                  <Info className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-teal-800 mb-0.5">Still have a question?</p>
                    <p className="text-xs text-teal-700 leading-snug">
                      Reach out to the 360Airo support team — we typically respond within a few hours.{" "}
                      <Link href="mailto:support@360airo.com" className="font-semibold underline underline-offset-2">
                        support@360airo.com
                      </Link>
                    </p>
                  </div>
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
                    Change Subscription Plan
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-teal-600 transition"
                  >
                    Referral Program
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