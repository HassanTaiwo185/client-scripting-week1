import React from 'react'
import ProductItem from './ProductItem'

export default function ProductList({ items, onDelete }){
  // TODO: if items is empty, show "No products available."
  if(items.length === 0){
    return(
      <div>
        <h2 className="h5 mb-3">Products</h2>
        <div className="alert alert-secondary">No products available.</div>
      </div>

    )
  }
  // TODO: otherwise, map items to <ProductItem />
  return (
    <div>
      <h2 className="h4 mb-3">Products</h2>
       <div className="row g-3">
           {items.map((product) => (
           <div key={product.id} className="col-12">
      <ProductItem  product={product} onDelete={onDelete} />
    </div>
  ))}
</div>

    </div>
  )
}
