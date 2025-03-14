
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from './auth-provider';
import { Skeleton } from "@/components/ui/skeleton";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      console.log('Redirecting to login due to no user');
      setLocation('/login');
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="w-[350px] h-[200px]" />
      </div>
    );
  }

  return user ? children : null;
}
