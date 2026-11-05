import React from 'react';
import { Layers, Sparkles, RotateCcw, Compass } from 'lucide-react';
import { FilterState, Platform, Category } from '../types';

interface FilterToolbarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalAvailable: number;
  filteredCount: number;
  categories: Category[];
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onChange,
  onReset,
  totalAvailable,
  filteredCount,
  categories,
}) => {
  const isFiltered = filters.platform !== 'all' || filters.category !== 'all';

  return (
    <div id="catalogo" className="bg-[#12151B]/95 border-b border-white/10 p-3 sm:p-4 backdrop-blur-md sticky top-16 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Thematic Genre Filters (Terror, Suspenso, Fantasía, Cine & Ensayo) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1 mr-1 shrink-0">
            <Compass className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span className="hidden sm:inline">Temática:</span>
          </span>

          <button
            onClick={() => onChange({ category: 'all' })}
            className={`px-3 py-1.5 text-xs font-bold font-space rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              filters.category === 'all'
                ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                : 'bg-[#15181E] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Todas
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ category: cat })}
              className={`px-3 py-1.5 text-xs font-bold font-space rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filters.category === cat
                  ? 'bg-gradient-to-r from-[#FF2E63] to-[#ff4777] text-white shadow-[0_0_12px_rgba(255,46,99,0.45)]'
                  : 'bg-[#15181E] text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Side: Platform Selector (OverDrive vs eLibro) + Counter */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          {/* Platform Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-[#15181E] rounded-xl border border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1 font-bold">
              <Layers className="w-3 h-3 text-[#00F2FE]" />
              <span className="hidden lg:inline">Plataforma:</span>
            </span>
            <button
              onClick={() => onChange({ platform: 'all' })}
              className={`px-2.5 py-1 text-xs font-bold font-space rounded-lg transition-all cursor-pointer ${
                filters.platform === 'all'
                  ? 'bg-white/15 text-white border border-white/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas (12)
            </button>
            <button
              onClick={() => onChange({ platform: 'OverDrive' })}
              className={`px-2.5 py-1 text-xs font-bold font-space rounded-lg transition-all cursor-pointer ${
                filters.platform === 'OverDrive'
                  ? 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/60 shadow-[0_0_10px_rgba(0,242,254,0.3)]'
                  : 'text-slate-400 hover:text-[#00F2FE]'
              }`}
            >
              OverDrive (7)
            </button>
            <button
              onClick={() => onChange({ platform: 'eLibro' })}
              className={`px-2.5 py-1 text-xs font-bold font-space rounded-lg transition-all cursor-pointer ${
                filters.platform === 'eLibro'
                  ? 'bg-[#FF2E63]/20 text-[#FF2E63] border border-[#FF2E63]/60 shadow-[0_0_10px_rgba(255,46,99,0.3)]'
                  : 'text-slate-400 hover:text-[#FF2E63]'
              }`}
            >
              eLibro (5)
            </button>
          </div>

          {/* Reset button if active */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#00F2FE] hover:text-white bg-[#00F2FE]/10 hover:bg-[#00F2FE]/20 rounded-lg border border-[#00F2FE]/30 transition-colors cursor-pointer font-space font-semibold"
              title="Restablecer filtros"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Ver Todos</span>
            </button>
          )}

          <span className="font-mono text-xs text-slate-400 tabular-nums">
            <strong className="text-white font-bold font-space">{filteredCount}</strong>/{totalAvailable}
          </span>
        </div>
      </div>
    </div>
  );
};
