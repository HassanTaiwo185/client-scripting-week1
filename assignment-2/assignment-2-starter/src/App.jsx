import React, { useEffect, useMemo, useState } from 'react'
import Toolbar from './components/Toolbar'
import Message from './components/Message'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import { readAll, writeAll, resetAll } from './storage/storage'

/**
 * Shell-only app. Students must implement:
 * - localStorage read/write with try/catch (see storage.js)
 * - create, edit, delete flows
 * - search & sort (in memory)
 * - confirmation banners that auto-dismiss
 */

export default function App() {
  // Products
  const [products, setProducts] = useState([])
  

  // UI
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null) // null=create; string=edit



  // Toolbar
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState('name') // 'name' | 'price'
  const [sortDir, setSortDir] = useState('asc') // 'asc' | 'desc'

  // Banners
  const [banner, setBanner] = useState(null) // { type, text } | null
  const [ready, setReady] = useState(false)


useEffect(() => {
  const savedProducts = readAll()
  setProducts(savedProducts)
  setReady(true)
}, [])

useEffect(() => {
  if (!ready) return
  writeAll(products)
}, [products, ready])


  // Derived list (students implement filter/sort)
 const visible = useMemo(() => {

  let filteredBy = products.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(query.toLowerCase())
    const descriptionMatch = product.description.toLowerCase().includes(query.toLowerCase())
    return nameMatch || descriptionMatch
  })

  if(sortKey){
        filteredBy.sort((a,b) => {
          if(sortKey === 'name'){
            return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
          }else if(sortKey === 'price'){
            return sortDir === 'asc' ? a.price - b.price : b.price - a.price
          }
          return 0
        })
      }
      return filteredBy

}, [products, query, sortKey, sortDir])



  // Auto-dismiss banner (students implement)
  useEffect(() => {
    // if (banner) setTimeout(() => setBanner(null), 2000)
    if(banner){
      const timer = setTimeout(() => setBanner(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [banner])

  function handleSave(product) {
    // create vs update
    try {
      if (editingId) {

        // update
        const updatedProducts = products.map(p => p.id === editingId ? { ...p, ...product } : p)
        setProducts(updatedProducts)

      } else {
        // create
        const newProduct = { ...product, id: crypto.randomUUID() }
        setProducts(prev => [...prev, newProduct])
        
      }

      setShowForm(false)
      setBanner({ type: 'success', text: 'Product saved successfully!' })
    } catch (e) {
      setBanner({ type: 'danger', text: e.message })
    } 
  }

  function handleDelete(id) {
    // delete
    try {

      const updatedFilteredProducts = products.filter(p => p.id !== id)
      setProducts(updatedFilteredProducts)
      setBanner({ type: 'success', text: 'Product deleted successfully!' })
    } catch (e) {
      setBanner({ type: 'danger', text: e.message })
    }
  }

  function handleResetStorage() {
    // clear persisted products
    try {
      resetAll()
      setProducts([])
      setBanner({ type: 'success', text: 'Storage reset successfully!' })
    } catch (e) {
      setBanner({ type: 'danger', text: e.message })
    }
  }

  function startEdit(id) {
    setEditingId(id)
    setShowForm(true)
  }

  function startCreate() {
    setEditingId(null)
    setShowForm(true)

  }

  return (
    <div className="container py-3">
      <header className="mb-3 d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Product Manager</h1>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleResetStorage}
        >
          Reset Storage
        </button>
      </header>

      <Toolbar
        /* query, setQuery, sortKey, setSortKey, sortDir, setSortDir, showForm, setShowForm */
        currentSearch={query} 
        onSearchChange={e => setQuery(e.target.value)}
        currentSort={sortKey ? `${sortKey}-${sortDir}` : ''}
        onSortChange={e => {
          const [key, dir] = e.target.value.split('-')
          setSortKey(key)
          setSortDir(dir)
        }}
        showForm={showForm}
        onToggleForm={() => setShowForm(prev => !prev)}
      />

      {banner && <Message type={banner.type} text={banner.text} />}

      {showForm && (
        <div className="mb-3">
          <ProductForm
            /* initialValues (if editing), onSave, onCancel */
            key={editingId}
            initialFormData={editingId ? products.find(p => p.id === editingId) : null}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingId(null) }}

          />
        </div>
      ) }

      <ProductList
        /* products={visible} onEdit={startEdit} onDelete={handleDelete} */
        products={visible}
        onEdit={startEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
