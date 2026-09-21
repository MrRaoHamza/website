import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  Users,
  BarChart3,
  RefreshCw,
  Activity,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Sliders,
  Database,
  ExternalLink,
  Share2,
  FileSpreadsheet
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import {
  PERSONAS,
  UCI_DATASET_STATS,
  runMlPrediction
} from '../../utils/studentMlModel';

const StudentPerformanceLive = () => {
  const [activePersonaId, setActivePersonaId] = useState('high-achiever');
  const [activeTab, setActiveTab] = useState('predict'); // 'predict' | 'dataset' | 'batch'
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState(PERSONAS[0].data);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePersonaSelect = (persona) => {
    setActivePersonaId(persona.id);
    setFormData(persona.data);
    showToast(`Loaded profile for ${persona.name}`);
  };

  const handleInputChange = (field, value) => {
    setActivePersonaId(null);
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    const defaultP = PERSONAS[0];
    setActivePersonaId(defaultP.id);
    setFormData(defaultP.data);
    showToast('Reset to default profile');
  };

  // Run real-time ML prediction
  const prediction = useMemo(() => {
    return runMlPrediction(formData);
  }, [formData]);

  const breadcrumbItems = [
    { label: 'Projects', path: '/#projects' },
    { label: 'Student Performance Prediction', path: '/projects/student-performance-prediction' },
    { label: 'Live System' }
  ];

  return (
    <div className="pt-20 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-dark-border/60 pb-6">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex items-center space-x-3">
            <Link
              to="/projects/student-performance-prediction"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-dark-border hover:bg-slate-100 dark:hover:bg-dark-surface text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Case Study</span>
            </Link>
            <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Inference Engine Active</span>
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="mt-8 bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-purple-600/10 border border-blue-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                <Brain size={12} />
                <span>Supervised Learning Simulation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 font-display">
                Student Performance & At-Risk Predictor
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-text-secondary-dark leading-relaxed">
                Trained on the <strong className="text-slate-900 dark:text-white">UCI Student Performance Dataset (1,044 students)</strong>. Adjust academic metrics, attendance, and lifestyle indicators to predict final grades ($G3$), passing probability, and prescriptive interventions.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('predict')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
                  activeTab === 'predict'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-surface'
                }`}
              >
                <Sliders size={14} />
                <span>Interactive Predictor</span>
              </button>
              <button
                onClick={() => setActiveTab('dataset')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
                  activeTab === 'dataset'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-surface'
                }`}
              >
                <Database size={14} />
                <span>Dataset Explorer</span>
              </button>
              <button
                onClick={() => setActiveTab('batch')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
                  activeTab === 'batch'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-surface'
                }`}
              >
                <FileSpreadsheet size={14} />
                <span>Cohort Benchmark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Persona Selector Bar */}
        {activeTab === 'predict' && (
          <div className="mt-8 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-slate-500 dark:text-text-muted-dark uppercase tracking-wider flex items-center gap-1.5">
                <Users size={13} />
                <span>Quick-Load Calibrated Student Personas:</span>
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <RefreshCw size={11} />
                <span>Reset to Baseline</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PERSONAS.map((p) => {
                const isSelected = activePersonaId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePersonaSelect(p)}
                    className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm'
                        : 'border-slate-200/80 dark:border-dark-border/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-dark-surface/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {p.name}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${p.badgeClass}`}>
                        {p.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-500 dark:text-text-secondary-dark line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 1: Interactive Predictor */}
        {activeTab === 'predict' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Input Form (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Core Academic Performance */}
              <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-dark-border/60">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="text-blue-500" size={18} />
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Academic Baseline
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Scale: 0 - 20 pts</span>
                </div>

                <div className="mt-5 space-y-5">
                  {/* G1 First Period Score */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-700 dark:text-slate-300">Period 1 Grade (G1)</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                        {formData.G1} / 20
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={formData.G1}
                      onChange={(e) => handleInputChange('G1', Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-dark-surface rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>0 (Fail)</span>
                      <span>10 (Passing mark)</span>
                      <span>20 (Distinction)</span>
                    </div>
                  </div>

                  {/* G2 Second Period Score */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-700 dark:text-slate-300">Period 2 Grade (G2)</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
                        {formData.G2} / 20
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={formData.G2}
                      onChange={(e) => handleInputChange('G2', Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-dark-surface rounded-lg"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      *Strongest single predictor (feature correlation $r = 0.90$)
                    </span>
                  </div>

                  {/* Weekly Study Time */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Weekly Study Hours
                    </label>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {[
                        { level: 1, label: '< 2 hrs' },
                        { level: 2, label: '2 - 5 hrs' },
                        { level: 3, label: '5 - 10 hrs' },
                        { level: 4, label: '> 10 hrs' }
                      ].map((s) => (
                        <button
                          key={s.level}
                          type="button"
                          onClick={() => handleInputChange('studytime', s.level)}
                          className={`py-2 px-1 rounded-xl border font-semibold transition-all ${
                            formData.studytime === s.level
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-dark-surface border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Absences */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-700 dark:text-slate-300">Semester Absences</span>
                      <span className={`font-mono px-2 py-0.5 rounded font-bold ${
                        formData.absences > 15
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : formData.absences > 8
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {formData.absences} Days Missed
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="1"
                      value={formData.absences}
                      onChange={(e) => handleInputChange('absences', Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-200 dark:bg-dark-surface rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>0 (Perfect Attendance)</span>
                      <span>20 (Chronic Absenteeism)</span>
                      <span>40+</span>
                    </div>
                  </div>

                  {/* Past Course Failures */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Prior Course Failures
                    </label>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {[0, 1, 2, 3].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => handleInputChange('failures', f)}
                          className={`py-2 px-1 rounded-xl border font-semibold transition-all ${
                            formData.failures === f
                              ? f === 0
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-rose-600 text-white border-rose-600'
                              : 'bg-slate-50 dark:bg-dark-surface border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {f === 3 ? '3+ Failures' : `${f} Failure${f === 1 ? '' : 's'}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Support & Environmental Drivers */}
              <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Sliders className="text-indigo-500" size={18} />
                    <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Support & Socio-Economic Indicators
                    </span>
                  </div>
                  {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showAdvanced && (
                  <div className="mt-5 space-y-4 pt-4 border-t border-slate-100 dark:border-dark-border/60">
                    
                    {/* Toggles */}
                    <div className="space-y-3">
                      <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Aims for Higher Education</span>
                        <input
                          type="checkbox"
                          checked={formData.higher}
                          onChange={(e) => handleInputChange('higher', e.target.checked)}
                          className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Internet Access at Home</span>
                        <input
                          type="checkbox"
                          checked={formData.internet}
                          onChange={(e) => handleInputChange('internet', e.target.checked)}
                          className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Extra Paid Tutoring</span>
                        <input
                          type="checkbox"
                          checked={formData.paid}
                          onChange={(e) => handleInputChange('paid', e.target.checked)}
                          className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                        />
                      </label>
                      <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Family Educational Support</span>
                        <input
                          type="checkbox"
                          checked={formData.famsup}
                          onChange={(e) => handleInputChange('famsup', e.target.checked)}
                          className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                        />
                      </label>
                    </div>

                    {/* Parents Education */}
                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                        <span>Parental Education Level</span>
                        <span className="font-mono text-slate-500">
                          {formData.Medu === 4 ? 'Higher Ed' : formData.Medu === 0 ? 'None' : `Tier ${formData.Medu}/4`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        step="1"
                        value={formData.Medu}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          handleInputChange('Medu', val);
                          handleInputChange('Fedu', val);
                        }}
                        className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-dark-surface rounded-lg"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>0: None</span>
                        <span>2: 9th Grade</span>
                        <span>4: Higher Education</span>
                      </div>
                    </div>

                    {/* Weekend Alcohol */}
                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                        <span>Weekend Social / Alcohol (Walc)</span>
                        <span className="font-mono text-slate-500">{formData.Walc} / 5</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={formData.Walc}
                        onChange={(e) => handleInputChange('Walc', Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-dark-surface rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Prediction Dashboard & Insights (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Primary Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Card A: Predicted Final Score */}
                <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Predicted Score (G3)
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      Scale / 20
                    </span>
                  </div>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                      {prediction.predictedG3}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">/ 20</span>
                    <span className="ml-auto text-base font-extrabold text-blue-600 dark:text-blue-400 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      {prediction.letterGrade}
                    </span>
                  </div>
                  {/* Mini Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-dark-surface h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        prediction.predictedG3 >= 14
                          ? 'bg-emerald-500'
                          : prediction.predictedG3 >= 10
                          ? 'bg-blue-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${(prediction.predictedG3 / 20) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Card B: Passing Likelihood */}
                <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Pass Probability
                    </span>
                    {prediction.passProbability >= 65 ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <XCircle size={16} className="text-rose-500" />
                    )}
                  </div>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className={`text-4xl font-extrabold font-display ${
                      prediction.passProbability >= 80
                        ? 'text-emerald-500'
                        : prediction.passProbability >= 55
                        ? 'text-amber-500'
                        : 'text-rose-500'
                    }`}>
                      {prediction.passProbability}%
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {prediction.passProbability >= 65 ? 'High Confidence' : 'At-Risk Boundary'}
                    </span>
                  </div>
                  {/* Probability Bar */}
                  <div className="w-full bg-slate-100 dark:bg-dark-surface h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        prediction.passProbability >= 75
                          ? 'bg-emerald-500'
                          : prediction.passProbability >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${prediction.passProbability}%` }}
                    />
                  </div>
                </div>

                {/* Card C: GPA Equivalent */}
                <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Converted GPA
                    </span>
                    <Award size={16} className="text-purple-500" />
                  </div>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                      {prediction.predictedGpa.toFixed(1)}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">/ 4.0</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-text-muted-dark">
                    US Standard 4.0 Conversion
                  </span>
                </div>
              </div>

              {/* Risk Stratification Banner */}
              <div className={`rounded-2xl p-5 border flex items-start gap-4 transition-all ${
                prediction.riskLevel.color === 'emerald'
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-950 dark:text-emerald-100'
                  : prediction.riskLevel.color === 'amber'
                  ? 'bg-amber-500/5 border-amber-500/20 text-amber-950 dark:text-amber-100'
                  : 'bg-rose-500/5 border-rose-500/20 text-rose-950 dark:text-rose-100'
              }`}>
                {prediction.riskLevel.color === 'emerald' ? (
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={22} />
                ) : (
                  <ShieldAlert className="text-rose-500 shrink-0 mt-0.5" size={22} />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${prediction.riskLevel.badgeClass}`}>
                      {prediction.riskLevel.tier}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Decision Boundary: G3 ≥ 10.0
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {prediction.riskLevel.description}
                  </p>
                </div>
              </div>

              {/* Explainable AI (SHAP Waterfall Attribution) */}
              <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-dark-border/60">
                  <div className="flex items-center space-x-2">
                    <Activity className="text-blue-500" size={18} />
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Feature Attribution (SHAP Factor Impact)
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-400">Baseline G3: 10.5</span>
                </div>

                <div className="mt-5 space-y-4">
                  {prediction.factors.map((factor, idx) => {
                    const isPositive = factor.impact >= 0;
                    const barWidth = Math.min(100, Math.abs(factor.impact) * 22);
                    return (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {factor.name}
                          </span>
                          <span className={`font-mono font-bold ${
                            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            {isPositive ? `+${factor.impact}` : factor.impact} pts
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-dark-surface h-2 rounded-full overflow-hidden flex">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isPositive ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.max(4, barWidth)}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 dark:text-text-muted-dark block mt-1">
                          {factor.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prescriptive Remedial Roadmap */}
              <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 dark:border-dark-border/60">
                  <Sparkles className="text-amber-500" size={18} />
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Prescriptive Action Roadmap & Interventions
                  </h2>
                </div>

                <div className="mt-5 space-y-3">
                  {prediction.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200/60 dark:border-dark-border/60 bg-slate-50/50 dark:bg-dark-surface/40 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            {rec.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-white">
                            {rec.action}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-text-secondary-dark leading-relaxed">
                          {rec.rationale}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">
                          {rec.estimatedGain}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Dataset Explorer */}
        {activeTab === 'dataset' && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 shadow-sm">
                <span className="text-xs text-slate-400 block font-semibold uppercase">Dataset Records</span>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-2 block">
                  {UCI_DATASET_STATS.totalStudents}
                </span>
                <span className="text-xs text-slate-500 mt-1 block">Portuguese & Math cohorts</span>
              </div>
              <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 shadow-sm">
                <span className="text-xs text-slate-400 block font-semibold uppercase">Overall Pass Rate</span>
                <span className="text-3xl font-extrabold text-emerald-500 font-display mt-2 block">
                  {UCI_DATASET_STATS.overallPassRate}%
                </span>
                <span className="text-xs text-slate-500 mt-1 block">Threshold: Grade ≥ 10.0</span>
              </div>
              <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 shadow-sm">
                <span className="text-xs text-slate-400 block font-semibold uppercase">Average Final Grade</span>
                <span className="text-3xl font-extrabold text-blue-500 font-display mt-2 block">
                  {UCI_DATASET_STATS.averageG3} / 20
                </span>
                <span className="text-xs text-slate-500 mt-1 block">Mean cohort achievement</span>
              </div>
              <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 shadow-sm">
                <span className="text-xs text-slate-400 block font-semibold uppercase">Feature Dimensions</span>
                <span className="text-3xl font-extrabold text-purple-500 font-display mt-2 block">
                  {UCI_DATASET_STATS.attributesCount}
                </span>
                <span className="text-xs text-slate-500 mt-1 block">Demographic, school, social</span>
              </div>
            </div>

            {/* Visual Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Chart 1: Study Time vs Average Grade */}
              <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <BookOpen size={16} className="text-blue-500" />
                  <span>Study Hours vs Final Score</span>
                </h3>
                <div className="space-y-4">
                  {UCI_DATASET_STATS.studyTimeBreakdown.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{item.avgGrade} / 20 ({item.passRate}% pass)</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-dark-surface h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${(item.avgGrade / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Absences vs Average Grade */}
              <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <Clock size={16} className="text-rose-500" />
                  <span>Absence Impact on Risk</span>
                </h3>
                <div className="space-y-4">
                  {UCI_DATASET_STATS.absenceImpact.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 dark:text-slate-300">{item.range}</span>
                        <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{item.riskPct}% At-Risk</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-dark-surface h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full transition-all"
                          style={{ width: `${item.riskPct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 3: Past Failures Impact */}
              <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <span>Prior Failures vs Pass Rate</span>
                </h3>
                <div className="space-y-4">
                  {UCI_DATASET_STATS.failuresImpact.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 dark:text-slate-300">{item.failures}</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{item.passPct}% Pass</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-dark-surface h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all"
                          style={{ width: `${item.passPct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Cohort Benchmark Table */}
        {activeTab === 'batch' && (
          <div className="mt-8 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-dark-border/60">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Cohort Evaluation Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Side-by-side inference benchmark across calibrated student archetype profiles.
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-dark-border text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3 px-3">Student Archetype</th>
                    <th className="pb-3 px-3">G1 / G2</th>
                    <th className="pb-3 px-3">Study Time</th>
                    <th className="pb-3 px-3">Absences</th>
                    <th className="pb-3 px-3">Pred. Score</th>
                    <th className="pb-3 px-3">Pass Likelihood</th>
                    <th className="pb-3 px-3">Risk Tier</th>
                    <th className="pb-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-dark-border/60">
                  {PERSONAS.map((p) => {
                    const res = runMlPrediction(p.data);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-dark-surface/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                          <div>{p.name}</div>
                          <span className="text-[10px] text-slate-400 font-normal">{p.tag}</span>
                        </td>
                        <td className="py-3 px-3 font-mono">{p.data.G1} / {p.data.G2}</td>
                        <td className="py-3 px-3">{p.data.studytime === 4 ? '>10h/wk' : p.data.studytime === 1 ? '<2h/wk' : `${p.data.studytime * 2.5}h/wk`}</td>
                        <td className="py-3 px-3 font-mono">{p.data.absences} days</td>
                        <td className="py-3 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">{res.predictedG3}/20 ({res.letterGrade})</td>
                        <td className="py-3 px-3">
                          <span className={`font-mono font-bold ${res.passProbability >= 70 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {res.passProbability}%
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${res.riskLevel.badgeClass}`}>
                            {res.riskLevel.tier}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              handlePersonaSelect(p);
                              setActiveTab('predict');
                            }}
                            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] transition-colors"
                          >
                            Load in Simulator
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 animate-fade-in">
          <Sparkles size={14} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default StudentPerformanceLive;
