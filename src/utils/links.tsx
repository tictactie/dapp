const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!.toLowerCase();
const NETWORK = process.env.REACT_APP_NETWOR!;

export function openSeaCollection() {
  if (NETWORK == "homestead") {
    return "https://opensea.io/collection/tictactie";
  } else {
    return "https://testnets.opensea.io/collection/tictactie";
  }
}

export function openSeaProfile(userAddress: string) {
  if (NETWORK == "homestead") {
    return `https://opensea.io/${userAddress.toLowerCase()}`;
  } else {
    return `https://testnets.opensea.io/${userAddress.toLowerCase()}`;
  }
}

export function openSeaBoard(boardId: number) {
  if (NETWORK == "homestead") {
    return `https://opensea.io/assets/${CONTRACT_ADDRESS}/${boardId}`;
  } else {
    return `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${boardId}`;
  }
}
