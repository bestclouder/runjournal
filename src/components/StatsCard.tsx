import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}

export default function StatsCard({ icon, label, value, bgColor }: StatsCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
