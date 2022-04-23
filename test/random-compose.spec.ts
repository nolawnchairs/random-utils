import { Characters, Random } from '../src'

describe('Tests random string composition', () => {

  it('should generate a A-000 style string', () => {
    const random = Random.compose([
      Random.fromChars(1, Characters.LICENCE_PLATE_ALPHA),
      '-',
      Random.fromChars(3, Characters.NUMERIC),
    ]).nextString()

    expect(random).toMatch(/^[A-Z]-[0-9]{3}/)
  })
})
