
import { Random } from '../src'

describe('Tests random integer generation', () => {

  it('should obey min and max values', () => {
    const random = Random.int(10, 1000)
    for (let i = 0; i < 100; i++) {
      const result = random.nextInt()
      expect(result).toBeGreaterThanOrEqual(10)
      expect(result).toBeLessThanOrEqual(1000)
    }
  })

  it('should generate a valid 8-bit (unsigned) value', () => {
    const random = Random.uint8()
    for (let i = 0; i < 100; i++) {
      const result = random.nextInt()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(255)
    }
  })

  it('should generate a valid 32-bit (signed) value', () => {
    const random = Random.int32()
    for (let i = 0; i < 100; i++) {
      const result = random.nextInt()
      expect(result).toBeGreaterThanOrEqual(-2147483648)
      expect(result).toBeLessThanOrEqual(2147483647)
    }
  })
})
