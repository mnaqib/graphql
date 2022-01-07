exports.Category = {
  products: ({ id: categoryId }, { filter }, { products, reviews }) => {
    const categoryProducts = products.filter(
      (product) => product.categoryId === categoryId
    )

    let filteredProducts = categoryProducts
    if (filter) {
      const { onSale, avgRating } = filter
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale)
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0
          let numberOf = 0
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating
              numberOf++
            }
          })
          const avgProdRating = sumRating / numberOf
          return avgProdRating >= avgRating
        })
      }
    }
    return filteredProducts
  },
}
