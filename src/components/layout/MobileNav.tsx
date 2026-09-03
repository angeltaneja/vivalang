'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Home, Globe2, BookOpen, MessageSquareCode, Layers, FileText } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();
  const { ui } = useApp();

  const navItems = [
    { label: ui.home, href: '/home', icon: Home },
    { label: ui.world, href: '/world', icon: Globe2 },
    { label: 'Voice AI', href: '/conversation', icon: MessageSquareCode, isSpecial: true },
    { label: ui.lessons, href: '/lessons', icon: BookOpen },
    { label: ui.notes, href: '/notes', icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-slate-800 bg-slate-950/90 backdrop-blur-xl px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/home' && pathname?.startsWith(item.href));

          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-xl shadow-blue-500/40 ring-4 ring-slate-950">
                  <Icon className="h-6 w-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-blue-400 mt-1">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-3 py-1 text-xs transition ${
                isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
