import React, { useState } from 'react';
import { X, Copy, Check, Globe, Monitor, Code } from 'lucide-react';

interface EmbedHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedHelperModal: React.FC<EmbedHelperModalProps> = ({ isOpen, onClose }) => {
  const [embedHeight, setEmbedHeight] = useState<'800' | '950' | '1100'>('950');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const iframeSnippet = `<iframe src="${currentUrl}" width="100%" height="${embedHeight}" style="border:none; border-radius:16px; overflow:hidden;" allow="clipboard-write" loading="lazy" title="Boletín Mensual de Lectura: Especial Terror y Suspenso - Biblioteca UGC"></iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(iframeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#15181E] border border-white/15 rounded-3xl shadow-[0_0_50px_rgba(0,242,254,0.25)] p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold font-space uppercase tracking-wider text-[#00F2FE] mb-1">
            <Globe className="w-4 h-4" />
            <span>INTEGRACIÓN DIRECTA</span>
          </div>
          <h2 className="font-space text-2xl sm:text-3xl font-extrabold text-white">
            Incrustar en Google Sites
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Optimizado al 100% para funcionar en un iFrame de Google Sites con modo oscuro cyber-horror, enlaces seguros y adaptación responsive.
          </p>
        </div>

        {/* Step-by-step instructions for Google Sites */}
        <div className="p-4 rounded-2xl bg-[#0D0F12] border border-white/10 space-y-3 text-xs sm:text-sm">
          <h4 className="font-space font-bold text-white flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#FF2E63]" />
            <span>Cómo incrustar en Google Sites (2 pasos):</span>
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1 font-sans">
            <li>
              En el editor de <strong className="text-white">Google Sites</strong>, haz clic en <strong className="text-[#00F2FE]">Insertar &gt; Incorporar</strong>.
            </li>
            <li>
              Selecciona la pestaña <strong className="text-[#00F2FE]">"Incorporar código"</strong> y pega el código HTML generado abajo.
            </li>
            <li>
              Ajusta el ancho del bloque en Google Sites arrastrando las esquinas al 100% de la columna.
            </li>
          </ol>
        </div>

        {/* Embed code generator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>Código HTML (iFrame)</span>
            </span>

            {/* Height selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-mono">Altura:</span>
              {(['800', '950', '1100'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setEmbedHeight(h)}
                  className={`px-2.5 py-0.5 rounded-lg font-mono font-bold cursor-pointer transition-colors ${
                    embedHeight === h
                      ? 'bg-[#00F2FE]/20 text-[#00F2FE] border border-[#00F2FE]/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {h}px
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 bg-[#0D0F12] rounded-xl border border-white/10 text-slate-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              {iframeSnippet}
            </pre>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00F2FE] hover:bg-[#3bf5ff] text-black font-black font-space text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,254,0.4)] cursor-pointer"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? '¡Código Copiado!' : 'Copiar Código HTML'}</span>
            </button>

            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C2028] hover:bg-[#252B36] text-white font-bold font-space text-xs sm:text-sm rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Globe className="w-4 h-4 text-[#FF2E63]" />}
              <span>{copiedUrl ? '¡URL Copiada!' : 'Copiar Solo la URL'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
