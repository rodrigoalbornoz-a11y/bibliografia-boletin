export type Platform = 'OverDrive' | 'eLibro';

export type Category = 'Terror' | 'Suspenso' | 'Fantasía' | 'Cine & Ensayo';

export type CurationBadge = 'Tendencia' | 'Recomendado' | 'Viral BookTok' | 'Novedad' | 'Top Rating';

export type HorrorLevel = 1 | 2 | 3;

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  platform: Platform;
  url: string;
  category: Category;
  format: string;
  synopsis: string;
  highlightQuote?: string;
  bookTokHook: string;
  curationBadge: CurationBadge;
  horrorLevel: HorrorLevel;
  tags: string[];
  readingTime: string;
  themeColor: 'red' | 'cyan';
  posterGradient: string;
  coverImage: string;
}

export interface FilterState {
  platform: 'all' | Platform;
  category: 'all' | Category;
}
