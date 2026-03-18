import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'

export default function CreateEditView({ products, addProduct, updateProduct }) {
  const { id } = useParams()
  const navigate = useNavigate()
  // TODO: if id present, preload data and onSave should update; else create
  const initial = id ? (products.find((p) => p.id === id) ?? {}) : {}

  
  function onSave(product) {
    if (id) {
      updateProduct(id, product)
    } else {
      addProduct({ ...product , id: crypto.randomUUID()})
    }
    navigate(-1)
  }

  return (
    <div>
      <h2 className="h5 mb-3">{id ? 'Edit Product' : 'Add Product'}</h2>
      <ProductForm initial={initial} onSave={onSave} onCancel={() => navigate(-1)} products={products} editId={id} />
    </div>
  )
}
