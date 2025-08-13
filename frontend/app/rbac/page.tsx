'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth-context';

export default function RbacPage() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<{ username: string; role: string }[]>([]);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:3000/rbac/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, [user]);

  if (!user) return <p className="p-4">Login required</p>;
  if (user.role !== 'admin') return <p className="p-4">Access denied</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">RBAC Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.username}>
            {u.username} - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
