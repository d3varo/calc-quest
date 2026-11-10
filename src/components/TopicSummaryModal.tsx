import React, { useEffect } from 'react';
import { Topic, TopicId } from '../types/game';
import { Trophy, Star, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  topic: Topic;
  consecutiveCorrect: number;
  xpEarned: number;
  nextTopicId?: TopicId;
  onContinueToNextTopic?: (nextId: TopicId) => void;
  onStartBreak: () => void;
  onReturnToMap: () => void;
}

export const TopicSummaryModal: React.FC<Props> = ({
  topic,
  consecutiveCorrect,
  xpEarned,
  nextTopicId,
  onContinueToNextTopic,
  onStartBreak,
  onReturnToMap,
}) => {
  const earnedRewardBreak = consecutiveCorrect >= 3;

  useEffect(() => {
    sound.playFanfare();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl border-2 border-slate-200 border-b-8 border-b-slate-300 p-6 sm:p-8 shadow-2xl relative text-center space-y-6">
        {/* Animated Trophy badge */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-amber-100 border-2 border-amber-300 border-b-6 border-b-amber-400 flex items-center justify-center shadow-md">
          <Trophy className="w-12 h-12 text-amber-600 animate-bounce" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            Materi Tuntas!
          </span>
          <h2
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
          >
            Selamat, Penjelajah Kalkulus!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Kamu telah menuntaskan seluruh 3 tahapan soal pada materi{' '}
            <span className="font-bold text-slate-900">{topic.name}</span>.
          </p>
        </div>

        {/* 3 Mastery Stars */}
        <div className="flex items-center justify-center gap-2 py-1">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border-b-4 transition-all ${
                starIdx <= (earnedRewardBreak ? 3 : 2)
                  ? 'bg-amber-400 border-amber-600 text-white scale-105'
                  : 'bg-slate-100 border-slate-300 text-slate-300'
              }`}
            >
              <Star className="w-6 h-6 fill-current" />
            </div>
          ))}
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Perolehan XP</div>
            <div className="text-lg font-black text-indigo-700 font-mono">+{xpEarned} XP</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Akurasi Beruntun</div>
            <div className="text-lg font-black text-emerald-700 font-mono">
              {consecutiveCorrect}/3 Benar
            </div>
          </div>
        </div>

        {/* Reward Notification Banner */}
        {earnedRewardBreak ? (
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2 text-left">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Luar biasa! 3 soal benar beruntun membuka hak istirahat relaksasi 5 menit!
            </span>
          </div>
        ) : (
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 text-xs font-medium">
            Tingkatkan akurasi untuk membuka reward istirahat 5 menit di materi berikutnya.
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {earnedRewardBreak && (
            <button
              onClick={() => {
                sound.playClick();
                onStartBreak();
              }}
              className="w-full py-3.5 px-6 rounded-2xl font-black text-sm bg-amber-500 hover:bg-amber-400 text-white border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mulai Waktu Istirahat (5 Menit)</span>
            </button>
          )}

          {nextTopicId && onContinueToNextTopic && (
            <button
              onClick={() => {
                sound.playClick();
                onContinueToNextTopic(nextTopicId);
              }}
              className="w-full py-3.5 px-6 rounded-2xl font-black text-sm bg-emerald-500 hover:bg-emerald-400 text-white border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Lanjut ke Materi Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onReturnToMap();
            }}
            className="w-full py-3 px-6 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-slate-600" />
            <span>Kembali ke Peta Petualangan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
