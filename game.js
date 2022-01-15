var canvas=document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//getting html element for dispalying live score
var scoreTop = document.querySelector("#score");
//start/play again button
var gameBtn = document.querySelector("#game-btn");
//div for showing score and initializing game
var gamePage = document.querySelector("#game-init");
//total score html element
var totalScore = document.querySelector("#game-score");
//game score
var score=0;

var mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("click", function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    if(player.dx == v || player.dx == -v && player.dy == 0){
        if(player.y > mouse.y){
            player.dx = 0;
            player.dy = -v;
        }
        else if(player.y < mouse.y){
            player.dx=0;
            player.dy =v;
        }
    }
    else if(player.dx == 0 && player.dy == v || player.dy == -v){
        if(player.x > mouse.x){
            player.dx = -v;
            player.dy = 0;
        }
        else if(player.x < mouse.x){
            player.dx=v;
            player.dy =0;
        }
    }
    
})

function Player(x,y,r,v,color){
    this.x=x;
    this.y=y;
    this.dx=v;
    this.dy=0;
    this.r=r;
    this.color=color;

    this.update = function(){
       
        this.x += this.dx;
        this.y += this.dy;

        if(this.x <= this.r || this.x >= canvas.width - this.r || this.y <= this.r || this.y >= canvas.height - this.r){
            cancelAnimationFrame(animateId);
            //updating the total score and showing score
            totalScore.innerHTML = score;
            gameBtn.innerHTML = "Play Again";
            gamePage.style.display = "block";
        }

        this.draw();
    }
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    

}

function Food(x,y,r,color){
    this.x=x;
    this.y=y;
    this.r=r;
    this.color=color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

}

var v;
var player; 
var food = [];

function spawnFoods(){
    for(var i=0; i<5; i++){
        var r=10;
        var x= Math.random()*(canvas.width -  2*50) + 50;
        var y= Math.random()*(canvas.height -  2*50) + 50;
        food.push(new Food(x,y,r,"#fff"));
    }
}
var animateId;
function animate(){
    animateId= requestAnimationFrame(animate);
    //c.clearRect(0,0,canvas.width, canvas.height)
    c.fillStyle = 'rgb(0,0,0, 0.04)';
    c.fillRect(0,0,canvas.width, canvas.height);
    player.update();
    for(var i=0; i<food.length; i++){
        var d = Math.pow((Math.pow(player.x-food[i].x, 2) + Math.pow(player.y-food[i].y, 2)), .5);
        if(d<= (player.r + food[i].r)){
            var r=10;
            var x= Math.random()*(canvas.width - 2*50) + 50;
            var y= Math.random()*(canvas.height -  2*50) + 50;
            food[i] = new Food(x,y,r,"#fff");
            player.r += 0.3;
            v *= 1.02;
            player.dx *= 1.02; 
            player.dy *= 1.02;
            score +=r; 
            
        }
        else{
            food[i].draw();
        }
        //updating live score
        scoreTop.innerHTML = score;
    }
}

//initializing the game
function init() {
    v=1.5; 
    player = new Player(15,100,15,v,"red");
    score=0;
    food = [];
    spawnFoods();
    animate();
    
}

//start game/play game button
gameBtn.addEventListener("click",function() {
    c.fillStyle = 'black';
    c.clearRect(0,0,canvas.width, canvas.height);
    //starting game
    init();
    //initializing live score to 0
    scoreTop.innerHTML = '0';
    //hiding the div
    gamePage.style.display = 'none';
})