const board = ["", "", "", "", "", "", "", "", ""];
const moves = [];
const remainingMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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

    // make the header
    let header = addElement('header', {}, app);
    let row1 = addElement('div', {'class': 'row'}, header);
    let col1 = addElement('div', {'class': 'col'}, row1);
    let title = addElement('h1', {'class': 'text-center', 'id': 'title'},
     col1);
    title.innerText = "Tic-Tac-Toe";

    // make the game
    let main = addElement('main', {}, app);

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
    let row3 = addElement('div', {'class': 'row', 'id': 'player-msg'}, main);
    let col3 = addElement('div', {'class': 'col text-center'}, row3);
    let table = addElement('table', {'class': 
     'table table-bordered border-dark-subtle border-4 align-middle mx-auto'},
     col3);
    let tileCount = 0;
    while ( tileCount < 9) {
        let row = addElement('tr', {}, table);
        for (let i = 0; i < 3; i++) {
            let tile = addElement('td', {'class':'fs-1', 'id': tileCount},row);
            tile.innerText = "";
            tile.addEventListener('click', makeMove);
            tileCount++;
        }
    }

    // make the restart button
    let row4 = addElement('div', {'class': 'row', 'id': 'player-msg'}, main);
    let col4 = addElement('div', {'class': 'col text-center'}, row4);
    let reset = addElement('button',
     {'class': 'btn btn-outline-secondary btn-lg', 'id': 'reset'}, col4);
    reset.innerText = "Restart Game";
    reset.addEventListener('click', startGame);

    // reset board state
    board = ["", "", "", "", "", "", "", "", ""];
    moves = [];
    remainingMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    winningMoves = false;
}

function makeMove(event) {
    console.log(event.target.id + " was clicked!");
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