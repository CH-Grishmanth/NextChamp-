import React from 'react';
import { Play, Share2, Save, Star, Trophy, Target, Zap, Award, TrendingUp, Users, Medal } from 'lucide-react';

export function Compete() {

  const analysisResults = [
    {
      id: 1,
      title: 'Shooting Analysis',
      videoThumbnail: 'https://image2url.com/images/1758692773928-4358297f-12ee-4163-8d19-7d54ce9fa3fc.jpeg',
      metrics: {
        accuracy: { score: 75, label: 'Accuracy' },
        speed: { score: 8, maxScore: 10, label: 'Speed' },
        posture: { score: 6.5, maxScore: 10, label: 'Posture' }
      },
      feedback: {
        highlight: 'Good speed',
        suggestion: 'improve ball control by keeping it closer.'
      },
      badge: {
        title: 'Rising Star',
        description: "You're showing great potential! Keep up the excellent work.",
        icon: 'star'
      }
    },
    {
      id: 2,
      title: 'Dribbling Analysis',
      videoThumbnail: 'https://image2url.com/images/1758690709577-5e6e03c3-e745-4bb7-869d-d346558d0a2c.jpeg',
      metrics: {
        accuracy: { score: 82, label: 'Ball Control' },
        speed: { score: 7, maxScore: 10, label: 'Agility' },
        posture: { score: 8.2, maxScore: 10, label: 'Balance' }
      },
      feedback: {
        highlight: 'Excellent control',
        suggestion: 'focus on maintaining speed during direction changes.'
      },
      badge: {
        title: 'Skill Master',
        description: "Outstanding technique! Your skills are improving rapidly.",
        icon: 'trophy'
      }
    },
    {
      id: 3,
      title: 'Agility Analysis',
      videoThumbnail: 'https://image2url.com/images/1758692871891-ba8fae8f-fb60-4f48-9e64-92775414df02.jpeg',
      metrics: {
        accuracy: { score: 68, label: 'Precision' },
        speed: { score: 9, maxScore: 10, label: 'Sprint Speed' },
        posture: { score: 7.8, maxScore: 10, label: 'Form' }
      },
      feedback: {
        highlight: 'Impressive speed',
        suggestion: 'work on maintaining form during high-intensity movements.'
      },
      badge: {
        title: 'Speed Demon',
        description: "Your explosive speed is remarkable! Perfect your technique.",
        icon: 'zap'
      }
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Alex Rodriguez', score: 892, badge: 'Champion' },
    { rank: 2, name: 'Maria Santos', score: 875, badge: 'Elite' },
    { rank: 3, name: 'David Chen', score: 834, badge: 'Expert' },
    { rank: 4, name: 'Sarah Johnson', score: 812, badge: 'Advanced' },
    { rank: 5, name: 'Mike Wilson', score: 789, badge: 'Rising Star' }
  ];

  const currentAnalysis = analysisResults[0]; // Default to first analysis

  const getBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'star': return <Star className="w-6 h-6" />;
      case 'trophy': return <Trophy className="w-6 h-6" />;
      case 'zap': return <Zap className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Compete & Analyze</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Review your AI-powered performance analysis and compete with athletes worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analysis Display */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              {/* Video Section */}
              <div className="relative mb-6">
                <img
                  src={currentAnalysis.videoThumbnail}
                  alt="Analysis Video"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                  <button className="bg-white bg-opacity-20 p-6 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="button flex-1 justify-center">
                  <Save className="w-4 h-4" />
                  <span>Save Report</span>
                </button>
                <button className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share to Leaderboard</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Analysis Panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">AI Analysis</h2>

              {/* Metrics */}
              <div className="space-y-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{currentAnalysis.metrics.accuracy.label}</span>
                  <span className="text-3xl font-bold text-blue-400">{currentAnalysis.metrics.accuracy.score}%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{currentAnalysis.metrics.speed.label}</span>
                  <span className="text-3xl font-bold text-blue-400">
                    {currentAnalysis.metrics.speed.score}<span className="text-lg text-slate-400">/{currentAnalysis.metrics.speed.maxScore}</span>
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{currentAnalysis.metrics.posture.label}</span>
                  <span className="text-3xl font-bold text-blue-400">
                    {currentAnalysis.metrics.posture.score}<span className="text-lg text-slate-400">/{currentAnalysis.metrics.posture.maxScore}</span>
                  </span>
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Feedback</h3>
                <p className="text-slate-300">
                  <span className="text-blue-400 font-medium">{currentAnalysis.feedback.highlight}</span>, {currentAnalysis.feedback.suggestion}
                </p>
              </div>

              {/* Badge */}
              <div className="bg-blue-600 bg-opacity-20 rounded-lg p-4 border border-blue-500 border-opacity-30">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 bg-opacity-30 p-2 rounded-lg">
                    {getBadgeIcon(currentAnalysis.badge.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-blue-400 font-medium mb-1">BADGE EARNED</div>
                    <h4 className="text-lg font-bold text-white mb-1">{currentAnalysis.badge.title}</h4>
                    <p className="text-slate-300 text-sm">{currentAnalysis.badge.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="mt-12">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Global Leaderboard
              </h2>
              <button className="button-reference">
                <span>View Full Rankings</span>
                <div className="button-reference__icon-wrapper">
                  <TrendingUp className="button-reference__icon-svg w-3 h-3" />
                  <Users className="button-reference__icon-svg--copy w-3 h-3" />
                </div>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-300 pb-3">Rank</th>
                    <th className="text-left text-slate-300 pb-3">Athlete</th>
                    <th className="text-left text-slate-300 pb-3">Score</th>
                    <th className="text-left text-slate-300 pb-3">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player, index) => (
                    <tr key={index} className="border-b border-slate-700 last:border-b-0">
                      <td className="py-4">
                        <div className="flex items-center">
                          {player.rank <= 3 ? (
                            <Medal className={`w-5 h-5 mr-2 ${
                              player.rank === 1 ? 'text-yellow-400' : 
                              player.rank === 2 ? 'text-gray-300' : 
                              'text-orange-400'
                            }`} />
                          ) : null}
                          <span className="text-white font-bold">#{player.rank}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-white">{player.name}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-blue-400 font-bold">{player.score}</span>
                      </td>
                      <td className="py-4">
                        <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded-full text-sm">
                          {player.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">15</div>
            <div className="text-slate-300 text-sm">Analyses Completed</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">8</div>
            <div className="text-slate-300 text-sm">Badges Earned</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">+12%</div>
            <div className="text-slate-300 text-sm">Improvement Rate</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">#247</div>
            <div className="text-slate-300 text-sm">Global Rank</div>
          </div>
        </div>
      </div>
    </div>
  );
}