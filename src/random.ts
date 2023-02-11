
export enum Characters {
  /**
   * Contains all ASCII characters a to z (lowercase)
   */
  ALPHA = 'abcdefghijklmnopqrstuvwxyz',
  /**
   * Contains all ASCII characters a to z, and 0 to 9 (lowercase)
   */
  ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyz0123456789',
  /**
   * Contains all ASCII characters 0 to 9
   */
  NUMERIC = '1234567890',
  /**
   * Includes all ASCII characters used to repsesent hexadecimal
   * values; 0 to 9 and a to f (lowercase). Letters are repeated
   * to emulate random bytes
   */
  HEX = '0123456789abcdefabcdef',
  /**
   * Contains all ALPHANUMERIC characters except those that can be confused
   * with other letters or numbers, useful for human identification (uppercase)
   */
  LICENCE_PLATE = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
  /**
   * Contains all ALPHAN characters except those that can be confused
   * with other letters or numbers, useful for human identification (uppercase)
   */
  LICENCE_PLATE_ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  /**
   * Contains all NUMERIC characters except those that can be confused
   * with other letters or numbers, useful for human identification
   */
  LICENCE_PLATE_NUMERIC = '23456789',
}

export interface IRandomString {
  nextString(): string
}

/**
 * Influence the case of resultant string generation
 * * `upper` - ensure all uppercase characters
 * * `lower` - ensure all lowercase characters
 * * `mixed` - randomly apply lowercase or uppercase
 * @type
 */
export type CaseStragegy = 'upper' | 'lower' | 'mixed'

export namespace Random {

  /**
   * Generate a random string from a pre-defined set of characters
   *
   * @export
   * @param {number} length the length constraint for each generated string
   * @param {string} chars a string containing all characters to include
   * @param {CaseStragegy} caseStrategy optional case-transform operation to perform
   * @return {*}  {RandomString}
   */
  export function fromChars(length: number, chars: string, caseStrategy?: CaseStragegy): RandomString {
    return new RandomString(length, chars, caseStrategy)
  }

  /**
   * Compose a string randomizer using independent string randomizer segments,
   * with optional static string values as separators
   *
   * @export
   * @param {(string[] | RandomString[])} components
   * @return {*}  {RandomStringComposition}
   */
  export function compose(components: (string | IRandomString)[]): RandomStringComposition {
    return new RandomStringComposition(components)
  }

  /**
   * Generate a random string composed of hexadecimal characters
   *
   * @export
   * @param {number} length the length constraint for each generated string
   * @param {CaseStragegy} caseStrategy optional case-transform operation to perform
   * @return {*}  {RandomString}
   */
  export function hexChars(length: number, caseStrategy?: CaseStragegy): RandomString {
    return new RandomHexString(length, caseStrategy)
  }

  /**
   * Generates a random integer value from Number.MIN_SAFE_INTEGER (inclusive)
   * to Number.MAX_SAFE_INTEGER (inclusive)
   *
   * @export
   * @return {*}  {RandomInt}
   */
  export function int(): RandomInt
  /**
   * Genearates a random integer value between the provided min (inclusive)
   * and max (inclusive) values
   *
   * @export
   * @param {number} min
   * @param {number} max
   * @return {*}  {RandomInt}
   */
  export function int(min: number, max: number): RandomInt
  /**
   * Generates a random integer value between 0 and the provided max (inclusive) value
   *
   * @export
   * @param {number} max
   * @return {*}  {RandomInt}
   */
  export function int(max: number): RandomInt
  export function int(): RandomInt {
    if (!arguments.length)
      return new RandomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    if (arguments.length == 1)
      return new RandomInt(0, arguments[0])
    if (arguments.length == 2)
      return new RandomInt(arguments[0], arguments[1])
    throw new Error('Invalid argument length. Requires 0, 1 or 2 numbers to be passed.')
  }

  /**
   * Generates a random value that conforms to a signed
   * 8-bit value (-128 to 127)
   *
   * @export
   * @return {*}  {RandomInt}
   */
  export function int8(): RandomInt {
    return new RandomInt(-128, 127)
  }

  /**
   * Generates a random value that conforms to a signed
   * 16-bit value (-32768 to 32767)
   *
   * @export
   * @return {*}  {RandomInt}
   */
  export function int16(): RandomInt {
    return new RandomInt(-32768, 32767)
  }

  /**
   * Generates a random value that conforms to a signed
   * 32-bit value (-2147483648 to 2147483647)
   *
   * @export
   * @return {*}  {RandomInt}
   */
  export function int32(): RandomInt {
    return new RandomInt(-2147483648, 2147483647)
  }

  /**
   * Generates a random value that conforms to an unsigned
   * 8-bit value (0 to 255)
   *
   * @export
   * @return {*}  {RandomInt}
   */
  export function uint8(): RandomInt {
    return new RandomInt(0, 255)
  }

  /**
   * Generates a random value that conforms to an unsigned
   * 16-bit value (0 to 65535)
   *
   * @export
   * @return {*}  {RandomInt}
   */
  export function uint16(): RandomInt {
    return new RandomInt(0, 65535)
  }

  /**
   * Generates a random value that conforms to an unsigned
   * 32-bit value (0 to 4294967295)
   *
   * @export
   * @return {*}  {RandomInt}
   */
  export function uint32(): RandomInt {
    return new RandomInt(0, 4294967295)
  }
}

export class RandomStringComposition implements IRandomString {
  constructor(
    private readonly components: (string | IRandomString)[]) { }

  /**
   * Generates a new composed random string value
   *
   * @return {*}  {string}
   * @memberof RandomComposition
   */
  nextString(): string {
    return this.components.map(item => {
      return item instanceof RandomString
        ? item.nextString()
        : item
    }).join('')
  }
}

export class RandomString implements IRandomString {
  constructor(
    protected readonly length: number,
    protected readonly seed: string,
    protected readonly caseStrategy: CaseStragegy) { }

  /**
   * Generates a new randomized string value
   *
   * @return {*}  {string}
   * @memberof RandomString
   */
  nextString(): string {
    return [...Array(this.length)]
      .map(() => this.nextChar())
      .join('')
  }

  /**
   * Generates a single character
   *
   * @private
   * @return {*}  {string}
   * @memberof RandomString
   */
  private nextChar(): string {
    const value = this.seed[Math.floor(Math.random() * this.seed.length)]
    switch (this.caseStrategy) {
      case 'upper':
        return value.toUpperCase()
      case 'lower':
        return value.toLowerCase()
      case 'mixed': {
        return Math.random() < 0.5
          ? value.toUpperCase()
          : value.toLowerCase()
      }
      default:
        return value
    }
  }
}

export class RandomHexString extends RandomString {
  constructor(
    length: number,
    caseStrategy?: CaseStragegy) {
    super(length, '<not used>', caseStrategy)
  }

  nextString(): string {
    const chars: string[] = []
    const seeder = Random.uint8()
    while (chars.length < this.length) {
      seeder.nextInt().toString(16).padStart(2, '0').split('')
        .forEach(char => chars.push(char))
    }
    return this.caseStrategy == 'upper'
      ? chars.join('').toUpperCase()
      : chars.join('').toLowerCase()
  }
}


export class RandomInt {
  constructor(
    private readonly min: number,
    private readonly max: number) { }

  /**
   * Generates a new random integer value
   *
   * @return {*}  {number}
   * @memberof RandomInt
   */
  nextInt(): number {
    const min = Math.ceil(this.min)
    const max = Math.floor(this.max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
