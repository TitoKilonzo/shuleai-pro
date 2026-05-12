// ─── ShuleAI Pro: 100+ CBC-Aligned Educational Games ───────────────

export const SUBJECTS = {
  EARLY_MATH: { id: 'early_math', label: 'Early Mathematics', color: '#F97316', grades: 'PP1–Grade 3' },
  LITERACY:   { id: 'literacy',   label: 'Literacy & Language', color: '#EC4899', grades: 'PP1–Grade 3' },
  MATHEMATICS: { id: 'mathematics', label: 'Mathematics', color: '#3B82F6', grades: 'Grade 4–9' },
  INT_SCIENCE: { id: 'integrated_science', label: 'Integrated Science', color: '#10B981', grades: 'Grade 7–9' },
  SCI_TECH: { id: 'science_technology', label: 'Science & Technology', color: '#06B6D4', grades: 'Grade 4–6' },
  PRETECH: { id: 'pre_technical', label: 'Pre-Technical Studies', color: '#8B5CF6', grades: 'Grade 7–9' },
  CRE: { id: 'cre', label: 'CRE', color: '#EC4899', grades: 'All Grades' },
  CAAS: { id: 'caas', label: 'Creative Arts & Social Studies', color: '#F59E0B', grades: 'All Grades' },
  AGRICULTURE: { id: 'agriculture', label: 'Agriculture', color: '#84CC16', grades: 'Grade 4–9' },
};

export const DIFFICULTIES = {
  Easy:   { label: 'Easy',   color: 'bg-green-100 text-green-700',  colorHex: '#16A34A' },
  Medium: { label: 'Medium', color: 'bg-amber-100 text-amber-700',  colorHex: '#D97706' },
  Hard:   { label: 'Hard',   color: 'bg-red-100 text-red-700',      colorHex: '#DC2626' },
};

export const GAME_TYPES = {
  quiz:       { label: 'Quiz' },
  simulation: { label: 'Simulation' },
  puzzle:     { label: 'Puzzle' },
  adventure:  { label: 'Adventure' },
  builder:    { label: 'Builder' },
};

