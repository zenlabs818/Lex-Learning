
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  variant?: 'horizontal' | 'vertical';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
      <div 
        onClick={onClick}
        className="flex bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-all"
      >
        <img src={course.thumbnail} alt={course.title} className="w-32 h-32 object-cover" />
        <div className="p-3 flex flex-col justify-between flex-1">
          <div>
            <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full">
              {course.category}
            </span>
            <h3 className="text-sm font-bold text-slate-800 line-clamp-1 mt-1">{course.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{course.instructor}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-500 text-xs">
              <span className="mr-1">★</span>
              <span className="text-slate-700 font-medium">{course.rating}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">{course.duration}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 w-64 flex-shrink-0 active:scale-[0.98] transition-all"
    >
      <div className="relative h-40">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-indigo-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">
            {course.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-tight h-10 mb-2">
          {course.title}
        </h3>
        <div className="flex items-center mb-4">
          <img 
            src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} 
            className="w-5 h-5 rounded-full mr-2" 
            alt={course.instructor}
          />
          <span className="text-xs text-slate-500">{course.instructor}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center text-indigo-600 font-bold">
            <span className="text-xs">Free</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-yellow-500 text-xs font-bold">
              <span className="mr-0.5">★</span>
              <span>{course.rating}</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">{course.students.toLocaleString()} students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
