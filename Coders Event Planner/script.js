// Global Variables

let calender = document.querySelector('.calendar');
let date = document.querySelector('.date');
let daysContainer = document.querySelector('.days');
let todayBtn = document.querySelector('.todayBtn');
let prevBtn = document.querySelector('.prev');
let nxtBtn = document.querySelector('.next');
let dateInput = document.querySelector('.dateInput');
let gotoBtn = document.querySelector('.gotoBtn');
let addEventButton = document.querySelector('.addEvent');
let closeButton = document.querySelector('.close');
let eventWrapper = document.querySelector('.addEventWrapper')
let eventTitle = document.querySelector('.eventName');
let eventFrom = document.querySelector('.eventTimeFrom');
let eventTo = document.querySelector('.eventTimeTo');
let submitEventBtn = document.querySelector('.addEventBtn')
let eventDay = document.querySelector('.eventDay');
let eventDate = document.querySelector(".eventDate");
let eventContainer = document.querySelector(".events")

let currentDay = new Date();
let month = currentDay.getMonth();
let year = currentDay.getFullYear();
let activeDay;

// Months Array

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Event Array initially empty 
let eventsArray = [];
getYourEvents();
console.log(eventsArray)


// Initialize Your Calender

let calenderInitialize = function(){

    let dayFirst = new Date(year,month,1);
    // console.log(dayFirst)
    let lastDay = new Date(year,month+1,0);
    // console.log("last",lastDay)
    // Last Day of previous month
    let prevLastDay = new Date(year,month,0);
    // console.log(prevLastDay)
    let daysPrev = prevLastDay.getDate();
    // console.log(daysPrev)
    let lastDate = lastDay.getDate();
    let day = dayFirst.getDay();
    // console.log("Day = ",day)
    let nextDays = 7 - lastDay.getDay() - 1; 
    // console.log(nextDays) // 3;
    
    // Current Month and year
    date.innerHTML = months[month] + " " + year;
    
    let allDays = "";
    // For Previous Month days
    for(let i = day;i>0;i--){
        allDays += `<div class = "day prevDate">${daysPrev - i + 1}</div>`;

    }

    // Check For any Event

    for(let j = 1;j<=lastDate;j++){
        // Check if any event present on that day
        let eventStatus = false;
        eventsArray.forEach(objEvent => {
            if(objEvent.day === j && objEvent.month === month+1 && objEvent.year === year){
                eventStatus = true;
            }
        });
        if( j === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
            activeDay = j;
            // Function to get Active day
            eventDetails(j)
            
           
            // Function to update the event

            showEventsUpdate(j)
          
            if(eventStatus){
                allDays += `<div class = "day today event active">${j}</div>`;
            }else{
                allDays += `<div class = "day today active">${j}</div>`;
            }
        }else{
            if (eventStatus) {
                allDays += `<div class="day event">${j}</div>`;
              } else {
                allDays += `<div class="day">${j}</div>`;
              }

        }
    }
    // For Next Month Days
    for(let k = 1;k <=nextDays;k++){
        allDays += `<div class = "day nextDate">${k}</div>`;
    }
    daysContainer.innerHTML = allDays;
    // Function to active "specific day" we clicked on
    activeStatus()

}
calenderInitialize()

// Active Status Function

function activeStatus(){
    let days = document.querySelectorAll('.day');
    days.forEach(day =>{
        day.addEventListener('click', (e) => {
            // Active Day Function
            eventDetails(e.target.innerHTML);
           

            // Update Event Function
           
            showEventsUpdate(Number(e.target.innerHTML))

            activeDay = Number(e.target.innerHTML);
            // console.log(e.target.innerHTML);

            // Remove Active From Previous...
            days.forEach(day =>{
                day.classList.remove("active");
            })

            // When user click on any previous/Next month date

            // For Previous Month
            if(e.target.classList.contains("prevDate")){
                // Call function for previous month
                prevMonth();

                // Now Add active status to clicked day when month is changed

                setTimeout(()=>{
                    let days = document.querySelectorAll('.day');
                    days.forEach(day =>{
                        if(!day.classList.contains("prevDate")
                            && day.innerHTML === e.target.innerHTML
                        ){
                            day.classList.add('active');
                        }
                    })
                },120);
                // Now for Next Month
            }else if(e.target.classList.contains("nextDate")){
                    nextMonth();
                // Now Add active status to clicked day when month is changed
                    setTimeout(()=>{
                        let days = document.querySelectorAll('.day');
                        days.forEach(day =>{
                            if(!day.classList.contains("nextDate")
                            && day.innerHTML === e.target.innerHTML
                        ){
                            day.classList.add('active');
                        }
                        })

                    },120)
            } else{
                // For Current Month
                day.classList.add("active");
            }
        })
    })
}

