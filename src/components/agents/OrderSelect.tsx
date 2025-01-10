import React from 'react';

interface OrderSelectProps {
  value: number;
  onChange: (value: number) => void;
  variant?: 'light' | 'dark';
}

export function OrderSelect({ value, onChange, variant = 'dark' }: OrderSelectProps) {
  const styles = {
    light: 'bg-transparent text-white focus:ring-white/30',
    dark: 'bg-transparent text-gray-700 focus:ring-indigo-500'
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`appearance-none border-none focus:outline-none focus:ring-2 rounded px-1 py-0.5 transition-all ${styles[variant]}`}
    >
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  );
}