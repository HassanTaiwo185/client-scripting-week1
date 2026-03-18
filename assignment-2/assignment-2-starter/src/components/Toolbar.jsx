import React from 'react'

/**
 * Toolbar with:
 * - Search input (filters by name as user types)
 * - Sort dropdown (name A–Z/Z–A, price low–high/high–low)
 * - Toggle button to show/hide the form
 *
 * Receive props for current values and onChange handlers.
 */
export default function Toolbar({currentSearch, onSearchChange, currentSort, onSortChange, showForm, onToggleForm}) {
  return (
    <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center mb-3">

        <input className="form-control" placeholder="Search products..." value={currentSearch} onChange={onSearchChange}/>
        <select className="form-select" value={currentSort} onChange={onSortChange}>
          <option value="">Sort by</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="price-asc">Price low–high</option>
          <option value="price-desc">Price high–low</option>
        </select>
        <button className="btn btn-outline-primary" onClick={onToggleForm}>
          {showForm ? 'Hide Form' : 'Add Product'}
        </button>

      </div>

  )
}
