Contract Address: 0xAc798f448c04d0B2c6924Cd954414Ef9493cEC4c
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyNFT is ERC1155 {
    uint256 public tokenId = 0; // The ID of the NFT to be minted
    
    struct CollectionDetails {
        string contractName;
        string tokenSymbol;
        string community;
        string media;
    }

    // Map addresses to an array of CollectionDetails
    mapping(address => CollectionDetails[]) public userCollections;

    constructor() ERC1155("https://ipfs.io/ipfs/{QmVDvzTdptmy5NSTLptSKUVuYcpxijUUpiHGeH5CPJx7tp}.json") {}

    function mintNFT(
        string memory contractName, 
        string memory tokenSymbol, 
        string memory community, 
        string memory media, 
        uint256 amount
    ) public {
        // Mint the NFT
        _mint(_msgSender(), tokenId, amount, ""); 
        
        // Store the metadata in the user's collection array
        CollectionDetails memory newDetails = CollectionDetails({
            contractName: contractName,
            tokenSymbol: tokenSymbol,
            community: community,
            media: media
        });
        
        userCollections[_msgSender()].push(newDetails);

        // Increase the token ID for the next mint
        tokenId++;
    }
    
    function getUserCollections(address user) 
        public 
        view 
        returns (
            string[] memory contractNames, 
            string[] memory tokenSymbols, 
            string[] memory communities, 
            string[] memory medias
        )
    {
        CollectionDetails[] memory detailsArray = userCollections[user];
        uint256 length = detailsArray.length;

        // Initialize arrays to hold the returned data
        contractNames = new string[](length);
        tokenSymbols = new string[](length);
        communities = new string[](length);
        medias = new string[](length);

        // Populate the arrays with data from the user's collections
        for (uint256 i = 0; i < length; i++) {
            CollectionDetails memory details = detailsArray[i];
            contractNames[i] = details.contractName;
            tokenSymbols[i] = details.tokenSymbol;
            communities[i] = details.community;
            medias[i] = details.media;
        }
    }
}
