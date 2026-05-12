import { DEMO_QUESTIONS } from './games';

// Learning strands for different subjects
const LEARNING_STRANDS = {
  mathematics: [
    'Number Sense', 'Operations', 'Geometry', 'Measurement', 'Data Analysis',
    'Patterns', 'Algebra', 'Problem Solving', 'Logical Reasoning'
  ],
  literacy: [
    'Reading Comprehension', 'Vocabulary', 'Grammar', 'Writing', 'Phonics',
    'Literature', 'Communication', 'Language Structure', 'Creative Expression'
  ],
  science_technology: [
    'Scientific Inquiry', 'Life Science', 'Physical Science', 'Earth Science',
    'Technology', 'Engineering', 'Environmental Science', 'Health Science'
  ],
  pre_technical: [
    'Basic Tools', 'Materials', 'Safety', 'Measurement', 'Design',
    'Construction', 'Maintenance', 'Technology Integration'
  ],
  cre: [
    'Moral Values', 'Religious Stories', 'Ethics', 'Community', 'Spirituality',
    'Cultural Heritage', 'Service', 'Leadership', 'Character Development'
  ],
  caas: [
    'Physical Fitness', 'Sports Skills', 'Teamwork', 'Leadership', 'Health',
    'Recreation', 'Motor Skills', 'Competition', 'Sportsmanship'
  ],
  integrated_science: [
    'Scientific Method', 'Observation', 'Experimentation', 'Analysis',
    'Life Processes', 'Matter', 'Energy', 'Systems', 'Environment'
  ],
  agriculture: [
    'Crop Production', 'Animal Husbandry', 'Soil Science', 'Farm Management',
    'Agricultural Technology', 'Food Security', 'Sustainable Farming'
  ],
  business_studies: [
    'Business Concepts', 'Entrepreneurship', 'Finance', 'Marketing',
    'Management', 'Economics', 'Business Ethics', 'Commerce'
  ],
  home_science: [
    'Nutrition', 'Food Preparation', 'Home Management', 'Child Development',
    'Family Health', 'Consumer Education', 'Textiles', 'Interior Design'
  ],
  life_skills: [
    'Personal Development', 'Social Skills', 'Decision Making', 'Problem Solving',
    'Emotional Intelligence', 'Communication', 'Leadership', 'Adaptability'
  ],
  religious_education: [
    'Religious Texts', 'Moral Teaching', 'Cultural Values', 'Ethics',
    'Community Service', 'Spiritual Growth', 'Interfaith Understanding'
  ]
};

// Difficulty progression patterns
const DIFFICULTY_PATTERNS = {
  easy: { minQuestions: 5, maxQuestions: 8, timeLimit: 25 },
  medium: { minQuestions: 8, maxQuestions: 12, timeLimit: 20 },
  hard: { minQuestions: 10, maxQuestions: 15, timeLimit: 15 }
};

// Adaptive learning algorithm
class AdaptiveLearningEngine {
  constructor() {
    this.userProfiles = new Map();
    this.dailyUpdates = new Map();
    this.lastUpdateDate = null;
  }

  // Initialize user learning profile
  initializeUserProfile(userId) {
    if (!this.userProfiles.has(userId)) {
      this.userProfiles.set(userId, {
        subjects: {},
        learningStrands: {},
        performanceHistory: [],
        currentDifficulty: 'easy',
        lastActivity: new Date(),
        streakCount: 0,
        totalGamesPlayed: 0
      });
    }
    return this.userProfiles.get(userId);
  }

