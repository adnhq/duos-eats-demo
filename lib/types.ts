export type Deal = {
  type: "DUO" | "REGULAR";
  discount: string;
  description: string;
};

export type Restaurant = {
  id: number;
  created_at: string;
  name: string;
  logo: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
  approved: boolean;
  cuisine: string;
  location: string;
  discount: string;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  popular: boolean;
  discount: string;
  restaurantId: number;
  MenuParameters?: {
    name: string;
    options: string[];
  }[];
};

export type CartItemType = {
  id: number;
  name: string;
  price: number;
  image: string;
  extraParams?: {
    [key: string]: string;
  };
  quantity: number;
};

export type Cart = {
  items: CartItemType[];
  totalPrice: number;
  rating: number;
  restaurantId: null | number;
};

export type CartInfoState = {
  cart: Cart;
};

export type GlobalStoreState = {
  cart: CartInfoState;
};

export type Category = {
  category: string;
};
