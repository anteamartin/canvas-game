function Obstacle(game) {
  this.game = game;
 //Math.floor(Math.random()*(max-min+1)*min)
  this.x = this.game.canvas.width;
  this.y = 650;
  this.w = 50;
  this.h = -80;
}

Obstacle.prototype.draw = function() {
  this.game.ctx.fillStyle = "brown";
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};

Obstacle.prototype.move = function() {
  this.x -= 10;
};
