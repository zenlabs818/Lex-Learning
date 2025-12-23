
import { Course } from './types';

export const CATEGORIES = [
  'Mathematics', 'Sciences', 'Engineering', 'Medicine', 
  'Law', 'Business', 'Technology', 'Humanities', 'Arts', 'Languages'
];

export const MOCK_COURSES: Course[] = [
  // --- UNIVERSITY LEVEL ---
  {
    id: 'u-cs-1',
    title: 'Distributed Systems & Cloud Computing',
    instructor: 'Dr. Elena Rossi',
    category: 'Technology',
    educationLevel: 'University',
    rating: 4.9,
    students: 12400,
    duration: '45h',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    progress: 0,
    description: 'Advanced study of distributed architectures, consistency models, and cloud infrastructure.',
    lessons: [{ id: 'lu1', title: 'CAP Theorem & Base', duration: '55:00', isCompleted: false, content: 'In theoretical computer science, the CAP theorem states...' }]
  },
  {
    id: 'u-law-1',
    title: 'Constitutional Law: Principles & Practice',
    instructor: 'Prof. Marcus Thorne',
    category: 'Law',
    educationLevel: 'University',
    rating: 4.8,
    students: 8900,
    duration: '38h',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
    progress: 0,
    description: 'Examining the framework of government power and the protection of individual rights.',
    lessons: [{ id: 'lu2', title: 'Separation of Powers', duration: '45:00', isCompleted: false, content: 'The division of a state government into branches...' }]
  },
  {
    id: 'u-med-1',
    title: 'Clinical Biochemistry & Metabolism',
    instructor: 'Dr. Sarah Jenkins',
    category: 'Medicine',
    educationLevel: 'University',
    rating: 4.7,
    students: 15600,
    duration: '50h',
    thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80',
    progress: 25,
    description: 'Understanding chemical processes within and relating to living organisms in a clinical context.',
    lessons: [{ id: 'lu3', title: 'Glycolysis & ATP Production', duration: '60:00', isCompleted: true, content: 'Glycolysis is the metabolic pathway that converts glucose...' }]
  },
  {
    id: 'u-eng-1',
    title: 'Structural Mechanics & Dynamics',
    instructor: 'Prof. Julian Moore',
    category: 'Engineering',
    educationLevel: 'University',
    rating: 4.6,
    students: 5400,
    duration: '42h',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    progress: 0,
    description: 'Analyzing the behavior of physical structures subjected to mechanical loads.',
    lessons: [{ id: 'lu4', title: 'Stress & Strain Analysis', duration: '50:00', isCompleted: false, content: 'Stress is a physical quantity that expresses internal forces...' }]
  },

  // --- SHS LEVEL ---
  {
    id: 's-math-1',
    title: 'Elective Mathematics: Calculus II',
    instructor: 'Mr. Kwame Mensah',
    category: 'Mathematics',
    educationLevel: 'SHS',
    rating: 4.9,
    students: 42000,
    duration: '30h',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80',
    progress: 40,
    description: 'Advanced calculus topics including integration techniques and applications for SHS students.',
    lessons: [{ id: 'ls1', title: 'Integration by Parts', duration: '35:00', isCompleted: true, content: 'In calculus, integration by parts is a theorem that relates...' }]
  },
  {
    id: 's-sci-1',
    title: 'Physics: Electromagnetism',
    instructor: 'Ms. Linda Ross',
    category: 'Sciences',
    educationLevel: 'SHS',
    rating: 4.5,
    students: 35000,
    duration: '22h',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=80',
    progress: 0,
    description: 'Comprehensive study of electric and magnetic fields for final year SHS exams.',
    lessons: [{ id: 'ls2', title: 'Faraday’s Law', duration: '40:00', isCompleted: false, content: 'Any change in the magnetic environment of a coil of wire...' }]
  },
  {
    id: 's-econ-1',
    title: 'SHS Economics: Market Structures',
    instructor: 'Mr. John Teye',
    category: 'Business',
    educationLevel: 'SHS',
    rating: 4.4,
    students: 28000,
    duration: '18h',
    thumbnail: 'https://images.unsplash.com/photo-1611974714658-75d315ad74da?w=400&q=80',
    progress: 0,
    description: 'Perfect competition, monopoly, and oligopoly explained for secondary students.',
    lessons: [{ id: 'ls3', title: 'Monopoly Characteristics', duration: '30:00', isCompleted: false, content: 'A monopoly exists when a specific person or enterprise...' }]
  },
  {
    id: 's-lang-1',
    title: 'French for Beginners (SHS Core)',
    instructor: 'Mme. Sophie Dubois',
    category: 'Languages',
    educationLevel: 'SHS',
    rating: 4.8,
    students: 12000,
    duration: '25h',
    thumbnail: 'https://images.unsplash.com/photo-1503917988258-f197e2f3ba0a?w=400&q=80',
    progress: 10,
    description: 'Building basic conversational skills and grammar for the SHS French curriculum.',
    lessons: [{ id: 'ls4', title: 'Le Présent de l’indicatif', duration: '25:00', isCompleted: true, content: 'The present tense is used to describe actions happening now...' }]
  }
];

export const MOCK_USER = {
  name: 'Alex Johnson',
  avatar: 'https://picsum.photos/seed/alex/150/150',
  points: 450,
  badges: ['Freshman', 'Fast Learner']
};
