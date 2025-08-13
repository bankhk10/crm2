'use client';

import { useContext } from 'react';
import { AuthContext } from '../auth-context';

export default function AdminPage() {
  const { user } = useContext(AuthContext);
  if (!user) return <p className="p-4">Login required</p>;
  if (user.role !== 'admin') return <p className="p-4">Access denied</p>;
  return <p className="p-4">Admin content visible only to admin.</p>;
}
