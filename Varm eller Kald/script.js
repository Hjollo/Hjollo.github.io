let words = [];
let rankedScores = [];
let secretWord = "";
let mode = "semantic";

const input = document.getElementById("guessInput");
const button = document.getElementById("guessButton");
const history = document.getElementById("history");
const heatMarker = document.getElementById("heatMarker");
const heatLabel = document.getElementById("heatLabel");
const rankLabel = document.getElementById("rankLabel");
const toggleListButton = document.getElementById("toggleListButton");
const wordListContainer = document.getElementById("wordListContainer");
const wordList = document.getElementById("wordList");
const modeSelect = document.getElementById("modeSelect");

// Last ordliste
fetch("words.json")
    .then(res => res.json())
    .then(data => {
        words = data;

        // Velg tilfeldig målord
        const randomIndex = Math.floor(Math.random() * words.length);
        secretWord = words[randomIndex].word.toLowerCase();

        // Preberegn rangering for bokstavmodus
        rankedScores = words
            .map(w => similarity(w.word.toLowerCase(), secretWord))
            .sort((a, b) => b - a);

        // Vis ordliste
        wordList.innerHTML = words.map(w =>
            `<div class="word-list-item">
                <div class="word">${w.word}</div>
                <div class="description">${w.description}</div>
            </div>`
        ).join("");
    });

// Toggle ordliste
toggleListButton.addEventListener("click", () => {
    wordListContainer.classList.toggle("hidden");
});

// Bytt modus
modeSelect.addEventListener("change", (e) => {
    mode = e.target.value;
});

// Spill
button.addEventListener("click", makeGuess);
input.addEventListener("keydown", e => {
    if(e.key === "Enter") makeGuess();
});

// Bokstavlikhet
function similarity(a, b) {
    let matches = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] === b[i]) matches++;
    }
    return matches / Math.max(a.length, b.length);
}

// Semantisk likhet (simulert med tilfeldige score for demo)
function semanticScore(word) {
    const found = words.find(w => w.word.toLowerCase() === word);
    if(found) return Math.random() * 0.5 + 0.5; // semi-nær ord får høyere
    return Math.random() * 0.5; // tilfeldig ord = lav score
}

function makeGuess() {
    const guess = input.value.toLowerCase().trim();
    if (!guess) return;

    let score;
    if(mode === "semantic") {
        score = semanticScore(guess);
    } else {
        score = similarity(guess, secretWord);
    }

    const percent = Math.round(score * 100);
    heatMarker.style.left = `${percent}%`;

    heatLabel.textContent =
        percent < 30 ? "Kald" :
        percent < 60 ? "Lunken" :
        percent < 85 ? "Varm" :
        "Svært varm";

    // Finn rangering i ordlisten
    let rank;
    if(mode === "letter") {
        rank = rankedScores.findIndex(s => score >= s) + 1;
        if(rank === 0) rank = rankedScores.length + 1;
    } else {
        // For demo: ranger tilfeldig for semantisk
        rank = Math.floor(Math.random() * words.length) + 1;
    }

    rankLabel.textContent = `Plassering: #${rank}`;

    history.innerHTML += `<div>${guess} → #${rank}</div>`;

    if(guess === secretWord){
        rankLabel.textContent = "Riktig! #1";
        heatLabel.textContent = "Treff";
    }

    input.value = "";
}
