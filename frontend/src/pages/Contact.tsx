import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, Calendar, Award, Send, Building, Users, HeadphonesIcon, Briefcase } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', category: '', message: '' });
  };

  const academies = [
    {
      id: 1,
      name: 'Elite Sports Academy',
      location: 'Mumbai, Maharashtra',
      specialties: ['Football', 'Basketball', 'Cricket'],
      contactPerson: 'Rajesh Kumar',
      designation: 'Director of Sports',
      email: 'rajesh@elitesports.in',
      phone: '+91 98765 43210',
      description: 'Premier sports academy with state-of-the-art facilities and expert coaching staff.',
      logo: '🏆'
    },
    {
      id: 2,
      name: 'Champions Training Center',
      location: 'Delhi, NCR',
      specialties: ['Tennis', 'Badminton', 'Swimming'],
      contactPerson: 'Priya Sharma',
      designation: 'Head Coach',
      email: 'priya@championstc.com',
      phone: '+91 87654 32109',
      description: 'Specialized training center focusing on individual sports excellence and athlete development.',
      logo: '🥇'
    },
    {
      id: 3,
      name: 'Future Stars Academy',
      location: 'Bangalore, Karnataka',
      specialties: ['Football', 'Hockey', 'Athletics'],
      contactPerson: 'Vikram Singh',
      designation: 'Academy Manager',
      email: 'vikram@futurestars.org',
      phone: '+91 76543 21098',
      description: 'Youth-focused academy with emphasis on holistic athlete development and sports science.',
      logo: '⭐'
    },
    {
      id: 4,
      name: 'Apex Sports Institute',
      location: 'Chennai, Tamil Nadu',
      specialties: ['Cricket', 'Volleyball', 'Kabaddi'],
      contactPerson: 'Meera Patel',
      designation: 'Sports Coordinator',
      email: 'meera@apexsports.in',
      phone: '+91 65432 10987',
      description: 'Traditional sports institute with focus on regional and national level competitions.',
      logo: '🎯'
    }
  ];

  const officials = [
    {
      id: 1,
      name: 'Coach Arjun Menon',
      photo: '👨‍🏫',
      certification: 'FIFA Level 3 Certified',
      specialization: ['Football Coaching', 'Youth Development', 'Tactical Analysis'],
      experience: '12 years',
      email: 'arjun.menon@nextchamp.in',
      available: true,
      achievements: 'Former National Team Assistant Coach'
    },
    {
      id: 2,
      name: 'Dr. Sunita Rao',
      photo: '👩‍⚕️',
      certification: 'Sports Medicine Specialist',
      specialization: ['Injury Prevention', 'Rehabilitation', 'Performance Analysis'],
      experience: '15 years',
      email: 'sunita.rao@nextchamp.in',
      available: true,
      achievements: 'Olympic Team Medical Officer'
    },
    {
      id: 3,
      name: 'Coach Ravi Krishnan',
      photo: '🏃‍♂️',
      certification: 'Level 4 Athletics Coach',
      specialization: ['Sprint Training', 'Endurance', 'Track & Field'],
      experience: '10 years',
      email: 'ravi.krishnan@nextchamp.in',
      available: false,
      achievements: 'Asian Games Medal Winner Coach'
    },
    {
      id: 4,
      name: 'Prof. Anjali Gupta',
      photo: '👩‍🎓',
      certification: 'Sports Psychology PhD',
      specialization: ['Mental Conditioning', 'Performance Psychology', 'Team Dynamics'],
      experience: '8 years',
      email: 'anjali.gupta@nextchamp.in',
      available: true,
      achievements: 'Sports Psychology Research Expert'
    }
  ];

  const contactCategories = [
    { icon: Building, title: 'Academy Partnership', desc: 'Join our network of elite training centers' },
    { icon: Users, title: 'Coaching Services', desc: 'Connect with certified coaches and officials' },
    { icon: HeadphonesIcon, title: 'Technical Support', desc: 'Get help with platform and app issues' },
    { icon: Briefcase, title: 'Business Inquiries', desc: 'Partnerships, sponsorships, and collaborations' }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Get in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Touch
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Connect with our network of elite academies, certified officials, and expert coaches. 
              We're here to help you achieve your sporting goals.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How Can We Help?</h2>
            <p className="text-slate-300">Choose the category that best fits your inquiry</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactCategories.map((category, index) => (
              <div key={index} className="text-center p-6 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
                <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg mb-4 inline-block">
                  <category.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-slate-300 text-sm">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academy Profiles */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Partner Academies</h2>
            <p className="text-slate-300">Connect with top sports academies across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academies.map((academy) => (
              <div key={academy.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:bg-slate-700 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{academy.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{academy.name}</h3>
                    <div className="flex items-center text-slate-300 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{academy.location}</span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {academy.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-600 bg-opacity-20 text-blue-400 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-4">{academy.description}</p>
                    
                    <div className="border-t border-slate-600 pt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-white font-medium">{academy.contactPerson}</span>
                        <span className="text-sm text-slate-400">- {academy.designation}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <a href={`mailto:${academy.email}`} className="text-sm text-blue-400 hover:text-blue-300">
                            {academy.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <a href={`tel:${academy.phone}`} className="text-sm text-blue-400 hover:text-blue-300">
                            {academy.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <button className="button mt-4 w-full">
                      Connect with Academy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Officials Directory */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Officials & Coaches Directory</h2>
            <p className="text-slate-300">Get expert guidance from certified professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officials.map((official) => (
              <div key={official.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:bg-slate-700 transition-colors">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{official.photo}</div>
                  <h3 className="text-lg font-semibold text-white">{official.name}</h3>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">{official.certification}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Specialization:</h4>
                    <div className="flex flex-wrap gap-1">
                      {official.specialization.map((spec, index) => (
                        <span key={index} className="px-2 py-1 bg-green-600 bg-opacity-20 text-green-400 text-xs rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{official.experience} experience</span>
                  </div>
                  
                  <div className="text-xs text-slate-400 bg-slate-700 p-2 rounded">
                    {official.achievements}
                  </div>
                  
                  <div className="pt-2 border-t border-slate-600">
                    <div className="flex items-center space-x-1 mb-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a href={`mailto:${official.email}`} className="text-sm text-blue-400 hover:text-blue-300">
                        Contact
                      </a>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      official.available ? 'bg-green-600 bg-opacity-20 text-green-400' : 'bg-red-600 bg-opacity-20 text-red-400'
                    }`}>
                      {official.available ? 'Available for consultation' : 'Currently unavailable'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Send us a Message</h2>
            <p className="text-slate-300">Have a specific question? Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>
          
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                    Inquiry Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="academy">Academy Partnership</option>
                    <option value="coaching">Coaching Services</option>
                    <option value="technical">Technical Support</option>
                    <option value="business">Business Inquiries</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>
              
              <button type="submit" className="button w-full flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="py-12 bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg mb-4 inline-block">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
              <p className="text-slate-300">support@nextchamp.in</p>
              <p className="text-slate-300">partnerships@nextchamp.in</p>
            </div>
            
            <div>
              <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg mb-4 inline-block">
                <Phone className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone Support</h3>
              <p className="text-slate-300">+91 1800-NEXTCHAMP</p>
              <p className="text-slate-300">Mon-Fri, 9 AM - 6 PM IST</p>
            </div>
            
            <div>
              <div className="bg-blue-600 bg-opacity-20 p-4 rounded-lg mb-4 inline-block">
                <HeadphonesIcon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
              <p className="text-slate-300">Within 24 hours</p>
              <p className="text-slate-300">Emergency: Within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;