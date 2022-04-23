// Generated by dts-bundle-generator v5.9.0

declare class RandomInt {
	private readonly min;
	private readonly max;
	constructor(min: number, max: number);
	/**
	 * Generates a new random integer value
	 *
	 * @return {*}  {number}
	 * @memberof RandomInt
	 */
	nextInt(): number;
}
export declare enum Characters {
	/**
	 * Contains all ASCII characters a to z (lowercase)
	 */
	ALPHA = "abcdefghijklmnopqrstuvwxyz",
	/**
	 * Contains all ASCII characters a to z, and 0 to 9 (lowercase)
	 */
	ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789",
	/**
	 * Contains all ASCII characters 0 to 9
	 */
	NUMERIC = "1234567890",
	/**
	 * Includes all ASCII characters used to repsesent hexadecimal
	 * values; 0 to 9 and a to f (lowercase). Letters are repeated
	 * to emulate random bytes
	 */
	HEX = "0123456789abcdefabcdef",
	/**
	 * Contains all ALPHANUMERIC characters except those that can be confused
	 * with other letters or numbers, useful for human identification (uppercase)
	 */
	LICENCE_PLATE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
	/**
	 * Contains all ALPHAN characters except those that can be confused
	 * with other letters or numbers, useful for human identification (uppercase)
	 */
	LICENCE_PLATE_ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ",
	/**
	 * Contains all NUMERIC characters except those that can be confused
	 * with other letters or numbers, useful for human identification
	 */
	LICENCE_PLATE_NUMERIC = "23456789"
}
export declare namespace Random {
	/**
	 * Generate a random string from a pre-defined set of characters
	 *
	 * @export
	 * @param {number} length the length constraint for each generated string
	 * @param {string} chars a string containing all characters to include
	 * @param {CaseStragegy} caseStrategy optional case-transform operation to perform
	 * @return {*}  {IRandomString}
	 */
	function fromChars(length: number, chars: string, caseStrategy?: CaseStragegy): IRandomString;
	/**
	 * Compose a string randomizer using independent string randomizer segments,
	 * with optional static string values as separators
	 *
	 * @export
	 * @param {(string[] | RandomString[])} components
	 * @return {*}  {IRandomString}
	 */
	function compose(components: (string | IRandomString)[]): IRandomString;
	/**
	 * Generate a random string composed of hexadecimal characters
	 *
	 * @export
	 * @param {number} length the length constraint for each generated string
	 * @param {CaseStragegy} caseStrategy optional case-transform operation to perform
	 * @return {*}  {IRandomString}
	 */
	function hexChars(length: number, caseStrategy?: CaseStragegy): IRandomString;
	/**
	 * Generates a random integer value from Number.MIN_SAFE_INTEGER (inclusive)
	 * to Number.MAX_SAFE_INTEGER (inclusive)
	 *
	 * @export
	 * @return {*}  {RandomInt}
	 */
	function int(): RandomInt;
	/**
	 * Genearates a random integer value between the provided min (inclusive)
	 * and max (inclusive) values
	 *
	 * @export
	 * @param {number} min
	 * @param {number} max
	 * @return {*}  {RandomInt}
	 */
	function int(min: number, max: number): RandomInt;
	/**
	 * Generates a random integer value between 0 and the provided max (inclusive) value
	 *
	 * @export
	 * @param {number} max
	 * @return {*}  {RandomInt}
	 */
	function int(max: number): RandomInt;
	/**
	 * Generates a random value that conforms to a signed
	 * 8-bit value (-128 to 127)
	 *
	 * @export
	 * @return {*}  {RandomInt}
	 */
	function int8(): RandomInt;
	/**
	 * Generates a random value that conforms to a signed
	 * 16-bit value (-32768 to 32767)
	 *
	 * @export
	 * @return {*}  {RandomInt}
	 */
	function int16(): RandomInt;
	/**
	 * Generates a random value that conforms to a signed
	 * 32-bit value (-2147483648 to 2147483647)
	 *
	 * @export
	 * @return {*}  {RandomInt}
	 */
	function int32(): RandomInt;
	/**
	 * Generates a random value that conforms to an unsigned
	 * 8-bit value (0 to 255)
	 *
	 * @export
	 * @return {*}  {RandomInt}
	 */
	function uint8(): RandomInt;
	/**
	 * Generates a random value that conforms to an unsigned
	 * 16-bit value (0 to 65535)
	 *
	 * @export
	 * @return {*}  {RandomInt}
	 */
	function uint16(): RandomInt;
	/**
	 * Generates a random value that conforms to an unsigned
	 * 32-bit value (0 to 4294967295)
	 *
	 * @export
	 * @return {*}  {RandomInt}
	 */
	function uint32(): RandomInt;
}
/**
 * Influence the case of resultant string generation
 * * `upper` - ensure all uppercase characters
 * * `lower` - ensure all lowercase characters
 * * `mixed` - randomly apply lowercase or uppercase
 * @type
 */
export declare type CaseStragegy = "upper" | "lower" | "mixed";
export interface IRandomString {
	nextString(): string;
}

export as namespace MyModuleName;

export {};
