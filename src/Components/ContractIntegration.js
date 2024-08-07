import ABI from "./ABI.json";
import { ethers } from "ethers";
import Web3 from "web3";

const SOCIALFI_CONTRACT = "0x8b5FB0bFed7aD0a24740b7D3590Cbb1B617CDEa2";
const isBrowser = () => typeof window !== "undefined";
const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum); 
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}


export const MINTNFT = async (contractName, tokenSymbol, community,media, amount) => {

    try {
      
      const provider =
        window.ethereum != null
          ? new ethers.providers.Web3Provider(window.ethereum)
          : ethers.providers.getDefaultProvider();
      const signer = provider.getSigner();
      const Role = new ethers.Contract(SOCIALFI_CONTRACT, ABI, signer);
      // const tokenId = await Role.mintNFT(contractName, tokenSymbol, community, media, amount);
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
  }



  export const GETUSERCOLLECTIONS = async (user) => {
    try {
        const provider = 
        window.ethereum != null
          ? new ethers.providers.Web3Provider(window.ethereum)
          : ethers.providers.getDefaultProvider();
    
        const signer = provider.getSigner();
        const Role = new ethers.Contract(SOCIALFI_CONTRACT, ABI, signer);
        const answer = await Role.getUserCollections(user);
        return answer;
    } catch (error) {
        console.error('Error fetching NFT Collections:', error);
    }
}


 