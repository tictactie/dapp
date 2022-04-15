import {
  Container,
  Text,
  Heading,
  ListItem,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Rules() {
  return (
    <Container>
      <br />
      <Heading>Rules</Heading>
      <br />
      <Text>
        On top of the rules of the tic tac toe (that all of you probably already
        know), there are some additional things to keep in mind, specific to
        this version:
      </Text>
      <br />
      <Heading size="md">How can I play?</Heading>
      <UnorderedList>
        <ListItem>You need to mint or buy a board</ListItem>
        <ListItem>
          You first need to challenge someone, or wait to be challenged by
          someone
        </ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">Who can I challenge?</Heading>
      <UnorderedList>
        <ListItem>Any board that is not playing</ListItem>
        <ListItem>Any board that has an owner (no "MINT" button)</ListItem>
        <ListItem>
          You cannot challenge yourself or someone you just challenged
        </ListItem>
        <ListItem>You cannot challenge someone you just challenged</ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">Is there a time limit?</Heading>
      <UnorderedList>
        <ListItem>There is a limited amount of time to make a move</ListItem>
        <ListItem>The first game is 12h per turn</ListItem>
        <ListItem>
          After each tie, the time halven, down to a minimum of 30 minutes per
          turn
        </ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">What happens if I make a tie</Heading>
      <UnorderedList>
        <ListItem>You will restart the game with the same opponent</ListItem>
        <ListItem>The turn time will be half of what was previously</ListItem>
        <ListItem>
          You and your opponent will be granted with a ticket to mint one of
          unique NFTs of the Ties collection (only 420 pieces)
        </ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">What happens if I win?</Heading>
      <UnorderedList>
        <ListItem>You gain a level</ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">What happens if I lose?</Heading>
      <UnorderedList>
        <ListItem>You lose a level</ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">What happens when my time is up?</Heading>
      <UnorderedList>
        <ListItem>
          You lose. You or your opponent will have to declare to end of the game
          for any of you to continue
        </ListItem>
        <ListItem>
          Anyone really could declare the end of the game (call "endGame" on
          etherscan)
        </ListItem>
      </UnorderedList>
      <Heading size="md">What happens when my time is up?</Heading>
      <UnorderedList>
        <ListItem>
          You lose. You or your opponent will have to declare to end of the game
          for any of you to continue
        </ListItem>
        <ListItem>
          Anyone really could declare the end of the game (call "endGame" on
          etherscan)
        </ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">What's the purpose of the levels?</Heading>
      <UnorderedList>
        <ListItem>
          Levels are a way to identify how many games you have won. At level 5
          you can mint the <NavLink to="/prize">Grand Prize</NavLink>
        </ListItem>
        <ListItem>
          The higher the level means you will get more chances to start a game
          first.
        </ListItem>
        <ListItem>
          Also, another plus: levels give you a little pride, as you can show
          off a more colorful board if the level is higher.
        </ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">
        What happens after someone reaches level 5 and gets the grand prize?
      </Heading>
      <UnorderedList>
        <ListItem>
          We could propose a new grand prize to the TicTacToe community and
          start a new tournament.
        </ListItem>
      </UnorderedList>
      <br />
      <Heading size="md">What happens if I have another question?</Heading>
      <UnorderedList>
        <ListItem>
          You write a message to our Twitter user:{" "}
          <Link href="https://twitter.com/@tictactienft">@TicTacTieNFT</Link>
        </ListItem>
        <ListItem>
          You write an email to tictactie [at] posteo [dot] eu
        </ListItem>
      </UnorderedList>
    </Container>
  );
}

export default Rules;
