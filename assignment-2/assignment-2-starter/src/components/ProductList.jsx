import React from 'react'
import ProductCard from './ProductCard'

/**
 * - If no products, show "No products available."
 * - Otherwise map products to <ProductCard />
 * - Do not mutate props; sorting/filtering should happen in parent.
 */
export default function ProductList({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <div>
        <h2 className="h5 mb-3">Products</h2>
        <div className="alert alert-info">No products available.</div>
      </div>
    )
  }
  return (
<div className="border border-primary rounded p-3">
  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {products.map(product => (
      <div className="col" key={product.id}>
        <ProductCard product={product} onEdit={onEdit} onDelete={onDelete} />
      </div>
    ))}
  </div>
</div>

  )
}


