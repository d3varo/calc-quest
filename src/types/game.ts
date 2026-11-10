export type TopicId = 'limit' | 'turunan' | 'integral';

export type QuestionType = 'numeric_raw' | 'word_problem';

export type IllustrationType = 'limit_rocket' | 'turunan_racecar' | 'integral_drone';

export interface Option {
  id: string;
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  topicId: TopicId;
  type: QuestionType;
  indexInTopic: number; // 0, 1 (numeric raw), 2 (word problem)
  stageLabel: string; // e.g. "Soal 1: Fondasi Angka", "Soal 3: Tantangan Soal Cerita"
  title: string;
  prompt: string;
  contextStory?: string;
  formulaDisplay?: string;
  illustrationType?: IllustrationType;
  options: Option[];
  correctOptionId: string;
  explanationSteps: string[];
  conceptTip: string;
}

export interface Topic {
  id: TopicId;
  orderNumber: string; // '01', '02', '03'
  name: string;
  badge: string;
  accentColor: string; // Tailwind color token base, e.g. 'emerald', 'sky', 'indigo'
  description: string;
  questions: Question[];
}

export type ViewMode = 'MAP' | 'QUESTION' | 'BREAK' | 'TOPIC_SUMMARY';

export interface UserProgress {
  currentTopicId: TopicId;
  topicProgress: Record<
    TopicId,
    {
      isCompleted: boolean;
      highScore: number;
      consecutiveCorrect: number; // max 3 to trigger break
      unlocked: boolean;
    }
  >;
  totalXP: number;
  streak: number;
  soundEnabled: boolean;
  lastCompletedDate?: string;
}
