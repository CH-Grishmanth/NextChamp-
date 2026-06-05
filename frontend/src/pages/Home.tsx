import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Upload, Target, Trophy } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url('https://image2url.com/images/1758653540507-ece673cb-d953-4699-b361-766cfc5d039a.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Tomorrow's{' '}
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(122,186,73,1) 18.2%, rgba(0,124,187,1) 78.1%)'
                }}
              >
                Champions Today
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Harness the power of AI to analyze, improve, and master your sports performance. 
              Upload your training videos and get instant feedback from our advanced AI platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/discover"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Upload Sports Drill</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/learn"
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-8 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Everything you need to take your game to the next level.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-xl hover:from-green-500 hover:to-green-600 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Upload Sports Drill</h3>
                <p className="text-green-100">
                  Easily upload videos of your sports drills to our platform.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-xl hover:from-teal-500 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Get AI Score & Feedback</h3>
                <p className="text-teal-100">
                  Receive detailed AI-powered scores and personalized feedback on your performance.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 rounded-xl hover:from-emerald-500 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Compete on Leaderboards</h3>
                <p className="text-emerald-100">
                  Showcase your skills and compete with others on our global leaderboards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}