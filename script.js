const gameBoard = document.querySelector('.gameboard');
const startButton = document.querySelector('#start-game');
const gameMessage = document.querySelector('.game-message');
const restartButton = document.querySelector('#restart-game');



// IIFE for creating the Gameboard object
const Gameboard = (function() {
    // Create board as an array
    let board = ['','','','','','','','','']

    // Function to render the gameboard
    const renderBoard = function() {
        let boardHTML = '';
        // Create a loop through the gameboard and creates gameboard box out of each element in the gameboard array
        for (let i = 0; i <= board.length - 1; i++) {
            boardHTML += `
            <div class="gameboard-box" id="${i}">${board[i]}</div>
            `
        }
        gameBoard.innerHTML = boardHTML;
        let boxes = document.querySelectorAll('.gameboard-box');
        boxes.forEach((box) => {
            box.addEventListener('click', GameControl.handleClick)
        });
    }

    // Function to update the Gameboard
    const updateBoard = function(mark, num) {
        board[num] = mark;
    }


    // Function to return the Gameboard
    const getBoard = function() {
        return board;
    }

    // Function to reset the Gameboard
    const resetBoard = function() {
        board = ['','','','','','','','',''];
    }

    // Function to update message
    const updateMessage = function(message) {
        gameMessage.innerHTML += message;
    }


    return {
        getBoard,
        renderBoard,
        resetBoard,
        updateBoard,
        updateMessage
    }
})();


// Takes two params - name and marker and returns an object
const Player = function (name, marker) {
    return {
        name,
        marker
    }
};


const GameControl = (function() {

    // Create empty array for the players
    let players = [];
    // Create function for determining gameover and set to false
    let gameOver;
    // Create function for determining current turn
    let currentTurn;

    //Returns a function Starts the game by creating two players,
    // setting a current turn variable,
    // sets Gameover to false and
    // renders the board
    const startGame = function() {

        startButton.style.display = 'none';
        restartButton.style.display = 'block';
        let playerOneName = document.getElementById('player-1').value;
        let playerTwoName = document.getElementById('player-2').value;
        const player1 = Player(playerOneName, 'x');
        const player2 = Player(playerTwoName, 'o');
        players = [player1, player2];
        currentTurn = 0;

        gameOver = false;

        Gameboard.renderBoard();

    }



    //Returns a function that handles the click event,
    // updates the board,
    // checks if there’s a winner,
    // checks a tie,
    // and changes the turn
    const handleClick = function(event) {

        // Function to place marker
        if (currentTurn === 0) {
            Gameboard.updateBoard(players[0].marker, event.target.id);

        } else if (currentTurn === 1) {
            Gameboard.updateBoard(players[1].marker, event.target.id);
        }
        Gameboard.renderBoard();

        //Function to check if someone one and update the message to declare a winner
        if (checkWinner(Gameboard.getBoard()) && currentTurn === 0) {
            Gameboard.updateMessage(`${players[currentTurn].name} wins!`);
            let boxes = document.querySelectorAll('.gameboard-box');
            boxes.forEach((box) => {
            box.removeEventListener('click', GameControl.handleClick)
            });
        } else if (checkWinner(Gameboard.getBoard()) && currentTurn === 1) {
            Gameboard.updateMessage(`${players[currentTurn].name} wins!`);
            let boxes = document.querySelectorAll('.gameboard-box');
            boxes.forEach((box) => {
            box.removeEventListener('click', GameControl.handleClick)
            });
        }

        if (checkTie(Gameboard.getBoard())) {
            Gameboard.updateMessage(`It's a tie!`);
        }

        // Function to change turn
        if (currentTurn === 0) {
            currentTurn = 1;
        } else if (currentTurn === 1) {
            currentTurn = 0;
        }
    }

    return {
        startGame,
        handleClick
    }
})();




// Function that takes the board and checks a winner
const checkWinner = function (board) {

    const winningArrays = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i <= winningArrays.length - 1; i++) {
        [a,b,c] = winningArrays[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}


// Function that takes the board and checks a tie (returns true or false)
const checkTie = function (board) {

    for (let i = 0; i <= board.length -1; i++) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}

// Function that restarts the game
const restartGame = function () {
    gameMessage.innerHTML = '';
    startButton.style.display = 'block';
    restartButton.style.display = 'none';
    Gameboard.resetBoard();
    gameBoard.innerHTML = '';
    document.getElementById('player-1').value = '';
    document.getElementById('player-2').value = '';
}

restartButton.addEventListener('click', restartGame);


// Adding start game over listener to button
startButton.addEventListener('click', GameControl.startGame);