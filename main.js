const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Shape {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
    
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
    
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
    
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
    
        this.x += this.velX;
        this.y += this.velY;
    };
}

class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY, color, size);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    };

    collisionDetect() {
        for (let i = 0; i < boxes.length; i++) { //Check if a Ball collides with a box
            const dx = this.x - boxes[i].x;
            const dy = this.y - boxes[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + boxes[i].size) { 
                if (this.size < (boxes[i].size/2)) { //Ef boxið er stærra en hringurinn, freeze ball
                    this.velX = 0;
                    this.velY = 0;
                }

                else if (this.size > (boxes[i].size/2)){ //Ef hringurinn er stærri en boxið, freeze box
                    boxes[i].velX = 0;
                    boxes[i].velY = 0;
                }

                else {
                    return;
                }
            }
        }

        for (let i = 0; i < balls.length; i++) { //Check if a Ball collides with a ball
            if (!(this === balls[i])) {
                const dx = this.x - balls[i].x;
                const dy = this.y - balls[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + (balls[i].size)) {
                    if (balls[i].velX === 0 || balls[i].velY === 0) { //If ball collides with a frozen ball, unfreeze.
                        balls[i].velX = this.velX;
                        balls[i].velY = this.velY;
                    }

                    else {
                        return;
                    }
                }
            }
        }
    };
}

class Box extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY, color, size);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fill();
    };

    collisionDetect() {

        for (let i = 0; i < boxes.length; i++) { //Check if a box collides with a box
            if (!(this === boxes[i])) {
                const dx = this.x - boxes[i].x;
                const dy = this.y - boxes[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + (boxes[i].size)) {
                    if (boxes[i].velX === 0 || boxes[i].velY === 0) { //If box collides with fozen box, unfreeze
                        boxes[i].velX = this.velX;
                        boxes[i].velY = this.velY;
                    }

                    else {
                        return;
                    }
                }
            }
        }
    };
}

let shapes = [] //Heldur utanum bæði hringi og boxin
let balls = []; //Heldur utanum hringina
let boxes = []; //Heldur utanum boxin

while (shapes.length < 6) { //Býr til hringina
    let size = random(20, 30);
    let ball = new Ball(
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-4,4),
        random(-4,4),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
        size
    );

    shapes.push(ball);
    balls.push(ball);
}

while (shapes.length < 12) { //Býr til boxin
    let size = random(40, 60);
    let box = new Box(
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-2,2),
        random(-2,2),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
        size
    )

    shapes.push(box);
    boxes.push(box);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < shapes.length; i++) {
        shapes[i].draw();
        shapes[i].update();
        shapes[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

function WinOrLose() {
    let boxCount = 0;
    let ballCount = 0;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].velX === 0 || boxes[i].velY === 0){
            boxCount++;
        }
    }

    for (let j = 0; j < balls.length; j++) {
        if (balls[j].velX === 0 || balls[j].velY === 0){
            ballCount++;
        }
    }

    if (boxCount === (boxes.length)) {
        alert("Balls win");
    }

    else if (ballCount === (balls.length)) {
        alert("Boxes win");
    }
}

WinOrLose();
loop();

