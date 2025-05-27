function toggleTheme() {
    let root = document.documentElement;
    let currentBg = getComputedStyle(root).getPropertyValue('--primary-bg').trim();

    console.log("Nåværende bakgrunnsfarge:", currentBg);

    let newTheme;

    if (currentBg.includes("10, 100%, 41%")) {
        root.style.setProperty('--primary-bg', 'blue');
        root.style.setProperty('--primary-text', 'white');
        newTheme = 'blue';
    } else {
        root.style.setProperty('--primary-bg', 'hsla(10, 100%, 41%, 0.914)');
        root.style.setProperty('--primary-text', 'rgb(250, 239, 231)');
        newTheme = 'orange';
    }
    localStorage.setItem('theme', newTheme);
}

window.addEventListener('DOMContentLoaded', () => {
    let savedTheme = localStorage.getItem('theme');
    let root = document.documentElement;

    if (savedTheme === 'blue') {
        root.style.setProperty('--primary-bg', 'blue');
        root.style.setProperty('--primary-text', 'white');
    } else {
        root.style.setProperty('--primary-bg', 'hsla(10, 100%, 41%, 0.914)');
        root.style.setProperty('--primary-text', 'rgb(250, 239, 231)');
    }
});

const targetDate = new Date("June 20, 2025 15:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        document.getElementById("countdown").innerHTML = "God sommer!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        `Sommerferie om ${days}d ${hours}t ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();