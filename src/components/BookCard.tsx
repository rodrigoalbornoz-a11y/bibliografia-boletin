import React from 'react';
import { ExternalLink, Info, Bookmark, Flame } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (book: Book) => void;
  index: number;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) => {
  const isOverdrive = book.platform === 'OverDrive';
  const isRedTheme = book.themeColor === 'red';

  return (
    <article
      onClick={() => onOpenDetails(book)}
      className={`group relative flex flex-col bg-[#15181E] rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] cursor-pointer ${
        isRedTheme
          ? 'hover:border-[#FF2E63]/70 hover:shadow-[0_0_30px_rgba(255,46,99,0.35)]'
          : 'hover:border-[#00F2FE]/70 hover:shadow-[0_0_30px_rgba(0,242,254,0.35)]'
      }`}
    >
      {/* VIBRANT THEMATIC COVER ARTWORK (NO GREY BOXES) */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0D0F12]">
        <img
          src={book.coverImage}
          alt={`Portada temática de ${book.title}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-90 contrast-110 group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        {/* Deep gradient overlay for seamless readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15181E] via-[#15181E]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        {/* Top Badges Floating Over Cover */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {/* Platform Badge: OverDrive vs eLibro */}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-extrabold uppercase tracking-wider backdrop-blur-md border shadow-md ${
              isOverdrive
                ? 'bg-[#00F2FE]/25 text-[#00F2FE] border-[#00F2FE]/60 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                : 'bg-[#FF2E63]/25 text-[#FF2E63] border-[#FF2E63]/60 shadow-[0_0_12px_rgba(255,46,99,0.4)]'
            }`}
          >
            {book.platform}
          </span>

          {/* Genre / Year tag */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-md border border-white/10">
            <span>{book.category}</span>
            <span className="text-slate-500">·</span>
            <span className="font-bold text-white">{book.year}</span>
          </span>
        </div>

        {/* Bottom Cover Subtle Accent: Reading Time & Intensity */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 z-10">
          <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
            ⏱ {book.readingTime}
          </span>
          <div className="flex items-center gap-0.5 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/5">
            {[1, 2, 3].map((val) => (
              <Flame
                key={val}
                className={`w-3 h-3 ${
                  val <= book.horrorLevel
                    ? 'fill-[#FF2E63] text-[#FF2E63]'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* COMPACT CARD CONTENT: PROTAGONIST TITLE + AUTHOR + ACTION */}
      <div className="p-4 pt-2 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* PROTAGONIST TITLE: LARGE, BOLD, VIBRANT NEON GRADIENT */}
          <h3
            className={`font-space text-lg sm:text-xl font-black tracking-tight leading-snug line-clamp-2 transition-all ${
              isRedTheme
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#FF2E63] group-hover:to-[#ff6588]'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00F2FE] group-hover:to-[#5af5fc]'
            }`}
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Author and Format */}
          <p className="font-sans text-xs sm:text-sm text-slate-400 font-medium mt-1 truncate">
            {book.author}
          </p>
        </div>

        {/* ACTION ROW: DIRECT "LEER / PRESTAR" BUTTON + INFO */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2">
          {/* Prominent Direct Button */}
          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider font-space transition-all duration-200 shadow-md ${
              isOverdrive
                ? 'bg-[#00F2FE] hover:bg-[#4df6ff] text-black shadow-[0_0_15px_rgba(0,242,254,0.35)] hover:scale-102'
                : 'bg-[#FF2E63] hover:bg-[#ff4d79] text-white shadow-[0_0_15px_rgba(255,46,99,0.35)] hover:scale-102'
            }`}
          >
            <span>Leer / Prestar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Quick Info Modal Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(book);
            }}
            className="p-2.5 text-slate-400 hover:text-white bg-[#1C2028] hover:bg-[#252B36] border border-white/10 rounded-xl transition-colors cursor-pointer"
            title="Ver sinopsis completa y detalles"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Favorite Watchlist Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(book.id);
            }}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isFavorite
                ? 'text-[#FF2E63] bg-[#FF2E63]/15 border-[#FF2E63]/40'
                : 'text-slate-400 hover:text-white bg-[#1C2028] border-white/10 hover:bg-[#252B36]'
            }`}
            title={isFavorite ? 'En tu watchlist' : 'Guardar'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#FF2E63]' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};
