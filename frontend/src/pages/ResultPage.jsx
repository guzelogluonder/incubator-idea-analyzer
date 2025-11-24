import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import apiClient from '../api/client'
import './ResultPage.css'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

function ResultPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [idea, setIdea] = useState(null)

  useEffect(() => {
    async function fetchIdea() {
      try {
        const response = await apiClient.get(`/ideas/${id}`)
        setIdea(response.data)
        setLoading(false)
      } catch (err) {
        setError(err?.response?.data?.error || err?.message || 'Fikir bulunamadı')
        setLoading(false)
      }
    }

    if (id) {
      fetchIdea()
    }
  }, [id])

  if (loading) {
    return (
      <main className="result-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Analiz sonuçları yükleniyor...</p>
        </div>
      </main>
    )
  }

  if (error || !idea) {
    return (
      <main className="result-page">
        <div className="error-container">
          <h2>Hata</h2>
          <p>{error || 'Fikir bulunamadı'}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Ana Sayfaya Dön
          </button>
        </div>
      </main>
    )
  }

  // Radar chart data
  const radarData = {
    labels: [
      'Problem Doğrulama',
      'Pazar Olgunluğu',
      'Rekabet',
      'Farklılaşma',
      'Teknik Fizibilite',
      'Risk Belirsizliği',
    ],
    datasets: [
      {
        label: 'Skorlar',
        data: [
          idea.scores?.problemValidation || 0,
          idea.scores?.marketMaturity || 0,
          idea.scores?.competition || 0,
          idea.scores?.differentiation || 0,
          idea.scores?.techFeasibility || 0,
          idea.scores?.riskUncertainty || 0,
        ],
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(102, 126, 234, 1)',
      },
    ],
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed.r.toFixed(1)}/100`
          },
        },
      },
    },
  }

  // Calculate average score
  const scores = idea.scores || {}
  const scoreValues = Object.values(scores)
  const averageScore =
    scoreValues.length > 0
      ? scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length
      : 0

  // Get insights based on scores
  const getInsights = () => {
    const insights = []
    const scoreLabels = {
      problemValidation: 'Problem Doğrulama',
      marketMaturity: 'Pazar Olgunluğu',
      competition: 'Rekabet',
      differentiation: 'Farklılaşma',
      techFeasibility: 'Teknik Fizibilite',
      riskUncertainty: 'Risk Belirsizliği',
    }

    Object.entries(scores).forEach(([key, value]) => {
      if (value < 40) {
        insights.push({
          type: 'warning',
          title: `${scoreLabels[key]} Düşük`,
          message: `Bu alanda gelişim fırsatı var. Skorunuz: ${value.toFixed(1)}/100`,
        })
      } else if (value >= 80) {
        insights.push({
          type: 'success',
          title: `${scoreLabels[key]} Güçlü`,
          message: `Bu alanda güçlü bir konumdasınız. Skorunuz: ${value.toFixed(1)}/100`,
        })
      }
    })

    return insights
  }

  const insights = getInsights()

  return (
    <main className="result-page">
      <div className="result-container">
        <header className="result-header">
          <div className="header-top">
            <h1>{idea.ideaTitle || 'Fikir Analizi'}</h1>
            {idea.analysisSource && (
              <span className={`analysis-badge ${idea.analysisSource === 'ai' ? 'ai-badge' : 'heuristic-badge'}`}>
                {idea.analysisSource === 'ai' ? '🤖 AI Analizi' : '📊 Heuristik Analiz'}
              </span>
            )}
          </div>
          <p className="founder-name">Kurucu: {idea.founderName || 'Bilinmeyen'}</p>
        </header>

        {/* Average Score Card */}
        <section className="score-summary">
          <div className="average-score-card">
            <h2>Genel Skor</h2>
            <div className="score-circle">
              <span className="score-value">{averageScore.toFixed(1)}</span>
              <span className="score-max">/100</span>
            </div>
          </div>
        </section>

        {/* Chart and Insights Grid */}
        <div className="result-content-grid">
          {/* Radar Chart */}
          <section className="chart-section">
            <h2>Detaylı Skor Analizi</h2>
            <div className="radar-chart-container">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </section>

          {/* Insights Cards */}
          {insights.length > 0 && (
            <section className="insights-section">
              <h2>Önemli Noktalar</h2>
              <div className="insights-grid">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`insight-card insight-${insight.type}`}
                  >
                    <h3>{insight.title}</h3>
                    <p>{insight.message}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Lean Canvas Grid */}
        <section className="lean-canvas-section">
          <h2>Lean Canvas</h2>
          <div className="lean-canvas-grid">
            <div className="canvas-cell canvas-problem">
              <h3>Problem</h3>
              <p>{idea.leanCanvas?.problem || '-'}</p>
            </div>
            <div className="canvas-cell canvas-solution">
              <h3>Çözüm</h3>
              <p>{idea.leanCanvas?.solution || '-'}</p>
            </div>
            <div className="canvas-cell canvas-value-prop">
              <h3>Benzersiz Değer Önerisi</h3>
              <p>{idea.leanCanvas?.uniqueValueProp || '-'}</p>
            </div>
            <div className="canvas-cell canvas-customers">
              <h3>Müşteri Segmentleri</h3>
              <p>{idea.leanCanvas?.customerSegments || '-'}</p>
            </div>
            <div className="canvas-cell canvas-channels">
              <h3>Kanallar</h3>
              <p>{idea.leanCanvas?.channels || '-'}</p>
            </div>
            <div className="canvas-cell canvas-revenue">
              <h3>Gelir Akışları</h3>
              <p>{idea.leanCanvas?.revenueStreams || '-'}</p>
            </div>
            <div className="canvas-cell canvas-costs">
              <h3>Maliyet Yapısı</h3>
              <p>{idea.leanCanvas?.costStructure || '-'}</p>
            </div>
            <div className="canvas-cell canvas-metrics">
              <h3>Ana Metrikler</h3>
              <p>{idea.leanCanvas?.keyMetrics || '-'}</p>
            </div>
            <div className="canvas-cell canvas-advantage">
              <h3>Haksız Avantaj</h3>
              <p>{idea.leanCanvas?.unfairAdvantage || '-'}</p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="action-buttons">
          <button onClick={() => navigate('/')} className="action-button primary">
            Yeni Fikir Analizi
          </button>
          <button onClick={() => navigate('/mentor')} className="action-button secondary">
            Mentor Dashboard
          </button>
        </section>
      </div>
    </main>
  )
}

export default ResultPage

