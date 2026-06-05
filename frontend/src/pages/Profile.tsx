import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getUserProfile, 
  saveUserProfile, 
  getUserAnalysisHistory, 
  UserProfile, 
  AnalysisSession 
} from '../services/dbService';
import { 
  User as UserIcon, 
  Scale, 
  Ruler, 
  Calendar, 
  History, 
  Sparkles, 
  Video, 
  Award, 
  Edit3, 
  Save, 
  Plus, 
  X,
  Play
} from 'lucide-react';

export function Profile() {
  const { user, isAuthenticated, loginWithGoogle } = useAuth();
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    age: undefined,
    height: undefined,
    weight: undefined,
    sport: 'football',
    skills: []
  });
  
  const [history, setHistory] = useState<AnalysisSession[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Form states
  const [ageInput, setAgeInput] = useState('');
  const [heightInput, setHeightInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [sportInput, setSportInput] = useState('football');
  const [skillsList, setSkillsList] = useState<string[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfileAndHistory();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadProfileAndHistory = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Fetch Firestore profile
      const userProfile = await getUserProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
        setAgeInput(userProfile.age?.toString() || '');
        setHeightInput(userProfile.height?.toString() || '');
        setWeightInput(userProfile.weight?.toString() || '');
        setSportInput(userProfile.sport || 'football');
        setSkillsList(userProfile.skills || []);
      } else {
        // First time initialization
        const initialProfile = {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
          sport: 'football',
          skills: []
        };
        await saveUserProfile(user.id, initialProfile);
        setProfile(initialProfile);
      }

      // Fetch Firestore analysis history
      const userHistory = await getUserAnalysisHistory(user.id);
      setHistory(userHistory);
    } catch (error) {
      console.error('Failed to load profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaveLoading(true);
    try {
      const updatedData = {
        age: ageInput ? parseInt(ageInput, 10) : undefined,
        height: heightInput ? parseFloat(heightInput) : undefined,
        weight: weightInput ? parseFloat(weightInput) : undefined,
        sport: sportInput,
        skills: skillsList
      };

      await saveUserProfile(user.id, updatedData);
      setProfile(prev => ({ ...prev, ...updatedData }));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile details:', error);
      alert('Failed to save profile settings.');
    } finally {
      setSaveLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-900 py-16 px-4">
        <div className="max-w-md mx-auto bg-slate-800 rounded-lg p-8 border border-slate-700 text-center shadow-xl">
          <UserIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">My Profile</h2>
          <p className="text-slate-300 mb-6">Please log in to manage your physical attributes and view your AI analysis history.</p>
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.415 0-6.19-2.77-6.19-6.19 0-3.42 2.777-6.19 6.19-6.19 1.463 0 2.8.51 3.85 1.353l3.057-3.057C18.91 2.378 15.82 1 12.24 1A10.99 10.99 0 0 0 1.25 12a10.99 10.99 0 0 0 10.99 11c6.105 0 11.1-4.426 11.1-11 0-.74-.08-1.42-.2-2.01H12.24z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Header Block */}
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg shadow-blue-500/10">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-slate-300" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-slate-400 font-medium mb-3">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-blue-500/30">
                  {profile.sport}
                </span>
                <span className="bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-emerald-500/30">
                  Athlete Profile
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-650 text-white font-semibold py-2.5 px-5 rounded-lg border border-slate-600 transition-all text-sm active:scale-95"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form (Left Panel) */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center space-x-2.5 mb-6 pb-3 border-b border-slate-700/60">
                <UserIcon className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Physical Attributes</h2>
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Age</label>
                    <div className="relative">
                      <Calendar className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="number" 
                        value={ageInput} 
                        onChange={(e) => setAgeInput(e.target.value)} 
                        className="input pl-10 w-full bg-slate-900 border-slate-700 focus:border-blue-500 text-white rounded-lg py-2.5"
                        placeholder="e.g. 21"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Height (cm)</label>
                    <div className="relative">
                      <Ruler className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="number" 
                        value={heightInput} 
                        onChange={(e) => setHeightInput(e.target.value)} 
                        className="input pl-10 w-full bg-slate-900 border-slate-700 focus:border-blue-500 text-white rounded-lg py-2.5"
                        placeholder="e.g. 178"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Weight (kg)</label>
                    <div className="relative">
                      <Scale className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="number" 
                        value={weightInput} 
                        onChange={(e) => setWeightInput(e.target.value)} 
                        className="input pl-10 w-full bg-slate-900 border-slate-700 focus:border-blue-500 text-white rounded-lg py-2.5"
                        placeholder="e.g. 72"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Sport</label>
                    <select 
                      value={sportInput} 
                      onChange={(e) => setSportInput(e.target.value)}
                      className="input w-full bg-slate-900 border-slate-700 focus:border-blue-500 text-white rounded-lg py-2.5"
                    >
                      <option value="football">Football</option>
                      <option value="cricket">Cricket</option>
                      <option value="basketball">Basketball</option>
                      <option value="volleyball">Volleyball</option>
                      <option value="hockey">Hockey</option>
                    </select>
                  </div>

                  {/* Skills Editor */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</label>
                    <div className="flex gap-2 mb-3">
                      <input 
                        type="text" 
                        value={newSkill} 
                        onChange={(e) => setNewSkill(e.target.value)} 
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                        className="input flex-1 bg-slate-900 border-slate-700 focus:border-blue-500 text-white rounded-lg py-2.5 text-sm"
                        placeholder="Add skill (e.g. Dribbling)"
                      />
                      <button 
                        type="button" 
                        onClick={addSkill}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                      {skillsList.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-slate-700 text-slate-200 px-2.5 py-1 rounded-full text-xs font-medium flex items-center space-x-1.5 border border-slate-650"
                        >
                          <span>{skill}</span>
                          <button 
                            type="button" 
                            onClick={() => removeSkill(skill)}
                            className="text-slate-400 hover:text-red-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={saveLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors mt-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saveLoading ? 'Saving...' : 'Save Profile'}</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Read-Only Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/40 text-center">
                      <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                      <div className="text-slate-400 text-xs font-semibold mb-0.5">AGE</div>
                      <div className="text-xl font-extrabold text-white">{profile.age || '--'} yrs</div>
                    </div>
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/40 text-center">
                      <Ruler className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                      <div className="text-slate-400 text-xs font-semibold mb-0.5">HEIGHT</div>
                      <div className="text-xl font-extrabold text-white">{profile.height || '--'} cm</div>
                    </div>
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/40 text-center col-span-2">
                      <Scale className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                      <div className="text-slate-400 text-xs font-semibold mb-0.5">WEIGHT</div>
                      <div className="text-xl font-extrabold text-white">{profile.weight || '--'} kg</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">My Skillsets</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.skills && profile.skills.length > 0 ? (
                        profile.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-500 text-xs">No custom skills added yet. Edit profile to add skills.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Coach Chat & Analysis History (Right Panel) */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-700/60">
                <div className="flex items-center space-x-2.5">
                  <History className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">AI Analysis & Training History</h2>
                </div>
                <span className="bg-slate-900 text-slate-400 text-xs px-2.5 py-1 rounded-full font-medium">
                  {history.length} Session{history.length === 1 ? '' : 's'}
                </span>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/40 border border-dashed border-slate-700 rounded-xl">
                  <Sparkles className="w-12 h-12 text-slate-655 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">No performance records yet</h3>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto mb-4">
                    Once you upload videos on the Compete or Discover pages, the AI coach suggestions and reports will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {history.map((session, index) => (
                    <div 
                      key={session.id || index} 
                      className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-600/20 text-blue-400 p-2.5 rounded-lg border border-blue-500/10">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-md font-bold text-white">{session.drillCategory} Analysis</h3>
                            <span className="text-slate-400 text-xs">
                              {session.createdAt?.toDate ? session.createdAt.toDate().toLocaleDateString() : new Date(session.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 bg-yellow-500/10 text-yellow-400 px-3.5 py-1.5 rounded-full border border-yellow-500/20">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-extrabold">{session.score}%</span>
                        </div>
                      </div>

                      {/* Video reference */}
                      {session.videoUrl && (
                        <div className="mb-4 bg-black rounded-lg p-3 border border-slate-800 flex items-center justify-between">
                          <span className="text-xs text-slate-400 truncate max-w-xs">{session.videoName || 'performance_drill.mp4'}</span>
                          <a 
                            href={session.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-1.5 px-3.5 rounded flex items-center space-x-1.5 border border-slate-700"
                          >
                            <Play className="w-3 h-3 text-blue-400 fill-current" />
                            <span>Play Video</span>
                          </a>
                        </div>
                      )}

                      {/* Gemini Suggestions box */}
                      <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">AI Gemini Suggestions</span>
                        </div>
                        <p className="text-slate-300 text-sm italic">
                          "{session.geminiSuggestion}"
                        </p>
                        
                        {/* Bulleted points */}
                        {(session.suggestions && session.suggestions.length > 0) && (
                          <div className="mt-3 pt-3 border-t border-slate-700/60">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Actionable Drills</span>
                            <ul className="list-disc pl-4 space-y-1">
                              {session.suggestions.map((suggestion, sIdx) => (
                                <li key={sIdx} className="text-xs text-slate-300">{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}