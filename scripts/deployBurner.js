// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
	const name = "Dummy";
	const symbol = "Dummy";
	const pid = 15;
	const Burner = await hre.ethers.getContractFactory("EmissionKiller");
	const burner = await Burner.deploy(name, symbol, pid);

	await burner.deployed();

	await run("verify:verify", {
		address: burner.address,
		constructorArguments: [name, symbol, pid],
	});

	console.log("Burner deployed to:", burner.address); //
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
