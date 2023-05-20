export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(price);
};
