import { useState, useEffect } from "react";
import { Button, HStack, Box, Container } from "@chakra-ui/react";
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

  function renderContent() {
    if (mintableFinal) {
      return (
        <Container>
          <b>Hurray!</b> You have can now{" "}
          <Button
            onClick={() => mint(tokenId)}
            fontSize={12}
            height="20px"
            isLoading={minting}
          >
            mint the Final Prize
          </Button>
          <br />
          {!minting && error && <span>ERROR: {error}</span>}
        </Container>
      );
    } else {
      return (
        <Container>
          You need <b>4</b> more victories to win the Final Prize.
        </Container>
      );
    }
  }

  return renderContent();
}

export default MintFinal;
