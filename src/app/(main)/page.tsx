import { currentMockState } from "@/lib/mock-data";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Scale, Drumstick, Droplets, AlertCircle, Clock, Heart, Zap } from "lucide-react";

export default function Home() {
  const { pets, activePetId, logs } = currentMockState;
  const activePet = pets.find((p) => p.id === activePetId) || pets[0];
  const latestLog = logs && logs.length > 0 ? logs[0] : null;
  const recentLogs = logs.slice(0, 5);

  return (
    <div className="flex flex-col min-h-full bg-[#F7F6FB]">

      {/* ── Top Header ── */}
      <div className="flex items-center justify-between px-5 pt-10 pb-3 bg-white">
        <div>
          <p className="text-sm text-zinc-400 font-medium">Good afternoon 👋</p>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">PawLog</h1>
        </div>
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
          M
        </div>
      </div>

      {/* ── Pet Hero Card ── */}
      <div className="mx-4 mt-3 rounded-3xl overflow-hidden shadow-xl relative" style={{ height: 220 }}>
        <Image
          src={activePet.photo_url || ""}
          alt={activePet.name}
          fill
          className="object-cover"
          priority
        />
        {/* Multi-stop gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span className="text-white text-xs font-semibold">Healthy</span>
          </div>
        </div>

        {/* Pet info + Log button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div>
            <h2 className="text-white text-3xl font-extrabold tracking-tight drop-shadow-md">{activePet.name}</h2>
            <p className="text-white/75 text-sm capitalize font-medium">{activePet.breed} · {activePet.gender} · 4yr</p>
          </div>
          <Link href="/log">
            <button className="flex items-center gap-1.5 bg-white text-primary text-sm font-bold px-4 py-2.5 rounded-2xl shadow-lg hover:bg-primary hover:text-white transition-all duration-200 active:scale-95">
              <PlusCircle className="w-4 h-4" />
              Add Log
            </button>
          </Link>
        </div>
      </div>

      {/* ── Today's Summary Header ── */}
      <div className="flex items-center justify-between px-5 mt-7 mb-3">
        <h3 className="text-xl font-extrabold text-zinc-900">Today's Summary</h3>
        <span className="text-xs text-primary font-semibold">View all</span>
      </div>

      {/* ── Stat Cards ── */}
      {latestLog ? (
        <div className="px-4 grid grid-cols-2 gap-3">

          {/* Weight - Pastel Blue */}
          <div className="rounded-3xl p-4 shadow-sm flex flex-col gap-3" style={{ backgroundColor: '#EFF6FF' }}>
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wide">Weight</p>
              <p className="text-blue-900 text-2xl font-extrabold">{latestLog.weight_kg}<span className="text-sm font-medium ml-1">kg</span></p>
            </div>
          </div>

          {/* Meals - Pastel Green */}
          <div className="rounded-3xl p-4 shadow-sm flex flex-col gap-3" style={{ backgroundColor: '#F0FDF4' }}>
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Drumstick className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Meals</p>
              <p className="text-emerald-900 text-2xl font-extrabold">{latestLog.meal_amount_grams}<span className="text-sm font-medium ml-1">g</span></p>
            </div>
          </div>

          {/* Water - Pastel Cyan */}
          <div className="rounded-3xl p-4 shadow-sm flex flex-col gap-3" style={{ backgroundColor: '#E0F7FA' }}>
            <div className="w-10 h-10 bg-cyan-100 rounded-2xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-cyan-500 text-xs font-semibold uppercase tracking-wide">Water</p>
              <p className="text-cyan-900 text-2xl font-extrabold">{latestLog.water_ml}<span className="text-sm font-medium ml-1">ml</span></p>
            </div>
          </div>

          {/* Symptoms - Pastel Orange */}
          <div className="rounded-3xl p-4 shadow-sm flex flex-col gap-3" style={{ backgroundColor: latestLog.symptoms.length > 0 ? '#FFF7ED' : '#F5F3FF' }}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${latestLog.symptoms.length > 0 ? 'bg-orange-100' : 'bg-violet-100'}`}>
              {latestLog.symptoms.length > 0
                ? <AlertCircle className="w-5 h-5 text-orange-600" />
                : <Zap className="w-5 h-5 text-violet-600" />
              }
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wide ${latestLog.symptoms.length > 0 ? 'text-orange-400' : 'text-violet-400'}`}>Symptoms</p>
              <p className={`text-2xl font-extrabold ${latestLog.symptoms.length > 0 ? 'text-orange-900' : 'text-violet-900'}`}>
                {latestLog.symptoms.length > 0 ? `${latestLog.symptoms.length} noted` : 'None 🎉'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-4 bg-white rounded-3xl p-8 shadow-sm text-center">
          <p className="text-zinc-400 mb-4">No records today yet.</p>
          <Link href="/log">
            <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
              Add First Log
            </button>
          </Link>
        </div>
      )}

      {/* ── Recent Activity Feed ── */}
      <div className="flex items-center justify-between px-5 mt-8 mb-3">
        <h3 className="text-xl font-extrabold text-zinc-900">Recent Activity</h3>
        <Link href="/log">
          <span className="text-xs text-primary font-semibold">See all</span>
        </Link>
      </div>

      <div className="px-4 space-y-3 pb-24">
        {recentLogs.map((log, idx) => (
          <div key={log.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            {/* Timeline dot */}
            <div className="relative flex flex-col items-center">
              <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              {idx < recentLogs.length - 1 && (
                <div className="w-0.5 h-4 bg-zinc-100 mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-bold text-zinc-800">{log.date}</span>
                {log.symptoms.length > 0 && (
                  <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">
                    {log.symptoms.length} symptom
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 truncate">
                {log.weight_kg}kg · {log.meal_amount_grams}g food · {log.water_ml}ml water
              </p>
              {log.activity_notes && (
                <p className="text-xs text-zinc-400 italic truncate mt-0.5">"{log.activity_notes}"</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
