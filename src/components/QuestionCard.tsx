import React, { useState, useEffect } from 'react';
import { Question, Option } from '../types/game';
import { HandDrawnIllustration } from './HandDrawnIllustration';
import { sound } from '../utils/audio';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle, Heart, RotateCcw } from 'lucide-react';

interface Props {
  question: Question;
  topicName: string;
  questionIndex: number; // 0, 1, 2
  totalQuestions: number; // 3
  lives: number; // 3
  onAnswerCorrect: () => void;
  onAnswerWrong: () => void;
  onRestartStoryQuestion?: () => void;
  onNextQuestion: () => void;
  onExit: () => void;
}

export const QuestionCard: React.FC<Props> = ({
  question,
  topicName,
  questionIndex,
  totalQuestions,
  lives,
  onAnswerCorrect,
  onAnswerWrong,
  onRestartStoryQuestion,
  onNextQuestion,
  onExit,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Reset local selection when question changes
  useEffect(() => {
    setSelectedOptionId(null);
    setHasChecked(false);
    setShowExplanation(false);
  }, [question.id]);

  // Keyboard shortcut listener (1-4 or A-D, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if in inputs or modified keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (!hasChecked) {
        if (['1', 'a', 'A'].includes(e.key) && question.options[0]) {
          handleSelect(question.options[0].id);
        } else if (['2', 'b', 'B'].includes(e.key) && question.options[1]) {
          handleSelect(question.options[1].id);
        } else if (['3', 'c', 'C'].includes(e.key) && question.options[2]) {
          handleSelect(question.options[2].id);
        } else if (['4', 'd', 'D'].includes(e.key) && question.options[3]) {
          handleSelect(question.options[3].id);
        } else if (e.key === 'Enter' && selectedOptionId) {
          handleCheck();
        }
      } else {
        if (e.key === 'Enter') {
          handleContinue();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasChecked, selectedOptionId, question.options]);

  const handleSelect = (optionId: string) => {
    if (hasChecked) return;
    sound.playClick();
    setSelectedOptionId(optionId);
  };

  const isStoryQuestion = question.type === 'word_problem';
  const selectedOption = question.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;
  const isOutOfLives = isStoryQuestion && lives <= 0;

  const handleCheck = () => {
    if (!selectedOptionId || hasChecked) return;
    setHasChecked(true);

    if (isCorrect) {
      sound.playCorrect();
      onAnswerCorrect();
    } else {
      sound.playIncorrect();
      onAnswerWrong();
    }
  };

  const handleContinue = () => {
    if (isOutOfLives) {
      // Lives exhausted on story boss question -> trigger reset
      if (onRestartStoryQuestion) {
        onRestartStoryQuestion();
      }
      return;
    }

    if (isCorrect) {
      onNextQuestion();
    } else {
      // For raw numbers: allow retry immediately or proceed to learn
      setHasChecked(false);
      setSelectedOptionId(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Top Session Progress Bar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <button
          onClick={() => {
            sound.playClick();
            onExit();
          }}
          className="text-slate-400 hover:text-slate-700 font-extrabold text-xl p-1"
          title="Tutup & Kembali ke Peta"
        >
          ✕
        </button>

        {/* 3-Segment Duolingo-style Progress Bar */}
        <div className="flex-1 flex gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`h-3.5 flex-1 rounded-full transition-all duration-300 ${
                idx < questionIndex
                  ? 'bg-emerald-500'
                  : idx === questionIndex
                  ? hasChecked && isCorrect
                    ? 'bg-emerald-500'
                    : 'bg-emerald-300'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Lives indicator (displayed only on Story Boss Question 3) */}
        {isStoryQuestion ? (
          <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl text-rose-600 font-extrabold text-xs">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{lives}</span>
          </div>
        ) : (
          <div className="text-[11px] font-bold text-slate-400 px-2">
            Latihan Bebas
          </div>
        )}
      </div>

      {/* Question Header & Stage Tag */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            {topicName}
          </span>
          <span className="text-slate-300">·</span>
          <span
            className={`text-xs font-black uppercase px-2 py-0.5 rounded-md ${
              isStoryQuestion
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {question.stageLabel}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {question.title}
        </h2>
      </div>

      {/* Context Story (if Question 3) */}
      {question.contextStory && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-3">
          <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            Konteks Penerapan Dunia Nyata:
          </p>
          {question.contextStory}
        </div>
      )}

      {/* Hand-Drawn SVG Visual for Word Problem */}
      {question.illustrationType && (
        <HandDrawnIllustration type={question.illustrationType} />
      )}

      {/* Question Prompt */}
      <div className="my-2">
        <p className="text-sm sm:text-base font-bold text-slate-800">
          {question.prompt}
        </p>
        {question.formulaDisplay && (
          <div className="my-3 p-3 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-sm sm:text-base text-center font-bold tracking-wider shadow-inner">
            {question.formulaDisplay}
          </div>
        )}
      </div>

      {/* 4 Chunky Multiple Choice Cards (Duolingo Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;

          // Card styles based on checked status
          let cardStyle = 'bg-white border-2 border-slate-200 border-b-5 border-b-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
          let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

          if (isSelected && !hasChecked) {
            cardStyle = 'bg-sky-50 border-2 border-sky-500 border-b-5 border-b-sky-600 text-sky-900 scale-[1.01]';
            badgeStyle = 'bg-sky-500 text-white border-sky-600';
          } else if (hasChecked) {
            if (option.isCorrect) {
              cardStyle = 'bg-emerald-50 border-2 border-emerald-500 border-b-5 border-b-emerald-600 text-emerald-950 font-bold';
              badgeStyle = 'bg-emerald-500 text-white border-emerald-600';
            } else if (isSelected && !option.isCorrect) {
              cardStyle = 'bg-rose-50 border-2 border-rose-400 border-b-5 border-b-rose-500 text-rose-900';
              badgeStyle = 'bg-rose-500 text-white border-rose-600';
            } else {
              cardStyle = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
              badgeStyle = 'bg-slate-200 text-slate-500 border-slate-300';
            }
          }

          return (
            <button
              key={option.id}
              disabled={hasChecked}
              onClick={() => handleSelect(option.id)}
              className={`w-full min-h-[58px] p-4 rounded-2xl flex items-center gap-3 text-left transition-all active:translate-y-1 active:border-b-0 ${cardStyle}`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border ${badgeStyle}`}>
                {option.label}
              </span>
              <span className="text-sm sm:text-base font-bold font-mono tracking-tight flex-1">
                {option.text}
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                [{index + 1}]
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1" />

      {/* Floating / Sticky Bottom Evaluation Drawer (Duolingo Style) */}
      <div
        className={`w-full mt-6 -mx-4 px-4 sm:px-6 py-4 rounded-3xl border-2 transition-all ${
          !hasChecked
            ? 'bg-transparent border-transparent'
            : isCorrect
            ? 'bg-emerald-100 border-emerald-300 border-b-6 border-b-emerald-400 shadow-lg'
            : 'bg-rose-100 border-rose-300 border-b-6 border-b-rose-400 shadow-lg'
        }`}
      >
        {!hasChecked ? (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              Tekan angka 1-4 pada keyboard untuk memilih opsi.
            </span>
            <button
              disabled={!selectedOptionId}
              onClick={handleCheck}
              className={`w-full sm:w-auto ml-auto px-8 py-3.5 rounded-2xl font-black text-base transition-all border-b-5 active:border-b-0 active:translate-y-1 ${
                selectedOptionId
                  ? 'bg-emerald-500 border-emerald-700 text-white hover:bg-emerald-400'
                  : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
              }`}
            >
              Periksa Jawaban
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                {isCorrect ? (
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <XCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3
                    className={`text-lg font-black tracking-tight ${
                      isCorrect ? 'text-emerald-900' : 'text-rose-900'
                    }`}
                  >
                    {isCorrect ? 'Luar Biasa! Jawabanmu Benar' : 'Ups, Kurang Tepat!'}
                  </h3>
                  <p
                    className={`text-xs font-semibold ${
                      isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isCorrect
                      ? '+15 XP didapatkan! Konsep kalkulus dipahami dengan baik.'
                      : isStoryQuestion
                      ? lives > 0
                        ? `Kamu kehilangan 1 nyawa. Sisa nyawa: ${lives}/3.`
                        : 'Nyawa untuk soal cerita ini habis! Pelajari pembahasan berikut.'
                      : 'Untuk soal angka mentah, tidak ada penalti nyawa. Silakan pelajari langkahnya.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Continue or Retry */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-4 py-3 rounded-2xl font-bold text-xs bg-white/80 hover:bg-white text-slate-700 border border-slate-300 flex items-center gap-1.5 active:translate-y-0.5"
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>{showExplanation ? 'Tutup Solusi' : 'Lihat Pembahasan'}</span>
                </button>

                <button
                  onClick={handleContinue}
                  className={`flex-1 sm:flex-none px-7 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all ${
                    isCorrect
                      ? 'bg-emerald-600 border-emerald-800 hover:bg-emerald-500'
                      : isOutOfLives
                      ? 'bg-rose-600 border-rose-800 hover:bg-rose-500'
                      : 'bg-rose-500 border-rose-700 hover:bg-rose-400'
                  }`}
                >
                  {isOutOfLives ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Ulangi Soal Cerita</span>
                    </>
                  ) : isCorrect ? (
                    <>
                      <span>Lanjut</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Coba Lagi</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step-by-Step Breakdown Drawer */}
            {(showExplanation || !isCorrect) && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 animate-fade-in text-slate-800 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 flex items-center justify-between border-b pb-2">
                  <span className="flex items-center gap-1.5 text-indigo-700">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Pembahasan Langkah Terurai:
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Kunci: Opsi {question.options.find((o) => o.id === question.correctOptionId)?.label} ({question.options.find((o) => o.id === question.correctOptionId)?.text})
                  </span>
                </div>

                <div className="space-y-1.5 font-medium text-slate-700">
                  {question.explanationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-amber-900 text-xs font-semibold">
                  {question.conceptTip}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
