import { Container, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Peace() {
  return (
    <Container>
      When conceiving the idea of the first NFT-based Tic Tac Toe game where
      users actually own and get to keep the board, Russia started the invasion
      of Ukraine and the horrible war began. So the idea immediately change into
      something more than just a <NavLink to="/rules">game</NavLink>: a way to
      literally paint the NFT space with the colors of peace. TicTacTie boards
      and all the game's graphics are based off the 7 colors of the peace flag.
      All the collectable <NavLink to="/ties">NFT-ties</NavLink> will bring
      small peace flags across NFT wallets all around the world. The whole world
      is what this game wants to reach: each board has the name and flag of a
      country that was involved in WW2. Let's use those flags to play a fun game
      where winning is cool, but making ties and making friends is even more
      important! But world peace is more than just a concept: we have let the
      ties free to mint so to allow everyone to make a voluntary donation upon
      minting. 100% of these profits will be donated to{" "}
      <Link href="https://meduza.io/en">Meduza</Link>, an indipendent
      publication that brings subkective and unbiased news to Russian youth
      about what's going on. Each problem has short term and long term solution,
      and we thought that supporting good information is a way to prevent future
      support for atrocity like the ones we are experiencing today. <br />
      Play games, not war.
      <br />
      <br />
      PS: Feel free to donate more at{" "}
      <Link href="https://support.meduza.io/en">they website.</Link>.
    </Container>
  );
}

export default Peace;
