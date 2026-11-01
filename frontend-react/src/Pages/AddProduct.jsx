import { useState } from 'react'
import { createProduct, getAllProducts } from '../Services/ProductService.js'

function AddProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  async function handleSubmit() {
    const product = {
      prodName: name,
      price: Number(price),
    }

    try {
      await createProduct(product)
      setName('')
      setPrice('')
      await getAllProducts()
      alert('Product added successfully!')
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
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
  )
}

export default AddProduct
