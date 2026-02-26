'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Sidebar } from '@/components/help-center/Sidebar'
import { Navigation } from '@/components/help-center/Navigation'

// ─── Trial features (numbered list) ─────────────────────────────────────────
const TRIAL_ITEMS = [
  {
    title: 'Full Access to One Active Campaign',
    body: "Create and run one complete outreach campaign during your trial to experience the full power of 360Airo's automation — emails, LinkedIn messages, and follow-up sequences included.",
  },
  {
    title: 'AI Content Assistance',
    body: "Test our AI-powered content generation and personalisation tools. Craft compelling icebreakers, subject lines, and follow-ups for every individual prospect in seconds.",
  },
  {
    title: 'Deliverability Tracking & Warmup Tools',
    body: "Access advanced email deliverability monitoring, sender reputation protection, and inbox warmup tools that help you build and maintain a healthy sending identity throughout your trial.",
  },
  {
    title: 'Free Onboarding Session',
    body: "Get a personalised onboarding session with our success team. We'll help you set up your first campaign, connect your inbox, and hit the ground running from day one.",
  },
  {
    title: 'Upgrade, Downgrade, or Cancel Anytime',
    body: "No contracts, no commitments. Your data, campaigns, and progress remain secure regardless of the plan you choose. Already used your trial? Reach out — we're happy to extend access or set up a fresh test run.",
  },
]

// ─── Ask AI popover ──────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-blue-400 hover:text-blue-600 bg-white shadow-sm transition-colors"
      >
        <Bot className="w-3.5 h-3.5" />
        Ask AI
        <ChevronDown
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
        />
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
              placeholder="e.g. How do I start a free trial?"
            />
            <button className="mt-2 w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
              Ask
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FreeTrialPage() {
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Navigation ── */}
      <Navigation onToggleSidebar={() => setMobileNav(true)} />

      {/* ── Body: sidebar + content ── */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar — handles both desktop (always visible) and mobile (isOpen toggle) */}
        <Sidebar
          isOpen={mobileNav}
          onClose={() => setMobileNav(false)}
        />

        {/* ── Content + Ask AI ── */}
        <div className="flex flex-1 min-w-0 lg:pl-64 xl:pl-72">

          {/* Main doc */}
          <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
            <div className="max-w-5xl">

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
                <span className="text-gray-700 font-medium">Free Trial Features</span>
              </motion.nav>

              {/* Page title */}
              <motion.div
                id="free-trial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  Free Trial Features
                </h1>
                <p className="text-base text-gray-600 leading-relaxed">
                  Explore 360Airo's free trial — full access to one active campaign, AI content
                  assistance, inbox warmup, deliverability tracking, and a dedicated onboarding
                  session to start your outreach.
                </p>
              </motion.div>

              <div className="border-t border-gray-200 my-7" />

              {/* Intro paragraphs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="space-y-3 text-sm text-gray-700 leading-relaxed mb-7"
              >
                <p>
                  Your free trial comes with generous limits to help you experience{' '}
                  <a
                    href="https://360airo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline inline-flex items-center gap-0.5"
                  >
                    360Airo's <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  full potential. From cold email and LinkedIn outreach to inbox warmup and
                  AI-powered personalisation. Here's what you can test during the trial.
                </p>
                <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <strong className="text-gray-700">Note:</strong> Already used your trial and
                  want more time to explore? Reach out to our support team — we're happy to help
                  you extend access or set up a fresh test run.
                </p>
              </motion.div>

              {/* Numbered list */}
              <motion.ol
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } },
                  hidden: {},
                }}
                className="space-y-5 mb-10 list-none"
              >
                {TRIAL_ITEMS.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">{item.title}. </strong>
                      {item.body}
                    </p>
                  </motion.li>
                ))}
              </motion.ol>

              <div className="border-t border-gray-200 my-8" />

              {/* Plans */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Plans That Grow With You
                </h2>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  No hidden fees, no setup costs. Upgrade, downgrade, or cancel anytime.
                </p>

                {/* Pricing cards */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    {
                      name: 'Starter',
                      price: '$29',
                      desc: 'Freelancers & small teams',
                      features: ['Email warmup', '1 inbox', 'AI writing assistant', '500 contacts', '1 domain'],
                      highlight: false,
                    },
                    {
                      name: 'Growth',
                      price: '$79',
                      desc: 'Agencies & scaling teams',
                      features: ['Multiple domains', 'LinkedIn automation', 'Smart sequences', '5,000 contacts', 'Advanced analytics'],
                      highlight: true,
                    },
                    {
                      name: 'Pro',
                      price: '$199',
                      desc: 'Enterprises & large orgs',
                      features: ['Unlimited users', 'Advanced analytics', 'API integrations', 'Unlimited contacts', 'Dedicated support'],
                      highlight: false,
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`rounded-xl border p-5 text-sm relative ${
                        plan.highlight
                          ? 'border-blue-500 shadow-md ring-1 ring-blue-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {plan.highlight && (
                        <span className="absolute -top-2.5 left-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          MOST POPULAR
                        </span>
                      )}
                      <p className="font-bold text-gray-900">{plan.name}</p>
                      <p className="text-xs text-gray-400 mb-3">{plan.desc}</p>
                      <p className="text-2xl font-black text-gray-900 mb-4">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-400">/mo</span>
                      </p>
                      <ul className="space-y-1.5">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`mt-5 w-full py-2 rounded-lg text-xs font-semibold transition ${
                          plan.highlight
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>

                {/* Compare table */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Compare Plans Side by Side
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-5 py-3 font-semibold text-gray-700">Feature</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-700">Starter</th>
                        <th className="text-left px-5 py-3 font-semibold text-blue-700">Growth</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-700">Pro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Connected Domains', '1', '5', 'Unlimited'],
                        ['Daily Send Limits', '100', '1,000', '10,000+'],
                        ['Sequence Capacity', '3', '25', 'Unlimited'],
                        ['AI Automation Tools', 'Basic', 'Advanced', 'Enterprise'],
                        ['CRM Integrations', 'Limited', 'Full', 'Custom'],
                        ['Support Level', 'Standard', 'Priority', 'Dedicated'],
                      ].map(([feature, starter, growth, pro], i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                        >
                          <td className="px-5 py-3 font-medium text-gray-800">{feature}</td>
                          <td className="px-5 py-3 text-gray-500">{starter}</td>
                          <td className="px-5 py-3 text-blue-700 font-semibold">{growth}</td>
                          <td className="px-5 py-3 text-gray-500">{pro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Footer timestamp */}
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Updated 14 days ago</span>
              </div>

            </div>
          </main>

          {/* Ask AI — right panel */}
          <div className="hidden xl:flex flex-col pt-10 pr-8 w-36 flex-shrink-0">
            <AskAI />
          </div>

        </div>
      </div>
    </div>
  )
}