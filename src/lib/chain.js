import { makeObservable  } from 'mobx';

import { ChainStore as BaseChainStore } from '@keplr-wallet/stores';

export class ChainStore extends BaseChainStore {
    /**
     * Constructor of the ChainStore class. By default, we choose the first chain info in the list of chain infos.
     * @param embedChainInfos - a list of Cosmos chains info.
     */
    constructor(embedChainInfos) {
        // get chains from local storage first. If empty then set it. If not then use it instead of default
        let chains = localStorage.getItem('chain-infos');
        if (!chains) {
            chains = embedChainInfos;
            // store chain into local storage
            localStorage.setItem('chain-infos', JSON.stringify(embedChainInfos));
        } else {
            // parse the local storage data cuz when we store we have stringtified it
            chains = JSON.parse(chains);
        }
        // @ts-ignore
        super(chains);
        // @ts-ignore
        this.chainId = chains[0].chainId;
        this.current = this.current.bind(this);
        makeObservable(this);
    }

    current() {
        if (this.hasChain(this.chainId)) {
            return this.getChain(this.chainId).raw;
        }
        throw new Error(`chain id not set`);
    }

    currentFluent() {
        if (this.hasChain(this.chainId)) {
            return this.getChain(this.chainId);
        }

        throw new Error('chain id not set');
    }

    /**
     * Update chain id and other relevant info for cosmosjs & chain info
     * @param chainName 
     */

    setChain(chainName) {
        let chainId = this.getChainId(chainName);
        console.log("chain id: ", chainId)
        this.setChainId(chainId);
    }

    addChain(chainInfo) {
        // the new chain info must have a different chain id & chain name
        let chainInfos = this.getChainInfosRaw();
        let isTheSameInfo = chainInfos.filter(info => info.chainId === chainInfo.chainId || info.chainName === chainInfo.chainName);
        if (isTheSameInfo.length > 0) {
            throw "This chain is already included. Cannot add in the list";
        }
        chainInfos.push(chainInfo);
        this.setChainInfos(chainInfos);
        // also update in local storage
        localStorage.setItem('chain-infos', JSON.stringify(chainInfos));
    }

    removeChain(chainId) {
        // the new chain info must have a different chain id & chain name
        let chain = this.getChain(chainId);
        if (!chain) {
            throw "This chain is not in the list. Cannot remove";
        }
        let chainInfos = this.getChainInfosRaw();
        chainInfos = chainInfos.filter(info => info.chainId !== chainId);
        this.setChainInfos(chainInfos);
        // also update in local storage
        localStorage.setItem('chain-infos', JSON.stringify(chainInfos));
    }
    getChainId(chainName) {
        if (chainName) {
            let chainInfo = this.chainInfos.find(info => info.chainName === chainName);
            if (chainInfo) return chainInfo.chainId;
            throw new Error(`Chain id not found from chain name: ${chainName}`);
        }
        throw new Error("Invalid chain name");
    }
    getChainInfosRaw() {
        let chainInfos = [];
        for (let chainInfo of this.chainInfos) {
            chainInfos.push(chainInfo.raw);
        }
        return chainInfos;
    }

    setChainId(chainId) {
        if (chainId) {
            this.chainId = chainId;
        }
    }

}