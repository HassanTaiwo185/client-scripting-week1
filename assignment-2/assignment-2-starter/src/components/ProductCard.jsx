import React from 'react'

/**
 * Presentational card for a single product.
 * Show name, price (2 decimals), stock, description.
 * Include Edit and Delete buttons (call parent handlers).
 */
export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="text-muted">
          {product.stock} in stock
        </div>
        <h5 className="card-title">{product.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          ${product.price.toFixed(2)}
        </h6>
        <p className="card-text">{product.description}</p>
      </div>
      <div className="card-footer d-flex gap-2">
        <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(product.id)}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(product.id)}>
          Delete     </button>  
        </div>
      </div>
    
  )
}
