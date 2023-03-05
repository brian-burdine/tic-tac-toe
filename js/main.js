let board = ["", "", "", "", "", "", "", "", ""];
let moves = [];
let remainingMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let winningMoves = false;

let player1Symbol = 'X';
let player2Symbol = 'O';

// Creates a new game of Tic-Tac-Toe in-browser by populating a HTML document
// with a target <div> element with a title, a message for the players, a table
// that functions as a board, and a restart button. The cells of the table are
// clickable, calling makeMove to mark the square with a players symbol and
// progress the game. The restart button calls startGame when clicked, starting
// a new game.
function startGame() {
    // get a reference to the target div in the HTML document
    let app = document.getElementById('app');
    // make a new HTML fragment to contain this game
    let game = new DocumentFragment();

    // make the header
    let header = addElement('header', {}, game);
    let row1 = addElement('div', {'class': 'row'}, header);
    let col1 = addElement('div', {'class': 'col'}, row1);
    let title = addElement('h1', {'class': 'text-center', 'id': 'title'},
     col1);
    title.innerText = "Tic-Tac-Toe";

    // make the game
    let main = addElement('main', {}, game);

    // make the player message
    // first column: player 1's turn
    let row2 = addElement('div', {'class': 'row', 'id': 'player-msg'}, main);
    let col2Left = addElement('div', {'class': 'col-5 text-center'}, row2);
    let msgLeft = addElement('h4', {'class': 'd-block', 'id': 'left-msg'},
     col2Left);
    msgLeft.innerText = "Player 1's Turn";
    
    // second column: current player's symbol
    let col2Center = addElement('div', {'class': 'col-2 text-center'}, row2);
    let msgCenter = addElement('h2', {'id': 'center-msg'}, col2Center);
    msgCenter.innerText = player1Symbol;

    // third column: player 2's turn
    let col2Right = addElement('div', {'class': 'col-5 text-center'}, row2);
    let msgRight = addElement('h4', {'class': 'd-none', 'id': 'right-msg'},
     col2Right);
    msgRight.innerText = "Player 2's Turn";
    
    // make the board
    let row3 = addElement('div', {'class': 'row', 'id': 'board'}, main);
    let col3 = addElement('div', {'class': 'col text-center'}, row3);
    let table = addElement('table', {'class': 
     'table table-bordered border-dark-subtle border-4 align-middle mx-auto'},
     col3);
    let tableBody = addElement('tbody', {}, table);
    let tileCount = 0;
    while ( tileCount < 9) {
        let row = addElement('tr', {}, tableBody);
        for (let i = 0; i < 3; i++) {
            let tile = addElement('td', {'class':'fs-1 open', 'id': tileCount},row);
            tile.innerText = "";
            tile.addEventListener('click', makeMove);
            tileCount++;
        }
    }

    // make the restart button
    let row4 = addElement('div', {'class': 'row'}, main);
    let col4 = addElement('div', {'class': 'col text-center'}, row4);
    let reset = addElement('button',
     {'class': 'btn btn-outline-secondary btn-lg', 'id': 'reset'}, col4);
    reset.innerText = "Restart Game";
    reset.addEventListener('click', startGame);

    // replace any contents of target div with the new game
    app.replaceChildren(game);
    
    // reset board state
    board = ["", "", "", "", "", "", "", "", ""];
    moves = [];
    remainingMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    winningMoves = false;
}

// The callback function for the event listeners on the table cells used to
// represent game spaces.
// Adds the clicked space to the list of moves made and updates the board with
// the current player's symbol.
// Once the number of moves is 5 or higher, checkForWin is called to see if the
// last move won the game.
// If it did, or the number of moves has reached 9, endGame is called to end
// the game. Otherwise, switchPlayer is called to change the display to reflect
// the current player.
function makeMove(event) {
    // get the clicked tile's number
    let lastMove = Number(event.target.id);
    console.log(lastMove + " was clicked!");

    // Update game state
    // add latest move to the list of moves
    moves.push(lastMove);
    // remove latest move from the list of remaining moves
    remainingMoves = remainingMoves.filter(move => { 
        return move != lastMove;});
    // set the appropriate player's symbol to that tile in 
    // the board representation
    if ((moves.length % 2) == 1) {
        board[lastMove] = player1Symbol;
    } else {
        board[lastMove] = player2Symbol;
    }

    // update the tile on screen with the right symbol and remove it from play
    event.target.innerText = board[lastMove];
    event.target.removeEventListener('click', makeMove);
    event.target.className = 'fs-1 close';

    console.log(moves);

    // check to see if the last move was a winning one
    if (moves.length >= 5) {
        winningMoves = checkForWin();
    }
    // check to see if the game has ended
    if (winningMoves || moves.length == 9) {
        endGame(winningMoves);
    }
    // game has not ended, continue play
    else {
        switchPlayer();
    }
}

