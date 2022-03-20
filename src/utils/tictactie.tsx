import { BigNumber, Contract } from "ethers";

type ContractError = Record<"data", Record<"message", string>>;
type MetamaskError = Record<"message", string>;

export async function interact(
  onWait: () => any,
  onFailure: (error: string | undefined) => any,
  onSuccess: () => any,
  method: () => any
) {
  try {
    const tx = await method();
    onWait();
    await tx.wait(1);
    onSuccess();
  } catch (e) {
    if (typeof e === "string") {
      const errorStarts = e.indexOf("error=") + 6;
      const errorEnds = e.indexOf(",code=");

      onFailure(e.substring(errorStarts, errorEnds));
    } else if (e instanceof Error) {
      const errorStarts = e.message.indexOf("error=") + 6;
      const errorEnds = e.message.indexOf(", code=");
      const errorObj = JSON.parse(e.message.substring(errorStarts, errorEnds));
      onFailure(errorObj["data"]["originalError"]["message"]);
    } else {
      const error = e as MetamaskError | ContractError;
      if ("data" in error) {
        onFailure(error["data"]["message"]);
      } else {
        onFailure(error["message"]);
      }
    }
  }
}

export async function getSupply(contract: Contract | undefined) {
  if (contract) {
    const supply = (await contract.mintable()) || BigNumber.from(0);

    return supply;
  }

  return undefined;
}

export async function getOpponent(contract: Contract, tokenId: number) {
  const response = await contract.opponent(tokenId);
  return response.toNumber();
}

export async function isTurn(contract: Contract, tokenId: number) {
  try {
    const response = await contract.isBoardTurn(tokenId);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function isOwnerOf(contract: Contract, tokenId: number) {
  try {
    const response = await contract.ownerOf(tokenId);
    return response === (await contract.signer.getAddress());
  } catch (e) {
    console.log(e);
  }
}

export async function mintableTies(contract: Contract, tokenId: number) {
  try {
    const response = await contract.mintableTies(tokenId);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getBoardSVGs(
  contract: Contract
): Promise<string[] | undefined> {
  try {
    const response = await contract.getAllBoardsSVG();
    const svgs = [];
    for (var i = 0; i < 70; i++) {
      var svg = response[i];
      svgs.push(
        svg
          .replace(/xo/g, "xo" + i)
          .replace(/bg/g, "bg" + i)
          .replace(/hash/g, "hash" + i)
          .replace(/xoline/g, "xoline" + i)
          .replace(/id='o'/g, `id='o${i}'`)
          .replace(/id='x'/g, `id='x${i}'`)
          .replace(/'#o'/g, `'#o${i}'`)
          .replace(/'#x'/g, `'#x${i}'`)
          .replace(/pulse/g, "pulse" + i)
      );
    }
    return svgs;
  } catch (e) {
    console.log(e);
  }
}
