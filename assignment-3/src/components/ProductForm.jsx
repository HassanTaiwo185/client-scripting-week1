import React from 'react'
import { useState } from 'react'

/**
 * Controlled form with inline validation.
 * Props: { initial, onSave, onCancel }
 */
export default function ProductForm({ initial, onSave, onCancel, products, editId }) {
  const [formData, setFormData] = useState({name:"", price:"", stock:"", category:"", description:"",...initial})
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: validate and call onSave
    const errors = validate()
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      onSave({...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
})
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const errors = {}
    // Name
  const name = formData.name?.trim()
  if (!name) {
    errors.name = "Please Name is required"
  }
  else if ( products?.some((p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== editId )) 
  {
    errors.name = "Please Name must be unique"
  }



  // Price
  if (formData.price == "") {
    errors.price = "Please Price is required"
  } 
  else if (isNaN(formData.price) || Number(formData.price) < 0) 
  {
    errors.price = "Please price must be a valid positive number ≥ 0.00"
  }


  // Stock
  if (formData.stock == "") {
    errors.stock = "Please Stock is required"
  } 
  else if ( !Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0 )
 {
    errors.stock = "Please Stock must be a integer ≥ 0"
  }



  // Category
  if (!formData.category)
 {
    errors.category = "Please Category is required"
  }

  

  return errors

  }

  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Name</label>
        {/* TODO: controlled input + error */}
        <input className={`form-control ${errors.name ? 'is-invalid' : ''}`}  name="name" value={formData.name} onChange={handleChange}/>
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Price</label>
        {/* TODO: controlled input + error */}
        <input className={`form-control ${errors.price ? 'is-invalid' : ''}`} name="price" value={formData.price} onChange={handleChange} />
        <div className="form-text">Format: 12.34</div>
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Stock</label>
        {/* TODO: controlled input + error */}
        <input className={`form-control ${errors.stock ? 'is-invalid' : ''}`} name="stock" value={formData.stock} onChange={handleChange} />
        {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label">Category</label>
        {/* TODO: select + error */}
        <select className={`form-select ${errors.category ? 'is-invalid' : ''}`} name="category" value={formData.category} onChange={handleChange}>
          <option value="">Choose…</option>
          <option value="Electronics">Electronics</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Accessories">Accessories</option>
        </select>

        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        {/* TODO: controlled textarea + error */}
        <textarea className="form-control" rows="3" name="description" value={formData.description} onChange={handleChange}></textarea>

      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        {/* TODO: Cancel button in edit mode */}
        {onCancel && <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
