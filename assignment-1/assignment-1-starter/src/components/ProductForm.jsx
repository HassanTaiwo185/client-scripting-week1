import React, { useState } from 'react'

// TODO: Use useState to manage a model with fields:
// { name: '', price: '', stock: '', description: '' }
// TODO: Create a validate() that sets an errors object and returns boolean:
// - All fields required
// - price: number with up to 2 decimals, >= 0
// - stock: non-negative integer
// TODO: On submit: console.log the model; if valid, call onSubmit(normalizedData)

export default function ProductForm({ onSubmit }){
  // const [model, setModel] = ...
   const [model, setModel] = useState({ name: "", price: "", stock:"", description:""})
  // const [errors, setErrors] = ...
  const [errors, setErrors] = useState({})


  function handleChange(e) { 
       
        const { name, value } = e.target;

        setModel(prev => ({
          ...prev, [name]: value}));


      }


  function handleSubmit(e){
    e.preventDefault()
    // console.log('Submitting:', model)
     console.log('submitting', model)
    // if (!validate()) return
    if (!validate()) return


    // onSubmit({ name: ..., price: Number(...), stock: Number(...), description: ... })
    onSubmit({
       name: model.name,
       price: Number(model.price),
       stock: Number(model.stock),
       description: model.description
      })


      setModel({ name: "", price: "", stock: "", description: "" })
      setErrors({})


  }

  function validate(){
    const newErrors = {};
     
    
        
         if (model.name.trim() === "") {
            newErrors.name = "Name is required please" ;
         }

         if (model.price.trim() === "") {
            newErrors.price = "Price is required please" ;
         }else{
          
              const priceNumber = Number(model.price);
              
         if (isNaN(priceNumber)) {
              newErrors.price = 'Price must be a valid number please';
          } else if (priceNumber < 0) {
                    newErrors.price = 'Price must be greater than or equal to 0 please';
       } else {
            const parts = model.price.split('.');
         if (parts.length === 2 && parts[1].length > 2) {
             newErrors.price = 'Price must have up to 2 decimal places';
            }
          }
        }
         
       

         if (model.stock.trim() === "") {
            newErrors.stock = "Stock is required please" ;
         }else {

           const stockNumber = Number(model.stock);
            
        if (isNaN(stockNumber)) {
        newErrors.stock = 'Stock must be a valid number please';
      } else if (stockNumber < 0) {
          newErrors.stock = 'Stock cannot be negative figure please';
       } else if (model.stock.includes('.')) {
          newErrors.stock = 'stock must be a non-negative integer.';
         }
       }

         if (model.description.trim() === "") {
            newErrors.description = "Description is required please" ;
         }


         


          setErrors(newErrors); 
          return Object.keys(newErrors).length === 0;

  }

  return (
    <form className="row g-3" onSubmit={handleSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Product Name</label>
        {/* TODO: Controlled input (value, onChange) and inline error */}
        <input className="form-control"  name="name" value={model.name} 
        onChange={handleChange} placeholder="Enter product name"/>
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>

      <div className="col-md-3">
        <label className="form-label">Price</label>
        {/* TODO */}
        <input className="form-control" 
        name="price" value={model.price} onChange={handleChange}/>
        {errors.price && <div className="text-danger">{errors.price}</div>}
        <div className="form-text">Format: 12.34</div>
      </div>

      <div className="col-md-3">
        <label className="form-label">Stock</label>
        {/* TODO */}
        <input className="form-control" name="stock" value={model.stock} onChange={handleChange}/>
        {errors.stock && <div className="text-danger">{errors.stock}</div>}
      </div>

      <div className="col-12">
        <label className="form-label">Description</label>
        {/* TODO */}
        <textarea className="form-control" rows="3" name="description" 
       value={model.description} 
        onChange={handleChange} ></textarea>
        {errors.description && <div className="text-danger">{errors.description}</div>}
      </div>

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save Product</button>
      </div>
    </form>
  )
}