// Previous Month Function

function prevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--
    }
    calenderInitialize();
}

// Next Month Function

function nextMonth(){
    month++;
    if(month > 11 ){
        month = 0;
    }
    calenderInitialize();
}

// Today Button Functionality

todayBtn.addEventListener('click', () =>{
    // Updating currentDay,month,year values 
    currentDay = new Date();
    month = currentDay.getMonth();
    year = currentDay.getFullYear();
    calenderInitialize()

});

// Previous/Next button

prevBtn.addEventListener('click',prevMonth);
nxtBtn.addEventListener('click',nextMonth);

// When user entered value in dateInput

dateInput.addEventListener('input', e => {
    // remove non numeric characters
    dateInput.value = dateInput.value.replace(/[^0-9/]/g,"");
    if(dateInput.value.length === 2){
        dateInput.value += "/";

    }
    if(dateInput.value.length > 7){
        dateInput.value = dateInput.value.slice(0,7); //0 to 6 total 7
    };
    // When user press backspace
    // This help us clearing date Input
    if(e.inputType === "deleteContentBackward"){
        if(dateInput.value.length === 3){
            dateInput.value = dateInput.value.slice(0,2);
        }
    }
});



gotoBtn.addEventListener('click', ()=>{
    let dateArray = dateInput.value.split("/");
    console.log(dateArray);
    if(dateArray.length === 2){
        // Checking valid date or not
        if(dateArray[0] > 0 && dateArray[0] < 13 && dateArray[1].length  === 4){
            month = dateArray[0] - 1;
            year = dateArray[1];
            calenderInitialize();
            return
        }else{
            alert("Please Enter Date in correct format");
        }

    }else{
        alert("Please Enter Date in correct format")
    }

})

// Adding events into the event array

addEventButton.addEventListener('click', () => {
    eventWrapper.classList.toggle('active')
});

closeButton.addEventListener('click', () => {
    eventWrapper.classList.remove('active')
})

document.addEventListener('click', (e) => {
    if(e.target !== addEventButton && !eventWrapper.contains(e.target)){
        eventWrapper.classList.remove('active')
    }
});


eventTitle.addEventListener('input', (e) => {

    if(eventTitle.value.length === 50){
        eventTitle.value = eventTitle.value.slice(0,50);
    }

});

// Allow user to put only time(valid formate)
// From time
eventFrom.addEventListener('input', (e) => {

    eventFrom.value = eventFrom.value.replace(/[^0-9:]/g,"");
    if(eventFrom.value.length === 2){
        eventFrom.value += ":";
    }
    if(eventFrom.value.length > 5){
        eventFrom.value = eventFrom.value.slice(0,5);
    }
})

// To time

eventTo.addEventListener('input', (e) => {
    eventTo.value = eventTo.value.replace(/[^0-9:]/g,"");
    if(eventTo.value.length === 2){
        eventTo.value += ":";
    }
    if(eventTo.value.length > 5){
        eventTo.value = eventTo.value.slice(0,5);
    }
});


// Function to add event in array of event

