/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CALCULUS_TOPICS } from './data/calculusData';
import { TopicId, ViewMode, UserProgress } from './types/game';
import { GameHUD } from './components/GameHUD';
import { QuestMap } from './components/QuestMap';
import { QuestionCard } from './components/QuestionCard';
import { BreakModal } from './components/BreakModal';
import { TopicSummaryModal } from './components/TopicSummaryModal';
import { sound } from './utils/audio';

const STORAGE_KEY = 'calc_quest_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  currentTopicId: 'limit',
  topicProgress: {
    limit: { isCompleted: false, highScore: 0, consecutiveCorrect: 0, unlocked: true },
    turunan: { isCompleted: false, highScore: 0, consecutiveCorrect: 0, unlocked: false },
    integral: { isCompleted: false, highScore: 0, consecutiveCorrect: 0, unlocked: false },
  },
  totalXP: 0,
  streak: 0,
  soundEnabled: true,
};

export default function App() {
  // Load progress from localStorage or fallback
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window === 'undefined') return INITIAL_PROGRESS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PROGRESS;
  });

  const [viewMode, setViewMode] = useState<ViewMode>('MAP');
  const [activeTopicId, setActiveTopicId] = useState<TopicId>('limit');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [storyLives, setStoryLives] = useState<number>(3);
  const [sessionXP, setSessionXP] = useState<number>(0);
  const [pendingNextTopicId, setPendingNextTopicId] = useState<TopicId | undefined>(undefined);

  // Sync sound manager enabled flag with progress state
  useEffect(() => {
    sound.enabled = progress.soundEnabled;
  }, [progress.soundEnabled]);

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const activeTopic = CALCULUS_TOPICS.find((t) => t.id === activeTopicId) || CALCULUS_TOPICS[0];
  const activeQuestion = activeTopic.questions[activeQuestionIndex] || activeTopic.questions[0];

  const handleToggleSound = () => {
    setProgress((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleStartTopic = (topicId: TopicId) => {
    setActiveTopicId(topicId);
    setActiveQuestionIndex(0);
    setStoryLives(3);
    setSessionXP(0);
    setViewMode('QUESTION');
  };

  const handleAnswerCorrect = () => {
    const isBossQuestion = activeQuestion.type === 'word_problem';
    const xpGained = isBossQuestion ? 25 : 15;

    setSessionXP((prev) => prev + xpGained);

    setProgress((prev) => {
      const currentTopicState = prev.topicProgress[activeTopicId] || {
        isCompleted: false,
        highScore: 0,
        consecutiveCorrect: 0,
        unlocked: true,
      };

      const newConsecutive = currentTopicState.consecutiveCorrect + 1;
      const newStreak = prev.streak + 1;

      return {
        ...prev,
        streak: newStreak,
        totalXP: prev.totalXP + xpGained,
        topicProgress: {
          ...prev.topicProgress,
          [activeTopicId]: {
            ...currentTopicState,
            consecutiveCorrect: newConsecutive,
          },
        },
      };
    });
  };

  const handleAnswerWrong = () => {
    const isBossQuestion = activeQuestion.type === 'word_problem';

    if (isBossQuestion) {
      setStoryLives((prev) => Math.max(0, prev - 1));
    }

    // Reset consecutive correct on error
    setProgress((prev) => ({
      ...prev,
      streak: 0,
      topicProgress: {
        ...prev.topicProgress,
        [activeTopicId]: {
          ...prev.topicProgress[activeTopicId],
          consecutiveCorrect: 0,
        },
      },
    }));
  };

  const handleRestartStoryQuestion = () => {
    setStoryLives(3);
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < activeTopic.questions.length - 1) {
      const nextIndex = activeQuestionIndex + 1;
      setActiveQuestionIndex(nextIndex);
      // If moving into Question 3 (boss word problem), reset lives to 3
      if (nextIndex === 2) {
        setStoryLives(3);
      }
    } else {
      // Completed all 3 questions in this topic!
      const topicIndex = CALCULUS_TOPICS.findIndex((t) => t.id === activeTopicId);
      const nextTopic = CALCULUS_TOPICS[topicIndex + 1];

      // Mark current topic completed and unlock next topic
      setProgress((prev) => {
        const nextTopicId = nextTopic?.id;
        return {
          ...prev,
          topicProgress: {
            ...prev.topicProgress,
            [activeTopicId]: {
              ...prev.topicProgress[activeTopicId],
              isCompleted: true,
            },
            ...(nextTopicId
              ? {
                  [nextTopicId]: {
                    ...(prev.topicProgress[nextTopicId] || {
                      isCompleted: false,
                      highScore: 0,
                      consecutiveCorrect: 0,
                      unlocked: true,
                    }),
                    unlocked: true,
                  },
                }
              : {}),
          },
        };
      });

      setPendingNextTopicId(nextTopic?.id);

      // Check if earned 3 consecutive correct in this topic
      const currentConsecutive = progress.topicProgress[activeTopicId]?.consecutiveCorrect ?? 0;
      if (currentConsecutive >= 2) { // Just answered the 3rd correctly
        setViewMode('BREAK');
      } else {
        setViewMode('TOPIC_SUMMARY');
      }
    }
  };

  const handleFinishBreak = () => {
    // After break completes or user clicks voluntary skip
    if (pendingNextTopicId) {
      setViewMode('TOPIC_SUMMARY');
    } else {
      setViewMode('MAP');
    }
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Reset seluruh progres petualangan Calc Quest?')) {
      setProgress(INITIAL_PROGRESS);
      setViewMode('MAP');
      setActiveTopicId('limit');
      setActiveQuestionIndex(0);
      setStoryLives(3);
      sound.playClick();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* Universal Top HUD */}
      <GameHUD
        streak={progress.streak}
        totalXP={progress.totalXP}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        onReturnToMap={() => setViewMode('MAP')}
        showMapButton={viewMode === 'QUESTION'}
        lives={storyLives}
        showLives={viewMode === 'QUESTION' && activeQuestion.type === 'word_problem'}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {viewMode === 'MAP' && (
          <QuestMap
            topics={CALCULUS_TOPICS}
            progress={progress}
            onSelectTopic={handleStartTopic}
            onStartBreakManually={() => setViewMode('BREAK')}
          />
        )}

        {viewMode === 'QUESTION' && (
          <QuestionCard
            question={activeQuestion}
            topicName={activeTopic.name}
            questionIndex={activeQuestionIndex}
            totalQuestions={activeTopic.questions.length}
            lives={storyLives}
            onAnswerCorrect={handleAnswerCorrect}
            onAnswerWrong={handleAnswerWrong}
            onRestartStoryQuestion={handleRestartStoryQuestion}
            onNextQuestion={handleNextQuestion}
            onExit={() => setViewMode('MAP')}
          />
        )}

        {viewMode === 'BREAK' && (
          <BreakModal
            topicName={activeTopic.name}
            onFinishBreak={handleFinishBreak}
          />
        )}

        {viewMode === 'TOPIC_SUMMARY' && (
          <TopicSummaryModal
            topic={activeTopic}
            consecutiveCorrect={progress.topicProgress[activeTopicId]?.consecutiveCorrect || 3}
            xpEarned={sessionXP || 55}
            nextTopicId={pendingNextTopicId}
            onContinueToNextTopic={(nextId) => {
              handleStartTopic(nextId);
            }}
            onStartBreak={() => setViewMode('BREAK')}
            onReturnToMap={() => setViewMode('MAP')}
          />
        )}
      </main>

      {/* Clean Footer with Principle Information and Reset */}
      <footer className="w-full border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Calc Quest</span>
            <span>·</span>
            <span style={{ color: '#ffffff' }}>Prinsip Learning by Playing & Reward Istirahat 5 Menit</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetAllProgress}
              className="hover:text-rose-600 transition-colors underline font-medium"
            >
              Reset Progres
            </button>
            <span>·</span>
            <span className="font-mono text-[11px] text-slate-400">Limit · Turunan · Integral</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
