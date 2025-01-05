import './App.css'
import { useEffect, useState } from 'react'
import { connectSocket, socket, disconnectSocket } from './services/socket'
function App() {

  useEffect(() => {
    connectSocket()
    socket.on('connect', () => {
      console.log('connected', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    return () => {
      disconnectSocket()
    }
  }, [])
  const [message, setMessage] = useState('')

  const getmsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const sendmsg = () => {
    console.log(message,'message');
    socket.emit('message', message)
    socket.on('message', (msg) => {
      console.log(msg ,`message from server`);
      const msgElement = document.getElementById('msg');
      if (msgElement) msgElement.innerHTML = msg;
      
    })
  }
  return (
    <>
      <h1>app</h1>
      <input type="text" name="" id=""  onChange={getmsg} />
      <button onClick={sendmsg}>send</button>
      <p id='msg'></p>
    </>
  )
}

export default App
