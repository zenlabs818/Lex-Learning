
import React, { useState, useMemo, useEffect } from 'react';
import { NavigationTab, Course, QuizQuestion, User } from './types';
import { MOCK_COURSES as courses, CATEGORIES as categories, MOCK_USER as defaultUser } from './constants';
import CourseCard from './components/CourseCard';
import AITutor from './components/AITutor';
import AdBanner from './components/AdBanner';
import { geminiService } from './services/geminiService';
import { firebaseService } from './services/firebaseService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Home);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState<'All' | 'University' | 'SHS'>('All');
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  
  // Firebase User State
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load User Data from Firebase on mount
  useEffect(() => {
    const initUser = async () => {
      setIsSyncing(true);
      const data = await firebaseService.getUserData();
      if (data) {
        setCurrentUser(data);
      } else {
        await firebaseService.saveUserData(defaultUser);
      }
      setIsSyncing(false);
    };
    initUser();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      const matchesLevel = activeLevel === 'All' || c.educationLevel === activeLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, activeCategory, activeLevel]);

  const handleStartQuiz = async () => {
    if (!selectedCourse) return;
    setIsQuizModalOpen(true);
    setIsGeneratingQuiz(true);
    const content = selectedCourse.lessons[activeLessonIndex]?.content || "No content available";
    const questions = await geminiService.generateQuiz(content);
    setQuizQuestions(questions);
    setIsGeneratingQuiz(false);

    // Reward points for starting a quiz
    await firebaseService.addPoints(15);
    setCurrentUser(prev => ({ ...prev, points: prev.points + 15 }));
  };

  const renderHome = () => (
    <div className="pb-32 pt-6 px-5 space-y-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Welcome back,</p>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{currentUser.name}</h1>
            {isSyncing && <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>}
          </div>
        </div>
        <div className="relative">
          <img src={currentUser.avatar} className="w-12 h-12 rounded-2xl shadow-xl border-2 border-white ring-4 ring-indigo-50" alt="avatar" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-1 rounded-md mb-2 inline-block">Curriculum 2024</span>
          <h3 className="text-2xl font-black leading-tight">University & SHS<br/>Academic Portal</h3>
          <p className="text-slate-400 text-xs mt-2 max-w-[220px]">Master your exams with AI-powered study tracks and mock assessments.</p>
          <button 
            onClick={() => setActiveTab(NavigationTab.Search)}
            className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-2xl text-xs font-bold shadow-xl shadow-indigo-600/30 active:scale-95 transition-all"
          >
            Explore Subjects
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-4 right-4 text-indigo-500/20">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">University Tracks</h2>
          <button onClick={() => {setActiveTab(NavigationTab.Search); setActiveLevel('University');}} className="text-indigo-600 text-xs font-bold hover:underline">See Faculty</button>
        </div>
        <div className="flex space-x-5 overflow-x-auto hide-scrollbar pb-4 -mx-5 px-5">
          {courses.filter(c => c.educationLevel === 'University').map(course => (
            <CourseCard key={course.id} course={course} onClick={() => setSelectedCourse(course)} />
          ))}
        </div>
      </section>

      <AdBanner slot="home-mid-banner" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">SHS Subjects</h2>
          <button onClick={() => {setActiveTab(NavigationTab.Search); setActiveLevel('SHS');}} className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
        </div>
        <div className="flex space-x-5 overflow-x-auto hide-scrollbar pb-4 -mx-5 px-5">
          {courses.filter(c => c.educationLevel === 'SHS').map(course => (
            <CourseCard key={course.id} course={course} onClick={() => setSelectedCourse(course)} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderSearch = () => (
    <div className="pb-32 pt-6 px-5 space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Academic Library</h1>
        <p className="text-slate-400 text-sm">Find your course by level or faculty.</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search Law, Physics, Engineering..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-[1.5rem] py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>

        <div className="flex p-1.5 bg-slate-200/50 rounded-2xl">
          {(['All', 'University', 'SHS'] as const).map(level => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                activeLevel === level ? 'bg-white text-indigo-600 shadow-sm scale-[1.02]' : 'text-slate-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="flex space-x-2 overflow-x-auto hide-scrollbar -mx-5 px-5 pb-2">
          {['All', ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} variant="horizontal" onClick={() => setSelectedCourse(course)} />
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-slate-800 font-bold">No curricula found</p>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your filters or level.</p>
          </div>
        )}
      </div>
      
      <AdBanner slot="search-bottom-fluid" format="fluid" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white lg:bg-slate-50 min-h-screen relative shadow-2xl flex flex-col">
        
        <main className="flex-1">
          {activeTab === NavigationTab.Home && renderHome()}
          {activeTab === NavigationTab.Search && renderSearch()}
          {activeTab === NavigationTab.Courses && (
            <div className="pb-32 pt-6 px-5 space-y-6">
              <h1 className="text-2xl font-black text-slate-800">My Studies</h1>
              <div className="space-y-4">
                {courses.filter(c => c.progress > 0).map(course => (
                  <CourseCard key={course.id} course={course} variant="horizontal" onClick={() => setSelectedCourse(course)} />
                ))}
              </div>
            </div>
          )}
          {activeTab === NavigationTab.Profile && (
            <div className="pb-32 pt-12 px-5 flex flex-col items-center">
               <div className="w-32 h-32 rounded-[3rem] p-1 bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-2xl mb-6">
                 <img src={currentUser.avatar} className="w-full h-full rounded-[2.8rem] border-4 border-white object-cover" alt="pfp" />
               </div>
               <h2 className="text-2xl font-black text-slate-800">{currentUser.name}</h2>
               <p className="text-slate-400 text-sm font-medium mb-8">Verified Student</p>
               
               <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                    <p className="text-2xl font-black text-indigo-600">{currentUser.points}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global XP</p>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                    <p className="text-2xl font-black text-indigo-600">8</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Credits</p>
                  </div>
               </div>
               
               <div className="w-full max-w-sm space-y-2">
                 {['Institutional ID', 'Transcript Portal', 'Firebase Sync Settings', 'Support'].map(label => (
                   <button key={label} className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-700">{label}</span>
                      <svg className="text-slate-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                   </button>
                 ))}
               </div>
            </div>
          )}
        </main>

        {selectedCourse && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom duration-300">
             <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <button onClick={() => setSelectedCourse(null)} className="p-2 bg-slate-100 rounded-xl text-slate-600 active:scale-90 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <div className="text-center">
                  <p className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em]">{selectedCourse.educationLevel} LEVEL</p>
                  <h2 className="text-xs font-bold text-slate-800 max-w-[180px] truncate">{selectedCourse.title}</h2>
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-600">ID</span>
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
                <div className="aspect-video bg-slate-900 relative">
                  <img src={selectedCourse.thumbnail} className="w-full h-full object-cover opacity-60" alt="lesson" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-full text-white shadow-2xl active:scale-90 transition-all">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </button>
                  </div>
                </div>

                <div className="px-6 mt-8 space-y-8 max-w-lg mx-auto">
                   <div>
                     <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md">Curriculum Module 1</span>
                     <h1 className="text-2xl font-black text-slate-800 mt-2 leading-tight">{selectedCourse.lessons[activeLessonIndex].title}</h1>
                   </div>

                   <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🤖</div>
                        <div>
                          <p className="text-xs font-black text-slate-800">Faculty AI Advisor</p>
                          <p className="text-[10px] text-slate-400 font-bold">Ask anything about this subject</p>
                        </div>
                      </div>
                      <AITutor lessonContent={selectedCourse.lessons[activeLessonIndex].content} />
                   </div>

                   <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-800 mb-4">Lesson Transcript</h3>
                      <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-indigo-200 pl-4">
                        {selectedCourse.lessons[activeLessonIndex].content}
                      </p>
                   </div>

                   <button 
                    onClick={handleStartQuiz}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-slate-200 flex items-center justify-center space-x-3 active:scale-[0.98] transition-all"
                   >
                     <span className="text-xl">🎓</span>
                     <span>Start Module Quiz</span>
                   </button>
                </div>
             </div>

             {isQuizModalOpen && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                   <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-2xl p-8 relative">
                      {isGeneratingQuiz ? (
                         <div className="py-12 flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                            <h3 className="text-xl font-black text-slate-800">Reviewing Syllabus...</h3>
                            <p className="text-sm text-slate-400 mt-2 text-center">Gemini is preparing high-yield academic questions for you.</p>
                         </div>
                      ) : (
                         <div className="space-y-6">
                            <div className="flex justify-between items-center">
                               <h3 className="text-xl font-black text-slate-800">Assessment</h3>
                               <button onClick={() => setIsQuizModalOpen(false)} className="text-slate-300 hover:text-slate-600"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                            </div>
                            <div className="space-y-4 max-h-[40vh] overflow-y-auto hide-scrollbar">
                               {quizQuestions.map((q, idx) => (
                                 <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                   <p className="text-sm font-bold text-slate-800 mb-3">{idx + 1}. {q.question}</p>
                                   <div className="space-y-2">
                                     {q.options.map((opt, oIdx) => (
                                       <button key={oIdx} className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium hover:border-indigo-500 transition-all">{opt}</button>
                                     ))}
                                   </div>
                                 </div>
                               ))}
                            </div>
                            <button onClick={() => setIsQuizModalOpen(false)} className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100">Submit Answers</button>
                         </div>
                      )}
                   </div>
                </div>
             )}
          </div>
        )}

        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] bg-white/80 backdrop-blur-3xl border border-white/50 h-20 rounded-[2.5rem] shadow-2xl flex items-center justify-around px-4 z-[40]">
          {[
            { id: NavigationTab.Home, icon: (active: boolean) => <svg width="24" height="24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
            { id: NavigationTab.Search, icon: (active: boolean) => <svg width="24" height="24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> },
            { id: NavigationTab.Courses, icon: (active: boolean) => <svg width="24" height="24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
            { id: NavigationTab.Profile, icon: (active: boolean) => <svg width="24" height="24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 ${
                activeTab === tab.id ? 'bg-indigo-600 text-white scale-110 shadow-2xl shadow-indigo-600/30' : 'text-slate-400 hover:text-indigo-400'
              }`}
            >
              {tab.icon(activeTab === tab.id)}
              {activeTab === tab.id && <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default App;
