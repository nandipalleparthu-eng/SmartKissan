import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Mic, 
  MapPin, 
  TrendingUp, 
  Droplets, 
  Sun, 
  Leaf, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Globe,
  BarChart3,
  PieChart as PieChartIcon,
  Sprout,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { translations, Language } from './constants/translations';
import { getCropRecommendation, CropRecommendation } from './services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CropRecommendation | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isListening, setIsListening] = useState(false);
  
  const t = translations[lang];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Geolocation denied", err)
      );
    }
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await getCropRecommendation(query, lang, coords || undefined);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setQuery(lang === 'hi' ? 'पंजाब में गेहूं' : lang === 'ta' ? 'கோயம்புத்தூர் பருத்தி' : 'Rice in Andhra Pradesh');
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-sans selection:bg-emerald-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e5df] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Sprout size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-emerald-900">{t.title}</h1>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-emerald-600/70">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-xs font-medium text-stone-500">
              <MapPin size={14} />
              {coords ? `${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}` : 'Detecting...'}
            </div>
            
            <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-lg border border-stone-200">
              <Globe size={14} className="ml-2 text-stone-400" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-sm font-medium focus:outline-none pr-2 cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Search */}
        <section className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-4">
              {lang === 'en' ? 'Empowering Farmers with AI' : 
               lang === 'hi' ? 'एआई के साथ किसानों को सशक्त बनाना' :
               lang === 'ta' ? 'AI மூலம் விவசாயிகளை மேம்படுத்துதல்' :
               'AIతో రైతులను శక్తివంతం చేయడం'}
            </h2>
          </motion.div>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full h-16 pl-14 pr-32 bg-white rounded-2xl border-2 border-stone-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-lg shadow-sm"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" size={24} />
              
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    isListening ? "bg-red-500 text-white animate-pulse" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  )}
                >
                  <Mic size={20} />
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-md shadow-emerald-200"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : t.searchButton}
                </button>
              </div>
            </div>
          </form>
        </section>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Column: Main Recommendation */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-stone-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-50" />
                  
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                        {t.recommendedCrop}
                      </span>
                      <h3 className="text-4xl font-serif font-bold text-stone-900">{result.cropName}</h3>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="block text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.riskLevel}</span>
                        <span className={cn(
                          "text-sm font-bold",
                          result.riskLevel === 'low' ? "text-emerald-600" : 
                          result.riskLevel === 'medium' ? "text-amber-600" : "text-red-600"
                        )}>
                          {t.riskLevels[result.riskLevel]}
                        </span>
                      </div>
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        result.riskLevel === 'low' ? "bg-emerald-100 text-emerald-600" : 
                        result.riskLevel === 'medium' ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                      )}>
                        {result.riskLevel === 'low' ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <TrendingUp className="text-emerald-600 mb-3" size={24} />
                      <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">{t.expectedYield}</span>
                      <span className="text-2xl font-bold text-stone-800">{result.expectedYield} <span className="text-sm font-medium text-stone-500">{t.unit}</span></span>
                    </div>
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <BarChart3 className="text-blue-600 mb-3" size={24} />
                      <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">{t.marketPrice}</span>
                      <span className="text-2xl font-bold text-stone-800">{t.currency}{result.marketPrice.toLocaleString()} <span className="text-sm font-medium text-stone-500">/ton</span></span>
                    </div>
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <Leaf className="text-emerald-600 mb-3" size={24} />
                      <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">{t.netProfit}</span>
                      <span className="text-2xl font-bold text-emerald-600">{t.currency}{result.netProfit.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                        <Droplets size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-800 text-sm">{t.soilHealth}</h4>
                        <p className="text-stone-600 text-sm leading-relaxed">{result.soilAnalysis}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <Sun size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-800 text-sm">{t.weatherForecast}</h4>
                        <p className="text-stone-600 text-sm leading-relaxed">{result.weatherAdvice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Better Alternative Section */}
                <div className="bg-emerald-900 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-32 -mt-32 opacity-20" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <TrendingUp size={16} className="text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{t.betterCropSuggestion}</span>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <h3 className="text-3xl font-serif font-bold mb-2">{result.betterCropName}</h3>
                        <p className="text-emerald-200/80 text-sm max-w-md">
                          {lang === 'en' ? `Switching to ${result.betterCropName} could increase your profit by 15-20% due to current market trends.` : 
                           lang === 'hi' ? `वर्तमान बाजार के रुझानों के कारण ${result.betterCropName} पर स्विच करने से आपका लाभ 15-20% बढ़ सकता है।` :
                           lang === 'ta' ? `தற்போதைய சந்தை போக்குகளால் ${result.betterCropName} க்கு மாறுவது உங்கள் லாபத்தை 15-20% அதிகரிக்கலாம்.` :
                           `${result.betterCropName}కి మారడం వల్ల ప్రస్తుత మార్కెట్ ట్రెండ్‌ల కారణంగా మీ లాభం 15-20% పెరుగుతుంది.`}
                        </p>
                      </div>
                      <button className="bg-white text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2">
                        {lang === 'en' ? 'View Details' : lang === 'hi' ? 'विवरण देखें' : lang === 'ta' ? 'விவரங்களைக் காண்க' : 'వివరాలను చూడండి'}
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-stone-100">
                    <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">{t.profitAnalysis}</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={result.profitData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number) => [`${t.currency}${value.toLocaleString()}`, t.netProfit]}
                          />
                          <Line type="monotone" dataKey="profit" stroke="#059669" strokeWidth={4} dot={{ r: 6, fill: '#059669', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-stone-100">
                    <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">{t.yieldComparison}</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.yieldComparison}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                          <Tooltip 
                            cursor={{fill: '#f8f8f8'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="yield" radius={[8, 8, 0, 0]}>
                            {result.yieldComparison.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? '#059669' : '#94a3b8'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Map & Tips */}
              <div className="space-y-8">
                {/* Simulated Google Maps View */}
                <div className="bg-white rounded-[32px] p-4 shadow-sm border border-stone-100 overflow-hidden">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h4 className="text-sm font-bold text-stone-800">{lang === 'en' ? 'Regional Map' : 'क्षेत्रीय मानचित्र'}</h4>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">Live View</span>
                  </div>
                  <div className="aspect-square bg-stone-100 rounded-2xl relative overflow-hidden border border-stone-200">
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 opacity-40">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 20 Q 25 15, 50 20 T 100 20" fill="none" stroke="#ccc" strokeWidth="0.5" />
                        <path d="M0 40 Q 25 35, 50 40 T 100 40" fill="none" stroke="#ccc" strokeWidth="0.5" />
                        <path d="M0 60 Q 25 55, 50 60 T 100 60" fill="none" stroke="#ccc" strokeWidth="0.5" />
                        <path d="M20 0 Q 15 25, 20 50 T 20 100" fill="none" stroke="#ccc" strokeWidth="0.5" />
                        <path d="M40 0 Q 35 25, 40 50 T 40 100" fill="none" stroke="#ccc" strokeWidth="0.5" />
                        <path d="M60 0 Q 55 25, 60 50 T 60 100" fill="none" stroke="#ccc" strokeWidth="0.5" />
                      </svg>
                    </div>
                    {/* Map Marker */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full animate-ping absolute -inset-0" />
                        <div className="w-8 h-8 bg-emerald-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white relative z-10">
                          <MapPin size={16} />
                        </div>
                      </div>
                    </motion.div>
                    {/* Map Overlay Info */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-white shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-stone-800 uppercase tracking-widest">Optimal Zone</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">High soil nitrogen detected in this quadrant.</p>
                    </div>
                  </div>
                </div>

                {/* Expert Tips */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-stone-100">
                  <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">{t.tips}</h4>
                  <ul className="space-y-6">
                    {result.expertTips.map((tip, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-1">
                          <CheckCircle2 size={14} />
                        </div>
                        <p className="text-sm text-stone-600 leading-relaxed">{tip}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Risk Meter Visual */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-stone-100">
                  <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">{lang === 'en' ? 'Risk Meter' : 'जोखिम मीटर'}</h4>
                  <div className="relative h-4 bg-stone-100 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: result.riskLevel === 'low' ? '30%' : result.riskLevel === 'medium' ? '60%' : '90%' }}
                      className={cn(
                        "h-full transition-all duration-1000",
                        result.riskLevel === 'low' ? "bg-emerald-500" : 
                        result.riskLevel === 'medium' ? "bg-amber-500" : "bg-red-500"
                      )}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    <span>{t.riskLevels.low}</span>
                    <span>{t.riskLevels.medium}</span>
                    <span>{t.riskLevels.high}</span>
                  </div>
                  <p className="mt-4 text-xs text-stone-500 leading-relaxed italic">
                    "{result.riskReason}"
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                <Leaf size={48} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-serif text-stone-800 mb-2">
                {lang === 'en' ? 'Ready to grow?' : lang === 'hi' ? 'क्या आप तैयार हैं?' : lang === 'ta' ? 'வளர தயாரா?' : 'పెరగడానికి సిద్ధంగా ఉన్నారా?'}
              </h3>
              <p className="text-stone-500 max-w-sm">
                {lang === 'en' ? 'Enter your location or a crop name to get AI-powered insights and recommendations.' : 
                 lang === 'hi' ? 'एआई-संचालित अंतर्दृष्टि और सिफारिशें प्राप्त करने के लिए अपना स्थान या फसल का नाम दर्ज करें।' :
                 lang === 'ta' ? 'AI-இயங்கும் நுண்ணறிவு மற்றும் பரிந்துரைகளைப் பெற உங்கள் இருப்பிடம் அல்லது பயிர் பெயரை உள்ளிடவும்.' :
                 'AI-ఆధారిత అంతర్దృష్టులు మరియు సిఫార్సులను పొందడానికి మీ స్థానం లేదా పంట పేరును నమోదు చేయండి.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-stone-500">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center text-white">
                <Sprout size={14} />
              </div>
              <span className="font-bold text-stone-800 tracking-tight">{t.title}</span>
            </div>
            <p className="text-sm leading-relaxed">
              {lang === 'en' ? 'SmartKisan uses advanced AI to help farmers make data-driven decisions for a sustainable and profitable future.' : 
               'स्मार्टकिसान किसानों को टिकाऊ और लाभदायक भविष्य के लिए डेटा-संचालित निर्णय लेने में मदद करने के लिए उन्नत एआई का उपयोग करता है।'}
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">{lang === 'en' ? 'Resources' : 'संसाधन'}</h5>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Market Prices</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Soil Testing Labs</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Government Schemes</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">{lang === 'en' ? 'Contact' : 'संपर्क'}</h5>
            <p className="text-sm">support@smartkisan.ai</p>
            <p className="text-sm mt-1">Toll Free: 1800-123-4567</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-100 flex flex-wrap justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          <span>© 2026 SmartKisan AI Agriculture</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-600">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
