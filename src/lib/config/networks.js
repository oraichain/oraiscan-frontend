import { isTestnet } from "src/config";

export const NetworkKey = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet'
}

const networks = {
  [NetworkKey.MAINNET]: {
    chainId: 'Oraichain',
    prefix: 'orai',
    denom: 'orai',
    coinType: 118,
    lcd: 'https://lcd.orai.io',
    rpc: 'https://rpc.orai.io',
    id: NetworkKey.MAINNET,
    fee: { gasPrice: '0', amount: '0', gas: '2000000' }, // 0.000500 ORAI
  },
  [NetworkKey.TESTNET]: {
    chainId: 'Oraichain-testnet',
    prefix: 'orai',
    denom: 'orai',
    coinType: 118,
    lcd: 'https://testnet.lcd.orai.io',
    rpc: 'https://testnet.rpc.orai.io',
    id: NetworkKey.TESTNET,
    fee: { gasPrice: '0', amount: '0', gas: '2000000' }, // 0.050000 ORAI
  }
};

export default networks;

export const network =
  // sure have value
  isTestnet ? networks[NetworkKey.TESTNET] : networks[NetworkKey.MAINNET];

export const mobileBlacklistNetworks = [
  network.chainId
  // 'cosmoshub-4',
  // 'columbus-5'
];
