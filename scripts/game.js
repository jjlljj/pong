function Game(screenId) {
  var canvas = document.getElementById(screenId);
  var screen = canvas.getContext('2d');
  var gameSize = {x: canvas.width, y: canvas.height};
  var frameLength = 80;

  this.bodies = [new Player1(this, gameSize), new Player2(this,gameSize), new Ball(this, gameSize)]
  this.keyboarder = new Keyboarder();

  var self = this;
  this.tick = setInterval(function(){
    self.update();
    self.draw(screen, gameSize);
  }, frameLength);
};

Game.prototype.update = function() {
  if (colliding(this.bodies[2], this.bodies[0])) {
    this.setBallVelocity(this.bodies[0]);
  };
  if (colliding(this.bodies[2], this.bodies[1])) {
    this.setBallVelocity(this.bodies[1]);
  };

  for (var i=0; i < this.bodies.length; i++) {
    this.bodies[i].update(this.keyboarder);
  };
};

Game.prototype.setBallVelocity = function(player){
  var x = -(this.bodies[2].velocity.x);
  var y = (this.bodies[2].velocity.y + player.velocity.y) / 2;
  this.bodies[2].velocity = {x: x, y: y }
}

Game.prototype.draw = function(screen, gameSize) {
  screen.clearRect(0, 0, gameSize.x, gameSize.y)

  this.bodies.forEach(function(body){
    drawRect(screen, body);
  });
};

function Player1(game, gameSize) {
  this.game = game;
  this.center = {x: 5, y: gameSize.y / 2 - 20};
  this.size = {x: 5, y: 40};
  this.velocity = {x:0, y:0}
};

Player1.prototype.update = function(keys) {
  if (keys.isDown(keys.KEYS.P1UP) && this.center.y > 0) {
    this.center.y -= 10;
    this.velocity.y = -10;
  } else if (keys.isDown(keys.KEYS.P1DOWN) && this.center.y < 320 - this.size.y) {
    this.center.y += 10;
    this.velocity.y = 10;
  } else {
    this.velocity.y = 0;
  };
};

function Player2(game, gameSize) {
  this.game = game;
  this.center = {x: gameSize.x - 10, y: gameSize.y / 2 - 20}
  this.size = {x: 5, y: 40};
  this.velocity = {x:0, y:0}
};

Player2.prototype.update = function(keys) {
  if (keys.isDown(keys.KEYS.P2UP) && this.center.y > 0) {
    this.center.y -= 10;
    this.velocity.y = -10;
  } else if (keys.isDown(keys.KEYS.P2DOWN) && this.center.y < 320 - this.size.y) {
    this.center.y += 10;
    this.velocity.y = 10;
  } else {
    this.velocity.y = 0;
  }
}

function Ball(game, gameSize) {
  this.game = game;
  this.center= {x: gameSize.x / 2 - 5, y: gameSize.y / 2 - 5}
  this.size = {x: 10, y: 10}
  this.velocity = {x: 10, y: 0}
}

Ball.prototype.update = function() {
  this.center = {x: this.center.x + this.velocity.x, y: this.center.y + this.velocity.y}
  if (this.center.y <= 0 || this.center.y >= 310) {
    this.velocity.y = -this.velocity.y;
  }
}

function drawRect(screen, body) {
  screen.fillRect(body.center.x, body.center.y, body.size.x, body.size.y);
}

function Keyboarder(keys) {
  var keyState = {};
  window.onkeydown = function(e) {
    keyState[e.keyCode] = true;
  };
  window.onkeyup = function(e) {
    keyState[e.keyCode] = false;
  };
  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };
  this.KEYS = {P1UP: 65, P1DOWN: 90, P2UP: 222, P2DOWN: 191};
};

function colliding(b1, b2) {
  return !(b1 === b2 || 
            b1.center.x + b1.size.x / 2 <= b2.center.x - b2.size.x / 2 ||
            b1.center.y + b1.size.y / 2 <= b2.center.y - b2.size.y / 2 + 15 ||
            b1.center.x - b1.size.x / 2 >= b2.center.x + b2.size.x / 2 ||
            b1.center.y - b1.size.y / 2 >= b2.center.y + b2.size.y / 2 + 20);
};

window.onload = function() {
  new Game('screen');
}