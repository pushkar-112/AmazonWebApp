import {useEffect, useState} from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Product from './Components/Product.jsx'
import {createProduct, getAllProducts} from "./Services/ProductService.js";

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

  // Load all products when the page first opens.
  useEffect(() => {
    getProducts()
  }, [])

  // This function fetches all products from the backend and stores them in state.
  async function getProducts() {
    try {
      const data = await getAllProducts()
      setProducts(data)
      console.log('Products:', data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // This function handles the form submission for adding a new product.
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
    await getProducts()
  }

  // This function sends a new product to the backend and logs the response.
  async function addProduct(product) {
    try {
      const data = await createProduct(product)
      console.log('Product added:', data)
      return data
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-container">
        <section className="form-panel">
          <h1>Add Product</h1>

          <div className="product-form">
            <input
              className="text-input"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="text-input"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button className="primary-button" onClick={handleSubmit}>
              Add Product
            </button>
          </div>
        </section>

        <section className="products-panel">
          <h1>Product List</h1>

          <div className="product-list">
            {products.map((product) => (
              <Product
                key={product.prodId}
                name={product.prodName}
                price={product.price}
              />
            ))}
          </div>
        </section>

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
      </main>
    </div>
  )
}

export default App
