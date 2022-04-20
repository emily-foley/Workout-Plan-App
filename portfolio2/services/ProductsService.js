let saleItems = [
    { 
      id: 1,  
      name: "Hoodie", 
      image: require('..images/placekitten.jpeg'),
      description: "Black hoodie" ,
      price: "$30.00"
    },
    { 
      id: 2, 
      name: "Shorts", 
      image: require('..images/placekitten.jpeg'),
      description: "Womens running shorts",
      price: "$18.00"
    },
    { 
      id: 3,  
      name: "T-shirt",
      image: require('..images/placekitten.jpeg'),
      description: "Oversized graphic tee",
      price: "$15.00"
    },
  ];

  export function getProducts() {
    return PRODUCTS;
  }
  export function getProducts(id) {
    return PRODUCTS.find((product) => (product.id == id));
  }