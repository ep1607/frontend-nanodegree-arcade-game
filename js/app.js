//promoted loction of player
//"use strict";
var x=0;
var y=0;
var index=0;

var playerSprite = [
    'char-boy', 'char-cat-girl', 'char-horn-girl', 'char-pink-girl', 'char-princess-girl'
];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=Math.floor(-50+Math.random()*(-1000));
    this.y=Math.floor(35+Math.random()*210);
    this.velocity=Math.random()+1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.velocity=this.velocity*dt;
    this.x+=+50*dt*this.velocity;
    
    if(this.x > 505) {
        this.x=Math.floor(-50+Math.random()*(-1000));
    }
    
    this.collisionDetector();
 
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collisionDetector = function() {
    
    var rangeX = Math.abs(this.x-x);
    var rangeY = Math.abs(this.y-y);
    //console.log("absX:"+rangeX+" absY:"+rangeY);
    
    if ((rangeX <= 45) && (rangeY <= 45)) {
        //console.log("reset");
        resetPlayer();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    
    this.x=200;
    this.y=400;
    this.sprite = 'images/'+playerSprite[index]+'.png';
    this.score=0;
    
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    if(this.y < 0) {
        //if player reaches water
        this.y=400;
        this.score++;
        //resetPlayer();
    }
    else if(this.y > 400) {
        //if player wants to move down
        this.y=400;
    }
    else if(this.x  > 410) {
        this.x=410;
    }
    else if(this.x < -10) {
        this.x=-10;
    }
    x=this.x;
    y=this.y;
    
};


// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    renderScore(this.score);
};

// handles the input and translates it into player movement
Player.prototype.handleInput = function(key) {
    if(key === "left") {this.x-=50;}
    else if(key === "right") {this.x+=50;}
    else if(key === "down") {this.y+=50;}
    else if(key === "up") {this.y-=50;}

};

//changes player sprite
Player.prototype.changePlayer = function() {
    
    index++;
    index=Math.abs(index)%5;
    
    this.sprite = 'images/'+playerSprite[index]+'.png';
    
};

//resets the player so that it creates a new one
var resetPlayer = function() {
    
    player = new Player();
    
};

//renders the number successful road corsses that player has made
var renderScore  =  function(s) {
        
        console.log(s);
        
        //if players wins 3 times
        if(s>2) {
            renderWin();
        } else {
            ctx.clearRect(33, 75, 35, 40);
            ctx.fillStyle="#000000";
            ctx.font="30px Verdana";
           // ctx.fillText("win", 445, 535);
            ctx.fillText(s, 40, 105);    
        }
        
};


//renders message that player has won
var renderWin  = function() {
            ctx.fillStyle="#ffd700";
            ctx.font="100px Verdana";
           // ctx.fillText("win", 445, 535);
            ctx.fillText("WIN!", 140, 330);
            ctx.fillStyle="#ffffff";
            ctx.font="25px Verdana";
            ctx.fillText("hit the bug to restart the game!", 60, 350);
    
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [];


for (var i = 10; i >= 0 ; i--) {
    allEnemies[i] = new Enemy();
}


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

// wheel listener that calls the function to change player sprite
document.addEventListener('wheel', function() {
    player.changePlayer();
});

