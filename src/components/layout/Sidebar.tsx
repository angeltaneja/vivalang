'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Home,
  Globe2,
  BookOpen,
  MessageSquareCode,
  Compass,
  Layers,
  FileText,
  BarChart3,
  User,
  Sparkles
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { ui, currentLanguage } = useApp();

  const navItems = [
    { label: ui.home, href: '/home', icon: Home },
    { label: ui.world, href: '/world', icon: Globe2, badge: currentLanguage.name },
    { label: ui.lessons, href: '/lessons', icon: BookOpen },
    { label: ui.conversation, href: '/conversation', icon: MessageSquareCode, highlight: true },
    { label: ui.scenarios, href: '/scenarios', icon: Compass },
    { label: ui.vocabulary, href: '/vocabulary', icon: Layers },
    { label: ui.notes, href: '/notes', icon: FileText },
    { label: ui.progress, href: '/progress', icon: BarChart3 },
    { label: ui.profile, href: '/profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-950/60 p-4 space-y-6 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      
      {/* Current Active Language World Info Box */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{currentLanguage.flag}</span>
            <div>
              <p className="text-xs font-semibold text-slate-400">Current World</p>
              <p className="text-sm font-bold text-white">{currentLanguage.name}</p>
            </div>
          </div>
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
            A2
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">{currentLanguage.description}</p>
      </div>

      {/* Main Navigation Links */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/home' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/30 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.highlight && (
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              )}
              {item.badge && !item.highlight && (
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Tutor Card */}
      <div className="mt-auto rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 space-y-3 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
        <div className="flex items-center space-x-2 text-indigo-400">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Companion</span>
        </div>
        <p className="text-xs text-slate-300">
          Have a 5-minute real-time voice practice session with your AI tutor today!
        </p>
        <Link
          href="/conversation"
          className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition"
        >
          Start AI Voice Chat 🎙️
        </Link>
      </div>

    </aside>
  );
}
