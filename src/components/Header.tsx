import React from 'react';
import { BookOpen, Dices, Code2, HelpCircle, Flame } from 'lucide-react';

interface HeaderProps {
  onOpenRandom: () => void;
  onOpenEmbedHelper: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRandom,
  onOpenEmbedHelper,
  onOpenGuide,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0D0F12]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark with neon badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF2E63] to-[#990033] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,46,99,0.5)]">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <a
            href="#top"
            className="font-space text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap hover:text-[#00F2FE] transition-colors flex items-center gap-2"
          >
            <span>UGC DIGITAL</span>
            <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 hidden sm:inline-block">
              STREAM & READ
            </span>
          </a>
        </div>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
          <a
            href="#catalogo"
            className="hover:text-white transition-colors whitespace-nowrap hover:text-glow-cyan"
          >
            Catálogo
          </a>
          <button
            onClick={onOpenGuide}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>Guía de Préstamo</span>
          </button>
          <button
            onClick={onOpenEmbedHelper}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-[#FF2E63]" />
            <span>Incrustar en Google Sites</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action with the requested label */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenRandom}
            className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF2E63] via-[#ff4375] to-[#FF2E63] hover:brightness-110 rounded-full shadow-[0_0_20px_rgba(255,46,99,0.4)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap font-space"
            title="Sugerir una lectura al azar"
          >
            <Dices className="w-4 h-4 animate-spin-slow" />
            <span className="hidden sm:inline">🎲 Roulette de Lectura: ¿Qué leo hoy?</span>
            <span className="sm:hidden">🎲 Roulette</span>
          </button>
        </div>
      </div>
    </header>
  );
};
