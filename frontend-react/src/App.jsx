import './App.css'
import Navbar from './Components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import AddProduct from './Pages/AddProduct.jsx'
import Playground from './Pages/Playground.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'

function App() {
  // ---------------------------
  // 1) Simple React counter demo
  // This section is only for learning how useState works.
  // It shows how a value can be stored in state and updated
  // when the user clicks buttons.
  // ---------------------------
  // This demo now lives in the Playground page.

  // ---------------------------
  // 2) Backend connection demo
  // This section tests if the frontend can talk to the Spring Boot API.
  // The fetch call sends a request to localhost:8080/api/hello.
  // The response is stored in the message state and shown on the page.
  // ---------------------------
  // This demo also lives in the Playground page.

  // ---------------------------
  // 3) Product list from backend
  // This is the main feature of the app.
  // We store the list of products in React state and render them on screen.
  // The frontend requests data from the Spring Boot backend using GET.
  // ---------------------------
  // The actual product list logic lives inside Home.jsx.

  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
