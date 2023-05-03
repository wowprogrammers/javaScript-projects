let imgContainer = document.querySelector('.imgContainer');
let allImgs = document.querySelectorAll('.img');
let arrowIcons = document.querySelectorAll('.icon i');


let isDragging = false

// Handle Your Icons

let handleIcons = (scrollValue) =>{
    let maxScrollableWidth = imgContainer.scrollWidth - imgContainer.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollValue <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollValue <= 1 ? "none" : "flex";
}

// Arrow Icons

arrowIcons.forEach((icon) =>{

    icon.addEventListener('click', ()=>{
        let widthOfScroll = imgContainer.scrollLeft += icon.id === "left" ? -340 : 340;
        handleIcons(widthOfScroll); 

    })

})

allImgs.forEach(img =>{
    img.addEventListener('click', ()=>{
        imgContainer.querySelector('.active').classList.remove('active');
        img.classList.add('active')
    })
})


let drag = (e) =>{
    if(!isDragging) return;
    imgContainer.classList.add("dragging");
    imgContainer.scrollLeft -= e.movementX;
    handleIcons(imgContainer.scrollLeft)
}

// Drag Stop

let dragStop = () =>{
    isDragging = false;
    imgContainer.classList.remove('dragging')
}

imgContainer.addEventListener('mousedown',  () => isDragging = true);
imgContainer.addEventListener('mousemove' ,drag);

document.addEventListener('mouseup', dragStop);