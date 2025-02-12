// Variables del juego
let gameSequence = [];
let playerSequence = [];
let round = 0;
let score = 0;
const colors = ["red", "green", "blue", "yellow"];
let allowInput = false; 

const sounds = {
  red: new Audio('../sounds/red.mp3'),
  green: new Audio('../sounds/green.mp3'),
  blue: new Audio('../sounds/blue.mp3'),
  yellow: new Audio('../sounds/yellow.mp3'),
  fail: new Audio('../sounds/fail.mp3'),
  start: new Audio('../sounds/start.mp3')
};

const displayPlayerName = document.getElementById('displayPlayerName');
const roundDisplay = document.getElementById('round');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const colorButtons = document.querySelectorAll('.color-btn');

// Recuperar el nombre del jugador guardado en localStorage
const playerName = localStorage.getItem('playerName') || 'Jugador';
document.getElementById('displayPlayerName').textContent = playerName;

function startGame() {
  //localStorage.clear(); //CUIDADO, SOLO USAR PARA BORRAR LOS DATOS 
  sounds.start.play();
  setTimeout(function() {
    iniciarJuego();
  }, 2000);
}

// Actualiza la información de ronda y puntaje en pantalla
function actualizarInfo(){
  roundDisplay.textContent = round;
  scoreDisplay.textContent = score;
}

// Inicia la siguiente ronda, incrementa la ronda, agrega un color aleatorio y muestra la secuencia
function siguienteRonda(){
  round++;
  score = round - 1;
  actualizarInfo();
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  mostrarSecuencia();
  playerSequence = [];
}

// Muestra la secuencia al jugador con animaciones y sonidos
function mostrarSecuencia(){
  displayMessage('');
  allowInput = false; 
  let i = 0;
  const intervalo = setInterval(() => {
    const color = gameSequence[i];
    activarBoton(color);
    i++;
    if(i >= gameSequence.length){
      clearInterval(intervalo);
      setTimeout(function() {
        displayMessage('Your turn!');
      }, 1000);
      allowInput = true; 
    }
  }, 800);
}

// Activa un boton aplica la clase de animacion y reproduce el sonido
function activarBoton(color){
  const btn = document.getElementById(color);
  btn.classList.add('active');
  playSound(color);
  setTimeout(() => {
    btn.classList.remove('active');
  }, 300);
}

// Reproduce el sonido correspondiente
function playSound(color){
  if(sounds[color]){
    sounds[color].currentTime = 0;
    sounds[color].play();
  }
}

// Maneja la interacción del jugador al hacer click en un boton
colorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if(!allowInput) return; 
    if(playerSequence.length < gameSequence.length){
      const color = btn.id;
      playerSequence.push(color);
      activarBoton(color);
      verificarSecuencia();
    }
  });
});

// Compara la secuencia ingresada por el jugador con la generada
function verificarSecuencia(){
  const index = playerSequence.length - 1;
  if(playerSequence[index] !== gameSequence[index]){
    gameOver();
    return;
  }
  if(playerSequence.length === gameSequence.length){
    setTimeout(siguienteRonda, 1000);
  }
}



// Guarda el puntaje en localStorage si es el mejor obtenido por el jugador
function guardarPuntaje(name, puntaje){
  if (!name) return; // No guardar si el nombre es vacío
  let jugadores = JSON.parse(localStorage.getItem('jugadores')) || {};
  if (!jugadores[name] || puntaje > jugadores[name]) {
    jugadores[name] = puntaje;
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
  }
}


// Permite reiniciar el juego
restartBtn.addEventListener('click', () => {
  colorButtons.forEach(btn => {
    btn.disabled = false;
  });
  restartBtn.classList.add('hidden');
  iniciarJuego();
});


function iniciarJuego(){
  gameSequence = [];
  playerSequence = [];
  round = 0;
  score = 0;
  actualizarInfo();
  siguienteRonda();
}

// New gameOver function
function gameOver() {
  sounds.fail.play();
  guardarPuntaje(playerName, score);
  const modal = document.getElementById('gameOverModal');
  modal.classList.remove('hidden');
}

// Muestra la secuencia al jugador con animaciones y sonidos


// Actualiza mensaje
function displayMessage(text){
  const messageEl = document.getElementById('message');
  if(messageEl){
    messageEl.textContent = text;
  }
}

document.getElementById('restartButton').addEventListener('click', function() {
  location.reload(); 
});

document.getElementById('mainMenuButton').addEventListener('click', function() {
  window.location.href = 'index.html'; 
});


// Inicia el juego al cargar la página
document.addEventListener('DOMContentLoaded', startGame);
