import type { Infer } from '@metamask/superstruct';
import {
  record,
  array,
  union,
  string,
  number,
  object,
  literal,
} from '@metamask/superstruct';
import { CaipChainIdStruct } from '@metamask/utils';

import { CaipAssetTypeOrIdStruct } from './caip-types';
import { StringNumberStruct } from './types';

export const AmountStruct = object({
  amount: StringNumberStruct,
});

const CommonHeader = {
  jsonrpc: literal('2.0'),
  id: union([string(), number(), literal(null)]),
};

// ----------------------------------------------------------------------------
// Get balances

export const GetBalancesRequestStruct = object({
  ...CommonHeader,
  method: literal('chain_getBalances'),
  params: object({
    scope: CaipChainIdStruct,
    accounts: array(string()),
    assets: array(CaipAssetTypeOrIdStruct),
  }),
});

export type GetBalancesRequest = Infer<typeof GetBalancesRequestStruct>;

export const GetBalancesResponseStruct = object({
  balances: record(string(), record(CaipAssetTypeOrIdStruct, AmountStruct)),
});

export type GetBalancesResponse = Infer<typeof GetBalancesResponseStruct>;
