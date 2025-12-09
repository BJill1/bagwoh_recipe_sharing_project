import { Header } from '../components/Header.jsx'
import { Status } from '../components/Status.jsx'
import { ChatRoom } from '../components/ChatRoom.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function Chat() {
    const { status } = useSocket()
    return (
    <div style={{ padding: 8 }}>
      <br />
      <h2>Welcome to my Recipe-Sharing App!</h2>
      <br />
      <Header />
      <br />
      <hr />
      <br />
      <Status />
      <br />
      <hr />
      <br />
      {status === 'connected' && <ChatRoom />}

    </div>
  )
}
