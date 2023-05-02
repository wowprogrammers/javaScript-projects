let inputFile = document.querySelector('.fileInput');
let optionOfFilters = document.querySelectorAll('.filter button');
let filterName = document.querySelector('.filterInfo .name');
let valueOfFilter = document.querySelector('.filterInfo .value');
let sliderFilter = document.querySelector('.slider input');
let rotateOptions = document.querySelectorAll('.rotate button');
let imgPreview = document.querySelector('.previewImg img');
let resetFilters = document.querySelector('.resetFilter');
let imgChooseBtn = document.querySelector('.chooseImg');
let saveImageBtn = document.querySelector('.saveImg');




// Editor Options

let brightness = "100";
let saturation = "100";
let inversion = "0";
let grayScale = "0";
let rotate = 0;
let verticalFlip = 1;
let horizontalFlip = 1;


// All CallBack functions

// Load the Image
let imgLoad = () =>{
    let file = inputFile.files[0];
    if(!file) return;
    imgPreview.src = URL.createObjectURL(file);
    imgPreview.addEventListener('load', ()=>{
        resetFilters.click();
        let container = document.querySelector('.container')
        container.classList.remove('disable')
    })

}

// Filter Options

optionOfFilters.forEach(filter =>{

    filter.addEventListener('click', ()=>{

        let previousActiveFilter = document.querySelector('.active');
        previousActiveFilter.classList.remove("active");
        filter.classList.add('active');
        filterName.innerText = filter.innerText;

        if(filter.id === "brightness" ){
            sliderFilter.max = "200";
            sliderFilter.value = brightness;
            valueOfFilter.innerText = `${brightness}%`

        }else if(filter.id === "saturation"){
            sliderFilter.max = "200";
            sliderFilter.value = saturation;
            valueOfFilter.innerText = `${saturation}%`

        }else if(filter.id === "inversion"){
            sliderFilter.max = "100";
            sliderFilter.value = inversion;
            valueOfFilter.innerText = `${inversion}%`
        }
        // For grayscale
        else{
            sliderFilter.max = "100";
            sliderFilter.value = grayScale;
            valueOfFilter.innerText = `${grayScale}%`

        }
    })
})

// Apply the filter function

let applyFilter = () =>{
    imgPreview.style.transform = `rotate(${rotate}deg) scale(${horizontalFlip}, ${verticalFlip})`;
    imgPreview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayScale}%)`;

}


// Update the filter

let filterUpdate = () =>{
    valueOfFilter.innerText = `${sliderFilter.value}%`;
    let selectedFilter = document.querySelector('.filter .active');
    if(selectedFilter.id === "brightness"){
        brightness = sliderFilter.value;

    }else if(selectedFilter.id === "saturation"){
        saturation = sliderFilter.value;

    }else if(selectedFilter.id === "inversion"){
        inversion = sliderFilter.value;
    }else{
        grayScale = sliderFilter.value; 
    }
    // Apply the filter

    applyFilter()
}

// Rotate Options

rotateOptions.forEach(rotateItem =>{
    rotateItem.addEventListener("click", () => {
        if(rotateItem.id === "left"){
            rotate = rotate - 90;
        }else if(rotateItem.id === "right"){
            rotate = rotate + 90;
        }else if(rotateItem.id === "horizontal"){
            horizontalFlip = horizontalFlip === 1 ? -1 : 1;
        }else{
            // For vertical flip
            verticalFlip = verticalFlip === 1 ? -1 : 1
        }
        applyFilter();
    })
})

// Reset All the Filters

let resetFilter = () =>{
     brightness = "100";
     saturation = "100";
     inversion = "0";
     grayScale = "0";
     rotate = 0;
     verticalFlip = 1;
     horizontalFlip = 1;
     optionOfFilters[0].click();
     applyFilter()
}

// Save Your Image

let imageSave = () =>{
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = imgPreview.naturalWidth;
    canvas.height = imgPreview.naturalHeight;

    context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayScale}%)`;
    context.translate(canvas.width / 2, canvas.height / 2 );
    if(rotate !== 0){
        context.rotate(rotate * Math.PI / 100);

    }
    context.scale(horizontalFlip,verticalFlip);
    context.drawImage(imgPreview, -canvas.width / 2, -canvas.height / 2, canvas.width,canvas.height);
    let link = document.createElement('a');
    link.download = "imageDownloaded.jpg";
    link.href = canvas.toDataURL();
    link.click();

}






// All Event Listeners

inputFile.addEventListener('change',imgLoad);
imgChooseBtn.addEventListener('click', () => inputFile.click());
sliderFilter.addEventListener('input',filterUpdate);
resetFilters.addEventListener('click',resetFilter);
saveImageBtn.addEventListener('click',imageSave);