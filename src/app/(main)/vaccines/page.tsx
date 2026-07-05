"use client";

import { useState } from "react";
import { currentMockState } from "@/lib/mock-data";
import { Syringe, CalendarPlus, CheckCircle, Clock, AlertTriangle, Pencil, X, CheckCircle2 } from "lucide-react";

const STATUS_MAP = {
  upToDate: {
    borderColor: "border-l-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />,
    label: "Up to date",
    dot: "bg-emerald-500",
  },
  dueSoon: {
    borderColor: "border-l-orange-500",
    badge: "bg-orange-100 text-orange-700",
    icon: <Clock className="w-3.5 h-3.5 text-orange-600" />,
    label: "Due soon",
    dot: "bg-orange-500",
  },
  overdue: {
    borderColor: "border-l-red-500",
    badge: "bg-red-100 text-red-700",
    icon: <AlertTriangle className="w-3.5 h-3.5 text-red-600" />,
    label: "Overdue",
    dot: "bg-red-500",
  },
};

function getStatus(dueDate: string | null) {
  if (!dueDate) return STATUS_MAP.upToDate;
  const due = new Date(dueDate).getTime();
  const now = new Date().getTime();
  const days = (due - now) / (1000 * 60 * 60 * 24);
  if (days < 0) return STATUS_MAP.overdue;
  if (days <= 30) return STATUS_MAP.dueSoon;
  return STATUS_MAP.upToDate;
}

export default function VaccinesPage() {
  const { subscription, vaccines: initialVaccines } = currentMockState;
  const isPro = subscription.plan === "pro";

  // 상태 관리 (백엔드 연동 전까지 프론트엔드 메모리에서 유지)
  const [vaccines, setVaccines] = useState(initialVaccines);
  const [showForm, setShowForm] = useState(false);
  
  // 폼 입력 상태
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [dateAdministered, setDateAdministered] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");

  const upToDateCount = vaccines.filter(v => getStatus(v.next_due_date).label === "Up to date").length;

  const nextDue = [...vaccines]
    .filter(v => v.next_due_date)
    .sort((a, b) => new Date(a.next_due_date!).getTime() - new Date(b.next_due_date!).getTime())[0];

  const daysUntilNext = nextDue?.next_due_date
    ? Math.max(0, Math.ceil((new Date(nextDue.next_due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  const handleAddSubmit = () => {
    if (!name || !dateAdministered) return;

    const newVaccine = {
      id: `vac_${Date.now()}`,
      pet_id: currentMockState.activePetId,
      name,
      provider: provider || "Unknown Clinic",
      date_administered: dateAdministered,
      next_due_date: nextDueDate || null,
      notes: null,
      created_at: new Date().toISOString()
    };

    setVaccines(prev => [newVaccine, ...prev]); // 최신 항목을 위로
    
    // 폼 리셋 및 닫기
    setName("");
    setProvider("");
    setDateAdministered("");
    setNextDueDate("");
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    // 팁: 포트폴리오용이므로 단순히 동작 느낌만 주려면 프롬프트 활용 가능
    const newName = window.prompt("수정할 백신 이름을 입력하세요:", vaccines.find(v => v.id === id)?.name);
    if (newName) {
      setVaccines(prev => prev.map(v => v.id === id ? { ...v, name: newName } : v));
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F7F6FB] pb-24">

      {/* ── Header ── */}
      <div className="px-5 pt-10 pb-4 bg-white">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Syringe className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900">Vaccines</h1>
        </div>
        <p className="text-sm text-zinc-400 ml-1">Track and manage your pet's vaccinations</p>
      </div>

      {/* ── Summary Strip ── */}
      {isPro && (
        <div className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-sm flex gap-3">
          {[
            { label: "Total", value: vaccines.length, color: "text-primary" },
            { label: "Up to date", value: upToDateCount, color: "text-emerald-600" },
            { label: "Needs attention", value: vaccines.length - upToDateCount, color: "text-orange-600" },
          ].map(item => (
            <div key={item.label} className="flex-1 text-center">
              <p className={`text-2xl font-extrabold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Countdown Banner ── */}
      {isPro && daysUntilNext !== null && (
        <div className="mx-4 mt-3 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-purple-400 px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-white/75 text-xs font-semibold uppercase tracking-wide">Next Vaccination</p>
              <p className="text-white font-extrabold text-base mt-0.5">{nextDue?.name}</p>
            </div>
            <div className="text-center bg-white/20 backdrop-blur px-4 py-2 rounded-2xl">
              <p className="text-white text-2xl font-extrabold">D-{daysUntilNext}</p>
              <p className="text-white/75 text-xs">days left</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      {!isPro ? (
        <div className="mx-4 mt-4 bg-white rounded-3xl p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Syringe className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-extrabold text-xl text-zinc-900 mb-1">Pro Feature</h2>
          <p className="text-sm text-zinc-500 mb-5">Upgrade to track vaccinations and get timely reminders.</p>
          <a href="/upgrade" className="block bg-primary text-white font-bold py-3 rounded-2xl text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/30">
            Upgrade to Pro →
          </a>
        </div>
      ) : (
        <div className="px-4 mt-4 space-y-3">

          {/* Add new button OR Form */}
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="w-full bg-white border-2 border-dashed border-zinc-300 rounded-3xl p-4 flex items-center justify-center gap-2 text-zinc-500 font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all active:scale-[0.98]"
            >
              <CalendarPlus className="w-5 h-5" />
              Add Vaccine Record
            </button>
          ) : (
            <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-zinc-900">New Vaccine</h3>
                <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={name} onChange={e => setName(e.target.value)}
                  placeholder="Vaccine Name (e.g. Rabies)" 
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-semibold outline-none border border-transparent focus:border-primary"
                />
                <input 
                  type="text" 
                  value={provider} onChange={e => setProvider(e.target.value)}
                  placeholder="Clinic Name (Optional)" 
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-semibold outline-none border border-transparent focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1 mb-1 block">Administered</label>
                    <input 
                      type="date" 
                      value={dateAdministered} onChange={e => setDateAdministered(e.target.value)}
                      className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-semibold outline-none text-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase ml-1 mb-1 block">Next Due</label>
                    <input 
                      type="date" 
                      value={nextDueDate} onChange={e => setNextDueDate(e.target.value)}
                      className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-semibold outline-none text-zinc-700"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleAddSubmit}
                  disabled={!name || !dateAdministered}
                  className="w-full mt-2 bg-primary text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save Record
                </button>
              </div>
            </div>
          )}

          {/* Vaccine cards */}
          {vaccines.map((vaccine) => {
            const status = getStatus(vaccine.next_due_date);
            return (
              <div
                key={vaccine.id}
                className={`bg-white rounded-3xl p-5 shadow-sm border-l-4 ${status.borderColor} overflow-hidden transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-zinc-900 text-lg leading-tight">{vaccine.name}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{vaccine.provider || 'Unknown provider'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.badge}`}>
                      {status.icon}
                      {status.label}
                    </div>
                    <button 
                      onClick={() => handleEdit(vaccine.id)}
                      className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-primary transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-50 rounded-2xl p-3">
                    <p className="text-xs text-zinc-400 mb-1">Administered</p>
                    <p className="text-sm font-bold text-zinc-800">{vaccine.date_administered}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-3">
                    <p className="text-xs text-zinc-400 mb-1">Next Due</p>
                    <p className={`text-sm font-bold ${status.label === "Overdue" ? "text-red-600" : status.label === "Due soon" ? "text-orange-600" : "text-zinc-800"}`}>
                      {vaccine.next_due_date || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
