const content = document.getElementById('content');

document.querySelectorAll('.sticky-note').forEach(sticky => {
    let cleared = false;

    sticky.addEventListener('dblclick', () => {
        sticky.contentEditable = "true";
        sticky.focus();
    });

    sticky.addEventListener('input', () => {
        if (!cleared) {
            sticky.textContent = '';
            cleared = true;
        }
    });

    sticky.addEventListener('blur', () => {
        sticky.contentEditable = "false";
    });
});

const board = document.getElementById('board');
const addSticky = document.getElementById('add-note-btn');

let draggedNote = null;
let offsetX = 0;
let offsetY = 0;

// Create a new sticky note
function createStickyNote(x = 50, y = 50) {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    note.contentEditable = true;
    note.textContent = 'Type here...';

    note.style.left = x + 'px';
    note.style.top = y + 'px';

    board.appendChild(note);

    return note;
}

// Add new sticky note button
addSticky.addEventListener('click', () => {
    const x = Math.random() * (board.clientWidth - 180);
    const y = Math.random() * (board.clientHeight - 180);
    createStickyNote(x, y);
});

// Drag start
document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('sticky-note')) {
        draggedNote = e.target;
        draggedNote.classList.add('dragging');

        offsetX = e.clientX - draggedNote.offsetLeft;
        offsetY = e.clientY - draggedNote.offsetTop;
    }
});

// Drag move
document.addEventListener('mousemove', (e) => {
    if (!draggedNote) return;

    draggedNote.style.left = e.clientX - offsetX + 'px';
    draggedNote.style.top = e.clientY - offsetY + 'px';
});

// Drag end
document.addEventListener('mouseup', () => {
    if (draggedNote) {
        draggedNote.classList.remove('dragging');
        draggedNote = null;
    }
});

// Drag the board 

let boardDragging = false;
let boardOffsetX = 0;
let boardOffsetY = 0;

board.addEventListener('mousedown', (e) => {
    // Prevent dragging when clicking a sticky note
    if (e.target.classList.contains('sticky-note')) return;

    boardDragging = true;
    boardOffsetX = e.clientX - board.offsetLeft;
    boardOffsetY = e.clientY - board.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!boardDragging) return;

    board.style.left = e.clientX - boardOffsetX + 'px';
    board.style.top = e.clientY - boardOffsetY + 'px';
});

document.addEventListener('mouseup', () => {
    boardDragging = false;
});


// Shape Dropdown Menu

const addShapeBtn = document.getElementById('add-shape-btn');
const shapeDropdown = document.getElementsByClassName('shape-dropdown');

addShapeBtn.addEventListener('mouseenter', () => {
    shapeDropdown.style.display = 'block';
});

addShapeBtn.addEventListener('mouseleave', () => {
    shapeDropdown.style.display = 'none';
});
