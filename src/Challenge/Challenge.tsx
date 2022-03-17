import {
  SimpleGrid,
  AspectRatio,
  Box,
  GridItem,
  Input,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import useImageSVG from "../hooks/useImageSVG";
import { interact } from "../utils/tictactie";
import { countryToId } from "../utils/countries";

type ChallengeProps = {
  contract: Contract | undefined;
  tokenId: number;
  setOpponent: (opponentId: number) => void;
};

function Challenge(props: ChallengeProps) {
  const [contract, setContract] = useState<Contract>();
  const [tokenId, setTokenId] = useState<number>();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [country, setCountry] = useState("");
  const imageSVG = useImageSVG(contract, tokenId);
  const handleChange = (event: any) => setCountry(event.target.value);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  async function handleClick() {
    if (country) {
      const opponentId = countryToId(country);
      await challenge(opponentId);
    }
  }

  async function challenge(opponentId: number) {
    if (contract && tokenId !== undefined) {
      setError(undefined);
      setWaiting(false);

      interact(
        () => setWaiting(true),
        (error) => setError(error),
        () => {
          setWaiting(false);
          props.setOpponent(opponentId);
        },
        async () => {
          return await contract.challenge(tokenId, opponentId, {
            from: await contract.signer.getAddress(),
          });
        }
      );
    }
  }

  return (
    <Box>
      {imageSVG && (
        <SimpleGrid columns={10} gap={2}>
          <GridItem colStart={4} rowStart={0} colSpan={2} rowSpan={2}>
            <AspectRatio ratio={1}>
              <span dangerouslySetInnerHTML={{ __html: imageSVG }} />
            </AspectRatio>
          </GridItem>
          <GridItem colStart={6} colSpan={2} rowSpan={1}>
            <VStack>
              <Text
                backgroundColor="rgba(255,255,255,0.8)"
                height="30px"
                fontSize="xl"
              ></Text>
              <Button
                onClick={handleClick}
                isLoading={waiting}
                backgroundColor="rgba(255,255,255,0.8)"
                colorScheme="black"
                variant="outline"
                height="40px"
                width="100%"
              >
                CHALLENGE
              </Button>
              <Input
                value={country}
                onChange={handleChange}
                backgroundColor="rgba(255,255,255,0.8)"
                borderColor="black"
                height="50px"
                placeholder="Country or Flag"
              />
            </VStack>
          </GridItem>
        </SimpleGrid>
      )}
      {!waiting && error && <span>ERROR: {error}</span>}
    </Box>
  );
}

export default Challenge;
