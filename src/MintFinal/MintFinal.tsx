import { useState, useEffect } from "react";
import { Button, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { interact, getVictoriesLeft } from "../utils/tictactie";

type MintFinalProps = {
  tokenId: number;
  contract: Contract | undefined;
  isAccountTurn: boolean;
};

function MintFinal(props: MintFinalProps) {
  const [minting, setMinting] = useState(false);
  const [victoriesLeft, setVictoriesLeft] = useState<number>(5);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      if (props.contract && props.tokenId) {
        await fetchVictoriesLeft(props.contract, props.tokenId);
      }
    })();
  }, [props.tokenId, props.contract, props.isAccountTurn]);

  async function fetchVictoriesLeft(contract: Contract, tokenId: number) {
    const newVictoriesLeft = await getVictoriesLeft(contract, tokenId);
    setVictoriesLeft(newVictoriesLeft);
  }

  async function mint(tokenId: number) {
    if (props.contract) {
      interact(
        () => setMinting(true),
        (error) => setError(error),
        () => {
          setMinting(false);
        },
        async () => {
          return await props.contract!.mintFinal(tokenId, {
            from: await props.contract!.signer.getAddress(),
          });
        }
      );
    }
  }

  function renderContent() {
    if (victoriesLeft == 0) {
      return (
        <Container>
          You have a <b>level {5 - victoriesLeft}</b> board now.
          <br />
          <b>Hurray!</b> You have can now{" "}
          <Button
            onClick={() => mint(props.tokenId!)}
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
          {props.tokenId && (
            <span>
              You have a <b>level {5 - victoriesLeft}</b> board now.
              <br />
            </span>
          )}
          You need <b>{victoriesLeft}</b> {props.tokenId && "more"} victories{" "}
          {!props.tokenId && "in a row"} to win the Final Prize.
        </Container>
      );
    }
  }

  return renderContent();
}

export default MintFinal;
