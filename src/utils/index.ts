export const getFormatedDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString();
}

export const getUniqId = (): number => {
  return Date.now();
}
