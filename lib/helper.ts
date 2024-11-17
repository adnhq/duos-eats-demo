export const DUOS_PERCENTAGE = 5;

export function priceWithDiscount(price: number, discount: number) {
  const discountedPrice = Math.ceil(price - (price * discount) / 100);
  return discountedPrice;
}

export function calcPlatformFee(price: number) {
  return Math.ceil((price * DUOS_PERCENTAGE) / 100);
}

export function priceWithVat(price: number, vat: number) {
  return Math.ceil(price + (price * vat) / 100);
}

export function vatExtraPrice(price: number, vat: number) {
  return Math.ceil((price * vat) / 100);
}
