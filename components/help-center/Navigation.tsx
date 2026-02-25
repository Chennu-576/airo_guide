'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Navigation({ isSidebarOpen, onToggleSidebar }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4931ed] to-[#a836ba] flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#4931ed] to-[#a836ba] bg-clip-text text-transparent">
                Airo
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-[#4931ed] transition-colors"
            >
              Help Centre
            </Link>
            <Link
              href="/apis"
              className="text-sm font-medium text-gray-600 hover:text-[#4931ed] transition-colors"
            >
              APIs
            </Link>
            <Link
              href="/changelog"
              className="text-sm font-medium text-gray-600 hover:text-[#4931ed] transition-colors"
            >
              Changelog
            </Link>
          </div>

          <Button
            className="bg-gradient-to-r from-[#4931ed] to-[#a836ba] hover:opacity-90 transition-opacity text-white"
          >
            Login
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}