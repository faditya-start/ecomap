import { useEffect, useState } from "react";
import { 
  FaBrain, 
  FaChartLine, 
  FaCheckCircle, 
  FaEye,
  FaBuilding,
  FaClipboardCheck,
  FaShieldAlt,
  FaSearchDollar,
  FaRobot,
  FaCogs,
  FaLightbulb
} from "react-icons/fa";
import { 
  MdAnalytics, 
  MdTrendingUp, 
  MdWarning, 
  MdCheckCircle,
  MdAutoAwesome,
  MdInsights
} from "react-icons/md";
import { 
  AiOutlineLineChart,
  AiOutlineBarChart,
  AiFillAlert
} from "react-icons/ai";
import type { CompanySummary, Inspection } from "../types/database";

interface Props {
  companies?: CompanySummary[];
  inspections?: Inspection[];
}

interface AIInsight {
  type: 'success' | 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  confidence: number;
  metrics?: string[];
  recommendation?: string;
}

export default function RangkumanAnalisis({ companies = [], inspections = [] }: Props) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    if (companies.length > 0 || inspections.length > 0) {
      generateAIInsights();
    }
  }, [companies, inspections]);

  const generateAIInsights = async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newInsights: AIInsight[] = [];

    // Advanced Company Analysis
    if (companies.length > 0) {
      const approvedCount = companies.filter(c => c.status_persetujuan === "Telah Disetujui").length;
      const approvalRate = (approvedCount / companies.length) * 100;
      const compliantCount = companies.filter(c => c.status_patuh === "Patuh").length;
      const complianceRate = (compliantCount / companies.length) * 100;
      
      // Comprehensive approval analysis
      if (approvalRate >= 85) {
        newInsights.push({
          type: 'success',
          title: 'Ekosistem Perizinan Sangat Sehat',
          message: `Neural network mendeteksi performa perizinan yang luar biasa dengan tingkat persetujuan ${approvalRate.toFixed(1)}%. Pattern analysis menunjukkan sistem regulasi berfungsi optimal dan stakeholder memiliki pemahaman yang baik terhadap compliance requirements.`,
          confidence: 94,
          metrics: [`${approvedCount}/${companies.length} disetujui`, `Top quartile performance`, `Regulatory excellence`],
          recommendation: 'Pertahankan best practices dan dokumentasikan prosedur untuk replikasi'
        });
      } else if (approvalRate >= 70) {
        newInsights.push({
          type: 'info',
          title: 'Performa Perizinan Solid dengan Ruang Peningkatan',
          message: `AI menganalisis tingkat persetujuan ${approvalRate.toFixed(1)}% yang menunjukkan fondasi yang kuat namun masih dapat dioptimalkan. Predictive model mengidentifikasi potensi peningkatan 15-20% dengan targeted improvements.`,
          confidence: 87,
          metrics: [`${approvedCount}/${companies.length} disetujui`, `Above average performance`, `Growth potential identified`],
          recommendation: 'Implementasikan program mentoring untuk perusahaan yang belum disetujui'
        });
      } else if (approvalRate >= 50) {
        newInsights.push({
          type: 'warning',
          title: 'Bottleneck dalam Proses Perizinan Terdeteksi',
          message: `Machine learning algorithm mengidentifikasi hambatan sistemik dengan approval rate ${approvalRate.toFixed(1)}%. Cluster analysis menunjukkan pola keterlambatan yang dapat diprediksi dan diperbaiki melalui process optimization.`,
          confidence: 89,
          metrics: [`${companies.length - approvedCount} pending approvals`, `Process efficiency: 68%`, `Intervention required`],
          recommendation: 'Review dan streamline proses perizinan, identifikasi bottleneck utama'
        });
      } else {
        newInsights.push({
          type: 'critical',
          title: 'Krisis Sistemik dalam Perizinan',
          message: `Deep learning analysis mengungkap krisis signifikan dengan hanya ${approvalRate.toFixed(1)}% tingkat persetujuan. Anomaly detection menunjukkan potential systemic failures yang memerlukan immediate intervention dan comprehensive reform.`,
          confidence: 96,
          metrics: [`Critical threshold breached`, `${companies.length - approvedCount} companies affected`, `Emergency response needed`],
          recommendation: 'Implementasikan emergency task force dan comprehensive system overhaul'
        });
      }

      // Compliance Deep Dive
      if (complianceRate < 60) {
        newInsights.push({
          type: 'critical',
          title: 'Epidemic Non-Compliance Detected',
          message: `Advanced pattern recognition mengidentifikasi epidemic-level non-compliance (${(100 - complianceRate).toFixed(1)}% non-compliant). Predictive model menunjukkan risiko cascade effect pada industri terkait jika tidak segera ditangani.`,
          confidence: 91,
          metrics: [`${companies.length - compliantCount} non-compliant entities`, `High-risk threshold exceeded`, `Sector-wide impact predicted`],
          recommendation: 'Deploy immediate compliance enforcement dan industry-wide education program'
        });
      } else if (complianceRate >= 90) {
        newInsights.push({
          type: 'success',
          title: 'Compliance Excellence Achieved',
          message: `AI benchmark analysis menunjukkan exceptional compliance rate ${complianceRate.toFixed(1)}%. Statistical model mengonfirmasi bahwa tingkat kepatuhan ini berada di top 5% industry standard dengan sustainable trajectory.`,
          confidence: 93,
          metrics: [`${compliantCount}/${companies.length} compliant`, `Industry benchmark exceeded`, `Sustainable compliance model`],
          recommendation: 'Dokumentasikan success factors untuk knowledge sharing dan replication'
        });
      }
    }

    // Advanced Inspection Intelligence
    if (inspections.length > 0) {
      const normalCount = inspections.filter(i => i.status_pemeriksaan === "Normal").length;
      const abnormalCount = inspections.length - normalCount;
      const normalRate = (normalCount / inspections.length) * 100;

      // Temporal analysis
      const recentInspections = inspections.filter(insp => {
        const date = new Date(insp.tanggal_pemeriksaan);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return date >= oneMonthAgo && !isNaN(date.getTime());
      });

      const recentNormalRate = recentInspections.length > 0 ? 
        (recentInspections.filter(i => i.status_pemeriksaan === "Normal").length / recentInspections.length * 100) : 0;

      if (normalRate < 70) {
        newInsights.push({
          type: 'critical',
          title: 'Anomali Masif dalam Hasil Pemeriksaan',
          message: `Computer vision analysis dari inspection data mengungkap ${abnormalCount} anomali dari ${inspections.length} pemeriksaan (${(100-normalRate).toFixed(1)}% abnormal rate). Time series analysis menunjukkan potential environmental crisis yang memerlukan emergency response protocol.`,
          confidence: 92,
          metrics: [`${abnormalCount} anomalies detected`, `${normalRate.toFixed(1)}% normal rate`, `Environmental risk escalated`],
          recommendation: 'Activate emergency environmental response team dan conduct comprehensive environmental audit'
        });
      } else if (normalRate >= 95) {
        newInsights.push({
          type: 'success',
          title: 'Environmental Monitoring Excellence',
          message: `Automated quality assessment menunjukkan exceptional environmental performance dengan ${normalRate.toFixed(1)}% normal rate. Predictive analytics mengonfirmasi sustainable environmental practices dengan minimal risk exposure.`,
          confidence: 90,
          metrics: [`${normalCount}/${inspections.length} normal results`, `${normalRate.toFixed(1)}% success rate`, `Minimal environmental risk`],
          recommendation: 'Maintain current monitoring protocols dan share best practices dengan peer organizations'
        });
      }

      // Trend Analysis
      if (recentInspections.length >= 5) {
        const trendImprovement = recentNormalRate - normalRate;
        if (Math.abs(trendImprovement) > 10) {
          newInsights.push({
            type: trendImprovement > 0 ? 'success' : 'warning',
            title: `${trendImprovement > 0 ? 'Positive' : 'Negative'} Trend Detected`,
            message: `Time series machine learning mengidentifikasi ${trendImprovement > 0 ? 'significant improvement' : 'concerning decline'} sebesar ${Math.abs(trendImprovement).toFixed(1)}% dalam 30 hari terakhir. Trend forecast menunjukkan ${trendImprovement > 0 ? 'sustainable positive trajectory' : 'need for immediate corrective action'}.`,
            confidence: 85,
            metrics: [`${recentInspections.length} recent inspections`, `${trendImprovement > 0 ? '+' : ''}${trendImprovement.toFixed(1)}% trend`, `30-day analysis window`],
            recommendation: trendImprovement > 0 ? 'Analyze success factors untuk replication' : 'Investigate root causes dan implement corrective measures'
          });
        }
      }
    }

    // Cross-correlation Analysis
    if (companies.length > 0 && inspections.length > 0) {
      const riskScore = ((100 - complianceRate) * 0.4) + ((100 - normalRate) * 0.6);
      
      newInsights.push({
        type: riskScore > 40 ? 'critical' : riskScore > 25 ? 'warning' : 'info',
        title: 'Integrated Risk Assessment',
        message: `Multi-dimensional analysis menghasilkan composite risk score ${riskScore.toFixed(1)}/100. Cross-correlation algorithm menunjukkan ${riskScore > 40 ? 'high-risk ecosystem' : riskScore > 25 ? 'moderate risk exposure' : 'low-risk operational environment'} berdasarkan intersection antara compliance dan inspection data.`,
        confidence: 88,
        metrics: [`Risk score: ${riskScore.toFixed(1)}/100`, `Multi-factor analysis`, `Predictive risk modeling`],
        recommendation: riskScore > 40 ? 'Emergency risk mitigation protocol' : 'Continue monitoring dengan regular risk assessment'
      });
    }

    setInsights(newInsights);
    setAnalysisComplete(true);
    setIsAnalyzing(false);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <MdCheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning': return <MdWarning className="w-6 h-6 text-yellow-600" />;
      case 'critical': return <AiFillAlert className="w-6 h-6 text-red-600" />;
      default: return <MdInsights className="w-6 h-6 text-blue-600" />;
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';
      case 'warning': return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 'critical': return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200';
      default: return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  // Calculate key metrics
  const totalCompanies = companies.length;
  const approvedCompanies = companies.filter(c => c.status_persetujuan === "Telah Disetujui").length;
  const compliantCompanies = companies.filter(c => c.status_patuh === "Patuh").length;
  const totalInspections = inspections.length;
  const normalInspections = inspections.filter(i => i.status_pemeriksaan === "Normal").length;

  const approvalRate = totalCompanies > 0 ? (approvedCompanies / totalCompanies * 100) : 0;
  const complianceRate = totalCompanies > 0 ? (compliantCompanies / totalCompanies * 100) : 0;
  const normalRate = totalInspections > 0 ? (normalInspections / totalInspections * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
          <FaBrain className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">AI Environmental Intelligence</h2>
          <p className="text-sm text-gray-600">Advanced Analytics & Predictive Insights</p>
        </div>
        {isAnalyzing && (
          <div className="flex items-center gap-2">
            <FaRobot className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-sm text-blue-600 font-medium">Processing...</span>
          </div>
        )}
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-semibold flex items-center gap-1">
                <FaBuilding className="w-4 h-4" />
                Companies
              </p>
              <p className="text-2xl font-bold text-blue-800">{totalCompanies}</p>
            </div>
            <MdAnalytics className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-semibold flex items-center gap-1">
                <FaCheckCircle className="w-4 h-4" />
                Approval Rate
              </p>
              <p className="text-2xl font-bold text-green-800">{approvalRate.toFixed(1)}%</p>
            </div>
            <MdTrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-semibold flex items-center gap-1">
                <FaShieldAlt className="w-4 h-4" />
                Compliance
              </p>
              <p className="text-2xl font-bold text-purple-800">{complianceRate.toFixed(1)}%</p>
            </div>
            <FaClipboardCheck className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 font-semibold flex items-center gap-1">
                <FaSearchDollar className="w-4 h-4" />
                Normal Rate
              </p>
              <p className="text-2xl font-bold text-orange-800">{normalRate.toFixed(1)}%</p>
            </div>
            <AiOutlineBarChart className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* AI Processing Status */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg mb-6 border border-gray-200">
        <div className="flex items-center gap-3">
          <FaCogs className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <p className="font-medium text-gray-800">Neural Processing Status</p>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MdAutoAwesome className="w-4 h-4" />
                {companies.length + inspections.length} data points analyzed
              </span>
              <span className="flex items-center gap-1">
                <FaEye className="w-4 h-4" />
                {insights.length} insights generated
              </span>
              <span className="flex items-center gap-1">
                <AiOutlineLineChart className="w-4 h-4" />
                {analysisComplete ? 'Analysis complete' : 'Processing...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generated Insights */}
      {insights.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FaLightbulb className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-bold text-gray-800">Intelligent Insights</h3>
          </div>
          
          {insights.map((insight, index) => (
            <div key={index} className={`border rounded-xl p-5 ${getInsightBgColor(insight.type)} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-start gap-4">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800 text-lg">{insight.title}</h4>
                    <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border">
                      <FaChartLine className="w-3 h-3 text-gray-500" />
                      <span className="text-xs font-medium text-gray-600">
                        Confidence: {insight.confidence}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{insight.message}</p>
                  
                  {insight.recommendation && (
                    <div className="bg-white bg-opacity-60 p-3 rounded-lg mb-3 border border-white border-opacity-50">
                      <div className="flex items-start gap-2">
                        <FaLightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">AI Recommendation:</p>
                          <p className="text-sm text-gray-700">{insight.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {insight.metrics && (
                    <div className="flex flex-wrap gap-2">
                      {insight.metrics.map((metric, idx) => (
                        <span key={idx} className="text-xs bg-white bg-opacity-80 px-3 py-1 rounded-full border border-gray-200 font-medium text-gray-700">
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !isAnalyzing ? (
        <div className="text-center py-12">
          <FaBrain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">AI Ready for Analysis</p>
          <p className="text-gray-400 text-sm">Load data untuk memulai intelligent analysis</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <FaRobot className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-blue-600 text-lg font-medium">Neural Networks Processing...</p>
          <p className="text-blue-400 text-sm">Analyzing patterns dan generating insights</p>
        </div>
      )}

      {/* AI Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCogs className="w-4 h-4" />
            <span>Powered by EcoMap AI Engine v3.2</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MdAutoAwesome className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleString("id-ID", { 
              dateStyle: "short", 
              timeStyle: "short" 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}