import { useState, useEffect } from "react";
import "./Mint.css";
import { Button, Box, HStack } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { tokenIdToFlag } from "../utils/countries";
import { interact } from "../utils/tictactie";

type MintProps = {
  tokenId: number;
  minted: boolean;
  setJustMinted: (didMint: boolean) => void;
  setTokenId: (tokenId: number) => void;
  contract: Contract | undefined;
};
function Mint(props: MintProps) {
  const [contract, setContract] = useState<Contract>();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState<number>(0);
  const [minted, setMinted] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setMinted(props.minted);
  }, [props.minted]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

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
          props.setJustMinted(true);
          props.setTokenId(tokenId);
        },
        async () => {
          return await contract.mint(tokenId, {
            value: ethers.utils.parseEther(
              process.env.REACT_APP_PRICE || "0.001"
            ),
            from: await contract.signer.getAddress(),
          });
        }
      );
    }
  }

  return (
    <div className="Mint">
      <HStack>
        <Button
          onClick={() => mint(tokenId)}
          height="20px"
          width="80%"
          isDisabled={minted || !contract}
          isLoading={minting}
        >
          {minted ? "TAKEN." : "MINT!"}
        </Button>
        <Box width="20%" height="20px">
          {tokenIdToFlag(tokenId)}
        </Box>
      </HStack>
      <br />
      {!minting && error && <span>ERROR: {error}</span>}
    </div>
  );
}

export default Mint;
