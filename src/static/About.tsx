import { Container } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <Container>
      TicTacTie was born from the idea of (nomi?), two developers/creatives
      based in Germany and Italy, with the help and support of a small crew of
      Europe-based friends, crypto-enthusiasts and digital artists. The aim is
      to put on the NFT space a light, easy and addictively fun game for people
      to <NavLink to="/rules">play</NavLink>. What can be better than the
      classic TicTacToe we all used to play since we were kids? This is what
      they thought, and this is what they did. Follow @TicTacTieNFT on Twitter
      to share your feedbacks, get to know the team better and find out more
      about future developments of the project.
      <NavLink to="/peace">Play games, not war</NavLink>.
    </Container>
  );
}

export default About;
