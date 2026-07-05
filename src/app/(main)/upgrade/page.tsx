"use client";

import { useState } from "react";
import {
  Check, ShieldCheck, Stethoscope, Syringe,
  FileText, Settings, Infinity, Sparkles, Crown,
  X, PawPrint
} from "lucide-react";

const PRO_FEATURES = [
  { icon: <Infinity className="w-5 h-5" />, text: "Up to 5 pets (1 in Free)", color: "text-blue-600 bg-blue-100" },
  { icon: <FileText className="w-5 h-5" />, text: "Unlimited health history logs", color: "text-emerald-600 bg-emerald-100" },
  { icon: <Stethoscope className="w-5 h-5" />, text: "AI Symptom Checker (Claude AI)", color: "text-violet-600 bg-violet-100" },
  { icon: <Syringe className="w-5 h-5" />, text: "Vaccination Tracker & Reminders", color: "text-orange-600 bg-orange-100" },
  { icon: <FileText className="w-5 h-5" />, text: "Weekly AI Health Reports + PDF", color: "text-pink-600 bg-pink-100" },
  { icon: <Settings className="w-5 h-5" />, text: "Priority customer support", color: "text-zinc-600 bg-zinc-100" },
];

function PortfolioModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ maxWidth: 390, margin: "0 auto" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full bg-white rounded-t-[2rem] px-6 pt-6 pb-10 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mb-6" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-zinc-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <PawPrint className="w-8 h-8 text-primary fill-primary/20" />
        </div>

        <h2 className="text-xl font-extrabold text-zinc-900 text-center mb-1">
          포트폴리오 데모입니다 🎨
        </h2>
        <p className="text-sm text-zinc-500 text-center leading-relaxed mb-6">
          이 앱은 실제 결제 기능이 없는 <br />
          <span className="font-semibold text-zinc-700">포트폴리오 시연용 프로토타입</span>입니다.
          <br />실제 서비스 출시를 원하신다면 연락해 주세요!
        </p>

        {/* Tech Stack */}
        <div className="bg-zinc-50 rounded-2xl p-4 mb-5 space-y-2">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Target Architecture (목표 아키텍처)</p>
          {[
            { label: "Framework", value: "Next.js 16 (App Router)" },
            { label: "Styling", value: "Tailwind CSS + shadcn/ui" },
            { label: "Database", value: "Supabase (PostgreSQL)" },
            { label: "Payments", value: "Stripe Subscriptions" },
            { label: "AI", value: "Claude claude-sonnet-4-20250514 (Anthropic)" },
            { label: "Deploy", value: "Vercel + PWA" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">{label}</span>
              <span className="text-xs font-bold text-zinc-700">{value}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl text-sm hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/30"
          >
            계속 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UpgradePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-[#F7F6FB] pb-8 relative">

      {/* Portfolio Modal */}
      {showModal && <PortfolioModal onClose={() => setShowModal(false)} />}

      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#6B5BD6] to-[#9B59B6]" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute top-16 right-4 w-20 h-20 bg-white/5 rounded-full" />

        <div className="relative px-5 pt-14 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full mb-5">
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-white text-xs font-bold tracking-wider uppercase">7-Day Free Trial</span>
          </div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl">
            <Crown className="w-10 h-10 text-yellow-300 fill-yellow-200" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Go Pro, Do More</h1>
          <p className="text-white/75 text-sm leading-relaxed max-w-[280px] mx-auto">
            Give your furry friend the complete health care they deserve.
          </p>
        </div>
      </div>

      {/* ── Billing Toggle ── */}
      <div className="mx-4 -mt-5 z-10 relative">
        <div className="bg-white rounded-2xl p-1.5 flex shadow-lg">
          <button
            onClick={() => setBilling("monthly")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
              billing === "monthly" ? "bg-primary text-white shadow-md" : "text-zinc-500"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              billing === "annual" ? "bg-primary text-white shadow-md" : "text-zinc-500"
            }`}
          >
            Annual
            <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${billing === "annual" ? "bg-yellow-400 text-yellow-900" : "bg-zinc-100 text-zinc-600"}`}>
              -33%
            </span>
          </button>
        </div>
      </div>

      {/* ── Price Display ── */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-end gap-2 mb-1">
          <span className="text-5xl font-extrabold text-zinc-900">
            {billing === "annual" ? "$39.99" : "$4.99"}
          </span>
          <span className="text-zinc-400 text-sm pb-2">
            {billing === "annual" ? "/year" : "/month"}
          </span>
        </div>
        {billing === "annual" && (
          <p className="text-sm text-emerald-600 font-semibold">
            💰 Save $19.89 compared to monthly!
          </p>
        )}
        <p className="text-xs text-zinc-400 mt-1">Cancel anytime. No hidden fees.</p>
      </div>

      {/* ── Feature List ── */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-5 shadow-sm">
        <h2 className="font-extrabold text-zinc-900 text-lg mb-4">Everything Included</h2>
        <div className="space-y-3">
          {PRO_FEATURES.map((feat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${feat.color}`}>
                {feat.icon}
              </div>
              <span className="text-sm font-semibold text-zinc-800 flex-1">{feat.text}</span>
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="mx-4 mt-5 space-y-3">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-primary text-white font-extrabold py-4 rounded-3xl text-lg shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          Start Free Trial
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-white text-zinc-400 font-medium py-3 rounded-2xl text-sm hover:text-zinc-600 transition-colors"
        >
          Maybe later
        </button>
        <div className="flex items-center justify-center gap-1.5 text-zinc-400">
          <ShieldCheck className="w-4 h-4" />
          <p className="text-xs">Secure checkout via Stripe · No charge for 7 days</p>
        </div>
      </div>

      {/* ── Free Tier Comparison ── */}
      <div className="mx-4 mt-5 mb-24 border border-zinc-200 rounded-3xl p-5 opacity-60">
        <h3 className="font-bold text-zinc-500 text-sm mb-3">PawLog Free (Current)</h3>
        <ul className="space-y-2 text-xs text-zinc-500">
          {["1 pet only", "30-day log history", "No AI features", "No vaccine tracker"].map(t => (
            <li key={t} className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400">✕</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
