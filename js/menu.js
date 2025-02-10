// menu.js
document.getElementById('start-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const playerName = document.getElementById('playerName').value.trim();
    if(playerName !== ""){
      // Se guarda el nombre del jugador en localStorage para utilizarlo en game.html
      localStorage.setItem('playerName', playerName);
      // Redirecciona a la página del juego
      window.location.href = 'game.html';
    }
  });
  