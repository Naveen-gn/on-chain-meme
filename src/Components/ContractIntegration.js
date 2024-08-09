import ABI from "./ABI.json";
import { ethers } from "ethers";
import Web3 from "web3";

// Contract addresses
const SOCIALFI_CONTRACT_CORE = "0x8b5FB0bFed7aD0a24740b7D3590Cbb1B617CDEa2";
const POLYGON_CONTRACT = "0xAc798f448c04d0B2c6924Cd954414Ef9493cEC4c";

// Function to determine the network and return the corresponding contract address
const getContractAddress = () => {
  const networkVersion = window.ethereum.networkVersion;

  switch (networkVersion) {
    case '1115': // Example Core Blockchain testnet network ID
      return SOCIALFI_CONTRACT_CORE;
    case '80001': // Example Polygon Mumbai testnet network ID
      return POLYGON_CONTRACT;
    case '80002': // Your specific network ID
      return POLYGON_CONTRACT; // Replace this with the correct contract if different
    default:
      console.error(`Unsupported network ID: ${networkVersion}`);
      throw new Error('Unsupported network');
  }
};



const isBrowser = () => typeof window !== "undefined";
const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum); 
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

export const MINTNFT = async (contractName, tokenSymbol, community, media, amount) => {
  try {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    const signer = provider.getSigner();
    const contractAddress = getContractAddress();
    const Role = new ethers.Contract(contractAddress, ABI, signer);

    try {
      const tokenId = await Role.mintNFT(contractName, tokenSymbol, community, media, amount);
      console.log('Token ID:', tokenId);
      tokenId.wait();
      return tokenId;
    } catch (error) {
      console.error('Error in tokenID:', error);
    }
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
};

export const GETUSERCOLLECTIONS = async (user) => {
  try {
    const provider = 
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    
    const signer = provider.getSigner();
    const contractAddress = getContractAddress();
    const Role = new ethers.Contract(contractAddress, ABI, signer);
    const answer = await Role.getUserCollections(user);
    return answer;
  } catch (error) {
    console.error('Error fetching NFT Collections:', error);
  }
};
