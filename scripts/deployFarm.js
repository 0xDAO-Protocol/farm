// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
	const Farm = await hre.ethers.getContractFactory("MasterChef");
	const oxd = "0xc165d941481e68696f43EE6E99BFB2B23E0E3114";
	const ohexPerSecond = "1000000000000000000000";
	const startTime = 1642795200;
	const endTime = startTime + 2000000;
	const farm = await Farm.deploy(oxd, ohexPerSecond, startTime, endTime);

	await farm.deployed();

	console.log("Farm deployed to:", farm.address);

	await run("verify:verify", {
		address: farm.address,
		constructorArguments: [oxd, ohexPerSecond, startTime, endTime],
	})

	const pool2 = ["0xD5fa400a24EB2EA55BC5Bd29c989E70fbC626FfF", 0];
	const wftm = ["0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", 500];
	const eth = ["0x74b23882a30290451A17c44f4F05243b6b58C76d", 500];
	const btc = ["0x321162Cd933E2Be498Cd2267a90534A804051b11", 500];
	const usdc = ["0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", 500];
	const dai = ["0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E", 450];
	const mim = ["0x82f0B8B456c1A451378467398982d4834b6829c1", 500];
	const xboo = ["0xa48d959AE2E88f1dAA7D5F611E01908106dE7598", 245];
	const xscream = ["0xe3D17C7e840ec140a7A51ACA351a482231760824", 63];
	const lqdr = ["0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9", 53];
	const xtarot = ["0x74D1D2A851e339B8cB953716445Be7E8aBdf92F4", 23];
	const xcredit = ["0xd9e28749e80D867d5d14217416BFf0e668C10645", 19];
	const tomb = ["0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7", 100];
	const fbeets = ["0xfcef8a994209d6916EB2C86cDD2AFD60Aa6F54b1", 15];

	const pairs = [
		pool2,
		wftm,
		eth,
		btc,
		usdc,
		dai,
		mim,
		xboo,
		xscream,
		lqdr,
		xtarot,
		xcredit,
		tomb,
		fbeets,
	];
	let tx;
	for (let i = 0; i < pairs.length; i++) {
		tx = await farm.add(pairs[i][1], pairs[i][0]);
		await tx.wait(7);
		console.log(`Added pair for ${pairs[i][0]}`);
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
