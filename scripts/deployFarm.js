// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
	const Farm = await hre.ethers.getContractFactory("MasterChef");
	const oxd = "0x21898c6F3149FCFEd4Bc6248d5aA6AB1807012CE";
	const devAddr = "";
	const ohexPerSecond = "";
	const startTime = 0;
	const endTime = 0;
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
