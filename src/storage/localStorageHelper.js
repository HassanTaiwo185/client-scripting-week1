
const KEY = 'a3_products'

export function loadProducts() {
  try {
    const data = localStorage.getItem(KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveProducts(products) {
  try {
    localStorage.setItem(KEY, JSON.stringify(products))
  } catch (error) {
    console.error('Failed to save:', error)
  }
}