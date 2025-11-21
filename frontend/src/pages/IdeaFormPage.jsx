import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../api/client'
import './IdeaFormPage.css'

function IdeaFormPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const [formData, setFormData] = useState({
    founderName: '',
    ideaTitle: '',
    answers: {
      problem: '',
      targetCustomer: '',
      existingAlternatives: '',
      solution: '',
      revenueModel: '',
      techStackThoughts: '',
      biggestRisks: '',
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'founderName' || name === 'ideaTitle') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [name]: value,
        },
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.post('/ideas', formData)
      navigate(`/result/${response.data._id}`)
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Bir hata oluştu')
      setLoading(false)
    }
  }

  return (
    <main className="idea-form-page">
      <div className="form-container">
        <h1>Fikir Analizi Formu</h1>
        <p className="form-subtitle">
          Girişim fikrinizi analiz etmek için lütfen aşağıdaki soruları cevaplayın.
        </p>

        <form onSubmit={handleSubmit} className="idea-form">
          <div className="form-section general-info">
            <h2>Genel Bilgiler</h2>
            
            <div className="form-group">
              <label htmlFor="founderName">
                Kurucu Adı <span className="required">*</span>
              </label>
              <input
                type="text"
                id="founderName"
                name="founderName"
                value={formData.founderName}
                onChange={handleChange}
                required
                placeholder="Adınızı girin"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ideaTitle">
                Fikir Başlığı <span className="required">*</span>
              </label>
              <input
                type="text"
                id="ideaTitle"
                name="ideaTitle"
                value={formData.ideaTitle}
                onChange={handleChange}
                required
                placeholder="Fikrinizi kısaca özetleyin"
              />
            </div>
          </div>

          <div className="form-section idea-details">
            <h2>Fikir Detayları</h2>

            <div className="form-group">
              <label htmlFor="problem">
                1. Problem <span className="required">*</span>
              </label>
              <textarea
                id="problem"
                name="problem"
                value={formData.answers.problem}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Çözmek istediğiniz problemi detaylıca açıklayın..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="targetCustomer">
                2. Hedef Müşteri <span className="required">*</span>
              </label>
              <textarea
                id="targetCustomer"
                name="targetCustomer"
                value={formData.answers.targetCustomer}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Hedef müşteri kitlenizi tanımlayın..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="existingAlternatives">
                3. Mevcut Alternatifler <span className="required">*</span>
              </label>
              <textarea
                id="existingAlternatives"
                name="existingAlternatives"
                value={formData.answers.existingAlternatives}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Müşterilerin şu anda bu problemi nasıl çözdüğünü açıklayın..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="solution">
                4. Çözüm <span className="required">*</span>
              </label>
              <textarea
                id="solution"
                name="solution"
                value={formData.answers.solution}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Problemi nasıl çözdüğünüzü açıklayın..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="revenueModel">
                5. Gelir Modeli <span className="required">*</span>
              </label>
              <textarea
                id="revenueModel"
                name="revenueModel"
                value={formData.answers.revenueModel}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Nasıl para kazanacağınızı açıklayın..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="techStackThoughts">
                6. Teknoloji Yığını Düşünceleri <span className="required">*</span>
              </label>
              <textarea
                id="techStackThoughts"
                name="techStackThoughts"
                value={formData.answers.techStackThoughts}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Hangi teknolojileri kullanmayı planlıyorsunuz?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="biggestRisks">
                7. En Büyük Riskler <span className="required">*</span>
              </label>
              <textarea
                id="biggestRisks"
                name="biggestRisks"
                value={formData.answers.biggestRisks}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Fikrinizin karşılaşabileceği riskleri belirtin..."
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Analiz ediliyor...' : 'Fikri Analiz Et'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default IdeaFormPage

