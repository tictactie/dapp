import { useState, useEffect } from "react";
import "./App.css";
import useCachedConnection from "../hooks/useCachedConnection";
import useEthereum from "../hooks/useEthereum";
import UserInfo from "../UserInfo/UserInfo";
import NetworkStatus from "../NetworkStatus/NetworkStatus";
import Mint from "../Mint/Mint";
import Header from "../Header/Header";
import Body from "../Body/Body";
import {
  SimpleGrid,
  Box,
  AspectRatio,
  Container,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";

function App() {
  const cachedConnection = useCachedConnection();
  const [didConnect, setDidConnect] = useState<boolean>(cachedConnection);
  const [provider, signer, network, rejected] = useEthereum(didConnect);
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    (async () => {
      const newAddress = await signer?.getAddress();
      setAddress(newAddress);
      console.log(newAddress);
    })();
  }, [signer]);

  useEffect(() => {
    (async () => {
      setDidConnect(provider !== undefined || cachedConnection);
    })();
  }, [provider, rejected, cachedConnection]);

  return (
    <div className="App">
      <NetworkStatus network={network} />
      <Container maxWidth="100ch">
        <Header />
        <Body />
      </Container>
      {provider === undefined && (
        <button onClick={() => setDidConnect(true)}>Connect</button>
      )}
      <Mint provider={provider} signer={signer} />
      <UserInfo address={address} />
    </div>
  );
}

export default App;
