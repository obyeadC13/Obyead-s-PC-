import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function CalendarWidget() {
  const [now] = useState(new Date());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = now.getDate();
  const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = now.getFullYear();

  const startDay = new Date(year, now.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-3 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} className="text-red-400" style={{ filter: 'drop-shadow(0 0 4px #f87171)' }} />
          <span className="text-[10px] uppercase tracking-widest text-blood/70 font-medium" style={{ textShadow: '0 0 8px rgba(220,38,38,0.5)' }}>{month} {year}</span>
        </div>
        <Clock size={11} className="text-gray-600" />
      </div>
      <div className="grid grid-cols-7 gap-0 text-center relative z-10">
        {days.map(d => (
          <div key={d} className="text-[8px] text-gray-600 py-0.5">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className={`text-[9px] py-0.5 rounded ${day === today ? 'bg-blood/40 text-white font-bold' : day ? 'text-gray-500' : ''}`}
            style={day === today ? { boxShadow: '0 0 6px rgba(220,38,38,0.4)' } : {}}>
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}