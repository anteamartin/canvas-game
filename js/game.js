function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");
  this.background = new Background (this);
  this.player = new Player (this);
  this.obstacles = [new Obstacle(this)];

  this.interval;
  this.fps = 60;

  this.framesCounter = 0;

  this.reset();
}

Game.prototype.start = function() {
  this.player.setListeners();
  this.interval = setInterval(function(){
    this.framesCounter++;

    if (this.framesCounter > 1000) this.framesCounter = 0;

    this.clear();
    this.clearObstacles();
    this.moveAll();
    this.draw();

    this.player.animateImg();

    if (this.framesCounter % 100 === 0) {
      this.generateObstacle();
    }
    if (this.isCollision()) {
      this.gameOver();
    }
  }.bind(this), 1000/this.fps);

};

Game.prototype.stop = function() {
};

Game.prototype.gameOver = function() {
  this.stop();
  
  if(confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start();
  }
};

Game.prototype.reset = function() {
};

Game.prototype.isCollision = function() {
  var collision = false;
  this.obstacles.forEach(function(o){
    if ((this.player.x + this.player.w) > o.x &&
        this.player.x < o.x + o.w &&
        (this.player.y + this.player.h) >= o.y) {

      collision = true;
    }
  }.bind(this));
  return collision;
};

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(o) {
    return o.x > 0;
  })
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();

  this.obstacles.forEach(function(o) { o.draw(); })
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();

  this.obstacles.forEach(function(o) { o.move(); })
};
