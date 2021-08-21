const gameGrid = document.querySelector('.game-grid')
const scoreText = document.querySelector('.score');
const startGameButton = document.querySelector('.start-game');
let currentSnake = [2, 1, 0];
const squares = [];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;

startGameButton.addEventListener('click', startGame);

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apples');
    clearInterval(timerID);
    currentSnake = [2,1,0];
    score = 0;
    scoreText.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApples();
    currentSnake.forEach(index => squares[index].classList.add('snakes'));
    timerID = setInterval(moveSnake, intervalTime);
}

function makeGrid() {
    for (let i = 0; i < 100; i++) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('grids');
        gameGrid.appendChild(myDiv);
        squares.push(myDiv);
    }

}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);

    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apples');
}

function render() {
    currentSnake.forEach(index => squares[index].classList.add('snake'));
}


function moveSnake() {

    // Checks for hitting walls 
    if (
        (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')

    ) {
        scoreText.textContent = `${score} You Lost!!`
        return clearInterval(timerID)
    }


    let tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add('snake');

    //Checks for hitting apple
    if (squares[currentSnake[0]].classList.contains('apples')) {
        squares[currentSnake[0]].classList.remove('apples');
        currentSnake.push(currentSnake.length + 1);
        generateApples();
        score += 1;
        scoreText.textContent = score;

    }
}

function control(e) {
    if (e.key === 'ArrowLeft') {
        direction = -1;
    } else if (e.key === 'ArrowRight') {
        direction = +1;
    } else if (e.key === 'ArrowDown') {
        direction = +width;
    } else if (e.key === 'ArrowUp') {
        direction = -width;
    }
}

document.addEventListener('keydown', control);

let timerID = setInterval(moveSnake, 500);

makeGrid();
render();
generateApples();