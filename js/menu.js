// Remove duplicate event listener that used alert.
// Use this single event listener for Start Game button:
document.getElementById('startGameLink').addEventListener('click', function(e) {
    e.preventDefault();
    const playerInput = document.getElementById('playerName');
    const playerName = playerInput.value.trim();
    
    if (playerName === "") {
      // Show modal if no name is entered
      document.getElementById('nameModal').classList.remove('hidden');
    } else {
      localStorage.setItem('playerName', playerName);
      window.location.href = 'game.html';
    }
  });
  
  const sounds = {
    pop: new Audio('../sounds/pop.mp3')
  };
  
  function pop(){
    sounds.pop.play();
  }
  
  document.addEventListener('DOMContentLoaded', pop);
  
  document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('nameModal').classList.add('hidden');
  });