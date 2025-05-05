// script.js

// Array di nomi di file delle immagini nella cartella "immagini"
const images = ["pila.png", "elettroforo.png",]; // Aggiungi altre immagini qui

let remainingImages = [...images]; // Copia dell'array per tenere traccia delle immagini rimanenti
let currentImage = null;
let secretWord = null;

// Elementi DOM
const gameBoard = document.getElementById("game-board");
const imageElement = document.getElementById("image");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-guess");
const feedback = document.getElementById("feedback");
const curiosity = document.getElementById("curiosity");

// Funzione per caricare una nuova immagine e parola segreta
function loadNewImageAndWord() {
  if (remainingImages.length === 0) {
    // Se non ci sono più immagini, termina il gioco
    feedback.textContent = "Hai completato tutte le parole! Complimenti!";
    submitButton.disabled = true;
    return;
  }

  // Seleziona casualmente un'immagine dall'elenco rimanente
  const randomIndex = Math.floor(Math.random() * remainingImages.length);
  currentImage = remainingImages[randomIndex];
  remainingImages.splice(randomIndex, 1); // Rimuove l'immagine dall'elenco

  // Estrae la parola dal nome del file
  secretWord = extractWordFromImage(currentImage);

  // Imposta l'immagine nell'elemento HTML
  imageElement.src = `immagini/${currentImage}`;

  // Resetta il tabellone di gioco
  gameBoard.innerHTML = "";
  feedback.textContent = "";
  curiosity.style.display = "none";
  submitButton.disabled = false;
}

// Funzione per estrarre il nome della parola dall'immagine
function extractWordFromImage(imageName) {
  return imageName.replace(".png", "").toUpperCase();
}

// Funzione per creare una nuova riga di caselle
function createRow() {
  const row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < secretWord.length; i++) {
    const box = document.createElement("div");
    box.classList.add("letter-box");
    row.appendChild(box);
  }
  gameBoard.appendChild(row);
  return row;
}

// Funzione per aggiornare la riga corrente con le lettere inserite
function updateRow(row, guess) {
  const boxes = row.querySelectorAll(".letter-box");
  guess.split("").forEach((letter, index) => {
    boxes[index].textContent = letter;
    if (letter === secretWord[index]) {
      boxes[index].classList.add("green");
    } else if (secretWord.includes(letter)) {
      boxes[index].classList.add("yellow");
    } else {
      boxes[index].classList.add("gray");
    }
  });
}

// Funzione per verificare se la parola è stata indovinata
function checkWin(guess) {
  if (guess === secretWord) {
    feedback.textContent = "Hai vinto! Ecco una curiosità su Volta:";
    curiosity.textContent =
      "La pila di Volta, inventata nel 1800, fu la prima batteria elettrica della storia.";
    curiosity.style.display = "block";

    // Carica la prossima immagine e parola
    setTimeout(() => {
      loadNewImageAndWord();
    }, 3000); // Attendi 3 secondi prima di passare alla parola successiva
  } else {
    feedback.textContent = "Prova ancora!";
  }
}

// Gestione del click sul pulsante "Invia"
submitButton.addEventListener("click", () => {
  const guess = guessInput.value.toUpperCase();
  if (guess.length !== secretWord.length) {
    feedback.textContent = `La parola deve essere di ${secretWord.length} lettere!`;
    return;
  }

  // Creare una nuova riga e aggiornarla con il tentativo
  const row = createRow();
  updateRow(row, guess);

  // Verificare se il giocatore ha vinto
  checkWin(guess);

  // Pulisci l'input
  guessInput.value = "";
});

// Avvia il gioco caricando la prima immagine e parola
loadNewImageAndWord();