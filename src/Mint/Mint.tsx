import { useState } from "react";
import "./Mint.css";
import { Button, Box, HStack, Link, Stack } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { tokenIdToFlag } from "../utils/countries";
import { interact } from "../utils/tictactie";
import { openSeaBoard } from "../utils/links";
import useErrorMessage from "../hooks/useErrorMessage";

type MintProps = {
  tokenId: number;
  minted: boolean;
  setJustMinted: (didMint: boolean) => void;
  setTokenId: (tokenId: number) => void;
  contract: Contract | undefined;
};

function Mint({
  tokenId,
  minted,
  setJustMinted,
  setTokenId,
  contract,
}: MintProps) {
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string>();
  useErrorMessage(error);

  async function mint(tokenId: number) {
    if (contract) {
      interact(
        () => {
          setMinting(true);
          setError(undefined);
        },
        (error) => setError(error),
        () => {
          setMinting(false);
          setJustMinted(true);
          setTokenId(tokenId);
        },
        async () => {
          return await contract!.mint(tokenId, {
            value: ethers.utils.parseEther(
              process.env.REACT_APP_PRICE || "0.001"
            ),
            from: await contract.signer.getAddress(),
          });
        }
      );
    } else {
      setError("You need to CONNECT first!");
    }
  }

  return (
    <div className="Mint">
      <Stack direction={{ base: "column", md: "row" }}>
        <Button
          onClick={() => mint(tokenId)}
          height="20px"
          width={{ base: "100%", md: "80%" }}
          fontSize={{ base: "10px", md: "1em" }}
          isDisabled={minted}
          isLoading={minting}
        >
          {minted ? (
            <Link href={openSeaBoard(tokenId)} isExternal>
              VIEW
            </Link>
          ) : (
            "MINT!"
          )}
        </Button>
        <Box width={{ base: "100%", md: "20%" }}>{tokenIdToFlag(tokenId)}</Box>
      </Stack>
      <br />
    </div>
  );
}

export default Mint;
