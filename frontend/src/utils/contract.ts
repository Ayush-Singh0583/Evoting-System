import { ethers } from "ethers";
import Voting from "../../../artifacts/contracts/Voting.sol/Voting.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;

export const getContract = async () => {
  if (!(window as any).ethereum) {
    alert("Install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, Voting.abi, signer);
};