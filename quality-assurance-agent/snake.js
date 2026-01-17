(function consoleSnake() {
    const width = 20;
    const height = 10;
    let snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];
    let food = {x: 15, y: 5};
    let direction = {x: 1, y: 0};
    let score = 0;

    // Listen for keys to change direction.
    // Use `window` in browsers, `process.stdin` in Node.
    let _stdinHandler = null;
    if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':    if(direction.y === 0) direction = {x: 0, y: -1}; break;
                case 'ArrowDown':  if(direction.y === 0) direction = {x: 0, y: 1};  break;
                case 'ArrowLeft':  if(direction.x === 0) direction = {x: -1, y: 0}; break;
                case 'ArrowRight': if(direction.x === 0) direction = {x: 1, y: 0};  break;
            }
        });
    } else if (typeof process !== 'undefined' && process.stdin) {
        const onKey = (chunk) => {
            const key = String(chunk);
            if (key === '\u0003') { // Ctrl+C
                cleanupAndExit();
                return;
            }

            // Arrow keys: '\u001b[A' etc. Also accept WASD.
            if (key === '\u001b[A' || key === '\x1b[A' || key === '\u001bOA') {
                if (direction.y === 0) direction = {x: 0, y: -1};
            } else if (key === '\u001b[B' || key === '\x1b[B' || key === '\u001bOB') {
                if (direction.y === 0) direction = {x: 0, y: 1};
            } else if (key === '\u001b[D' || key === '\x1b[D' || key === '\u001bOD') {
                if (direction.x === 0) direction = {x: -1, y: 0};
            } else if (key === '\u001b[C' || key === '\x1b[C' || key === '\u001bOC') {
                if (direction.x === 0) direction = {x: 1, y: 0};
            } else {
                // WASD fallback
                switch (key.toLowerCase()) {
                    case 'w': if (direction.y === 0) direction = {x: 0, y: -1}; break;
                    case 's': if (direction.y === 0) direction = {x: 0, y: 1}; break;
                    case 'a': if (direction.x === 0) direction = {x: -1, y: 0}; break;
                    case 'd': if (direction.x === 0) direction = {x: 1, y: 0}; break;
                }
            }
        };

        // Enable raw mode and listen
        try {
            process.stdin.setRawMode(true);
        } catch (e) {
            // some environments may not support raw mode
        }
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', onKey);
        _stdinHandler = onKey;

        const cleanupAndExit = () => {
            try {
                if (_stdinHandler) process.stdin.removeListener('data', _stdinHandler);
                if (process.stdin.isTTY && process.stdin.setRawMode) process.stdin.setRawMode(false);
            } catch (e) {}
            console.log('Exiting.');
            process.exit(0);
        };

        // Ensure cleanup on normal exit
        process.on('exit', () => {
            try { if (process.stdin.isTTY && process.stdin.setRawMode) process.stdin.setRawMode(false); } catch (e) {}
        });
    }

    function update() {
        // Calculate new head position
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

        // Check Wall Collision
        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
            return gameOver();
        }

        // Check Self Collision
        if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
            return gameOver();
        }

        snake.unshift(head);

        // Check Food Collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height)
            };
        } else {
            snake.pop();
        }

        draw();
    }

    function draw() {
        let board = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (snake.some(seg => seg.x === x && seg.y === y)) {
                    board += 'O'; // Snake body
                } else if (food.x === x && food.y === y) {
                    board += 'X'; // Food
                } else {
                    board += '·'; // Empty space
                }
            }
            board += '\n';
        }
        
        console.clear();
        console.log(`Score: ${score} | Use Arrow Keys`);
        console.log(board);
    }

    function gameOver() {
        clearInterval(gameLoop);
        console.clear();
        console.log(`GAME OVER! Final Score: ${score}`);
        console.log("Refresh page to play again.");
    }

    const gameLoop = setInterval(update, 200);
})();