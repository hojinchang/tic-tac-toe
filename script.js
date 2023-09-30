"use strict";

const Player = (sign) => {
    const getSign = () => sign;

    return {getSign};
}

const gameBoard = (function() {
    // const board = ["", "", "", "", "", "", "", "", ""];

    // let board = ["X", "", "", "", "", "", "", "", ""];
    // let board = ["X", "O", "X", "O", "O", "X", "O", "X", "X"];
    let board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    // let board = ["X", "O", "O", "X", "X", "", "X", "", "O"];



    const getCell = (cellIdx) => board[cellIdx];

    const setCell = (cellIdx, sign) => {
        board[cellIdx] = sign;
    }

    return {getCell, setCell};
})();

const gameController = (function() {
    const players = [Player("X"), Player("O")];
    let winner = false;

    let activePlayer = players[0]

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

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
            console.log(signs, allEqual)

            if (allEqual) break;
        }
        
        return allEqual;
    }

    const playRound = (cellIdx) => {
        activePlayer = getActivePlayer();
        gameBoard.setCell(cellIdx, activePlayer.getSign());
        winner = checkWin();

        console.log("winner?", winner)

        switchActivePlayer();
    }

    return {playRound};
})();

gameController.playRound();