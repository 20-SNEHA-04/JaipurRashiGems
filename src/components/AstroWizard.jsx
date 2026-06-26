import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, User, Heart, Briefcase, ShieldAlert, GraduationCap, Coins, ArrowRight, CheckCircle, Download, ShoppingBag } from 'lucide-react';
import { ASTRO_DEVICES, CATEGORIES } from '../database';
import GemRenderer from './GemRenderer';

export default function AstroWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    dob: '',
    tob: '',
    goal: 'Career'
  });
  const [calculating, setCalculating] = useState(false);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const goals = [
    { id: 'Career', label: 'Career & Authority', icon: Briefcase, color: 'blue' },
    { id: 'Wealth', label: 'Wealth & Fortune', icon: Coins, color: 'yellow' },
    { id: 'Health', label: 'Health & Vitality', icon: ShieldAlert, color: 'ruby' },
    { id: 'Relationships', label: 'Love & Marriage', icon: Heart, color: 'pink' },
    { id: 'Education', label: 'Education & Focus', icon: GraduationCap, color: 'emerald' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startCalculation = () => {
    setStep(4);
    setCalculating(true);
    const messages = [
      'Locating astronomical coordinates at birth time...',
      'Mapping Lagna Kundali (Ascendant chart)...',
      'Assessing Mahadasha & Antardasha planetary transits...',
      'Analyzing Shadbala planetary strengths...',
      'Calculating custom gemstone prescription matching goal: ' + formData.goal + '...'
    ];

    messages.forEach((msg, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        if (idx === messages.length - 1) {
          setTimeout(() => {
            computeRecommendation();
          }, 1000);
        }
      }, (idx + 1) * 800);
    });
  };

  const computeRecommendation = () => {
    // Elegant Vedic Calculation Mock based on Goal & Date of Birth
    const days = new Date(formData.dob).getDate() || 5;
    const zodiacKeys = Object.keys(ASTRO_DEVICES.zodiacs);
    const zodiacIndex = (days + formData.name.length) % zodiacKeys.length;
    const selectedZodiac = zodiacKeys[zodiacIndex];
    const zodiacData = ASTRO_DEVICES.zodiacs[selectedZodiac];
    
    // Choose primary gem based on zodiac, secondary gem based on goal
    let primaryGemKey = 'blue-sapphire';
    if (zodiacData.primary === 'Mercury') primaryGemKey = 'emerald';
    else if (zodiacData.primary === 'Sun') primaryGemKey = 'ruby';
    else if (zodiacData.primary === 'Moon') primaryGemKey = 'pearl';
    else if (zodiacData.primary === 'Mars') primaryGemKey = 'red-coral';
    else if (zodiacData.primary === 'Venus') primaryGemKey = 'opal';
    else if (zodiacData.primary === 'Jupiter') primaryGemKey = 'yellow-sapphire-pukhraj';

    let secondaryGemKey = 'emerald';
    if (formData.goal === 'Wealth') secondaryGemKey = 'yellow-sapphire-pukhraj';
    else if (formData.goal === 'Health') secondaryGemKey = 'red-coral';
    else if (formData.goal === 'Relationships') secondaryGemKey = 'opal';
    else if (formData.goal === 'Education') secondaryGemKey = 'emerald';
    else secondaryGemKey = 'blue-sapphire';

    // Fetch details
    const primaryPlanet = ASTRO_DEVICES.planets[zodiacData.primary] || ASTRO_DEVICES.planets.Saturn;
    
    setResult({
      zodiac: selectedZodiac,
      rashiName: zodiacData.sign,
      primaryGem: primaryGemKey,
      primaryPlanetName: zodiacData.primary,
      primaryPlanetInfo: primaryPlanet,
      secondaryGem: secondaryGemKey
    });
    setCalculating(false);
    setStep(5);
  };

  return (
    <div className="glass-panel gold-border p-8 max-w-2xl mx-auto my-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} className="text-gold" />
      </div>

      {step < 4 && (
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h3 className="text-xl font-semibold">Gemstone Recommendation Tool</h3>
          <div className="text-sm text-gray">Step {step} of 3</div>
        </div>
      )}

      {/* STEP 1: PERSONAL DETAILS */}
      {step === 1 && (
        <div className="space-y-6">
          <h4 className="text-lg font-serif italic text-gold">Tell us about yourself</h4>
          <div>
            <label className="block text-sm text-gray mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray/50" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-primary-dark/80 border border-white/10 rounded p-3 pl-10 text-white focus:border-gold outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-4">
              {['Male', 'Female'].map(g => (
                <button
                  key={g}
                  onClick={() => setFormData({ ...formData, gender: g })}
                  className={`p-3 rounded border font-medium ${formData.gender === g ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 bg-primary-dark/40 text-gray'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => formData.name ? setStep(2) : alert('Please enter your name')}
            className="w-full gold-btn flex justify-center items-center gap-2 mt-4"
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 2: BIRTH DETAILS */}
      {step === 2 && (
        <div className="space-y-6">
          <h4 className="text-lg font-serif italic text-gold">Enter your exact birth metrics</h4>
          <p className="text-xs text-gray/80 -mt-2">Exact time and date of birth allow our algorithm to pinpoint your planetary coordinates.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray/50" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full bg-primary-dark/80 border border-white/10 rounded p-3 pl-10 text-white focus:border-gold outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray mb-2">Time of Birth</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray/50" />
                <input
                  type="time"
                  name="tob"
                  value={formData.tob}
                  onChange={handleInputChange}
                  className="w-full bg-primary-dark/80 border border-white/10 rounded p-3 pl-10 text-white focus:border-gold outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(1)} className="flex-1 outline-btn">Back</button>
            <button
              onClick={() => formData.dob && formData.tob ? setStep(3) : alert('Please provide birth metrics')}
              className="flex-1 gold-btn flex justify-center items-center gap-2"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: FOCUS GOAL */}
      {step === 3 && (
        <div className="space-y-6">
          <h4 className="text-lg font-serif italic text-gold">What is your primary goal right now?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map(g => {
              const Icon = g.icon;
              return (
                <button
                  key={g.id}
                  onClick={() => setFormData({ ...formData, goal: g.id })}
                  className={`p-4 rounded border flex items-center gap-4 text-left transition-all ${formData.goal === g.id ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 bg-primary-dark/40 text-gray hover:border-gold/50'}`}
                >
                  <div className={`p-2 rounded bg-white/5 text-gold`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{g.label}</div>
                    <div className="text-xs text-gray/70">Boost with astral energy</div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(2)} className="flex-1 outline-btn">Back</button>
            <button
              onClick={startCalculation}
              className="flex-1 gold-btn flex justify-center items-center gap-2"
            >
              Get Report <Sparkles size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CALCULATING OVERLAY */}
      {step === 4 && (
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-xl font-serif text-gold italic">Analyzing Your Natal Horizon...</h3>
          <div className="bg-primary-dark/60 border border-white/5 rounded-lg p-6 max-w-md mx-auto text-left space-y-2 h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray animate-fadeIn">
                <CheckCircle size={12} className="text-gold shrink-0" />
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: RECOMMENDATION REPORT */}
      {step === 5 && result && (
        <div className="space-y-8">
          <div className="text-center border-b border-white/5 pb-6">
            <h3 className="text-2xl font-serif text-gold">Your Personal Vedic Gem Report</h3>
            <p className="text-sm text-gray mt-1">Prepared for {formData.name} • Sun Sign: {result.zodiac} ({result.rashiName})</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col items-center p-6 bg-primary-dark/50 border border-gold/30 rounded-lg text-center relative">
              <span className="absolute top-3 left-3 bg-gold/10 text-gold text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded">Primary Life Stone</span>
              <GemRenderer category={result.primaryGem} size="lg" className="mb-4" />
              <h4 className="text-xl font-serif font-semibold text-white">{result.primaryGem.replace(/-/g, ' ').toUpperCase()}</h4>
              <p className="text-xs text-gold font-medium mt-1">Planet: {result.primaryPlanetName}</p>
            </div>

            <div className="space-y-4 text-sm">
              <h5 className="font-semibold text-gold border-b border-white/5 pb-1">Astrological Prescriptions</h5>
              <div className="space-y-2">
                <p><span className="text-gray">Wearing Finger:</span> {result.primaryPlanetInfo.finger}</p>
                <p><span className="text-gray">Metal Combination:</span> {result.primaryPlanetInfo.metal}</p>
                <p><span className="text-gray">Primary Cosmic Benefit:</span> {result.primaryPlanetInfo.benefit}</p>
              </div>
              <div className="bg-gold/5 border border-gold/20 p-3 rounded">
                <span className="text-xs font-bold text-gold uppercase block mb-1">Planetary Beej Mantra</span>
                <p className="text-xs italic text-gray">"Chant this 108 times before wearing: {result.primaryPlanetInfo.benefit.includes('career') ? 'Om Sham Shanaishcharaye Namah' : 'Om Brim Brihaspataye Namah'}"</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row gap-4">
            <button onClick={() => window.print()} className="flex-1 outline-btn flex items-center justify-center gap-2">
              <Download size={16} /> Download Report
            </button>
            <a href={`/gemstones/${result.primaryGem}`} className="flex-1 gold-btn flex items-center justify-center gap-2">
              <ShoppingBag size={16} /> Shop Certified {result.primaryPlanetName} Gems
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
