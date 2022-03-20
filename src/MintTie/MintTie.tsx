import { useState, useEffect } from "react";
import { Button, Box, HStack, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { interact } from "../utils/tictactie";
import { render } from "@testing-library/react";

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

  function renderContent() {
    if (mintableTies > 0) {
      return (
        <Container>
          <b>Hurray!</b> You have{" "}
          <Button
            onClick={() => mint(tokenId)}
            fontSize={12}
            height="20px"
            isLoading={minting}
          >
            {mintableTies} ties to MINT!
          </Button>
          <br />
          {!minting && error && <span>ERROR: {error}</span>}
        </Container>
      );
    } else {
      return (
        <Container>
          You have <b>0</b> mintable ties. Play and tie to earn them.
        </Container>
      );
    }
  }

  return renderContent();
}

export default MintTie;
