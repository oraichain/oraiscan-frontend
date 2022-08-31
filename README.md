<h2 align="center">
  Oraiscan Explorer's Frontend
</h2>

_:star: Based on [Mintscan by Cosmostation](https://github.com/cosmostation/mintscan-binance-dex-frontend)_
# Oraichain

![Banner!](https://cdn.discordapp.com/attachments/1014117272132010017/1014117366407381073/Full_Logo_Horizontal_BG-white.png)

## Overview

This repository provides frontend code for Oraiscan Block Explorer for Oraichain.

## Prerequisite

- A working backend described [here](https://github.com/oraichain/oraiscan-backend)
- NodeJS 10+

## Install

1. Git clone this repo to desired directory

```shell
git clone https://github.com/oraichain/oraiscan-frontend.git
```

2. Install required packages

```shell
yarn install
```

3. Create a `firebase.js` in `src/` with your firebase settings, or comment out the following line in `src/Root.js`

```js
import "./firebase";
```

4. Specify URL of your backend

```shell
export REACT_APP_API_PROD=http://localhost:5000/v1
```

5. Specify version of orai wallet in .env file

```shell
REACT_APP_WALLET_VERSION=2
```

6. Dev it or build it

```shell
yarn dev
yarn build:dev
```

## Deploy with Firebase

```bash
firebase use oraichain-mainnet
firebase target:apply hosting oraiscan oraiscan
firebase deploy --only hosting:oraiscan
```

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

Released under the [Apache 2.0 License](LICENSE).
