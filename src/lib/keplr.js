import { isAndroid, isMobile } from '@walletconnect/browser-utils';
import { mobileBlacklistNetworks, network } from 'src/lib/config/networks';
import { embedChainInfos } from 'src/lib/config/chainInfos';
import WalletConnect from '@walletconnect/client';
import { KeplrWalletConnectV1 } from '@keplr-wallet/wc-client';
import Axios from 'axios';
import { KeplrQRCodeModalV1 } from '@keplr-wallet/wc-qrcode-modal';
import { filteredTokens } from 'src/lib/config/bridgeTokens';
import createHash from 'create-hash';
import { Bech32Address } from '@keplr-wallet/cosmos';

const hash160 = (buffer) => {
  var t = createHash('sha256').update(buffer).digest();
  return createHash('rmd160').update(t).digest();
};

const sendTx = async (
  chainId,
  tx,
  mode
) => {
  const restInstance = Axios.create({
    baseURL: filteredTokens.find((token) => token.chainId === chainId).lcd
  });

  const isProtoTx = Buffer.isBuffer(tx) || tx instanceof Uint8Array;

  const params = isProtoTx
    ? {
      tx_bytes: Buffer.from(tx).toString('base64'),
      mode: (() => {
        switch (mode) {
          case 'async':
            return 'BROADCAST_MODE_ASYNC';
          case 'block':
            return 'BROADCAST_MODE_BLOCK';
          case 'sync':
            return 'BROADCAST_MODE_SYNC';
          default:
            return 'BROADCAST_MODE_UNSPECIFIED';
        }
      })()
    }
    : {
      tx,
      mode: mode
    };

  const result = await restInstance.post(
    isProtoTx ? ' /cosmos/tx/v1beta1/txs' : '/txs',
    params
  );

  const txResponse = isProtoTx ? result.data['tx_response'] : result.data;

  if (txResponse.code != null && txResponse.code !== 0) {
    throw new Error(txResponse['raw_log']);
  }

  return Buffer.from(txResponse.txhash, 'hex');
};
export default class Keplr {
  constructor() {
    this.walletConnector = {};
  }

  suggestChain = async (chainId) => {
    if (!window.keplr) return;
    const chainInfo = embedChainInfos.find(
      (chainInfo) => chainInfo.chainId === chainId
    );
    if (!isMobile()) {
      if (chainInfo) {
        await window.keplr.experimentalSuggestChain(chainInfo);
      }
      await window.keplr.enable(chainId);
    } else if (!mobileBlacklistNetworks.includes(chainId)) {
      await window.keplr.enable(chainId);
    }
  };

  onWalletConnectDisconnected = (error) => {
    if (error) {
      console.log(error);
    } else {
      this.disconnect();
    }
  };

  /**
   * Disconnect the wallet regardless of wallet type (extension, wallet connect)
   */
  disconnect() {
    if (this.walletConnector) {
      if (this.walletConnector.connected) {
        this.walletConnector.killSession();
      }
      this.walletConnector = undefined;
    }
  }

  async getMobileKeplr() {
    if (!this.walletConnector) {
      this.walletConnector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        storageId: 'keplr',
        signingMethods: [],
        qrcodeModal: new KeplrQRCodeModalV1()
      });
      // this.walletConnector._clientMeta = {
      //   name: 'Oraichain',
      //   description: 'Oraichain is the first IBC-native Cosmos interchain AMM',
      //   url: 'https://oraidex.io',
      //   icons: ['https://dhj8dql1kzq2v.cloudfront.net/keplr-256x256.png']
      // };
      this.walletConnector.on('disconnect', this.onWalletConnectDisconnected);
    }

    // console.log(this.walletConnector);
    if (!this.walletConnector.connected) {
      try {
        await this.walletConnector.connect();
      } catch (e) {
        console.log(e);
        return undefined;
      }
    }

    // @ts-ignore
    return new KeplrWalletConnectV1(this.walletConnector, {
      sendTx,
      onBeforeSendRequest: this.cnBeforeSendRequest   //onBeforeSendRequest
    });
  }

  cnBeforeSendRequest = (request) => {
    if (!isMobile()) {
      return;
    }

    const deepLink = isAndroid()
      ? 'intent://wcV1#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;'
      : 'keplrwallet://wcV1';

    switch (request.method) {
      case 'keplr_enable_wallet_connect_v1':
        if (
          request.params &&
          request.params.length === 1 &&
          request.params[0] === network.chainId
        ) {
          break;
        }
        window.location.href = deepLink;
        break;
      case 'keplr_sign_amino_wallet_connect_v1':
        window.location.href = deepLink;
        break;
    }

    return;
  };

  async getKeplr() {
    if (isMobile()) {
      // @ts-ignore
      if (!window.keplr) {
        const keplr = await this.getMobileKeplr();
        // @ts-ignore
        if (keplr) window.keplr = keplr;
      }
      // @ts-ignore
      return window.keplr;
    }

    if (document.readyState === 'complete') {
      // @ts-ignore
      return window.keplr;
    }

    return new Promise((resolve) => {
      const documentStateChange = (event) => {
        if (
          event.target &&
          // @ts-ignore
          (event.target).readyState === 'complete'
        ) {
          // @ts-ignore
          resolve(window.keplr);
          document.removeEventListener('readystatechange', documentStateChange);
        }
      };

      document.addEventListener('readystatechange', documentStateChange);
    });
  }

  // @ts-ignore
  async getKeplrKey(chainId) {
    chainId = chainId ?? network.chainId;
    // chainId = "Oraichain"
    if (!chainId) return undefined;
    const keplr = await this.getKeplr();
    if (keplr) {
      return keplr.getKey(chainId);
    }
    return undefined;
  }

  async getKeplrAddr(chainId) {
    const key = await this.getKeplrKey(chainId);
    return key?.bech32Address;
  }

  async getKeplrPubKey(chainId) {
    const key = await this.getKeplrKey(chainId);
    return key?.pubKey;
  }

  async getKeplrBech32Address(
    chainId
  ) {
    const pubkey = await this.getKeplrPubKey(chainId);

    if (!pubkey) return undefined;
    const address = hash160(pubkey);
    return new Bech32Address(address);
  }
}
