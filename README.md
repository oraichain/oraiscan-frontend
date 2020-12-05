
<h2 align="center">    
  Oraiscan Explorer's Frontend     
</h2>

*:star: Based on [Mintscan by Cosmostation](https://github.com/cosmostation/mintscan-binance-dex-frontend)*

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
``` js
import "./firebase"
```
4. Specify URL of your backend
```shell
export REACT_APP_API_DEV=http://localhost:5000/v1
export REACT_APP_API_PROD=
```
5. Dev it or build it
```shell    
yarn dev  
yarn build:dev  
```    

## Deploy with Docker

## License    
Released under the [Apache 2.0 License](https://github.com/oraichain/oraiscan-frontend/LICENSE).
