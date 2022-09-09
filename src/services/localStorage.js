export function getProductsCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  return cartItems;
}

export function saveProductCart(product) {
  const data = getProductsCart() || [];
  localStorage.setItem('cartItems', JSON.stringify([...data, product]));
}

export function removeProductCart(product) {
  const products = getProductsCart();
  const productsFiltered = products.filter((p) => p.id !== product.id);
  localStorage.setItem('cartItems', JSON.stringify(productsFiltered));
}
