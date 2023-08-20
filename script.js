const btnRollDice = document.querySelector(".roll-dice");
const btnNewGame = document.querySelector(".new-game");
const btnHold = document.querySelector(".leave");
const dice = document.querySelector(".dice");
const player = document.querySelectorAll(".player");
let currentPlayer, otherPlayer, playerNumber, numberDice, currentScore = 0, playerWinner;

const setPlayer = function () {
    if (player[0].classList.contains("player--active")) {
        currentPlayer = player[0];
        otherPlayer = player[1];
        playerNumber = 0;
    } else {
        currentPlayer = player[1];
        otherPlayer = player[0];
        playerNumber = 1;
    }
}
const changePlayer = function () {
    player[playerNumber].classList.remove("player--active");
    player[(playerNumber + 1) % 2].classList.add("player--active");
    currentPlayer = player[(playerNumber + 1) % 2];
    otherPlayer = player[playerNumber];
    playerNumber = (playerNumber + 1) % 2;
}
btnRollDice.addEventListener("click", function () {
    numberDice = Math.trunc(Math.random() * 6 + 1);
    dice.setAttribute("src", `image/dice${numberDice}.png`);
    setPlayer();
    if (numberDice !== 1) {
        currentScore += numberDice;
        document.getElementById(`current${playerNumber}`).textContent = currentScore.toString();
    } else {
        currentScore = 0;
        document.getElementById(`current${playerNumber}`).textContent = currentScore.toString();
        document.getElementById(`score${playerNumber}`).textContent = "0";
        changePlayer();
    }
});
btnHold.addEventListener("click", () => {
    let score = Number(document.getElementById(`score${playerNumber}`).textContent);
    currentScore = Number(document.getElementById(`current${playerNumber}`).textContent);
    score += currentScore;
    currentScore = 0;
    document.getElementById(`current${playerNumber}`).textContent = currentScore.toString();
    document.getElementById(`score${playerNumber}`).textContent = score.toString();
    if (score >= 100) {
        player[playerNumber].classList.add("player--winner");
        btnHold.disabled = true;
        btnRollDice.disabled = true;
        playerWinner = player[playerNumber];
    } else {
        changePlayer();
    }
});
btnNewGame.addEventListener("click", () => {
    btnHold.disabled = false;
    btnRollDice.disabled = false;
    currentPlayer.classList.remove("player--active");
    changePlayer();
    playerWinner.classList.remove("player--winner");
    document.getElementById(`score${0}`).textContent = "0";
    document.getElementById(`score${1}`).textContent = "0";
    document.getElementById(`current${0}`).textContent = "0";
    document.getElementById(`current${1}`).textContent = "0";
});