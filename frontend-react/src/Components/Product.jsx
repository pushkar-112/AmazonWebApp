import { Link } from 'react-router-dom'
import './Product.css'

function Product({ id, name, price }) {
  return (
    <Link to={`/products/${id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-label">Product</div>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
      </div>
    </Link>
  )
}

export default Product