submitEventBtn.addEventListener('click', () => {
    // Rename these word from event(Title,From,To) to event(Title,From,To)Value

    let eventTitleValue = eventTitle.value;
    let eventFromValue = eventFrom.value;
    let eventToValue = eventTo.value;

    if(eventTitleValue === "" || eventFromValue === "" || eventToValue === ""){
        alert("Please Fill All fields");
        return;
    }

    // Checking correct time formate
    let timeFromArr = eventFromValue.split(":");
    let timeToArr = eventToValue.split(":");
    if(timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeToArr[0] > 23 ||  timeToArr[1] > 59 ){

        alert("Invalid Time Formate Please Correct!")
        return

    } 
    

    let timeFromValue = timeConversion(eventFromValue);
    let timeToValue = timeConversion(eventToValue);

    // Check If Event already exist

    let eventExist = false;
    eventsArray.forEach((event) => {
        if(event.day === activeDay && event.month === month+1 && event.year === year){
            event.events.forEach((item) => {
                if(item.title == eventTitleValue){
                    eventExist = true;
                }
            })
        }
    })

    if(eventExist){
        alert("This event already exist");
        return;
    }

    // structure of new event

    let newEvent = {
        title:eventTitleValue,
        time:timeFromValue + "-" + timeToValue
    };

    // Now check if any event added before in that day

    let eventAdded = false;

    if(eventsArray.length > 0){
        eventsArray.forEach((item) => {
            if(item.day === activeDay &&
                item.month === month + 1&&
                item.year === year){
                    item.events.push(newEvent);
                    eventAdded = true
                }
            
        })
    }

    // First time event adding

    if(!eventAdded){
        eventsArray.push({
            day:activeDay,
            month:month+1,
            year:year,
            events:[newEvent]

        })
    };
  

    console.log(eventsArray)
    eventWrapper.classList.remove('active');
    eventTitle.value = "";
    eventFrom.value = "";
    eventTo.value = "";

    // Update events function

    showEventsUpdate(activeDay)

    let activeDayElement = document.querySelector('.day.active');
    activeDayElement.classList.add("event")
    
})
// time conversion function

function timeConversion(time){
    // Convert time into 24 hour formate
    let timeArray = time.split(':');
    let timeHour = timeArray[0];
    let timeMinutes = timeArray[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12 ;
    time = `${timeHour}:${timeMinutes} ${timeFormat}`;
    return time
}

// Show active day and date in event Side
function eventDetails(date){
    let day = new Date(year,month,date);
    let dayName = day.toString().split(" ")[0];

    eventDay.innerHTML = dayName;
    eventDate.innerHTML = `${date}/${month}/${year}`;

}

// Show all events from eventArray in event container

function showEventsUpdate(date){
    let allEvents = "";
    eventsArray.forEach((event) => {

        if(date === event.day && 
            month + 1 === event.month &&
            year === event.year
            ){
                event.events.forEach((item) => {

                    allEvents += `<div class="event">
                    <div class="title">
                      <i class="fas fa-circle"></i>
                      <h3 class="eventTitle">${item.title}</h3>
                    </div>
                    <div class="eventTime">
                      <span class="eventTime">${item.time}</span>
                    </div>
                </div>`

                })
            };
    })


    if(allEvents === ""){
        allEvents = `<div class = "noEvent">
            <h3> You have No any Event! </h3>
        </div>`
    }

    eventContainer.innerHTML = allEvents;

    // Function to save Your event in local storage (Next part)
    saveYourEvents()
}

function saveYourEvents(){
    localStorage.setItem("myEvents",JSON.stringify(eventsArray));
  };
  
  // Get Events function
  
  function getYourEvents(){
    if(localStorage.getItem("myEvents") === null){
        return;
    }else{
        eventsArray.push(...JSON.parse(localStorage.getItem("myEvents")))
    }
  }


//   Delete event from event container

eventContainer.addEventListener('click',(e) => {


    if(e.target.classList.contains("event")){
        if(confirm("Are You sure to delete this Event?")){
            let eventTitle = e.target.children[0].children[1].innerHTML;
            eventsArray.forEach((event) => {
                if(event.day === activeDay && 
                    event.month === month + 1 && 
                    event.year === year){
                        event.events.forEach((item,index) => {

                            if(item.title === eventTitle){
                                // using splice we are deleting elements from events array
                                event.events.splice(index,1);
                            }

                        });
                        // If No event left in a day then remove that day from eventsArray
                        if(event.events.length === 0){
                            eventsArray.splice(eventsArray.indexOf(event),1);
                            // Remove the event class

                            let activeDayElement = document.querySelector('.day.active');
                            if(activeDayElement.classList.contains("event")){
                                activeDayElement.classList.remove("event")
                            }
                        }
                    }
            })

            showEventsUpdate(activeDay)
        }
    }


})