/* scoreboard.js */
function cargarPuntajes(){
    let jugadores = JSON.parse(localStorage.getItem('jugadores')) || {};
    const scoreTable = document.getElementById('scoreTable');
    scoreTable.innerHTML = ""; // Limpia la tabla
    
    // Get entries and sort them descending by score
    const sortedEntries = Object.entries(jugadores).sort((a, b) => b[1] - a[1]);
    
    sortedEntries.forEach(([jugador, puntaje]) => {
      const row = document.createElement('tr');
      const cellName = document.createElement('td');
      cellName.textContent = jugador;
      const cellScore = document.createElement('td');
      cellScore.textContent = puntaje;
      row.appendChild(cellName);
      row.appendChild(cellScore);
      scoreTable.appendChild(row);
    });
  }
  
  document.addEventListener('DOMContentLoaded', cargarPuntajes);
