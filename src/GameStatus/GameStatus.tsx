import { Box, Button, Container } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { tokenIdToFlag, tokenIdToCountry } from "../utils/countries";
import Countdown from "react-countdown";
import { getWhoAbandoned, interact } from "../utils/tictactie";

type GameStatusProps = {
  contract: Contract | undefined;
  tokenId: number | undefined;
  opponentId: number | undefined;
  isAccountTurn: boolean;
  setRound: (round: number) => void;
  setAbandoned: (abandoned: boolean) => void;
  setOpponent: (opponentId: number | undefined) => void;
};

function GameStatus(props: GameStatusProps) {
  const [expiresInSeconds, setExpiresInSeconds] = useState<number>();
  const [whoAbandoned, setWhoAbandoned] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoadin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (props.contract && props.tokenId) {
        await fetchExpiryBlock(props.contract, props.tokenId);
      }
    })();
  }, [props.tokenId, props.contract, props.isAccountTurn]);

  useEffect(() => {
    (async () => {
      if (props.opponentId) {
        await checkAbandoned();
      }
    })();
  }, [props.opponentId]);

  useEffect(() => {
    (async () => {
      if (expiresInSeconds == 0) {
        await checkAbandoned();
      }
    })();
  }, [expiresInSeconds]);

  async function fetchExpiryBlock(contract: Contract, tokenId: number) {
    const epxirationBlock = await contract.expiryBlock(tokenId);
    console.log(epxirationBlock.toNumber());
    const currentBlock = await contract.provider.getBlockNumber();
    console.log(currentBlock);
    setExpiresInSeconds((epxirationBlock.toNumber() - currentBlock) * 13);
  }

  async function checkAbandoned() {
    if (props.tokenId) {
      const abandoned = await getWhoAbandoned(props.contract, props.tokenId);
      setWhoAbandoned(abandoned);
      if (abandoned !== 0 && abandoned !== undefined) {
        props.setAbandoned(true);
      } else {
        props.setAbandoned(false);
      }
    }
  }

  async function endGame() {
    if (props.tokenId && props.contract) {
      interact(
        () => setIsLoadin(true),
        (error) => setError(error),
        async () => {
          setIsLoadin(false);
          props.setRound(0);
          props.setAbandoned(false);
          props.setOpponent(undefined);
        },
        async () => {
          const victorious =
            props.tokenId == whoAbandoned ? props.opponentId : props.tokenId;
          return await props.contract!.endGame(victorious);
        }
      );
    }
  }

  function renderContent() {
    if (whoAbandoned === 0) {
      return (
        <Box>
          {props.isAccountTurn ? (
            <span>
              <b>Your</b> turn.
            </span>
          ) : (
            <span>
              <b>Opponent</b>'s turn.
            </span>
          )}{" "}
          Expires in{" "}
          {expiresInSeconds && (
            <Countdown
              onComplete={() => setExpiresInSeconds(0)}
              date={Date.now() + expiresInSeconds * 1000}
            />
          )}
          <br />
          {!props.isAccountTurn && <span>Come back later.</span>}
        </Box>
      );
    } else if (whoAbandoned === props.tokenId) {
      return (
        <Box>
          Your turn expired.{" "}
          <Button
            onClick={() => endGame()}
            fontSize={12}
            height="20px"
            isLoading={isLoading}
          >
            GIVE UP
          </Button>{" "}
          to play again.
        </Box>
      );
    } else if (whoAbandoned === props.opponentId) {
      return (
        <Box>
          Your opponent abandoned.{" "}
          <Button
            onClick={() => endGame()}
            fontSize={12}
            height="20px"
            isLoading={isLoading}
          >
            CLICK TO WIN
          </Button>{" "}
          and continue.
        </Box>
      );
    }
  }

  function renderContainer() {
    if (props.tokenId && props.opponentId) {
      return (
        <Container>
          <span>
            You are playing against {tokenIdToCountry(props.opponentId)}{" "}
            {tokenIdToFlag(props.opponentId)}
          </span>
          <br />
          {renderContent()}
          {!isLoading && error && <span>ERROR: {error}</span>}
        </Container>
      );
    } else {
      return <Box></Box>;
    }
  }

  return renderContainer();
}

export default GameStatus;
