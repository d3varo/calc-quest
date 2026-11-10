import React from 'react';
import { Volume2, VolumeX, Flame, Award, Heart, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  streak: number;
  totalXP: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReturnToMap?: () => void;
  showMapButton?: boolean;
  lives?: number; // 0..3 (only for Question 3 / boss questions)
  showLives?: boolean;
}

export const GameHUD: React.FC<Props> = ({
  streak,
  totalXP,
  soundEnabled,
  onToggleSound,
  onReturnToMap,
  showMapButton = false,
  lives = 3,
  showLives = false,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-2">
          {showMapButton && onReturnToMap ? (
            <button
              onClick={() => {
                sound.playClick();
                onReturnToMap();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border-b-2 border-slate-300 transition-all active:translate-y-0.5"
              title="Kembali ke Peta Level"
            >
              <Compass className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Peta Level</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 select-none">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 border-b-4 border-emerald-700 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                ∫dx
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">
                  Calc Quest
                </h1>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Petualangan Kalkulus
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Center / Stat Counters */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Streak Flame */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
              streak > 0
                ? 'bg-amber-50 text-amber-600 border border-amber-200 font-bold'
                : 'text-slate-400'
            }`}
            title="Streak Beruntun Benar"
          >
            <Flame className={`w-5 h-5 ${streak > 0 ? 'fill-amber-500 text-amber-500' : 'text-slate-300'}`} />
            <span className="text-xs sm:text-sm font-extrabold tabular-nums">{streak}</span>
          </div>

          {/* XP Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700"
            title="Total Poin Pengalaman (XP)"
          >
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-xs sm:text-sm font-extrabold tabular-nums">{totalXP} <span className="text-[10px] font-semibold text-indigo-500">XP</span></span>
          </div>

          {/* Lives Indicator (Only visible in Question 3 Word Problem) */}
          {showLives && (
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-600"
              title="Nyawa Soal Cerita Tantangan (Maks 3)"
            >
              {[1, 2, 3].map((heartIndex) => (
                <Heart
                  key={heartIndex}
                  className={`w-4 h-4 transition-all duration-300 ${
                    heartIndex <= lives
                      ? 'fill-rose-500 text-rose-500 scale-100'
                      : 'text-slate-300 fill-slate-200 scale-90 opacity-40'
                  }`}
                />
              ))}
              <span className="ml-1 text-xs font-bold tabular-nums text-rose-700 hidden sm:inline">
                {lives}/3
              </span>
            </div>
          )}
        </div>

        {/* Action Zone: Audio Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border-b-2 border-slate-300 transition-all active:translate-y-0.5"
            aria-label={soundEnabled ? 'Matikan Suara Efek' : 'Aktifkan Suara Efek'}
            title={soundEnabled ? 'Suara Aktif' : 'Suara Mati'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-slate-700" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
