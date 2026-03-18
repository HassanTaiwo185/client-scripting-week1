import React, { useMemo, useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import { addProduct, removeProduct, getAllProducts } from './storage/productStorage';


export default function App(){
  // TODO: start with [] and consider hydrating from storage once storage helpers are implemented
  const [items, setItems] = useState([])

  // Optional: toggle between views; start on 'list'
  const [view, setView] = useState('list') // 'list' | 'form'

  useEffect(() => {
      const products = getAllProducts();
       setItems(products); }, [])

  // TODO: compute total from items
  const total = useMemo(() => {
    return items.length;
  } , [items]);

  function handleCreate(data){
    // TODO: validate (in the form), persist to storage, then update state
    // Example flow (do not copy/paste): create id, add to storage, reload items
    // setItems(...)
    // setView('list')
     const product = {
      id: items.length + 1,
      name: data.name,
      price: data.price.toFixed(2),
      stock: data.stock,
      description: data.description
    };
    addProduct(product);
    setItems(getAllProducts());
    setView('list');
    console.log('Create product (student to implement):', data)
  }

  function handleDelete(id){
    // TODO: remove from storage, then update state
    console.log('Delete product (student to implement):', id)
    removeProduct(id);
    const updatedProductList =  getAllProducts();
    setItems(updatedProductList);

  }

  return (
    <div className="container py-3">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">My Web Shop</h1>
        <div className="btn-group">
          <button className={`btn btn-sm btn-${view==='list'?'primary':'outline-primary'}`} onClick={() => setView('list')}>
            Product List ({total})
          </button>
          <button className={`btn btn-sm btn-${view==='form'?'primary':'outline-primary'}`} onClick={() => setView('form')}>
            Add Product
          </button>
        </div>
      </header>

      {view === 'form' ? (
        <ProductForm onSubmit={handleCreate} />
      ) : (
        <ProductList items={items} onDelete={handleDelete} />
      )}
    </div>
  )
}
