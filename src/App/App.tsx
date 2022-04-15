import { useState, useEffect } from "react";
import "./App.css";
import useCachedConnection from "../hooks/useCachedConnection";
import useEthereum from "../hooks/useEthereum";
import useEthereumReadOnly from "../hooks/useEthereumReadOnly";
import UserInfo from "../UserInfo/UserInfo";
import NetworkStatus from "../NetworkStatus/NetworkStatus";
import Body from "../Body/Body";
import { Container } from "@chakra-ui/react";

function App() {
  const cachedConnection = useCachedConnection();
  const [didConnect, setDidConnect] = useState<boolean>(cachedConnection);
  const [provider, signer, network, contract, rejected] =
    useEthereum(didConnect);
  const [contractReadOnly] = useEthereumReadOnly();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    (async () => {
      const newAddress = await signer?.getAddress();
      setAddress(newAddress);
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
      <Container maxWidth="130ch">
        <Body
          signer={signer}
          contract={contract}
          contractReadOnly={contractReadOnly}
          setDidConnect={setDidConnect}
          didConnect={provider !== undefined}
        />
      </Container>
      <UserInfo address={address} />
    </div>
  );
}

export default App;