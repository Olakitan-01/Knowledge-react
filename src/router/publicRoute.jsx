import { Navigate } from 'react-router-dom'
import useUserStore from '../stores/useUserStore'

function PublicRoute({ children }) {
  const { isAuthenticated } = useUserStore()

  if (isAuthenticated) {
    return <Navigate to="/home" />
  }

  return children
}

export default PublicRoute