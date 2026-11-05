import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Dices, Flame, Clock, Sparkles, Bookmark } from 'lucide-react';
import { Book } from '../types';

interface RandomBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  onOpenDetails: (book: Book) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const RandomBookModal: React.FC<RandomBookModalProps> = ({
  isOpen,
  onClose,
  books,
  onOpenDetails,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const spinRoulette = () => {
    if (books.length === 0) return;
    setIsShuffling(true);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * books.length);
      setSelectedBook(books[randomIndex]);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * books.length);
        setSelectedBook(books[finalIndex]);
        setIsShuffling(false);
      }
    }, 70);
  };

  useEffect(() => {
    if (isOpen) {
      spinRoulette();
    }
  }, [isOpen]);

  if (!isOpen || !selectedBook) return null;

  const isOverdrive = selectedBook.platform === 'OverDrive';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#15181E] border border-white/15 rounded-3xl shadow-[0_0_50px_rgba(255,46,99,0.3)] overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Kicker */}
        <div className="flex items-center gap-2 text-xs font-bold font-space uppercase tracking-wider text-[#FF2E63] mb-2">
          <Dices className="w-4 h-4 text-[#FF2E63] animate-bounce" />
          <span>ROULETTE DE LECTURA BOOKTOK</span>
        </div>

        <h2 className="font-space text-2xl sm:text-3xl font-extrabold text-white">
          ¿Qué leo hoy?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          La ruleta ha seleccionado este título para tu noche de lectura.
        </p>

        {/* Selected Book Presentation Card */}
        <div
          className={`mt-6 p-6 rounded-2xl bg-[#0D0F12] border ${
            isShuffling
              ? 'border-[#00F2FE] shadow-[0_0_25px_rgba(0,242,254,0.4)] scale-[0.98]'
              : 'border-white/10'
          } transition-all duration-200 relative overflow-hidden`}
        >
          {/* Top Row Badges */}
          <div className="flex items-center justify-between text-xs mb-3">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                  isOverdrive
                    ? 'text-[#00F2FE] border-[#00F2FE]/40 bg-[#00F2FE]/10'
                    : 'text-[#FF2E63] border-[#FF2E63]/40 bg-[#FF2E63]/10'
                }`}
              >
                {selectedBook.platform}
              </span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-slate-400">{selectedBook.year}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-space font-medium">{selectedBook.category}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-mono text-[10px]">Intensidad:</span>
              <div className="flex items-center">
                {[1, 2, 3].map((val) => (
                  <Flame
                    key={val}
                    className={`w-3.5 h-3.5 ${
                      val <= selectedBook.horrorLevel
                        ? 'fill-[#FF2E63] text-[#FF2E63]'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <h3 className="font-space text-xl sm:text-2xl font-black text-white leading-tight">
            {selectedBook.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Por {selectedBook.author} · <Clock className="w-3 h-3 inline text-[#00F2FE] ml-1" /> {selectedBook.readingTime}
          </p>

          {/* BookTok Hook */}
          <div className="mt-4 p-3 bg-[#15181E] rounded-xl border border-white/5 text-xs text-slate-200 font-sans">
            <span className="text-[#00F2FE] font-bold block mb-1">💬 BookTok Hook:</span>
            "{selectedBook.bookTokHook}"
          </div>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {selectedBook.synopsis}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={spinRoulette}
            disabled={isShuffling}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#1C2028] hover:bg-[#252B36] border border-white/10 rounded-xl transition-all cursor-pointer disabled:opacity-50 font-space hover:scale-102"
          >
            <Dices className={`w-4 h-4 text-[#00F2FE] ${isShuffling ? 'animate-spin' : ''}`} />
            <span>Girar ruleta de nuevo</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenDetails(selectedBook);
              }}
              className="flex-1 sm:flex-none px-4 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-[#15181E] border border-white/10 rounded-xl transition-colors cursor-pointer font-space"
            >
              Info
            </button>

            <a
              href={selectedBook.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider font-space transition-all shadow-lg ${
                isOverdrive
                  ? 'bg-[#00F2FE] hover:bg-[#3bf5ff] text-black shadow-[0_0_20px_rgba(0,242,254,0.5)]'
                  : 'bg-[#FF2E63] hover:bg-[#ff4d79] text-white shadow-[0_0_20px_rgba(255,46,99,0.5)]'
              }`}
            >
              <span>Leer / Prestar ahora</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
