export default (products, filters) => {
  let productsCopy = products ? [...products] : [];
  if (filters.categoryFilter) {
    productsCopy = productsCopy.filter(
      item => item.categoryId === filters.categoryFilter
    );
  }

  if (filters.sortFilter) {
    productsCopy.sort((a, b) => {
      if (filters.sortFilter < 0) {
        return a.price - b.price;
      } else return b.price - a.price;
    });
  }
  return productsCopy;
};
