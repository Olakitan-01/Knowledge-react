import { useEffect } from 'react'
import TopNavbar from './topNavbar'
import BottomNavbar from './bottomNavbar'
import useUserStore from '../stores/useUserStore'

function Layout({ children }) {
  const { fetchProfile, checkTokenExpiry } = useUserStore()

  useEffect(() => {
    checkTokenExpiry()
    fetchProfile()
  }, [fetchProfile, checkTokenExpiry])

  return (
    <div className="pb-16 pt-14 min-h-screen bg-gray-50">
      <TopNavbar />
      <main>
        {children}
      </main>
      <BottomNavbar />
    </div>
  )
}

export default Layout