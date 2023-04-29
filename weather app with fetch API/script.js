// Global Variables
let container = document.querySelector('.container');
let infoTxt = document.querySelector('.infoTxt');
let inputField = document.querySelector('.fieldInput');
let weatherBtn = document.querySelector('.weatherBtn');

let weatherPart = document.querySelector('.weatherPart');


let weatherIcon = weatherPart.querySelector('img');
let backArrow = document.querySelector('header i');

let api;

// For "Enter" Key
inputField.addEventListener('keyup', e =>{
    if(e.key == "Enter" && inputField.value !== ""){
        // Call The API
        requestAPI(inputField.value);
    }

})
// For check Weather Button
weatherBtn.addEventListener('click',()=>{
    if(inputField.value !== ""){
        // Request API(call the API)
        requestAPI(inputField.value);
    }

})

// API Call Function

function requestAPI(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ec8b18813323f6dca2ed95bef6dcbfcd`;
    infoTxt.innerText = "Getting Details of weather";
    infoTxt.classList.add("pending");

    // fetch API
    fetch(api).then(res => res.json()).then(output => checkDetailsWeather(output)).catch(()=>{
        infoTxt.innerText = "Some Kind Of Issue there is...";
        infoTxt.classList.replace("pending","error");
    })
}

// weather Details Function

function checkDetailsWeather(result){
    if(result.cod == "404"){
        infoTxt.classList.replace('pending','error');
        infoTxt.innerText = `${inputField.value} is not valid city.Please try Again`;

    }else{
        console.log(result)
        let city = result.name;
        let country = result.sys.country;
        // Object Destructuring
        let {description,id} = result.weather[0];
        let {temp,feels_like,humidity,temp_min} = result.main;
        if(id == 800){
            // Clear Icon
            weatherIcon.src = "./Icons/icons-sun.png"
        }else if(id >= 200 && id <= 232 ){
            // Storm Icon
            weatherIcon.src = "./Icons/icons-cloud-lightning.png"
        }else if(id >= 600 && id <= 622){
            // For Snow Icon
            weatherIcon.src = "./Icons/icons-snow.png"
        }else if(id >= 701 && id <= 781){
            // For Haze Icon
            weatherIcon.src = "./Icons/icons-haze.png"
        }else if(id >= 801 && id <= 804){
            // For Cloud Icon
            weatherIcon.src = "./Icons/icons-cloud.png"
        }else if( (id >= 500 && id <= 531) || (id >= 300 && id <= 321) ){
            // For Rainfall Icon
            weatherIcon.src = "./Icons/icons-rainfall.png"
        }

        weatherPart.querySelector('.temp .numb').innerText = Math.floor(temp)
        weatherPart.querySelector('.weather').innerText = description;
        weatherPart.querySelector('.location span').innerText = `${city}, ${country}`;
        weatherPart.querySelector('.temp .feelsLike').innerText = Math.floor(feels_like);
        weatherPart.querySelector('.humidity span').innerText = `${humidity}%`;
        weatherPart.querySelector('.tempMin span').innerText = `${temp_min}`;
        infoTxt.classList.remove("pending");
        infoTxt.innerText = "";
        inputField.value = "";
        // For Weather details
        container.classList.add('active');
    }
}


backArrow.addEventListener('click',()=>{
    container.classList.remove('active');
})

// For BackSpace Key

document.addEventListener('keyup',e =>{
    if(e.key == "Backspace"){
        container.classList.remove('active');
    }
})