import { useEffect, useState } from 'react';
import { Users, Image, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  pendingReports: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data.data);
      } catch {
        setError('Failed to load dashboard stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Users',
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Total Posts',
      value: stats?.totalPosts ?? 0,
      icon: Image,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Pending Reports',
      value: stats?.pendingReports ?? 0,
      icon: ShieldAlert,
      color: 'text-accent',
      bg: 'bg-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-lg border border-gray-200 flex items-center space-x-4"
            >
              {loading ? (
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-14 h-14 rounded-full animate-pulse bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 animate-pulse bg-gray-200 rounded" />
                    <div className="h-7 w-16 animate-pulse bg-gray-200 rounded" />
                  </div>
                </div>
              ) : (
                <>
                  <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-400 text-sm">Activity feed will be displayed here.</p>
      </div>
    </div>
  );
};
