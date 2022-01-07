exports.Query = {
  hello: (parent, args, context) => 'safa',

  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products
    if (filter) {
      const { onSale, avgRating } = filter
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale)
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0
          let numberOf = 0
          db.reviews.forEach((review) => {
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

  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id)
  },

  categories: (parent, args, { db }) => db.categories,

  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id)
  },

  reviews: (parent, args, { db }) => db.reviews,
}
