	// For Fingers
	const card = document.getElementById("card");
let isDragging = false;
let offsetX, offsetY;

function startDrag(x, y) {
    isDragging = true;
    const rect = card.getBoundingClientRect();
    offsetX = x - rect.left;
    offsetY = y - rect.top;
    card.style.position = "absolute";
    card.style.cursor = "grabbing";
}

function drag(x, y) {
    if (!isDragging) return;
    const left = x - offsetX;
    const top = y - offsetY;
    card.style.left = left + "px";
    card.style.top = top + "px";
}

function endDrag() {
    isDragging = false;
    card.style.cursor = "grab";
}

// Mouse events
card.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
document.addEventListener("mousemove", (e) => drag(e.clientX, e.clientY));
document.addEventListener("mouseup", endDrag);

// Touch events
card.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
});

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    drag(touch.clientX, touch.clientY);
});

document.addEventListener("touchend", endDrag);