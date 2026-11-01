import { useEffect, useState } from 'react'

function Playground() {
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState('')

  function incrementCounter() {
    setCounter((prev) => prev + 1)
  }

  function decrementCounter() {
    setCounter((prev) => prev - 1)
  }

  function generateRandomNumber() {
    setCounter(Math.floor(Math.random() * 100))
  }

  async function fetchMessage() {
    try {
      const response = await fetch('http://localhost:8080/api/hello')
      const data = await response.text()
      setMessage(data)
    } catch (error) {
      console.error('Error connecting to backend:', error)
      setMessage('Failed to connect to backend')
    }
  }

  useEffect(() => {
    generateRandomNumber()
  }, [])

  return (
    <section className="demo-panel">
      <h2>Playground</h2>

      <p>Refresh to generate random number</p>
      <div className="counter-box">Random Number - {counter}</div>

      <div className="demo-buttons">
        <button className="primary-button" onClick={incrementCounter}>
          Increment
        </button>
        <button className="secondary-button" onClick={decrementCounter}>
          Decrement
        </button>
      </div>

      <h2>Spring Boot API</h2>
      <button className="secondary-button" onClick={fetchMessage}>
        Call Spring Boot API
      </button>

      <div className="api-box">{message}</div>
    </section>
  )
}

export default Playground

