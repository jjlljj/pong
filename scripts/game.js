function Game(screenId) {
  var canvas = document.getElementById(screenId);
  var screen = canvas.getContext('2d');
  var gameSize = {x: canvas.width, y: canvas.height};
  var frameLength = 300;

  this.bodies = [new Player1(this, gameSize), new Player2(this,gameSize), new Ball(this, gameSize)]

  var self = this;
  this.tick = setInterval(function(){
    self.update();
    self.draw(screen, gameSize);
  }, frameLength);
};

Game.prototype.update = function() {

}

Game.prototype.draw = function(screen, gameSize) {
  this.bodies.forEach(function(body){
    drawRect(screen, body);
  });
};

function Player1(game, gameSize) {
  this.game = game;
  this.center = {x: 10, y: gameSize.y / 2 - 15};
  this.size = {x: 5, y: 30};
};

function Player2(game, gameSize) {
  this.game = game;
  this.center = {x: gameSize.x - 10, y: gameSize.y / 2 - 15}
  this.size = {x: 5, y: 30};
};

function Ball(game, gameSize) {
  this.game = game;
  this.center= {x: gameSize.x / 2 - 5, y: gameSize.y / 2 - 5}
  this.size = {x: 10, y: 10}
}

function drawRect(screen, body) {
  screen.fillRect(body.center.x, body.center.y, body.size.x, body.size.y);
}

window.onload = function() {
  new Game('screen');
}