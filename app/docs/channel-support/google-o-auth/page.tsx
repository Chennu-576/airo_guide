"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Mail,
  Copy, CheckCircle, ExternalLink, Shield, Users,
  ArrowRight, Key, Lock, AlertCircle, Info, Globe,
  Settings, PlusCircle, Search, CheckSquare, RefreshCw
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── Brand Colors ────────────────────────────────────────────────────────────
const brand = {
  primary: "#4931ed",
  secondary: "#a836ba",
  gradient: "linear-gradient(135deg, #4931ed, #a836ba)"
};

// ─── Table of Contents ───────────────────────────────────────────────────────
const TOC = [
  { id: "step1", label: "1. Go to Team Settings" },
  { id: "step2", label: "2. Add Email Account" },
  { id: "step3", label: "3. Copy Client ID" },
  { id: "step4", label: "4. Configure New App" },
  { id: "step5", label: "5. Enter Client ID" },
  { id: "step6", label: "6. Select All Users" },
  { id: "step7", label: "7. Review & Finish" },
  { id: "step8", label: "8. Connect via OAuth" }
];

// ─── Ask AI Component ────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-[#4931ed] hover:text-[#4931ed] bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }} transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask about Google Workspace setup…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#4931ed] focus:border-transparent"
              placeholder="e.g. What permissions are needed?" />
            <button className="mt-2 w-full py-1.5 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition"
              style={{ background: brand.gradient }}>Ask</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── TOC Panel ───────────────────────────────────────────────────────────────
