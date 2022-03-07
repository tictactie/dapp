import { useState, useEffect } from "react";
import "./UserInfo.css";

type UserInfoProps = {
  address: string | undefined;
};

function UserInfo(props: UserInfoProps) {
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    setAddress(props.address);
  }, [props.address]);

  return (
    <div className="UserInfo">
      <span>Connected account: {address}</span>
    </div>
  );
}

export default UserInfo;
