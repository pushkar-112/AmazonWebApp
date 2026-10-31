import {useEffect, useState} from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import Product from './Product.jsx'

function App() {
  // ---------------------------
  // 1) Simple React counter demo
  // This section is only for learning how useState works.
  // It shows how a value can be stored in state and updated
  // when the user clicks buttons.
  // ---------------------------
  const [counter, setCounter] = useState(0)

  function incrementCounter() {
    setCounter((prev) => prev + 1)
  }

  function decrementCounter() {
    setCounter((prev) => prev - 1)
  }

  function generateRandomNumber() {
    setCounter(Math.floor(Math.random() * 100))
  }

  // ---------------------------
  // 2) Backend connection demo
  // This section tests if the frontend can talk to the Spring Boot API.
  // The fetch call sends a request to localhost:8080/api/hello.
  // The response is stored in the message state and shown on the page.
  // ---------------------------
  const [message, setMessage] = useState('')

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

  // Runs only once when the component loads.
  // This is a quick demo that shows a random number on page load.
  useEffect(() => {
    generateRandomNumber()
  }, [])

  // ---------------------------
  // 3) Product list from backend
  // This is the main feature of the app.
  // We store the list of products in React state and render them on screen.
  // The frontend requests data from the Spring Boot backend using GET.
  // ---------------------------
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  async function getProducts() {
    try {
      // GET request to retrieve all products from the backend
      const response = await fetch('http://localhost:8080/products')
      const data = await response.json()
      setProducts(data)
      console.log('Products:', data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  async function addProduct(product) {
    try {
      // POST request to send a new product to the backend
      const response = await fetch('http://localhost:8080/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      const data = await response.json()
      console.log('Product added:', data)
      return data
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  // Load all products when the page first opens.
  useEffect(() => {
    getProducts()
  }, [])

  async function handleSubmit() {
      // This function creates a product object from the input fields.
    // Then it sends it to the backend and refreshes the list.
    const product = {
      prodName: name,
      price: Number(price),
    }

    await addProduct(product)
        setName('')
        setPrice('')

        // refresh the product list after adding a new product
        await getProducts()
  }

  return (
    <div>
      <Navbar />

      <h1>Add Product</h1>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Product</button>

      {/* Render each product as a Product card */}
      {products.map((product) => (
        <Product
          key={product.prodId} // Unique ID from database, required for React lists
          name={product.prodName}
          price={product.price}
        />
      ))}

      <hr />
      <h2>PLAYGROUND BELOW</h2>
      <hr />

      <p>Refresh to generate random number</p>
      <h2>Random Number - {counter}</h2>

      <button onClick={incrementCounter}>Click me to increment number</button>
      <button onClick={decrementCounter}>Click me to decrement number</button>

      <h2>Spring Boot API</h2>
      <button onClick={fetchMessage}>Call Spring Boot API</button>

      <h2>{message}</h2>
    </div>
  )
}

export default App
