import hre from "hardhat";

async function main() {
  const ethers = (hre as any).ethers;

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  console.log("Contract deployed to:", await voting.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});