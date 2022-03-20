import { useState, useEffect } from "react";
import { Button, Box, HStack } from "@chakra-ui/react";
import { Contract } from "ethers";
import { interact } from "../utils/tictactie";

type MintTieProps = {
  tokenId: number;
  contract: Contract | undefined;
};
function MintTie(props: MintTieProps) {
  const [contract, setContract] = useState<Contract>();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState<number>(0);
  const [mintableTies, setMintableTies] = useState<number>(0);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  async function mint(tokenId: number) {
    if (contract) {
      interact(
        () => setMinting(true),
        (error) => setError(error),
        () => {
          setMinting(false);
        },
        async () => {
          return await contract.mintTie(tokenId, {
            from: await contract.signer.getAddress(),
          });
        }
      );
    }
  }

  return (
    <Box>
      <HStack>
        <Button
          onClick={() => mint(tokenId)}
          height="50px"
          margin="auto"
          isDisabled={!mintableTies}
          isLoading={minting}
        >
          {!mintableTies ? "YOU HAVE NO TIES" : `MINT ${mintableTies} TIES`}
        </Button>
      </HStack>
      <br />
      {!minting && error && <span>ERROR: {error}</span>}
    </Box>
  );
}

export default MintTie;