  // Update user performance data
  updateUserPerformance(userId, subject, score, totalQuestions, timeSpent, strand) {
    const profile = this.initializeUserProfile(userId);
    const percentage = (score / totalQuestions) * 100;

    // Update subject performance
    if (!profile.subjects[subject]) {
      profile.subjects[subject] = {
        gamesPlayed: 0,
        totalScore: 0,
        averageScore: 0,
        bestScore: 0,
        lastPlayed: null
      };
    }

    const subjectData = profile.subjects[subject];
    subjectData.gamesPlayed++;
    subjectData.totalScore += percentage;
    subjectData.averageScore = subjectData.totalScore / subjectData.gamesPlayed;
    subjectData.bestScore = Math.max(subjectData.bestScore, percentage);
    subjectData.lastPlayed = new Date();

    // Update learning strand performance
    if (!profile.learningStrands[strand]) {
      profile.learningStrands[strand] = {
        attempts: 0,
        correctAnswers: 0,
        masteryLevel: 0
      };
    }

    const strandData = profile.learningStrands[strand];
    strandData.attempts++;
    strandData.correctAnswers += score;
    strandData.masteryLevel = (strandData.correctAnswers / strandData.attempts) * 100;

    // Update overall profile
    profile.performanceHistory.push({
      subject,
      score: percentage,
      timeSpent,
      strand,
      timestamp: new Date()
    });

    profile.totalGamesPlayed++;
    profile.lastActivity = new Date();

    // Adjust difficulty based on performance
    this.adjustDifficulty(profile, percentage);

    // Update streak
    this.updateStreak(profile);

    return profile;
  }

  // Adjust difficulty based on recent performance
  adjustDifficulty(profile, recentScore) {
    const recentGames = profile.performanceHistory.slice(-5);
    const averageRecentScore = recentGames.reduce((sum, game) => sum + game.score, 0) / recentGames.length;

    if (averageRecentScore >= 85 && profile.currentDifficulty === 'easy') {
      profile.currentDifficulty = 'medium';
    } else if (averageRecentScore >= 75 && profile.currentDifficulty === 'medium') {
      profile.currentDifficulty = 'hard';
    } else if (averageRecentScore < 60 && profile.currentDifficulty === 'hard') {
      profile.currentDifficulty = 'medium';
    } else if (averageRecentScore < 50 && profile.currentDifficulty === 'medium') {
      profile.currentDifficulty = 'easy';
    }
  }

  // Update learning streak
  updateStreak(profile) {
    const today = new Date().toDateString();
    const lastActivity = new Date(profile.lastActivity).toDateString();

    if (today === lastActivity) {
      // Already played today, maintain streak
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActivity === yesterday.toDateString()) {
      profile.streakCount++;
    } else {
      profile.streakCount = 1;
    }
  }

  // Generate personalized game content
  generatePersonalizedContent(userId, subject, baseQuestions) {
    const profile = this.initializeUserProfile(userId);
    const difficulty = profile.currentDifficulty;

    // Get weak learning strands for this subject
    const subjectStrands = LEARNING_STRANDS[subject] || [];
    const weakStrands = subjectStrands.filter(strand => {
      const strandData = profile.learningStrands[strand];
      return !strandData || strandData.masteryLevel < 70;
    });

    // Select questions based on weak strands and difficulty
    let selectedQuestions = [];

    if (weakStrands.length > 0) {
      // Prioritize questions from weak strands
      weakStrands.forEach(strand => {
        const strandQuestions = baseQuestions.filter(q => q.strand === strand);
        selectedQuestions.push(...this.selectQuestionsByDifficulty(strandQuestions, difficulty));
      });
    }

    // Fill remaining slots with general questions
    if (selectedQuestions.length < DIFFICULTY_PATTERNS[difficulty].minQuestions) {
      const remaining = DIFFICULTY_PATTERNS[difficulty].minQuestions - selectedQuestions.length;
      const generalQuestions = baseQuestions.filter(q => !q.strand || !weakStrands.includes(q.strand));
      selectedQuestions.push(...this.selectQuestionsByDifficulty(generalQuestions, difficulty, remaining));
    }

    // Shuffle and limit to max questions
    selectedQuestions = this.shuffleArray(selectedQuestions);
    const maxQuestions = DIFFICULTY_PATTERNS[difficulty].maxQuestions;
    selectedQuestions = selectedQuestions.slice(0, maxQuestions);

    return {
      questions: selectedQuestions,
      difficulty,
      focusStrands: weakStrands,
      timeLimit: DIFFICULTY_PATTERNS[difficulty].timeLimit
    };
  }

