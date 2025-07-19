import { createRoot } from 'react-dom/client'
import { Router } from './router/Router.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </>
)
