"use strict";

const Player = (sign) => {
    const getSign = () => sign;

    return {getSign};
}

const gameBoard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const getCell = (cellIdx) => board[cellIdx];

    const setCell = (cellIdx, sign) => {
        board[cellIdx] = sign;
    }

    return {getBoard, getCell, setCell};
})();

const displayController = (() => {
    const gameMessage = document.querySelector(".game-message");
    const gridCells = document.querySelectorAll(".cell");

    const setRoundMessage = (message) => {
        gameMessage.textContent = message;
    }

    const updateGameBoard = () => {
        for (let i = 0; i < gridCells.length; i++) {
            gridCells[i].textContent = gameBoard.getCell(i);
        }
    }

    gridCells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            gameController.playRound(e.target.dataset.index);
            updateGameBoard();
        }) 
    });

    return {setRoundMessage}
})();

const gameController = (() => {
    const players = [Player("X"), Player("O")];
    let winner = false;

    let activePlayer = players[0]
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const validateMove = (cellIdx) => {
        let validMove;
        if (gameBoard.getCell(cellIdx) === "") {
            validMove = true;
        } else {
            validMove = false;
        }
        return validMove;
    }

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let allEqual = false;
        for (let condition of winConditions) {
            let signs = condition.map(cellIdx => gameBoard.getCell(cellIdx));
            if (!signs.includes("")) allEqual = signs.every(sign => sign === signs[0]);

            if (allEqual) break;
        }
        
        return allEqual;
    }

    const playRound = (cellIdx) => {
        activePlayer = getActivePlayer();
        
        let validMove = validateMove(cellIdx);
        if (validMove) {
            gameBoard.setCell(cellIdx, activePlayer.getSign());
            console.log("active player: ", activePlayer.getSign());
            console.log(gameBoard.getBoard());

            let win = checkWin();
            if (win) {
                winner = activePlayer;
                console.log("winner!", winner)
            } else {
                switchActivePlayer();
                displayController.setRoundMessage(`Player ${activePlayer.getSign()}'s Turn`)
            }
        }
    }

    return {playRound};
})();