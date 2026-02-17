// 1. INITIALIZE VARIABLES
const board = document.getElementById('board');
const addStickyBtn = document.getElementById('add-note-btn');

let draggedNote = null;
let draggingBoard = false;
let offsetX = 0;
let offsetY = 0;

// Helper function to keep board within bounds
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

///////////////////////////////
function createStickyNote(x = 50, y = 50) {
    const note = document.createElement('div');
    note.className = 'sticky-note';
    note.textContent = 'Double-click to edit';
    
    note.style.left = x + 'px';
    note.style.top = y + 'px';

    // IMPORTANT: Add the listeners to the NEW note right here
    note.addEventListener('dblclick', () => {
        note.contentEditable = "true";
        note.classList.add('editing'); // Optional: for CSS styling
        note.focus();
    });

    note.addEventListener('blur', () => {
        note.contentEditable = "false";
        note.classList.remove('editing');
        // If empty, reset text
        if (note.textContent.trim() === "") {
            note.textContent = "Double-click to edit";
        }
    });

    board.appendChild(note);
}

addStickyBtn.addEventListener('click', () => {
    // Note: use board.offsetWidth to ensure it spawns within the board
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    createStickyNote(x, y);
});
///////////////////////////

// Drag Start
document.addEventListener('mousedown', (e) => {
    // Check if we are clicking a note
    if (e.target.classList.contains('sticky-note')) {
        if (e.target.contentEditable === "true") return; // Don't drag while typing
        
        draggedNote = e.target;
        draggedNote.classList.add('dragging');

        const rect = draggedNote.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        e.stopPropagation(); // Stop board from dragging
    } 
    // Check if we are clicking the board itself
    else if (e.target === board) {
        draggingBoard = true;
        board.style.cursor = 'grabbing';
        
        offsetX = e.clientX - board.offsetLeft;
        offsetY = e.clientY - board.offsetTop;
    }
});

// Drag Movement
document.addEventListener('mousemove', (e) => {
    // Move Note
    if (draggedNote) {
        const boardRect = board.getBoundingClientRect();
        let newX = e.clientX - boardRect.left - offsetX;
        let newY = e.clientY - boardRect.top - offsetY;

        draggedNote.style.left = newX + 'px';
        draggedNote.style.top = newY + 'px';
    }

    // Move Board
    if (draggingBoard) {
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const minLeft = window.innerWidth - board.offsetWidth;
        const minTop = window.innerHeight - board.offsetHeight;

        board.style.left = clamp(newLeft, minLeft, 0) + 'px';
        board.style.top = clamp(newTop, minTop, 0) + 'px';
    }
});

// Drag End
document.addEventListener('mouseup', () => {
    if (draggedNote) draggedNote.classList.remove('dragging');
    draggedNote = null;
    draggingBoard = false;
    board.style.cursor = 'move';
});




// Move Board (and notes with it)
document.addEventListener('mousemove', (e) => {
    // Move Note
    if (draggedNote) {
        const boardRect = board.getBoundingClientRect();
        
        // Calculate position relative to the board
        let newX = e.clientX - boardRect.left - offsetX;
        let newY = e.clientY - boardRect.top - offsetY;

        draggedNote.style.left = newX + 'px';
        draggedNote.style.top = newY + 'px';
    }

    // Move Board
    if (draggingBoard) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const boardWidth = board.offsetWidth;
        const boardHeight = board.offsetHeight;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Limits: prevent the board from leaving the screen
        const minLeft = viewportWidth - boardWidth;
        const minTop = viewportHeight - boardHeight;

        board.style.left = clamp(newLeft, minLeft, 0) + 'px';
        board.style.top = clamp(newTop, minTop, 0) + 'px';
    }
});

function triggerImageSelection() {
    const selector = document.getElementById('imageSelector');
    if (selector.value === 'browse') {
        document.getElementById('fileInput').click();
    }
}
