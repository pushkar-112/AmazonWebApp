import './Product.css'

function Product({ name, price }) {
  return (
    <div className="product-card">
      <div className="product-label">Product</div>
      <h3 className="product-name">{name}</h3>
      <p className="product-price">${price}</p>
    </div>
  )
}

export default Product
