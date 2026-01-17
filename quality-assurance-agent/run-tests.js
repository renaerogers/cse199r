const assert = require('assert');
const { createState, step, drawBoard, equal } = require('./snake_core');

function testMoveWithoutEating() {
  const state = createState({
    width: 5,
    height: 5,
    snake: [{ x: 1, y: 1 }, { x: 0, y: 1 }],
    food: { x: 10, y: 10 },
    direction: { x: 1, y: 0 },
    score: 0,
  });

  const res = step(state);
  assert.strictEqual(res.gameOver, false, 'should not be game over');
  assert.strictEqual(res.state.snake.length, 2, 'snake length should remain 2');
  assert.deepStrictEqual(res.state.snake[0], { x: 2, y: 1 }, 'head should move right');
  assert.strictEqual(res.state.score, 0, 'score should not change');
}

function testEatingFood() {
  const state = createState({
    width: 20,
    height: 10,
    snake: [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }],
    food: { x: 6, y: 5 },
    direction: { x: 1, y: 0 },
    score: 0,
  });

  const res = step(state, { randomFn: () => 0.5 });
  assert.strictEqual(res.gameOver, false, 'should not be game over when eating');
  assert.strictEqual(res.ate, true, 'should have eaten food');
  assert.strictEqual(res.state.score, 1, 'score should increment');
  assert.strictEqual(res.state.snake.length, 4, 'snake should grow by 1');
  // new food should be inside bounds (with randomFn 0.5 -> floor(0.5*20)=10)
  assert.strictEqual(typeof res.state.food.x, 'number');
  assert.strictEqual(typeof res.state.food.y, 'number');
  assert(res.state.food.x >= 0 && res.state.food.x < state.width, 'food.x in bounds');
  assert(res.state.food.y >= 0 && res.state.food.y < state.height, 'food.y in bounds');
}

function testWallCollision() {
  const state = createState({
    width: 3,
    height: 3,
    snake: [{ x: 2, y: 1 }, { x: 1, y: 1 }],
    food: { x: 0, y: 0 },
    direction: { x: 1, y: 0 },
    score: 0,
  });

  const res = step(state);
  assert.strictEqual(res.gameOver, true, 'should be game over on wall collision');
}

function testSelfCollision() {
  // head at (2,1) moving left into (1,1) which is part of the body
  const state = createState({
    width: 5,
    height: 5,
    snake: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }],
    food: { x: 10, y: 10 },
    direction: { x: -1, y: 0 },
    score: 0,
  });

  const res = step(state);
  assert.strictEqual(res.gameOver, true, 'should be game over on self-collision');
}

function testDrawBoard() {
  const state = createState({
    width: 3,
    height: 3,
    snake: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    food: { x: 2, y: 2 },
    direction: { x: 1, y: 0 },
    score: 0,
  });

  const board = drawBoard(state);
  // Expect top row: OO·\n
  const rows = board.trim().split('\n');
  assert.strictEqual(rows.length, 3, 'should have 3 rows');
  assert.strictEqual(rows[0], 'OO·', 'top row should show two snake segments');
  assert.strictEqual(rows[2], '··X', 'bottom row should show food at right column');
}

function testEqualFunction() {
  const a = { x: 1, y: 2 };
  const b = { x: 1, y: 2 };
  const c = { x: 2, y: 2 };
  assert.strictEqual(equal(a, b), true, 'equal should return true for same coords');
  assert.strictEqual(equal(a, c), false, 'equal should return false for different coords');
}

function testCreateStateValidation() {
  // createState should require snake, food, and direction
  assert.throws(() => createState({}), /snake is required/, 'should throw when snake missing');
  assert.throws(() => createState({ snake: [{x:0,y:0}] }), /food is required/, 'should throw when food missing');
  assert.throws(() => createState({ snake: [{x:0,y:0}], food: {x:0,y:0} }), /direction is required/, 'should throw when direction missing');
}

function testImmutableStep() {
  const orig = createState({
    width: 5,
    height: 5,
    snake: [{ x: 1, y: 1 }, { x: 0, y: 1 }],
    food: { x: 10, y: 10 },
    direction: { x: 1, y: 0 },
    score: 0,
  });

  const clone = JSON.parse(JSON.stringify(orig));
  const res = step(orig);
  // original state must not be mutated
  assert.deepStrictEqual(orig, clone, 'step should not mutate the input state');
}

function runAllTests() {
  try {
    testMoveWithoutEating();
    testEatingFood();
    testWallCollision();
    testSelfCollision();
    testDrawBoard();
    testEqualFunction();
    testCreateStateValidation();
    testImmutableStep();
    console.log('All tests passed');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

runAllTests();
