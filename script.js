const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let score = 0;
let speed = 5;
let gameOver = false;
let obstaclePosition = 600;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

function jump() {
    if (!player.classList.contains("jump")) {
        player.classList.add("jump");
        setTimeout(() => {
            player.classList.remove("jump");
        }, 600);
    }
}

function gameLoop() {
    if (gameOver) return;

    obstaclePosition -= speed;
    obstacle.style.right = (600 - obstaclePosition) + "px";

    let playerBottom = parseInt(
        window.getComputedStyle(player).getPropertyValue("bottom")
    );

    if (
        obstaclePosition < 120 &&
        obstaclePosition > 50 &&
        playerBottom < 40
    ) {
        alert("Game Over! Score: " + score);
        gameOver = true;
        return;
    }

    if (obstaclePosition <= 0) {
        obstaclePosition = 600;
        score++;
        scoreDisplay.innerText = score;

        if (score % 5 === 0) {
            speed += 1;
        }
    }

    requestAnimationFrame(gameLoop);
}

function restartGame() {
    score = 0;
    speed = 5;
    gameOver = false;
    obstaclePosition = 600;
    scoreDisplay.innerText = score;
    gameLoop();
}

gameLoop();