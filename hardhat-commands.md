
## initial hardhat setup

```sh
npm install --save-dev hardhat
npx hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
nvm use 24
npx hardhat --init
npx hardhat compile
mkdir -p ignition/modules/
touch ignition/modules/Voting.ts
npx hardhat ignition deploy ignition/modules/Voting.ts --network localhost
```

## Steps for local setup

### open a new terminal
- keep this process alive

```sh
npx hardhat node
```

👉 Open console in new terminal:

```sh
npx hardhat console --network localhost
```

👉 Run this in that console:

```sh
const { ethers } = await import("ethers");
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = await provider.getSigner(0);
const artifact = await hre.artifacts.readArtifact("Voting");
const contract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  artifact.abi,
  signer
);
await contract.addCandidate("Alice", "Delhi");
await contract.addCandidate("Bob", "Delhi");
await contract.addCandidate("Charlie", "Karnataka");
```

## Important step: Add the localhost network to MetaMask

Network Name: Hardhat Localhost
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
Block Explorer: (leave empty)

👉 Then click Save / Add Network


## Result
Vote Recorded Successfully
Your Receipt ID:

0x7374c696849185ee6c2f90b6edd047dc5671e6de6c55b5016a4fa072154479cd
Use this receipt to verify your vote later.

