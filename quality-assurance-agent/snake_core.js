function equal(a, b) {
  return a.x === b.x && a.y === b.y;
}

function createState({ width = 20, height = 10, snake, food, direction, score = 0 } = {}) {
  if (!snake) throw new Error('snake is required');
  if (!food) throw new Error('food is required');
  if (!direction) throw new Error('direction is required');
  return { width, height, snake: snake.map(s => ({ x: s.x, y: s.y })), food: { x: food.x, y: food.y }, direction: { x: direction.x, y: direction.y }, score };
}

function step(state, opts = {}) {
  const randomFn = opts.randomFn || Math.random;
  const { width, height } = state;
  const head = { x: state.snake[0].x + state.direction.x, y: state.snake[0].y + state.direction.y };

  // Wall collision
  if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
    return { state, gameOver: true };
  }

  // Self collision
  if (state.snake.some(seg => equal(seg, head))) {
    return { state, gameOver: true };
  }

  const newSnake = [head, ...state.snake];
  let ate = false;
  let newFood = state.food;
  let newScore = state.score;

  // Food collision
  if (equal(head, state.food)) {
    ate = true;
    newScore = state.score + 1;
    newFood = { x: Math.floor(randomFn() * width), y: Math.floor(randomFn() * height) };
  } else {
    newSnake.pop();
  }

  const newState = { ...state, snake: newSnake, food: newFood, score: newScore };
  return { state: newState, ate, gameOver: false };
}

function drawBoard(state) {
  let board = '';
  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      if (state.snake.some(seg => seg.x === x && seg.y === y)) {
        board += 'O';
      } else if (state.food.x === x && state.food.y === y) {
        board += 'X';
      } else {
        board += '·';
      }
    }
    board += '\n';
  }
  return board;
}

module.exports = { createState, step, drawBoard, equal };
