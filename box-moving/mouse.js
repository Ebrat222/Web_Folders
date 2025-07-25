const card = document.getElementById("card");
let isDragging = false;
let offsetX, offsetY;

card.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - card.getBoundingClientRect().left;
    offsetY = e.clientY - card.getBoundingClientRect().top;
    card.style.cursor = "grabbing";
    card.style.position = "absolute"; // Needed to move the div
});

card.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    card.style.left = x + "px";
    card.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    card.style.cursor = "grab";
});