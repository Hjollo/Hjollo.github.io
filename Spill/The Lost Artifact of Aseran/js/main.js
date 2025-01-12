function choose(option) {
    const story = document.getElementById("story");
    const image = document.getElementById("image");
    const box = document.getElementById("choice");

    if (option === 1) {
        story.innerText = "You step inside, but the floor collapses, and you fall into a pit of snakes! What do you do?";
        image.src = "images/snakes.png";
        box.innerHTML = `
            <button onclick="choose(3)">Climb out quickly</button>
            <button onclick="choose(4)">Look for something to fight the snakes</button>
        `;
    } else if (option === 2) {
        story.innerText = "You arrive in a massive chamber filled with statues of warriors. At the center lies a glowing pedestal where the Eye of Vyr rests, but standing before it is a stone guardian. The guardian's voice booms: *Only those worthy may claim the Eye. Answer my riddle, or face my wrath.* Riddle: I have cities, but no houses. I have mountains, but no trees. I have rivers, but no water. What am I?";
        image.src = "images/guardian.png";
        box.innerHTML = `
            <button onclick="choose(5)">Answer: A map</button>
            <button onclick="choose(6)">Answer: A dream</button>
            <button onclick="choose(10)">Answer: A painting</button>
        `;
    } else if (option === 3) {
        story.innerText = "You manage to escape the pit and continue deeper into the temple.";
        image.src = "images/temple.png";
        box.innerHTML = `
            <button onclick="choose(2)">Continue carefully</button>
        `;
    } else if (option === 4) {
        story.innerText = "The snakes overwhelm you. Your story ends here.";
        image.src = "images/gameover.png";
        box.innerHTML = `<button onclick="restart()">Restart</button>`;
    } else if (option === 5) {
        story.innerText = "At the end of the staircase, you find the Eye of Vyr shimmering in a pool of silver liquid. But you’re not alone. Two other treasure hunters appear:Mara, a cunning rival who will stop at nothing to take the artifact. Kellen, an old friend with a greedy gleam in his eye. They both step forward, weapons drawn. *The Eye belongs to me!* Mara hisses. *No, we’ll split it!* Kellen insists. You must decide.";
        image.src = "images/artifact.png";
        box.innerHTML = `
            <button onclick="choose(7)">Grab the artifact and run</button>
            <button onclick="choose(8)">Try to reason with them</button>
            <button onclick="choose(9)">Put down your arms</button>
        `;
    } else if (option === 6 || option === 10) {
        story.innerText = "The guardian’s eyes blaze red. *Wrong. You are not worthy.* The guardian attacks you! You try to fight back but are ultimately crushed beneath its stone fists.";
        image.src = "images/gameover.png";
        box.innerHTML = `<button onclick="restart()">Restart</button>`;
    } else if (option === 7) {
        story.innerText = "You snatch the Eye of Vyr and sprint back the way you came. The temple begins to shake as it collapses around you. Mara and Kellen give chase, but you’re faster. You escape the temple just as it crumbles into dust. The Eye of Vyr hums in your hands. You now possess an artifact that can rewrite reality. Outcome: You become powerful but feared, forever hunted by those who know your secret.";
        image.src = "images/escape.png";
        box.innerHTML = `<button onclick="restart()">Restart</button>`;
    } else if (option === 8) {
        story.innerText = "You lower your weapon and speak calmly. *We don’t need to fight. We can all leave here alive.* Kellen hesitates, but Mara lunges. In the chaos, Kellen tackles her, and they both fall into the silver pool. You can only watch as the pool solidifies, trapping them forever. You claim the Eye of Vyr alone, haunted by their fates. Outcome: You survive, but the weight of guilt follows you forever.";
        image.src = "images/haunted.png";
        box.innerHTML = `<button onclick="restart()">Restart</button>`;
    } else if (option === 9) {
        story.innerText = "You hold up your hands in peace. *Let’s share it. This doesn’t need to end in bloodshed.* To your surprise, they agree. The three of you leave the temple together, sharing both the danger and the power of the artifact. Outcome: You form an uneasy alliance, but for now, you walk away with friends—and the power of the Eye of Vyr safely divided.";
        image.src = "images/haunted.png";
        box.innerHTML = `<button onclick="restart()">Restart</button>`;
    }
}
function restart() {
    const story = document.getElementById("story");
    const image = document.getElementById("image");
    const box = document.getElementById("choice");

    story.innerHTML = `<p>You are <strong>Rynn</strong>, a young treasure hunter, standing at the entrance of a forgotten temple in the
        jungle of Aseran. Legends speak of the <strong>Eye of Vyr</strong>, a relic capable of altering reality itself. What will you do?</p>`;
    image.src = "images/temple.png";
    box.style.display = "block";
    box.innerHTML = `
        <button onclick="choose(1)">Step inside cautiously</button>
        <button onclick="choose(2)">Light a torch and look for traps</button>
    `;
}