var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Gorilla= function(game,x,y, _level,_speed,_direction,_high_jump){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'gorilla_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('idle',Phaser.Animation.generateFrameNames('jump', 1, 1), 10, true);
    this.animations.add('jump',Phaser.Animation.generateFrameNames('jump',2,2), 10, true);
    this.animations.add('colgar',Phaser.Animation.generateFrameNames('colgar',1,3), 10, true);
    
    this.speed = _speed;
    this.direction = _direction;
    this.high_jump = _high_jump;
    this.jumpRate = 2000;
    this.nextJump = 0;
    this.colgar = false;
    this.attack_jump = false;
    this.pass = false;
    game.physics.arcade.enable(this);
    //this.body.gravity.y = gameOptions.megamanGravity;
    this.body.setSize(30,30, 0,10);
    
    this.altitude = 0;
};

MegamanGame.prefab_Gorilla.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Gorilla.prototype.constructor = MegamanGame.prefab_Gorilla;

MegamanGame.prefab_Gorilla.prototype.update = function(){
    if(this.attack_jump == false) {
        this.game.physics.arcade.collide(this,this.level.terrain);
    }
    this.game.debug.body(this);
    
    if(this.body.blocked.down){
            console.log("col");
        }
    
    if(this.colgar == false && this.body.x - this.level.megaman.body.x < 80 && this.pass == false){
         this.animations.play('jump');
         this.body.velocity.y = -this.high_jump;
         this.colgar = true;
    }
    else if(this.colgar == true && this.pass == false){
        
        this.animations.play('colgar');
        
        if(this.body.x - this.level.megaman.body.x < 40 && this.pass == false){
            this.attack_jump = true;
            this.animations.play('jump');
            
            if(this.level.megaman.body.y + this.altitude < this.body.y && this.pass == false){
                this.body.velocity.y = -this.high_jump;
                //this.pass == false
                this.altitude = 100;
            }
            
            if(this.level.megaman.body.y > this.body.y && !this.pass){
                this.body.gravity.y = gameOptions.megamanGravity;
                //this.pass = true;
            }
            
        }
    }
    else if(this.pass == true){
        this.body.velocity.y =0;
    }
    
}