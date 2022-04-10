import { Container, Image, Link, Box } from "@chakra-ui/react";

function Prize() {
  return (
    <Container>
      <br></br>
      <Box>
        The first player making 5 victories in a row will be able to claim a
        piece of fine NFT Art: <br />
        <br />
        <b>Homage #107</b> by{" "}
        <Link
          style={{ textDecoration: "underline dotted" }}
          href="https://www.newrafael.com/"
          isExternal
        >
          Rafaël Rozendaal
        </Link>
        <br />
        (collection{" "}
        <Link
          style={{ textDecoration: "underline dotted" }}
          href="https://opensea.io/collection/homage-by-rafael-rozendaal"
        >
          Homage
        </Link>
        , 2022)
      </Box>
      <br />
      <Box>
        <Image src="https://openseauserdata.com/files/342e67392cfebd08cf015c0e9b316e17.svg"></Image>
      </Box>
      <br />
      The NFT has been bought by the creators of TicTacTie and transferred to
      the TicTacTie contract address. No one but the winner will be able to
      claim it.
    </Container>
  );
}

export default Prize;
