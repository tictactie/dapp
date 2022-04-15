import { Container, Heading, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <Container>
      <br />
      <Heading>About</Heading>
      <br />
      TicTacTie was born from a delirious discussion between{" "}
      <Link href="https://twitter.com/the_innerspace">
        Inner Space
      </Link> and{" "}
      <Link href="https://twitter.com/Delirium_Tre">Delirium Tremens</Link>, two
      creatives based in Germany and Italy, with the help and support of a small
      crew of Europe-based friends, crypto-enthusiasts and digital artists.
      <br /> <br />
      The aim was to show the power of on-chain NFTs off, while bringing to the
      space a fun and addictive game and a message of peace.
      <br />
      <br />
      What can be better than the classic Tic Tac Toe we all used to play since
      we were kids? This is what they thought, and this is what they did.
      <br />
      <br />
      The owners of each board will be able to play against each others, race
      for the <NavLink to="/prize">final price</NavLink> and, in the meanwhile,
      win Ties from the unique NFT collection <b>hidden behind the game</b>.
      <br />
      <br />
      One more detail: the code to play has been optimized to the maximum
      extent. Hence making a move should be, with gas price in the lower range,
      a quite cheap operation. <b>The cost for a move is around 50k gas</b>.
      <br />
      <br />
      Follow <Link href="https://twitter.com/tictactienft">
        @TicTacTieNFT
      </Link>{" "}
      on Twitter to share your feedbacks, get to know the team better and find
      out more about future developments of the project.
      <br />
      <br />
      <NavLink to="/peace">Play games, not war</NavLink>.
    </Container>
  );
}

export default About;
