import { useState, useEffect } from "react";
import { Contract } from "ethers";

function useOpponent(
  contract: Contract | undefined,
  tokenId: number | undefined
): number | undefined {
  const [opponent, setOpponent] = useState<number>();

  useEffect(() => {
    (async () => {
      if (contract && tokenId) await fetchOpponent(contract, tokenId);
    })();
  }, [contract, tokenId]);

  async function fetchOpponent(contract: Contract, tokenId: number) {
    const response = await contract.opponent(tokenId);
    setOpponent(response.toNumber());
  }

  return opponent;
}

export default useOpponent;
