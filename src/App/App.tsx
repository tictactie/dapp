import { useState, useEffect } from "react";
import "./App.css";
import useCachedConnection from "../hooks/useCachedConnection";
import useEthereum from "../hooks/useEthereum";
import useEthereumReadOnly from "../hooks/useEthereumReadOnly";
import UserInfo from "../UserInfo/UserInfo";
import NetworkStatus from "../NetworkStatus/NetworkStatus";
import Body from "../Body/Body";
import { Container, Text, Link, Divider } from "@chakra-ui/react";
import FollowUs from "../Follow/Follow";
import { NavLink } from "react-router-dom";

function App() {
  const cachedConnection = useCachedConnection();
  const [didConnect, setDidConnect] = useState<boolean>(cachedConnection);
  const [provider, signer, network, contract, rejected] =
    useEthereum(didConnect);
  const [contractReadOnly, prizeContractReadOnly] = useEthereumReadOnly();
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
          prizeContractReadOnly={prizeContractReadOnly}
          setDidConnect={setDidConnect}
          didConnect={provider !== undefined}
        />
      </Container>
      {address && <UserInfo address={address} />}
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <Text padding="10px" as="i">
        <b>Art inspires people, money make them strive</b>. So with money we
        will try to help the cause: <br />
        we have let the <b>ties free to mint</b> so to allow everyone to make a
        voluntary donation upon minting.
        <br />
        <b>
          100% of these fee-donations will be given to{" "}
          <Link href="https://meduza.io/en">Meduza</Link>
        </b>
        , an indipendent publication that brings subjective and unbiased news to
        Russian youth
      </Text>
      <br />
      <br />
      <NavLink to="/peace">Read more about our message...</NavLink>
      <br />
      <br />
      <Divider />
      <br />
      <FollowUs />
    </div>
  );
}

export default App;
