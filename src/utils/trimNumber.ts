export const trimNumber = (value: string) => {
  const v = value
    .replace(/[^\dA-Z]/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
  return v;
};
