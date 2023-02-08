import { Bech32Address } from '@keplr-wallet/cosmos';
import config from 'src/config';
import networks, { NetworkKey } from './networks';
/**
 * A list of Cosmos chain infos. If we need to add / remove any chains, just directly update this variable.
 */

// temporary. When use OWallet => no need to suggest chain
export const embedChainInfos = [
    {
        rpc: networks[NetworkKey.MAINNET].rpc,
        rest: networks[NetworkKey.MAINNET].lcd,
        chainId: 'Oraichain',
        chainName: 'Oraichain',
        stakeCurrency: {
            coinDenom: 'ORAI',
            coinMinimalDenom: 'orai',
            coinDecimals: 6,
            coinGeckoId: 'oraichain-token',
            coinImageUrl:
                'https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png'
        },
        bip44: {
            coinType: 118
        },
        bech32Config: Bech32Address.defaultBech32Config('orai'),
        get currencies() {
            return [
                this.stakeCurrency,
                {
                    coinDenom: 'AIRI',
                    coinMinimalDenom:
                        'cw20:orai10ldgzued6zjp0mkqwsv2mux3ml50l97c74x8sg:aiRight Token',
                    coinDecimals: 6,
                    coinGeckoId: 'airight',
                    coinImageUrl:
                        'https://s2.coinmarketcap.com/static/img/coins/64x64/11563.png'
                }
            ];
        },
        get feeCurrencies() {
            return [this.stakeCurrency];
        },
        walletUrlForStaking: "https://scan.orai.io/validators",
        gasPriceStep: {
            low: 0.003,
            average: 0.005,
            high: 0.007
        },
        features: ['stargate', 'no-legacy-stdTx', 'ibc-transfer', 'cosmwasm', 'wasmd_0.24+']
    },
    {
        rpc: networks[NetworkKey.TESTNET].rpc,
        rest: networks[NetworkKey.TESTNET].lcd,
        chainId: 'Oraichain-testnet',
        chainName: 'Oraichain Testnet',
        stakeCurrency: {
            coinDenom: 'ORAI',
            coinMinimalDenom: 'orai',
            coinDecimals: 6,
            coinGeckoId: 'oraichain-token',
            coinImageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png',
        },
        bip44: {
            coinType: 118
        },
        bech32Config: Bech32Address.defaultBech32Config('orai'),
        get currencies() {
            return [
                this.stakeCurrency,
                {
                    coinDenom: 'AIRI',
                    coinMinimalDenom:
                        'cw20:orai1gwe4q8gme54wdk0gcrtsh4ykwvd7l9n3dxxas2:aiRight Token',
                    coinDecimals: 6,
                    coinGeckoId: 'airight',
                    coinImageUrl:
                        'https://s2.coinmarketcap.com/static/img/coins/64x64/11563.png'
                }
            ];
        },
        get feeCurrencies() {
            return [this.stakeCurrency];
        },
        walletUrlForStaking: "https://testnet.scan.orai.io/validators",
        gasPriceStep: {
            low: 0,
            average: 0.000025,
            high: 0.00004
        },
        features: ['stargate', 'no-legacy-stdTx', 'ibc-transfer', 'cosmwasm', 'wasmd_0.24+']
    }
];