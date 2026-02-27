export type Language = 'en' | 'hi' | 'ta' | 'te';

export interface Translation {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  voiceButton: string;
  languageLabel: string;
  recommendedCrop: string;
  expectedYield: string;
  marketPrice: string;
  netProfit: string;
  riskLevel: string;
  riskLevels: {
    low: string;
    medium: string;
    high: string;
  };
  currency: string;
  unit: string;
  betterCropSuggestion: string;
  soilHealth: string;
  weatherForecast: string;
  tips: string;
  profitAnalysis: string;
  yieldComparison: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    title: "SmartKisan",
    subtitle: "Right Crop, Right Time",
    searchPlaceholder: "Enter location or crop name...",
    searchButton: "Analyze",
    voiceButton: "Voice Input",
    languageLabel: "Language",
    recommendedCrop: "Recommended Crop",
    expectedYield: "Expected Yield",
    marketPrice: "Market Price",
    netProfit: "Net Profit",
    riskLevel: "Risk Level",
    riskLevels: {
      low: "Low Risk",
      medium: "Medium Risk",
      high: "High Risk"
    },
    currency: "₹",
    unit: "tons/acre",
    betterCropSuggestion: "Better Alternative",
    soilHealth: "Soil Health",
    weatherForecast: "Weather Forecast",
    tips: "Expert Tips",
    profitAnalysis: "Profit Analysis",
    yieldComparison: "Yield Comparison"
  },
  hi: {
    title: "स्मार्टकिसान",
    subtitle: "सही फसल, सही समय",
    searchPlaceholder: "स्थान या फसल का नाम दर्ज करें...",
    searchButton: "विश्लेषण करें",
    voiceButton: "आवाज इनपुट",
    languageLabel: "भाषा",
    recommendedCrop: "अनुशंसित फसल",
    expectedYield: "अपेक्षित उपज",
    marketPrice: "बाजार मूल्य",
    netProfit: "शुद्ध लाभ",
    riskLevel: "जोखिम स्तर",
    riskLevels: {
      low: "कम जोखिम",
      medium: "मध्यम जोखिम",
      high: "उच्च जोखिम"
    },
    currency: "₹",
    unit: "टन/एकड़",
    betterCropSuggestion: "बेहतर विकल्प",
    soilHealth: "मिट्टी का स्वास्थ्य",
    weatherForecast: "मौसम का पूर्वानुमान",
    tips: "विशेषज्ञ सुझाव",
    profitAnalysis: "लाभ विश्लेषण",
    yieldComparison: "उपज तुलना"
  },
  ta: {
    title: "ஸ்மார்ட்கிசான்",
    subtitle: "சரியான பயிர், சரியான நேரம்",
    searchPlaceholder: "இடம் அல்லது பயிர் பெயரை உள்ளிடவும்...",
    searchButton: "பகுப்பாய்வு செய்",
    voiceButton: "குரல் உள்ளீடு",
    languageLabel: "மொழி",
    recommendedCrop: "பரிந்துரைக்கப்பட்ட பயிர்",
    expectedYield: "எதிர்பார்க்கப்படும் மகசூல்",
    marketPrice: "சந்தை விலை",
    netProfit: "நிகர லாபம்",
    riskLevel: "ஆபத்து நிலை",
    riskLevels: {
      low: "குறைந்த ஆபத்து",
      medium: "நடுத்தர ஆபத்து",
      high: "அதிக ஆபத்து"
    },
    currency: "₹",
    unit: "டன்/ஏக்கர்",
    betterCropSuggestion: "சிறந்த மாற்று",
    soilHealth: "மண் வளம்",
    weatherForecast: "வானிலை முன்னறிவிப்பு",
    tips: "நிபுணர் குறிப்புகள்",
    profitAnalysis: "லாப பகுப்பாய்வு",
    yieldComparison: "மகசூல் ஒப்பீடு"
  },
  te: {
    title: "స్మార్ట్ కిసాన్",
    subtitle: "సరైన పంట, సరైన సమయం",
    searchPlaceholder: "ప్రాంతం లేదా పంట పేరును నమోదు చేయండి...",
    searchButton: "విశ్లేషించు",
    voiceButton: "వాయిస్ ఇన్‌పుట్",
    languageLabel: "భాష",
    recommendedCrop: "సిఫార్సు చేయబడిన పంట",
    expectedYield: "ఆశించిన దిగుబడి",
    marketPrice: "మార్కెట్ ధర",
    netProfit: "నికర లాభం",
    riskLevel: "ప్రమాద స్థాయి",
    riskLevels: {
      low: "తక్కువ ప్రమాదం",
      medium: "మధ్యస్థ ప్రమాదం",
      high: "ఎక్కువ ప్రమాదం"
    },
    currency: "₹",
    unit: "టన్నులు/ఎకరా",
    betterCropSuggestion: "మెరుగైన ప్రత్యామ్నాయం",
    soilHealth: "నేల ఆరోగ్యం",
    weatherForecast: "వాతావరణ సూచన",
    tips: "నిపుణుల చిట్కాలు",
    profitAnalysis: "లాభ విశ్లేషణ",
    yieldComparison: "దిగుబడి పోలిక"
  }
};
