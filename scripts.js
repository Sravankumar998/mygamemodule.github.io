
const hero = document.querySelector(".hero");
const villain = document.getElementsByClassName("villain");
const container = document.querySelector('.container');
const gold = document.getElementsByClassName("gold");
const score = document.getElementById('score');
const lives = document.getElementById('lives');
const stati = document.getElementById('status');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const canvas = document.getElementsByClassName('canvas1')
const can = document.getElementById('canvas');
const btn = document.getElementsByClassName('btn');

let liveNum = 3;
let scoreNum = 0;


window.onload = start;


//setting up random positions of gold

let p = () => Math.floor( Math.random() * 80);

for(let i=0;i<gold.length;i++){
    gold[i].style.top = p() + '%';
    gold[i].style.left = p() + '%';
}

const gc = window.getComputedStyle(gold[0]).getPropertyValue('background-color');

// starting the game here

function start(){

align();  

//calling moving function when presses a key or button

document.onkeydown = move;

for(let j=0;j<btn.length;j++){
    btn[j].onpointerdown = move;
}

//setting the initial position of hero

var up = 90 ;
var side = 0 ;

hero.style.top = up + '%';
hero.style.left = side + '%';

//movement of hero character is written in the move function 

function move(e){

    e = e || window.event;


    if (e.keyCode == '38' || this.innerHTML == "U") {
        // up arrow
        if( up <= 0 || up > 90){
            up = 0;
            return;
        }else{
            up = up - 1;
            hero.style.top = up + '%';
        }
    
    }
    else if (e.keyCode == '40' || this.innerHTML == 'D') {
        // down arrow
        score.innerHTML = 'Gold: '+ scoreNum;
        score.style.background = 'white';
        if( up < 0 || up >= 90){
            up = 90;
            return;
        }else{
            up = up + 1;
            hero.style.top = up + '%';
        }
        
    }
    else if (e.keyCode == '37' || this.innerHTML == 'L') {
        // left arrow
        score.innerHTML = 'Gold: '+ scoreNum;
        score.style.background = 'white';
        if( side <= 0 || side > 90){
            side = 0;
            return;
        }else{
            side = side - 1;
            hero.style.left = side + '%';    
        }        
    }
    else if (e.keyCode == '39' || this.innerHTML == 'R') {
        // right arrow
        if( side < 0 || side >= 90){
            side = 90;
            return;
        }else{
            side = side + 1;
            hero.style.left = side + '%';
            
        }   
    }

    //collecting gold 

    let hl = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
    let ht = parseInt(window.getComputedStyle(hero).getPropertyValue('top'));
    
    for(let i=0;i<gold.length;i++){
        var gl = parseInt(window.getComputedStyle(gold[i]).getPropertyValue('left'));
        var gt = parseInt(window.getComputedStyle(gold[i]).getPropertyValue('top'));
        let gEc = window.getComputedStyle(gold[i]).getPropertyValue('background-color');
        if((ht > (gt - hh)) && (ht < (gt + hh * 0.25)) && (hl > (gl - hh)) && (hl < (gl + hh * 0.25) && (gc===gEc))){

            gold[i].style.background = 'white';
            gold[i].style.visibility = 'hidden';
            scoreNum++;
            score.innerHTML = 'Gold: '+ scoreNum;
        }
    }

    //winning or not enough gold

    if ( up == 0 && side == 90 && scoreNum == gold.length) {
        alert('you won the game');
        location.reload();
    }else if(up == 0 && side == 90){
        score.style.background = 'red';
        score.innerHTML = 'not enough';
    }
}

// setting up the random positions of villains

function align(){
    var num = [10,20,30,40,50,60,70,80]
    function x(){ return Math.floor(Math.random() * num.length)}
    for(let i=0;i<villain.length;i++){
        if(i%2 == 0){
            villain[i].style.left = num[x()] + '%';
        }else{
            villain[i].style.top = num[x()] + '%';
        }   
}
}


// villain killing function begins here

const timer = setInterval (killMe, 100);

killMe();

var hh = parseInt(window.getComputedStyle(hero).getPropertyValue('height'));
function killMe() {

    let hl = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
    let ht = parseInt(window.getComputedStyle(hero).getPropertyValue('top'));
    for (var i = 0, len = villain.length; i < len; i++) {    
        let vl = parseInt(window.getComputedStyle(villain[i]).getPropertyValue('left'));
        let vt = parseInt(window.getComputedStyle(villain[i]).getPropertyValue('top'));
        if((ht > (vt - hh * 0.9)) && (ht < (vt + hh * 0.9)) && (hl > (vl - hh * 0.9)) && (hl < (vl + hh * 0.9))){
            console.log('you died');
            liveNum--;
            lives.innerHTML = 'Lives left: ' + liveNum;
            if(liveNum == -1){
                clearInterval(timer, 100);
                alert('you lost the game');
                location.reload();
            }
            start();
        }
    }
}
}

//sprite animation begins here

var hh1 = parseInt(window.getComputedStyle(hero).getPropertyValue('height'));

for(let j=0;j<canvas.length;j++){
let ctx = canvas[j].getContext('2d');
let noOfFrames = 9;
    let gameFrame = 0;
    const staggerFrame = 9;

    
    function animate(){
        ctx.clearRect(0, 0, 10 * hh1, 10 * hh1);
        let position = Math.floor((gameFrame / staggerFrame) % (noOfFrames - 1))

        let frameX = 213 * position;
        ctx.drawImage(image1, frameX, 0, 213, 212, 0, 0, 300, 150);
        gameFrame++;
        requestAnimationFrame(animate);
    
    };
    animate();
}

let ct = can.getContext('2d');
let noOfFrame = 6;
let gamFrame = 0;
const staggeFrame = 12;
    
    function animate1(){
        ct.clearRect(0, 0, 10 * hh1, 10 * hh1);
        let positio = Math.floor((gamFrame / staggeFrame) % (noOfFrame - 1))
        let framX = 218 * positio;
        ct.drawImage(image2, framX, 0, 218, 177, 0, 0, 300, 150);
        gamFrame++;
        requestAnimationFrame(animate1);
    
    };
animate1();
