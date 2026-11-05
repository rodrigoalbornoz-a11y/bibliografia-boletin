import React, { useState } from 'react';
import { X, ExternalLink, Bookmark, Check, Copy, Clock, Tag, Building2, Flame } from 'lucide-react';
import { Book } from '../types';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!book) return null;

  const isOverdrive = book.platform === 'OverDrive';
  const citation = `${book.author} (${book.year}). ${book.title}. Biblioteca Digital Universidad La Gran Colombia [${book.platform}]. Disponible en: ${book.url}`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#15181E] border border-white/15 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden my-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0D0F12]">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded border ${
                isOverdrive
                  ? 'text-[#00F2FE] border-[#00F2FE]/40 bg-[#00F2FE]/10'
                  : 'text-[#FF2E63] border-[#FF2E63]/40 bg-[#FF2E63]/10'
              }`}
            >
              {book.platform}
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono tabular-nums text-slate-300">{book.year}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-space font-semibold">{book.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(book.id)}
              className="p-2 text-slate-400 hover:text-[#FF2E63] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              title={isFavorite ? 'Quitar de mi watchlist' : 'Guardar en mi watchlist'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#FF2E63] text-[#FF2E63]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Title & Author */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-space font-bold tracking-widest text-[#00F2FE]">
                {book.curationBadge}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-slate-400">{book.format}</span>
            </div>
            <h2 className="font-space text-2xl sm:text-3xl font-black text-white leading-tight">
              {book.title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-300 font-medium mt-1">
              {book.author}
            </p>
          </div>

          {/* BookTok Hook Box */}
          <div className="p-4 rounded-2xl bg-[#0D0F12] border border-white/10 space-y-1">
            <span className="text-[11px] font-mono uppercase font-bold text-[#FF2E63] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-[#FF2E63]" />
              BookTok Review & Hook:
            </span>
            <p className="text-sm text-slate-200 font-sans italic">
              "{book.bookTokHook}"
            </p>
          </div>

          {/* Complete Synopsis */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Sinopsis & Resumen de Trama
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {book.synopsis}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0D0F12] border border-white/10 text-xs">
            <div>
              <span className="text-slate-500 font-mono block">Intensidad de Terror</span>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3].map((val) => (
                  <Flame
                    key={val}
                    className={`w-3.5 h-3.5 ${
                      val <= book.horrorLevel
                        ? 'fill-[#FF2E63] text-[#FF2E63]'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
                <span className="font-mono text-[11px] text-slate-300 ml-1">
                  {book.horrorLevel === 1 ? 'Leve' : book.horrorLevel === 2 ? 'Moderado' : 'Extremo'}
                </span>
              </div>
            </div>
            <div>
              <span className="text-slate-500 font-mono block">Tiempo de Lectura</span>
              <span className="font-mono font-semibold text-slate-200 mt-1 block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00F2FE]" />
                {book.readingTime}
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-mono block">Plataforma</span>
              <span className="font-space font-bold text-slate-200 mt-1 block">
                {book.platform} UGC
              </span>
            </div>
          </div>

          {/* Thematic Tags */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>Etiquetas y Subgéneros</span>
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#0D0F12] rounded-lg border border-white/10 text-slate-300 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* How to borrow guide for UGC students */}
          <div className="p-4 rounded-2xl bg-[#0D0F12] border border-white/10 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold font-space text-white">
              <Building2 className="w-4 h-4 text-[#00F2FE]" />
              <span>Acceso institucional para la Universidad La Gran Colombia</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-sans">
              {isOverdrive
                ? 'Para OverDrive UGC: Haz clic en "Leer / Prestar", inicia sesión con tus credenciales institucionales @ugc.edu.co. También puedes sincronizarlo en la app móvil Libby buscando "Universidad La Gran Colombia".'
                : 'Para eLibro UGC: Haz clic en "Leer / Prestar", autentícate con tus credenciales de Biblioteca Digital UGC para leer online o descargar capítulos en préstamo digital.'}
            </p>
          </div>

          {/* Academic Citation Box */}
          <div className="p-3 bg-[#0D0F12] rounded-xl border border-white/10 flex items-start justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] block font-mono">Cita académica (APA):</span>
              <code className="text-slate-300 font-mono text-[11px] block break-all leading-normal">
                {citation}
              </code>
            </div>
            <button
              onClick={handleCopyCitation}
              className="p-1.5 text-slate-400 hover:text-white bg-[#15181E] hover:bg-white/10 rounded-lg transition-colors shrink-0 cursor-pointer"
              title="Copiar cita"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Modal Footer with Primary Link */}
        <div className="p-5 border-t border-white/10 bg-[#0D0F12] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer font-space"
          >
            Cerrar
          </button>

          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider font-space transition-all shadow-lg ${
              isOverdrive
                ? 'bg-[#00F2FE] hover:bg-[#3bf5ff] text-black shadow-[0_0_20px_rgba(0,242,254,0.5)]'
                : 'bg-[#FF2E63] hover:bg-[#ff4d79] text-white shadow-[0_0_20px_rgba(255,46,99,0.5)]'
            }`}
          >
            <span>Leer / Prestar en {book.platform}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
