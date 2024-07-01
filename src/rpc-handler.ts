import { assert } from '@metamask/superstruct';
import { JsonRpcRequestStruct } from '@metamask/utils';
import type { Json, JsonRpcRequest, CaipChainId } from '@metamask/utils';

import type { Chain } from './api';
import { GetBalancesRequestStruct } from './rpc-types';

/**
 * Chain RPC methods.
 */
export enum ChainRpcMethod {
  GetBalances = 'chain_getBalances',
}

/**
 * Error thrown when a keyring JSON-RPC method is not supported.
 */
export declare class MethodNotSupportedError extends Error {
  constructor(method: string);
}

/**
 * Handles a chain JSON-RPC request.
 *
 * @param chain - Chain instance.
 * @param request - Chain JSON-RPC request.
 * @returns A promise that resolves to the chain's method response.
 */
export async function handleChainRequest(
  chain: Chain,
  request: JsonRpcRequest,
): Promise<Json | void> {
  // We first have to make sure that the request is a valid JSON-RPC request so
  // we can check its method name.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  assert(request, JsonRpcRequestStruct);

  switch (request.method) {
    case ChainRpcMethod.GetBalances: {
      assert(request, GetBalancesRequestStruct);

      return chain.getBalances(
        request.params.scope as CaipChainId,
        request.params.accounts,
        request.params.assets,
      );
    }

    default:
      throw new MethodNotSupportedError(request.method);
  }
}

/**
 * Check if a method is a chain RPC method.
 *
 * @param method - Method to check.
 * @returns Whether the method is a chain RPC method.
 */
export function isChainRpcMethod(method: string): boolean {
  return Object.values(ChainRpcMethod).includes(method as ChainRpcMethod);
}
