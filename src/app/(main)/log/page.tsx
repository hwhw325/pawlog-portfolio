"use client";

import { useState } from "react";
import { currentMockState } from "@/lib/mock-data";
import { HealthLog } from "@/lib/types";
import {
  Scale, Drumstick, Droplets, FileText,
  ChevronRight, CheckCircle2, PlusCircle, Pencil
} from "lucide-react";

export default function LogPage() {
  // 초기 로그를 state로 관리 → 새 항목 추가 가능
  const [logs, setLogs] = useState<HealthLog[]>(currentMockState.logs);

  // 입력 필드 state
  const [weight, setWeight] = useState("");
  const [meals, setMeals] = useState("");
  const [water, setWater] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSave = () => {
    if (!weight && !meals && !water) return; // 아무것도 입력 안 했으면 무시

    const newLog: HealthLog = {
      id: `log_${Date.now()}`,
      pet_id: currentMockState.activePetId,
      date: today,
      weight_kg: weight ? parseFloat(weight) : null,
      meal_amount_grams: meals ? parseInt(meals) : null,
      water_ml: water ? parseInt(water) : null,
      symptoms: [],
      activity_notes: notes || null,
      created_at: new Date().toISOString(),
    };

    // 오늘 날짜 항목이 이미 있으면 맨 앞에 추가 (중복 허용 — 데모용)
    setLogs(prev => [newLog, ...prev]);

    // 입력 초기화
    setWeight("");
    setMeals("");
    setWater("");
    setNotes("");

    // 저장 완료 피드백
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F7F6FB] pb-24">

      {/* ── Header ── */}
      <div className="px-5 pt-10 pb-4 bg-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900">Health Log</h1>
        </div>
        <p className="text-sm text-zinc-400 ml-1">Track Max's daily health</p>
      </div>

      {/* ── Add Log Form ── */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-zinc-900 text-base">Record Today</h2>
          <span className="text-xs text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-full font-medium">
            {new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
          </span>
        </div>

        <div className="space-y-3">
          {/* Weight & Meals */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                <Scale className="w-3.5 h-3.5 text-blue-500" /> Weight
              </label>
              <div className="flex items-center bg-[#EFF6FF] rounded-2xl px-4 py-3">
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="32.5"
                  className="flex-1 bg-transparent text-blue-900 font-bold text-sm outline-none placeholder:text-blue-300 w-0"
                />
                <span className="text-blue-400 text-xs font-semibold ml-1">kg</span>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                <Drumstick className="w-3.5 h-3.5 text-emerald-500" /> Meals
              </label>
              <div className="flex items-center bg-[#F0FDF4] rounded-2xl px-4 py-3">
                <input
                  type="number"
                  value={meals}
                  onChange={e => setMeals(e.target.value)}
                  placeholder="500"
                  className="flex-1 bg-transparent text-emerald-900 font-bold text-sm outline-none placeholder:text-emerald-300 w-0"
                />
                <span className="text-emerald-400 text-xs font-semibold ml-1">g</span>
              </div>
            </div>
          </div>

          {/* Water */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-500" /> Water Intake
            </label>
            <div className="flex items-center bg-[#E0F7FA] rounded-2xl px-4 py-3">
              <input
                type="number"
                value={water}
                onChange={e => setWater(e.target.value)}
                placeholder="1200"
                className="flex-1 bg-transparent text-cyan-900 font-bold text-sm outline-none placeholder:text-cyan-300"
              />
              <span className="text-cyan-400 text-xs font-semibold ml-1">ml</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide block mb-1.5">
              Activity & Notes
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="How was their day? Any observations..."
              rows={2}
              className="w-full bg-zinc-50 rounded-2xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none border border-zinc-200 focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!weight && !meals && !water}
            className="w-full py-4 rounded-2xl font-extrabold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: saved ? "#10b981" : "#534AB7",
              color: "white",
              boxShadow: saved
                ? "0 4px 14px rgba(16,185,129,0.35)"
                : "0 4px 14px rgba(83,74,183,0.35)",
            }}
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Saved! ✓
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" /> Save Today's Log
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── History List ── */}
      <div className="flex items-center justify-between px-5 mt-7 mb-3">
        <h3 className="text-xl font-extrabold text-zinc-900">Recent History</h3>
        <span className="text-xs text-zinc-400 font-medium bg-zinc-100 px-2.5 py-1 rounded-full">
          {logs.length} records
        </span>
      </div>

      <div className="px-4 space-y-3">
        {logs.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-zinc-400 text-sm">
            No logs yet. Add your first record above!
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-3xl p-4 shadow-sm transition-all"
              style={log.id.startsWith("log_") && !log.id.includes("mock")
                ? { borderLeft: "4px solid #534AB7" }  // 새로 추가된 항목 강조
                : {}}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-zinc-900 text-sm">{log.date}</span>
                  {log.id.startsWith("log_") && !log.id.includes("mock") && (
                    <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">New</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {log.symptoms.length > 0 && (
                    <span className="text-[11px] bg-orange-100 text-orange-600 font-bold px-2.5 py-1 rounded-full">
                      ⚠️ {log.symptoms.length} symptom
                    </span>
                  )}
                  <button 
                    onClick={() => alert("포트폴리오 데모: 기록 수정 기능은 실제 서비스에서 지원됩니다.")}
                    className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-primary transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#EFF6FF] rounded-2xl p-2.5 text-center">
                  <p className="text-[10px] text-blue-400 font-semibold">Weight</p>
                  <p className="text-sm font-extrabold text-blue-900">
                    {log.weight_kg ?? "—"}
                    {log.weight_kg && <span className="text-[10px] font-normal ml-0.5">kg</span>}
                  </p>
                </div>
                <div className="bg-[#F0FDF4] rounded-2xl p-2.5 text-center">
                  <p className="text-[10px] text-emerald-400 font-semibold">Meals</p>
                  <p className="text-sm font-extrabold text-emerald-900">
                    {log.meal_amount_grams ?? "—"}
                    {log.meal_amount_grams && <span className="text-[10px] font-normal ml-0.5">g</span>}
                  </p>
                </div>
                <div className="bg-[#E0F7FA] rounded-2xl p-2.5 text-center">
                  <p className="text-[10px] text-cyan-400 font-semibold">Water</p>
                  <p className="text-sm font-extrabold text-cyan-900">
                    {log.water_ml ?? "—"}
                    {log.water_ml && <span className="text-[10px] font-normal ml-0.5">ml</span>}
                  </p>
                </div>
              </div>

              {log.activity_notes && (
                <p className="text-xs text-zinc-400 italic mt-2.5 truncate">
                  "{log.activity_notes}"
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
