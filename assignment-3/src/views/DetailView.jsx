import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function DetailView({ products }) {
  const { id } = useParams()
  // TODO: find product by id and render fields
  function findProductById(id) {
  
    return products.find((p) => p.id === id)
  }

  const product = findProductById(id)
  if (!product) {
    return (
      <>
        <div className="alert alert-danger">Product not found</div>
        <div className="mb-3">
          <Link className="btn btn-sm btn-outline-secondary" to="/">← Back to products</Link>
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="mb-3">
        <Link className="btn btn-sm btn-outline-secondary" to="/">← Back to products</Link>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p className="card-text">{product.description || 'No description'}</p>
        </div>
      </div>
    </div>

  )
}
