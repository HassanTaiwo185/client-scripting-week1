import React from 'react'

export default function ProductCard({ product, onOpen, onEdit, onDelete }) {
  return (
    <div className="card h-100">
      <div className="card-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* TODO: show name, formatted price, stock, description */}
        <h5 className="card-title">{product.name}</h5>
        <span className="badge bg-secondary mb-2">{product.category}</span>
        <div className="fw-bold">${product.price?.toFixed(2)}</div>
        <div className="text-muted">Stock: {product.stock}</div>
        <div className="text-muted">{product.description}</div>
      </div>
      <div className="card-footer d-flex justify-content-end gap-2">
        {/* TODO: buttons: View / Edit / Delete */}
        <button className="btn btn-primary" onClick={() => onOpen()}>View</button>
        <button className="btn btn-secondary" onClick={() => onEdit()}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(product.id)}>Delete</button>
      </div>
    </div>
  )
}
