import { Navigate } from 'react-router-dom'
import useUserStore from '../stores/useUserStore'
import Layout from '../components/layout'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUserStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Layout>{children}</Layout>
}

export default ProtectedRoute