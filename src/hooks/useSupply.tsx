import { useState } from "react";
import { BigNumber, Contract } from "ethers";
import useInterval from "@use-it/interval";

function useSupply(contract: Contract | undefined): [supply: number] {
  const [supply, setSupply] = useState<number>(0);

  useInterval(() => {
    (async () => {
      await poll();
    })();
  }, 10000);

  async function poll() {
    if (contract) {
      const supply = (await contract?.mintable()) || BigNumber.from(0);
      console.log(supply.toNumber());
      setSupply(supply.toNumber());
    }
  }

  return [supply];
}

export default useSupply;
