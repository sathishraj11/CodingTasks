let canvas, pen, cs, game_over, score, snake, food,trophy, f;

function init() {
    canvas = document.getElementById("mycanvas");
    canvas.width = 1000;
    canvas.height=1000; // Ensure full canvas size
    pen = canvas.getContext("2d");
    cs = 60;
    game_over = false;
    score = 5;

    food_img = new Image();
    food_img.src = "Assets/apple.png";
    trophy = new Image();
    trophy.src = "Assets/trophy.png";
    trophy.onload = function () {
        console.log("Trophy image loaded successfully.");
    };

    food = getRandomFood();

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function () {
            this.cells = [];
            for (let i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 5 }); // Start at y=5 to ensure visibility
            }
            console.log("Snake initialized: ", this.cells);
        },

        drawSnake: function () {
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },

        updateSnake: function () {
            let headX = this.cells[0].x;
            let headY = this.cells[0].y;

            if (headX === food.x && headY === food.y) {
                console.log("Food eaten");
                food = getRandomFood();
                score++;
            } else {
                this.cells.pop();
            }

            let nextX, nextY;
            if (this.direction == "right") nextX = headX + 1, nextY = headY;
            else if (this.direction == "left") nextX = headX - 1, nextY = headY;
            else if (this.direction == "down") nextX = headX, nextY = headY + 1;
            else nextX = headX, nextY = headY - 1;

            this.cells.unshift({ x: nextX, y: nextY });

            let last_x = Math.round(1000 / cs);
            let last_y = Math.round(1000 / cs);
            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x >= last_x || this.cells[0].y >= last_y) {
                game_over = true;
            }
        }
    };

    snake.createSnake();
}

// Function to draw the game
function draw() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Snake
    snake.drawSnake();

    // Draw Food
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);

    // Ensure trophy is loaded before drawing
    if (trophy.complete) {
        pen.drawImage(trophy, 100, 200, 80, 80); // Adjusted position & size
    } else {
        console.log("Trophy image not loaded yet.");
    }

    // Draw Score
    pen.fillStyle = "yellow";
    pen.font = "30px Roboto";
    pen.fillText(score,135, 235);
}


// Function to update game state
function update() {
    snake.updateSnake();
}

// Function to generate random food position
function getRandomFood() {
    let foodX = Math.floor(Math.random() * (1000 / cs));
    let foodY = Math.floor(Math.random() * (1000 / cs));
    return { x: foodX, y: foodY, color: "red" };
}

// Game loop function
function gameloop() {
    if (game_over) {
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

// Handling keypress events
function keyPressed(event) {
    if (event.key === "ArrowRight" && snake.direction !== "left") snake.direction = "right";
    else if (event.key === "ArrowLeft" && snake.direction !== "right") snake.direction = "left";
    else if (event.key === "ArrowDown" && snake.direction !== "up") snake.direction = "down";
    else if (event.key === "ArrowUp" && snake.direction !== "down") snake.direction = "up";
}

document.addEventListener("keydown", keyPressed);

// Start Button Click Event
document.getElementById("startGame").addEventListener("click", function () {
    document.getElementById("start-modal").style.display = "none"; // Hide Modal
    init(); // Initialize game
    setTimeout(() => {
        f = setInterval(gameloop, 150);
    }, 100);
});


