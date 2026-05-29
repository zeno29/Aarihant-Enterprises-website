import React from 'react';
import { MessageSquare, HelpCircle, Mail, PhoneCall } from 'lucide-react';

interface HelpSupportRailProps {
  onContactClick: () => void;
}

export default function HelpSupportRail({ onContactClick }: HelpSupportRailProps) {
  const supportItems = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Live Chat',
      action: onContactClick,
      color: 'hover:text-[#00dbe7] text-white hover:bg-[#00dbe7]/10'
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-[#00dbe7]" />,
      label: 'Direct Call',
      action: () => window.open('tel:+15550123456'),
      color: 'bg-[#00f2ff]/20 text-[#00f2ff] hover:bg-[#00f2ff]/30'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email Support',
      action: () => window.open('mailto:support@aarihant.com'),
      color: 'hover:text-[#00dbe7] text-white hover:bg-[#00dbe7]/10'
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'F.A.Q. Help',
      action: onContactClick,
      color: 'hover:text-[#00dbe7] text-white hover:bg-[#00dbe7]/10'
    }
  ];

  return (
    <aside
      id="side-support-rail"
      className="fixed right-0 top-1/2 -translate-y-1/2 rounded-l-2xl bg-[#171f33]/90 backdrop-blur-md border-l border-y border-[#849495]/20 shadow-[0_4px_30px_rgba(0,242,255,0.1)] hidden md:flex flex-col items-center py-5 px-2 gap-4 z-40 transition-transform duration-300 hover:-translate-x-1"
    >
      {/* Mini Title Label */}
      <div className="pb-3 border-b border-[#3a494b]/20 flex flex-col items-center">
        <span className="text-[10px] font-bold text-[#00dbe7] uppercase tracking-widest leading-none rotate-18 pt-1">
          HELP
        </span>
      </div>

      {/* Persistent Contacts List */}
      {supportItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`p-3 rounded-xl transition-all duration-300 relative group cursor-pointer ${item.color}`}
          aria-label={item.label}
        >
          {item.icon}
          {/* Elegant Left-Hover Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#2d3449] border border-[#3a494b] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none select-none shadow-lg whitespace-nowrap">
            {item.label}
          </span>
        </button>
      ))}
    </aside>
  );
}
