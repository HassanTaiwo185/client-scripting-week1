import { useEffect, useState } from 'react'
import { loadProducts, saveProducts } from '../storage/localStorageHelper'



const STORAGE_KEY = 'a3_products'

/**
 * Custom hook contract (student to implement):
 * Returns: { products, addProduct, updateProduct, deleteProduct, resetStorage }
 * - Initialize products from localStorage on mount
 * - Persist products on change (useEffect)
 * - Wrap JSON ops with try/catch
 */
export default function useProducts() {
  const [products, setProducts] = useState([])

  // TODO: load from localStorage once on mount
    useEffect(() => {
      setProducts(loadProducts())
    }, [])


  // TODO: persist to localStorage whenever products change
    useEffect(() => {
      saveProducts(products)
    }, [products])


  // TODO: implement addProduct(data)
  function addProduct(data) {
    setProducts((prev) => [...prev, data])
  }

  // TODO: implement updateProduct(id, patch)
  function updateProduct(id, patch) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    )
  }

  // TODO: implement deleteProduct(id)
  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // TODO: implement resetStorage()
  function resetStorage() {
    setProducts([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return { products, addProduct, updateProduct, deleteProduct, resetStorage }
}
