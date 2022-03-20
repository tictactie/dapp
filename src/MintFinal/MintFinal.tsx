import { useState, useEffect } from "react";
import { Button, HStack, Box } from "@chakra-ui/react";
import { Contract } from "ethers";
import { interact } from "../utils/tictactie";

type MintFinalProps = {
  tokenId: number;
  contract: Contract | undefined;
};

function MintFinal(props: MintFinalProps) {
  const [contract, setContract] = useState<Contract>();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState<number>(0);
  const [mintableFinal, setMintableFinal] = useState<boolean>();
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
          margin="auto"
          height="50px"
          isDisabled={!mintableFinal}
          isLoading={minting}
        >
          {"MINT FINAL REWARD"}
        </Button>
      </HStack>
      <br />
      {!minting && error && <span>ERROR: {error}</span>}
    </Box>
  );
}

export default MintFinal;
