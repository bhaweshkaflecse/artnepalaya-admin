import React from 'react';
import { Users, Image, ShieldAlert } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { label: 'Total Users', value: '4,209', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Artworks', value: '12,845', icon: Image, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Reports', value: '34', icon: ShieldAlert, color: 'text-accent', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 flex items-center space-x-4">
              <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Activity Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 h-96 flex items-center justify-center">
        <span className="text-gray-400">PostgreSQL Analytics Chart Placeholder</span>
      </div>
    </div>
  );
};