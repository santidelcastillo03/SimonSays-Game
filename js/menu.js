
document.getElementById('startGameLink').addEventListener('click', function(e) {
    e.preventDefault();
    const playerInput = document.getElementById('playerName');
    const playerName = playerInput.value.trim();
    
    if (playerName === "") {
      document.getElementById('nameModal').classList.remove('hidden');
    } else {
      localStorage.setItem('playerName', playerName);
      window.location.href = 'html/game.html';
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