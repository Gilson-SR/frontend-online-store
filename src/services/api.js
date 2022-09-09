export async function getCategories() {
  try {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
    const request = await fetch(endpoint);
    const response = await request.json();
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function getProductsFromCategoryAndQuery(query, categoryId) {
  try {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const request = await fetch(endpoint);
    const response = await request.json();
    return response;
  } catch (e) {
    return e.message;
  }
}

export async function getProductById(productId) {
  try {
    const endpoint = `https://api.mercadolibre.com/items/${productId}`;
    const request = await fetch(endpoint);
    const response = await request.json();
    return response;
  } catch (e) {
    return e.message;
  }
}
