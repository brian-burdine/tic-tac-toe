# Tic-Tac-Toe

## Goals
Display a game of tic-tac-toe between two players in a single HTML page. Render an empty play field when the page first loads, then allow the first player to click on an empty square to place their mark. Placing a mark removes the square from the list of possible moves and takes away the ability to click on it. After a move is registered, check to see if it ended the game, either by:
  - winning the round by connecting three of that player's marks in a continuous sequence, or 
  - filling all 9 of the available squares without either player achieving a win. 

If the game has ended, tell the players who won or if the game was a tie. If it hasn't ended, instead tell the players that it is the other player's turn, and allow them to place a mark. 

All of the elements of the game are rendered with JavaScript. In addition to the game, also render a button that allows the players to reset the game, rendering a new instance of tic-tac-toe without reloading the page.

## Page Structure
The HTML page created by startGame will have a structure somewhat like:
```
<div class='container' id ='app'>
        <header>
            <div class='row'>
                <div class='col'>
                    <h1 class='text-center' id='title'>Tic-Tac-Toe</h1>
                </div>
            </div>
        </header>
        <main>
            <div class='row' id='player-msg'>
                <div class='col-5 text-center'>
                    <h4 id='left-msg' class='d-block'>Player 1's turn</h4>
                </div>
                <div class='col-2 text-center'>
                    <h2 id='center-msg'>X</h2>
                </div>
                <div class='col-5 text-center'>
                    <h4 id='right-msg' class='d-none'>Player 2's turn</h4>
                </div>
            </div>
            <div class='row'>
                <div class='col text-center'>
                    <table class='table table-bordered border-dark-subtle border-4 align-middle mx-auto' id='board'>
                        <tr>
                            <td id='0' class="bg-info-subtle text-danger fs-1">X</td>
                            <td id='1' class="text-primary fs-1">O</td>
                            <td id='2' class="text-primary fs-1">O</td>
                        </tr>
                        <tr>
                            <td id='3' class="bg-info-subtle text-danger fs-1">X</td>
                            <td id='4'></td>
                            <td id='5'></td>
                        </tr>
                         <tr>
                            <td id='6' class="bg-info-subtle text-danger fs-1">X</td>
                            <td id='7'></td>
                            <td id='8'></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class='row'>
                <div class='col text-center'>
                    <button class="btn btn-outline-secondary btn-lg"  id='reset'>Restart Game</button>
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
    - GET a reference to the `<div>` element with the id 'app', call it *app*
    - MAKE the header
      - CALL **addElement** to make a `<header>` element with no attributes and *app* as a parent, name it *header*
      - CALL **addElement** to make a `<div>` element with the class 'row' and *header* as a parent, store it in *row1*
      - CALL **addElement** to make a `<div>` element with the class 'col' and *row1* as a parent, name it *col1*
      - CALL **addElement** to make a `<h1>` element with the class 'text-center', id 'title' and *col1* as a parent, name it *title*
      - SET *title*'s inner text to "Tic-Tac-Toe"
    - MAKE the game
      - CALL **addElement** to make a `<main>` element with no attributes and *app* as a parent, name it *main* 
      - MAKE the player message
        - CALL **addElement** to make a `<div>` element with the class 'row', id 'player-msg', and *main* as a parent, name it *row2*
        - CALL **addElement** to make a `<div>` element with the class 'col-5 text-center' and *row2* as a parent, name it call it *col2Left*
        - CALL **addElement** to make a `<h4>` element with the class 'd-block', id 'left-msg', and *col2Left* as a parent, name it *msgLeft*
        - SET *msgLeft*'s inner text to "Player 1's Turn"
        - CALL **addElement** to make a `<div>` element with the class 'col-2 text-center' and *row2* as a parent, name it call it *col2Center*
        - CALL **addElement** to make a `<h2>` element with the id 'center-msg', and *col2Center* as a parent, name it *msgCenter*
        - SET *msgCenter*'s inner text to player1Symbol
        - CALL **addElement** to make a `<div>` element with the class 'col-5 text-center' and *row2* as a parent, name it call it *col2Right*
        - CALL **addElement** to make a `<h4>` element with the class 'd-none', id 'right-msg', and *col2Right* as a parent, name it *msgRight*
        - SET *msgRight*'s inner text to "Player 2's Turn"
      - MAKE the board
        - CALL **addElement** to make a `<div>` element with the class 'row', id 'board', and *main* as a parent, name it *row3*
        - CALL **addElement** to make a `<div>` element with the class 'col text-center' and *row3* as a parent, name it *col3*
        - CALL **addElement** to make a `<table>` element with the class 'table table-bordered border-dark-subtle border-4 align-middle mx-auto' and *col3* as a parent, name it *table*
        - INIT *tileCount* as 0
        - FOR *tileCount* less than 9
          - CALL **addElement** to make a `<tr>` element with no attributes and *table* as a parent, name it *row*
          - FOR 3 times
            - CALL **addElement** to make a `<td>` element with the class 'fs-1', the id *tileCount*, and *row* as a parent, name it *tile*
            - ADD an event listener to *tile* that calls **makeMove** on a `click` event
            - INCREMENT *tileCount*
          - ENDFOR
        - ENDFOR
      - MAKE the reset button
        - CALL **addElement** to make a `<div>` element with the class 'row' and *main* as a parent, name it *row4*
        - CALL **addElement** to make a `<div>` element with the class 'col text-center' and *row4* as a parent, name it *col4*
        - CALL **addElement** to make a `<button>` element with the class 'btn btn-outline-secondary btn-lg', the id 'reset', and *col4* as a parent, name it *reset*
        - SET *reset*'s inner text to 'Restart Game'
        - ADD an event listener to *reset* that calls **startGame** on a `click` event
    - SET *board* to an array with nine empty strings as values
    - SET *moves* to an empty array
    - SET *remainingMoves* to an array with the numbers 0-8 as values
    - SET *winningMoves* to `false`
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
    - START **checkForWin**
    - INIT *lastMove* as the last value in *moves*
    - INIT *win* as an empty array
    - CHECK HORIZONTAL
      - CASE the quotient of *lastMove* / 3 of
        - 0: 
          - IF the values of *board* at 0, 1, and 2 are the same
            - ADD 0, 1, and 2 to *win*
          - ENDIF
        - 1:
          - IF the values of *board* at 3, 4, and 5 are the same
            - ADD 3, 4, and 5 to *win*
          - ENDIF
        - 2:
          - IF the values of *board* at 6, 7, and 8 are the same
            - ADD 6, 7, and 8 to *win*
          - ENDIF
      - ENDCASE
    - CHECK VERTICAL
      - CASE the remainder of *lastMove* / 3 of
        - 0: 
          - IF the values of *board* at 0, 3, and 6 are the same
            - ADD 0, 3, and 6 to *win*
          - ENDIF
        - 1:
          - IF the values of *board* at 1, 4, and 7 are the same
            - ADD 1, 4, and 7 to *win*
          - ENDIF
        - 2:
          - IF the values of *board* at 2, 5, and 8 are the same
            - ADD 2, 5, and 8 to *win*
          - ENDIF
      - ENDCASE
    - IF *lastMove* is even, CHECK DIAGONALS
      - IF the values of *board* at 0, 4, and 8 are the same
        - ADD 0, 4, and 8 to *win*
      - ENDIF
      - IF the values of board at 2, 4, and 6 are the same
        - ADD 2, 4, 6 to *win*
      - ENDIF
    - ENDIF
    - IF *win* has any values (length greater than 0)
      - RETURN *win*
    - ELSE
      - RETURN *false*
    - ENDIF
    - END **checkForWin** 
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
      - FOR every value in *win*
        - GET a reference to the square with the id of the value in *win* and change its class to 'bg-info-subtle' or some other color
      - ENDFOR
      - IF *remainingMoves* contains values
        - FOR each move in *remainingMoves*
          - GET a reference to the square with the id of the move and REMOVE the event listener on that square that listens for a `click` event and calls **makeMove**
        - ENDFOR
      - ENDIF
    - ELSE
      - SET *centerMessage*'s inner text to "Tie game!" or an equivalent message
    - ENDIF
    - END **endGame**
- **addElement**(*type*, *attributes*, *parent*)
- When called, creates a new element of the given *type*, sets its attributes to the properties provided in *attributes*, and appends the new element to the element referenced by *parent*.
- Procedure:
  - START **addElement**
  - INIT a new element of the given type, call it *newElement*
  - FOR every property in *attributes*
    - SET the attribute of *newElement* to the value provided
  - ENDFOR
  - APPEND *newElement* to the *parent*
  - RETURN *newElement*
  - END **addElement**
## Procedure
1. CALL **startGame**
2. Player 1 INPUTs a tile
3. **makeMove** places *player1Symbol* in the square
4. Control passes to Player 2 (nothing really changes, but the next symbol placed will be *player2Symbol*)
5. Player 2 chooses a tile
6. Player 1 chooses a tile
7. Player 2 chooses a tile
8. Player 1 chooses a tile
8. **makeMove** calls **checkForWin** to see if Player 1 has gotten three in a row
   - If they have, the winning squares are highlighted and the game ends (**endGame** is called)
   - If not, game continues, but each move is checked for victory
   - If all nine tiles are filled without a winner, a tie is declared and the game ends