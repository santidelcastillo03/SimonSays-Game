/* game.js */
// Variables del juego
let gameSequence = [];
let playerSequence = [];
let round = 0;
let score = 0;
const colors = ["red", "green", "blue", "yellow"];
// Se asume que dispones de archivos de audio en una carpeta "sounds"
const sounds = {
  red: new Audio('sounds/red.mp3'),
  green: new Audio('sounds/green.mp3'),
  blue: new Audio('sounds/blue.mp3'),
  yellow: new Audio('sounds/yellow.mp3')
};

// Elementos del DOM

const displayPlayerName = document.getElementById('displayPlayerName');
const roundDisplay = document.getElementById('round');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const colorButtons = document.querySelectorAll('.color-btn');

// Recuperar el nombre del jugador guardado en localStorage
const playerName = localStorage.getItem('playerName') || 'Jugador';
document.getElementById('displayPlayerName').textContent = playerName;


// Función para iniciar el juego
function iniciarJuego(){
  gameSequence = [];
  playerSequence = [];
  round = 0;
  score = 0;
  actualizarInfo();
  siguienteRonda();
}

// Actualiza la información de ronda y puntaje en pantalla
function actualizarInfo(){
  roundDisplay.textContent = round;
  scoreDisplay.textContent = score;
}

// Inicia la siguiente ronda: incrementa la ronda, agrega un color aleatorio y muestra la secuencia
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
  let i = 0;
  const intervalo = setInterval(() => {
    const color = gameSequence[i];
    activarBoton(color);
    i++;
    if(i >= gameSequence.length){
      clearInterval(intervalo);
    }
  }, 800);
}

// Activa un botón: aplica la clase de animación y reproduce el sonido
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

// Maneja la interacción del jugador al hacer clic en un botón
colorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
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

// Cuando el jugador se equivoca, se termina el juego
function gameOver(){
  alert(`Juego Terminado, ${playerName}. Puntaje: ${score}`);
  guardarPuntaje(playerName, score);
  restartBtn.classList.remove('hidden');
  // Desactivar botones para evitar más interacciones
  colorButtons.forEach(btn => btn.disabled = true);
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

// Inicia el juego al cargar la página
document.addEventListener('DOMContentLoaded', iniciarJuego);
