const gameGrid = document.querySelector('.game-grid')
const currentSnake = [2, 1, 0];
const squares = [];
const apples = [25];
let direction = 1;
const width = 10;


function makeGrid() {
    for (let i = 0; i < 100; i++) {
        const myDiv = document.createElement('div');
        myDiv.classList.add('grids');
        gameGrid.appendChild(myDiv);
        squares.push(myDiv);
    }

}


function render() {
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    apples.forEach(index => squares[index].classList.add('apples'));
}

function checkCollision() {
    
}

function moveSnake() {
    let tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add('snake');
}

function control(e) {
    if(e.key === 'ArrowLeft') {
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

const timerID = setInterval(moveSnake, 1000);

makeGrid();
render();