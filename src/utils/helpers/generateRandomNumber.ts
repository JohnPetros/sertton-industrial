export function generateRandomNumber() {
  const min = Math.pow(10, 14) // Min: 100000000000000
  const max = Math.pow(10, 15) - 1 // Max: 999999999999999
  return Math.floor(Math.random() * (max - min + 1)) + min
}
