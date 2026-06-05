import React, { useState } from 'react';
import { Play, BookOpen, Users, Target, ChevronRight, Award, Clock, Video, FileText, HelpCircle, TrendingUp } from 'lucide-react';

export function Learn() {
  const [activeTab, setActiveTab] = useState('tutorials');

  const tutorials = [
    {
      id: 1,
      title: 'Mastering Dribbling Techniques',
      description: 'Learn advanced ball control and dribbling skills with step-by-step guidance.',
      duration: '15 min',
      level: 'Beginner',
      thumbnail: 'https://image2url.com/images/1758690709577-5e6e03c3-e745-4bb7-869d-d346558d0a2c.jpeg',
      category: 'Technique'
    },
    {
      id: 2,
      title: 'Perfect Shooting Form',
      description: 'Improve accuracy and power in your shots with proper technique analysis.',
      duration: '12 min',
      level: 'Intermediate',
      thumbnail: 'https://image2url.com/images/1758692773928-4358297f-12ee-4163-8d19-7d54ce9fa3fc.jpeg',
      category: 'Technique'
    },
    {
      id: 3,
      title: 'Agility and Speed Training',
      description: 'Enhance your sprint performance and agility with targeted exercises.',
      duration: '18 min',
      level: 'Advanced',
      thumbnail: 'https://image2url.com/images/1758692871891-ba8fae8f-fb60-4f48-9e64-92775414df02.jpeg',
      category: 'Fitness'
    },
    {
      id: 4,
      title: 'Understanding AI Analysis',
      description: 'Learn how to interpret your AI scores and feedback for maximum improvement.',
      duration: '10 min',
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      category: 'AI Insights'
    }
  ];

  const articles = [
    {
      title: 'Reading Your Performance Analytics',
      excerpt: 'Understand what your AI scores mean and how to use them for improvement.',
      readTime: '5 min read',
      category: 'Analytics'
    },
    {
      title: 'Setting Up Your Training Space',
      excerpt: 'Best practices for recording videos that give you the most accurate AI analysis.',
      readTime: '3 min read',
      category: 'Setup'
    },
    {
      title: 'Progressive Training Plans',
      excerpt: 'Structure your training sessions for maximum skill development over time.',
      readTime: '8 min read',
      category: 'Training'
    },
    {
      title: 'Common Technical Mistakes',
      excerpt: 'Avoid these frequent errors that can limit your performance improvement.',
      readTime: '6 min read',
      category: 'Technique'
    }
  ];

  const learningPaths = [
    {
      title: 'Beginner Foundation',
      description: 'Start your journey with fundamental skills and basic techniques.',
      modules: 8,
      duration: '2-3 weeks',
      skills: ['Ball Control', 'Basic Shooting', 'Movement Fundamentals']
    },
    {
      title: 'Intermediate Development',
      description: 'Build on your foundation with advanced techniques and tactical understanding.',
      modules: 12,
      duration: '4-6 weeks',
      skills: ['Advanced Dribbling', 'Precision Shooting', 'Tactical Awareness']
    },
    {
      title: 'Advanced Mastery',
      description: 'Perfect your skills with professional-level techniques and strategies.',
      modules: 15,
      duration: '6-8 weeks',
      skills: ['Elite Techniques', 'Game Intelligence', 'Performance Optimization']
    }
  ];

  const tabs = [
    { id: 'tutorials', label: 'Video Tutorials', icon: Video },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'paths', label: 'Learning Paths', icon: TrendingUp },
    { id: 'quiz', label: 'Knowledge Quiz', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Learn & Improve</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Master your skills with comprehensive tutorials, expert insights, and structured learning paths designed to take your game to the next level.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-slate-800 rounded-lg p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Sections */}
        {activeTab === 'tutorials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Video Tutorials</h2>
              <div className="flex space-x-2">
                <select className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600">
                  <option>All Categories</option>
                  <option>Technique</option>
                  <option>Fitness</option>
                  <option>AI Insights</option>
                </select>
                <select className="bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors group">
                  <div className="relative">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white bg-opacity-20 p-4 rounded-full backdrop-blur-sm">
                        <Play className="w-6 h-6 text-white" fill="white" />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {tutorial.category}
                      </span>
                      <span className="bg-slate-800 bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                        {tutorial.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{tutorial.title}</h3>
                    <p className="text-slate-300 text-sm mb-4">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-slate-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                      </div>
                      <button className="button-reference">
                        <span>Watch Now</span>
                        <div className="button-reference__icon-wrapper">
                          <Play className="button-reference__icon-svg w-3 h-3" />
                          <ChevronRight className="button-reference__icon-svg--copy w-3 h-3" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Knowledge Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-slate-400 text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{article.title}</h3>
                  <p className="text-slate-300 mb-4">{article.excerpt}</p>
                  <button className="button-reference">
                    <span>Read Article</span>
                    <div className="button-reference__icon-wrapper">
                      <BookOpen className="button-reference__icon-svg w-3 h-3" />
                      <ChevronRight className="button-reference__icon-svg--copy w-3 h-3" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Structured Learning Paths</h2>
            <div className="space-y-6">
              {learningPaths.map((path, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{path.title}</h3>
                      <p className="text-slate-300 mb-4">{path.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {path.skills.map((skill) => (
                          <span key={skill} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-slate-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{path.modules} modules</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{path.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <button className="button">
                        <Target className="w-4 h-4" />
                        <span>Start Path</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div>
            <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
              <div className="mb-6">
                <Award className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Test Your Knowledge</h2>
                <p className="text-slate-300">
                  Take our comprehensive quiz to assess your understanding of football techniques and training principles.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-1">Technique Quiz</h4>
                  <p className="text-slate-300 text-sm mb-3">15 questions • 10 min</p>
                  <button className="button-reference w-full">
                    <span>Start Quiz</span>
                    <div className="button-reference__icon-wrapper">
                      <HelpCircle className="button-reference__icon-svg w-3 h-3" />
                      <Play className="button-reference__icon-svg--copy w-3 h-3" />
                    </div>
                  </button>
                </div>
                
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-1">AI Analysis Quiz</h4>
                  <p className="text-slate-300 text-sm mb-3">10 questions • 7 min</p>
                  <button className="button-reference w-full">
                    <span>Start Quiz</span>
                    <div className="button-reference__icon-wrapper">
                      <HelpCircle className="button-reference__icon-svg w-3 h-3" />
                      <Play className="button-reference__icon-svg--copy w-3 h-3" />
                    </div>
                  </button>
                </div>
                
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-1">Training Quiz</h4>
                  <p className="text-slate-300 text-sm mb-3">12 questions • 8 min</p>
                  <button className="button-reference w-full">
                    <span>Start Quiz</span>
                    <div className="button-reference__icon-wrapper">
                      <HelpCircle className="button-reference__icon-svg w-3 h-3" />
                      <Play className="button-reference__icon-svg--copy w-3 h-3" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Why Take Quizzes?</h3>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div>
                    <Target className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-slate-300 text-sm">Identify knowledge gaps and areas for improvement</p>
                  </div>
                  <div>
                    <Award className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-slate-300 text-sm">Earn certificates and track your learning progress</p>
                  </div>
                  <div>
                    <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-slate-300 text-sm">Get personalized recommendations for further learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tips Section */}
        <div className="mt-12 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
            Quick Learning Tips
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <Video className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-1">Watch Regularly</h4>
              <p className="text-slate-300 text-sm">Consistent learning leads to better retention</p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-1">Practice Daily</h4>
              <p className="text-slate-300 text-sm">Apply what you learn immediately</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-1">Join Community</h4>
              <p className="text-slate-300 text-sm">Learn from other athletes' experiences</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="text-white font-medium mb-1">Track Progress</h4>
              <p className="text-slate-300 text-sm">Monitor your improvement over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}