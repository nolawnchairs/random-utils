
import { Random } from '../src'

describe('Tests the random string lengths', () => {

  const random = Random.fromChars(16, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')

  it('should have proper length', () => {
    const result = random.nextString()
    expect(result.length).toBe(16)
  })
})
