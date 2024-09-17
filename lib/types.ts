export type Deal = {
  type: "DUO" | "REGULAR";
  discount: string;
  description: string;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
};

export type RestaurantData = {
  name: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  instagramVideo: string,
  minOrder: number;
  deals: Deal[];
  menu: {
    [key: string]: MenuItem[];
  };
};

export type CartItem = MenuItem & {
  quantity: number;
};

export const restaurantData = {
  name: "The Tehari Ghor- Banani",
  category: "Rice Dishes",
  rating: 4.7,
  reviews: 176,
  freeDelivery: true,
  minOrder: 50,
  deals: [
    {
      type: "DUO",
      discount: "15% off",
      description: "Min. order Tk 50, and special savings for pandapro members",
    },
    {
      type: "REGULAR",
      discount: "12% off",
      description: "Min. order Tk 50. Valid for all items. Auto applied.",
    },
  ],
  menu: {
    Popular: [
      {
        id: 1,
        name: "Beef Tehari",
        price: 141,
        originalPrice: 160,
        description:
          "Flavorful rice dish prepared with beef cubes, rice & aromatic spices",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        name: "Morog Polao",
        price: 158,
        originalPrice: 180,
        description:
          "Full- Tender chicken mixed with flavor-ful deshi masalas & aromatic rice",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    Rice: [
      {
        id: 3,
        name: "Plain Rice",
        price: 40,
        description: "Steamed white rice",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        name: "Vegetable Fried Rice",
        price: 120,
        description: "Rice stir-fried with mixed vegetables",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    Beverage: [
      {
        id: 5,
        name: "Coca Cola",
        price: 40,
        description: "330ml can",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 6,
        name: "Mineral Water",
        price: 25,
        description: "500ml bottle",
        image:
          "https://images.unsplash.com/photo-1655673653795-f608f4b9dced?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
};
