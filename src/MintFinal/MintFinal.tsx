import { useState, useEffect } from "react";
import { Button, Container } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { interact, getVictories } from "../utils/tictactie";
import { NavLink } from "react-router-dom";
import useErrorMessage from "../hooks/useErrorMessage";

type MintFinalProps = {
  tokenId: number;
  contract: Contract | undefined;
  isAccountTurn: boolean;
  donation: string;
  opponent: number | undefined;
};

function MintFinal(props: MintFinalProps) {
  const [minting, setMinting] = useState(false);
  const [victories, setVictories] = useState<number>(5);
  const [error, setError] = useState<string>();
  useErrorMessage(error);

  useEffect(() => {
    (async () => {
      if (props.contract && props.tokenId) {
        await fetchVictories(props.contract, props.tokenId);
      }
    })();
  }, [props.tokenId, props.contract, props.isAccountTurn, props.opponent]);

  async function fetchVictories(contract: Contract, tokenId: number) {
    const newVictories = await getVictories(contract, tokenId);
    setVictories(newVictories);
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
    if (victories === 5) {
      return (
        <Container>
          <span style={{ color: "#FF8C00" }}>
            You have a <b>level {victories}</b> board now.
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
        </Container>
      );
    } else {
      return (
        <Container>
          {props.tokenId && (
            <span style={{ color: "#008F07" }}>
              You have a <b>level {victories}</b> board now.
              <br />
            </span>
          )}
          <span style={{ color: "#FF8C00" }}>
            You need <b>{5 - victories}</b> {props.tokenId && "more"} victories{" "}
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
