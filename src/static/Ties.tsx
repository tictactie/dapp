import { Container, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Ties() {
  return (
    <Container>
      While developing the <NavLink to="/rules">gmae</NavLink>, an idea crossed
      the creators' minds: “What if we make it even more fun by giving something
      special even if you don't win?” And here is how the concept of tie was
      born. Making a tie (or draw) is usually boring and a bit frustrating, but
      in this game this is the best part! And what can be better than winning an
      actual NFT-tie, a unique piece of digital art to collect and add to your
      wallet? (You got the pun? Make a tie, get a tie!) While you play your
      games in order to win the <NavLink to="/prize">big prize</NavLink>,
      whenever you make a tie you and your opponent will get the chance to mint
      each one a unique NFT representing tie. Different color combinations and
      different animations for over 420 unique pieces that will bring elegance
      to your OpenSea wallet (LINK a il nostro OpenSea? o a un qualcosa che ti
      fa vedere le cravatte su OpenSea boh…). Each single tie will also have a
      small <NavLink to="/peace">peace flag</NavLink> in it, to spread one loud
      and colorful message across the NFT space: play games, not war. Follow
      <Link href="https://twitter.com/@TicTacTieNFT" isExternal>
        @TicTacTieNFT
      </Link>{" "}
      on Twitter to find out more about the future developments of the project.
      Maybe one day our awesome ties will become a real-life thing to wear!{" "}
    </Container>
  );
}

export default Ties;
