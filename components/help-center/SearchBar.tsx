'use client';

import { useState, useEffect } from 'react';
import { Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, Category } from '@/lib/supabase';
import Link from 'next/link';

interface SearchBarProps {
  categories: (Category & { articles: Article[] })[];
}

export function SearchBar({ categories }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    Array<{ article: Article; category: Category }>
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: Array<{ article: Article; category: Category }> = [];

    categories.forEach((category) => {
      category.articles.forEach((article) => {
        if (
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
        ) {
          results.push({ article, category });
        }
      });
    });

    setSearchResults(results.slice(0, 8));
    setIsOpen(results.length > 0);
  }, [searchQuery, categories]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length > 0 && setIsOpen(true)}
          className="w-full pl-12 pr-4 py-6 text-base rounded-xl border-2 border-gray-200 focus:border-[#4931ed] focus:ring-2 focus:ring-[#4931ed]/20 transition-all"
        />
      </div>

      <AnimatePresence>
        {isOpen && searchResults.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            >
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map(({ article, category }) => (
                  <Link
                    key={article.id}
                    href={`/docs/${category.slug}/${article.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-[#4931ed] mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <p className="text-xs text-[#4931ed] mt-1">
                          {category.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
