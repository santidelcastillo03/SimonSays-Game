document.getElementById('startGameLink').addEventListener('click', function(e) {
    e.preventDefault();
    const playerName = document.getElementById('playerName').value.trim();
    console.log("Nombre capturado:", playerName); // Verifica en la consola
    if (playerName !== "") {
      localStorage.setItem('playerName', playerName);
      window.location.href = 'game.html';
    } else {
      alert("Please enter your name before starting the game.");
    }
  });
  