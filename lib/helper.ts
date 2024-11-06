export function priceWithDiscount(price: number, discount: number) {
  const discountedPrice = Math.ceil(price - (price * discount) / 100);
  return discountedPrice;
}
