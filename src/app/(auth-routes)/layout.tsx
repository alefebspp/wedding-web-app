import DashboardNavBar from "../../components/dashboard/DashboardNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <DashboardNavBar />
      <main className="h-full w-full overflow-x-hidden text-slate-600">
        {children}
      </main>
    </div>
  );
}
