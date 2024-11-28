let score = 0;
let gameActive = false;
const colors = ['#ff61d8', '#7e2ecc', '#00ff9f', '#00b8ff', '#ff3860'];

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    gameActive = true;
    score = 0;
    updateScore();
    spawnBubbles();
}

function spawnBubbles() {
    if (!gameActive) return;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 30 + 30;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.left = Math.random() * (400 - size) + 'px';
    
    bubble.onclick = () => {
        if (!gameActive) return;
        bubble.remove();
        score += 10;
        updateScore();
    };

    document.querySelector('.game-container').appendChild(bubble);

    bubble.addEventListener('animationend', () => {
        if (bubble.parentElement) {
            bubble.remove();
            endGame();
        }
    });

    setTimeout(() => spawnBubbles(), Math.random() * 1000 + 500);
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function endGame() {
    gameActive = false;
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('finalScore').textContent = score;
    
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => bubble.remove());
}

function restartGame() {
    document.getElementById('gameOver').style.display = 'none';
    startGame();
}
