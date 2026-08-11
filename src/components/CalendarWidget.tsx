import { useState } from 'react';
import { Calendar, Clock, Sun, Moon } from 'lucide-react';

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
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-red-900/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} className="text-red-400" />
          <span className="text-[10px] uppercase tracking-widest text-red-500/60 font-medium">{month} {year}</span>
        </div>
        <Clock size={11} className="text-gray-600" />
      </div>
      <div className="grid grid-cols-7 gap-0 text-center">
        {days.map(d => (
          <div key={d} className="text-[8px] text-gray-600 py-0.5">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className={`text-[9px] py-0.5 rounded ${day === today ? 'bg-blood/30 text-white font-bold' : day ? 'text-gray-500' : ''}`}>
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}