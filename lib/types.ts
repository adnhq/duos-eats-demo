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
};

export type CartItem = MenuItem & {
  quantity: number;
};
