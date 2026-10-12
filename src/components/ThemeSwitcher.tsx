'use client';

import { Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'default', name: 'Industrial Gold & Charcoal (Default)', color: 'bg-amber-500' },
  { id: 'theme-terracotta', name: 'Warm Earth & Terracotta', color: 'bg-orange-600' },
  { id: 'theme-emerald', name: 'Alpine Pine & River Rock', color: 'bg-emerald-600' },
  { id: 'theme-copper', name: 'Machinery Yellow & Steel', color: 'bg-yellow-500' },
];

const THEME_STORAGE_KEY = 'Wangaratta Radiators-Radiators-theme';

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && ['default', 'theme-emerald', 'theme-terracotta', 'theme-copper'].includes(savedTheme)) {
      setActiveTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    document.documentElement.classList.remove('theme-terracotta', 'theme-emerald', 'theme-copper', 'default');
    if (themeId !== 'default') {
      document.documentElement.classList.add(themeId);
    }
  };

  const handleSelectTheme = (themeId: string) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // Storage access fallback
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-4 w-64 bg-surface-950 rounded-2xl shadow-2xl shadow-black/60 border border-surface-800 overflow-hidden"
          >
            <div className="p-4 border-b border-surface-800">
              <h3 className="text-white font-bold text-xs uppercase tracking-wider">Concrete Theme Palette</h3>
            </div>
            <div className="p-2 space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTheme === theme.id 
                      ? 'bg-surface-800 text-white border border-primary-500/40' 
                      : 'text-surface-400 hover:bg-surface-900 hover:text-white'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full shadow-inner ${theme.color}`} />
                  <span className="truncate">{theme.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme switcher"
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-surface-950 text-primary-400 shadow-xl shadow-black/40 border border-surface-700 flex items-center justify-center hover:bg-surface-900 hover:text-primary-300 transition-colors cursor-pointer"
      >
        <Palette className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
