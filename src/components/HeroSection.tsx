import React from 'react';
import { Dices, ArrowDown, Bookmark, Sparkles, Flame, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenRandom: () => void;
  favoritesCount: number;
  onFilterFavorites: () => void;
  showingFavoritesOnly: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRandom,
  favoritesCount,
  onFilterFavorites,
  showingFavoritesOnly,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0D0F12]">
      {/* Background with Ambient Dark Vignette & Cyber Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/src/assets/images/hero_gothic_library_1793892009951.jpg"
          alt="Atmospheric Library"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-50 contrast-150 saturate-150"
        />
        {/* Neon Cyber Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF2E63]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00F2FE]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          {/* BookTok / Streaming App Kicker */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider uppercase bg-[#FF2E63]/20 text-[#FF2E63] border border-[#FF2E63]/40 shadow-[0_0_12px_rgba(255,46,99,0.3)]">
              <Flame className="w-3.5 h-3.5 fill-[#FF2E63]" />
              ESPECIAL BOOKTOK & STREAMING
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Biblioteca Digital · Universidad La Gran Colombia
            </span>
          </div>

          {/* Main Title Required */}
          <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none text-balance">
            Boletín Mensual de Lectura:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#ff6584] to-[#00F2FE] drop-shadow-[0_0_25px_rgba(255,46,99,0.35)]">
              Especial Terror y Suspenso
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl text-pretty font-normal">
            Los libros virales que no te dejan dormir, el horror folclórico más oscuro y los clásicos cinematográficos.
            Pide en préstamo digital con 1 clic en <span className="text-[#00F2FE] font-bold">OverDrive</span> y{' '}
            <span className="text-[#FF2E63] font-bold">eLibro</span> gratis para estudiantes y docentes UGC.
          </p>

          {/* Interactive CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Requested button */}
            <button
              onClick={onOpenRandom}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#FF2E63] to-[#d60045] hover:brightness-110 rounded-xl shadow-[0_0_30px_rgba(255,46,99,0.5)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-space group"
            >
              <Dices className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>🎲 Roulette de Lectura: ¿Qué leo hoy?</span>
            </button>

            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-[#15181E] hover:bg-[#1A1E24] border border-white/10 hover:border-[#00F2FE]/50 rounded-xl transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(0,242,254,0.25)] font-space"
            >
              <ArrowDown className="w-4 h-4 text-[#00F2FE]" />
              <span>Ver Catálogo (12)</span>
            </a>

            {favoritesCount > 0 && (
              <button
                onClick={onFilterFavorites}
                className={`inline-flex items-center gap-2 px-4 py-3.5 text-sm font-bold rounded-xl border transition-all cursor-pointer font-space ${
                  showingFavoritesOnly
                    ? 'bg-[#FF2E63]/25 text-[#FF2E63] border-[#FF2E63] shadow-[0_0_15px_rgba(255,46,99,0.3)]'
                    : 'bg-[#15181E] text-slate-300 border-white/10 hover:border-[#FF2E63]/40'
                }`}
              >
                <Bookmark className="w-4 h-4 text-[#FF2E63] fill-[#FF2E63]" />
                <span>Mi Watchlist ({favoritesCount})</span>
              </button>
            )}
          </div>

          {/* Streaming Metrics Strip */}
          <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="bg-[#15181E]/60 p-3 rounded-lg border border-white/5">
              <span className="block text-slate-500 text-xs font-mono uppercase tracking-wider">Catálogo Total</span>
              <span className="font-space text-lg sm:text-xl font-bold text-white tabular-nums">12 Títulos</span>
            </div>
            <div className="bg-[#15181E]/60 p-3 rounded-lg border border-white/5">
              <span className="block text-slate-500 text-xs font-mono uppercase tracking-wider">OverDrive UGC</span>
              <span className="font-space text-lg sm:text-xl font-bold text-[#00F2FE] tabular-nums">7 Títulos</span>
            </div>
            <div className="bg-[#15181E]/60 p-3 rounded-lg border border-white/5">
              <span className="block text-slate-500 text-xs font-mono uppercase tracking-wider">eLibro UGC</span>
              <span className="font-space text-lg sm:text-xl font-bold text-[#FF2E63] tabular-nums">5 Títulos</span>
            </div>
            <div className="bg-[#15181E]/60 p-3 rounded-lg border border-white/5">
              <span className="block text-slate-500 text-xs font-mono uppercase tracking-wider">Acceso Instantáneo</span>
              <span className="font-space text-lg sm:text-xl font-bold text-emerald-400">100% Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
