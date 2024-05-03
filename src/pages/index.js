import Image from 'next/image'
import { Inter } from 'next/font/google'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState()
  const [inputMessage, setInputMessage] = useState('')

  // Conectar al servidor Socket.IO
  const socket = io('http://localhost:3001')

  useEffect(() => {
    const socket = io('http://localhost:3001')

    // Manejar eventos del servidor
    socket.on('connect', () => {
      console.log(socket.id)
      console.log('Conectado al servidor')
    })

    socket.on('messages', (message) => {
      console.log('Mensaje recibido del servidor:', message)
      setMessages(message)
    })

    // Cerrar la conexión al desmontar el componente
    return () => {
      socket.disconnect()
    }
  }, [messages])

  const handleMessageSend = () => {
    const messageObj = {
      text: inputMessage,
      date: new Date(),
      user: 'jesuswav',
    }
    socket.emit('messages', messageObj)
    console.log('mensaje enviado')
    setInputMessage('')
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div>
        <h4>Mensajes recibidos:</h4>
        <p>Text: {messages?.text}</p>
        <p>
          Date:{' '}
          {`${new Date(messages?.date).getHours()}:${new Date(
            messages?.date
          ).getMinutes()}`}
        </p>
        {console.log(new Date(messages?.date))}
        <p>User: {messages?.user}</p>
      </div>
      <div>
        <input
          type='text'
          value={inputMessage}
          className='text-black'
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleMessageSend}>Enviar Mensaje</button>
      </div>
    </main>
  )
}
