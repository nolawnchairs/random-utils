
export namespace Random {

  /**
   *
   *
   * @export
   * @param {number} length the length constraint for each generated string
   * @param {string} chars a string containing all characters to include
   * @return {*}  {RandomString}
   */
  export function fromChars(length: number, chars: string): RandomString {
    return new RandomString(length, chars)
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

class RandomString {
  constructor(
    private readonly length: number,
    private readonly seed: string) { }

  /**
   * Generates a new randomized string value
   *
   * @return {*}  {string}
   * @memberof RandomString
   */
  nextString(): string {
    return [...Array(this.length)]
      .map(() => this.seed[Math.floor(Math.random() * this.seed.length)])
      .join('')
  }
}

class RandomInt {
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
