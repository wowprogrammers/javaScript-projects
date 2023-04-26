// All Variables (Global Scope)

let currentTime = document.querySelector('.currentTime');
let content = document.querySelector('.content');
let menuSelect = document.querySelectorAll('select');
let alarmButton = document.querySelector('.button');
let alarmTime;
let alarmStatus;
let ringTone = new Audio('./alarm tone/alarm_clock.mp3');





// Setting Current Time

setInterval(()=>{

    let currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();
    // We can make this variable local to this scope
    let amPm = "AM";

    if(hour >= 12){
        hour = hour-12;
        amPm = "PM";
    }

    hour = hour == 0 ? hour = 12 : hour;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    currentTime.innerText = `${hour}:${minute}:${second} ${amPm}`;

    if(alarmTime == `${hour}:${minute} ${amPm}`){
        ringTone.play();
        ringTone.loop = true;
    }
},1000) 


// Setting Hour, Minutes and AM/PM

// For Hour
for(let i = 12; i>0 ;i--){
    i = i < 10 ? `0${i}` : i;
    let option = `<option value = "${i}">${i}</option>`;

    menuSelect[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

// For minute

for(let i = 59; i>0 ;i--){
    i = i < 10 ? `0${i}` : i;
    let option = `<option value = "${i}">${i}</option>`;

    menuSelect[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

// For AM/PM

for(let i = 2; i>0 ;i--){
    let amPm = i == 1 ? "AM" : "PM";
    let option = `<option value = "${amPm}">${amPm}</option>`;

    menuSelect[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

// Creating Function for Alarm Setting

function setAlarm(){
    // To Stop the Alarm
    if(alarmStatus){
        alarmTime = "";
        ringTone.pause();
        content.classList.remove('disable');
        alarmButton.innerText = "Set Alarm For Coding";
        return alarmStatus = false;

    }

    // To set the alarm

    let time = `${menuSelect[0].value}:${menuSelect[1].value} ${menuSelect[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){

        return alert("Please, Select a valid time to set the alarm");

    }

    alarmTime = time;
    alarmStatus = true;
    content.classList.add('disable');
    alarmButton.innerText = "Stop the Alarm";

}

alarmButton.addEventListener('click',setAlarm)



