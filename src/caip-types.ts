import type { Infer } from '@metamask/superstruct';
import { is, string, pattern } from '@metamask/superstruct';

export const CAIP_ASSET_TYPE_REGEX =
  /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})$/u;

export const CAIP_ASSET_ID_REGEX =
  /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})\/(?<tokenId>[-.%a-zA-Z0-9]{1,78})$/u;

export const CAIP_ASSET_TYPE_OR_ID_REGEX =
  /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})(\/(?<tokenId>[-.%a-zA-Z0-9]{1,78}))?$/u;

/**
 * A CAIP-19 asset type identifier, i.e., a human-readable type of asset type identifier.
 */
export const CaipAssetTypeStruct = pattern(string(), CAIP_ASSET_TYPE_REGEX);
export type CaipAssetType = Infer<typeof CaipAssetTypeStruct>;

/**
 * A CAIP-19 asset ID identifier, i.e., a human-readable type of asset ID identifier.
 */
export const CaipAssetIdStruct = pattern(string(), CAIP_ASSET_ID_REGEX);
export type CaipAssetId = Infer<typeof CaipAssetIdStruct>;

/**
 * A CAIP-19 asset type or asset ID identifier, i.e., a human-readable type of asset identifier.
 */
export const CaipAssetTypeOrIdStruct = pattern(
  string(),
  CAIP_ASSET_TYPE_OR_ID_REGEX,
);
export type CaipAssetTypeOrId = Infer<typeof CaipAssetTypeOrIdStruct>;

/**
 * Check if the given value is a {@link CaipAssetType}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAssetType}.
 */
export function isCaipAssetType(value: unknown): value is CaipAssetType {
  return is(value, CaipAssetTypeStruct);
}

/**
 * Check if the given value is a {@link CaipAssetId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAssetId}.
 */
export function isCaipAssetId(value: unknown): value is CaipAssetId {
  return is(value, CaipAssetIdStruct);
}

/**
 * Check if the given value is a {@link CaipAssetTypeOrId}.
 *
 * @param value - The value to check.
 * @returns Whether the value is a {@link CaipAssetTypeOrId}.
 */
export function isCaipAssetTypeOrId(value: unknown): value is CaipAssetId {
  return is(value, CaipAssetTypeOrIdStruct);
}
