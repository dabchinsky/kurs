let snake = [0, 1, 2]
let cells = []

let up = -20
let down = 20
let right = 1
let left = -1

let key = right

let foodxy = -1
let foodIsRendered = 0

let isGameOver = 0

let points = 0
let message = document.querySelector('h1')

//////////////////////////////////////// Game window

let gameWindow = document.getElementById('game-window')

for (let i = 0; i < 400; i++) {
    cells.push(document.createElement('div'))
    cells[i].classList.add('cell')
}

cells.forEach(item => {
    gameWindow.appendChild(item)
})

function renderPoints(points) {
    message.innerHTML = `Points: ${points}`
}

renderSnake()

/////////////////////////////////////// Snake

// render snake
function renderSnake() {
    snake.forEach(tail => {
        cells[tail].classList.add('snake')
    })
}

// snake move
function snakeMove(key) {
    cells[snake[0]].classList.remove('snake')
    let head = snake[snake.length - 1]
    snake.shift()
    snake.push(head + key)
    if (snake[snake.length - 1] < 0) {
        snake[snake.length - 1] += 400
    }
    if (snake[snake.length - 1] >= 400) {
        snake[snake.length - 1] -= 400
    }
    console.log(snake)
}

//food check
function foodCheck() {
    let head = snake[snake.length - 1]
    if (head === foodxy) {
        points += 10
        cells[head].classList.remove('food')
        snake.unshift(snake[0])

        foodIsRendered = !foodIsRendered
    }
}

//collision check

function collisionCheck() {
    let head = snake[snake.length - 1]
    console.log(`head: ${head}`)

    //tail collision check
    let tail = snake.slice(0, snake.length - 1)
    console.log(`tail: ${tail}`)
    if (tail.includes(head)) {
        isGameOver = 1
    }
}

///////////////////////////////////////// food

function renderFood() {

    if (!foodIsRendered) {
        foodxy = Math.round(Math.random() * 400)
        while (snake.includes(foodxy)) {
            foodxy = Math.round(Math.random() * 400) 
        }
        cells[foodxy].classList.add('food')
        foodIsRendered = !foodIsRendered
    }
}


///////////////////////////////////////// Controls and game render 

document.addEventListener("keydown", function(event) {

    // Press enter to start game
    if (event.keyCode == 13) {

        //render game
        var renderInterval = setInterval(() => {
            if (isGameOver) {
                clearInterval(renderInterval)
                if(confirm('Game over')){
                    window.location.reload();  
                }
            }
            renderPoints(points)

            renderFood()
            snakeMove(key)
            collisionCheck()
            foodCheck()

            renderSnake()
        }, 80) 
    }

    // Game controls
    if (event.keyCode == 87 && key != down) {
      key = up
    }
    if (event.keyCode == 65 && key != right) {
        key = left
    }
    if (event.keyCode == 83 && key != up) {
        key = down
    }
    if (event.keyCode == 68 && key != left) {
        key = right
    }
  });


