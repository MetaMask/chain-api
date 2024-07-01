import type { Infer } from '@metamask/superstruct';

import type { CaipAssetType } from './caip-types';
import { definePattern } from './superstruct';

export const StringNumberStruct = definePattern(
  'StringNumber',
  /^[0-9]+(\.[0-9]+)?$/u,
);
export type StringNumber = Infer<typeof StringNumberStruct>;

/**
 * Result object for assets balances.
 */
export type BalancesResult = {
  balances: Record<string, Record<CaipAssetType, { amount: StringNumber }>>;
};
