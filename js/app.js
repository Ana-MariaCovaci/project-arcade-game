// Enemies our player must avoid
class Enemy {

    // Constructor for a new Enemy
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = this.x + 100 * dt;

        // When the enemy moves off the screen, resets the enemy position
        if (this.x > 600) {
            this.x = randomSpawn();
        }

        // Check for player/enemy collision
        if (this.x > player.x - 50 &&
            this.x < player.x + 50 &&
            this.y > player.y - 50 &&
            this.y < player.y + 50) {
                player.x = player.startX;
                player.y = player.startY;
        }

        // Logs the enemy x and y position
        console.log('x: ' + this.x, 'y:' + this.y);

    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// The Player Class
class Player {

    // Constructor for a new Player
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-princess-girl.png';
        this.startX = x;
        this.startY = y;
    }

    update() {
        this.x = this.x;
        this.y = this.y;
    }

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(controls) {
       // Movement controls
        switch (controls) {
            case 'up':
                this.y -= 85;
                break;
            case 'down':
                this.y += 85;
                break;
            case 'right':
                this.x += 100;
                break;
            case 'left':
                this.x -= 100;
                break;
        }

        // Logs the player x and y position
        console.log('x: ' + this.x, 'y:' + this.y);

        // Confine player movement
        if (this.x > 400) {
            this.x = 400;
        } else if (this.x < 0) {
            this.x = 0;
        } else if (this.y > 390) {
            this.y = 390;
        } else if (this.y < 0) {
            alert("Congratulations!");
            this.x = this.startX;
            this.y = this.startY;
        }
    }

}

// Returns a random -x location for the enemy to spawn
function randomSpawn() {
    let randomLocation = [-100, -150, -200, -250, -300, -350, -400];
    return randomLocation[Math.floor(Math.random() * randomLocation.length)];
}

// Array containing the enemy objects
const allEnemies = [
    new Enemy(randomSpawn(), 60),
    new Enemy(randomSpawn(), 130),
    new Enemy(randomSpawn(), 210),
    new Enemy(randomSpawn(), 130)
];

// Player object
const player = new Player(200, 390);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
