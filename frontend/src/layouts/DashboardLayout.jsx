import { Outlet, Link } from 'react-router-dom'

function DashboardLayout() {

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0f172a'
    }}>
      <header style={{
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#f1f5f9',
            textDecoration: 'none'
          }}
        >
          Fikir Analiz Platformu
        </Link>
        
        <nav style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <Link 
            to="/" 
            style={{
              color: '#cbd5e1',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Ana Sayfa
          </Link>
        </nav>
      </header>
      
      <Outlet />
    </div>
  )
}

export default DashboardLayout



