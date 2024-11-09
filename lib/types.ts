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
  userId: null | number;
  items: CartItemType[];
  totalPrice: number;
  rating: number;
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
