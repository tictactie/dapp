import { Container, Link, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Peace() {
  return (
    <Container>
      <br />
      <Heading>Peace</Heading>
      <br />
      When conceiving the idea of the first NFT-based Tic Tac Toe game where
      users actually own and get to keep the board, Russia started the invasion
      of Ukraine and the horrible war began.
      <br />
      <br />
      So the idea immediately changed into something more than just a{" "}
      <NavLink to="/rules">game</NavLink>: a way to literally{" "}
      <b>paint the NFT space with the colors of peace.</b>
      <br />
      <br />
      TicTacTie boards and all the game graphics are based off the 7 colors of
      the <b>peace flag</b>. All the collectable{" "}
      <NavLink to="/ties">NFT-ties</NavLink> will bring small peace flags across
      the NFT wallets all around the world.
      <br />
      <br />
      The whole world is what this game wants to reach: each board has the name
      and flag of a country that was involved in WW2.
      <br />
      <br />
      <b>
        Imagine if world leaders would settle their disputes with a Tic Tac Toe
        game?
      </b>
      <br />
      <br />
      Let's play tic tac toe all together and conjure away the chance of another
      world conflict.
      <br />
      <br />
      <b>Art inspires people, money make them strive</b>. So with money we will
      try to help the cause: we have let the <b>ties free to mint</b> so to
      allow everyone to make a voluntary donation upon minting.
      <br />
      <br />
      <b>
        100% of these profits will be donated to{" "}
        <Link href="https://meduza.io/en">Meduza</Link>
      </b>
      , an indipendent publication that brings subjective and unbiased news to
      Russian youth.
      <br />
      <br />
      Each problem has short term and long term solutions, and we thought that
      supporting good information is a way to prevent future support for
      atrocities like the ones we are experiencing today. <br />
      <br />
      Make ties, not war.
      <br />
      <br />
      PS: Feel free to donate more at{" "}
      <Link href="https://support.meduza.io/en">their website</Link>.
    </Container>
  );
}

export default Peace;
