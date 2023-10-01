"use strict";

const Player = (sign) => {
    const getSign = () => sign;

    return {getSign};
}

const gameBoard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getCell = (cellIdx) => board[cellIdx];

    const setCell = (cellIdx, sign) => {
        board[cellIdx] = sign;
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {getCell, setCell, reset};
})();

const displayController = (() => {
    const gameMessage = document.querySelector(".game-message");
    const gridCells = document.querySelectorAll(".cell");
    const resetButton = document.querySelector(".reset");

    const setRoundMessage = (message) => {
        gameMessage.textContent = message;
    }

    const _updateGameBoard = () => {
        for (let i = 0; i < gridCells.length; i++) {
            gridCells[i].textContent = gameBoard.getCell(i);
        }
    }

    resetButton.addEventListener("click", () => {
        gameBoard.reset();
        gameController.reset();
        _updateGameBoard();
        setRoundMessage(`Player X's Turn`);
    });

    gridCells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            if (gameController.getGameStatus()) return;

            gameController.playRound(e.target.dataset.index);
            _updateGameBoard();
        }) 
    });

    return {setRoundMessage}
})();

const gameController = (() => {
    const players = [Player("X"), Player("O")];
    let activePlayer = players[0]
    let gameFinished = false;
    let round = 1;

    const _switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const _getActivePlayer = () => activePlayer;

    const getGameStatus = () => gameFinished;

    const _validateMove = (cellIdx) => {
        let validMove;
        gameBoard.getCell(cellIdx) === "" ? validMove = true : validMove = false;
        return validMove;
    }

    const reset = () => {
        activePlayer = players[0]
        round = 1
        gameFinished = false;
    }

    const _checkWin = () => {
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
        activePlayer = _getActivePlayer();
        
        if (_validateMove(cellIdx)) {
            gameBoard.setCell(cellIdx, activePlayer.getSign());

            if (round >= 5) gameFinished = _checkWin();   // Minimum amount of rounds is 5. Only check for win condition after 5 rounds.
            if (gameFinished) {
                displayController.setRoundMessage(`Player ${activePlayer.getSign()} Won!`)
            } else {
                _switchActivePlayer();
                displayController.setRoundMessage(`Player ${activePlayer.getSign()}'s Turn`)
            }

            if (round === 9) {
                displayController.setRoundMessage(`It's a Tie!`);
                gameFinished = true;
            }
            
            round++;
        }
    }

    return {playRound, getGameStatus, reset};
})();