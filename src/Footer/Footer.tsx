import { Box, Flex, Container, Link, Spacer } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { openSeaCollection } from "../utils/links";

function Footer() {
  return (
    <Container maxWidth="130ch" marginBottom={5} marginTop={5}>
      <Flex direction="row">
        <Box p={2}>
          <Link href={openSeaCollection()} isExternal>
            OPENSEA
          </Link>
        </Box>
        <Spacer />
        <Box p={2}>
          <NavLink to="/about">ABOUT</NavLink>
        </Box>

        <Spacer />
        <Box p={2}>
          <NavLink to="/rules">RULES</NavLink>
        </Box>

        <Spacer />
        <Box p={2}>
          <NavLink to="/prize">PRIZE</NavLink>
        </Box>

        <Spacer />
        <Box p={2}>
          <NavLink to="/ties">TIES</NavLink>
        </Box>

        <Spacer />
        <Box p={2}>
          <NavLink to="/peace">PEACE</NavLink>
        </Box>
      </Flex>
    </Container>
  );
}

export default Footer;
