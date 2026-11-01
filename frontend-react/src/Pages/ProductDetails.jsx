import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../Services/ProductService.js'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product details:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return <div className="form-panel"><h2>Loading product...</h2></div>
  }

  if (!product) {
    return <div className="form-panel"><h2>Product not found</h2></div>
  }

  return (
    <section className="form-panel">
      <h1>Product Details</h1>

      <div className="product-card">
        <div className="product-label">Product #{product.prodId}</div>
        <h3 className="product-name">{product.prodName}</h3>
        <p className="product-price">${product.price}</p>
      </div>
    </section>
  )
}

export default ProductDetails
