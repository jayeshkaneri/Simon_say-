let btns = document.querySelectorAll(".btn");
let h2 = document.querySelector("h2");

let isStarted = false;
let level = 0;

const colorsArray = ["red", "yellow", "green", "blue"];

let gameSeq = [];
let userSeq = [];

document.addEventListener("keypress", () => {
    if(!isStarted) {
        isStarted = true;
        levelUp();
    }
})


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    // console.log("key pressed");

    let colorIndex = Math.floor(Math.random() * 4);
    let color = colorsArray[colorIndex];
    let colorBtn = document.querySelector(`.${color}`);
    // console.log(colorBtn);

    gameSeq.push(color);
    // console.log(gameSeq);

    flashColor(colorBtn);
}

function flashColor(btn) {
    btn.classList.add("colorFlash");
    setTimeout(() => {
        btn.classList.remove("colorFlash");
    }, 200);
}

function checkAns(idx) {
    
    if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length === userSeq.length) {
            setTimeout(levelUp, 1000)
        }
    } else {
        h2.innerHTML = `Game over. You score ${level} <br> Press any key to start`;
        
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";

        setTimeout(() => {
            body.style.backgroundColor = "white";
        }, 100)

        reset();
    }
}


function btnPress() {
    if(!isStarted) {
        return;
    }

    let pressedBtn = this;
    // console.log(pressedBtn);
    const pressedBtnColor = pressedBtn.getAttribute("id");
    // console.log(id);
    userSeq.push(pressedBtnColor);
    // console.log(userSeq);

    flashColor(pressedBtn);

    checkAns(userSeq.length - 1);
}


for(const btn of btns) {
    btn.addEventListener("click", btnPress)
}

function reset() {
    isStarted = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
