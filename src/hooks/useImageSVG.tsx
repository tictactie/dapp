import { useState, useEffect } from "react";
import { Contract } from "ethers";

function useImageSVG(
  contract: Contract | undefined,
  tokenId: number | undefined,
  round: number,
  opponent: number | undefined
): string | undefined {
  const [imageSVG, setImageSVG] = useState<string>();

  useEffect(() => {
    (async () => {
      if (contract && tokenId) await fetchImage(contract, tokenId);
    })();
  }, [contract, tokenId, round, opponent]);

  async function fetchImage(contract: Contract, tokenId: number) {
    const response = await contract.tokenURI(tokenId);
    let json = JSON.parse(response.slice(16));
    setImageSVG(json["image"]);
  }

  return imageSVG;
}

export default useImageSVG;
