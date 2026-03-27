// ─── ShuleAI Pro: 56 CBC-Aligned Educational Games ───────────────

export const SUBJECTS = {
  MATHEMATICS: { id: 'mathematics', label: 'Mathematics', color: '#3B82F6', grades: 'Grade 4–9' },
  INT_SCIENCE: { id: 'integrated_science', label: 'Integrated Science', color: '#10B981', grades: 'Grade 7–9' },
  SCI_TECH: { id: 'science_technology', label: 'Science & Technology', color: '#06B6D4', grades: 'Grade 4–6' },
  PRETECH: { id: 'pre_technical', label: 'Pre-Technical Studies', color: '#8B5CF6', grades: 'Grade 7–9' },
  CRE: { id: 'cre', label: 'CRE', color: '#EC4899', grades: 'All Grades' },
  CAAS: { id: 'caas', label: 'Creative Arts & Social Studies', color: '#F59E0B', grades: 'All Grades' },
  AGRICULTURE: { id: 'agriculture', label: 'Agriculture', color: '#84CC16', grades: 'Grade 4–9' },
};

export const GAMES = [
  // ── Mathematics (15 games) ──────────────────────────────────────
  {
    id: 'g001', subject: 'mathematics', title: 'Number Quest', difficulty: 'Easy',
    grades: [4, 5], description: 'Master counting, addition & subtraction through an adventure quest.',
    image: 'https://images.unsplash.com/photo-1596495578221-81765c92842e?w=800&q=80',
    plays: 12840, rating: 4.8, duration: '10 min', skills: ['Counting', 'Addition', 'Subtraction'],
  },
  {
    id: 'g002', subject: 'mathematics', title: 'Fraction Fighter', difficulty: 'Medium',
    grades: [5, 6], description: 'Battle fractions and win by understanding numerators & denominators.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
    plays: 9320, rating: 4.7, duration: '12 min', skills: ['Fractions', 'Equivalence'],
  },
  {
    id: 'g003', subject: 'mathematics', title: 'Geometry Galaxy', difficulty: 'Medium',
    grades: [6, 7], description: 'Navigate through space identifying shapes, angles, and symmetry.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    plays: 7650, rating: 4.6, duration: '15 min', skills: ['Shapes', 'Angles', 'Symmetry'],
  },
  {
    id: 'g004', subject: 'mathematics', title: 'Speed Math Challenge', difficulty: 'Hard',
    grades: [7, 8, 9], description: 'Race against time solving multi-step arithmetic problems.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    plays: 15230, rating: 4.9, duration: '8 min', skills: ['Arithmetic', 'Speed', 'Accuracy'],
  },
  {
    id: 'g005', subject: 'mathematics', title: 'Division Derby', difficulty: 'Medium',
    grades: [4, 5, 6], description: 'Race your horse to the finish by solving division challenges.',
    image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=800&q=80',
    plays: 8100, rating: 4.5, duration: '10 min', skills: ['Division', 'Remainders'],
  },
  {
    id: 'g006', subject: 'mathematics', title: 'Algebra Arena', difficulty: 'Hard',
    grades: [8, 9], description: 'Enter the arena and solve algebraic equations to defeat opponents.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    plays: 6420, rating: 4.7, duration: '18 min', skills: ['Algebra', 'Equations'],
  },
  {
    id: 'g007', subject: 'mathematics', title: 'Times Table Typhoon', difficulty: 'Easy',
    grades: [4, 5], description: 'Survive the typhoon by answering multiplication tables rapidly.',
    image: 'https://images.unsplash.com/photo-1620310237190-7813137b7dd1?w=800&q=80',
    plays: 21000, rating: 4.9, duration: '7 min', skills: ['Multiplication', 'Tables'],
  },
  {
    id: 'g008', subject: 'mathematics', title: 'Decimal Dash', difficulty: 'Medium',
    grades: [6, 7], description: 'Sprint through decimals, comparing and converting with precision.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    plays: 5900, rating: 4.5, duration: '12 min', skills: ['Decimals', 'Conversion'],
  },
  {
    id: 'g009', subject: 'mathematics', title: 'Word Problem Wizard', difficulty: 'Hard',
    grades: [7, 8, 9], description: 'Cast spells by decoding and solving real-world word problems.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    plays: 7200, rating: 4.6, duration: '20 min', skills: ['Problem Solving', 'Reasoning'],
  },
  {
    id: 'g010', subject: 'mathematics', title: 'Shape Sorter Pro', difficulty: 'Easy',
    grades: [4], description: 'Sort and classify 2D & 3D shapes in this fast-paced puzzle game.',
    image: 'https://images.unsplash.com/photo-1558023784-f834125b27a3?w=800&q=80',
    plays: 11300, rating: 4.7, duration: '8 min', skills: ['Shapes', 'Classification'],
  },
  {
    id: 'g011', subject: 'mathematics', title: 'Number Patterns Pro', difficulty: 'Medium',
    grades: [5, 6, 7], description: 'Spot and complete number sequences and patterns.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    plays: 6800, rating: 4.5, duration: '10 min', skills: ['Patterns', 'Sequences'],
  },
  {
    id: 'g012', subject: 'mathematics', title: 'Prime Hunter', difficulty: 'Hard',
    grades: [7, 8], description: 'Hunt down prime numbers and factors before time runs out.',
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80',
    plays: 4500, rating: 4.6, duration: '12 min', skills: ['Prime Numbers', 'Factors'],
  },
  {
    id: 'g013', subject: 'mathematics', title: 'Ratio Race', difficulty: 'Medium',
    grades: [6, 7, 8], description: 'Compete in a race by solving ratio and proportion challenges.',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800&q=80',
    plays: 5300, rating: 4.5, duration: '14 min', skills: ['Ratios', 'Proportions'],
  },
  {
    id: 'g014', subject: 'mathematics', title: 'Percentage Power', difficulty: 'Medium',
    grades: [6, 7, 8, 9], description: 'Power up by calculating percentages in real-world contexts.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    plays: 7800, rating: 4.7, duration: '12 min', skills: ['Percentages', 'Application'],
  },
  {
    id: 'g015', subject: 'mathematics', title: 'Statistics Surge', difficulty: 'Hard',
    grades: [8, 9], description: 'Analyze data, draw graphs, and interpret statistical information.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    plays: 3900, rating: 4.6, duration: '20 min', skills: ['Statistics', 'Data Analysis'],
  },

  // ── Integrated Science Gr 7–9 (9 games) ───────────────────────
  {
    id: 'g016', subject: 'integrated_science', title: 'Cell Explorer', difficulty: 'Medium',
    grades: [7, 8], description: 'Journey inside living cells and identify organelles and their functions.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    plays: 8900, rating: 4.8, duration: '15 min', skills: ['Cell Biology', 'Organelles'],
  },
  {
    id: 'g017', subject: 'integrated_science', title: 'Ecosystem Builder', difficulty: 'Hard',
    grades: [8, 9], description: 'Build balanced ecosystems and manage food webs and energy flow.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    plays: 6100, rating: 4.7, duration: '25 min', skills: ['Ecosystems', 'Food Webs'],
  },
  {
    id: 'g018', subject: 'integrated_science', title: 'Chemistry Lab Simulator', difficulty: 'Hard',
    grades: [8, 9], description: 'Safely perform chemical reactions and observe changes virtually.',
    image: 'https://images.unsplash.com/photo-1541170311-53697e884074?w=800&q=80',
    plays: 7400, rating: 4.9, duration: '20 min', skills: ['Chemistry', 'Reactions', 'Safety'],
  },
  {
    id: 'g019', subject: 'integrated_science', title: 'Forces & Motion Master', difficulty: 'Medium',
    grades: [7, 8], description: 'Experiment with forces, gravity, friction and Newton\'s laws.',
    image: 'https://images.unsplash.com/photo-1620310237190-7813137b7dd1?w=800&q=80',
    plays: 9200, rating: 4.8, duration: '15 min', skills: ['Forces', 'Motion', 'Physics'],
  },
  {
    id: 'g020', subject: 'integrated_science', title: 'Human Body Quest', difficulty: 'Medium',
    grades: [7, 8, 9], description: 'Explore the human body systems and their interrelationships.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    plays: 11500, rating: 4.9, duration: '18 min', skills: ['Anatomy', 'Body Systems'],
  },
  {
    id: 'g021', subject: 'integrated_science', title: 'Genetics Quest', difficulty: 'Hard',
    grades: [9], description: 'Unravel DNA, inheritance patterns, and genetic traits.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    plays: 4200, rating: 4.7, duration: '22 min', skills: ['Genetics', 'DNA', 'Heredity'],
  },
  {
    id: 'g022', subject: 'integrated_science', title: 'Energy Flow Challenge', difficulty: 'Medium',
    grades: [8, 9], description: 'Trace energy transformations from sun to organisms in ecosystems.',
    image: 'https://images.unsplash.com/photo-1466611653911-95282fc3656b?w=800&q=80',
    plays: 5600, rating: 4.6, duration: '16 min', skills: ['Energy', 'Ecology'],
  },
  {
    id: 'g023', subject: 'integrated_science', title: 'Matter States Challenge', difficulty: 'Easy',
    grades: [7], description: 'Explore solids, liquids and gases through interactive experiments.',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80',
    plays: 9800, rating: 4.8, duration: '12 min', skills: ['States of Matter', 'Changes'],
  },
  {
    id: 'g024', subject: 'integrated_science', title: 'Digestive System Dive', difficulty: 'Medium',
    grades: [7, 8], description: 'Follow food through the digestive system in this immersive journey.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    plays: 8300, rating: 4.7, duration: '15 min', skills: ['Digestion', 'Nutrition'],
  },

  // ── Science & Technology Gr 4–6 (6 games) ─────────────────────
  {
    id: 'g025', subject: 'science_technology', title: 'Simple Machines Workshop', difficulty: 'Easy',
    grades: [4, 5], description: 'Build with levers, pulleys, and wheels in a virtual workshop.',
    image: 'https://images.unsplash.com/photo-1581092921461-7031e2bcd0cb?w=400&q=80',
    plays: 10200, rating: 4.8, duration: '12 min', skills: ['Machines', 'Engineering'],
  },
  {
    id: 'g026', subject: 'science_technology', title: 'Plant Life Cycle Lab', difficulty: 'Easy',
    grades: [4, 5], description: 'Grow plants from seed to flower and learn each lifecycle stage.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    plays: 13400, rating: 4.9, duration: '10 min', skills: ['Plants', 'Life Cycles'],
  },
  {
    id: 'g027', subject: 'science_technology', title: 'Weather Watcher', difficulty: 'Easy',
    grades: [4, 5, 6], description: 'Observe, record and predict weather patterns like a meteorologist.',
    image: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=400&q=80',
    plays: 8700, rating: 4.6, duration: '10 min', skills: ['Weather', 'Climate', 'Data'],
  },
  {
    id: 'g028', subject: 'science_technology', title: 'Animal Classification Safari', difficulty: 'Medium',
    grades: [5, 6], description: 'Go on safari and classify animals by their characteristics.',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=80',
    plays: 12100, rating: 4.8, duration: '14 min', skills: ['Classification', 'Animals'],
  },
  {
    id: 'g029', subject: 'science_technology', title: 'Light & Sound Explorer', difficulty: 'Medium',
    grades: [5, 6], description: 'Investigate properties of light and sound through experiments.',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=400&q=80',
    plays: 7300, rating: 4.7, duration: '16 min', skills: ['Light', 'Sound', 'Physics'],
  },
  {
    id: 'g030', subject: 'science_technology', title: 'Soil Science Simulator', difficulty: 'Medium',
    grades: [4, 5, 6], description: 'Test soil types, fertility and learn soil conservation methods.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    plays: 6200, rating: 4.5, duration: '12 min', skills: ['Soil', 'Conservation'],
  },

  // ── Pre-Technical Studies Gr 7–9 (5 games) ────────────────────
  {
    id: 'g031', subject: 'pre_technical', title: 'Wood Workshop Sim', difficulty: 'Medium',
    grades: [7, 8, 9], description: 'Design and virtually craft wood projects using proper tools and techniques.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    plays: 5800, rating: 4.6, duration: '20 min', skills: ['Woodwork', 'Design', 'Tools'],
  },
  {
    id: 'g032', subject: 'pre_technical', title: 'Metal Works Challenge', difficulty: 'Hard',
    grades: [8, 9], description: 'Learn metalwork fundamentals through interactive challenges.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    plays: 3900, rating: 4.5, duration: '18 min', skills: ['Metalwork', 'Materials'],
  },
  {
    id: 'g033', subject: 'pre_technical', title: 'Circuit Builder', difficulty: 'Hard',
    grades: [8, 9], description: 'Design and test electrical circuits safely in a virtual lab.',
    image: 'https://images.unsplash.com/photo-1581092921461-7031e2bcd0cb?w=400&q=80',
    plays: 7100, rating: 4.8, duration: '22 min', skills: ['Electricity', 'Circuits'],
  },
  {
    id: 'g034', subject: 'pre_technical', title: 'Design & Drawing Studio', difficulty: 'Medium',
    grades: [7, 8], description: 'Create technical drawings and design projects step by step.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    plays: 6300, rating: 4.6, duration: '18 min', skills: ['Drawing', 'Design'],
  },
  {
    id: 'g035', subject: 'pre_technical', title: 'Technology Timeline Trek', difficulty: 'Easy',
    grades: [7], description: 'Travel through time and discover how technology has evolved.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    plays: 8900, rating: 4.7, duration: '12 min', skills: ['Technology History', 'Innovation'],
  },

  // ── CRE (5 games) ──────────────────────────────────────────────
  {
    id: 'g036', subject: 'cre', title: 'Bible Stories Quest', difficulty: 'Easy',
    grades: [4, 5, 6, 7, 8, 9], description: 'Explore key Bible narratives through interactive storytelling.',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=80',
    plays: 14200, rating: 4.9, duration: '12 min', skills: ['Scripture', 'Narratives'],
  },
  {
    id: 'g037', subject: 'cre', title: 'Morality & Values Explorer', difficulty: 'Medium',
    grades: [5, 6, 7, 8, 9], description: 'Navigate moral dilemmas and discover Christian values in action.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    plays: 9100, rating: 4.7, duration: '15 min', skills: ['Ethics', 'Values', 'Morality'],
  },
  {
    id: 'g038', subject: 'cre', title: 'Church History Journey', difficulty: 'Hard',
    grades: [8, 9], description: 'Travel through church history from early Christians to modern day.',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80',
    plays: 4400, rating: 4.5, duration: '20 min', skills: ['Church History', 'Faith'],
  },
  {
    id: 'g039', subject: 'cre', title: 'Prayer & Worship Journey', difficulty: 'Easy',
    grades: [4, 5, 6], description: 'Learn different forms of prayer and worship across traditions.',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=80',
    plays: 11800, rating: 4.8, duration: '10 min', skills: ['Prayer', 'Worship'],
  },
  {
    id: 'g040', subject: 'cre', title: 'Parables & Teachings', difficulty: 'Medium',
    grades: [6, 7, 8], description: 'Unravel the meaning behind parables through interactive puzzles.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    plays: 8600, rating: 4.7, duration: '14 min', skills: ['Parables', 'Teachings'],
  },

  // ── CAAS (8 games) ─────────────────────────────────────────────
  {
    id: 'g041', subject: 'caas', title: 'Kenya Map Master', difficulty: 'Medium',
    grades: [4, 5, 6, 7, 8, 9], description: 'Explore Kenya\'s 47 counties, capitals, rivers and landmarks.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80',
    plays: 18500, rating: 4.9, duration: '15 min', skills: ['Geography', 'Kenya', 'Maps'],
  },
  {
    id: 'g042', subject: 'caas', title: 'African History Heroes', difficulty: 'Hard',
    grades: [7, 8, 9], description: 'Meet African historical figures and learn their contributions.',
    image: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&q=80',
    plays: 7900, rating: 4.8, duration: '18 min', skills: ['African History', 'Leaders'],
  },
  {
    id: 'g043', subject: 'caas', title: 'Community Roles Explorer', difficulty: 'Easy',
    grades: [4, 5], description: 'Discover roles in your community and their importance.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    plays: 9400, rating: 4.7, duration: '10 min', skills: ['Community', 'Roles', 'Civics'],
  },
  {
    id: 'g044', subject: 'caas', title: 'Culture & Tradition Trivia', difficulty: 'Medium',
    grades: [5, 6, 7], description: 'Test knowledge of Kenyan and African cultures and traditions.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80',
    plays: 13700, rating: 4.9, duration: '12 min', skills: ['Culture', 'Traditions'],
  },
  {
    id: 'g045', subject: 'caas', title: 'Civic Duty Challenge', difficulty: 'Medium',
    grades: [6, 7, 8, 9], description: 'Understand your rights and duties as a Kenyan citizen.',
    image: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&q=80',
    plays: 6100, rating: 4.6, duration: '14 min', skills: ['Civics', 'Rights', 'Duties'],
  },
  {
    id: 'g046', subject: 'caas', title: 'Art Creation Studio', difficulty: 'Easy',
    grades: [4, 5, 6, 7, 8, 9], description: 'Explore colour, form, and texture to create digital art.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
    plays: 16300, rating: 4.9, duration: '20 min', skills: ['Visual Art', 'Creativity'],
  },
  {
    id: 'g047', subject: 'caas', title: 'Music Notes Explorer', difficulty: 'Medium',
    grades: [4, 5, 6, 7], description: 'Learn musical notes, rhythms, and African instruments.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    plays: 10800, rating: 4.8, duration: '14 min', skills: ['Music', 'Notes', 'Instruments'],
  },
  {
    id: 'g048', subject: 'caas', title: 'Drama & Poetry Corner', difficulty: 'Easy',
    grades: [4, 5, 6, 7, 8, 9], description: 'Perform dramatic readings and write poetry in a creative space.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&q=80',
    plays: 7600, rating: 4.7, duration: '15 min', skills: ['Drama', 'Poetry', 'Creativity'],
  },

  // ── Agriculture Gr 4–9 (8 games) ──────────────────────────────
  {
    id: 'g049', subject: 'agriculture', title: 'Crop Farmer Simulator', difficulty: 'Medium',
    grades: [4, 5, 6, 7, 8, 9], description: 'Plant, tend, and harvest crops while managing a virtual farm.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    plays: 17900, rating: 4.9, duration: '25 min', skills: ['Farming', 'Crops', 'Management'],
  },
  {
    id: 'g050', subject: 'agriculture', title: 'Soil & Fertility Lab', difficulty: 'Hard',
    grades: [7, 8, 9], description: 'Analyse soil samples and learn how to improve fertility.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    plays: 5700, rating: 4.6, duration: '18 min', skills: ['Soil', 'Fertility', 'Lab Skills'],
  },
  {
    id: 'g051', subject: 'agriculture', title: 'Livestock Care Game', difficulty: 'Medium',
    grades: [5, 6, 7, 8], description: 'Raise healthy livestock and learn animal husbandry basics.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
    plays: 12400, rating: 4.8, duration: '20 min', skills: ['Animals', 'Husbandry', 'Care'],
  },
  {
    id: 'g052', subject: 'agriculture', title: 'Irrigation Designer', difficulty: 'Hard',
    grades: [8, 9], description: 'Plan and design irrigation systems for a drought-resistant farm.',
    image: 'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800&q=80',
    plays: 4100, rating: 4.5, duration: '22 min', skills: ['Irrigation', 'Water', 'Design'],
  },
  {
    id: 'g053', subject: 'agriculture', title: 'Pest Management Pro', difficulty: 'Hard',
    grades: [7, 8, 9], description: 'Identify crop pests and apply integrated management strategies.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80',
    plays: 5200, rating: 4.6, duration: '18 min', skills: ['Pests', 'IPM', 'Agronomy'],
  },
  {
    id: 'g054', subject: 'agriculture', title: 'Market & Trade Sim', difficulty: 'Medium',
    grades: [6, 7, 8, 9], description: 'Sell your harvest and learn about agricultural markets.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80',
    plays: 9300, rating: 4.7, duration: '18 min', skills: ['Business', 'Markets', 'Trade'],
  },
  {
    id: 'g055', subject: 'agriculture', title: 'Seed Selection Master', difficulty: 'Easy',
    grades: [4, 5, 6], description: 'Choose the best seeds for different climates and soil types.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    plays: 8800, rating: 4.7, duration: '10 min', skills: ['Seeds', 'Planting', 'Selection'],
  },
  {
    id: 'g056', subject: 'agriculture', title: 'Harvest Festival Game', difficulty: 'Easy',
    grades: [4, 5, 6], description: 'Celebrate harvest by sorting, grading and storing produce correctly.',
    image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=800&q=80',
    plays: 11200, rating: 4.8, duration: '12 min', skills: ['Harvesting', 'Post-harvest', 'Storage'],
  },
];

export const getGamesBySubject = (subjectId) => GAMES.filter((g) => g.subject === subjectId);
export const getFeaturedGames = (count = 8) =>
  [...GAMES].sort((a, b) => b.plays - a.plays).slice(0, count);
export const getGameById = (id) => GAMES.find((g) => g.id === id);
