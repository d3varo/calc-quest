import React from 'react';
import { Topic, TopicId, UserProgress } from '../types/game';
import { CheckCircle2, Lock, Play, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  topics: Topic[];
  progress: UserProgress;
  onSelectTopic: (topicId: TopicId) => void;
  onStartBreakManually?: () => void;
}

export const QuestMap: React.FC<Props> = ({
  topics,
  progress,
  onSelectTopic,
  onStartBreakManually,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Hero Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 border-b-6 border-b-slate-300 mb-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Petualangan Mandiri
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Prinsip Learning by Playing
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Peta Petualangan Kalkulus
            </h2>
            <p className="text-sm text-slate-600 max-w-md">
              Selesaikan 3 soal per materi (2 angka mentah + 1 soal cerita). Jawab 3 berturut-turut benar untuk membuka waktu istirahat 5 menit!
            </p>
          </div>

          {onStartBreakManually && (
            <button
              onClick={() => {
                sound.playClick();
                onStartBreakManually();
              }}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-2xl border-2 border-amber-300 border-b-4 border-b-amber-400 active:translate-y-1 transition-all"
              title="Mulai Sesi Istirahat Relaksasi"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Zona Istirahat</span>
            </button>
          )}
        </div>
      </div>

      {/* Path List of Learning Modules */}
      <div className="relative space-y-8 sm:space-y-12">
        {/* Connecting Vertical Track */}
        <div className="absolute left-8 sm:left-12 top-10 bottom-10 w-2.5 bg-slate-200 rounded-full -z-0" />

        {topics.map((topic, index) => {
          const topicState = progress.topicProgress[topic.id];
          const isCompleted = topicState?.isCompleted;
          const isUnlocked = topicState?.unlocked ?? (index === 0);

          // Module node color schemes
          const colorStyles = {
            sky: {
              nodeBg: 'bg-sky-500 border-sky-700 hover:bg-sky-400',
              badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
              btnPrimary: 'bg-sky-500 border-b-4 border-sky-700 text-white hover:bg-sky-400',
            },
            indigo: {
              nodeBg: 'bg-indigo-600 border-indigo-800 hover:bg-indigo-500',
              badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
              btnPrimary: 'bg-indigo-600 border-b-4 border-indigo-800 text-white hover:bg-indigo-500',
            },
            emerald: {
              nodeBg: 'bg-emerald-500 border-emerald-700 hover:bg-emerald-400',
              badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
              btnPrimary: 'bg-emerald-500 border-b-4 border-emerald-700 text-white hover:bg-emerald-400',
            },
          }[topic.accentColor as 'sky' | 'indigo' | 'emerald'] || {
            nodeBg: 'bg-emerald-500 border-emerald-700',
            badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            btnPrimary: 'bg-emerald-500 border-b-4 border-emerald-700 text-white',
          };

          return (
            <div
              key={topic.id}
              className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 bg-white p-5 sm:p-6 rounded-3xl border-2 border-b-6 transition-all ${
                isCompleted
                  ? 'border-emerald-200 border-b-emerald-300'
                  : isUnlocked
                  ? 'border-slate-200 border-b-slate-300 shadow-sm'
                  : 'border-slate-200 border-b-slate-200 opacity-75'
              }`}
            >
              {/* Circular Duolingo-style Station Node */}
              <div className="shrink-0 flex items-center justify-center">
                <button
                  disabled={!isUnlocked}
                  onClick={() => {
                    sound.playClick();
                    onSelectTopic(topic.id);
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center font-black text-white text-xl sm:text-2xl border-b-6 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-700 hover:bg-emerald-400 active:translate-y-1'
                      : isUnlocked
                      ? `${colorStyles.nodeBg} active:translate-y-1 shadow-md`
                      : 'bg-slate-300 border-slate-400 cursor-not-allowed'
                  }`}
                  title={topic.name}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  ) : isUnlocked ? (
                    <span>{topic.orderNumber}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-slate-500" />
                  )}
                </button>
              </div>

              {/* Module Description & Content Breakdown */}
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${colorStyles.badgeBg}`}>
                    {topic.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">·</span>
                  <span className="text-xs font-semibold text-slate-500">
                    3 Soal Terpadu
                  </span>
                  {topicState?.consecutiveCorrect > 0 && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      🔥 {topicState.consecutiveCorrect}/3 Benar
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {topic.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {topic.description}
                </p>

                {/* Sub-steps preview */}
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">1. Angka Mentah</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded">2. Penguatan Aljabar</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700">3. Soal Cerita + 3 Nyawa</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                <button
                  disabled={!isUnlocked}
                  onClick={() => {
                    sound.playClick();
                    onSelectTopic(topic.id);
                  }}
                  className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 active:translate-y-1 transition-all ${
                    isCompleted
                      ? 'bg-slate-100 border-2 border-slate-300 border-b-4 border-b-slate-400 text-slate-700 hover:bg-slate-200'
                      : isUnlocked
                      ? `${colorStyles.btnPrimary} active:border-b-0`
                      : 'bg-slate-200 border-b-4 border-slate-300 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Latih Lagi</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Mulai Materi</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
