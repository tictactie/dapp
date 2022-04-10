import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { JsonRpcSigner } from "@ethersproject/providers/src.ts";
import { Contract } from "ethers";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS!;

const ABI = [
  "function mint(uint256) public payable",
  "function tokenURI(uint256) public view returns (string memory)",
  "function mintable() public view returns (uint256)",
  "event Transfer(address indexed, address indexed, uint)",
  "event DidWin(address indexed from, uint256 indexed winningBoard, uint256 indexed losingBoard)",
  "event DidTie(address indexed from, uint256 indexed board1, uint256 indexed board2)",
  "function getOpponent(uint256 boardIndex) public view returns (uint256)",
  "function expiryBlock(uint256) public view returns (uint256)",
  "function balanceOf(address) public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function challenge(uint256, uint256) public",
  "function isBoardTurn(uint256) public view returns (bool)",
  "function getAllBoardsSVG() public view returns (string[70] memory)",
  "function play(uint256, uint16) public",
  "function mintableTies(uint256) public view returns (uint256)",
  "function mintTie(uint256 boardIndex) payable public",
  "function victories(uint256) public view returns (uint256)",
  "function whoAbandoned(uint256 boardIndex) public view returns (uint256)",
  "function endGame(uint256 boardIndex) public",
  "function redeemFinalPrize(uint256 boardIndex) external",
];

function useEthereum(
  requiresConnection: boolean
): [
  provider: JsonRpcProvider | undefined,
  signer: JsonRpcSigner | undefined,
  network: string | undefined,
  contract: Contract | undefined,
  rejected: boolean
] {
  const [provider, setProvider] = useState<JsonRpcProvider | undefined>();
  const [contract, setContract] = useState<Contract>();
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>();
  const [accounts, setAccounts] = useState<string[]>();
  const [rejected, setRejected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>();
  const [network, setNetwork] = useState<string>();

  useEffect(() => {
    (async () => {
      async function resetSigner() {
        try {
          const newSigner = provider?.getSigner();
          await newSigner?.getAddress();
          setSigner(newSigner);
        } catch {
          setProvider(undefined);
          setSigner(undefined);
        }
      }

      await resetSigner();
    })();
  }, [provider, accounts]);

  useEffect(() => {
    (async () => {
      const networkName = (await provider?.getNetwork())?.name;
      setNetwork(networkName);
    })();
  }, [chainId, provider]);

  useEffect(() => {
    (async () => {
      if (requiresConnection) {
        async function init() {
          try {
            const INFURA_ID = process.env.REACT_APP_INFURA_ID;

            const providerOptions = {
              walletconnect: {
                package: WalletConnectProvider,
                options: {
                  infuraId: INFURA_ID,
                },
              },
            };

            const web3Modal = new Web3Modal({
              network: "any",
              cacheProvider: true,
              providerOptions,
            });

            const instance = await web3Modal.connect();
            setRejected(false);

            const newProvider = new Web3Provider(instance, "any");
            setProvider(newProvider);

            instance.on("accountsChanged", async (accounts: string[]) => {
              setAccounts(accounts);
            });

            instance.on("chainChanged", async (chainId: number) => {
              setChainId(chainId);
            });
          } catch {
            setRejected(true);
          }
        }

        await init();
      } else {
        setProvider(undefined);
      }
    })();
  }, [requiresConnection]);

  useEffect(() => {
    (async () => {
      const contract = signer
        ? new Contract(CONTRACT_ADDRESS, ABI, signer)
        : undefined;
      setContract(contract);
    })();
  }, [signer]);

  return [provider, signer, network, contract, rejected];
}

export default useEthereum;
