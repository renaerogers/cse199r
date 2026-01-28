const content = document.getElementById('content');

document.querySelectorAll('.sticky-note').forEach(sticky => {
    sticky.addEventListener('dblclick', () => {
        sticky.contentEditable = "true";
        sticky.focus();
    });

    sticky.addEventListener('blur', () => {
        sticky.contentEditable = "false";
    });
});

document.getElementById('add-sticky-note-btn').addEventListener('click', () => {
    const newSticky = document.createElement('div');
    newSticky.className = 'sticky-note';
    newSticky.textContent = 'Double-Click to edit';

    newSticky.style.position = 'absolute';
    const maxX = content.clientWidth - 150;
    const maxY = content.clientHeight - 150;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    newSticky.style.left = randomX + 'px';
    newSticky.style.top = randomY + 'px';

    newSticky.addEventListener('dblclick', () => {
        sticky.contentEditable = "true";
        sticky.focus();
    });

    newSticky.addEventListener('blur', () => {
        newSticky.contentEditable = "false";
    });

    content.appendChild(newSticky);
});
