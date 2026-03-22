import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-background">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
