// TODO: Implement localStorage-based persistence using JSON.parse / JSON.stringify.
// Use this key for storage:
export const STORAGE_KEY = 'a1_products';

// TODO: return an array of products from localStorage (or [] if none)
export function getAllProducts() {
  /* your code */
try {    
  const products = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return products ? products : [];
  } catch (error) {
    console.error('Error parsing products from localStorage:', error);
    return [];
  }

}

// TODO: persist a product into storage
export function addProduct(product) {
  /* your code */
  const products =  getAllProducts();
  products.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return products;
}

// TODO: remove a product by id and persist
export function removeProduct(id) {
  /* your code */
  const products =  getAllProducts();
  const removed = products.filter(product => product.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(removed));
  return removed;
}
