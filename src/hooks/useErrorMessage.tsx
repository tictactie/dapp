import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

function useErrorMessage(message: string | undefined) {
  const toast = useToast();

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  }, [message, toast]);
}

export default useErrorMessage;
