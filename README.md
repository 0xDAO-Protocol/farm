# 0xDAO Masterchef

## Setup
1. Duplicate .env.example and rename to .env and fill out vars
2. `npm i`

To deploy governance token:
* `npx hardhat run scripts/deployToken.js --network ftm`

To deploy MasterChef:
* `npx hardhat run scripts/deployFarm.js --network ftm`