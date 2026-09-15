import { AppShell } from "@/components/layout/AppShell";
import { AuthGuard } from "@/src/lib/auth/guards/AuthGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
