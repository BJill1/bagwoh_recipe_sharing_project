import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
export function Header() {
  const [token, setToken] = useAuth()
  if (token) {
    const { sub } = jwtDecode(token)
    const { socket } = useSocket()
    const handleLogout = () => {
      socket.disconnect()
      setToken(null)
    }

    return (
      <div>
        Logged in as <User id={sub} />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }
  return (
    <div>
      <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
