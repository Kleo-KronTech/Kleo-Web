import React from 'react';
import { Bell, MapPin, ClipboardList } from 'lucide-react';

interface NotificationCardProps {
  title: string;
  time: string;
  location: string;
  offset?: boolean;
  stackIndex?: number;
  type?: 'reminder' | 'task' | 'location';
}

const ICONS = {
  reminder: Bell,
  task: ClipboardList,
  location: MapPin,
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  time,
  location,
  offset = false,
  stackIndex = 0,
  type = 'reminder',
}) => {
  const negativeMargin = `-${stackIndex * 28}px`;
  const zIndex = 50 - stackIndex;
  const scale = 1 - stackIndex * 0.05;
  const Icon = ICONS[type];

  return (
    <div
      className={`relative rounded-xl border border-zinc-700 bg-zinc-800/60 backdrop-blur-sm p-3 text-white shadow-md ${offset ? 'z-0' : 'z-10'}`}
      style={{
        marginTop: stackIndex === 0 ? undefined : negativeMargin,
        zIndex,
        transform: `scale(${scale})`,
      }}
    >
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-[#5e54b8]/30 flex items-center justify-center">
          <Icon size={12} className="text-[#a099e8]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs leading-tight text-zinc-100 font-medium">
              {title}
            </span>
            <span className="shrink-0 text-xs text-zinc-500">{time}</span>
          </div>
          <div className="mt-1 text-xs text-zinc-400">{location}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;