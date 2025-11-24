import { useNavigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

function LandingPage() {
  const navigate = useNavigate()
  const { setRole } = useRole()

  const handleFounderClick = () => {
    setRole('founder')
    navigate('/founder/idea')
  }

  const handleMentorClick = () => {
    setRole('mentor')
    navigate('/mentor')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f1f5f9',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Left Side - Description */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Illustration */}
          <div style={{
            width: '100%',
            maxWidth: '500px',
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg 
              viewBox="0 0 400 280" 
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '500px'
              }}
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 0.3}} />
                  <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 0.3}} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 0.6}} />
                  <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 0.6}} />
                </linearGradient>
              </defs>
              
              {/* Chart Container Background */}
              <rect x="60" y="60" width="280" height="180" rx="12" fill="#1e293b" stroke="url(#grad1)" strokeWidth="2" opacity="0.6" />
              
              {/* AI/Analysis icon - Top Left */}
              <g transform="translate(80, 80)">
                <rect x="-18" y="-18" width="36" height="36" rx="6" fill="url(#grad2)" opacity="0.5" stroke="url(#grad1)" strokeWidth="1.5" />
                <circle cx="-6" cy="-6" r="3.5" fill="#667eea" opacity="0.9" />
                <circle cx="6" cy="-6" r="3.5" fill="#764ba2" opacity="0.9" />
                <circle cx="0" cy="6" r="3.5" fill="#667eea" opacity="0.9" />
                <path d="M -10,10 Q 0,14 10,10" stroke="#764ba2" strokeWidth="2.5" fill="none" />
                {/* Connection lines */}
                <line x1="-6" y1="-6" x2="0" y2="6" stroke="#667eea" strokeWidth="1.5" opacity="0.5" />
                <line x1="6" y1="-6" x2="0" y2="6" stroke="#764ba2" strokeWidth="1.5" opacity="0.5" />
              </g>
              
              {/* Chart bars - Centered within container */}
              <g transform="translate(0, 0)">
                <rect x="82" y="160" width="35" height="70" rx="5" fill="#667eea" opacity="0.85" />
                <rect x="132" y="130" width="35" height="100" rx="5" fill="#667eea" opacity="0.85" />
                <rect x="182" y="100" width="35" height="130" rx="5" fill="#764ba2" opacity="0.85" />
                <rect x="232" y="120" width="35" height="110" rx="5" fill="#764ba2" opacity="0.85" />
                <rect x="282" y="140" width="35" height="90" rx="5" fill="#667eea" opacity="0.85" />
              </g>
              
              {/* Chart baseline */}
              <line x1="72" y1="230" x2="327" y2="230" stroke="#475569" strokeWidth="2" opacity="0.4" />
            </svg>
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '0.75rem',
            marginTop: '0.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Fikir Analiz Platformu
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#cbd5e1',
            lineHeight: '1.8',
            marginBottom: '0.5rem'
          }}>
            Girişim fikirlerinizi detaylı analiz edin, skorlarınızı görselleştirin ve gelişim alanlarınızı keşfedin.
          </p>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#94a3b8',
            lineHeight: '1.8'
          }}>
            AI destekli analiz ile fikrinizin güçlü ve zayıf yönlerini objektif bir şekilde değerlendirin.
          </p>

          <div style={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            marginTop: '0.75rem'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#94a3b8',
              margin: 0,
              lineHeight: '1.6'
            }}>
              <strong style={{ color: '#667eea' }}>💡 İpucu:</strong> Detaylı cevaplar vererek daha doğru analiz sonuçları alabilirsiniz.
            </p>
          </div>
        </div>

        {/* Right Side - Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Founder Card */}
          <div
            onClick={handleFounderClick}
            style={{
              backgroundColor: '#1e293b',
              border: '2px solid #334155',
              borderRadius: '1rem',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#667eea'
              e.currentTarget.style.backgroundColor = '#1e3a5f'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155'
              e.currentTarget.style.backgroundColor = '#1e293b'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#f1f5f9'
            }}>
              Fikrimi analiz etmek istiyorum
            </h2>
            
            <p style={{
              fontSize: '1rem',
              color: '#cbd5e1',
              marginBottom: '1rem',
              lineHeight: '1.6'
            }}>
              Girişim fikrinizi detaylı analiz edin ve güçlü yönlerinizi keşfedin.
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <li style={{
                fontSize: '0.9375rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#667eea' }}>✓</span>
                Detaylı skor analizi
              </li>
              <li style={{
                fontSize: '0.9375rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#667eea' }}>✓</span>
                Radar chart görselleştirme
              </li>
              <li style={{
                fontSize: '0.9375rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#667eea' }}>✓</span>
                Otomatik Lean Canvas
              </li>
            </ul>
          </div>

          {/* Mentor Card */}
          <div
            onClick={handleMentorClick}
            style={{
              backgroundColor: '#1e293b',
              border: '2px solid #334155',
              borderRadius: '1rem',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#764ba2'
              e.currentTarget.style.backgroundColor = '#2d1b3d'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(118, 75, 162, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155'
              e.currentTarget.style.backgroundColor = '#1e293b'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#f1f5f9'
            }}>
              Mentor dashboard'u görmek istiyorum
            </h2>
            
            <p style={{
              fontSize: '1rem',
              color: '#cbd5e1',
              marginBottom: '1rem',
              lineHeight: '1.6'
            }}>
              Girişimcilerin gelişimini takip edin ve kör noktaları belirleyin.
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <li style={{
                fontSize: '0.9375rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#764ba2' }}>✓</span>
                Skor karşılaştırması
              </li>
              <li style={{
                fontSize: '0.9375rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#764ba2' }}>✓</span>
                Gelişim analizi
              </li>
              <li style={{
                fontSize: '0.9375rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#764ba2' }}>✓</span>
                Kör nokta tespiti
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

