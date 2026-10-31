import {useEffect, useState} from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
  }

  function decrementCounter() {
    setCounter(counter - 1);
  }

  function generateRandomNumber() {
    setCounter(Math.floor(Math.random() * 100));
  }

  const [message, setMessage] = useState("");


  async function fetchMessage() {
    try {
      const response = await fetch("http://localhost:8080/api/hello");
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setMessage("Failed to connect to backend");
    }
  }

  // UseEffect example
  // Call generateRandomNumber when the component mounts
  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
      <div>

        <h1>WebApp1</h1>

          <p>Refresh to generate random number</p>
        <h2>Random Number - {counter}</h2>

        <button onClick={incrementCounter}>
          Click me to increment number
        </button>
        <button onClick={decrementCounter}>
          Click me to decrement number
        </button>

        <h2>Spring Boot API</h2>
        <button onClick={fetchMessage}>
          Call Spring Boot API
        </button>

        <h2>{message}</h2>

      </div>
  )
}

export default App
