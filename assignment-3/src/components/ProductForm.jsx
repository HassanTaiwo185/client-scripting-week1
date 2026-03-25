import React from 'react'
import { useState } from 'react'
import useFormValidation from '../hooks/useFormValidation'

/**
 * Controlled form with inline validation.
 * Props: { initial, onSave, onCancel }
 */
const validators = {
  name: (value, products, editId) => {
    const trimmed = value?.trim()
    if (!trimmed) return "Please Name is required"
    if (products?.some((p) => p.name.toLowerCase() === trimmed.toLowerCase() && p.id !== editId))
      return "Please Name must be unique"
    return null
  },
  price: (value) => {
    if (value == "") return "Please Price is required"
    if (isNaN(value) || Number(value) < 0) return "Please price must be a valid positive number ≥ 0.00"
    return null
  },
  stock: (value) => {
    if (value == "") return "Please Stock is required"
    if (!Number.isInteger(Number(value)) || Number(value) < 0) return "Please Stock must be a integer ≥ 0"
    return null
  },
  category: (value) => {
    if (!value) return "Please Category is required"
    return null
  },
}

export default function ProductForm({ initial, onSave, onCancel, products, editId }) {
  const {values, touched, errors, handleChange, validateAll, handleBlur} = useFormValidation({initial, validators, products, editId})

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: validate and call onSave
     const errs = validateAll()
    if (Object.values(errs).every(v => !v)) {  
    onSave({ ...values, price: parseFloat(values.price), stock: parseInt(values.stock) })
}
  }


  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Name</label>
        {/* TODO: controlled input + error */}
        <input className={`form-control ${errors.name ? 'is-invalid' : ''}`}  name="name" value={values.name} onChange={(e)=> handleChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}/>

        {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Price</label>
        {/* TODO: controlled input + error */}
        <input className={`form-control ${errors.price ? 'is-invalid' : ''}`} name="price" value={values.price} onChange={(e)=> handleChange("price", e.target.value)}
        onBlur={() => handleBlur("price")}/>
        <div className="form-text">Format: 12.34</div>
        {touched.price && errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Stock</label>
        {/* TODO: controlled input + error */}
        <input className={`form-control ${errors.stock ? 'is-invalid' : ''}`} name="stock" value={values.stock} onChange={(e)=> handleChange("stock", e.target.value)}
        onBlur={() => handleBlur("stock")}/>
        {touched.stock && errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Category</label>
        {/* TODO: select + error */}
        <select className={`form-select ${errors.category ? 'is-invalid' : ''}`} name="category" value={values.category} onChange={(e)=> handleChange("category", e.target.value)}>
          <option value="">Choose…</option>
          <option value="Electronics">Electronics</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Accessories">Accessories</option>
        </select>

        {touched.category && errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        {/* TODO: controlled textarea + error */}
        <textarea className="form-control" rows="3" name="description" value={values.description} onChange={(e)=> handleChange("description", e.target.value)}></textarea>

      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        {/* TODO: Cancel button in edit mode */}
        {onCancel && <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
