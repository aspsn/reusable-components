export const formatNumber = (number: any, decimalDigits: number = 4) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalDigits,
  }).format(number);
};
