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
            <div class='col-5'>
                <h3 id='left-msg'>Player 1's turn</h3>
            </div>
            <div class='col-2'>
                <h2 id='center-msg'>O</h2>
            </div>
            <div class='col-5'>
                <h3 id='right-msg' class='d-none'>Player 2's turn</h3>
            </div>
        </div>
        <div class='row' id='game'>
            <div class='col'>
                <table>
                    <tbody>
                        <tr>
                            <td id='0'></td>
                            <td id='1'></td>
                            <td id='2'></td>
                        </tr>
                        <tr>
                            <td id='3'></td>
                            <td id='4'></td>
                            <td id='5'></td>
                        </tr>
                         <tr>
                            <td id='6'></td>
                            <td id='7'></td>
                            <td id='8'></td>
                        </tr>
                    </tbody>
                </table>
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

- *board*: array with nine entries, initially all empty strings
- *moves*: array with initially zero entries, contains the index of the last move on the board
- *remainingMoves*: array with initially nine entries, contains positions on the board which are removed when a move is made (to be used later, potentially)
- *winningMoves*: by default, contains false, indicating that no winning move has been made; if a win has been detected, its value becomes an array with the id of the squares containing a winning sequence as values

- *player1Symbol*: the symbol used for marking Player 1's squares, 'X' by default
- *player2Symbol*: the symbol used for marking Player 1's squares, 'O' by default
## Functions

- **startGame**()
  - When called, creates the HTML page for the application: The title, a message indicating whose turn it is and what their symbol is, an empty game board with a 3x3 table, a hidden ending message, and a button to reset the game. The cells of the table will have event listeners set to call **makeMove** when clicked. I think that the reset button can probably use **startGame** as a callback function.
  - Procedure: 
    - START **startGame**
    - GET a reference to the div element with the id 'app', call it *app*
    - SET *board* to an array with nine empty strings as values
    - SET *moves* to an empty array
    - SET *remainingMoves* to an array with the numbers 0-8 as values
    - END **startGame**
- **makeMove**(*event*)
  - When called, updates the board by marking the target square with the current player's symbol and removing it from future moves. If the amount of moves is greater than or equal to 5, **checkForWin** is called to see if the game ended with the latest move. If the last move won the game, or if the 9th square was filled, **endGame** is called. If the game didn't end, **switchPlayer** is called to change the displayed player.
  - Procedure:
    - START **makeMove**
    - GET the id of the target square, convert it to a number, and store it in *moves*
    - SET *remainingMoves* to itself with the last move filtered out
    - IF the length of *moves* is odd 
      - SET the value of *board* at the position of the last move to *player1Symbol*
    - ELSE
      - SET the value of *board* at the position of the last move to *player2Symbol*
    - ENDIF
    - SET the inner text of the target square to the value of board in the position of the last move
    - REMOVE the event listener on the target square that listens for a `click` event and calls **makeMove**
    - IF the length of *moves* is 5 or greater
      - CALL **checkForWin** and store its value in *winningMoves*
    - END IF
    - IF *winningMoves* is true/contains values, or the length of *moves* is 9
      - CALL **endGame** with *winningMoves* as an argument
    - ELSE
      - CALL **switchPlayer**
    - END IF
    - END **makeMove**
- **checkForWin**()
  - When called, checks the current state of the board to see if the last move ended the game. If the last move was an odd square, its row and column are checked to see if each square contains the same symbol. If the last move was an even square, then additionally the diagonals are checked. If a winning sequence was found in any of those, **checkForWin** returns an array with the winning squares as values. If no winning sequence was found, **checkForWin** returns `false`.
  - Procedure: 
- **switchPlayer**()
  - When called, changes the displayed message above the game board from "Player (previous player)'s Turn" to "Player (other player)'s Turn". Most of the logic for deciding whose turn it is comes from the number of moves made, rather than flagging the current player, so this function doesn't do much currently, but if I add a computer opponent feature this might call a function to handle the computer's turn.
  - Procedure:
    - START **switchPlayer**
    - GET a reference to the heading element in the left column of the message row, call it *leftMessage*
    - GET a reference to the heading element in the center column of the message row, call it *centerMessage*
    - GET a reference to the heading element in the right column of the message row, call it *rightMessage*
    - IF number of moves is even
      - SET *leftMessage*'s class to 'd-block'
      - SET *centerMessage*'s inner text to *player1Symbol*
      - SET *rightMessage*'s class to 'd-none'
    - ELSE
      - SET *leftMessage*'s class to 'd-none'
      - SET *centerMessage*'s inner text to *player2Symbol*
      - SET *rightMessage*'s class to 'd-block'
    - ENDIF
    - END **switchPlayer**
- **endGame**(win)
  - When called, ends the game of tic-tac-toe. If a winning sequence was passed, change the player message to "Player (current player) won!", and highlight the winning squares. Otherwise, change the player message to "Tie game!" or something. Then, if there are still open squares remaining, loop through the remaining squares to remove their event handler.
  - Procedure:
    - START **endGame**
    - GET a reference to the heading element in the left column of the message row, call it *leftMessage*
    - SET *leftMessage*'s class to *d-none*
    - SET *leftMessage*'s parent's class to *col-2*
    - GET a reference to the heading element in the center column of the message row, call it *centerMessage*
    - SET *centerMessage*'s parent's class to *col-8 text-center*
    - GET a reference to the heading element in the right column of the message row, call it *rightMessage*
    - SET *rightMessage*'s class to *d-none*
    - SET *rightMessage*'s parent's class to *col-2*
    - IF *win* is true/contains values
      - IF the value of *board* at the first value of *win* is equal to *player1Symbol* 
        - SET *centerMessage*'s inner text to "Player 1 wins!"
      - ELSE
        - SET *centerMessage*'s inner text to "Player 2 wins!"
      - ENDIF
      - IF *remainingMoves* contains values
        - FOR each move in *remainingMoves*
          - GET a reference to the square with the id of the move and REMOVE the event listener on that square that listens for a `click` event and calls **makeMove**
        - ENDFOR
      - ENDIF
    - ELSE
      - SET *centerMessage*'s inner text to "Tie game!" or an equivalent message
    - ENDIF
    - END **endGame**
## Procedure