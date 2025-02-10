/* scoreboard.js */
function cargarPuntajes(){
    let jugadores = JSON.parse(localStorage.getItem('jugadores')) || {};
    const scoreTable = document.getElementById('scoreTable');
    scoreTable.innerHTML = ""; // Limpiar la tabla
    for (const [jugador, puntaje] of Object.entries(jugadores)) {
      const row = document.createElement('tr');
      const cellName = document.createElement('td');
      cellName.textContent = jugador;
      const cellScore = document.createElement('td');
      cellScore.textContent = puntaje;
      row.appendChild(cellName);
      row.appendChild(cellScore);
      scoreTable.appendChild(row);
    }
  }
  
  document.addEventListener('DOMContentLoaded', cargarPuntajes);
  
  