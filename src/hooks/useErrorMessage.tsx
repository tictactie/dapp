import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

function getError(key: string) {
  if ("E1" === key) {
    return "Caller is not the artist.";
  }
  if ("E2" === key) {
    return "You don't own this board.";
  }
  if ("E3" === key) {
    return "Prize already redeemed";
  }
  if ("E4" === key) {
    return "Not enough victories";
  }
  if ("E5" === key) {
    return "No mintable ties";
  }
  if ("E6" === key) {
    return "No more ties";
  }
  if ("E7" === key) {
    return "Not enough eth";
  }
  if ("E8" === key) {
    return "Id out of range";
  }
  if ("E9" === key) {
    return "No self-challenge.";
  }
  if ("E10" === key) {
    return "Challenge someone else before trying against the same again.";
  }
  if ("E11" === key) {
    return "The board you are challenging is not owened by anyone yet.";
  }
  if ("E12" === key) {
    return "A player already playing";
  }
  if ("E13" === key) {
    return "A player not playing";
  }
  if ("E14" === key) {
    return "No opponent";
  }
  if ("E15" === key) {
    return "Opponent didn't abandon";
  }
  if ("E16" === key) {
    return "Invalid move";
  }
  if ("E17" === key) {
    return "Game is over";
  }
  if ("E18" === key) {
    return "Time is up";
  }
  if ("E19" === key) {
    return "Opponent abandoned";
  }
  if ("E20" === key) {
    return "Not your turn";
  }
  if ("E21" === key) {
    return "The coordinate is occupied.";
  }
  if ("E22" === key) {
    return "Nonexistent token";
  }
}

function useErrorMessage(message: string | undefined) {
  const toast = useToast();

  useEffect(() => {
    if (message) {
      let finalMessage: string | undefined = message;

      if (message.indexOf("execution reverted: ") > -1) {
        const code = message.replace("execution reverted: ", "");
        console.log(code === "E11");
        finalMessage = getError(code);
        if (finalMessage === undefined) {
          finalMessage = message;
        }
      }
      toast({
        title: finalMessage,
        status: "error",
        isClosable: true,
      });
    }
  }, [message, toast]);
}

export default useErrorMessage;
