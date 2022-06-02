import { useState, useEffect } from "react";
import { Button, Container, Link, Text } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { interact, getVictories } from "../utils/tictactie";
import { NavLink } from "react-router-dom";
import useErrorMessage from "../hooks/useErrorMessage";
import { CONTRACT_ADDRESS } from "../hooks/config";

type MintFinalProps = {
  tokenId: number;
  contract: Contract | undefined;
  prizeContractReadOnly: Contract | undefined;
  isAccountTurn: boolean;
  donation: string;
  opponent: number | undefined;
};

function MintFinal(props: MintFinalProps) {
  const [minting, setMinting] = useState(false);
  const [victories, setVictories] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [redeemed, setRedeemed] = useState<boolean>(true);
  useErrorMessage(error);

  useEffect(() => {
    (async () => {
      if (props.contract && props.tokenId) {
        await fetchVictories(props.contract, props.tokenId);
      }
    })();
  }, [props.tokenId, props.contract, props.isAccountTurn, props.opponent]);

  useEffect(() => {
    (async () => {
      if (props.prizeContractReadOnly) {
        const balance = await props.prizeContractReadOnly.balanceOf(
          CONTRACT_ADDRESS,
          107
        );
        setRedeemed(balance.toNumber() === 0);
      }
    })();
  }, [props.prizeContractReadOnly]);

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

  function renferVictories() {
    return (
      <span>
        You need <b>{5 - victories}</b> more victories to win the
      </span>
    );
  }

  function renderContent() {
    if (victories === 5) {
      if (!redeemed) {
        return (
          <Container>
            <span style={{ color: "#FF8C00" }}>
              You have a <b>level {victories}</b> board now.
            </span>
            <br />
            <span style={{ color: "#008F07" }}>
              <b>Hurray!</b> You have can now{" "}
              <Button
                onClick={() => mint(props.tokenId!)}
                fontSize={12}
                height="20px"
                isLoading={minting}
              >
                claim the Grand Prize
              </Button>
            </span>
          </Container>
        );
      } else {
        return (
          <Container>
            <span style={{ color: "#FF8C00" }}>
              You have a <b>level {victories}</b> board now.
            </span>
            <br />
            <span style={{ color: "red" }}>
              But the Grand Prize has already been claimed.
            </span>
            <br />
            <span style={{ color: "#008F07" }}>
              <Link isExternal href="https://twitter.com/tictactienft">
                Stay in touch
              </Link>{" "}
              to know about future ones.
            </span>
          </Container>
        );
      }
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
            {props.tokenId && renferVictories()}
            {!props.tokenId && `You need to reach level 5 to win the`} <br />
            <b>
              <NavLink to="/prize">Grand Prize.</NavLink>
            </b>
          </span>
        </Container>
      );
    }
  }

  return renderContent();
}

export default MintFinal;
