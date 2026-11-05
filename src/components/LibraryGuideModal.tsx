import React from 'react';
import { X, HelpCircle, BookOpen, Smartphone, ShieldCheck, ExternalLink, Zap } from 'lucide-react';

interface LibraryGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LibraryGuideModal: React.FC<LibraryGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#15181E] border border-white/15 rounded-3xl shadow-[0_0_50px_rgba(255,46,99,0.25)] p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold font-space uppercase tracking-wider text-[#FF2E63] mb-1">
            <Zap className="w-4 h-4" />
            <span>ACCESO DIGITAL INSTANTÁNEO</span>
          </div>
          <h2 className="font-space text-2xl sm:text-3xl font-extrabold text-white">
            ¿Cómo pedir libros en préstamo?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Guía rápida para estudiantes y profesores de la Universidad La Gran Colombia.
          </p>
        </div>

        {/* Section: OverDrive UGC */}
        <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#00F2FE]/30 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-space text-base font-bold text-[#00F2FE] flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>OverDrive UGC (App Libby)</span>
            </h4>
            <a
              href="https://ugc.overdrive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#00F2FE] hover:underline flex items-center gap-1"
            >
              <span>ugc.overdrive.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Plataforma principal para eBooks y audiolibros.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside pt-1 font-sans">
            <li>
              <strong className="text-white">Login:</strong> Ingresa con tu carné o correo institucional @ugc.edu.co.
            </li>
            <li>
              <strong className="text-white">Lectura en Móvil:</strong> Descarga la app <strong>Libby</strong> (disponible en iOS y Android) y enlaza la Universidad La Gran Colombia.
            </li>
            <li>
              <strong className="text-white">Devolución automática:</strong> Los libros se devuelven solos al terminar el periodo de préstamo, ¡sin multas!
            </li>
          </ul>
        </div>

        {/* Section: eLibro UGC */}
        <div className="p-5 rounded-2xl bg-[#0D0F12] border border-[#FF2E63]/30 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-space text-base font-bold text-[#FF2E63] flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>eLibro UGC (Biblioteca Digital)</span>
            </h4>
            <a
              href="https://elibro-net.bibliodigital.ugc.edu.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#FF2E63] hover:underline flex items-center gap-1"
            >
              <span>bibliodigital.ugc.edu.co</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Miles de libros académicos, ensayos cinematográficos y literatura en español.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside pt-1 font-sans">
            <li>
              <strong className="text-white">Acceso:</strong> Ingresa a través del portal institucional de la Biblioteca Digital UGC con tus claves de estudiante/docente.
            </li>
            <li>
              <strong className="text-white">Funciones Pro:</strong> Subraya, escucha con sintetizador de voz, copia citas con formato APA y lee sin conexión con la app de eLibro.
            </li>
          </ul>
        </div>

        {/* Reassurance */}
        <div className="flex items-start gap-3 p-4 bg-[#0D0F12] rounded-2xl border border-white/10 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Todo el catálogo seleccionado está disponible con acceso ilimitado para la comunidad universitaria de la Universidad La Gran Colombia sin costo adicional.
          </span>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF2E63] to-[#d60045] hover:brightness-110 text-white text-xs sm:text-sm font-bold font-space rounded-xl cursor-pointer"
          >
            ¡Entendido, a leer!
          </button>
        </div>
      </div>
    </div>
  );
};
