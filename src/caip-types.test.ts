import {
  isCaipAssetType,
  isCaipAssetId,
  isCaipAssetTypeOrId,
} from './caip-types';

// Imported from: https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-19.md#test-cases
const good = {
  assetTypes: [
    'eip155:1/slip44:60',
    'bip122:000000000019d6689c085ae165831e93/slip44:0',
    'cosmos:cosmoshub-3/slip44:118',
    'bip122:12a765e31ffd4059bada1e25190f6e98/slip44:2',
    'cosmos:Binance-Chain-Tigris/slip44:714',
    'cosmos:iov-mainnet/slip44:234',
    'lip9:9ee11e9df416b18b/slip44:134',
    'eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f',
    'eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  ],
  assetIds: [
    'eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/771769',
    'hedera:mainnet/nft:0.0.55492/12',
  ],
};

const badAssets = [
  true,
  false,
  null,
  undefined,
  1,
  {},
  [],
  '',
  '!@#$%^&*()',
  'foo',
  'eip155',
  'eip155:',
  'eip155:1',
  'eip155:1:',
  'eip155:1:0x0000000000000000000000000000000000000000:2',
  'bip122',
  'bip122:',
  'bip122:000000000019d6689c085ae165831e93',
  'bip122:000000000019d6689c085ae165831e93/',
  'bip122:000000000019d6689c085ae165831e93/tooooooolong',
  'bip122:000000000019d6689c085ae165831e93/tooooooolong:asset',
  'eip155:1/erc721',
  'eip155:1/erc721:',
  'eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/',
];
const bad = {
  assetTypes: badAssets,
  assetIds: [
    ...badAssets,
    'eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/tooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooolongasset',
  ],
};

const uniq = (data1: any[], data2: any[]): any[] => {
  return Array.from(new Set(data1.concat(data2)));
};

describe('isCaipAssetType', () => {
  it.each(good.assetTypes)(
    'returns true for a valid asset type %s',
    (asset) => {
      expect(isCaipAssetType(asset)).toBe(true);
    },
  );

  it.each(bad.assetTypes)(
    'returns false for an invalid asset type %s',
    (asset) => {
      expect(isCaipAssetType(asset)).toBe(false);
    },
  );
});

describe('isCaipAssetId', () => {
  it.each(good.assetIds)('returns true for a valid asset id %s', (asset) => {
    expect(isCaipAssetId(asset)).toBe(true);
  });

  it.each(bad.assetIds)('returns false for an invalid asset id %s', (asset) => {
    expect(isCaipAssetType(asset)).toBe(false);
  });
});

describe('isCaipAssetTypeOrId', () => {
  it.each(uniq(good.assetIds, good.assetTypes))(
    'returns true for a valid asset %s',
    (asset) => {
      expect(isCaipAssetTypeOrId(asset)).toBe(true);
    },
  );

  it.each(uniq(bad.assetIds, bad.assetIds))(
    'returns false for an invalid asset %s',
    (asset) => {
      expect(isCaipAssetTypeOrId(asset)).toBe(false);
    },
  );
});
