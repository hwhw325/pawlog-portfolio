import { BottomNav } from "@/components/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-50 relative pb-16">
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
