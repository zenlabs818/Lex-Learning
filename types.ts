
export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  educationLevel: 'University' | 'SHS' | 'Professional';
  rating: number;
  students: number;
  duration: string;
  thumbnail: string;
  progress: number;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  content: string;
}

export interface User {
  name: string;
  avatar: string;
  points: number;
  badges: string[];
}

export enum NavigationTab {
  Home = 'home',
  Search = 'search',
  Courses = 'courses',
  Profile = 'profile'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
