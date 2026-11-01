// Base URL for the Spring Boot backend.
// All API calls in this file use the same backend host and port.
const BASE_URL = 'http://localhost:8080/'

// Fetch all products from the backend.
export async function getAllProducts() {
  const response = await fetch(BASE_URL + 'products')

  // If the request fails, throw an error so the component can handle it.
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

// Send a new product to the backend.
export async function createProduct(product) {
  const response = await fetch(BASE_URL + 'addProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  // If the server does not accept the request, stop and report the problem.
  if (!response.ok) {
    throw new Error('Failed to create product')
  }

  return response.json()
}

// Fetch a single product by its ID from the backend.
// This is used on the Product Details page.
export async function getProductById(id) {
  const response = await fetch(BASE_URL + 'product/' + id)

  if (!response.ok) {
    throw new Error('Failed to fetch product details')
  }

  return response.json()
}
