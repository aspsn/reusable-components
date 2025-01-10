export const formatNumber = (
  number: number | bigint,
  decimalDigits: number = 4
) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalDigits,
  }).format(number);
};
