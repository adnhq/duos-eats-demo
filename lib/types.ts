export type UserSessionInfo = {
  id: number;
  email: string;
  name: string;
  role: "restaurant" | "user" | "admin";
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
  category: string;
  MenuParameters: {
    name: string;
    options: {
      name: string;
      price: number;
    }[];
  }[];
};

export type OrderData = {
  userId: number;
  restaurantId: number;
  actualTotal: number;
  discount: number;
  discountTotal: number;
  restaurantEarning: number;
  platformFee: number;
  items: {
    id: number;
    name: string;
    price: number;
    extraParams: string[];
    quantity: number;
  }[];
};

export type CartItemType = {
  id: number;
  identifier: string;
  name: string;
  actualPrice: number;
  priceAfterDiscount: number;
  image: string;
  extraParams?: string[];
  quantity: number;
};

export type Cart = {
  items: CartItemType[];
  rating: number;
  restaurantId: null | number;
  discount: number;
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

export type User = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
};
export type OrderType = {
  id: number;
  actualTotal: number;
  discountTotal: number;
  restaurantEarning: number;
  platformFee: number;
  created_at: string;
  rating: 0;
  discount: number;
  status: string;
  OrderItems: OrderItemType[];
  Users: UserType;
  Restaurants: Restaurant;
};

export type OrderItemType = {
  extraParams: null | string[];
  Menu: MenuItem;
  quantity: number;
  actualCurrentPrice: number;
};

export type UserType = {
  name: string;
  phoneNumber: string;
};
