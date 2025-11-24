import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import apiClient from '../api/client'
import './MentorDashboardPage.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function MentorDashboardPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const response = await apiClient.get('/ideas')
        setIdeas(response.data)
        setLoading(false)
      } catch (err) {
        setError(err?.response?.data?.error || err?.message || 'Veriler yüklenemedi')
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [])

  // Calculate average score for an idea
  const getAverageScore = (idea) => {
    if (!idea.scores) return 0
    const scores = Object.values(idea.scores)
    return scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0
  }

  // Get first and last ideas
  const firstIdea = ideas.length > 0 ? ideas[0] : null
  const lastIdea = ideas.length > 1 ? ideas[ideas.length - 1] : null

  // Calculate score differences
  const calculateScoreDifferences = () => {
    if (!firstIdea || !lastIdea || !firstIdea.scores || !lastIdea.scores) {
      return null
    }

    const scoreLabels = {
      problemValidation: 'Problem Doğrulama',
      marketMaturity: 'Pazar Olgunluğu',
      competition: 'Rekabet',
      differentiation: 'Farklılaşma',
      techFeasibility: 'Teknik Fizibilite',
      riskUncertainty: 'Risk Belirsizliği',
    }

    const differences = {}
    Object.keys(scoreLabels).forEach((key) => {
      const firstScore = firstIdea.scores[key] || 0
      const lastScore = lastIdea.scores[key] || 0
      differences[key] = {
        label: scoreLabels[key],
        first: firstScore,
        last: lastScore,
        diff: lastScore - firstScore,
      }
    })

    return differences
  }

  // Find blind spots (<40 areas)
  const findBlindSpots = () => {
    if (!lastIdea || !lastIdea.scores) return []

    const scoreLabels = {
      problemValidation: 'Problem Doğrulama',
      marketMaturity: 'Pazar Olgunluğu',
      competition: 'Rekabet',
      differentiation: 'Farklılaşma',
      techFeasibility: 'Teknik Fizibilite',
      riskUncertainty: 'Risk Belirsizliği',
    }

    const blindSpots = []
    Object.entries(lastIdea.scores).forEach(([key, value]) => {
      if (value < 40) {
        blindSpots.push({
          category: scoreLabels[key] || key,
          score: value,
        })
      }
    })

    return blindSpots
  }

  // Generate awareness summary
  const generateAwarenessSummary = () => {
    if (ideas.length === 0) {
      return {
        totalIdeas: 0,
        message: 'Henüz analiz edilmiş fikir bulunmuyor.',
      }
    }

    if (ideas.length === 1) {
      const avgScore = getAverageScore(firstIdea)
      return {
        totalIdeas: 1,
        message: `İlk fikir analizi tamamlandı. Genel skor: ${avgScore.toFixed(1)}/100. Daha fazla analiz yaparak gelişimi takip edebilirsiniz.`,
      }
    }

    const firstAvg = getAverageScore(firstIdea)
    const lastAvg = getAverageScore(lastIdea)
    const improvement = lastAvg - firstAvg
    const blindSpots = findBlindSpots()

    let summary = `Toplam ${ideas.length} fikir analiz edildi. `
    summary += `İlk analizde genel skor ${firstAvg.toFixed(1)}/100, son analizde ${lastAvg.toFixed(1)}/100. `

    if (improvement > 0) {
      summary += `Gelişim: +${improvement.toFixed(1)} puan. `
    } else if (improvement < 0) {
      summary += `Dikkat: ${Math.abs(improvement).toFixed(1)} puan düşüş var. `
    } else {
      summary += `Skorlar sabit kaldı. `
    }

    if (blindSpots.length > 0) {
      summary += `${blindSpots.length} alanda gelişim fırsatı var (skor <40).`
    } else {
      summary += `Tüm alanlar yeterli seviyede (skor ≥40).`
    }

    return {
      totalIdeas: ideas.length,
      firstAvg,
      lastAvg,
      improvement,
      blindSpotsCount: blindSpots.length,
      message: summary,
    }
  }

  const scoreDifferences = calculateScoreDifferences()
  const blindSpots = findBlindSpots()
  const summary = generateAwarenessSummary()

  // Bar chart data for score comparison
  const getBarChartData = () => {
    if (!scoreDifferences) return null

    const categories = Object.values(scoreDifferences).map((d) => d.label)
    const firstScores = Object.values(scoreDifferences).map((d) => d.first)
    const lastScores = Object.values(scoreDifferences).map((d) => d.last)

    return {
      labels: categories,
      datasets: [
        {
          label: 'İlk Analiz',
          data: firstScores,
          backgroundColor: 'rgba(102, 126, 234, 0.5)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 1,
        },
        {
          label: 'Son Analiz',
          data: lastScores,
          backgroundColor: 'rgba(118, 75, 162, 0.5)',
          borderColor: 'rgba(118, 75, 162, 1)',
          borderWidth: 1,
        },
      ],
    }
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'İlk vs Son Analiz Karşılaştırması',
      },
    },
  }

  if (loading) {
    return (
      <main className="mentor-dashboard-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Dashboard verileri yükleniyor...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mentor-dashboard-page">
        <div className="error-container">
          <h2>Hata</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Ana Sayfaya Dön
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mentor-dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Mentor Dashboard</h1>
          <p className="dashboard-subtitle">Fikir Gelişim Analizi ve Kör Nokta Tespiti</p>
        </header>

        {/* Summary Card */}
        <section className="summary-section">
          <div className="summary-card">
            <h2>Genel Özet</h2>
            <p className="summary-message">{summary.message}</p>
            {summary.totalIdeas > 1 && (
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-label">Toplam Analiz</span>
                  <span className="stat-value">{summary.totalIdeas}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">İlk Skor</span>
                  <span className="stat-value">{summary.firstAvg?.toFixed(1) || 0}/100</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Son Skor</span>
                  <span className="stat-value">{summary.lastAvg?.toFixed(1) || 0}/100</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Gelişim</span>
                  <span
                    className={`stat-value ${
                      summary.improvement > 0
                        ? 'positive'
                        : summary.improvement < 0
                        ? 'negative'
                        : ''
                    }`}
                  >
                    {summary.improvement > 0 ? '+' : ''}
                    {summary.improvement?.toFixed(1) || 0}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Score Comparison Chart and Differences Table */}
        {scoreDifferences && (
          <div className="dashboard-grid">
            <section className="chart-section">
              <h2>Skor Karşılaştırması</h2>
              <div className="chart-container">
                <Bar data={getBarChartData()} options={barChartOptions} />
              </div>
            </section>

            <section className="differences-section">
              <h2>Detaylı Skor Farkları</h2>
              <div className="differences-table">
                <table>
                  <thead>
                    <tr>
                      <th>Kategori</th>
                      <th>İlk</th>
                      <th>Son</th>
                      <th>Fark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(scoreDifferences).map((diff, index) => (
                      <tr key={index}>
                        <td>{diff.label}</td>
                        <td>{diff.first.toFixed(1)}</td>
                        <td>{diff.last.toFixed(1)}</td>
                        <td className={diff.diff > 0 ? 'positive' : diff.diff < 0 ? 'negative' : ''}>
                          {diff.diff > 0 ? '+' : ''}
                          {diff.diff.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Blind Spots */}
        {blindSpots.length > 0 && (
          <section className="blindspots-section">
            <h2>Kör Noktalar (Skor &lt;40)</h2>
            <div className="blindspots-grid">
              {blindSpots.map((spot, index) => (
                <div key={index} className="blindspot-card">
                  <h3>{spot.category}</h3>
                  <div className="blindspot-score">
                    <span className="score-value">{spot.score.toFixed(1)}</span>
                    <span className="score-max">/100</span>
                  </div>
                  <p className="blindspot-message">
                    Bu alanda gelişim fırsatı var. Detaylı analiz ve iyileştirme önerileri için
                    sonuç sayfasını inceleyin.
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ideas List */}
        {ideas.length > 0 && (
          <section className="ideas-section">
            <h2>Tüm Fikirler ({ideas.length})</h2>
            <div className="ideas-list">
              {ideas.map((idea) => {
                const avgScore = getAverageScore(idea)
                return (
                  <div
                    key={idea._id}
                    className="idea-card"
                    onClick={() => navigate(`/result/${idea._id}`)}
                  >
                    <div className="idea-header">
                      <h3>{idea.ideaTitle || 'İsimsiz Fikir'}</h3>
                      <div className="idea-header-right">
                        {idea.analysisSource && (
                          <span className={`analysis-badge-small ${idea.analysisSource === 'ai' ? 'ai-badge' : 'heuristic-badge'}`}>
                            {idea.analysisSource === 'ai' ? '🤖 AI' : '📊 Heuristik'}
                          </span>
                        )}
                        <span className="idea-date">
                          {new Date(idea.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                    <p className="idea-founder">Kurucu: {idea.founderName || 'Bilinmeyen'}</p>
                    <div className="idea-score">
                      <span className="score-label">Genel Skor:</span>
                      <span className="score-value">{avgScore.toFixed(1)}/100</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {ideas.length === 0 && (
          <section className="empty-state">
            <h2>Henüz Analiz Edilmiş Fikir Yok</h2>
            <p>İlk fikir analizini oluşturmak için ana sayfaya gidin.</p>
            <button onClick={() => navigate('/')} className="action-button primary">
              Yeni Fikir Analizi
            </button>
          </section>
        )}

        {/* Action Buttons */}
        <section className="action-buttons">
          <button onClick={() => navigate('/')} className="action-button primary">
            Ana Sayfa
          </button>
        </section>
      </div>
    </main>
  )
}

export default MentorDashboardPage

