import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Coffee, Eye, Activity, Sparkles, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  onFinishBreak: () => void;
  topicName?: string;
}

export const BreakModal: React.FC<Props> = ({ onFinishBreak, topicName }) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300); // 5 minutes = 300 seconds
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [breathPhase, setBreathPhase] = useState<'Tarik Napas' | 'Tahan' | 'Hembuskan' | 'Relaks'>('Tarik Napas');
  const [breathSecond, setBreathSecond] = useState<number>(0);

  // Sound chime upon mounting break zone
  useEffect(() => {
    sound.playRelaxChime();
  }, []);

  // 1-second interval for countdown timer
  useEffect(() => {
    if (!isRunning) return;
    if (secondsRemaining <= 0) {
      sound.playFanfare();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  // Breathing cycle (4s Inhale, 4s Hold, 4s Exhale, 4s Rest = 16s cycle)
  useEffect(() => {
    if (!isRunning) return;

    const breathTimer = setInterval(() => {
      setBreathSecond((prev) => {
        const next = (prev + 1) % 16;
        if (next < 4) setBreathPhase('Tarik Napas');
        else if (next < 8) setBreathPhase('Tahan');
        else if (next < 12) setBreathPhase('Hembuskan');
        else setBreathPhase('Relaks');
        return next;
      });
    }, 1000);

    return () => clearInterval(breathTimer);
  }, [isRunning]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isComplete = secondsRemaining === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-slate-200 border-b-8 border-b-slate-300 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Soft decorative header tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Sistem Reward 5 Menit
            </span>
            <span className="text-xs font-bold text-slate-500">
              3 Jawaban Benar Beruntun!
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsRunning(!isRunning);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl border-b-2 border-slate-300 transition-all active:translate-y-0.5"
            title={isRunning ? 'Jeda Timer' : 'Lanjutkan Timer'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-700" />}
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Waktunya Istirahat & Relaksasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Hebat! Kamu berhasil menuntaskan materi {topicName ? `"${topicName}"` : 'ini'} dengan sempurna.
            Istirahatkan mata dan pikiran sejenak sebelum petualangan berikutnya.
          </p>
        </div>

        {/* Central Breathing Guide & Digital Timer */}
        <div className="flex flex-col items-center justify-center py-4 my-2">
          {/* Animated Expanding Breathing Circle */}
          <div className="relative flex items-center justify-center w-44 h-44 mb-4">
            {/* Outer pulse wave */}
            <div
              className={`absolute inset-0 rounded-full bg-emerald-100/60 transition-transform duration-1000 ease-in-out ${
                breathPhase === 'Tarik Napas' || breathPhase === 'Tahan'
                  ? 'scale-110'
                  : 'scale-90'
              }`}
            />
            {/* Main breathing circle */}
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 border-b-6 shadow-inner transition-all duration-1000 ease-in-out ${
                breathPhase === 'Tarik Napas'
                  ? 'bg-emerald-500 border-emerald-600 text-white scale-105'
                  : breathPhase === 'Tahan'
                  ? 'bg-teal-500 border-teal-600 text-white scale-105'
                  : breathPhase === 'Hembuskan'
                  ? 'bg-sky-500 border-sky-600 text-white scale-95'
                  : 'bg-indigo-500 border-indigo-600 text-white scale-90'
              }`}
            >
              <span className="text-3xl font-black tracking-wider font-mono tabular-nums">
                {formattedTime}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-90">
                {breathPhase}
              </span>
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-500 text-center">
            Ikuti ritme lingkaran: Tarik napas perlahan, tahan sejenak, lalu hembuskan.
          </p>
        </div>

        {/* Micro Ergonomic Wellness Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-5">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <Eye className="w-5 h-5 mx-auto text-sky-600" />
            <div className="text-xs font-bold text-slate-800">Aturan 20-20-20</div>
            <div className="text-[10px] text-slate-500 leading-tight">
              Pandang objek sejauh 6 meter selama 20 detik.
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <Activity className="w-5 h-5 mx-auto text-emerald-600" />
            <div className="text-xs font-bold text-slate-800">Regangkan Bahu</div>
            <div className="text-[10px] text-slate-500 leading-tight">
              Putar bahu ke belakang 5 kali untuk lemaskan otot.
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <Coffee className="w-5 h-5 mx-auto text-amber-600" />
            <div className="text-xs font-bold text-slate-800">Hidrasi Otak</div>
            <div className="text-[10px] text-slate-500 leading-tight">
              Minum segelas air putih untuk menjaga fokus.
            </div>
          </div>
        </div>

        {/* Action Controls: Voluntary Skip or Finish */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onFinishBreak();
            }}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 border-b-4 active:border-b-0 active:translate-y-1 transition-all ${
              isComplete
                ? 'bg-emerald-500 border-emerald-700 text-white hover:bg-emerald-400'
                : 'bg-amber-500 border-amber-700 text-white hover:bg-amber-400'
            }`}
          >
            {isComplete ? (
              <>
                <Check className="w-5 h-5" />
                <span>Istirahat Selesai · Lanjut Petualangan!</span>
              </>
            ) : (
              <>
                <FastForward className="w-5 h-5" />
                <span>Lewati Istirahat & Lanjut Petualangan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
