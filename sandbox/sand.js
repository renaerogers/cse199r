const resizableRect = document.getElementById('resizable-rect');
const handleTR = document.getElementById('handle-tr'); // Example handle

let isResizing = false;

handleTR.addEventListener('mousedown', function(e) {
    isResizing = true;
    e.preventDefault(); // Prevent default browser drag behavior
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (isResizing) {
        const newWidth = e.clientX - resizableRect.getBoundingClientRect().left;
        const newHeight = e.clientY - resizableRect.getBoundingClientRect().top;

        // Apply constraints as needed
        if (newWidth > 50) {
            resizableRect.style.width = newWidth + 'px';
        }
        if (newHeight > 50) {
            resizableRect.style.height = newHeight + 'px';
        }
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

