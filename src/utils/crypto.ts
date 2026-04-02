/**
 * Lightweight DJB2-inspired hashing for internal validation.
 * Optimized for runtime performance and low footprint.
 */
export const djb2 = (str: string): string => {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    // Bitwise shift and add for efficient hashing
    hash = (hash << 5) + hash + str.charCodeAt(i)
  }
  // Return hexadecimal representation (32-bit unsigned)
  return (hash >>> 0).toString(16)
}
