import { AspectRatio, Box } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import useImageSVG from "../hooks/useImageSVG";

type BoardProps = {
  contract: Contract | undefined;
  tokenId: number;
  round: number;
  opponent: number | undefined;
};

function Board(props: BoardProps) {
  const [contract, setContract] = useState<Contract>();
  const [tokenId, setTokenId] = useState<number>();
  const imageSVG = useImageSVG(contract, tokenId, props.round, props.opponent);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  function renderContent() {
    if (imageSVG) {
      return <span dangerouslySetInnerHTML={{ __html: imageSVG }} />;
    } else {
      return <Box borderWidth={2} borderColor="black" />;
    }
  }

  return (
    <Box>
      <AspectRatio ratio={1}>{renderContent()}</AspectRatio>
    </Box>
  );
}

export default Board;