// Checks the current board state to see if a winning move has been made.
// Returns an array of winning tiles if a winning sequence was found.
// Returns false if no winning sequence was found.
function checkForWin() {
    console.log("checkForWin was called!");
    console.log("Number of moves: " + moves.length);

    // check the latest move to see which spaces should be checked for win
    let lastMove = moves[moves.length - 1];
    let row = Math.floor(lastMove / 3);
    let col = Math.floor(lastMove % 3);
    let diag = (lastMove % 2) == 0;

    // make an array to include winning tiles
    let win = [];

    // check the row of the latest move
    if (board[row * 3] === board[row * 3 + 1] && board[row * 3] ===
        board[row * 3 + 2]) 
    {
        win.push(row * 3, row * 3 + 1, row * 3 + 2);
    }
    
    // check the column of the latest move
    if (board[col] === board[col + 3] && board[col] === board[col + 6]) {
        win.push(col, col + 3, col + 6);
    }

    // if the latest move was in an even-numbered tile, check the diagonals
    if (diag) {
        if (board[0] == board[4] && board[0] == board[8]) {
            win.push(0, 4, 8);
        } else if (board[2] == board[4] && board[2] == board[6]) {
            win.push(2, 4, 6);
        }
    }

    // if a winning move was found, return the winning tiles; 
    // otherwise, return false
    if (win.length > 0) {
        return win;
    } else {
        return false;
    }
}

// Changes the message to the players to accurately display whose turn it
// currently is.
function switchPlayer() {
    let leftMessage = document.getElementById('left-msg');
    let centerMessage = document.getElementById('center-msg');
    let rightMessage = document.getElementById('right-msg');

    if ((moves.length % 2) == 0) {
        leftMessage.className = 'd-block';
        centerMessage.innerText = player1Symbol;
        rightMessage.className = 'd-none';
    } else {
        leftMessage.className = 'd-none';
        centerMessage.innerText = player2Symbol;
        rightMessage.className = 'd-block';
    }
}

// Ends the game, either by declaring a player the victor or by declaring a
// tie game. If a player did win, the winning moves are highlighted. 
// Any empty tiles become unresponsive.
function endGame(win) {
    console.log("endGame was called!");
    console.log("Number of moves: " + moves.length);
    console.log(winningMoves);

    // change the player message to a victory/tie message
    // Hide the left/right columns, widen the center column
    let leftMessage = document.getElementById('left-msg');
    leftMessage.className = 'd-none';
    leftMessage.parentElement.className = 'col-2';

    let centerMessage = document.getElementById('center-msg');
    centerMessage.parentElement.className = 'col-8 text-center';

    let rightMessage = document.getElementById('right-msg');
    rightMessage.className = 'd-none';
    rightMessage.parentElement.className = 'col-2';

    // Figure out if the game ended in a player's victory or a tie
    if (win) {
        // Display the winning player
        if (board[win[0]] == player1Symbol) {
            centerMessage.innerText = "Player 1 Wins!";
        } else {
            centerMessage.innerText = "Player 2 Wins!";
        }
        // Highlight the winning tiles
        for (const tile of win) {
            document.getElementById(tile).classList.add('bg-info-subtle');
        }
        // Remove any unfilled tiles from play
        if (remainingMoves.length > 0) {
            for (const move of remainingMoves) {
                let tile = document.getElementById(move);
                tile.removeEventListener('click',makeMove);
                tile.className = 'fs-1 close';
            }
        }
    } else {
        centerMessage.innerText = "Tie game!"
    }
}

// Creates a new HTML element in the DOM of the given type, gives it the
// supplied attributes, and then appends the element to the given parent
// Returns a reference to the new element for further use
function addElement(type, attributes, parent) {
    // create a new HTML element
    let newElement = document.createElement(type);

    // apply every property provided in attributes
    for (let property in attributes) {
        newElement.setAttribute(property, attributes[property]);
    }

    // add the element to the document, return a reference
    parent.appendChild(newElement);
    return newElement;
}

// Create the first game
startGame();