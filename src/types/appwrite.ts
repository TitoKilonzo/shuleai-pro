// Appwrite Collection Types

export interface User {
  $id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'parent';
  isDemo?: boolean;
  createdAt: string;
  avatar: string;
}

export interface Subscription {
  $id: string;
  userId: string;
  plan: 'monthly' | 'yearly' | 'demo';
  status: 'active' | 'expired' | 'cancelled';
  expiresAt: string;
  mpesaRef?: string;
  isDemo?: boolean;
}

export interface Progress {
  $id: string;
  userId: string;
  gameId: string;
  score: number;
  timeSpent: number;
  completedAt: string;
}

export interface Game {
  $id: string;
  title: string;
  subject: string;
  grade: number;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface AccessCode {
  $id: string;
  code: string;
  plan: string;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  createdBy: string;
}