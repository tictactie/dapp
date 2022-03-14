import { useState, useEffect } from "react";
import { Contract } from "ethers";

function useUserMinted(
  contract: Contract | undefined,
  justMinted: boolean
): boolean {
  const [minted, setMinted] = useState(justMinted);
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    (async () => {
      if (contract) {
        setAddress(await contract.signer.getAddress());
      }
    })();
  }, [contract]);

  useEffect(() => {
    (async () => {
      if (address && contract && !justMinted) {
        await fetchBalance(contract, address);
      }
    })();
  }, [address, contract, justMinted]);

  async function fetchBalance(contract: Contract, address: string) {
    const response = await contract.balanceOf(address);
    setMinted(response.toNumber() > 0);
  }

  return minted || justMinted;
}

export default useUserMinted;
