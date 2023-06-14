export function ShortAddress(address: `0x${string}` | undefined) {
  if (!address) return "";
  const cut = address.slice(0, 6) + "..." + address.slice(-4);
  return cut;
}
