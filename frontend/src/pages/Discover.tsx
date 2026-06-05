import React, { useRef } from 'react';
import { Upload, Camera, Eye, Play } from 'lucide-react';

export function Discover() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('Selected file:', file.name);
      // You can add your upload logic here
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const drillCategories = [
    {
      name: 'Dribbling',
      description: 'Master ball control and dribbling techniques',
      image: 'https://image2url.com/images/1758690709577-5e6e03c3-e745-4bb7-869d-d346558d0a2c.jpeg'
    },
    {
      name: 'Shooting',
      description: 'Improve accuracy and power in your shots',
      image: 'https://image2url.com/images/1758692773928-4358297f-12ee-4163-8d19-7d54ce9fa3fc.jpeg'
    },
    {
      name: 'Agility Sprint',
      description: 'Enhance speed and agility with sprint drills',
      image: 'https://image2url.com/images/1758692871891-ba8fae8f-fb60-4f48-9e64-92775414df02.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Football Drills</h1>
          <p className="text-slate-300">Choose a drill category to get started with AI-powered analysis</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Drill Categories */}
          <div className="lg:col-span-3 space-y-6">
            {drillCategories.map((category, index) => (
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