// Global Variables

let imgContainer = document.querySelector('.imgContainer');
let allImgs = document.querySelectorAll('.img');
let arrowIcons = document.querySelectorAll('.icon i')

let isDraggingValue = false;


// Handle Icons Function
let handleIcons = (scrollValue) => {
    let maxScrollableWidth = imgContainer.scrollWidth - imgContainer.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollValue <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollValue <= 1 ? "none" : "flex"
}
 

// Arrow Icons

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let widthOfScroll = imgContainer.scrollLeft += icon.id === "left" ? -340 : +340;
        // Call handleIcons Function
        handleIcons(widthOfScroll);
    })
})

// All Images

allImgs.forEach(img => {
    img.addEventListener('click', () => {
        // Remove active class from previous active element
        imgContainer.querySelector('.active').classList.remove('active');
        // Add active class on current clicked element
        img.classList.add('active');
    })
})

// Drag Method
let drag = (e) => {
    if(!isDraggingValue) return;
    imgContainer.classList.add('dragging');
    imgContainer.scrollLeft -= e.movementX;
    handleIcons(imgContainer.scrollLeft);
}



// Stop Drag Method

let stopDrag = () =>{
    isDraggingValue = false;
    imgContainer.classList.remove('dragging');

}

// Event Listener
imgContainer.addEventListener('mousedown', () => isDraggingValue = true);
imgContainer.addEventListener('mousemove',drag);
document.addEventListener('mouseup',stopDrag)