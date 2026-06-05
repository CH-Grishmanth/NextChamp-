import React from 'react';
import { Upload, Target, TrendingUp, Users, Brain, Award, CheckCircle, Star } from 'lucide-react';

export function About() {
  const stats = [
    { value: '10,000+', label: 'Athletes using the platform', icon: Users },
    { value: '50,000+', label: 'Videos analyzed', icon: Target },
    { value: '25%', label: 'Average improvement rate', icon: TrendingUp },
    { value: '3', label: 'Sports supported', icon: Award }
  ];

  const features = [
    {
      icon: Upload,
      title: 'AI Video Analysis',
      description: 'Upload videos, get instant performance scores'
    },
    {
      icon: Brain,
      title: 'Personalized Feedback',
      description: 'Receive specific tips to improve your technique'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor improvement over time with detailed analytics'
    }
  ];

  const benefits = [
    'Instant Analysis: Get feedback immediately after upload',
    'Professional Quality: Same technology used by pro teams',
    'Continuous Learning: AI improves with every analysis'
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Your Video',
      description: 'Upload your sports drill video to our platform'
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'AI analyzes your technique and performance in real-time'
    },
    {
      number: '03',
      title: 'Get Results',
      description: 'Receive scores, feedback, and improvement suggestions'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Revolutionizing Sports Training with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              AI
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            NextChamp uses advanced AI to analyze your performance and help you reach your full potential
          </p>
        </div>

        {/* What We Do Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
                  <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg mb-4 inline-block">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16 bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-300 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Making professional-level sports analysis accessible to athletes worldwide through cutting-edge AI technology.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 bg-opacity-20 p-3 rounded-lg mr-4">
                  <Award className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Sports Scientists</h3>
                  <p className="text-slate-300 text-sm">Professional coaches and performance experts</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 bg-opacity-20 p-3 rounded-lg mr-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Engineers</h3>
                  <p className="text-slate-300 text-sm">Machine learning and computer vision specialists</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-slate-300 text-lg">
              <span className="text-blue-400 font-medium">Mission:</span> Combining sports expertise with advanced technology
            </p>
          </div>
        </div>

        {/* Why Choose NextChamp */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose NextChamp</h2>
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 border border-slate-600">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Elevate Your Game?</h2>
            <p className="text-slate-300 mb-6">Join thousands of athletes who are already improving with NextChamp</p>
            <button className="button">
              <Star className="w-4 h-4" />
              <span>Get Started Today</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}