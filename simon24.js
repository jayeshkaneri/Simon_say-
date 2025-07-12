let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function () {  //function to start the game //
    if(started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
 
})

function gameFlash(btn) {  //function to create flash color //
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {  //function to create flash color //
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {  //function to update level value and  to generate random color //
    userSeq = [];
    level++; //to update value of level //
    h2.innerText = `level ${level}`; // to insert value of level in h2 element //

    let randInx = Math.floor(Math.random() * 4);
    let randColor = btns[randInx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {

    if(gameSeq[idx] === userSeq[idx]) {
       if (userSeq.length == gameSeq.length) {
        setTimeout(levelUp, 1000);
       }
    } else {
        h2.innerHTML = `Game over! Your score is ${level} <br>Press any key to start`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function userPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll('.btn');
for (btnn of allbtns) {
    btnn.addEventListener("click", userPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
