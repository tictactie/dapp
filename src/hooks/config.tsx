export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!;

export const ABI = [
  "function mint(uint256) public payable",
  "function tokenURI(uint256) public view returns (string memory)",
  "function mintable() public view returns (uint256)",
  "event Transfer(address indexed, address indexed, uint)",
  "event DidWin(address indexed from, uint256 indexed winningBoard, uint256 indexed losingBoard)",
  "event DidTie(address indexed from, uint256 indexed board1, uint256 indexed board2)",
  "function getOpponent(uint256 boardIndex) public view returns (uint256)",
  "function expiryBlock(uint256) public view returns (uint256)",
  "function balanceOf(address) public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function challenge(uint256, uint256) public",
  "function isBoardTurn(uint256) public view returns (bool)",
  "function getAllBoardsSVG() public view returns (string[70] memory)",
  "function play(uint256, uint16) public",
  "function mintableTies(uint256) public view returns (uint256)",
  "function mintTie(uint256 boardIndex) payable public",
  "function victories(uint256) public view returns (uint256)",
  "function whoAbandoned(uint256 boardIndex) public view returns (uint256)",
  "function endGame(uint256 boardIndex) public",
  "function redeemFinalPrize(uint256 boardIndex) external",
];