  // Select questions based on difficulty
  selectQuestionsByDifficulty(questions, difficulty, limit = null) {
    let filteredQuestions = [];

    switch (difficulty) {
      case 'easy':
        filteredQuestions = questions.filter(q => q.difficulty === 'easy' || !q.difficulty);
        break;
      case 'medium':
        filteredQuestions = questions.filter(q => q.difficulty === 'easy' || q.difficulty === 'medium' || !q.difficulty);
        break;
      case 'hard':
        filteredQuestions = questions.filter(q => q.difficulty === 'medium' || q.difficulty === 'hard' || !q.difficulty);
        break;
      default:
        filteredQuestions = questions;
    }

    if (limit) {
      filteredQuestions = filteredQuestions.slice(0, limit);
    }

    return filteredQuestions;
  }

  // Shuffle array utility
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Check if daily update is needed
  shouldUpdateDaily() {
    const today = new Date().toDateString();
    return this.lastUpdateDate !== today;
  }

  // Perform daily content update
  performDailyUpdate() {
    if (!this.shouldUpdateDaily()) return false;

    const today = new Date().toDateString();
    this.lastUpdateDate = today;

    // Rotate question order for variety
    Object.keys(DEMO_QUESTIONS).forEach(subject => {
      if (DEMO_QUESTIONS[subject] && Array.isArray(DEMO_QUESTIONS[subject])) {
        DEMO_QUESTIONS[subject] = this.shuffleArray(DEMO_QUESTIONS[subject]);
      }
    });

    // Update stored daily content
    this.dailyUpdates.set(today, {
      timestamp: new Date(),
      updatedSubjects: Object.keys(DEMO_QUESTIONS),
      rotationApplied: true
    });

    return true;
  }

  // Get learning recommendations for user
  getLearningRecommendations(userId) {
    const profile = this.initializeUserProfile(userId);

    const recommendations = {
      nextSubject: null,
      focusStrands: [],
      suggestedDifficulty: profile.currentDifficulty,
      streakBonus: profile.streakCount >= 7
    };

    // Find weakest subject
    let weakestSubject = null;
    let lowestAverage = 100;

    Object.entries(profile.subjects).forEach(([subject, data]) => {
      if (data.averageScore < lowestAverage) {
        lowestAverage = data.averageScore;
        weakestSubject = subject;
      }
    });

    recommendations.nextSubject = weakestSubject;

    // Find weak strands in that subject
    if (weakestSubject && LEARNING_STRANDS[weakestSubject]) {
      recommendations.focusStrands = LEARNING_STRANDS[weakestSubject].filter(strand => {
        const strandData = profile.learningStrands[strand];
        return !strandData || strandData.masteryLevel < 70;
      });
    }

    return recommendations;
  }

  // Get user statistics
  getUserStats(userId) {
    const profile = this.initializeUserProfile(userId);

    return {
      totalGamesPlayed: profile.totalGamesPlayed,
      currentStreak: profile.streakCount,
      averageScore: Object.values(profile.subjects).reduce((sum, subj) => sum + subj.averageScore, 0) / Object.keys(profile.subjects).length || 0,
      subjectsMastered: Object.values(profile.subjects).filter(subj => subj.averageScore >= 80).length,
      currentDifficulty: profile.currentDifficulty,
      lastActivity: profile.lastActivity
    };
  }
}

// Create singleton instance
const adaptiveEngine = new AdaptiveLearningEngine();

// Game Update Service
export const gameUpdateService = {
  // Initialize daily updates
  initializeDailyUpdates() {
    adaptiveEngine.performDailyUpdate();
  },

  // Get personalized questions for a game
  getPersonalizedQuestions(userId, subject, gameId) {
    const baseQuestions = DEMO_QUESTIONS[subject] || [];
    return adaptiveEngine.generatePersonalizedContent(userId, subject, baseQuestions);
  },

  // Update user performance after game completion
  updateUserPerformance(userId, subject, score, totalQuestions, timeSpent, strand = null) {
    return adaptiveEngine.updateUserPerformance(userId, subject, score, totalQuestions, timeSpent, strand);
  },

  // Get learning recommendations
  getLearningRecommendations(userId) {
    return adaptiveEngine.getLearningRecommendations(userId);
  },

  // Get user statistics
  getUserStats(userId) {
    return adaptiveEngine.getUserStats(userId);
  },

  // Check if daily update occurred
  checkDailyUpdate() {
    return adaptiveEngine.performDailyUpdate();
  },

  // Get learning strands for a subject
  getLearningStrands(subject) {
    return LEARNING_STRANDS[subject] || [];
  }
};

export default gameUpdateService;