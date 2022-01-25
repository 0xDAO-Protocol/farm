// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const tokenName = "Emission Killer";
  const tokenSymbol = "KILL";
  const pid = 16;

	const Killer = await hre.ethers.getContractFactory("EmissionKiller");
	const killer = await Killer.deploy(tokenName, tokenSymbol, pid);

	await farm.deployed();

	console.log("Killer deployed to:", killer.address);

	await run("verify:verify", {
		address: killer.address,
		constructorArguments: [oxd, ohexPerSecond, pid],
	})

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
