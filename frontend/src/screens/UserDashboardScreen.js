import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserDashboardScreen = () => {
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!userInfo) {
      navigate('/user/auth')
    }
  }, [navigate, userInfo])
  return <h1>Welcome, {userInfo && userInfo.userId}</h1>
}

export default UserDashboardScreen
