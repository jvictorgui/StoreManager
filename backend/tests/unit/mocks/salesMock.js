const allSales = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
    },
    {
      saleId: 3,
      productId: 1,
      quantity: 1,
    },
    {
      saleId: 3,
      productId: 2,
      quantity: 5,
    },
  ];
const newSale = {
  request: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
  expectedResponse: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};
  module.exports = {
    allSales,
    newSale,
  };