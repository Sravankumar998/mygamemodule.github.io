const hero = document.querySelector(".hero");
const villain = document.getElementsByClassName("villain");
const container = document.querySelector('.container');
const gold = document.getElementsByClassName("gold");
const score = document.getElementById('score');
const lives = document.getElementById('lives');
const stati = document.getElementById('status');
let liveNum = 3;
let scoreNum = 0;

window.onload = start;

let p = () => Math.floor( Math.random() * 80);

for(let i=0;i<gold.length;i++){
    gold[i].style.top = p() + '%';
    gold[i].style.left = p() + '%';
}

const gc = window.getComputedStyle(gold[0]).getPropertyValue('background-color');

function start(){

    align();

document.onkeydown = move;

//e.keyCode == '13'(for enter)

var up = 90 ;
var side = 0 ;

hero.style.top = up + '%';
hero.style.left = side + '%';

function move(e){

    

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        if( up <= 0 || up > 90){
            up = 0;
            return;
        }else{
            up = up - 1;
            hero.style.top = up + '%';
        }
    
    }
    else if (e.keyCode == '40') {
        // down arrow
        score.innerHTML = 'gold: '+ scoreNum;
        score.style.background = 'white';
        if( up < 0 || up >= 90){
            up = 90;
            return;
        }else{
            up = up + 1;
            hero.style.top = up + '%';
        }
        
    }
    else if (e.keyCode == '37') {
        // left arrow
        score.innerHTML = 'gold: '+ scoreNum;
        score.style.background = 'white';
        if( side <= 0 || side > 90){
            side = 0;
            return;
        }else{
            side = side - 1;
            hero.style.left = side + '%';    
        }        
    }
    else if (e.keyCode == '39') {
        // right arrow
        if( side < 0 || side >= 90){
            side = 90;
            return;
        }else{
            side = side + 1;
            hero.style.left = side + '%';
            
        }   
    }

    let hl = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
    let ht = parseInt(window.getComputedStyle(hero).getPropertyValue('top'));
    
    for(let i=0;i<gold.length;i++){
        var gl = parseInt(window.getComputedStyle(gold[i]).getPropertyValue('left'));
        var gt = parseInt(window.getComputedStyle(gold[i]).getPropertyValue('top'));
        let gEc = window.getComputedStyle(gold[i]).getPropertyValue('background-color');
        if((ht > (gt - hh)) && (ht < (gt + hh/2)) && (hl > (gl - hh)) && (hl < (gl + hh/2) && (gc===gEc))){
            //console.log(ht,vt,hl,vl);
            gold[i].style.background = 'white';
            scoreNum++;
            score.innerHTML = 'gold: '+ scoreNum;
        }
    }

    if ( up == 0 && side == 90 && scoreNum == gold.length) {
        alert('you won the game');
        location.reload();
    }else if(up == 0 && side == 90){
        score.style.background = 'red';
        score.innerHTML = 'not enough';
    }
}

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

const timer = setInterval (killMe, 100);

killMe();

var hh = parseInt(window.getComputedStyle(hero).getPropertyValue('height'));
function killMe() {
    let hl = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
    let ht = parseInt(window.getComputedStyle(hero).getPropertyValue('top'));
    for (var i = 0, len = villain.length; i < len; i++) {    
        let vl = parseInt(window.getComputedStyle(villain[i]).getPropertyValue('left'));
        let vt = parseInt(window.getComputedStyle(villain[i]).getPropertyValue('top'));
        if((ht > (vt - hh)) && (ht < (vt + hh)) && (hl > (vl - hh)) && (hl < (vl + hh))){
            console.log('you died');
            liveNum--;
            lives.innerHTML = 'Lives left: ' + liveNum;
            if(liveNum == 0){
                clearInterval(timer, 100);
                alert('you lost the game');
                location.reload();
            }
            start();
        }
    }
}
}