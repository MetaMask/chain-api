import type { Struct } from '@metamask/superstruct';
import { define } from '@metamask/superstruct';

/**
 * Defines a new string-struct matching a regular expression.
 *
 * Example:
 *
 * ```ts
 * const EthAddressStruct = definePattern('EthAddress', /^0x[0-9a-f]{40}$/iu);
 * ```
 *
 * @param name - Type name.
 * @param pattern - Regular expression to match.
 * @returns A new string-struct that matches the given pattern.
 */
export function definePattern(
  name: string,
  pattern: RegExp,
): Struct<string, null> {
  return define<string>(
    name,
    (value: unknown): boolean =>
      typeof value === 'string' && pattern.test(value),
  );
}
