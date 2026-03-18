import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import ListView from './views/ListView'
import DetailView from './views/DetailView'
import CreateEditView from './views/CreateEditView'
import useProducts from './hooks/useProducts'

export default function App() {
  // TODO: wire up useProducts and pass data/handlers to views
  const { products, addProduct, updateProduct, deleteProduct }  = useProducts()

  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListView products={products} deleteProduct={deleteProduct} />} />
        <Route path="products/:id" element={<DetailView products={products} />} />
        <Route path="new" element={<CreateEditView products={products} addProduct={addProduct} updateProduct={updateProduct} />} />
        <Route path="edit/:id" element={<CreateEditView products={products} addProduct={addProduct} updateProduct={updateProduct} />} />
        <Route path="*" element={<div className="alert alert-warning">Not Found</div>} />
      </Route>
    </Routes>
  )
}
 