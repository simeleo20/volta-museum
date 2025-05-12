// Percorso delle immagini statiche
const basePath = '/static/immagini'
imageNames = ["elettroforo.png", "pila.png", "pistola.png", "elettroscopio.png"];
// Crea una griglia mescolata con ogni immagine doppia
let cards = [...imageNames, ...imageNames].sort(() => 0.5 -
Math.random());
// Stati del gioco
let flippedCards = [];
let lockBoard = false;
let matchedCount = 0;
// Elementi DOM
const grid = document.getElementById("memory-grid");
const feedback = document.getElementById("feedback");
// Funzione per creare la griglia di carte
function createBoard() {
grid.innerHTML = ""; // Pulisce eventuali carte esistenti
cards.forEach((imageName, index) => {
const card = document.createElement("div");
card.classList.add("card");
card.dataset.index = index;
card.dataset.image = imageName;
// Struttura della carta (fronte e retro)
card.innerHTML = `
<div class="inner">
<div class="front"></div>
<div class="back" style="background-image:
url('${basePath}/${imageName}')"></div>
</div>
`;
card.addEventListener("click", flipCard);
grid.appendChild(card);
});
}
// Funzione per girare una carta
function flipCard(e) {
if (lockBoard || e.currentTarget.classList.contains("flipped"))
return;const card = e.currentTarget;
card.classList.add("flipped");
flippedCards.push(card);
if (flippedCards.length === 2) {
lockBoard = true;
checkForMatch();
}
}
// Funzione per controllare se le due carte girate sono uguali
function checkForMatch() {
const [first, second] = flippedCards;
if (first.dataset.image === second.dataset.image) {
matchedCount += 1;
flippedCards = [];
if (matchedCount === imageNames.length) {
feedback.textContent = "Hai trovato tutte le coppie!🎉";
}
lockBoard = false;
} else {
setTimeout(() => {
first.classList.remove("flipped");
second.classList.remove("flipped");
flippedCards = [];
lockBoard = false;
}, 1000);
}
}
// Avvia il gioco
createBoard();