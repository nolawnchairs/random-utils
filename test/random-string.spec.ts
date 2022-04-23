
import { Characters, Random } from '../src'

describe('Tests the random string lengths', () => {

  const random = Random.fromChars(16, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')

  it('should have proper length', () => {
    const result = random.nextString()
    expect(result.length).toBe(16)
  })

  it('should produce strings from a characters constant', () => {
    const hex = Random.hexChars(32)
    const alnum = Random.fromChars(32, Characters.ALPHANUMERIC)
    expect(hex.nextString()).toMatch(/^[0-9a-f]{32}$/)
    expect(alnum.nextString()).toMatch(/^[a-z0-9]{32}$/)
  })

  it('should produce strings with specific case', () => {
    const upper = Random.fromChars(12, Characters.ALPHA, 'upper')
    const lower = Random.fromChars(12, Characters.LICENCE_PLATE_ALPHA, 'lower')
    const mixed = Random.fromChars(12, Characters.ALPHA, 'mixed')
    expect(upper.nextString()).toMatch(/^[A-Z]{12}$/)
    expect(lower.nextString()).toMatch(/^[a-z]{12}$/)
    expect(mixed.nextString()).toMatch(/^[A-Za-z]{12}$/)
  })
})
