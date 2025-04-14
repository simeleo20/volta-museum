// script.js

// Funzione per ottenere un'immagine casuale dalla cartella "immagini"
function getRandomImage() {
    // Array di nomi di file delle immagini nella cartella "immagini"
    const images = [
      "pila.png",
      
    ];
  
    // Seleziona un'immagine casuale
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  
  // Funzione per estrarre il nome della parola dall'immagine
  function extractWordFromImage(imageName) {
    // Rimuove l'estensione ".png" dal nome del file
    return imageName.replace(".png", "").toUpperCase();
  }
  
  // Seleziona l'immagine casuale
  const currentImage = getRandomImage();
  const secretWord = extractWordFromImage(currentImage); // Estrae la parola dal nome del file
  
  // Imposta l'immagine nell'elemento HTML
  document.getElementById("image").src = `immagini/${currentImage}`;
  
  let attempts = 0;
  
  // Elementi DOM
  const gameBoard = document.getElementById("game-board");
  const guessInput = document.getElementById("guess-input");
  const submitButton = document.getElementById("submit-guess");
  const feedback = document.getElementById("feedback");
  const curiosity = document.getElementById("curiosity");
  
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
      submitButton.disabled = true;
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
  
    // Aumentare il numero di tentativi
    attempts++;
    guessInput.value = "";
  });