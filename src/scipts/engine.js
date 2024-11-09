const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },

    values:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)
        alert(`Game Over! O seu resultado fou ${state.values.result}`)
        state.view.lives--
    }
}

function playSound(){
    let audio = new Audio("./src/sounds/hit.m4a")
    audio.volume = 0.2
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition && state.values.hitPosition !== null){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound()
            }
        }) 
    })
}


function init(){
    moveEnemy()
    addListenerHitBox()
}

init()