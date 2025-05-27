const board = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const timerDisplay = document.getElementById("timer");
const highScoreDisplay = document.getElementById("high-score");

const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🥑", "🍍", "🍓"];
let cards = [...symbols, ...symbols]; // Dobbelt opp for å lage par
let flippedCards = [];
let matchedPairs = 0;
let startTime;
let timerInterval;
let bestTime = localStorage.getItem("memoryBestTime") || "--";

// 📌 Vis high score ved start
highScoreDisplay.textContent = bestTime;

// 🔄 Bland kortene
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    board.innerHTML = "";
    shuffle(cards);

    cards.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });

    // 🔄 Nullstill tidtelling
    clearInterval(timerInterval);
    timerDisplay.textContent = "0";
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// ⏱ Oppdater tid
function updateTimer() {
    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = elapsedTime;
}

// 🔄 Snur kort
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// ✅ Sjekk om kortene matcher
function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === symbols.length) {
            setTimeout(winGame, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
        }, 1000);
    }

    flippedCards = [];
}

// 🎉 Spill vunnet!
function winGame() {
    clearInterval(timerInterval);
    let finalTime = parseInt(timerDisplay.textContent);
    
    alert(`🎉 Du vant på ${finalTime} sekunder!`);

    // 📌 Oppdater high score hvis nødvendig
    if (bestTime === "--" || finalTime < bestTime) {
        bestTime = finalTime;
        localStorage.setItem("memoryBestTime", bestTime);
        highScoreDisplay.textContent = bestTime;
    }
}

// 🔁 Restart spillet
resetButton.addEventListener("click", createBoard);

// 🚀 Start spillet
createBoard();