import { BigNumber, Contract, ContractReceipt } from "ethers";

type ContractError = Record<"data", Record<"message", string>>;
type MetamaskError = Record<"message", string>;
type EtherjsError = {
  message: string;
  code: string;
};

export async function interact(
  onWait: () => any,
  onFailure: (error: string | undefined) => any,
  onSuccess: (receipt: ContractReceipt) => any,
  method: () => any
) {
  try {
    const tx = await method();

    onWait();

    const receipt = await tx.wait(1);
    await onSuccess(receipt);
  } catch (e) {
    if (typeof e === "string") {
      const errorStarts = e.indexOf("error=") + 6;
      const errorEnds = e.indexOf(",code=");

      onFailure(e.substring(errorStarts, errorEnds));
      return;
    }

    if (e instanceof Error) {
      if (e.message.includes("insufficient funds")) {
        onFailure("Insufficient Funds");
        return;
      }

      try {
        const errorStarts = e.message.indexOf("error=") + 6;
        const errorEnds = e.message.indexOf(", code=");
        const errorObj = JSON.parse(
          e.message.substring(errorStarts, errorEnds)
        );
        onFailure(errorObj["data"]["originalError"]["message"]);
        return;
      } catch {}
    }

    const error = e as MetamaskError | ContractError | EtherjsError;
    if ("data" in error) {
      onFailure(error["data"]["message"]);
    } else {
      onFailure(error["message"]);
    }
  }
}

export function getDidWinEvent(contract: Contract, receipt: ContractReceipt) {
  const filter = contract.filters.DidWin(contract.address);
  for (const e of receipt.events || []) {
    if (
      e.address === filter.address &&
      // `filter.topics` is set
      e.topics[0] === filter.topics![0]
    ) {
      return e.args!["winningBoard"] as BigNumber;
    }
  }
}

export function getDidTieEvent(contract: Contract, receipt: ContractReceipt) {
  const filter = contract.filters.DidWin(contract.address);
  for (const e of receipt.events || []) {
    if (
      e.address === filter.address &&
      // `filter.topics` is set
      e.topics[0] === filter.topics![0]
    ) {
      return e.args!["board1"] as BigNumber;
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
  const response = await contract.getOpponent(tokenId);
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

export async function getMintableTies(contract: Contract, tokenId: number) {
  try {
    const response = await contract.mintableTies(tokenId);
    return response.toNumber();
  } catch (e) {
    console.log(e);
  }
}

export async function getVictories(contract: Contract, tokenId: number) {
  try {
    const response = await contract.victories(tokenId);
    return response.toNumber();
  } catch (e) {
    console.log(e);
    return 5;
  }
}

export async function getWhoAbandoned(
  contract: Contract | undefined,
  tokenId: number
) {
  try {
    if (contract) {
      const whoAbandoned = await contract.whoAbandoned(tokenId);
      return whoAbandoned.toNumber();
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getBoardSVGs(
  contract: Contract
): Promise<string[] | undefined> {
  try {
    const response = await contract.getAllBoardsSVG(1);
    const svgs = [];
    for (var i = 0; i < 70; i++) {
      var r = response[i];
      let json = JSON.parse(r.slice(16));
      let svg = json["image"];

      svgs.push(
        svg
          .replace(/xo/g, "xo" + i)
          .replace(/bg/g, "bg" + i)
          .replace(/fg/g, "fg" + i)
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
