"use client";

import { currentMockState } from "@/lib/mock-data";
import { FileText, Download, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

// Simple sparkline SVG
function WeightChart() {
  const points = [
    [0, 38], [14, 34], [28, 36], [42, 31], [56, 30], [70, 33], [84, 30], [100, 32]
  ];
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const area = path + ` L 100 50 L 0 50 Z`;

  return (
    <div className="w-full h-32 relative mt-2">
      <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#534AB7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#534AB7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#areaGrad)" />
        <path d={path} fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#534AB7" />
        ))}
      </svg>
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-1 pointer-events-none">
        <span className="text-[9px] text-zinc-400">34 kg</span>
        <span className="text-[9px] text-zinc-400">32 kg</span>
        <span className="text-[9px] text-zinc-400">30 kg</span>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const { subscription, activePetId, pets } = currentMockState;
  const isPro = subscription.plan === "pro";
  const activePet = pets.find(p => p.id === activePetId) || pets[0];

  return (
    <div className="flex flex-col min-h-full bg-[#F7F6FB] pb-24">

      {/* ── Header ── */}
      <div className="px-5 pt-10 pb-4 bg-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900">AI Report</h1>
        </div>
        <p className="text-sm text-zinc-400 ml-1">Weekly health summary for {activePet.name}</p>
      </div>

      {!isPro ? (
        <div className="mx-4 mt-4 bg-white rounded-3xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-extrabold text-xl text-zinc-900 mb-1">Pro Feature</h2>
          <p className="text-sm text-zinc-500 mb-5">Upgrade to receive weekly AI-generated health reports.</p>
          <Link href="/upgrade" className="block bg-primary text-white font-bold py-3 rounded-2xl text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/30">
            Upgrade to Pro →
          </Link>
        </div>
      ) : (
        <>
          {/* ── Week Label + Download ── */}
          <div className="mx-4 mt-4 bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-primary/10 to-purple-100 px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-primary font-bold uppercase tracking-wider">Weekly Summary</p>
                <p className="text-zinc-900 font-extrabold text-base mt-0.5">Apr 17 – Apr 23, 2026</p>
              </div>
              <button className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary hover:bg-primary hover:text-white transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* ── Weight Chart ── */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-bold text-zinc-800 text-sm">Weight Trend</span>
                <span className="ml-auto text-xs text-emerald-600 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">↓ Stable</span>
              </div>
              <WeightChart />
              <div className="flex justify-between mt-1">
                {["Apr 17", "Apr 19", "Apr 21", "Apr 23"].map(d => (
                  <span key={d} className="text-[9px] text-zinc-400">{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── AI Analysis ── */}
          <div className="mx-4 mt-3 bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-violet-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <span className="font-bold text-zinc-800">AI Analysis</span>
              <span className="ml-auto text-[10px] text-violet-600 font-semibold bg-violet-50 px-2 py-0.5 rounded-full">Claude AI</span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 rounded-2xl p-4">
              <span className="font-bold text-zinc-800">{activePet.name}</span> maintained a stable weight of around{" "}
              <span className="font-bold text-blue-600">32.5 kg</span> this week. Water intake was slightly lower than average on Tuesday, but has normalized. One minor symptom{" "}
              <span className="font-semibold text-orange-600">"lethargy"</span> was recorded on Thursday following intense playtime, which appears to be normal recovery.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-emerald-50 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-emerald-500 font-semibold">Overall</p>
                <p className="font-extrabold text-emerald-700 text-sm mt-0.5">Excellent 🎉</p>
              </div>
              <div className="flex-1 bg-blue-50 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-blue-400 font-semibold">Avg Weight</p>
                <p className="font-extrabold text-blue-800 text-sm mt-0.5">32.5 kg</p>
              </div>
              <div className="flex-1 bg-orange-50 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-orange-400 font-semibold">Symptoms</p>
                <p className="font-extrabold text-orange-800 text-sm mt-0.5">1 noted</p>
              </div>
            </div>
          </div>

          {/* ── PDF Notice ── */}
          <div className="mx-4 mt-3 border border-dashed border-zinc-300 rounded-3xl p-4 flex items-center gap-3">
            <Download className="w-5 h-5 text-zinc-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-zinc-700">Download PDF Report</p>
              <p className="text-xs text-zinc-400">Share with your veterinarian</p>
            </div>
            <button className="ml-auto bg-zinc-900 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-zinc-700 transition-colors flex-shrink-0">
              Export
            </button>
          </div>
        </>
      )}
    </div>
  );
}
