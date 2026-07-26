'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LearnPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/journey');
  }, [router]);

  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
      Redirecting to Learning Journey...
    </div>
  );
}
