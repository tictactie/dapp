import { useState, useEffect } from "react";
import "./NetworkStatus.css";

type NetworkStatusProps = {
  network: string | undefined;
};

function NetworkStatus(props: NetworkStatusProps) {
  const NETWORK = process.env.REACT_APP_NETWORK;

  const [network, setNetwork] = useState<string>();

  useEffect(() => {
    setNetwork(props.network);
  }, [props.network]);

  function isError() {
    return NETWORK !== network && network !== undefined;
  }

  return (
    <div className="NetworkStatus" hidden={!isError()}>
      {isError() && (
        <div className="error-banner">
          <span className="error-text">
            You are connected to {network} whilst you should be connected to{" "}
            {NETWORK}
          </span>
        </div>
      )}
    </div>
  );
}

export default NetworkStatus;
