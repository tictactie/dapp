import {
  Container,
  Heading,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Follow() {
  return (
    <Container>
      <br />
      <Heading>Follow us</Heading>
      <br />
      <br />
      You can find all of us on Twitter! Soon maybe Discord too (if you want to
      help us mod, let us know).
      <br />
      <br />
      <UnorderedList>
        <ListItem>
          <Link href="https://twitter.com/the_innerspace">Inner Space</Link>
        </ListItem>
        <ListItem>
          <Link href="https://twitter.com/Delirium_Tre">Delirium Tremens</Link>
        </ListItem>
        <ListItem>
          <Link href="https://twitter.com/tictactienft">
            Official TicTacTie profile
          </Link>
        </ListItem>
      </UnorderedList>
    </Container>
  );
}

export default Follow;