export const GAMES = [
  // ── Early Mathematics – PP1 to Grade 3 (14 games) ──────────────
  {
    id: 'g_em01', subject: 'early_math', title: 'Counting Safari', difficulty: 'Easy',
    grade: ['PP1', 'PP2'], duration: '8 min', points: 60, type: 'adventure',
    description: 'Join animals on a safari adventure and learn to count from 1 to 20.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
  },
  {
    id: 'g_em02', subject: 'early_math', title: 'Shape World', difficulty: 'Easy',
    grade: ['PP1', 'PP2', 'Grade 1'], duration: '8 min', points: 60, type: 'puzzle',
    description: 'Explore a colourful world of circles, squares, triangles and rectangles.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  },
  {
    id: 'g_em03', subject: 'early_math', title: 'Number Train', difficulty: 'Easy',
    grade: ['PP2', 'Grade 1'], duration: '10 min', points: 70, type: 'adventure',
    description: 'Help the number train reach the station by filling in the missing carriages.',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80',
  },
  {
    id: 'g_em04', subject: 'early_math', title: 'Market Day', difficulty: 'Easy',
    grade: ['Grade 1', 'Grade 2'], duration: '12 min', points: 80, type: 'simulation',
    description: 'Visit the Kenyan market and practice adding and subtracting prices.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  },
  {
    id: 'g_em05', subject: 'early_math', title: 'Times Tables Race', difficulty: 'Medium',
    grade: ['Grade 2', 'Grade 3'], duration: '12 min', points: 90, type: 'quiz',
    description: 'Race to the finish line by answering multiplication tables quickly.',
    image: 'https://images.unsplash.com/photo-1596495578221-81765c92842e?w=800&q=80',
  },
  {
    id: 'g_em06', subject: 'early_math', title: 'Fraction Feast', difficulty: 'Medium',
    grade: ['Grade 3'], duration: '12 min', points: 100, type: 'puzzle',
    description: 'Share food fairly at a feast by dividing into halves, quarters, and thirds.',
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80',
  },
  {
    id: 'g_em07', subject: 'early_math', title: 'Measurement Mix-Up', difficulty: 'Easy',
    grade: ['Grade 2', 'Grade 3'], duration: '10 min', points: 80, type: 'simulation',
    description: 'Use rulers, scales and measuring cups to solve everyday problems.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },

  // ── Literacy & Language – PP1 to Grade 3 (12 games) ────────────
  {
    id: 'g_lit01', subject: 'literacy', title: 'Alphabet Adventure', difficulty: 'Easy',
    grade: ['PP1', 'PP2'], duration: '8 min', points: 60, type: 'adventure',
    description: 'Travel through the alphabet jungle, meeting animals for each letter.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
  },
  {
    id: 'g_lit02', subject: 'literacy', title: 'Phonics Playground', difficulty: 'Easy',
    grade: ['PP1', 'PP2', 'Grade 1'], duration: '10 min', points: 70, type: 'quiz',
    description: 'Match sounds to letters and build your first words in this fun playground.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  },
  {
    id: 'g_lit03', subject: 'literacy', title: 'Story Builder', difficulty: 'Easy',
    grade: ['Grade 1', 'Grade 2'], duration: '12 min', points: 80, type: 'builder',
    description: 'Pick characters, settings and events to build and read your own Kenyan story.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
  },
  {
    id: 'g_lit04', subject: 'literacy', title: 'Word Hunt', difficulty: 'Medium',
    grade: ['Grade 2', 'Grade 3'], duration: '10 min', points: 90, type: 'puzzle',
    description: 'Hunt for hidden words in a grid and build your English vocabulary.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
  },
  {
    id: 'g_lit05', subject: 'literacy', title: 'Kiswahili Quest', difficulty: 'Easy',
    grade: ['PP2', 'Grade 1', 'Grade 2'], duration: '10 min', points: 80, type: 'adventure',
    description: 'Learn Kiswahili words and phrases through an exciting quest across Kenya.',
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b01ac6e2?w=800&q=80',
  },
  {
    id: 'g_lit06', subject: 'literacy', title: 'Grammar Galaxy', difficulty: 'Medium',
    grade: ['Grade 3'], duration: '12 min', points: 100, type: 'quiz',
    description: 'Fly through the galaxy fixing sentences, nouns, verbs and punctuation.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
  },
  // ── Mathematics (15 games) ──────────────────────────────────────
  {
    id: 'g001', subject: 'mathematics', title: 'Number Quest', difficulty: 'Easy',
    grade: [4, 5], description: 'Master counting, addition & subtraction through an adventure quest.',
    image: 'https://images.unsplash.com/photo-1596495578221-81765c92842e?w=800&q=80',
    plays: 12840, rating: 4.8, duration: '10 min', points: 100,
    skills: ['Counting', 'Addition', 'Subtraction'], type: 'quiz',
  },
  {
    id: 'g002', subject: 'mathematics', title: 'Fraction Fighter', difficulty: 'Medium',
    grade: [5, 6], description: 'Battle fractions and win by understanding numerators & denominators.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
    plays: 9320, rating: 4.7, duration: '12 min', points: 150,
    skills: ['Fractions', 'Equivalence'], type: 'quiz',
  },
  {
    id: 'g003', subject: 'mathematics', title: 'Geometry Galaxy', difficulty: 'Medium',
    grade: [6, 7], description: 'Navigate through space identifying shapes, angles, and symmetry.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    plays: 7650, rating: 4.6, duration: '15 min', points: 150,
    skills: ['Shapes', 'Angles', 'Symmetry'], type: 'adventure',
  },
  {
    id: 'g004', subject: 'mathematics', title: 'Speed Math Challenge', difficulty: 'Hard',
    grade: [7, 8, 9], description: 'Race against time solving multi-step arithmetic problems.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    plays: 15230, rating: 4.9, duration: '8 min', points: 200,
    skills: ['Arithmetic', 'Speed', 'Accuracy'], type: 'quiz',
  },
  {
    id: 'g005', subject: 'mathematics', title: 'Division Derby', difficulty: 'Medium',
    grade: [4, 5, 6], description: 'Race your horse to the finish by solving division challenges.',
    image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=800&q=80',
    plays: 8100, rating: 4.5, duration: '10 min', points: 120,
    skills: ['Division', 'Remainders'], type: 'adventure',
  },
  {
    id: 'g006', subject: 'mathematics', title: 'Algebra Arena', difficulty: 'Hard',
    grade: [8, 9], description: 'Enter the arena and solve algebraic equations to defeat opponents.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    plays: 6420, rating: 4.7, duration: '18 min', points: 250,
    skills: ['Algebra', 'Equations'], type: 'quiz',
  },
  {
    id: 'g007', subject: 'mathematics', title: 'Times Table Typhoon', difficulty: 'Easy',
    grade: [4, 5], description: 'Survive the typhoon by answering multiplication tables rapidly.',
    image: 'https://images.unsplash.com/photo-1620310237190-7813137b7dd1?w=800&q=80',
    plays: 21000, rating: 4.9, duration: '7 min', points: 80,
    skills: ['Multiplication', 'Tables'], type: 'quiz',
  },
  {
    id: 'g008', subject: 'mathematics', title: 'Decimal Dash', difficulty: 'Medium',
    grade: [6, 7], description: 'Sprint through decimals, comparing and converting with precision.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    plays: 5900, rating: 4.5, duration: '12 min', points: 140,
    skills: ['Decimals', 'Conversion'], type: 'quiz',
  },
  {
    id: 'g009', subject: 'mathematics', title: 'Word Problem Wizard', difficulty: 'Hard',
    grade: [7, 8, 9], description: 'Cast spells by decoding and solving real-world word problems.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    plays: 7200, rating: 4.6, duration: '20 min', points: 220,
    skills: ['Problem Solving', 'Reasoning'], type: 'adventure',
  },
  {
    id: 'g010', subject: 'mathematics', title: 'Shape Sorter Pro', difficulty: 'Easy',
    grade: [4], description: 'Sort and classify 2D & 3D shapes in this fast-paced puzzle game.',
    image: 'https://images.unsplash.com/photo-1558023784-f834125b27a3?w=800&q=80',
    plays: 11300, rating: 4.7, duration: '8 min', points: 90,
    skills: ['Shapes', 'Classification'], type: 'puzzle',
  },
  {
    id: 'g011', subject: 'mathematics', title: 'Number Patterns Pro', difficulty: 'Medium',
    grade: [5, 6, 7], description: 'Spot and complete number sequences and patterns.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    plays: 6800, rating: 4.5, duration: '10 min', points: 130,
    skills: ['Patterns', 'Sequences'], type: 'puzzle',
  },
  {
    id: 'g012', subject: 'mathematics', title: 'Prime Hunter', difficulty: 'Hard',
    grade: [7, 8], description: 'Hunt down prime numbers and factors before time runs out.',
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80',
    plays: 4500, rating: 4.6, duration: '12 min', points: 180,
    skills: ['Prime Numbers', 'Factors'], type: 'quiz',
  },
  {
    id: 'g013', subject: 'mathematics', title: 'Ratio Race', difficulty: 'Medium',
    grade: [6, 7, 8], description: 'Compete in a race by solving ratio and proportion challenges.',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800&q=80',
    plays: 5300, rating: 4.5, duration: '14 min', points: 140,
    skills: ['Ratios', 'Proportions'], type: 'adventure',
  },
  {
    id: 'g014', subject: 'mathematics', title: 'Percentage Power', difficulty: 'Medium',
    grade: [6, 7, 8, 9], description: 'Power up by calculating percentages in real-world contexts.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    plays: 7800, rating: 4.7, duration: '12 min', points: 150,
    skills: ['Percentages', 'Application'], type: 'quiz',
  },
  {
    id: 'g015', subject: 'mathematics', title: 'Statistics Surge', difficulty: 'Hard',
    grade: [8, 9], description: 'Analyze data, draw graphs, and interpret statistical information.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    plays: 3900, rating: 4.6, duration: '20 min', points: 230,
    skills: ['Statistics', 'Data Analysis'], type: 'quiz',
  },

  // ── Integrated Science Gr 7–9 (9 games) ───────────────────────
  {
    id: 'g016', subject: 'integrated_science', title: 'Cell Explorer', difficulty: 'Medium',
    grade: [7, 8], description: 'Journey inside living cells and identify organelles and their functions.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    plays: 8900, rating: 4.8, duration: '15 min', points: 160,
    skills: ['Cell Biology', 'Organelles'], type: 'simulation',
  },
  {
    id: 'g017', subject: 'integrated_science', title: 'Ecosystem Builder', difficulty: 'Hard',
    grade: [8, 9], description: 'Build balanced ecosystems and manage food webs and energy flow.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    plays: 6100, rating: 4.7, duration: '25 min', points: 250,
    skills: ['Ecosystems', 'Food Webs'], type: 'builder',
  },
  {
    id: 'g018', subject: 'integrated_science', title: 'Chemistry Lab Simulator', difficulty: 'Hard',
    grade: [8, 9], description: 'Safely perform chemical reactions and observe changes virtually.',
    image: 'https://images.unsplash.com/photo-1541170311-53697e884074?w=800&q=80',
    plays: 7400, rating: 4.9, duration: '20 min', points: 240,
    skills: ['Chemistry', 'Reactions', 'Safety'], type: 'simulation',
  },
  {
    id: 'g019', subject: 'integrated_science', title: 'Forces & Motion Master', difficulty: 'Medium',
    grade: [7, 8], description: 'Experiment with forces, gravity, friction and Newton\'s laws.',
    image: 'https://images.unsplash.com/photo-1620310237190-7813137b7dd1?w=800&q=80',
    plays: 9200, rating: 4.8, duration: '15 min', points: 160,
    skills: ['Forces', 'Motion', 'Physics'], type: 'simulation',
  },
  {
    id: 'g020', subject: 'integrated_science', title: 'Human Body Quest', difficulty: 'Medium',
    grade: [7, 8, 9], description: 'Explore the human body systems and their interrelationships.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    plays: 11500, rating: 4.9, duration: '18 min', points: 180,
    skills: ['Anatomy', 'Body Systems'], type: 'adventure',
  },
  {
    id: 'g021', subject: 'integrated_science', title: 'Genetics Quest', difficulty: 'Hard',
    grade: [9], description: 'Unravel DNA, inheritance patterns, and genetic traits.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    plays: 4200, rating: 4.7, duration: '22 min', points: 260,
    skills: ['Genetics', 'DNA', 'Heredity'], type: 'adventure',
  },
  {
    id: 'g022', subject: 'integrated_science', title: 'Energy Flow Challenge', difficulty: 'Medium',
    grade: [8, 9], description: 'Trace energy transformations from sun to organisms in ecosystems.',
    image: 'https://images.unsplash.com/photo-1466611653911-95282fc3656b?w=800&q=80',
    plays: 5600, rating: 4.6, duration: '16 min', points: 150,
    skills: ['Energy', 'Ecology'], type: 'quiz',
  },
  {
    id: 'g023', subject: 'integrated_science', title: 'Matter States Challenge', difficulty: 'Easy',
    grade: [7], description: 'Explore solids, liquids and gases through interactive experiments.',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80',
    plays: 9800, rating: 4.8, duration: '12 min', points: 100,
    skills: ['States of Matter', 'Changes'], type: 'simulation',
  },
  {
    id: 'g024', subject: 'integrated_science', title: 'Digestive System Dive', difficulty: 'Medium',
    grade: [7, 8], description: 'Follow food through the digestive system in this immersive journey.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    plays: 8300, rating: 4.7, duration: '15 min', points: 150,
    skills: ['Digestion', 'Nutrition'], type: 'adventure',
  },

  // ── Science & Technology Gr 4–6 (6 games) ─────────────────────
  {
    id: 'g025', subject: 'science_technology', title: 'Simple Machines Workshop', difficulty: 'Easy',
    grade: [4, 5], description: 'Build with levers, pulleys, and wheels in a virtual workshop.',
    image: 'https://images.unsplash.com/photo-1581092921461-7031e2bcd0cb?w=400&q=80',
    plays: 10200, rating: 4.8, duration: '12 min', points: 100,
    skills: ['Machines', 'Engineering'], type: 'builder',
  },
  {
    id: 'g026', subject: 'science_technology', title: 'Plant Life Cycle Lab', difficulty: 'Easy',
    grade: [4, 5], description: 'Grow plants from seed to flower and learn each lifecycle stage.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    plays: 13400, rating: 4.9, duration: '10 min', points: 90,
    skills: ['Plants', 'Life Cycles'], type: 'simulation',
  },
  {
    id: 'g027', subject: 'science_technology', title: 'Weather Watcher', difficulty: 'Easy',
    grade: [4, 5, 6], description: 'Observe, record and predict weather patterns like a meteorologist.',
    image: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=400&q=80',
    plays: 8700, rating: 4.6, duration: '10 min', points: 90,
    skills: ['Weather', 'Climate', 'Data'], type: 'simulation',
  },
  {
    id: 'g028', subject: 'science_technology', title: 'Animal Classification Safari', difficulty: 'Medium',
    grade: [5, 6], description: 'Go on safari and classify animals by their characteristics.',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=80',
    plays: 12100, rating: 4.8, duration: '14 min', points: 140,
    skills: ['Classification', 'Animals'], type: 'adventure',
  },
  {
    id: 'g029', subject: 'science_technology', title: 'Light & Sound Explorer', difficulty: 'Medium',
    grade: [5, 6], description: 'Investigate properties of light and sound through experiments.',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=400&q=80',
    plays: 7300, rating: 4.7, duration: '16 min', points: 140,
    skills: ['Light', 'Sound', 'Physics'], type: 'simulation',
  },
  {
    id: 'g030', subject: 'science_technology', title: 'Soil Science Simulator', difficulty: 'Medium',
    grade: [4, 5, 6], description: 'Test soil types, fertility and learn soil conservation methods.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    plays: 6200, rating: 4.5, duration: '12 min', points: 120,
    skills: ['Soil', 'Conservation'], type: 'simulation',
  },

  // ── Pre-Technical Studies Gr 7–9 (5 games) ────────────────────
  {
    id: 'g031', subject: 'pre_technical', title: 'Wood Workshop Sim', difficulty: 'Medium',
    grade: [7, 8, 9], description: 'Design and virtually craft wood projects using proper tools and techniques.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    plays: 5800, rating: 4.6, duration: '20 min', points: 160,
    skills: ['Woodwork', 'Design', 'Tools'], type: 'simulation',
  },
  {
    id: 'g032', subject: 'pre_technical', title: 'Metal Works Challenge', difficulty: 'Hard',
    grade: [8, 9], description: 'Learn metalwork fundamentals through interactive challenges.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    plays: 3900, rating: 4.5, duration: '18 min', points: 200,
    skills: ['Metalwork', 'Materials'], type: 'quiz',
  },
  {
    id: 'g033', subject: 'pre_technical', title: 'Circuit Builder', difficulty: 'Hard',
    grade: [8, 9], description: 'Design and test electrical circuits safely in a virtual lab.',
    image: 'https://images.unsplash.com/photo-1581092921461-7031e2bcd0cb?w=400&q=80',
    plays: 7100, rating: 4.8, duration: '22 min', points: 240,
    skills: ['Electricity', 'Circuits'], type: 'builder',
  },
  {
    id: 'g034', subject: 'pre_technical', title: 'Design & Drawing Studio', difficulty: 'Medium',
    grade: [7, 8], description: 'Create technical drawings and design projects step by step.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    plays: 6300, rating: 4.6, duration: '18 min', points: 160,
    skills: ['Drawing', 'Design'], type: 'builder',
  },
  {
    id: 'g035', subject: 'pre_technical', title: 'Technology Timeline Trek', difficulty: 'Easy',
    grade: [7], description: 'Travel through time and discover how technology has evolved.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    plays: 8900, rating: 4.7, duration: '12 min', points: 100,
    skills: ['Technology History', 'Innovation'], type: 'adventure',
  },

  // ── CRE (5 games) ──────────────────────────────────────────────
  {
    id: 'g036', subject: 'cre', title: 'Bible Stories Quest', difficulty: 'Easy',
    grade: [4, 5, 6, 7, 8, 9], description: 'Explore key Bible narratives through interactive storytelling.',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=80',
    plays: 14200, rating: 4.9, duration: '12 min', points: 100,
    skills: ['Scripture', 'Narratives'], type: 'adventure',
  },
  {
    id: 'g037', subject: 'cre', title: 'Morality & Values Explorer', difficulty: 'Medium',
    grade: [5, 6, 7, 8, 9], description: 'Navigate moral dilemmas and discover Christian values in action.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    plays: 9100, rating: 4.7, duration: '15 min', points: 140,
    skills: ['Ethics', 'Values', 'Morality'], type: 'adventure',
  },
  {
    id: 'g038', subject: 'cre', title: 'Church History Journey', difficulty: 'Hard',
    grade: [8, 9], description: 'Travel through church history from early Christians to modern day.',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80',
    plays: 4400, rating: 4.5, duration: '20 min', points: 200,
    skills: ['Church History', 'Faith'], type: 'adventure',
  },
  {
    id: 'g039', subject: 'cre', title: 'Prayer & Worship Journey', difficulty: 'Easy',
    grade: [4, 5, 6], description: 'Learn different forms of prayer and worship across traditions.',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=80',
    plays: 11800, rating: 4.8, duration: '10 min', points: 80,
    skills: ['Prayer', 'Worship'], type: 'adventure',
  },
  {
    id: 'g040', subject: 'cre', title: 'Parables & Teachings', difficulty: 'Medium',
    grade: [6, 7, 8], description: 'Unravel the meaning behind parables through interactive puzzles.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    plays: 8600, rating: 4.7, duration: '14 min', points: 140,
    skills: ['Parables', 'Teachings'], type: 'puzzle',
  },

  // ── CAAS (8 games) ─────────────────────────────────────────────
  {
    id: 'g041', subject: 'caas', title: 'Kenya Map Master', difficulty: 'Medium',
    grade: [4, 5, 6, 7, 8, 9], description: 'Explore Kenya\'s 47 counties, capitals, rivers and landmarks.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80',
    plays: 18500, rating: 4.9, duration: '15 min', points: 160,
    skills: ['Geography', 'Kenya', 'Maps'], type: 'quiz',
  },
  {
    id: 'g042', subject: 'caas', title: 'African History Heroes', difficulty: 'Hard',
    grade: [7, 8, 9], description: 'Meet African historical figures and learn their contributions.',
    image: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&q=80',
    plays: 7900, rating: 4.8, duration: '18 min', points: 200,
    skills: ['African History', 'Leaders'], type: 'adventure',
  },
  {
    id: 'g043', subject: 'caas', title: 'Community Roles Explorer', difficulty: 'Easy',
    grade: [4, 5], description: 'Discover roles in your community and their importance.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    plays: 9400, rating: 4.7, duration: '10 min', points: 80,
    skills: ['Community', 'Roles', 'Civics'], type: 'adventure',
  },
  {
    id: 'g044', subject: 'caas', title: 'Culture & Tradition Trivia', difficulty: 'Medium',
    grade: [5, 6, 7], description: 'Test knowledge of Kenyan and African cultures and traditions.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80',
    plays: 13700, rating: 4.9, duration: '12 min', points: 140,
    skills: ['Culture', 'Traditions'], type: 'quiz',
  },
  {
    id: 'g045', subject: 'caas', title: 'Civic Duty Challenge', difficulty: 'Medium',
    grade: [6, 7, 8, 9], description: 'Understand your rights and duties as a Kenyan citizen.',
    image: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&q=80',
    plays: 6100, rating: 4.6, duration: '14 min', points: 140,
    skills: ['Civics', 'Rights', 'Duties'], type: 'quiz',
  },
  {
    id: 'g046', subject: 'caas', title: 'Art Creation Studio', difficulty: 'Easy',
    grade: [4, 5, 6, 7, 8, 9], description: 'Explore colour, form, and texture to create digital art.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
    plays: 16300, rating: 4.9, duration: '20 min', points: 120,
    skills: ['Visual Art', 'Creativity'], type: 'builder',
  },
  {
    id: 'g047', subject: 'caas', title: 'Music Notes Explorer', difficulty: 'Medium',
    grade: [4, 5, 6, 7], description: 'Learn musical notes, rhythms, and African instruments.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    plays: 10800, rating: 4.8, duration: '14 min', points: 140,
    skills: ['Music', 'Notes', 'Instruments'], type: 'simulation',
  },
  {
    id: 'g048', subject: 'caas', title: 'Drama & Poetry Corner', difficulty: 'Easy',
    grade: [4, 5, 6, 7, 8, 9], description: 'Perform dramatic readings and write poetry in a creative space.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&q=80',
    plays: 7600, rating: 4.7, duration: '15 min', points: 100,
    skills: ['Drama', 'Poetry', 'Creativity'], type: 'builder',
  },

  // ── Agriculture Gr 4–9 (8 games) ──────────────────────────────
  {
    id: 'g049', subject: 'agriculture', title: 'Crop Farmer Simulator', difficulty: 'Medium',
    grade: [4, 5, 6, 7, 8, 9], description: 'Plant, tend, and harvest crops while managing a virtual farm.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    plays: 17900, rating: 4.9, duration: '25 min', points: 200,
    skills: ['Farming', 'Crops', 'Management'], type: 'simulation',
  },
  {
    id: 'g050', subject: 'agriculture', title: 'Soil & Fertility Lab', difficulty: 'Hard',
    grade: [7, 8, 9], description: 'Analyse soil samples and learn how to improve fertility.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    plays: 5700, rating: 4.6, duration: '18 min', points: 200,
    skills: ['Soil', 'Fertility', 'Lab Skills'], type: 'simulation',
  },
  {
    id: 'g051', subject: 'agriculture', title: 'Livestock Care Game', difficulty: 'Medium',
    grade: [5, 6, 7, 8], description: 'Raise healthy livestock and learn animal husbandry basics.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
    plays: 12400, rating: 4.8, duration: '20 min', points: 160,
    skills: ['Animals', 'Husbandry', 'Care'], type: 'simulation',
  },
  {
    id: 'g052', subject: 'agriculture', title: 'Irrigation Designer', difficulty: 'Hard',
    grade: [8, 9], description: 'Plan and design irrigation systems for a drought-resistant farm.',
    image: 'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800&q=80',
    plays: 4100, rating: 4.5, duration: '22 min', points: 220,
    skills: ['Irrigation', 'Water', 'Design'], type: 'builder',
  },
  {
    id: 'g053', subject: 'agriculture', title: 'Pest Management Pro', difficulty: 'Hard',
    grade: [7, 8, 9], description: 'Identify crop pests and apply integrated management strategies.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80',
    plays: 5200, rating: 4.6, duration: '18 min', points: 200,
    skills: ['Pests', 'IPM', 'Agronomy'], type: 'quiz',
  },
  {
    id: 'g054', subject: 'agriculture', title: 'Market & Trade Sim', difficulty: 'Medium',
    grade: [6, 7, 8, 9], description: 'Sell your harvest and learn about agricultural markets.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80',
    plays: 9300, rating: 4.7, duration: '18 min', points: 160,
    skills: ['Business', 'Markets', 'Trade'], type: 'simulation',
  },
  {
    id: 'g055', subject: 'agriculture', title: 'Seed Selection Master', difficulty: 'Easy',
    grade: [4, 5, 6], description: 'Choose the best seeds for different climates and soil types.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    plays: 8800, rating: 4.7, duration: '10 min', points: 80,
    skills: ['Seeds', 'Planting', 'Selection'], type: 'quiz',
  },
  {
    id: 'g056', subject: 'agriculture', title: 'Harvest Festival Game', difficulty: 'Easy',
    grade: [4, 5, 6], description: 'Celebrate harvest by sorting, grading and storing produce correctly.',
    image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=800&q=80',
    plays: 11200, rating: 4.8, duration: '12 min', points: 90,
    skills: ['Harvesting', 'Post-harvest', 'Storage'], type: 'puzzle',
  },
];

// ─── Demo Questions (used by GamePlay.jsx) ────────────────────────────
export const DEMO_QUESTIONS = {
  // Default quiz questions for any game
  default: [
    {
      question: 'What is 15 × 3?',
      options: ['35', '45', '55', '40'],
      answer: 1,
      explanation: '15 × 3 = 45. Multiply the tens (10×3=30) and units (5×3=15), then add: 30+15=45.',
    },
    {
      question: 'Which of these is a prime number?',
      options: ['9', '15', '13', '21'],
      answer: 2,
      explanation: '13 is only divisible by 1 and itself, making it a prime number.',
    },
    {
      question: 'What is ¾ as a percentage?',
      options: ['65%', '70%', '75%', '80%'],
      answer: 2,
      explanation: '¾ = 3 ÷ 4 = 0.75 = 75%.',
    },
    {
      question: 'Simplify: 24 ÷ 6 + 3',
      options: ['5', '7', '6', '8'],
      answer: 1,
      explanation: 'Following BODMAS: 24 ÷ 6 = 4, then 4 + 3 = 7.',
    },
    {
      question: 'What is the perimeter of a rectangle with length 8cm and width 5cm?',
      options: ['13 cm', '26 cm', '40 cm', '30 cm'],
      answer: 1,
      explanation: 'Perimeter = 2(length + width) = 2(8 + 5) = 2 × 13 = 26 cm.',
    },
  ],
  // Subject-specific question sets
  mathematics: [
    {
      question: 'What is 15 × 3?',
      options: ['35', '45', '55', '40'],
      answer: 1,
      explanation: '15 × 3 = 45.',
    },
    {
      question: 'Which of these is a prime number?',
      options: ['9', '15', '13', '21'],
      answer: 2,
      explanation: '13 is only divisible by 1 and itself.',
    },
    {
      question: 'What is ¾ as a percentage?',
      options: ['65%', '70%', '75%', '80%'],
      answer: 2,
      explanation: '¾ = 0.75 = 75%.',
    },
    {
      question: 'Simplify: 24 ÷ 6 + 3',
      options: ['5', '7', '6', '8'],
      answer: 1,
      explanation: 'BODMAS: 24 ÷ 6 = 4, then 4 + 3 = 7.',
    },
    {
      question: 'What is the area of a triangle with base 10cm and height 6cm?',
      options: ['60 cm²', '30 cm²', '16 cm²', '36 cm²'],
      answer: 1,
      explanation: 'Area = ½ × base × height = ½ × 10 × 6 = 30 cm².',
    },
  ],
  integrated_science: [
    {
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'],
      answer: 2,
      explanation: 'Mitochondria generate most of the cell\'s ATP energy.',
    },
    {
      question: 'Which gas do plants absorb during photosynthesis?',
      options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
      answer: 2,
      explanation: 'Plants absorb CO₂ and release O₂ during photosynthesis.',
    },
    {
      question: 'What is the chemical symbol for water?',
      options: ['HO', 'H₂O', 'OH₂', 'H₂O₂'],
      answer: 1,
      explanation: 'Water is made of 2 hydrogen atoms and 1 oxygen atom: H₂O.',
    },
    {
      question: 'Which organ pumps blood through the body?',
      options: ['Lungs', 'Brain', 'Heart', 'Liver'],
      answer: 2,
      explanation: 'The heart pumps blood carrying oxygen and nutrients to all body parts.',
    },
    {
      question: 'What force pulls objects towards the centre of the Earth?',
      options: ['Friction', 'Magnetic force', 'Gravity', 'Air resistance'],
      answer: 2,
      explanation: 'Gravity is the force that attracts objects towards Earth\'s centre.',
    },
  ],
  early_math: [
    {
      question: 'How many sides does a triangle have?',
      options: ['2', '3', '4', '5'],
      answer: 1,
      explanation: 'A triangle has 3 sides.',
    },
    {
      question: 'What comes after the number 5?',
      options: ['4', '6', '7', '3'],
      answer: 1,
      explanation: 'After 5 comes 6.',
    },
    {
      question: 'Which shape has 4 equal sides?',
      options: ['Triangle', 'Circle', 'Square', 'Rectangle'],
      answer: 2,
      explanation: 'A square has 4 equal sides.',
    },
    {
      question: 'How many fingers do you have on one hand?',
      options: ['3', '4', '5', '6'],
      answer: 2,
      explanation: 'You have 5 fingers on one hand.',
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      answer: 1,
      explanation: '2 + 2 = 4.',
    },
  ],
  literacy: [
    {
      question: 'Which letter comes after B?',
      options: ['A', 'C', 'D', 'E'],
      answer: 1,
      explanation: 'After B comes C.',
    },
    {
      question: 'What sound does the letter A make?',
      options: ['/b/', '/a/', '/c/', '/d/'],
      answer: 1,
      explanation: 'The letter A makes the /a/ sound.',
    },
    {
      question: 'Which word starts with the letter C?',
      options: ['Apple', 'Ball', 'Cat', 'Dog'],
      answer: 2,
      explanation: 'Cat starts with the letter C.',
    },
    {
      question: 'How many letters are in the word "DOG"?',
      options: ['2', '3', '4', '5'],
      answer: 1,
      explanation: 'D-O-G has 3 letters.',
    },
    {
      question: 'Which is a vowel?',
      options: ['B', 'C', 'A', 'D'],
      answer: 2,
      explanation: 'A is a vowel.',
    },
  ],
  science_technology: [
    {
      question: 'What do plants need to grow?',
      options: ['Water only', 'Sunlight only', 'Soil only', 'Water, sunlight, and soil'],
      answer: 3,
      explanation: 'Plants need water, sunlight, and soil to grow.',
    },
    {
      question: 'Which of these is a source of light?',
      options: ['Table', 'Chair', 'Sun', 'Book'],
      answer: 2,
      explanation: 'The sun is a source of light.',
    },
    {
      question: 'What do we use to see ourselves?',
      options: ['Window', 'Door', 'Mirror', 'Wall'],
      answer: 2,
      explanation: 'We use a mirror to see ourselves.',
    },
    {
      question: 'Which material floats on water?',
      options: ['Stone', 'Wood', 'Metal', 'Rock'],
      answer: 1,
      explanation: 'Wood floats on water.',
    },
    {
      question: 'What do bees make?',
      options: ['Milk', 'Honey', 'Bread', 'Cheese'],
      answer: 1,
      explanation: 'Bees make honey.',
    },
  ],
  pre_technical: [
    {
      question: 'What tool do we use to measure length?',
      options: ['Thermometer', 'Ruler', 'Scale', 'Clock'],
      answer: 1,
      explanation: 'We use a ruler to measure length.',
    },
    {
      question: 'Which material is used to make wires?',
      options: ['Wood', 'Plastic', 'Metal', 'Paper'],
      answer: 2,
      explanation: 'Metal is used to make wires.',
    },
    {
      question: 'What do we call a machine that helps us lift heavy objects?',
      options: ['Wheel', 'Lever', 'Pulley', 'Inclined plane'],
      answer: 1,
      explanation: 'A lever helps us lift heavy objects.',
    },
    {
      question: 'Which of these is a simple machine?',
      options: ['Car', 'Bicycle', 'Wheelbarrow', 'Motorcycle'],
      answer: 2,
      explanation: 'A wheelbarrow is a simple machine.',
    },
    {
      question: 'What do we use to join two pieces of wood?',
      options: ['Glue', 'Tape', 'Nails', 'String'],
      answer: 2,
      explanation: 'We use nails to join two pieces of wood.',
    },
  ],
  cre: [
    {
      question: 'Who created the world according to Christian belief?',
      options: ['Angels', 'Jesus', 'God', 'Humans'],
      answer: 2,
      explanation: 'According to Christian belief, God created the world.',
    },
    {
      question: 'What is the holy book of Christianity?',
      options: ['Quran', 'Torah', 'Bible', 'Vedas'],
      answer: 2,
      explanation: 'The Bible is the holy book of Christianity.',
    },
    {
      question: 'Who is the son of God in Christianity?',
      options: ['Moses', 'Abraham', 'Jesus', 'David'],
      answer: 2,
      explanation: 'Jesus is the son of God in Christianity.',
    },
    {
      question: 'What do Christians do on Sunday?',
      options: ['Sleep', 'Work', 'Go to church', 'Play games'],
      answer: 2,
      explanation: 'Christians go to church on Sunday.',
    },
    {
      question: 'What is the first book of the Bible?',
      options: ['Exodus', 'Genesis', 'Leviticus', 'Numbers'],
      answer: 1,
      explanation: 'Genesis is the first book of the Bible.',
    },
  ],
  caas: [
    {
      question: 'Which of these is a musical instrument?',
      options: ['Chair', 'Piano', 'Table', 'Book'],
      answer: 1,
      explanation: 'A piano is a musical instrument.',
    },
    {
      question: 'What do we use to draw pictures?',
      options: ['Spoon', 'Pencil', 'Plate', 'Cup'],
      answer: 1,
      explanation: 'We use a pencil to draw pictures.',
    },
    {
      question: 'Which color do we get by mixing red and yellow?',
      options: ['Blue', 'Green', 'Orange', 'Purple'],
      answer: 2,
      explanation: 'Mixing red and yellow gives orange.',
    },
    {
      question: 'What do actors do on stage?',
      options: ['Sing', 'Dance', 'Act in plays', 'Paint'],
      answer: 2,
      explanation: 'Actors act in plays on stage.',
    },
    {
      question: 'Which sport uses a ball and a net?',
      options: ['Football', 'Basketball', 'Volleyball', 'Tennis'],
      answer: 2,
      explanation: 'Volleyball uses a ball and a net.',
    },
  ],
  agriculture: [
    {
      question: 'Which soil type retains the most water?',
      options: ['Sandy soil', 'Loam soil', 'Clay soil', 'Gravel soil'],
      answer: 2,
      explanation: 'Clay soil has the smallest particles and retains the most water.',
    },
    {
      question: 'What is crop rotation?',
      options: [
        'Spinning crops',
        'Growing the same crop every season',
        'Growing different crops in succession on the same land',
        'Mixing crops together',
      ],
      answer: 2,
      explanation: 'Crop rotation involves growing different crops each season to maintain soil fertility.',
    },
    {
      question: 'Which nutrient is most important for leaf growth?',
      options: ['Potassium', 'Nitrogen', 'Phosphorus', 'Calcium'],
      answer: 1,
      explanation: 'Nitrogen promotes leafy, vegetative growth in plants.',
    },
    {
      question: 'What is the main purpose of irrigation?',
      options: [
        'To add fertilizer',
        'To supply water to crops',
        'To remove pests',
        'To harvest crops',
      ],
      answer: 1,
      explanation: 'Irrigation is the artificial application of water to crops.',
    },
    {
      question: 'Which animal is raised primarily for milk production in Kenya?',
      options: ['Goat', 'Sheep', 'Dairy cow', 'Chicken'],
      answer: 2,
      explanation: 'Dairy cows (e.g., Friesian, Ayrshire) are the primary milk producers in Kenya.',
    },
  ],
};

// ─── Helper function to get questions for a game ──────────────────
export const getQuestionsForGame = (game) => {
  if (!game) return DEMO_QUESTIONS.default || [];
  
  // Shuffle questions for variety on daily updates
  const questions = DEMO_QUESTIONS[game.subject] || DEMO_QUESTIONS.default || [];
  
  // Create a shuffled copy each time to ensure variety
  return questions.length > 0 ? shuffleArray([...questions]) : [];
};

// ─── Utility: Shuffle array ──────────────────────────────────────
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ─── Utility Exports ─────────────────────────────────────────────
export const getGamesBySubject = (subjectId) => GAMES.filter((g) => g.subject === subjectId);
export const getFeaturedGames = (count = 8) =>
  [...GAMES].sort((a, b) => b.plays - a.plays).slice(0, count);
export const getGameById = (id) => GAMES.find((g) => g.id === id);
