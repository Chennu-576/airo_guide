"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChevronDown, ChevronRight, Clock, BookOpen, Linkedin,
  CheckCircle2, AlertCircle, Info, Star, Settings, User,
  Mail, MessageSquare, Users, Plus, ArrowRight, Eye, EyeOff,
  Send, RefreshCw, Activity, Shield, Timer, X, ChevronLeft,
  BarChart2, TrendingUp, Target, Zap, Brain, Bell, Calendar,
  UserCheck, UserX, Clock3, CheckCheck,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/help-center/Navigation";
import { Sidebar } from "@/components/help-center/Sidebar";

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "what-is-linkedin-automation", label: "What is LinkedIn Automation" },
  { id: "step1-account",               label: "Step 1 — Account" },
  { id: "step2-list",                  label: "Step 2 — Select List" },
  { id: "step3-approach",              label: "Step 3 — Approach" },
  { id: "step4-message",               label: "Step 4 — Message" },
  { id: "step5-send",                  label: "Step 5 — Send & Track" },
  { id: "follow-up",                   label: "Auto follow-up email" },
  { id: "best-practices",              label: "Best practices" },
];

// ─── Ask AI ───────────────────────────────────────────────────────────────────
function AskAI() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:border-blue-400 hover:text-blue-600 bg-white shadow-sm transition-colors">
        <Bot className="w-3.5 h-3.5" /> Ask AI
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0,y:-6,scale:0.97 }} animate={{ opacity:1,y:0,scale:1 }}
            exit={{ opacity:0,y:-6,scale:0.97 }} transition={{ duration:0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <p className="text-xs text-gray-500 mb-2">Ask anything about 360Airo…</p>
            <input autoFocus className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. How do I connect my LinkedIn account?" />
            <button className="mt-2 w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">Ask</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── TOC Panel ────────────────────────────────────────────────────────────────
function TableOfContents({ active }: { active: string }) {
  return (
    <div className="hidden xl:block w-56 flex-shrink-0 pt-10 pr-4">
      <div className="sticky top-24 space-y-4">
        <AskAI />
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">On this page</span>
          </div>
          <nav className="py-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior:"smooth" }); }}
                className={`block px-4 py-1.5 text-xs leading-snug transition-all ${
                  active === item.id
                    ? "text-blue-600 font-semibold bg-blue-50 border-r-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// ─── Screen Frame ─────────────────────────────────────────────────────────────
function ScreenFrame({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {url && <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-500 font-mono truncate">🔒 {url}</div>}
      </div>
      {children}
    </div>
  );
}

// ─── Step Progress Bar (matches screenshots exactly) ─────────────────────────
type StepStatus = "done" | "active" | "pending";
interface Step { label: string; status: StepStatus; }

function StepBar({ steps, onStep }: { steps: Step[]; onStep?: (i: number) => void }) {
  return (
    <div className="flex items-center gap-0 flex-wrap py-4 px-6 border-b border-gray-100 bg-white">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center">
          <button onClick={() => onStep?.(i)}
            className="flex items-center gap-2 group cursor-pointer">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
              s.status === "done"   ? "bg-emerald-500 text-white"
              : s.status === "active" ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
            }`}>
              {s.status === "done" ? <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={2.5} /> : i + 1}
            </div>
            <span className={`text-sm font-medium transition-colors hidden sm:block ${
              s.status === "active" ? "text-gray-900" : s.status === "done" ? "text-gray-600" : "text-gray-400"
            }`}>{s.label}</span>
          </button>
          {i < steps.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-300 mx-2 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── FULL 5-STEP WIZARD MOCKUP ────────────────────────────────────────────────
function LinkedInWizardMockup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string|null>("lucybrown032@gmail.com");
  const [selectedList, setSelectedList]       = useState<string|null>("madhu");
  const [approach, setApproach]   = useState<"connection"|"message">("connection");
  const [connNote, setConnNote]   = useState("Hi {{first_name}}, I came across your profile and thought it would be great to connect. I work with B2B teams to automate outreach — would love to stay in touch!");
  const [msgText, setMsgText]     = useState("Hi {{first_name}}, thanks for connecting! I wanted to reach out because I think 360Airo could genuinely help your team. Would you be open to a quick 15-min call this week?");
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);

  const STEPS: Step[] = [
    { label:"Account",  status: currentStep === 0 ? "active" : currentStep > 0 ? "done" : "pending" },
    { label:"List",     status: currentStep === 1 ? "active" : currentStep > 1 ? "done" : "pending" },
    { label:"Approach", status: currentStep === 2 ? "active" : currentStep > 2 ? "done" : "pending" },
    { label:"Message",  status: currentStep === 3 ? "active" : currentStep > 3 ? "done" : "pending" },
    { label:"Send",     status: currentStep === 4 ? "active" : "pending" },
  ];

  const LISTS = [
    { name:"madhu",   contacts:0 },
    { name:"demo",    contacts:0 },
    { name:"bhuvana", contacts:0 },
    { name:"Kamala",  contacts:0 },
  ];

  const handleLaunch = () => {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  return (
    <ScreenFrame url="app.360airo.com/linkedin-outreach/new">
      {/* Page header */}
      <div className="bg-white px-6 pt-5 pb-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Linkedin className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">LinkedIn Outreach</h3>
            <p className="text-xs text-gray-400">Send personalized connection requests to your contacts</p>
          </div>
        </div>
        <StepBar steps={STEPS} onStep={setCurrentStep} />
      </div>

      {/* Step content */}
      <div className="bg-[#f7f8fb] min-h-[360px] p-6 relative">
        <AnimatePresence mode="wait">

          {/* ── Step 1: Account ── */}
          {currentStep === 0 && (
            <motion.div key="step1" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.2 }}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-2xl">
                <h4 className="text-base font-black text-gray-900 mb-4">Select LinkedIn Account</h4>

                {selectedAccount ? (
                  <div className="space-y-3 mb-4">
                    <div className="border-2 border-blue-400 bg-blue-50/30 rounded-xl px-5 py-4 cursor-pointer">
                      <p className="text-sm font-bold text-gray-900">{selectedAccount}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Account ID: li_xxxxxxxxxxxxxxxx</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-xs text-amber-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> No connected LinkedIn accounts found.
                  </div>
                )}

                <button onClick={() => setShowConnectModal(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-blue-400 text-blue-600 text-sm font-bold rounded-xl px-4 py-3 hover:bg-blue-50 transition">
                  <Linkedin className="w-4 h-4" /> Connect New LinkedIn Account
                </button>
              </div>

              {selectedAccount && (
                <div className="flex justify-end mt-5">
                  <button onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow">
                    Next: Select List <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Step 2: List ── */}
          {currentStep === 1 && (
            <motion.div key="step2" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.2 }}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-2xl">
                <h4 className="text-base font-black text-gray-900 mb-4">Select Email List</h4>
                <div className="space-y-3 mb-2">
                  {LISTS.map(list => (
                    <button key={list.name} onClick={() => setSelectedList(list.name)}
                      className={`w-full text-left border-2 rounded-xl px-5 py-4 transition-all ${
                        selectedList === list.name
                          ? "border-blue-500 bg-blue-50/40"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}>
                      <p className="text-sm font-bold text-gray-900">{list.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{list.contacts} contacts</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <button onClick={() => setCurrentStep(0)}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setCurrentStep(2)} disabled={!selectedList}
                  className="flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition shadow">
                  Next: Approach <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Approach ── */}
          {currentStep === 2 && (
            <motion.div key="step3" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.2 }}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-2xl">
                <h4 className="text-base font-black text-gray-900 mb-1">Choose Approach</h4>
                <p className="text-xs text-gray-400 mb-4">Select how you want to initiate contact with your prospects</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <button onClick={() => setApproach("connection")}
                    className={`text-left border-2 rounded-xl p-4 transition-all ${approach==="connection"?"border-blue-500 bg-blue-50/30":"border-gray-200 hover:border-gray-300"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${approach==="connection"?"bg-blue-100":"bg-gray-100"}`}>
                        <UserCheck className={`w-4 h-4 ${approach==="connection"?"text-blue-600":"text-gray-500"}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${approach==="connection"?"text-blue-700":"text-gray-800"}`}>Send Connection Request</p>
                        {approach==="connection" && <CheckCircle2 className="w-4 h-4 text-blue-500 float-right -mt-5" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">Send a connection request with an optional personalised note. Once accepted, follow-up messages are sent automatically.</p>
                  </button>
                  <button onClick={() => setApproach("message")}
                    className={`text-left border-2 rounded-xl p-4 transition-all ${approach==="message"?"border-blue-500 bg-blue-50/30":"border-gray-200 hover:border-gray-300"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${approach==="message"?"bg-blue-100":"bg-gray-100"}`}>
                        <MessageSquare className={`w-4 h-4 ${approach==="message"?"text-blue-600":"text-gray-500"}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${approach==="message"?"text-blue-700":"text-gray-800"}`}>Send Direct Message</p>
                        {approach==="message" && <CheckCircle2 className="w-4 h-4 text-blue-500 float-right -mt-5" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">Send a direct message to existing 1st-degree connections. Best for prospects already in your network.</p>
                  </button>
                </div>

                {/* Approach explanation card */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700 leading-relaxed">
                  {approach === "connection"
                    ? <><strong>Connection flow:</strong> 360Airo sends a connection request → tracks acceptance → waits the delay you set → then sends the follow-up message automatically once accepted.</>
                    : <><strong>Direct message flow:</strong> 360Airo sends a direct LinkedIn message to existing 1st-degree connections. No connection request step is needed.</>
                  }
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <button onClick={() => setCurrentStep(1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow">
                  Next: Message <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Message ── */}
          {currentStep === 3 && (
            <motion.div key="step4" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.2 }}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-2xl">
                <h4 className="text-base font-black text-gray-900 mb-1">Compose Messages</h4>
                <p className="text-xs text-gray-400 mb-4">Use merge tags like <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">{"{{first_name}}"}</code> to personalise at scale</p>

                {approach === "connection" && (
                  <div className="mb-4">
                    <label className="text-xs font-bold text-gray-600 block mb-1.5">
                      Connection Request Note <span className="font-normal text-gray-400">(optional — max 300 chars)</span>
                    </label>
                    <textarea value={connNote} onChange={e => setConnNote(e.target.value)} rows={3}
                      className="w-full text-xs border-2 border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-300 resize-none leading-relaxed text-gray-700 transition" />
                    <div className="flex justify-between mt-1">
                      <p className="text-[9px] text-gray-400">Sent with the connection request</p>
                      <p className={`text-[9px] ${connNote.length > 290 ? "text-red-500" : "text-gray-400"}`}>{connNote.length}/300</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">
                    {approach === "connection" ? "Follow-up Message" : "Direct Message"}
                    <span className="font-normal text-gray-400 ml-1">(sent after connection accepted)</span>
                  </label>
                  <textarea value={msgText} onChange={e => setMsgText(e.target.value)} rows={4}
                    className="w-full text-xs border-2 border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-300 resize-none leading-relaxed text-gray-700 transition" />
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex gap-2 flex-wrap">
                      {["{{first_name}}","{{last_name}}","{{company}}","{{title}}"].map(tag => (
                        <button key={tag} onClick={() => setMsgText(p => p + " " + tag)}
                          className="text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded-full hover:bg-blue-100 transition">
                          {tag}
                        </button>
                      ))}
                    </div>
                    <p className="text-[9px] text-gray-400">{msgText.length} chars</p>
                  </div>
                </div>

                {/* Follow-up email section */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <p className="text-xs font-bold text-gray-700">Auto Follow-up Email</p>
                    <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">After 3 days</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-[10px] text-amber-700 leading-relaxed">
                    <p className="font-bold mb-0.5">If no reply after 3 days:</p>
                    360Airo automatically sends a follow-up email to the prospect's email address (if available in your list) using your connected email sender account.
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <button onClick={() => setCurrentStep(2)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow">
                  Review & Send <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 5: Send ── */}
          {currentStep === 4 && (
            <motion.div key="step5" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.2 }}>
              {sent ? (
                <motion.div initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }} className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <CheckCheck className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-1">Campaign Launched!</h3>
                  <p className="text-sm text-gray-400 max-w-xs">Your LinkedIn Outreach campaign is running. 360Airo will send connection requests and track responses automatically.</p>
                  <button onClick={() => { setSent(false); setCurrentStep(0); }}
                    className="mt-5 text-xs font-bold text-blue-600 hover:underline">Start new campaign</button>
                </motion.div>
              ) : (
                <div className="max-w-2xl">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
                    <h4 className="text-base font-black text-gray-900 mb-4">Campaign Summary</h4>
                    <div className="space-y-3">
                      {[
                        { label:"LinkedIn account", value: selectedAccount ?? "—", icon:Linkedin,    color:"text-blue-600"   },
                        { label:"Prospect list",    value: selectedList ?? "—",    icon:Users,       color:"text-violet-600" },
                        { label:"Approach",         value: approach === "connection" ? "Send Connection Request" : "Send Direct Message", icon:UserCheck, color:"text-emerald-600" },
                        { label:"Follow-up email",  value: "Auto-sent after 3 days if no reply",    icon:Mail,    color:"text-amber-600" },
                      ].map((row,i) => {
                        const Icon = row.icon;
                        return (
                          <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${i%2===0?"bg-gray-50":"bg-white border border-gray-100"}`}>
                            <Icon className={`w-4 h-4 ${row.color} flex-shrink-0`} />
                            <span className="text-xs text-gray-500 w-32 flex-shrink-0">{row.label}</span>
                            <span className="text-xs font-semibold text-gray-800 truncate">{row.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700 mb-4">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>360Airo will send connection requests gradually to stay within LinkedIn's daily limits. Accepted connections trigger the follow-up message automatically.</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={() => setCurrentStep(3)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={handleLaunch}
                      className={`flex items-center gap-2 text-white text-sm font-bold px-8 py-2.5 rounded-xl transition shadow ${sending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                      {sending
                        ? <><RefreshCw className="w-4 h-4 animate-spin" /> Launching…</>
                        : <><Send className="w-4 h-4" /> Launch Campaign</>
                      }
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Connect LinkedIn Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center z-40 rounded-2xl"
            onClick={e => { if (e.target === e.currentTarget) setShowConnectModal(false); }}>
            <motion.div initial={{ opacity:0,y:16,scale:0.96 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:16,scale:0.96 }}
              className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-sm mx-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900">Connect LinkedIn</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Add your LinkedIn credentials to start account connection.</p>
                </div>
                <button onClick={() => setShowConnectModal(false)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition flex-shrink-0">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                    placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full text-sm border border-blue-400 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition pr-10"
                      placeholder="Enter LinkedIn password" />
                    <button onClick={() => setShowPw(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowConnectModal(false)}
                  className="flex-1 border border-gray-200 text-sm font-bold text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition">Cancel</button>
                <button onClick={() => {
                  if (email) { setSelectedAccount(email); setShowConnectModal(false); }
                }}
                  className="flex-1 bg-blue-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-blue-700 transition shadow">Continue</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenFrame>
  );
}

// ─── MOCKUP 2: Connection Tracking Dashboard ──────────────────────────────────
function TrackingDashboardMockup() {
  const PROSPECTS = [
    { name:"Sarah Mitchell",  company:"AcmeCorp",    status:"Accepted",  sent:"1 day ago",  followup:"Sent",    avatar:"SM", color:"bg-emerald-600" },
    { name:"James Harrington",company:"TechSphere",  status:"Pending",   sent:"1 day ago",  followup:"Waiting", avatar:"JH", color:"bg-blue-600"    },
    { name:"Priya Nair",      company:"Globex",      status:"Accepted",  sent:"2 days ago", followup:"Pending", avatar:"PN", color:"bg-violet-600"  },
    { name:"Michael Torres",  company:"Vertex",      status:"Pending",   sent:"3 days ago", followup:"Due",     avatar:"MT", color:"bg-amber-500"   },
    { name:"Aisha Kumar",     company:"NovaTech",    status:"Declined",  sent:"4 days ago", followup:"Skipped", avatar:"AK", color:"bg-red-500"     },
  ];

  const statusBadge = (s: string) => ({
    Accepted: "bg-emerald-100 text-emerald-700",
    Pending:  "bg-blue-100 text-blue-700",
    Declined: "bg-red-100 text-red-700",
  }[s] ?? "bg-gray-100 text-gray-600");

  const followupBadge = (s: string) => ({
    Sent:    "bg-emerald-100 text-emerald-700",
    Waiting: "bg-gray-100 text-gray-500",
    Pending: "bg-amber-100 text-amber-700",
    Due:     "bg-orange-100 text-orange-700",
    Skipped: "bg-gray-100 text-gray-400",
  }[s] ?? "bg-gray-100 text-gray-500");

  return (
    <ScreenFrame url="app.360airo.com/linkedin-outreach/campaign/track">
      <div className="bg-white">
        {/* Stats row */}
        <div className="grid grid-cols-4 border-b border-gray-100">
          {[
            { label:"Requests Sent",  val:"48", icon:Send,      color:"text-blue-600",    bg:"bg-blue-50"    },
            { label:"Accepted",       val:"24", icon:UserCheck, color:"text-emerald-600", bg:"bg-emerald-50" },
            { label:"Pending",        val:"18", icon:Clock3,    color:"text-amber-600",   bg:"bg-amber-50"   },
            { label:"Follow-ups Sent",val:"12", icon:Mail,      color:"text-violet-600",  bg:"bg-violet-50"  },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="px-4 py-3 border-r border-gray-100 last:border-r-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-6 h-6 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-3 h-3 ${s.color}`} />
                  </div>
                  <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider leading-tight hidden sm:block">{s.label}</p>
                </div>
                <p className="text-xl font-black text-gray-900">{s.val}</p>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-2.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-wider">Prospect</th>
                <th className="px-4 py-2.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-wider hidden sm:table-cell">Sent</th>
                <th className="px-4 py-2.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-wider">Follow-up Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PROSPECTS.map((p, i) => (
                <motion.tr key={p.name} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.05 }}
                  className="hover:bg-gray-50/60 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full ${p.color} flex items-center justify-center text-white text-[9px] font-black flex-shrink-0`}>{p.avatar}</div>
                      <div>
                        <p className="font-bold text-gray-900 leading-tight">{p.name}</p>
                        <p className="text-[9px] text-gray-400">{p.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{p.sent}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${statusBadge(p.status)}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${followupBadge(p.followup)}`}>{p.followup}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── MOCKUP 3: Follow-up timeline ─────────────────────────────────────────────
function FollowUpTimelineMockup() {
  return (
    <ScreenFrame url="app.360airo.com/linkedin-outreach — sequence timeline">
      <div className="bg-gray-50 px-6 py-5">
        <p className="text-xs font-black text-gray-700 uppercase tracking-wider mb-4">Outreach Sequence Timeline</p>
        <div className="space-y-0">
          {[
            {
              day:"Day 0", icon:Send, color:"bg-blue-600", line:"bg-blue-200",
              title:"Connection Request Sent",
              desc:"LinkedIn connection request sent with personalised note. 360Airo begins tracking acceptance status.",
              badge:"Automated",
              badgeColor:"bg-blue-100 text-blue-700",
            },
            {
              day:"Day 1–7", icon:Clock3, color:"bg-amber-500", line:"bg-amber-200",
              title:"Tracking Acceptance",
              desc:"360Airo monitors whether the prospect accepts, declines, or ignores the connection request. Acceptance triggers the next step immediately.",
              badge:"Monitoring",
              badgeColor:"bg-amber-100 text-amber-700",
            },
            {
              day:"On Accept", icon:MessageSquare, color:"bg-emerald-600", line:"bg-emerald-200",
              title:"LinkedIn Message Sent",
              desc:"Once the prospect accepts the connection, 360Airo automatically sends your follow-up LinkedIn message.",
              badge:"Triggered",
              badgeColor:"bg-emerald-100 text-emerald-700",
            },
            {
              day:"Day 3", icon:Mail, color:"bg-violet-600", line:"bg-violet-200",
              title:"Auto Follow-up Email",
              desc:"If no reply received after 3 days, 360Airo sends a follow-up email to the prospect's email address using your connected sender account.",
              badge:"3 days no reply",
              badgeColor:"bg-violet-100 text-violet-700",
            },
            {
              day:"Day 7", icon:Bell, color:"bg-pink-600", line:null,
              title:"Task Created",
              desc:"If still no reply after 7 days, a manual follow-up task is created in your 360Airo task list for personal outreach.",
              badge:"If no reply",
              badgeColor:"bg-pink-100 text-pink-700",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {item.line && <div className={`w-0.5 h-8 ${item.line} mt-1`} />}
                </div>
                <div className="pb-6 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                    <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{item.day}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScreenFrame>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LinkedInAutomationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted]         = useState(false);
  const [activeToc, setActiveToc]         = useState("what-is-linkedin-automation");

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    if (!isMounted) return;
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveToc(id); }, { rootMargin:"-20% 0px -70% 0px" });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
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
              <div className="max-w-3xl">

                {/* Breadcrumb */}
                <motion.nav initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }}
                  className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                  <Link href="#" className="hover:text-blue-600 transition">Docs</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="#" className="hover:text-blue-600 transition">LinkedIn Outreach</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-gray-700 font-medium">LinkedIn Automation</span>
                </motion.nav>

                {/* Title */}
                <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">LinkedIn Automation</h1>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    360Airo's LinkedIn Automation lets you send personalised connection requests, track acceptance,
                    auto-send follow-up messages, and trigger email follow-ups — all from a 5-step guided wizard
                    with zero manual effort after launch.
                  </p>
                </motion.div>

                <div className="border-t border-gray-200 my-7" />

                {/* ── What is LinkedIn Automation ── */}
                <motion.div id="what-is-linkedin-automation" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-8">
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    LinkedIn Automation in 360Airo sends connection requests to your prospects directly from your
                    connected LinkedIn account, tracks whether they accept or ignore, and then automatically sends
                    your follow-up message once they accept. If the prospect doesn't reply within 3 days, a
                    follow-up email is sent automatically via your connected email sender.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 mb-5">
                    {[
                      { icon:UserCheck, bg:"bg-blue-50",   color:"text-blue-600",   border:"border-blue-200",   title:"Automated connections",   desc:"Sends connection requests gradually from your own LinkedIn account — staying within daily limits to avoid restrictions" },
                      { icon:Activity,  bg:"bg-emerald-50",color:"text-emerald-600",border:"border-emerald-200",title:"Acceptance tracking",      desc:"Monitors every request in real time — accepted connections immediately trigger the next step in your sequence" },
                      { icon:Mail,      bg:"bg-amber-50",  color:"text-amber-600",  border:"border-amber-200",  title:"Auto email follow-up",    desc:"If no reply after 3 days, 360Airo sends a follow-up email via your connected sender — no manual action needed" },
                    ].map((card,i) => {
                      const Icon = card.icon;
                      return (
                        <motion.div key={card.title} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1+i*0.07 }}
                          className={`rounded-xl border ${card.border} ${card.bg} p-4`}>
                          <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                          <p className={`text-sm font-bold ${card.color} mb-1`}>{card.title}</p>
                          <p className="text-xs text-gray-600 leading-snug">{card.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      LinkedIn Automation is a fully automated mode — once you launch, 360Airo handles everything.
                      For manual control over each step, see <strong>LinkedIn Semi-Automation (Co-pilot)</strong>.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Full wizard ── */}
                <motion.div id="step1-account" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.12 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">The 5-step LinkedIn Outreach wizard</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    The entire wizard below is fully interactive. Click each step number in the progress bar to jump to it,
                    fill in the fields, and click <strong>Launch Campaign</strong> at the end. The
                    <strong> Connect LinkedIn</strong> modal opens when you click "Connect New LinkedIn Account".
                  </p>
                  <div className="mb-5 relative"><LinkedInWizardMockup /></div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 1 explained ── */}
                <motion.div id="step1-account" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.13 }} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Step 1 — Connect your LinkedIn account</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Click <strong>Connect New LinkedIn Account</strong> to open the Connect LinkedIn modal. Enter
                    your LinkedIn email and password — 360Airo connects directly from your account, so requests
                    appear to come from you personally. Once connected, the account card appears and you can
                    proceed to Step 2.
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      ["Email field",    "Enter the email address you use to log into LinkedIn"],
                      ["Password field", "Enter your LinkedIn password — shown/hidden with the eye icon toggle"],
                      ["Continue",       "Initiates the connection — 360Airo verifies and stores the credentials securely"],
                      ["Multiple accounts","You can connect multiple LinkedIn accounts and select a different one per campaign"],
                    ].map(([label,desc],i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 list-none">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        <span><strong className="text-gray-900">{label}</strong> — {desc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>Use a LinkedIn account in good standing with a complete profile. Accounts with recent restrictions or very new accounts (&lt; 3 months) may face lower acceptance rates.</span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 2 ── */}
                <motion.div id="step2-list" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.14 }} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Step 2 — Select Email List</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Select which prospect list to use for this campaign. Lists are created in <strong>Email Lists</strong>
                    (sidebar). Each list card shows the list name and contact count. The selected list highlights with
                    a blue border — click another to switch.
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">What makes a good prospect list for LinkedIn Automation</p></div>
                    {[
                      ["LinkedIn profile URLs", "Prospects should have a LinkedIn URL in your list — 360Airo uses this to find and send requests"],
                      ["Email addresses",       "Required for the auto follow-up email step — prospects without an email skip that step"],
                      ["First name",            "Used in personalised message merge tags like {{first_name}} — improves reply rates significantly"],
                      ["Company name",          "Optional but recommended for the connection note and follow-up message context"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[160px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 3 ── */}
                <motion.div id="step3-approach" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15 }} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Step 3 — Choose Approach</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Two approaches are available depending on your relationship with the prospects in your list.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {[
                      {
                        title:"Send Connection Request",
                        icon:UserCheck, color:"text-blue-700", bg:"bg-blue-50", border:"border-blue-200",
                        best:"New prospects not yet in your network",
                        points:[
                          "Sends a connection request with optional personalised note (max 300 chars)",
                          "360Airo tracks whether each prospect accepts, declines, or ignores",
                          "Acceptance automatically triggers the follow-up LinkedIn message",
                          "If no reply after 3 days, follow-up email is sent automatically",
                        ],
                      },
                      {
                        title:"Send Direct Message",
                        icon:MessageSquare, color:"text-violet-700", bg:"bg-violet-50", border:"border-violet-200",
                        best:"Existing 1st-degree connections already in your network",
                        points:[
                          "Sends a direct LinkedIn message without a connection step",
                          "Only works for 1st-degree connections — non-connections are skipped",
                          "Follow-up email is still sent automatically after 3 days of no reply",
                          "Best for warming up warm leads or re-engaging existing connections",
                        ],
                      },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} initial={{ opacity:0,y:6 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.15+i*0.07 }}
                          className={`rounded-xl border-2 ${item.border} ${item.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-5 h-5 ${item.color}`} />
                            <p className={`text-sm font-bold ${item.color}`}>{item.title}</p>
                          </div>
                          <p className="text-[10px] font-semibold text-gray-500 mb-2">Best for: {item.best}</p>
                          <div className="space-y-1.5">
                            {item.points.map((p,j) => (
                              <div key={j} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {p}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 4 ── */}
                <motion.div id="step4-message" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Step 4 — Compose your messages</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Write the connection note and follow-up message. Use merge tags to personalise every message
                    automatically — 360Airo substitutes these with the prospect's real data at send time.
                  </p>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">Available merge tags</p></div>
                    {[
                      ["{{first_name}}","Prospect's first name — most important personalisation signal"],
                      ["{{last_name}}", "Prospect's last name"],
                      ["{{company}}",   "Prospect's company name from your list"],
                      ["{{title}}",     "Prospect's job title"],
                      ["{{city}}",      "Prospect's city (if available in your list)"],
                    ].map(([tag,desc],i) => (
                      <div key={tag} className={`grid grid-cols-[130px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <code className="text-blue-600 font-bold font-mono">{tag}</code>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700 mb-4">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                    <span>
                      <strong>Pro tip:</strong> Keep connection notes under 200 characters for best acceptance rates.
                      Lead with the prospect's company or role — "I saw your work at {"{{company}}"}" outperforms
                      generic openers by 2× in acceptance rate.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Step 5 ── */}
                <motion.div id="step5-send" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.17 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Step 5 — Send & track</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    Review your campaign summary and click <strong>Launch Campaign</strong>. 360Airo begins sending
                    connection requests and you can track every prospect's status in real time. The mockup below
                    shows the tracking dashboard.
                  </p>
                  <div className="mb-5"><TrackingDashboardMockup /></div>
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">Tracking columns explained</p></div>
                    {[
                      ["Requests Sent",   "Total connection requests sent so far in this campaign"],
                      ["Accepted",        "Prospects who accepted your connection request — follow-up message sent automatically to each"],
                      ["Pending",         "Requests sent but not yet accepted or declined — 360Airo checks these daily"],
                      ["Follow-ups Sent", "Auto follow-up emails sent after 3 days of no reply"],
                      ["Status — Accepted","Connection was accepted; follow-up message triggered"],
                      ["Status — Pending", "Request sent, awaiting response from prospect"],
                      ["Status — Declined","Prospect declined the connection request — no further action taken"],
                      ["Follow-up — Due",  "3 days have passed since acceptance with no reply — email will send in next batch"],
                    ].map(([label,desc],i) => (
                      <div key={label} className={`grid grid-cols-[170px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{label}</span>
                        <span className="text-gray-700">{desc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Follow-up email ── */}
                <motion.div id="follow-up" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.19 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Auto follow-up email after 3 days</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    The sequence timeline below shows every automated step 360Airo takes from the moment you
                    launch to the final follow-up task creation.
                  </p>
                  <div className="mb-5"><FollowUpTimelineMockup /></div>
                  <div className="flex items-start gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-xs text-violet-700 mb-4">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      The follow-up email is sent via your connected <strong>Email Account</strong> in 360Airo —
                      not through LinkedIn. Make sure you have an active email sender account connected before
                      launching a LinkedIn Automation campaign that uses the follow-up email step.
                    </span>
                  </div>
                </motion.div>

                <div className="border-t border-gray-200 my-8" />

                {/* ── Best practices ── */}
                <motion.div id="best-practices" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22 }} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Best practices</h2>
                  <div className="space-y-3 mb-5">
                    {[
                      { icon:Shield,    color:"bg-blue-600",   title:"Stay within LinkedIn's daily limits",           desc:"360Airo sends requests gradually to stay under LinkedIn's limits (typically 20–30/day for newer accounts, up to 100/day for established accounts). Never try to override these — account restrictions are hard to reverse." },
                      { icon:UserCheck, color:"bg-emerald-600",title:"Keep your connection note under 200 characters",  desc:"Shorter, personalised notes get higher acceptance rates than long pitches. Lead with something specific to the prospect — their company, role, or a mutual connection. The note is NOT the sales pitch — that comes after acceptance." },
                      { icon:Brain,     color:"bg-violet-600", title:"Use merge tags in every message",                desc:"{{first_name}} alone increases reply rates noticeably. Adding {{company}} makes it feel 1:1 even at scale. Avoid sending generic 'Hi there' messages — they get ignored and LinkedIn may flag the account." },
                      { icon:Mail,      color:"bg-amber-500",  title:"Ensure your list has email addresses",           desc:"The auto follow-up email step requires a valid email in your prospect list. If emails are missing, that step is skipped silently. Use LeadFinder to enrich your list with emails before running LinkedIn Automation." },
                      { icon:Calendar,  color:"bg-pink-600",   title:"Don't run LinkedIn Automation 7 days a week",    desc:"Schedule your campaign to run on weekdays only. LinkedIn activity patterns are human — weekend automation looks robotic and increases the risk of account restrictions." },
                      { icon:BarChart2, color:"bg-teal-600",   title:"Monitor acceptance rate weekly",                 desc:"A healthy acceptance rate is 30–50%. Below 20% suggests your connection note needs work or your target audience is too cold. Pause the campaign, rewrite the note, and relaunch." },
                    ].map((item,i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={i} initial={{ opacity:0,x:-10 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.22+i*0.06 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition">
                          <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-5">
                    <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200"><p className="text-xs font-bold text-gray-700">LinkedIn Automation — quick reference</p></div>
                    {[
                      ["Where to find it",       "Sidebar → LinkedIn Campaign → LinkedIn Outreach → New Campaign"],
                      ["Steps",                  "5 steps: Account → List → Approach → Message → Send"],
                      ["Connection note limit",  "300 characters maximum; recommended under 200"],
                      ["Follow-up trigger",      "Automatically sent 3 days after acceptance with no reply"],
                      ["Follow-up channel",      "Email (via your connected email sender account)"],
                      ["Daily limit",            "Set by LinkedIn based on account age and standing (20–100/day)"],
                      ["Tracking",               "Real-time: Accepted / Pending / Declined per prospect"],
                      ["Task created",           "If no reply after 7 days, a manual follow-up task is created"],
                      ["Approach options",       "Send Connection Request (new contacts) or Direct Message (1st-degree)"],
                    ].map(([field,val],i) => (
                      <div key={field} className={`grid grid-cols-[180px_1fr] px-4 py-2.5 border-b border-gray-100 last:border-0 text-xs ${i%2===0?"bg-white":"bg-gray-50/50"}`}>
                        <span className="text-gray-500 font-semibold">{field}</span>
                        <span className="text-gray-700">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
                    <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>
                      <strong>Pro tip:</strong> The highest-performing LinkedIn Automation sequences combine a
                      personalised connection note → follow-up LinkedIn message → follow-up email within the first
                      5 days. Three touches across two channels is the sweet spot — it's enough to be memorable
                      without being intrusive.
                    </span>
                  </div>
                </motion.div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Updated 14 days ago</span>
                </div>

              </div>
            </main>
            <TableOfContents active={activeToc} />
          </div>
        </div>
      </div>
    </div>
  );
}