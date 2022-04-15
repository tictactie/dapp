import {
  Box,
  Button,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { openSeaProfile } from "../utils/links";
import { NavLink } from "react-router-dom";

type RightPanelProps = {
  contract: Contract | undefined;
  setDonation: (donation: string) => void;
  donation: string;
};

function RightPanel(props: RightPanelProps) {
  const [address, setAddress] = useState<string>();
  const [fee, setFee] = useState<string>("0.0");
  const handleChange = (value: string) => setFee(value);

  useEffect(() => {
    (async () => {
      if (props.contract) {
        setAddress(await props.contract.signer.getAddress());
      }
    })();
  }, [props.contract]);

  function handleClick() {
    if (fee) {
      props.setDonation(fee);
    }
  }

  function renderContainer() {
    if (props.contract) {
      return (
        <Flex textAlign="right" direction="column" lineHeight={6}>
          <Spacer />
          {address && (
            <Box>
              Check your ties on{" "}
              <Link color="blue.500" href={openSeaProfile(address)} isExternal>
                OpenSea.
              </Link>{" "}
            </Box>
          )}
          <Box>
            <NavLink to="/peace">Set a donation</NavLink> when you mint a tie.
          </Box>
          <Box>
            100% of these fees will go to{" "}
            <Link href="https://meduza.io/en" isExternal>
              Meduza
            </Link>
            .
          </Box>
          <Box>Current minting fee: {props.donation} ETH</Box>
          <Flex>
            <Spacer />
            <Button
              onClick={handleClick}
              fontSize={12}
              width="30%"
              marginRight={2}
              height={7}
            >
              SAVE
            </Button>
            <NumberInput
              onChange={handleChange}
              defaultValue={0}
              precision={3}
              min={0}
              step={0.001}
              width="35%"
              height={7}
            >
              <NumberInputField height={7} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
      );
    } else {
      return <Box></Box>;
    }
  }

  return renderContainer();
}

export default RightPanel;
