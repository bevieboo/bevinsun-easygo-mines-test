# A Game of 💎 Mines 💣

![image](https://user-images.githubusercontent.com/10612526/224227564-78c1bf2c-69e1-4316-a379-8c3074df1a08.png)

## Installation

```bash
yarn install
```

## Game play

- Click `Bet` to play new game.
- Board consists of 5 hidden mines on a 5x5 grid.
- The game ends when you reveal a mine 💣.
- You can `Cash Out` any time with the minimum of one revealed tile 💎 on the board.
- The board will be revealed when you reveal a mine or at cash out.
- Hit `Play Again` to reset the game.
- Good luck!

## Could have done better

I would like to have made the number of mines dynamic, but I ran out of time. (Also it says in the api.ts file `DO NOT CHANGE THIS FILE`).

- I would create a dropdown list for a min of 5 mines (default value) to max of 24 mines.
- User can select number of mines in the dropdown to start the game, and on clicking the `Bet` button, sending a post request to the api with the number of mines in the payload.

The styled components could also go into its own separate component/folder.
