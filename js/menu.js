// Capturamos el enlace "Start Game"
document.getElementById('startGameLink').addEventListener('click', function(e) {
    // Prevenir la redirección inmediata
    e.preventDefault();
    // Obtenemos el nombre ingresado en el input
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName !== "") {
      // Guardamos el nombre en localStorage para usarlo en game.html
      localStorage.setItem('playerName', playerName);
      // Redirigimos a game.html
      window.location.href = 'game.html';
    } else {
      // Si el input está vacío, mostramos un mensaje de alerta
      alert("Please enter your name before starting the game.");
    }
  });
  