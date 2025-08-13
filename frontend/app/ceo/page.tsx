'use client';

import { useContext } from 'react';
import { AuthContext } from '../auth-context';

export default function CeoPage() {
  const { user } = useContext(AuthContext);
  if (!user) return <p className="p-4">Login required</p>;
  if (user.role !== 'ceo') return <p className="p-4">Access denied</p>;
  return <p className="p-4">CEO content visible only to CEO.</p>;
}
