'use client'

import { Search, BookOpen, Code2, Bell, LogIn, Sun, Menu } from 'lucide-react'

interface NavigationProps {
  onToggleSidebar: () => void
}

export function Navigation({ onToggleSidebar }: NavigationProps) {
  return (
    <header className="bg-[#a836ba] text-white flex-shrink-0 sticky top-0 z-40">
      {/* Row 1: logo + login */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-white/20">
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden p-1 mr-1 text-white/80 hover:text-white"
            onClick={onToggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
              <span className="text-white text-[9px] font-black">360</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">Home</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition">
            <LogIn className="w-3.5 h-3.5" />
            Log In
          </button>
          <button className="p-1 text-white/70 hover:text-white transition">
            <Sun className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 2: tabs + search */}
      <div className="flex items-center justify-between px-4 h-10">
        <div className="flex items-center gap-0.5">
          {[
            { label: 'Help Centre', icon: BookOpen, active: true },
            { label: '360Airo APIs', icon: Code2, active: false },
            { label: 'Changelog', icon: Bell, active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors
                ${tab.active
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5 text-xs text-gray-400 shadow-sm cursor-pointer hover:shadow">
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
          <kbd className="ml-3 px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500 font-mono">
            CTRL+K
          </kbd>
        </div>
      </div>
    </header>
  )
}