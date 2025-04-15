// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// ball class

class Ball {
    // constructor
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    // function to draw the balls
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    // updating the ball's data
    update() {
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }
        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }
        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }
        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }
        this.x += this.velX;
        this.y += this.velY;
    }
    // collision detection between balls -- bounce off of eachother instead of change color
    collisionDetect() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx**2 + dy**2);

                if (distance <= this.size + ball.size) {
                    ball.velX = -ball.velX;
                    ball.velY = -ball.velY;
                }
            }
        }
    }

}

const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball (
        // ball always initially appears within bounds (one ball width away from edge of the canvas) to avoid errors
        random(0 + size, width - size),
        random(0 + size, height - size), 
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );
    balls.push(ball);
}

// ball animation loop
function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)"; // produces little trails behind the balls as they move
    ctx.fillRect(0, 0, width, height);
    
    for (const ball of balls){
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    requestAnimationFrame(loop); //runs a set number of times per second for a smooth animation
}

loop();