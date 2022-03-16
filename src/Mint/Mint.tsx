import { useState, useEffect } from "react";
import "./Mint.css";
import { Button } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { tokenIdToCountry } from "../utils/countries";

type MintProps = {
  tokenId: number;
  minted: boolean;
  setJustMinted: (didMint: boolean) => void;
  setTokenId: (tokenId: number) => void;
  contract: Contract | undefined;
};
function Mint(props: MintProps) {
  const [contract, setContract] = useState<Contract>();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState<number>(0);
  const [minted, setMinted] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);

  useEffect(() => {
    setMinted(props.minted);
  }, [props.minted]);

  useEffect(() => {
    setTokenId(props.tokenId);
  }, [props.tokenId]);

  async function mint(tokenId: number) {
    if (contract) {
      try {
        setError(undefined);
        const tx = await contract.mint(tokenId, {
          value: ethers.utils.parseEther(
            process.env.REACT_APP_PRICE || "0.001"
          ),
          from: await contract.signer.getAddress(),
        });

        setMinting(true);
        await tx.wait(1);
        setMinting(false);
        props.setJustMinted(true);
        props.setTokenId(tokenId);
      } catch (e) {
        if (typeof e === "string") {
          const errorStarts = e.indexOf("error=") + 6;
          const errorEnds = e.indexOf(",code=");

          setError(e.substring(errorStarts, errorEnds));
        } else if (e instanceof Error) {
          const errorStarts = e.message.indexOf("error=") + 6;
          const errorEnds = e.message.indexOf(", code=");
          const errorObj = JSON.parse(
            e.message.substring(errorStarts, errorEnds)
          );
          setError(errorObj["data"]["originalError"]["message"]);

          //setError(e.message);
        }
      }
    }
  }

  return (
    <div className="Mint">
      <Button
        onClick={() => mint(tokenId)}
        height="20px"
        width="100%"
        isDisabled={minted || !contract}
        isLoading={minting}
      >
        {tokenIdToCountry(tokenId)}
        {/*minted ? "TAKEN." : "MINT!"*/}
      </Button>
      <br />
      {!minting && error && <span>ERROR: {error}</span>}
    </div>
  );
}

export default Mint;
