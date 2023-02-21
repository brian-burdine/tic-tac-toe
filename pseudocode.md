# Tic-Tac-Toe

## Goals
Display a game of tic-tac-toe between two players in a single HTML page. Render an empty play field when the page first loads, then allow the first player to click on an empty square to place their mark. Placing a mark removes the square from the list of possible moves and takes away the ability to click on it. After a move is registered, check to see if it ended the game, either by:
  - winning the round by connecting three of that player's marks in a continuous sequence, or 
  - filling all 9 of the available squares without either player achieving a win. 

If the game has ended, tell the players who won or if the game was a tie. If it hasn't ended, instead tell the players that it is the other player's turn, and allow them to place a mark. 

All of the elements of the game are rendered with JavaScript. In addition to the game, also render a button that allows the players to reset the game, rendering a new instance of tic-tac-toe without reloading the page.

## Page Structure
The HTML page created by startGame will look a little like:
```
<div class='container' id ='app'>
    <header>
        <div class='row' id='title'>
            <div class='col'>
                <h1></h1>
            </div>
        </div>
    </header>
    <main>
        <div class='row' id='player-msg'>
            <div class='col'>
                <h2></h2>
            </div>
        </div>
        <div class='row' id='game'>
            <div class='col'>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                         <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class='row' id='end-msg'>
            <div class='col'>
                <h2></h2>
            </div>
        </div>
        <div class='row' id='reset'>
            <div class='col'>
                <button></button>
            </div>
        </div>
    </main>
</div>
```

## Variables

- board: array with nine entries, initially all empty strings
- moves: array with initially zero entries, contains the index of the last move on the board
- remainingMoves: array with initially nine entries, contains positions on the board which are removed when a move is made (to be used later, potentially)

-player1Symbol: the symbol used for marking Player 1's squares, 'O' by default
-player2Symbol: the symbol used for marking Player 1's squares, 'X' by default
## Functions

- startGame
- makeMove
- checkForEnd
- switchPlayer
- endGame
## Procedure