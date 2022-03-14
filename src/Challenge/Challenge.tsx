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

type ChallengeProps = {
  contract: Contract | undefined;
  tokenId: number;
};

function Challenge(props: ChallengeProps) {
  const [contract, setContract] = useState<Contract>();
  const [tokenId, setTokenId] = useState<number>();
  const imageSVG = useImageSVG(contract, tokenId);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

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
                backgroundColor="rgba(255,255,255,0.8)"
                colorScheme="black"
                variant="outline"
                height="40px"
                width="100%"
              >
                CHALLENGE
              </Button>
              <Input
                backgroundColor="rgba(255,255,255,0.8)"
                borderColor="black"
                height="50px"
                placeholder="Player Name"
              />
            </VStack>
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Challenge;
