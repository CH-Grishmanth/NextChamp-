import React, { useRef, useState } from 'react';
import { Upload, Camera, Eye, Play } from 'lucide-react';

interface Drill {
  name: string;
  description: string;
  image: string;
}

interface SportInfo {
  name: string;
  icon: string;
  drills: Drill[];
}

const sportsData: Record<string, SportInfo> = {
  football: {
    name: 'Football',
    icon: '⚽',
    drills: [
      {
        name: 'Dribbling',
        description: 'Master ball control and close-dribbling techniques',
        image: 'https://image2url.com/images/1758690709577-5e6e03c3-e745-4bb7-869d-d346558d0a2c.jpeg'
      },
      {
        name: 'Shooting',
        description: 'Improve accuracy and power in your shots',
        image: 'https://image2url.com/images/1758692773928-4358297f-12ee-4163-8d19-7d54ce9fa3fc.jpeg'
      },
      {
        name: 'Agility Sprint',
        description: 'Enhance speed and lateral agility with sprint drills',
        image: 'https://image2url.com/images/1758692871891-ba8fae8f-fb60-4f48-9e64-92775414df02.jpeg'
      }
    ]
  },
  cricket: {
    name: 'Cricket',
    icon: '🏏',
    drills: [
      {
        name: 'Batting',
        description: 'Analyze stance, head position, backlift, and timing of drives',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Bowling',
        description: 'Optimize run-up, loading stance, action rotation, and release flow',
        image: 'https://images.unsplash.com/photo-1540747737956-37872404a82a?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Fielding',
        description: 'Improve catching stance, ground gathering, and throwing mechanics',
        image: 'https://images.unsplash.com/photo-1593341604618-27b6cbd25597?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  basketball: {
    name: 'Basketball',
    icon: '🏀',
    drills: [
      {
        name: 'Shooting',
        description: 'Refine elbow alignment, jump elevation, release arc, and follow-through',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Dribbling',
        description: 'Improve ball-handling speed, crossovers, and pocket retention',
        image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Defense',
        description: 'Work on lateral speed, slide stance, and spatial defensive positioning',
        image: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  volleyball: {
    name: 'Volleyball',
    icon: '🏐',
    drills: [
      {
        name: 'Serving',
        description: 'Optimize your toss stability, contact mechanics, and serve power',
        image: 'https://images.unsplash.com/photo-1592656094270-b98b90153667?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Spiking',
        description: 'Perfect approach footwork, vertical jump timing, and hitting arm swing',
        image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Setting',
        description: 'Improve set-overhead hand positioning, wrist cushion, and ball launch accuracy',
        image: 'https://images.unsplash.com/photo-1577471412413-ad50d1a1678e?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  hockey: {
    name: 'Hockey',
    icon: '🏑',
    drills: [
      {
        name: 'Dribbling',
        description: 'Enhance stickhandling speed, puck/ball control, and spatial awareness',
        image: 'https://images.unsplash.com/photo-1580748141549-71748d60bd9b?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Shooting',
        description: 'Train wrist strength, loading stance, and slap/wrist shot delivery form',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Passing',
        description: 'Perfect receiver absorption cushion and release direction precision',
        image: 'https://images.unsplash.com/photo-1547057416-ba97d8048b83?auto=format&fit=crop&q=80&w=400'
      }
    ]
  }
};

export function Discover() {
  const [selectedSport, setSelectedSport] = useState<string>('football');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`Uploading performance video for ${selectedSport}:`, file.name);
      // Backend hookup logic will handle this file
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const currentSport = sportsData[selectedSport] || sportsData.football;

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sports Selection Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-slate-700/60">
          {Object.entries(sportsData).map(([key, sport]) => (
            <button
              key={key}
              onClick={() => setSelectedSport(key)}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                selectedSport === key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/80'
              }`}
            >
              <span className="text-lg">{sport.icon}</span>
              <span>{sport.name}</span>
            </button>
          ))}
        </div>

        {/* Title Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{currentSport.name} Drills</h1>
          <p className="text-slate-300">Choose a drill category to get started with AI-powered analysis</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Drill Categories */}
          <div className="lg:col-span-3 space-y-6">
            {currentSport.drills.map((category, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                    <p className="text-slate-300 mb-4">{category.description}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="button-reference">
                        <span>View Reference</span>
                        <div className="button-reference__icon-wrapper">
                          <Eye className="button-reference__icon-svg w-4 h-4" />
                          <Play className="button-reference__icon-svg--copy w-4 h-4" />
                        </div>
                      </button>
                      <button 
                        onClick={handleUploadClick}
                        className="button flex items-center justify-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Your Video</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Generated Drill */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">AI Generated Drill</h3>
              <div className="bg-slate-700 rounded-lg p-4 mb-4">
                <div className="w-full h-32 bg-slate-600 rounded flex items-center justify-center text-slate-400">
                  Preview Coming Soon
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Personalized drill recommendations based on your performance history
              </p>
            </div>

            {/* Upload Your Performance */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Upload Your Performance</h3>
              <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mb-4 cursor-pointer hover:border-slate-500 transition-colors"
                onClick={handleUploadClick}
              >
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-300 mb-2">Drop your video here or click to browse</p>
                <p className="text-xs text-slate-400">MP4, MOV up to 100MB</p>
              </div>
              <button className="w-full button flex items-center justify-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Record with Camera</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="video/mp4,video/mov,video/avi,video/quicktime"
        style={{ display: 'none' }}
      />
    </div>
  );
}