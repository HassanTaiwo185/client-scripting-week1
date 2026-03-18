import React from 'react'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'

export default function ListView( { products, deleteProduct } ) {
  // TODO: search/filter/sort UI and derived list
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('asc')
  const navigate = useNavigate()


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy  === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })

  return (
    <div>
      <div className="d-flex gap-2 align-items-center mb-3">
        {/* TODO: Search input, Category filter, Sort controls */}
        <input type="text" placeholder="Search..." className="form-control form-control-sm"
         value={query} 
         onChange={(e) => setQuery(e.target.value)} />


         <select className="form-select form-select-sm" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
           <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Accessories">Accessories</option>
         </select>


         <select className="form-select form-select-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
           <option value="asc">Sort A-Z</option>
           <option value="desc">Sort Z-A</option>
         </select>
      </div>

      {/* TODO: empty state if none */}
      { sortedProducts.length === 0 && (
        <div className="col-12">
          <div className="alert alert-secondary">No products found</div>
        </div>
      )}

     
        {/* TODO: map derived products to ProductCard elements */}
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {sortedProducts.map((p) => (
    <div className="col" key={p.id}>
      <ProductCard
        product={p}
        onOpen={() => navigate(`/products/${p.id}`)}
        onEdit={() => navigate(`/edit/${p.id}`)}
        onDelete={deleteProduct}
      />
    </div>
  ))}
        </div>
      </div>

  
  )
}
