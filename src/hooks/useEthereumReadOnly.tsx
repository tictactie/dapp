import { useState, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./config";

const PRIZE_CONTRACT = "0xd02f211bcb4747379e717def0504e01e067567c8";
const PRIZE_ABI = [
  "function balanceOf(address, uint256) public view returns(uint256)",
];
function useEthereumReadOnly(): [
  contract: Contract | undefined,
  prizeContract: Contract | undefined
] {
  const [contract, setContract] = useState<Contract>();
  const [prizeContract, setPrizeContract] = useState<Contract>();

  useEffect(() => {
    (async () => {
      async function init() {
        const newProvider = new JsonRpcProvider(
          process.env.REACT_APP_INFURA_RPC,
          process.env.REACT_APP_NETWORK
        );

        const contract = new Contract(CONTRACT_ADDRESS, ABI, newProvider);
        setContract(contract);

        const prizeContract = new Contract(
          PRIZE_CONTRACT,
          PRIZE_ABI,
          newProvider
        );
        setPrizeContract(prizeContract);
      }

      await init();
    })();
  }, []);

  return [contract, prizeContract];
}

export default useEthereumReadOnly;
