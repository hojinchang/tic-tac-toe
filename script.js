"use strict";

const Player = (sign) => {
    const getSign = () => sign;

    return {getSign};
}

const gameBoard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setCell = (cellIdx, sign) => {
        board[cellIdx] = sign;
    }

    return {setCell};
})();

const gameController = (function() {
    const players = [Player("X"), Player("O")];

    let activePlayer = players[0]

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (cellIdx) => {
        activePlayer = getActivePlayer();
        gameBoard.setCell(cellIdx, activePlayer.getSign());

        switchActivePlayer();
    }
})();