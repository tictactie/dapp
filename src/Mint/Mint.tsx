import { useState, useEffect } from "react";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import "./Mint.css";
import { Contract, ContractReceipt, ethers, BigNumber } from "ethers";

type MintProps = {
  provider: JsonRpcProvider | undefined;
  signer: JsonRpcSigner | undefined;
};

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!;

const ABI = [
  "function mint() public payable",
  "function tokenURI(uint256) public view returns (string memory)",
  "event Transfer(address indexed, address indexed, uint)",
];

function Mint(props: MintProps) {
  const [contract, setContract] = useState<Contract>();
  const [provider, setProvider] = useState<JsonRpcProvider>();
  const [address, setAddress] = useState<string>();
  const [minting, setMinting] = useState(false);
  const [tokenId, setTokenId] = useState<string>();
  const [imageUri, setImageUri] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    setProvider(provider);
  }, [props.provider]);

  useEffect(() => {
    (async () => {
      const signer = props.signer;
      setAddress(await signer?.getAddress());
      const contract = signer
        ? new Contract(CONTRACT_ADDRESS, ABI, signer)
        : undefined;
      setContract(contract);
      setTokenId(undefined);
    })();
  }, [props.signer, CONTRACT_ADDRESS, ABI]);

  useEffect(() => {
    (async () => {
      if (contract && tokenId) {
        const metadataResponse = await fetch(await contract?.tokenURI(tokenId));
        const metadata = await metadataResponse.json();
        setImageUri(metadata["image"]);
      }
    })();
  }, [tokenId]);

  async function mint() {
    if (contract) {
      try {
        setError(undefined);
        const tx = await contract.mint({
          value: ethers.utils.parseEther("0.01"),
          from: address,
        });

        setMinting(true);
        const receipt = await tx.wait(1);
        setMinting(false);

        function getTokenId(receipt: ContractReceipt) {
          console.log(receipt);
          const filter = contract?.filters.Transfer()!;
          for (const e of receipt.events || []) {
            if (
              e.address === filter.address &&
              e.topics[0] === filter.topics![0]
            ) {
              return e.topics[3];
            }
          }
          throw new Error("transfer not found");
        }

        const newTokenId = getTokenId(receipt);
        console.log(tokenId);
        console.log(newTokenId);
        setTokenId(BigNumber.from(newTokenId).toString());
      } catch (e) {
        if (typeof e === "string") {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
  }

  return (
    <div className="Mint">
      {address && (
        <button onClick={() => mint()} disabled={minting}>
          Mint
        </button>
      )}
      {minting && <div>Minting in progress...</div>}
      <br />
      {!minting && tokenId && (
        <span>
          Check your last token on{" "}
          <a
            target="_blank"
            href={`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId}`}
          >
            Opensea
          </a>
          <br />
          <img width="300" src={imageUri} />
        </span>
      )}
      <br />
      {!minting && error && <span>ERROR: {error}</span>}
    </div>
  );
}

export default Mint;
