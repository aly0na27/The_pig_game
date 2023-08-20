const btnRollDice = document.querySelector(".roll-dice");
const btnNewGame = document.querySelector(".new-game");
const btnHold = document.querySelector(".leave");
const dice = document.querySelector(".dice");
const player = document.querySelectorAll(".player");
let numberDice, currentScore = 0;

btnRollDice.addEventListener("click", function() {
    numberDice = Math.trunc(Math.random() * 6 + 1);
    dice.setAttribute("src", `image/dice${numberDice}.png`);
    if (player[0].classList.contains("player--active")) {
        if (numberDice !== 1) {
            currentScore += numberDice;
            document.getElementById(`current${0}`).textContent = currentScore.toString();
        } else {
            currentScore = 0;
            document.getElementById(`current${0}`).textContent = currentScore.toString();
            document.getElementById(`score${0}`).textContent = "0";
            player[0].classList.remove("player--active");
            player[1].classList.add("player--active");
        }
    } else {
        if (numberDice !== 1) {
            currentScore += numberDice;
            document.getElementById(`current${1}`).textContent = currentScore.toString();
        } else {
            currentScore = 0;
            document.getElementById(`current${1}`).textContent = currentScore.toString();
            document.getElementById(`score${1}`).textContent = "0";
            player[1].classList.remove("player--active");
            player[0].classList.add("player--active");
        }
    }
});
btnHold.addEventListener("click", () => {
    if (player[0].classList.contains("player--active")) {
        let score = Number(document.getElementById(`score${0}`).textContent);
        currentScore = Number(document.getElementById(`current${0}`).textContent);
        score += currentScore;
        console.log(score);
        currentScore = 0;
        document.getElementById(`current${0}`).textContent = currentScore.toString();
        document.getElementById(`score${0}`).textContent = score.toString();
        if (score >= 100) {
            player[0].classList.add("player--winner");
            btnHold.style.disabled = "true";
            btnRollDice.style.disabled = "true";
        }
        player[0].classList.remove("player--active");
        player[1].classList.add("player--active");
    } else {
        let score = Number(document.getElementById(`score${1}`).textContent);
        currentScore = Number(document.getElementById(`current${1}`).textContent);
        score += currentScore;
        currentScore = 0;
        document.getElementById(`current${1}`).textContent = currentScore.toString();
        document.getElementById(`score${1}`).textContent = score.toString();
        if (score >= 100) {
            player[1].classList.add("player--winner");
            btnHold.style.disabled = "true";
            btnRollDice.style.disabled = "true";
        }
        player[1].classList.remove("player--active");
        player[0].classList.add("player--active");
    }
});
btnNewGame.addEventListener("click", () => {
    btnHold.style.disabled = "false";
    btnRollDice.style.disabled = "false";
    if (player[1].classList.contains("player--active")) {
        player[1].classList.remove("player--active");
        player[0].classList.add("player--active");
    }
    if (player[0].classList.contains("player--winner") || player[1].classList.contains("player--winner")) {
        player[0].classList.remove("player--winner");
        player[1].classList.remove("player--winner");
    }
    document.getElementById(`score${0}`).textContent = "0";
    document.getElementById(`score${1}`).textContent = "0";
    document.getElementById(`current${0}`).textContent = "0";
    document.getElementById(`current${1}`).textContent = "0";
});