function TableOfContents({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-56 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Table of Contents</span>
          </div>
          <nav className="py-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id
                    ? "text-[#4931ed] font-semibold bg-[#4931ed]/5 border-r-2 border-[#4931ed]"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// ─── Step Card Component ─────────────────────────────────────────────────────
function StepCard({ number, title, children, delay }: { number: string; title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-6 last:mb-0"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
            style={{ background: brand.gradient }}>
            {number}
          </div>
        </div>
        <div className="flex-1 pt-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
          <div className="prose prose-sm max-w-none text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function GoogleOAuthPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeToc, setActiveToc] = useState("step1");
  const [copied, setCopied] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const observers: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveToc(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isMounted]);

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation onToggleSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 w-full lg:ml-64 xl:ml-72 transition-all duration-300">
          <div className="flex">
            <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-14 py-10">
              <div className="max-w-4xl">

                {/* Breadcrumb */}
                <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                  <Link href="#" className="hover:text-[#4931ed] transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-[#4931ed] transition">Channel Support</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">Google Workspace OAuth</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-[#4931ed]/10">
                      <Mail className="w-4 h-4" style={{ color: brand.primary }} />
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      Google Workspace
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Connect Google Workspace via OAuth</h1>
                  <p className="mt-2 text-base text-gray-600 leading-relaxed max-w-2xl">
                    Step-by-step guide to connect your Google Workspace account using OAuth authentication 
                    for secure cold email campaigns in 360Airo.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* Intro */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  className="text-sm text-gray-700 leading-relaxed mb-8">
                  To connect with your Google account via OAuth, follow the steps below:
                </motion.p>

                {/* Steps Container */}
                <div className="space-y-8">
                  
                  {/* Step 1 */}
                  <section id="step1">
                    <StepCard number="01" title="Go to Team Settings" delay={0.12}>
                      <div className="space-y-3">
                        <p>Navigate to your team settings in 360Airo:</p>
                        
                        {/* UI Mockup */}
                        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white my-3">
                          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                            <Settings className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs font-medium text-gray-600">Settings</span>
                          </div>
                          <div className="p-3 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#4931ed]/10">
                              <Users className="w-4 h-4" style={{ color: brand.primary }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Team Settings</p>
                              <p className="text-xs text-gray-500">Settings → Team → Team Settings</p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-400 ml-auto" />
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                          <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-blue-700">You need admin permissions to access team settings.</p>
                        </div>
                      </div>
                    </StepCard>
                  </section>

                  {/* Step 2 */}
                  <section id="step2">
                    <StepCard number="02" title="Click add email account and select 'Google Workspace' → Sign in" delay={0.16}>
                      <div className="space-y-3">
                        <p>In the Email Accounts section, click "Add Email Account" and choose Google Workspace:</p>
                        
                        {/* UI Mockup */}
                        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white my-3">
                          <div className="grid grid-cols-2 divide-x divide-gray-200">
                            <div className="p-3">
                              <p className="text-xs font-medium text-gray-700 mb-2">Select Provider</p>
                              <div className="space-y-2">
                                {["Gmail", "Google Workspace", "Outlook", "SMTP"].map((item, i) => (
                                  <div key={i} className={`flex items-center gap-2 p-2 rounded-md text-xs ${
                                    item === "Google Workspace" ? "bg-[#4931ed]/5 border border-[#4931ed]/20" : "hover:bg-gray-50"
                                  }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                      item === "Google Workspace" ? "bg-[#4931ed]" : "bg-gray-300"
                                    }`} />
                                    <span className={item === "Google Workspace" ? "font-medium text-[#4931ed]" : "text-gray-600"}>
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="p-3 bg-gray-50 flex items-center justify-center">
                              <button className="px-4 py-1.5 text-xs text-white rounded-md" style={{ background: brand.gradient }}>
                                Sign in with Google
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </StepCard>
                  </section>

                  {/* Step 3 */}
                  <section id="step3">
                    <StepCard number="03" title="Copy the Client ID and go to Google Admin Console" delay={0.20}>
                      <div className="space-y-3">
                        <p>In the next screen, you'll see your Client ID. Copy it and open the Google Admin Console:</p>
                        
                        {/* Client ID Copy Mockup */}
                        <div className="rounded-lg border border-gray-200 p-3 bg-gray-50 my-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Your Client ID</p>
                              <code className="text-sm font-mono text-gray-800">1234567890-abc123def456.apps.googleusercontent.com</code>
                            </div>
                            <button 
                              onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded-md hover:border-[#4931ed] transition"
                            >
                              {copied ? (
                                <>
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  <span className="text-green-600">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <a href="#" className="inline-flex items-center gap-1 text-xs text-[#4931ed] hover:underline">
                          Open Google Admin Console <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </StepCard>
                  </section>

                  {/* Step 4 */}
                  <section id="step4">
                    <StepCard number="04" title="Click on Configure a new app" delay={0.24}>
                      <div className="space-y-3">
                        <p>In Google Admin Console, navigate to:</p>
                        <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600">
                          Apps → Web and mobile apps → Configure new app
                        </div>
                        
                        {/* Simple visual */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                          <Shield className="w-3.5 h-3.5 text-gray-400" />
                          <span>You need super admin privileges for this step</span>
                        </div>
                      </div>
                    </StepCard>
                  </section>

                  {/* Step 5 */}
                  <section id="step5">
                    <StepCard number="05" title="Enter the Client ID and click on the searched result" delay={0.28}>
                      <div className="space-y-3">
                        <p>Paste the Client ID you copied earlier and select the matching result:</p>
                        
                        <div className="rounded-lg border border-gray-200 p-3">
                          <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-white">
                            <Search className="w-3.5 h-3.5 text-gray-400" />
                            <input 
                              type="text" 
                              value="1234567890-abc123def456.apps.googleusercontent.com"
                              readOnly
                              className="flex-1 text-xs border-0 focus:ring-0 p-0"
                            />
                          </div>
                          
                          <div className="mt-2 p-2 bg-[#4931ed]/5 rounded-md border border-[#4931ed]/20">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs font-medium text-gray-900">SmartReach Web App</span>
                              <span className="text-[10px] text-gray-500 ml-auto">OAuth 2.0 Client</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </StepCard>
                  </section>

                  {/* Step 6 */}
                  <section id="step6">
                    <StepCard number="06" title="Select 'All users' and click continue to mark as trusted app" delay={0.32}>
                      <div className="space-y-3">
                        <p>Choose access level for the app:</p>
                        
                        <div className="space-y-2 my-3">
                          {[
                            { label: "All users", desc: "Everyone in your organization can access", recommended: true },
                            { label: "Selected organizational units", desc: "Restrict to specific teams" },
                            { label: "Disabled", desc: "No one can access" }
                          ].map((option, i) => (
                            <div key={i} className={`flex items-start gap-2 p-2 rounded-lg border ${
                              option.recommended ? "border-[#4931ed]/30 bg-[#4931ed]/5" : "border-gray-200"
                            }`}>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                option.recommended ? "border-[#4931ed]" : "border-gray-300"
                              }`}>
                                {option.recommended && <div className="w-2 h-2 rounded-full bg-[#4931ed]" />}
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">{option.label}</p>
                                <p className="text-[10px] text-gray-500">{option.desc}</p>
                                {option.recommended && (
                                  <span className="mt-1 inline-block px-1 py-0.5 bg-green-100 text-green-700 text-[8px] font-bold rounded">
                                    Recommended
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
                          <AlertCircle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-yellow-700">This marks 360Airo as a trusted application in your Google Workspace.</p>
                        </div>
                      </div>
                    </StepCard>
                  </section>

                  {/* Step 7 */}
                  <section id="step7">
                    <StepCard number="07" title="Review your changes and click finish" delay={0.36}>
                      <div className="space-y-3">
                        <p>Verify all settings and complete the configuration:</p>
                        
                        <div className="rounded-lg border border-gray-200 divide-y divide-gray-200 my-3">
                          <div className="flex justify-between p-2">
                            <span className="text-xs text-gray-600">Application</span>
                            <span className="text-xs font-medium text-gray-900">360Airo</span>
                          </div>
                          <div className="flex justify-between p-2">
                            <span className="text-xs text-gray-600">Client ID</span>
                            <span className="text-xs font-mono text-gray-900">1234...googleusercontent.com</span>
                          </div>
                          <div className="flex justify-between p-2">
                            <span className="text-xs text-gray-600">Access</span>
                            <span className="text-xs font-medium text-green-600">All users</span>
                          </div>
                          <div className="flex justify-between p-2">
                            <span className="text-xs text-gray-600">Status</span>
                            <span className="text-xs font-medium text-[#4931ed]">Trusted app</span>
                          </div>
                        </div>
                        
                        <button className="px-4 py-1.5 text-xs text-white rounded-md" style={{ background: brand.gradient }}>
                          Finish
                        </button>
                      </div>
                    </StepCard>
                  </section>

                  {/* Step 8 */}
                  <section id="step8">
                    <StepCard number="08" title="Come back to 360Airo and connect your email via OAuth" delay={0.40}>
                      <div className="space-y-3">
                        <p>Return to 360Airo and complete the connection:</p>
                        
                        <div className="rounded-lg border border-gray-200 p-4 bg-gradient-to-r from-[#4931ed]/5 to-[#a836ba]/5 my-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white">
                              <RefreshCw className="w-4 h-4" style={{ color: brand.primary }} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">Ready to connect</p>
                              <p className="text-xs text-gray-600">Your Google Workspace is now configured</p>
                            </div>
                            <button className="px-4 py-1.5 text-xs text-white rounded-md" style={{ background: brand.gradient }}>
                              Connect Email
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-green-700">
                            <strong>Success!</strong> Your email account will now appear in the connected accounts list.
                          </p>
                        </div>
                      </div>
                    </StepCard>
                  </section>

                </div>

                {/* Helpful Tips */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 }}
                  className="mt-10 p-4 rounded-xl border border-gray-200 bg-gray-50"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                    <Info className="w-4 h-4" style={{ color: brand.primary }} />
                    Helpful Tips
                  </h3>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      <span>Ensure you're signed in with a super admin account in Google Admin Console</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      <span>It may take up to 24 hours for Google to propagate changes across all users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      <span>If you encounter errors, verify that OAuth consent screen is properly configured</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Footer timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 7 months ago</span>
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