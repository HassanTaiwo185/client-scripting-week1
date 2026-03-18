import React, { useState, useEffect } from 'react'

/**
 * Controlled form with inline validation.
 * Fields: name, price, stock, description.
 * - Show errors under inputs (on blur and on submit).
 * - On valid submit, call onSave(product). Parent decides create vs edit.
 * - Support Edit mode: parent provides initial values and a cancel action.
 */
export default function ProductForm({ onSave, initialFormData, onCancel }) {

  const isEditMode = initialFormData ? true : false

  const [formData, setFormData] = useState(
  initialFormData || {
    name: '',
    price: '',
    stock: '',
    description: '',
  }
)

const [errors, setErrors] = useState({})


useEffect(() => {
  if (initialFormData) {
    setFormData({
      ...initialFormData,
      price: String(initialFormData.price),
      stock: String(initialFormData.stock),
    })
  }
}, [initialFormData])

  
  function handleSubmit(e) {
    e.preventDefault()
    // validate; if ok, onSave(normalizedProduct)
    if (!validate()) return  
    

    const normalizedProduct = {
      name: formData.name.trim(),
      price: Number(formData.price),
     stock: Number(formData.stock),
      description: formData.description.trim()
    }

    onSave(normalizedProduct);

    if (!isEditMode) {
      setFormData({ name: '', price: '', stock: '', description: '' })
    }
  

    

    

      
  }

  function handleChange(e) {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }


  function validate() {
  const e = {}
  if (!formData.name.trim()) 
    e.name = 'Name is required'

  const price = Number(formData.price)
  if (!String(formData.price).trim()) {
    e.price = 'Price is required'
  } else if (Number.isNaN(price) || price < 0 || !/^\d+(?:\.\d{1,2})?$/.test(String(formData.price))) {
    e.price = 'Price must be a number with up to 2 decimals (e.g., 12.34)'
  }

  const stock = Number(formData.stock)
  if (!String(formData.stock).trim()) {
    e.stock = 'Stock is required'
  } else if (!Number.isInteger(stock) || stock < 0) {
    e.stock = 'Stock must be a non-negative integer'
  }

  if (!formData.description.trim()){
       e.description = 'Description is required'
  } 
  setErrors(e)
  return Object.keys(e).length === 0
}

  // Works for onblur function
  function validateField(name, value) {
  const newErrors = { ...errors }

  if (name === 'name') {
    if (!value.trim()) {
      newErrors.name = 'Name is required'}
    else {
      delete newErrors.name
    }
  }

  if (name === 'price') {
    if (!value.trim()) {
      newErrors.price = 'Price is required'}
    else if (Number.isNaN(Number(value)) || Number(value) < 0 || !/^\d+(\.\d{1,2})?$/.test(value)) 
      {
        newErrors.price = 'Price must be a positive number with up to 2 decimals'
      }
    else {
      delete newErrors.price }
  }

  if (name === 'stock') {
    if (!value.trim()){
       newErrors.stock = 'Stock is required'}
    else if (!Number.isInteger(Number(value)) || Number(value) < 0) 
      {
        newErrors.stock = 'Stock must be a non-negative integer'
      }
    else {
      delete newErrors.stock
    }
  }

  if (name === 'description') {
    if (!value.trim()) newErrors.description = 'Description is required'
    else delete newErrors.description
  }

  setErrors(newErrors)
}


  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Product Name</label>
        {/* controlled input + error */}
        <input className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        value={formData.name} onChange={handleChange} name='name' onBlur={(e) => validateField(e.target.name, e.target.value)}/>
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Price</label>
        {/* controlled input + error */}
        <input className={`form-control ${errors.price ? 'is-invalid' : ''}`}
        value={formData.price} onChange={handleChange} name="price" onBlur={(e) => validateField(e.target.name, e.target.value)}/>
        <div className="form-text">Format: 12.34</div>
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Stock</label>
        {/* controlled input + error */}
        <input className={`form-control ${errors.stock?'is-invalid':''}`} value={formData.stock} 
        onChange={handleChange} name='stock' onBlur={(e) => validateField(e.target.name, e.target.value)}/>
          {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        {/* controlled textarea + error */}
        <textarea className={`form-control ${errors.description?'is-invalid':''}`} 
        value={formData.description} onChange={handleChange}
        rows="3" name='description' onBlur={(e) => validateField(e.target.name, e.target.value)}>
        </textarea>
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>



        {/* Show Cancel in edit mode */}
      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {isEditMode ? 'Update' : 'Save'}
        </button>

        {isEditMode && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

    </form>
  )
}
