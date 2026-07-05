"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, Syringe, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/log", label: "Log", icon: BookOpen },
  { href: "/symptoms", label: "Symptoms", icon: Stethoscope },
  { href: "/vaccines", label: "Vaccines", icon: Syringe },
  { href: "/upgrade", label: "Pro", icon: Sparkles },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full max-w-[390px] bg-white/90 backdrop-blur-xl border-t border-zinc-100">
      <ul className="flex items-center justify-around h-[68px] px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isUpgrade = item.href === "/upgrade";
          const Icon = item.icon;

          if (isUpgrade) {
            return (
              <li key={item.href} className="w-full flex justify-center">
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={cn(
                    "w-12 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                    isActive ? "bg-primary shadow-md shadow-primary/40" : "bg-gradient-to-r from-primary to-purple-400"
                  )}>
                    <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                  <span className={cn("text-[10px] font-bold", isActive ? "text-primary" : "text-purple-500")}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={item.href} className="w-full flex justify-center">
              <Link
                href={item.href}
                className="flex flex-col items-center gap-1 py-2"
              >
                <div className={cn(
                  "w-12 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                  isActive ? "bg-primary/15" : "bg-transparent"
                )}>
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-zinc-400"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-zinc-400"
                )}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
