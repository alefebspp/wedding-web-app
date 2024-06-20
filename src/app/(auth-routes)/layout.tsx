import DashboardNavBar from "../../components/dashboard/DashboardNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <nav className="flex min-h-[100px] w-full items-center justify-start border-b border-slate-300 px-4">
        <DashboardNavBar />
      </nav>
      <main className="h-full w-full overflow-x-hidden text-slate-600">
        {children}
      </main>
    </div>
  );
}
