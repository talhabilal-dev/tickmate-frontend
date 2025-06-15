export const calculateChange = (current: number, previous: number): string => {
  if (previous === 0) return "+100%"; // avoid division by zero
  const change = ((current - previous) / previous) * 100;
  const symbol = change >= 0 ? "+" : "";
  return `${symbol}${change.toFixed(1)}%`;
};
