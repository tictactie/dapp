const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!.toLowerCase();
const NETWORK = process.env.REACT_APP_NETWOR!;
const OPENSEA_LINK = process.env.REACT_APP_OPENSEA_LINK!;

export function openSeaCollection() {
  return `${OPENSEA_LINK}/collection/tictactie`;
}

export function openSeaProfile(userAddress: string) {
  return `${OPENSEA_LINK}/${userAddress.toLowerCase()}`;
}

export function openSeaBoard(boardId: number) {
  return `${OPENSEA_LINK}/assets/${CONTRACT_ADDRESS}/${boardId}`;
}
