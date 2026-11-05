import React, { useState, useMemo, useEffect } from 'react';
import { BOOKS_DATA } from './data/booksData';
import { Book, FilterState, Category } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterToolbar } from './components/FilterToolbar';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { RandomBookModal } from './components/RandomBookModal';
import { EmbedHelperModal } from './components/EmbedHelperModal';
import { LibraryGuideModal } from './components/LibraryGuideModal';
import { Flame, Film, Dices, RotateCcw } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  platform: 'all',
  category: 'all',
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ugc_horror_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showingFavoritesOnly, setShowingFavoritesOnly] = useState(false);

  // Modals state
  const [selectedBookForDetails, setSelectedBookForDetails] = useState<Book | null>(null);
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [isEmbedHelperOpen, setIsEmbedHelperOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('ugc_horror_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateFilters = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setShowingFavoritesOnly(false);
  };

  // Derive unique categories for thematic buttons
  const categories: Category[] = ['Terror', 'Suspenso', 'Fantasía', 'Cine & Ensayo'];

  // Filtered books: ONLY thematic category and platform filters
  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      // Favorites filter
      if (showingFavoritesOnly && !favorites.includes(book.id)) {
        return false;
      }

      // Platform filter (OverDrive vs eLibro)
      if (filters.platform !== 'all' && book.platform !== filters.platform) {
        return false;
      }

      // Thematic category filter
      if (filters.category !== 'all' && book.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [filters, showingFavoritesOnly, favorites]);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#0D0F12] text-slate-100 selection:bg-[#FF2E63]/30 selection:text-[#00F2FE]">
      {/* 3-zone Top Bar Contract with Neon Cyber Aesthetic */}
      <Header
        onOpenRandom={() => setIsRandomModalOpen(true)}
        onOpenEmbedHelper={() => setIsEmbedHelperOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Curatorial Hero Section */}
        <HeroSection
          onOpenRandom={() => setIsRandomModalOpen(true)}
          favoritesCount={favorites.length}
          onFilterFavorites={() => setShowingFavoritesOnly((prev) => !prev)}
          showingFavoritesOnly={showingFavoritesOnly}
        />

        {/* Simplified Filter Toolbar: Thematic Categories + Platform Selector ONLY */}
        <FilterToolbar
          filters={filters}
          onChange={handleUpdateFilters}
          onReset={handleResetFilters}
          totalAvailable={BOOKS_DATA.length}
          filteredCount={filteredBooks.length}
          categories={categories}
        />

        {/* Catalog Grid View: Compact, High-Impact Cards with Thematic Cover Art */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredBooks.map((book, index) => (
                <BookCard
                  key={book.id}
                  book={book}
                  index={index}
                  isFavorite={favorites.includes(book.id)}
                  onToggleFavorite={toggleFavorite}
                  onOpenDetails={setSelectedBookForDetails}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center max-w-md mx-auto">
              <h3 className="font-space text-lg font-bold text-white">
                No hay títulos en esta combinación
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans">
                Prueba a seleccionar "Todas" las temáticas o restablece los filtros.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-[#FF2E63] hover:bg-[#ff4d79] text-white text-xs font-bold font-space uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ver todos los 12 libros</span>
              </button>
            </div>
          )}
        </div>

        {/* BookTok / Streaming App Feature Spotlight Section */}
        <section className="border-t border-white/10 bg-gradient-to-b from-[#15181E]/60 to-[#0D0F12] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 text-xs font-mono font-bold uppercase tracking-wider">
                  <Film className="w-3.5 h-3.5" />
                  <span>BIBLIOTECA DIGITAL · UNIVERSIDAD LA GRAN COLOMBIA</span>
                </div>
                <h2 className="font-space text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Las 12 obras indispensables de terror y suspenso
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  Conectando la cultura pop del cómic, los thrillers psicológicos más inquietantes, las fábulas
                  oscuras internacionales y los ensayos cinematográficos de culto. Acceso libre para estudiantes
                  y profesores de la UGC mediante OverDrive (App Libby) y eLibro.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-space font-bold">
                  <button
                    onClick={() => setIsRandomModalOpen(true)}
                    className="inline-flex items-center gap-2 text-[#00F2FE] hover:text-[#7af8ff] hover:underline cursor-pointer"
                  >
                    <Dices className="w-4 h-4" />
                    <span>🎲 Roulette de Lectura: ¿Qué leo hoy?</span>
                  </button>
                  <button
                    onClick={() => setIsGuideOpen(true)}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <span>¿Cómo activar mi acceso institucional UGC? →</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#15181E] p-2 shadow-[0_0_40px_rgba(0,0,0,0.8)] group">
                  <img
                    src="/src/assets/images/poster_cinema_slasher_1793895762208.jpg"
                    alt="Cine de Terror y Literatura"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-72 object-cover rounded-2xl brightness-90 contrast-125 saturate-125 group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#0D0F12]/85 backdrop-blur-md border border-white/10 text-xs">
                    <span className="text-[#FF2E63] font-space font-bold block">
                      🔥 12 Libros Disponibles para Préstamo Inmediato
                    </span>
                    <span className="text-slate-400 text-[11px] block mt-0.5 font-sans">
                      Optimizado para incrustarse en Google Sites (iFrame responsive)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Cyber-Horror Footer */}
      <footer className="border-t border-white/10 bg-[#0D0F12] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-space font-bold text-white">UGC Digital</span>
            <span>·</span>
            <span>Universidad La Gran Colombia</span>
            <span>·</span>
            <span className="font-mono text-[#00F2FE]">OverDrive & eLibro</span>
          </div>

          <div className="flex items-center gap-6 font-space">
            <button
              onClick={() => setIsEmbedHelperOpen(true)}
              className="hover:text-[#00F2FE] transition-colors cursor-pointer"
            >
              Incrustar en Google Sites
            </button>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Guía de Acceso
            </button>
            <a
              href="#top"
              className="hover:text-white transition-colors"
            >
              Volver arriba ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <RandomBookModal
        isOpen={isRandomModalOpen}
        onClose={() => setIsRandomModalOpen(false)}
        books={BOOKS_DATA}
        onOpenDetails={(book) => setSelectedBookForDetails(book)}
        isFavorite={(id) => favorites.includes(id)}
        onToggleFavorite={toggleFavorite}
      />

      <BookDetailModal
        book={selectedBookForDetails}
        onClose={() => setSelectedBookForDetails(null)}
        isFavorite={selectedBookForDetails ? favorites.includes(selectedBookForDetails.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <EmbedHelperModal
        isOpen={isEmbedHelperOpen}
        onClose={() => setIsEmbedHelperOpen(false)}
      />

      <LibraryGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
