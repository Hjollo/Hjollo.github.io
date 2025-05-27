const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin-button");
const updateButton = document.getElementById("update-wheel");
const nameInput = document.getElementById("name-input");
const winnerDisplay = document.getElementById("winner-name");

let names = ["Alice", "Bob", "Charlie", "David", "Eve"];
let spinning = false;
let startAngle = 0;
let spinAngle = 0;
let selectedName = "";

// 🎨 Farger for segmentene
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFFF33", "#FF8C00", "#008B8B", "#A52A2A"];

// 🌀 Tegn hjulet dynamisk
function drawWheel() {
    const slices = names.length;
    const sliceAngle = (2 * Math.PI) / slices;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.font = "18px Arial";
    ctx.textAlign = "center";

    names.forEach((name, index) => {
        const angle = startAngle + index * sliceAngle;
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        ctx.stroke();

        // 📝 Tegn navnene på hjulet
        const textAngle = angle + sliceAngle / 2;
        const x = 250 + Math.cos(textAngle) * 180;
        const y = 250 + Math.sin(textAngle) * 180;
        ctx.fillStyle = "black";
        ctx.fillText(name, x, y);
    });
}

// 🎲 Spinn hjulet
function spinWheel() {
    if (spinning) return;
    spinning = true;
    spinAngle = Math.random() * 3600 + 2000; // Random stort tall
    let currentAngle = 0;

    const spinInterval = setInterval(() => {
        startAngle += 30 * (Math.PI / 180);
        drawWheel();
        currentAngle += 30;

        if (currentAngle >= spinAngle) {
            clearInterval(spinInterval);
            spinning = false;
            determineWinner();
        }
    }, 30);
}

// 🎯 Finn vinneren basert på stoppvinkel (tilpasset for kl. 12)
function determineWinner() {
    const sliceAngle = (2 * Math.PI) / names.length;
    let correctedAngle = (2 * Math.PI - (startAngle % (2 * Math.PI))) - (Math.PI / 2); // Justert for kl. 12
    correctedAngle = (correctedAngle + 2 * Math.PI) % (2 * Math.PI); // Sørg for at vinkelen er positiv

    let winningIndex = Math.floor(correctedAngle / sliceAngle) % names.length;
    selectedName = names[winningIndex];
    winnerDisplay.textContent = selectedName;
}

// ✍️ Oppdater hjul med nye navn
updateButton.addEventListener("click", () => {
    const inputText = nameInput.value.trim();
    if (inputText === "") return;

    names = inputText.split("\n").map(name => name.trim()).filter(name => name !== "");
    drawWheel();
});

spinButton.addEventListener("click", spinWheel);

// 🚀 Start med default hjul
drawWheel();