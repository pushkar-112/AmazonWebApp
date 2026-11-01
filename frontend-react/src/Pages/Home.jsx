import { useEffect, useState } from 'react'
import Product from '../Components/Product.jsx'
import { getAllProducts } from '../Services/ProductService.js'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    loadProducts()
  }, [])

  return (
    <section className="products-panel">
      <h1>Product List</h1>

      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product.prodId}
            id={product.prodId}
            name={product.prodName}
            price={product.price}
          />
        ))}
      </div>
    </section>
  )
}

export default Home
