"use client";

import { useState } from "react";
import { currentMockState } from "@/lib/mock-data";
import { AlertTriangle, Send, Stethoscope, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SYMPTOM_CHIPS = [
  { label: "Vomiting", emoji: "🤢" },
  { label: "Diarrhea", emoji: "😣" },
  { label: "Lethargy", emoji: "😴" },
  { label: "Not Eating", emoji: "🍽️" },
  { label: "Coughing", emoji: "😮‍💨" },
  { label: "Sneezing", emoji: "🤧" },
  { label: "Limping", emoji: "🦵" },
  { label: "Scratching", emoji: "🐾" },
  { label: "Swelling", emoji: "🤕" },
  { label: "Eye Discharge", emoji: "👁️" },
];

const SEVERITY_CONFIG = {
  low: { bg: "bg-emerald-50", border: "border-emerald-300", title: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700", label: "Low Severity" },
  medium: { bg: "bg-amber-50", border: "border-amber-300", title: "text-amber-700", badge: "bg-amber-100 text-amber-700", label: "Medium Severity" },
  high: { bg: "bg-red-50", border: "border-red-400", title: "text-red-700", badge: "bg-red-100 text-red-700", label: "High Severity" },
};

export default function SymptomsPage() {
  const { subscription, pets, activePetId } = currentMockState;
  const isPro = subscription.plan === "pro";
  const activePet = pets.find(p => p.id === activePetId) || pets[0];

  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [freeText, setFreeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ severity: 'low' | 'medium' | 'high'; headline: string; advice: string; urgent: boolean } | null>(null);

  const toggleChip = (chip: string) => {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleAnalyze = () => {
    if (!isPro) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const isUrgent = selectedChips.includes("Vomiting") || selectedChips.includes("Not Eating") || selectedChips.includes("Swelling");
      const isMedium = selectedChips.includes("Diarrhea") || selectedChips.includes("Coughing");
      setResult({
        severity: isUrgent ? 'high' : isMedium ? 'medium' : 'low',
        headline: isUrgent ? "⚠️ Urgent Attention Needed" : isMedium ? "Monitor Closely" : "Looks Minor",
        advice: isUrgent
          ? "These symptoms can lead to rapid dehydration. Contact your vet or an emergency clinic immediately."
          : isMedium
          ? "Keep {name} comfortable and well-hydrated. Monitor for changes. If symptoms persist over 24 hours, visit the vet.".replace("{name}", activePet.name)
          : `${activePet.name}'s symptoms appear mild. Ensure they're resting well and drinking enough water. Check again tomorrow.`,
        urgent: isUrgent,
      });
      setLoading(false);
    }, 1600);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F7F6FB] pb-8">

      {/* ── Header ── */}
      <div className="px-5 pt-10 pb-4 bg-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900">AI Symptom Check</h1>
        </div>
        <p className="text-sm text-zinc-400 ml-1">Powered by Claude AI</p>
      </div>

      {/* ── Pet Profile Strip ── */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-sm flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
          <Image src={activePet.photo_url || ""} alt={activePet.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-zinc-900 text-lg leading-tight">{activePet.name}</p>
          <p className="text-xs text-zinc-400 capitalize">{activePet.breed} · {activePet.gender} · 4yr old</p>
        </div>
        <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-full">
          <PawPrint className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span className="text-xs font-bold text-emerald-700">Healthy</span>
        </div>
      </div>

      {/* ── Body ── */}
      {!isPro ? (
        <div className="mx-4 mt-4 bg-white rounded-3xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-extrabold text-xl text-zinc-900 mb-1">Pro Feature</h2>
          <p className="text-sm text-zinc-500 mb-5">Upgrade to unlock our AI-powered symptom analysis.</p>
          <a href="/upgrade" className="block bg-primary text-white font-bold py-3 rounded-2xl text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/30">
            Upgrade to Pro →
          </a>
        </div>
      ) : (
        <>
          {/* Symptom chips */}
          <div className="mx-4 mt-4 bg-white rounded-3xl p-5 shadow-sm">
            <p className="font-bold text-zinc-800 text-base mb-4">What's wrong with {activePet.name}?</p>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_CHIPS.map(({ label, emoji }) => (
                <button
                  key={label}
                  onClick={() => toggleChip(label)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all duration-150 active:scale-95",
                    selectedChips.includes(label)
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/30"
                      : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-primary/40"
                  )}
                >
                  <span className="text-base leading-none">{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Free-text input */}
          <div className="mx-4 mt-3 bg-white rounded-3xl p-4 shadow-sm flex gap-3">
            <input
              className="flex-1 bg-zinc-50 rounded-2xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none border border-zinc-200 focus:border-primary transition-colors"
              placeholder="Or describe other symptoms..."
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-md shadow-primary/30 flex-shrink-0 disabled:opacity-60 active:scale-95 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Analyze full button */}
          <div className="mx-4 mt-3">
            <button
              className="w-full bg-primary text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/30 text-base hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-60"
              onClick={handleAnalyze}
              disabled={loading || (selectedChips.length === 0 && !freeText)}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : "Analyze Symptoms"}
            </button>
          </div>

          {/* Result card */}
          {result && (() => {
            const cfg = SEVERITY_CONFIG[result.severity];
            return (
              <div className={`mx-4 mt-4 rounded-3xl p-5 border-2 ${cfg.bg} ${cfg.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-extrabold text-lg ${cfg.title}`}>{result.headline}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${cfg.badge}`}>{cfg.label}</span>
                </div>
                {result.urgent && (
                  <div className="flex items-center gap-2 mb-3 bg-red-100 rounded-xl px-3 py-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-red-700">Consult a vet immediately</span>
                  </div>
                )}
                <p className="text-sm text-zinc-700 leading-relaxed">{result.advice}</p>
                <p className="text-xs text-zinc-400 mt-4 italic">
                  * PawLog AI is for informational purposes only. Not a substitute for veterinary care.
                </p>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}
