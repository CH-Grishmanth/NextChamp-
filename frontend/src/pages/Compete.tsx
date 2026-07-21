import React, { useState, useEffect } from 'react';
import {
  Play,
  Share2,
  Star,
  Trophy,
  Zap,
  Award,
  Upload,
  Loader2,
  Sparkles,
  History,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAnalysisSession, addChatMessage, getUserAnalysisHistory, deleteAnalysisSession } from '../services/dbService';
import axios from 'axios';

const sportMockData: Record<string, Array<{
  id: number;
  title: string;
  videoThumbnail: string;
  videoUrl: string;
  score: number;
  metrics: Array<{ label: string; score: number; maxScore: number }>;
  feedback: { highlight: string; suggestion: string };
  suggestions: string[];
  badge: { title: string; description: string; icon: string };
}>> = {
  Football: [
    {
      id: 1,
      title: 'Shooting Analysis',
      videoThumbnail: 'https://image2url.com/images/1758692773928-4358297f-12ee-4163-8d19-7d54ce9fa3fc.jpeg',
      videoUrl: '',
      score: 75,
      metrics: [
        { label: 'Accuracy', score: 75, maxScore: 100 },
        { label: 'Speed', score: 8, maxScore: 10 },
        { label: 'Posture', score: 6.5, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Good speed',
        suggestion: 'improve ball control by keeping it closer.'
      },
      suggestions: [
        'Ankle Lock Drill: Practice striking the ball with your laces locked down and front ankle firm.',
        'Torso Alignment: Keep your chest over the ball at contact to prevent shooting over the crossbar.',
        'Target Zone Reps: Set targets in the bottom corners of the goal and focus on placement over power.'
      ],
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
      videoUrl: '',
      score: 82,
      metrics: [
        { label: 'Ball Control', score: 82, maxScore: 100 },
        { label: 'Agility', score: 7, maxScore: 10 },
        { label: 'Balance', score: 8.2, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Excellent control',
        suggestion: 'focus on maintaining speed during direction changes.'
      },
      suggestions: [
        'Cone Slalom: Set up 5 cones 1 meter apart and navigate through them using only your inside/outside foot surfaces.',
        'Change of Pace Reps: Practice dribbling slowly then accelerating rapidly for 5 meters to lose defenders.',
        'Low Center of Gravity: Drop your hips when transitioning direction to maintain body control.'
      ],
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
      videoUrl: '',
      score: 68,
      metrics: [
        { label: 'Precision', score: 68, maxScore: 100 },
        { label: 'Sprint Speed', score: 9, maxScore: 10 },
        { label: 'Form', score: 7.8, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Impressive speed',
        suggestion: 'work on maintaining form during high-intensity movements.'
      },
      suggestions: [
        'Ladder Footwork: Run quick-feet drills through an agility ladder to improve foot speed and coordination.',
        'Deceleration Stops: Sprint 10 meters and practice stopping completely in under 3 steps with stable form.',
        'Plyometric Jumps: Perform box jumps and lateral bounds to build raw explosive leg power.'
      ],
      badge: {
        title: 'Speed Demon',
        description: "Your explosive speed is remarkable! Perfect your technique.",
        icon: 'zap'
      }
    }
  ],
  Cricket: [
    {
      id: 1,
      title: 'Batting Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 78,
      metrics: [
        { label: 'Footwork', score: 7.8, maxScore: 10 },
        { label: 'Head Position', score: 8.0, maxScore: 10 },
        { label: 'Backlift Alignment', score: 7.5, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Solid head positioning',
        suggestion: 'commit front foot fully to the pitch of the delivery.'
      },
      suggestions: [
        'Drop-Ball Drive: Practice step-and-drive mechanics with partner-dropped tennis balls.',
        'Stump Alignment: Keep front toe aligned with off-stump to ensure straight drive bat path.',
        'Shadow Batting: Perform 30 slow shadow strokes daily to lock elbow and knee positions.'
      ],
      badge: {
        title: 'Balanced Batter',
        description: "Outstanding head stability and postural balance.",
        icon: 'star'
      }
    },
    {
      id: 2,
      title: 'Bowling Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1540747737956-37872404a82a?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 72,
      metrics: [
        { label: 'Run-up Rhythm', score: 7.2, maxScore: 10 },
        { label: 'Release Point', score: 7.5, maxScore: 10 },
        { label: 'Braced Front Leg', score: 6.8, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Good release height',
        suggestion: 'brace front leg at crease landing for optimal power transfer.'
      },
      suggestions: [
        'Crease Stop Drill: Practice bowling and stopping at crease landing to lock front knee extension.',
        'Target Bowling: Focus on landing 15 balls consistently in the corridor of uncertainty.',
        'Rhythm Walk-ins: Walk/jog into release stance to synchronize arm swing and step.'
      ],
      badge: {
        title: 'Pace Artisan',
        description: "Great release control and follow-through acceleration.",
        icon: 'zap'
      }
    },
    {
      id: 3,
      title: 'Fielding Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1593341604618-27b6cbd25597?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 80,
      metrics: [
        { label: 'Reaction Time', score: 8.0, maxScore: 10 },
        { label: 'Catching Stance', score: 8.2, maxScore: 10 },
        { label: 'Throwing Velocity', score: 7.8, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Excellent foot speed',
        suggestion: 'stay low during ball gathering to minimize transit timing.'
      },
      suggestions: [
        'Wall Catching: Throw tennis balls against a wall at various angles to build reflex response.',
        'Pick and Throw: Pick up a stationary ball and release to target in one continuous motion.',
        'Low Ready Splits: Practice lateral splitting stance to drop center of gravity before ball reach.'
      ],
      badge: {
        title: 'Fielding Dynamo',
        description: "Excellent reflex speed and ball collection accuracy.",
        icon: 'trophy'
      }
    }
  ],
  Basketball: [
    {
      id: 1,
      title: 'Shooting Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 76,
      metrics: [
        { label: 'Elbow Alignment', score: 7.6, maxScore: 10 },
        { label: 'Release Arc', score: 8.0, maxScore: 10 },
        { label: 'Wrist Snap', score: 7.2, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Excellent release arc',
        suggestion: 'tuck shooting elbow inside to prevent lateral drift.'
      },
      suggestions: [
        'Form Shooting: Stand 2 feet from basket and shoot with one hand to isolate wrist snap.',
        'Wall Target Reps: Shoot ball against a high wall target to maintain a consistent 50-degree arc.',
        'Elbow Strap Drills: Practice shooting motion with arm alignment guide to force tucked form.'
      ],
      badge: {
        title: 'Arc Master',
        description: "Consistent release timing and high shooting trajectory.",
        icon: 'trophy'
      }
    },
    {
      id: 2,
      title: 'Dribbling Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 84,
      metrics: [
        { label: 'Pound Power', score: 8.4, maxScore: 10 },
        { label: 'Pocket Control', score: 8.0, maxScore: 10 },
        { label: 'Low Stance', score: 8.8, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Superb stance depth',
        suggestion: 'keep eyes up and forward instead of tracking the ball.'
      },
      suggestions: [
        'Two-Ball Dribbling: Bounce two balls simultaneously while marching in place.',
        'Blindfold Control: Bounce ball with closed eyes or target glasses to build tactile trust.',
        'Crossover Cone Sweeps: Drop-crossover at cone line and sweep opposite hand to reach floor.'
      ],
      badge: {
        title: 'Ankle Breaker',
        description: "Outstanding ball control depth and crossover speed.",
        icon: 'zap'
      }
    },
    {
      id: 3,
      title: 'Defense Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 70,
      metrics: [
        { label: 'Lateral Speed', score: 7.0, maxScore: 10 },
        { label: 'Slide Stance', score: 7.5, maxScore: 10 },
        { label: 'Drop Step Form', score: 6.5, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Great hand activation',
        suggestion: 'avoid heel-crossing; slide toes laterally to maintain balance.'
      },
      suggestions: [
        'Lane Slides: Slide side-to-side across key lanes focusing on wide, active stance.',
        'Drop Step Recovery: Practice pivoting hip back at 45 degrees to track driving mock offensive players.',
        'Wall Sit Holds: Hold defensive stance against wall for 60 seconds to build quad endurance.'
      ],
      badge: {
        title: 'Lockdown Guard',
        description: "Great stance stability and lateral slide width.",
        icon: 'star'
      }
    }
  ],
  Volleyball: [
    {
      id: 1,
      title: 'Serving Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1592656094270-b98b90153667?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 74,
      metrics: [
        { label: 'Toss Consistency', score: 7.4, maxScore: 10 },
        { label: 'Contact Point', score: 7.8, maxScore: 10 },
        { label: 'Swing Speed', score: 7.0, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Stable toss height',
        suggestion: 'strike ball with solid open palm to produce clean float path.'
      },
      suggestions: [
        'Toss-and-Catch: Practice tossing ball with non-dominant arm and catch it on sweet spot.',
        'Wall Float Serves: Serve against wall from 6 meters out focusing on solid wrist contact.',
        'Arm Swing Isolation: Hold hitting arm back and swing elbow high through contact line.'
      ],
      badge: {
        title: 'Float Specialist',
        description: "Excellent toss control and float setting.",
        icon: 'star'
      }
    },
    {
      id: 2,
      title: 'Spiking Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 81,
      metrics: [
        { label: 'Approach Footwork', score: 8.1, maxScore: 10 },
        { label: 'Jump Height', score: 8.5, maxScore: 10 },
        { label: 'Arm Swing Arc', score: 7.8, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Great explosive jump',
        suggestion: 'swing hitting shoulder fully back and snap wrist down over the ball.'
      },
      suggestions: [
        '3-Step Footwork: Practice Left-Right-Left landing approach without ball until muscle lock.',
        'Tennis Ball Spikes: Bounce tennis balls over net with full spike swing to train wrist angle.',
        'Box Jumps: Execute 20 box jumps daily to maximize vertical launch height.'
      ],
      badge: {
        title: 'Sky Striker',
        description: "Excellent vertical launch speed and approach footwork width.",
        icon: 'zap'
      }
    },
    {
      id: 3,
      title: 'Setting Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1577471412413-ad50d1a1678e?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 77,
      metrics: [
        { label: 'Hand Position', score: 7.7, maxScore: 10 },
        { label: 'Wrist Cushion', score: 8.0, maxScore: 10 },
        { label: 'Launch Accuracy', score: 7.4, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Nice finger cushion',
        suggestion: 'push from legs to direct high balls to hitter line.'
      },
      suggestions: [
        'Wall Setting: Sit on floor and set continuously against wall to isolate wrist strength.',
        'Basket Target Sets: Set ball into a basketball hoop or basket target from set location.',
        'Heavy-Ball Training: Practice set reps with a weighted setter ball to build finger drive.'
      ],
      badge: {
        title: 'Court Conductor',
        description: "Outstanding wrist cushions and high set direction precision.",
        icon: 'trophy'
      }
    }
  ],
  Hockey: [
    {
      id: 1,
      title: 'Dribbling Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1580748141549-71748d60bd9b?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 79,
      metrics: [
        { label: 'Stickhandling Speed', score: 7.9, maxScore: 10 },
        { label: 'Ball/Puck Control', score: 8.2, maxScore: 10 },
        { label: 'Wrist Rotation', score: 7.6, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Fast stick handles',
        suggestion: 'rotate top hand wrist fully to roll stick blade over ball.'
      },
      suggestions: [
        'Figure-8 Stickhandling: Guide ball/puck in figure-8 shape around two markers.',
        'Wide Handles: Slide ball 1 meter left and right across stance width.',
        'Top Hand Isolation: Hold stick only with top hand and practice slow rolls.'
      ],
      badge: {
        title: 'Stick Wizard',
        description: "Excellent stickhandling wrist rotation and ball cushioning.",
        icon: 'trophy'
      }
    },
    {
      id: 2,
      title: 'Shooting Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 73,
      metrics: [
        { label: 'Loading Stance', score: 7.3, maxScore: 10 },
        { label: 'Stick Acceleration', score: 7.5, maxScore: 10 },
        { label: 'Weight Transfer', score: 7.0, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Good stick speed',
        suggestion: 'transfer weight from back leg to front leg during sweep.'
      },
      suggestions: [
        'Step-in Sweeps: Practice wrist shots by stepping forward onto front foot.',
        'Target board drills: Shoot at a target board hanging inside goal frames.',
        'Flex Board Holds: Press stick blade onto floor to practice shaft flex.'
      ],
      badge: {
        title: 'Pace Striker',
        description: "Great weight transfer drive and wrist-snap velocity.",
        icon: 'zap'
      }
    },
    {
      id: 3,
      title: 'Passing Analysis',
      videoThumbnail: 'https://images.unsplash.com/photo-1547057416-ba97d8048b83?auto=format&fit=crop&q=80&w=400',
      videoUrl: '',
      score: 80,
      metrics: [
        { label: 'Release Direction', score: 8.0, maxScore: 10 },
        { label: 'Absorption Cushion', score: 8.2, maxScore: 10 },
        { label: 'Stick Alignment', score: 7.8, maxScore: 10 }
      ],
      feedback: {
        highlight: 'Soft absorption hands',
        suggestion: 'point toe of stick blade directly at target on pass release.'
      },
      suggestions: [
        'Rebounder Reps: Pass against rebounder board absorbing return with soft wrist cushion.',
        'Target Gate Passes: Pass ball/puck through a narrow 30cm gate from 5 meters away.',
        'One-Touch Releases: Redirect incoming passes to targets without trapping ball.'
      ],
      badge: {
        title: 'Precision Passer',
        description: "Superb blade control and soft-hands absorption control.",
        icon: 'star'
      }
    }
  ]
};

const getSmartMockReply = (message: string, drill: string, score: number, suggestions: string[], mistakes: string[]): string => {
  const msg = message.toLowerCase();
  const drillName = drill.toLowerCase();

  if (msg.includes('posture') || msg.includes('form') || msg.includes('body') || msg.includes('angle') || msg.includes('joint')) {
    return `For your ${drillName} drill, focus on body lean and keeping your joints aligned. Try working on a more stable stance throughout your movement.`;
  }
  if (msg.includes('speed') || msg.includes('power') || msg.includes('fast') || msg.includes('slow')) {
    return `To build better speed and power in ${drillName}, focus on explosive hip rotation and a quick snap of the knee. Keep your muscles relaxed before launching the strike.`;
  }
  if (msg.includes('score') || msg.includes('percent') || msg.includes('points') || msg.includes('mark')) {
    return `Your score of ${score}% is a solid foundation! To push it past 85%, focus on correcting your balance and performing slow shadow drill reps.`;
  }
  if (msg.includes('mistake') || msg.includes('flaw') || msg.includes('wrong') || msg.includes('error')) {
    if (mistakes && mistakes.length > 0) {
      return `The main posture warning flagged is: "${mistakes[0]}". Concentrate on correcting this alignment to improve your scores.`;
    }
    return `No major posture warnings were flagged! Focus on consistency and balance.`;
  }
  if (msg.includes('tip') || msg.includes('suggest') || msg.includes('help') || msg.includes('improve') || msg.includes('drill')) {
    if (suggestions && suggestions.length > 0) {
      const cleanTip = suggestions[0].split(':')[0];
      return `I highly recommend starting with this key adjustment: "${cleanTip}". Practice 20 shadow reps daily to build muscle memory.`;
    }
    return `Try performing slow-motion shadow practice of ${drillName} 3 times a week, focusing entirely on your balance and extension.`;
  }
  if (msg.includes('hello') || msg.includes('hi ') || msg.includes('hey')) {
    return `Hello! I am your AI Coaching assistant. I have reviewed your ${drillName} performance. What specific technical aspect would you like to improve?`;
  }

  // Default varied responses
  const fallbacks = [
    `To improve your ${drillName} score of ${score}%, try focusing on smooth body rotation and balance drills. Keep practicing!`,
    `Great attempt at the ${drillName}! Make sure to keep your chest over the ball at contact to keep it stable.`,
    `Analyzing your timing shows good progress. Focus on maintaining standard joint angles for better consistency.`,
    `Repetition is key! Try recording yourself from a side angle next time to check your alignment.`
  ];
  const hash = message.length % fallbacks.length;
  return fallbacks[hash];
};

export function Compete() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state as { uploadedVideoFile?: File; drillName?: string; sportName?: string } | null;


  const initialLeaderboard = [
    { rank: 1, name: 'Alex Rodriguez', score: 892, badge: 'Champion' },
    { rank: 2, name: 'Maria Santos', score: 875, badge: 'Elite' },
    { rank: 3, name: 'David Chen', score: 834, badge: 'Expert' },
    { rank: 4, name: 'Sarah Johnson', score: 812, badge: 'Advanced' },
    { rank: 5, name: 'Mike Wilson', score: 789, badge: 'Rising Star' }
  ];

  // Active States
  const [activeSport, setActiveSport] = useState<string>('Football');
  const [selectedDrillIndex, setSelectedDrillIndex] = useState(0);
  const [customAnalysis, setCustomAnalysis] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState('');
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [shared, setShared] = useState(false);

  // Chat Coach States
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'gemini', message: string, timestamp: Date }>>([
    { sender: 'gemini', message: 'Hello! I am your Gemini AI Coach. Upload your drill video above, and we can discuss your posture and performance, and plan corrections.', timestamp: new Date() }
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [userMessageInput, setUserMessageInput] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // History Modal States
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historySessions, setHistorySessions] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  const handleDeleteHistorySession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this analysis session?")) return;
    try {
      await deleteAnalysisSession(sessionId);
      setHistorySessions(prev => prev.filter(s => s.id !== sessionId));
      if (activeSessionId === sessionId) {
        setCustomAnalysis(null);
        setActiveSessionId(null);
      }
      alert("Session deleted successfully.");
    } catch (err) {
      console.error("Failed to delete session:", err);
      alert("Failed to delete session.");
    } finally {
      setActiveActionMenuId(null);
    }
  };

  const handleShareHistorySession = (e: React.MouseEvent, session: any) => {
    e.stopPropagation();
    const athleteName = user ? user.name : 'You';
    const newEntry = {
      rank: 1,
      name: athleteName,
      score: (session.score || 75) * 10,
      badge: session.badge?.title || 'Form Master'
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .map((player, idx) => ({
        ...player,
        rank: idx + 1
      }));

    setLeaderboard(updatedLeaderboard.slice(0, 6));
    alert('This session score has been shared to the global leaderboard!');
    setActiveActionMenuId(null);
  };

  const handleOpenHistory = async () => {
    if (!isAuthenticated || !user) {
      alert("Please sign in to view your analysis history!");
      return;
    }
    setShowHistoryModal(true);
    setIsLoadingHistory(true);
    try {
      const history = await getUserAnalysisHistory(user.id);
      setHistorySessions(history);
    } catch (err) {
      console.error("Failed to load history:", err);
      alert("Failed to load history from database.");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSelectHistorySession = (session: any) => {
    let matchedSport = 'Football';
    const drillCategory = session.drillCategory || 'General Performance';
    const drillLower = drillCategory.toLowerCase();
    
    for (const [sportKey, drills] of Object.entries(sportMockData)) {
      if (drills.some(d => d.title.toLowerCase().startsWith(drillLower))) {
        matchedSport = sportKey;
        break;
      }
    }
    setActiveSport(matchedSport);

    const mockList = sportMockData[matchedSport] || sportMockData.Football;
    const tabIndex = mockList.findIndex(d => d.title.toLowerCase().startsWith(drillLower));
    if (tabIndex !== -1) {
      setSelectedDrillIndex(tabIndex);
    }

    setCustomAnalysis({
      id: session.id,
      title: drillCategory + ' Analysis',
      videoThumbnail: mockList[tabIndex !== -1 ? tabIndex : 0]?.videoThumbnail || '',
      videoUrl: session.videoUrl,
      originalVideoUrl: session.originalVideoUrl || session.videoUrl,
      score: session.score,
      metrics: session.metrics || [],
      feedback: {
        highlight: 'Loaded from History',
        suggestion: session.geminiSuggestion || 'Analysis completed successfully.'
      },
      suggestions: session.suggestions || [],
      badge: session.badge || { title: 'Form Master', description: 'Loaded from history.', icon: 'star' }
    });

    setMessages(session.messages || [
      { sender: 'gemini', message: session.geminiSuggestion || 'Analysis loaded.', timestamp: new Date() }
    ]);
    setActiveSessionId(session.id);
    setShared(true);
    setShowHistoryModal(false);
  };

  const currentSportMockData = sportMockData[activeSport] || sportMockData.Football;
  const defaultAnalysis = currentSportMockData[selectedDrillIndex] || currentSportMockData[0];
  // If there is an active custom analysis, display it. Otherwise fallback to the active tab's default mockup.
  const currentAnalysis = customAnalysis ? customAnalysis : defaultAnalysis;

  useEffect(() => {
    if (stateData?.uploadedVideoFile) {
      const file = stateData.uploadedVideoFile;
      const drill = stateData.drillName || 'General Performance';
      const sport = stateData.sportName || 'Football';

      // Normalize sport name matching keys in sportMockData
      let matchedSport = 'Football';
      const sLower = sport.toLowerCase();
      if (sLower.includes('cricket')) matchedSport = 'Cricket';
      else if (sLower.includes('basketball')) matchedSport = 'Basketball';
      else if (sLower.includes('volleyball')) matchedSport = 'Volleyball';
      else if (sLower.includes('hockey')) matchedSport = 'Hockey';

      setActiveSport(matchedSport);

      // Select correct tab index matching the drill
      const mockList = sportMockData[matchedSport] || sportMockData.Football;
      const tabIndex = mockList.findIndex(d => d.title.toLowerCase().startsWith(drill.toLowerCase()));
      if (tabIndex !== -1) {
        setSelectedDrillIndex(tabIndex);
      } else {
        setSelectedDrillIndex(0);
      }

      runAnalysisForVideo(file, drill, matchedSport);

      // Clear route state to prevent re-runs on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [stateData]);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await runAnalysisForVideo(file, defaultAnalysis.title.replace(' Analysis', ''), activeSport);
  };

  const runAnalysisForVideo = async (file: File, drill: string, sport: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress('Uploading video to AI server...');
    setShared(false);

    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('drill', drill);
      formData.append('sport', sport);

      // POST to FastAPI server
      const response = await axios.post('http://localhost:8000/analyze-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const result = response.data; // { score, mistakes, suggestions, processedVideoUrl, geminiSuggestion, metrics, badge }

      setAnalysisProgress('Saving AI suggestions...');

      // Get metric values returned from backend or construct default ones
      let dbMetrics = result.metrics;
      if (!dbMetrics) {
        const scoreVal = result.score || 75;
        const sportLower = sport.toLowerCase();
        if (sportLower.includes('cricket')) {
          dbMetrics = [
            { label: 'Footwork', score: Math.round(scoreVal / 10), maxScore: 10 },
            { label: 'Head Position', score: Math.round(scoreVal / 10 - 1), maxScore: 10 },
            { label: 'Backlift Alignment', score: Math.round(scoreVal / 10 - 0.5), maxScore: 10 }
          ];
        } else if (sportLower.includes('basketball')) {
          dbMetrics = [
            { label: 'Elbow Alignment', score: Math.round(scoreVal / 10), maxScore: 10 },
            { label: 'Release Arc', score: Math.round(scoreVal / 10 - 0.5), maxScore: 10 },
            { label: 'Wrist Snap', score: Math.round(scoreVal / 10 - 1), maxScore: 10 }
          ];
        } else if (sportLower.includes('volleyball')) {
          dbMetrics = [
            { label: 'Approach Footwork', score: Math.round(scoreVal / 10), maxScore: 10 },
            { label: 'Jump Elevation', score: Math.round(scoreVal / 10 - 0.5), maxScore: 10 },
            { label: 'Arm Swing Speed', score: Math.round(scoreVal / 10 - 1), maxScore: 10 }
          ];
        } else if (sportLower.includes('hockey')) {
          dbMetrics = [
            { label: 'Stickhandling Speed', score: Math.round(scoreVal / 10), maxScore: 10 },
            { label: 'Loading Stance', score: Math.round(scoreVal / 10 - 0.5), maxScore: 10 },
            { label: 'Wrist Strength', score: Math.round(scoreVal / 10 - 1), maxScore: 10 }
          ];
        } else {
          dbMetrics = [
            { label: 'Ankle Angle', score: Math.round(scoreVal / 10), maxScore: 10 },
            { label: 'Posture Form', score: Math.round(scoreVal / 10 - 0.5), maxScore: 10 },
            { label: 'Leg Swing Speed', score: Math.round(scoreVal / 10 - 1), maxScore: 10 }
          ];
        }
      }

      const dbBadge = result.badge || {
        title: result.score > 85 ? 'Elite Performer' : 'Form Master',
        description: 'Great technical progress. Review details on your profile.',
        icon: result.score > 85 ? 'trophy' : 'star'
      };

      // Save to Firebase Firestore if authenticated
      if (isAuthenticated && user) {
        const sessionData = {
          userId: user.id,
          videoUrl: `http://localhost:8000${result.processedVideoUrl}`,
          videoName: file.name,
          drillCategory: drill,
          score: Math.round(result.score),
          geminiSuggestion: result.geminiSuggestion || 'Keep up the consistent posture and form.',
          mistakes: result.mistakes,
          suggestions: result.suggestions,
          metrics: dbMetrics,
          badge: dbBadge,
          messages: [
            { sender: 'gemini' as const, message: result.geminiSuggestion || 'Analysis completed.', timestamp: new Date() }
          ],
          createdAt: new Date()
        };

        const sessionId = await Promise.race([
          saveAnalysisSession(sessionData),
          new Promise<string>((resolve) => setTimeout(() => {
            console.warn("Firestore save timed out. Continuing locally.");
            resolve("temp_session_" + Date.now());
          }, 3500))
        ]);
        setActiveSessionId(sessionId);
        setMessages(sessionData.messages);
      } else {
        setMessages([
          { sender: 'gemini' as const, message: result.geminiSuggestion || 'Analysis completed. (Sign in to save analysis to your Profile)', timestamp: new Date() }
        ]);
      }

      // Create local visual object
      const processedResult = {
        id: Date.now(),
        title: drill + ' Analysis',
        videoThumbnail: defaultAnalysis.videoThumbnail,
        videoUrl: `http://localhost:8000${result.processedVideoUrl}`,
        score: Math.round(result.score),
        metrics: dbMetrics,
        feedback: {
          highlight: 'Pose Analysis Completed',
          suggestion: result.geminiSuggestion || 'Analysis completed successfully.'
        },
        suggestions: result.suggestions || [],
        mistakes: result.mistakes || [],
        badge: dbBadge
      };

      setCustomAnalysis(processedResult);
      if (isAuthenticated && user) {
        alert('Analysis completed and successfully saved to your Profile!');
      } else {
        alert('Analysis completed! Note: Sign in to save this analysis to your Profile.');
      }

    } catch (error) {
      console.warn('FastAPI server offline or error. Simulating AI analysis...');
      await runSimulatedAnalysis(file, drill, sport);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress('');
    }
  };

  const runSimulatedAnalysis = async (file: File, drill: string, sport: string) => {
    setAnalysisProgress('Simulating joint estimation using MediaPipe...');

    // Simulate some latency for the AI loading sequence
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockScore = Math.floor(Math.random() * 20) + 75; // 75 - 95
    const mockSuggestions = [
      'Focus on full extension at the contact point.',
      'Sustain visual alignment towards target during motion flow.',
      'Maintain balanced body lean through completion.'
    ];
    const mockMistakes = [
      'Joint angle leans slightly off vertical baseline',
      'Follow-through is premature'
    ];

    // Sport-specific dynamic metrics simulated:
    let simulatedMetrics = [];
    let simulatedBadge = { title: 'Skill Master', description: 'Outstanding technical form.', icon: 'trophy' };
    const sportLower = sport.toLowerCase();

    if (sportLower.includes('cricket')) {
      simulatedMetrics = [
        { label: 'Footwork', score: Math.round(mockScore / 10), maxScore: 10 },
        { label: 'Head Position', score: Math.round(mockScore / 10 - 1), maxScore: 10 },
        { label: 'Backlift Alignment', score: Math.round(mockScore / 10 - 0.5), maxScore: 10 }
      ];
      simulatedBadge = { title: 'Stance Specialist', description: 'Excellent head alignment and posture.', icon: 'star' };
    } else if (sportLower.includes('basketball')) {
      simulatedMetrics = [
        { label: 'Elbow Alignment', score: Math.round(mockScore / 10), maxScore: 10 },
        { label: 'Release Arc', score: Math.round(mockScore / 10 - 0.5), maxScore: 10 },
        { label: 'Wrist Snap', score: Math.round(mockScore / 10 - 1), maxScore: 10 }
      ];
      simulatedBadge = { title: 'Arc Master', description: 'Consistent wrist release and shooting arc.', icon: 'trophy' };
    } else if (sportLower.includes('volleyball')) {
      simulatedMetrics = [
        { label: 'Approach Footwork', score: Math.round(mockScore / 10), maxScore: 10 },
        { label: 'Jump Elevation', score: Math.round(mockScore / 10 - 0.5), maxScore: 10 },
        { label: 'Arm Swing Speed', score: Math.round(mockScore / 10 - 1), maxScore: 10 }
      ];
      simulatedBadge = { title: 'Net Dominator', description: 'Outstanding vertical elevation and swing timing.', icon: 'zap' };
    } else if (sportLower.includes('hockey')) {
      simulatedMetrics = [
        { label: 'Stickhandling Speed', score: Math.round(mockScore / 10), maxScore: 10 },
        { label: 'Loading Stance', score: Math.round(mockScore / 10 - 0.5), maxScore: 10 },
        { label: 'Wrist Strength', score: Math.round(mockScore / 10 - 1), maxScore: 10 }
      ];
      simulatedBadge = { title: 'Puck Wizard', description: 'Excellent stick control and wrist acceleration.', icon: 'trophy' };
    } else {
      // Football / default
      simulatedMetrics = [
        { label: 'Ankle Angle', score: Math.round(mockScore / 10), maxScore: 10 },
        { label: 'Posture Form', score: Math.round(mockScore / 10 - 0.5), maxScore: 10 },
        { label: 'Leg Swing Speed', score: Math.round(mockScore / 10 - 1), maxScore: 10 }
      ];
      simulatedBadge = { title: 'Strike Prodigy', description: 'Superb foot alignment and contact accuracy.', icon: 'zap' };
    }

    try {
      const localVideoUrl = URL.createObjectURL(file);
      if (isAuthenticated && user) {
        const sessionData = {
          userId: user.id,
          videoUrl: localVideoUrl,
          videoName: file.name,
          drillCategory: drill,
          score: mockScore,
          geminiSuggestion: mockSuggestions[0],
          mistakes: mockMistakes,
          suggestions: mockSuggestions,
          metrics: simulatedMetrics,
          badge: simulatedBadge,
          messages: [
            { sender: 'gemini' as const, message: mockSuggestions[0], timestamp: new Date() }
          ],
          createdAt: new Date()
        };

        const sessionId = await Promise.race([
          saveAnalysisSession(sessionData),
          new Promise<string>((resolve) => setTimeout(() => {
            console.warn("Firestore save timed out during simulation. Continuing locally.");
            resolve("temp_session_" + Date.now());
          }, 3500))
        ]);
        setActiveSessionId(sessionId);
        setMessages(sessionData.messages);
      } else {
        setMessages([
          { sender: 'gemini' as const, message: mockSuggestions[0], timestamp: new Date() }
        ]);
      }

      const processedResult = {
        id: Date.now(),
        title: drill + ' Analysis',
        videoThumbnail: defaultAnalysis.videoThumbnail,
        videoUrl: localVideoUrl,
        score: mockScore,
        metrics: simulatedMetrics,
        feedback: {
          highlight: 'Pose Analysis Completed',
          suggestion: mockSuggestions[0]
        },
        suggestions: mockSuggestions,
        mistakes: mockMistakes,
        badge: simulatedBadge
      };

      setCustomAnalysis(processedResult);
      if (isAuthenticated && user) {
        alert('AI Server Simulation Successful! Mock analysis stored to your profile history.');
      } else {
        alert('AI Server Simulation Successful! Note: Sign in to save this analysis to your Profile.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to simulate analysis storage: ' + (err?.message || err));
    }
  };

  const shareToLeaderboard = () => {
    if (shared) return;

    const athleteName = user ? user.name : 'You';
    const newEntry = {
      rank: 1, // Will compute index below
      name: athleteName,
      score: (currentAnalysis.score || 75) * 10, // scaling score up to 1000 range
      badge: currentAnalysis.badge.title
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .map((player, idx) => ({
        ...player,
        rank: idx + 1
      }));

    setLeaderboard(updatedLeaderboard.slice(0, 6)); // top 6
    setShared(true);
    alert('Your drill score has been shared to the global leaderboard!');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessageInput.trim()) return;

    const userText = userMessageInput;
    setUserMessageInput('');
    setIsSendingMessage(true);

    const userMsg = { sender: 'user' as const, message: userText, timestamp: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    // Save user message to Firestore
    if (activeSessionId) {
      try {
        await addChatMessage(activeSessionId, 'user', userText);
      } catch (err) {
        console.error('Failed to save message to Firestore:', err);
      }
    }

    try {
      // POST user query and history context to backend chat coach
      const response = await axios.post('http://localhost:8000/chat-coaching', {
        drillCategory: defaultAnalysis.title.replace(' Analysis', ''),
        score: currentAnalysis.score || 75,
        mistakes: currentAnalysis.mistakes || [],
        suggestions: currentAnalysis.suggestions || [],
        message: userText,
        history: updatedMessages.map(m => ({ sender: m.sender, message: m.message }))
      });

      const replyText = response.data.reply;
      const coachMsg = { sender: 'gemini' as const, message: replyText, timestamp: new Date() };
      setMessages(prev => [...prev, coachMsg]);

      // Save Gemini response to Firestore
      if (activeSessionId) {
        await addChatMessage(activeSessionId, 'gemini', replyText);
      }
    } catch (error) {
      console.warn('Chat coach API offline. Simulating response...');
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockReply = getSmartMockReply(
        userText,
        defaultAnalysis.title.replace(' Analysis', ''),
        currentAnalysis.score || 75,
        currentAnalysis.suggestions || [],
        currentAnalysis.mistakes || []
      );
      const coachMsg = { sender: 'gemini' as const, message: mockReply, timestamp: new Date() };
      setMessages(prev => [...prev, coachMsg]);

      if (activeSessionId) {
        await addChatMessage(activeSessionId, 'gemini', mockReply);
      }
    } finally {
      setIsSendingMessage(false);
    }
  };

  const getBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'star': return <Star className="w-6 h-6 text-yellow-400" />;
      case 'trophy': return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 'zap': return <Zap className="w-6 h-6 text-yellow-400" />;
      default: return <Award className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Compete & Analyze</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Review your AI-powered performance analysis and compete with athletes worldwide
          </p>
          <div className="md:absolute md:top-4 md:right-0 mt-4 md:mt-0 flex justify-center">
            <button 
              onClick={handleOpenHistory}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-lg border border-slate-700 shadow-md transition-all active:scale-95 text-sm"
            >
              <History className="w-4 h-4 text-blue-450" />
              <span>History</span>
            </button>
          </div>
        </div>

        {/* 1. TOP SECTION: HUGE 16:9 VIDEO PLAYER */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 relative overflow-hidden shadow-xl mb-6">
          {/* Processing Overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-slate-900/90 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <h3 className="text-xl font-bold text-white mb-1">Processing Performance Video</h3>
              <p className="text-slate-400 text-sm max-w-xs">{analysisProgress}</p>
            </div>
          )}

          <div className="relative w-full aspect-video max-h-[600px] mx-auto bg-black rounded-lg overflow-hidden border border-slate-700">
            {currentAnalysis.videoUrl ? (
              <video
                src={currentAnalysis.videoUrl}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <img
                  src={currentAnalysis.videoThumbnail}
                  alt="Analysis Video"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button
                    onClick={() => alert('Please upload your video to start joint tracking and AI playback.')}
                    className="bg-white bg-opacity-20 p-6 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all active:scale-95"
                  >
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 2. MIDDLE SECTION: 3 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Column 1: AI Score */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2 border-b border-slate-700 pb-2">
                <Award className="w-5 h-5 text-blue-450" />
                <span>AI Score & Metrics</span>
              </h3>

              {customAnalysis ? (
                <div className="space-y-4 mb-6">
                  {Array.isArray(currentAnalysis.metrics) ? (
                    currentAnalysis.metrics.map((metric: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-slate-300 text-sm">{metric.label}</span>
                        <span className="text-2xl font-bold text-blue-400">
                          {metric.score}
                          <span className="text-xs text-slate-500 ml-0.5">
                            {metric.maxScore ? `/${metric.maxScore}` : ''}
                            {metric.label === 'Accuracy' && !metric.maxScore ? '%' : ''}
                          </span>
                        </span>
                      </div>
                    ))
                  ) : (
                    Object.entries(currentAnalysis.metrics).map(([key, metric]: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-slate-305 text-sm">{metric.label}</span>
                        <span className="text-2xl font-bold text-blue-400">
                          {metric.score}
                          <span className="text-xs text-slate-500 ml-0.5">
                            {metric.maxScore ? `/${metric.maxScore}` : ''}
                            {metric.label === 'Accuracy' && !metric.maxScore ? '%' : ''}
                          </span>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-slate-500 text-sm italic text-center py-8">
                  Upload a drill video to see your AI score and posture metrics.
                </div>
              )}
            </div>

            {/* Badge Info */}
            {customAnalysis && (
              <div className="bg-blue-600 bg-opacity-20 rounded-lg p-3.5 border border-blue-500 border-opacity-30 mt-auto">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 bg-opacity-30 p-2 rounded-lg">
                    {getBadgeIcon(currentAnalysis.badge.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-blue-400 font-bold mb-0.5 uppercase tracking-wider">Badge Earned</div>
                    <h4 className="text-sm font-bold text-white truncate">{currentAnalysis.badge.title}</h4>
                    <p className="text-slate-300 text-[11px] leading-snug line-clamp-2 mt-0.5">{currentAnalysis.badge.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Coaching Tips */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2 border-b border-slate-700 pb-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Coaching Tips</span>
            </h3>

            {customAnalysis && currentAnalysis.suggestions && currentAnalysis.suggestions.length > 0 ? (
              <ul className="space-y-3">
                {currentAnalysis.suggestions.map((tip: string, idx: number) => (
                  <li key={idx} className="text-slate-300 text-sm leading-relaxed flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-slate-500 text-sm italic text-center py-8">
                Upload a drill video to receive AI coaching tips.
              </div>
            )}
          </div>

          {/* Column 3: Upload Actions */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2 border-b border-slate-700 pb-2">
                <Upload className="w-5 h-5 text-purple-400" />
                <span>Upload & Actions</span>
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Select your sport and drill type below, then upload your performance video for AI analysis.
              </p>

              {/* Sport Selector */}
              <div className="mb-4">
                <label className="block text-slate-400 text-[10px] font-bold mb-1.5 uppercase tracking-wider">Select Sport</label>
                <select
                  value={activeSport}
                  onChange={(e) => {
                    setActiveSport(e.target.value);
                    setSelectedDrillIndex(0); // reset drill index
                  }}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="Football">Football ⚽</option>
                  <option value="Cricket">Cricket 🏏</option>
                  <option value="Basketball">Basketball 🏀</option>
                  <option value="Volleyball">Volleyball 🏐</option>
                  <option value="Hockey">Hockey 🏑</option>
                </select>
              </div>

              {/* Drill Selector */}
              <div className="mb-6">
                <label className="block text-slate-400 text-[10px] font-bold mb-1.5 uppercase tracking-wider">Select Drill</label>
                <select
                  value={selectedDrillIndex}
                  onChange={(e) => {
                    setSelectedDrillIndex(Number(e.target.value));
                  }}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  {currentSportMockData.map((drill, idx) => (
                    <option key={idx} value={idx}>
                      {drill.title.replace(' Analysis', '')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {/* Upload Button */}
              <div className="relative w-full">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <button className="button w-full justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-lg flex items-center space-x-2 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload Drill Video</span>
                </button>
              </div>

              {/* Share Button (Only shown after video is uploaded/analyzed) */}
              {customAnalysis && (
                <button
                  onClick={shareToLeaderboard}
                  disabled={shared}
                  className={`w-full py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 font-bold ${shared
                      ? 'bg-slate-700 text-slate-400 border border-slate-600 cursor-not-allowed'
                      : 'bg-emerald-650 hover:bg-emerald-600 text-white shadow-lg'
                    }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{shared ? 'Shared to Rankings' : 'Share to Leaderboard'}</span>
                </button>
              )}

              {/* Analyze Again / Reset Button */}
              {customAnalysis && (
                <button
                  onClick={() => {
                    setCustomAnalysis(null);
                    setShared(false);
                  }}
                  className="w-full py-3 px-4 rounded-lg border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <span>Analyze Another Video</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: AI COACH CHAT */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2 border-b border-slate-700 pb-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>AI Coach Chat</span>
          </h3>

          {/* Message display area (taller for full-width layout) */}
          <div className="space-y-3 max-h-80 overflow-y-auto mb-4 bg-slate-900/60 p-4 rounded-xl border border-slate-700 flex flex-col relative">
            {!customAnalysis && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl z-10">
                <div className="bg-slate-800 border border-slate-700 px-6 py-4 rounded-lg text-center max-w-sm shadow-xl m-4">
                  <Sparkles className="w-6 h-6 text-blue-450 mx-auto mb-2 animate-pulse" />
                  <p className="text-white text-sm font-bold">Chat is Locked</p>
                  <p className="text-slate-400 text-xs mt-1">Please upload and analyze a drill video first to start chatting with your AI coach!</p>
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-blue-600 text-white self-end rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 self-start rounded-tl-none border border-slate-700'
                  }`}
              >
                {msg.message}
              </div>
            ))}
            {isSendingMessage && (
              <div className="bg-slate-800 text-slate-400 self-start rounded-2xl rounded-tl-none px-4 py-2.5 text-xs border border-slate-700 animate-pulse">
                Coach is thinking...
              </div>
            )}
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              disabled={!customAnalysis}
              value={userMessageInput}
              onChange={(e) => setUserMessageInput(e.target.value)}
              placeholder={customAnalysis ? "Ask the coach a question about your pose, speed, or footwork..." : "Please upload a video to unlock the AI coach chat."}
              className="input flex-1 bg-slate-900 border-slate-700 focus:border-blue-500 text-white rounded-lg py-2.5 px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!customAnalysis || isSendingMessage || !userMessageInput.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>

        {/* History Modal */}
        {showHistoryModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
              <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                <div className="flex items-center space-x-2">
                  <History className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Analysis History</h3>
                </div>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-semibold"
                >
                  Close
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-3 bg-slate-900/40">
                {isLoadingHistory ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                    <p className="text-slate-400 text-sm">Loading your upload history...</p>
                  </div>
                ) : historySessions.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-white font-medium">No past analysis found</p>
                    <p className="text-slate-400 text-xs mt-1">Upload a video to start saving your history!</p>
                  </div>
                ) : (
                  historySessions.map((session) => {
                    // Match sport icon
                    let icon = '⚽';
                    const cat = (session.drillCategory || '').toLowerCase();
                    if (cat.includes('bat') || cat.includes('bowl') || cat.includes('field') || cat.includes('cricket')) icon = '🏏';
                    else if (cat.includes('basket') || cat.includes('shoot') || cat.includes('dribble') && !cat.includes('foot')) icon = '🏀';
                    else if (cat.includes('serve') || cat.includes('spike') || cat.includes('volleyball')) icon = '🏐';
                    else if (cat.includes('stick') || cat.includes('hockey')) icon = '🏑';

                    const dateStr = session.createdAt?.toDate 
                      ? session.createdAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : new Date(session.createdAt).toLocaleDateString();

                    return (
                      <div 
                        key={session.id}
                        onClick={() => handleSelectHistorySession(session)}
                        className={`bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between group active:scale-98 shadow-md relative ${
                          activeActionMenuId === session.id ? 'z-30' : 'z-10'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl bg-slate-900 p-2.5 rounded-lg border border-slate-700/60 group-hover:bg-slate-900/40">
                            {icon}
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                              {session.drillCategory}
                            </p>
                            <p className="text-slate-400 text-xxs mt-0.5">
                              {dateStr}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span className="text-lg font-extrabold text-blue-400">
                              {session.score}%
                            </span>
                            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                              AI Score
                            </p>
                          </div>

                          {/* 3-dots Action Menu */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveActionMenuId(activeActionMenuId === session.id ? null : session.id);
                              }}
                              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeActionMenuId === session.id && (
                              <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-35 animate-in fade-in slide-in-from-top-2 duration-150">
                                <button
                                  onClick={(e) => handleShareHistorySession(e, session)}
                                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center space-x-2 transition-colors font-semibold"
                                >
                                  <Share2 className="w-3.5 h-3.5 text-emerald-450" />
                                  <span>Share</span>
                                </button>
                                <button
                                  onClick={(e) => handleDeleteHistorySession(e, session.id)}
                                  className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-950/40 hover:text-red-300 flex items-center space-x-2 transition-colors font-semibold border-t border-slate-800"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}