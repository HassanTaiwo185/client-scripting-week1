export const STORAGE_KEY = 'a2_products'

/**
 * Return an array of products from localStorage.
 * Safely parse JSON with try/catch.
 * Return [] if missing or malformed.
 */
export function readAll() {
  /* your code */
  try{
    const data = localStorage.getItem(STORAGE_KEY)
    if(!data){
      return []
    }
    return JSON.parse(data)
  }catch(e){
    console.error('Error reading from localStorage', e)
    return []
  }
}

/**
 * Persist the full list of products to localStorage.
 * Use JSON.stringify with try/catch.
 * If write fails (quota), surface an error to the caller.
 */
export function writeAll(list) {
  /* your code */
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }catch(e){
    console.error('Error writing to localStorage', e)
    throw new Error('Failed to save products. Please try again.')
  }
}

/**
 * Clear all persisted products.
 */
export function resetAll() {
  /* your code */
  localStorage.removeItem(STORAGE_KEY)
}
