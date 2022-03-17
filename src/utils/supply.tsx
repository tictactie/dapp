import { BigNumber, Contract } from "ethers";

export async function getSupply(contract: Contract | undefined) {
  if (contract) {
    const supply = (await contract.mintable()) || BigNumber.from(0);

    return supply;
  }

  return undefined;
}
