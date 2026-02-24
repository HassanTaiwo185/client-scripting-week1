import React from 'react'

export default function ProductItem({ product, onDelete }){
  // TODO: render a Bootstrap card with product details and a Delete button
  return (
    <div className="border border-3 border-primary rounded p-3 bg-light shadow-sm">

    <div className="card shadow-sm">
      <div className="card-body bg-light">
        
        <p className="text-dark mb-2">
          <strong>Name:</strong> <span className="fw-bold text-dark">{product.name}</span>
        </p>

        
        <p className="text-dark mb-2">
          <strong>Description:</strong> <span className="fw-bold text-dark">{product.description}</span>
        </p>
        
        <p className="text-dark mb-2">
          <strong>Price:</strong> <span className="fw-bold text-dark">${product.price}</span>
        </p>
        
        <p className="fw-bold text-dark">
          <strong>Stock:</strong> {product.stock}
        </p>
        
        <button 
          onClick={() => onDelete(product.id)}
          className="btn btn-danger w-100"
        >
          Delete
        </button>
      </div>
    </div>
    </div>

  )
}
