import { useState, useEffect } from "react";
import { Button, Container } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { interact, getVictoriesLeft } from "../utils/tictactie";
import { NavLink } from "react-router-dom";
import useErrorMessage from "../hooks/useErrorMessage";

type MintFinalProps = {
  tokenId: number;
  contract: Contract | undefined;
  isAccountTurn: boolean;
  donation: string;
};

function MintFinal(props: MintFinalProps) {
  const [minting, setMinting] = useState(false);
  const [victoriesLeft, setVictoriesLeft] = useState<number>(5);
  const [error, setError] = useState<string>();
  useErrorMessage(error);

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
          return await props.contract!.redeemFinalPrize(tokenId, {
            value: ethers.utils.parseEther(props.donation),
            from: await props.contract!.signer.getAddress(),
          });
        }
      );
    }
  }

  function renderContent() {
    if (victoriesLeft === 0) {
      return (
        <Container>
          <span style={{ color: "#FF8C00" }}>
            You have a <b>level {5 - victoriesLeft}</b> board now.
          </span>
          <br />
          <b>Hurray!</b> You have can now{" "}
          <Button
            onClick={() => mint(props.tokenId!)}
            fontSize={12}
            height="20px"
            isLoading={minting}
          >
            claim the Final Prize
          </Button>
          <br />
          {!minting && error && <span>ERROR: {error}</span>}
        </Container>
      );
    } else {
      return (
        <Container>
          {props.tokenId && (
            <span style={{ color: "#008F07" }}>
              You have a <b>level {5 - victoriesLeft}</b> board now.
              <br />
            </span>
          )}
          <span style={{ color: "#FF8C00" }}>
            You need <b>{victoriesLeft}</b> {props.tokenId && "more"} victories{" "}
            {!props.tokenId && "in a row"} to win the <br />
            <b>
              <NavLink to="/prize">Final Prize.</NavLink>
            </b>
          </span>
        </Container>
      );
    }
  }

  return renderContent();
}

export default MintFinal;
