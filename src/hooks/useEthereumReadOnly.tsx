import { useState, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./config";

function useEthereumReadOnly(): [contract: Contract | undefined] {
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    (async () => {
      async function init() {
        const newProvider = new JsonRpcProvider(
          process.env.REACT_APP_INFURA_RPC,
          process.env.REACT_APP_NETWORK
        );

        const contract = new Contract(CONTRACT_ADDRESS, ABI, newProvider);
        setContract(contract);
      }

      await init();
    })();
  }, []);

  return [contract];
}

export default useEthereumReadOnly;
