function Player(game) {
  this.game = game;
  this.x = 50;
  this.y0 = 550;
  this.y = this.y0;
  this.w = 100;
  this.h = 100;
  this.img = new Image();
  this.img.src = "./img/player.png"
  this.img.frames = 3;
  this.frameIndex = 2;
  this.isJumping = false;
  this.vy = 9;
  this.bullets = [];
  //this.gravity = 25;
}

Player.prototype.draw = function () {

  this.game.ctx.drawImage(
    this.img,
    this.frameIndex * (this.img.width / this.img.frames),
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  this.bullets.forEach(function(b){
    b.draw();
  })
};

Player.prototype.setListeners = function () {
  document.onkeydown = function (event) {
    if (event.keyCode === 32) {
      this.isJumping = true;
    } else if (event.keyCode === 38) {
      this.shoot();
    }



  }.bind(this);
}
Player.prototype.gravity = function () {
  if (this.y < this.y0) {
    this.y += this.vy;
  }
};
Player.prototype.jump = function () {
  if (this.isJumping) {
    this.y -= 18
    if (this.y < 400) {
      this.isJumping = false
    }
  }
};

Player.prototype.shoot = function () {
this.bullets.push(new Bullet (this.game))
};

Player.prototype.animateImg = function () {
  if (this.game.framesCounter % 10 === 0 && !this.isJumping) {
    this.frameIndex += 1;
    if (this.frameIndex > 2) {
      this.frameIndex = 0;
    }
  }
};

Player.prototype.move = function () {
  this.gravity();
  this.jump();
  this.bullets.forEach(function(b){
    b.move();
  })
};
