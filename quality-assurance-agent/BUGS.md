# BUGS

This file lists potential bugs discovered during testing and inspection. Do not fix without approval.

1. Random food placement may land on the snake body (medium):
   - `snake_core.step` uses `Math.floor(random()*width)` without checking snake positions. This can cause food to appear inside the snake.

2. Console rendering characters (low):
   - The board uses the `·` character which may render incorrectly in some consoles.

3. Browser vs Node mismatch (informational):
   - `snake.js` in this folder assumes `window` and DOM event listeners and is not suitable for Node-based unit tests.

4. No prevention of immediate reverse direction in `snake_core` (low):
   - Input handling in `snake.js` prevents reversing, but `snake_core.step` assumes the provided `direction` is valid. If external callers pass an immediate reverse, behavior may be unclear.

Please review and approve fixes before implementing.
