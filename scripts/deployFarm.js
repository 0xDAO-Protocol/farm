// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
	const Farm = await hre.ethers.getContractFactory("MasterChef");
	const oxd = "0xB40C1882fA3cDf3c0D26Ae688a7bA306845f07b0";
	const devAddr = "0x8881AcF21D569ec8182441eD381ff1945BFeC5E5";
	const ohexPerSecond = "1000000000000000000";
	const startTime = 1642556223;
	const endTime = 1642567023;
	const farm = await Farm.deploy(oxd, devAddr, ohexPerSecond, startTime, endTime);

	await farm.deployed();

	console.log("Farm deployed to:", farm.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
