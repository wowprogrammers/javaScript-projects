let dropList = document.querySelectorAll('.container select');
let fromCurrency = document.querySelector('.from select');
let toCurrency = document.querySelector('.to select');
let exchangeBtn = document.querySelector('.btn');

// Inserting value in drop list

for(let i = 0;i<dropList.length;i++){
    // keys in currencyCode
    for(let currencyCode in countryList){
        let selectedOption = i == 0 ? currencyCode == "USD" ? "selected" : "" : currencyCode == "NPR" ? "selected" : "";
        let optionTag = `<option value = ${currencyCode} ${selectedOption}>${currencyCode}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag)
    }
    dropList[i].addEventListener('change',e =>{
        // change the country flag(Call the function)
        loadingTheFlag(e.target)
        // console.log(e.target) //select element
    })
}

function loadingTheFlag(selectElement){
    for(let code in countryList){
        if(code == selectElement.value){
           let imgTag = selectElement.parentElement.querySelector('img')
           imgTag.src = `https://flagcdn.com/48x36/${countryList[code].toLowerCase()}.png`
        }
    }
}

// On load of document get the exchange rate

window.addEventListener('load',()=>{
    // Call the exchange rate function
    exchangeRate();
})

// Exchange rate button

exchangeBtn.addEventListener('click',()=>{
     // Call the exchange rate function
    exchangeRate();

})

// Exchange Rate Function

function exchangeRate(){
    let amount = document.querySelector('.container input');
    let exchangeTxt = document.querySelector('.exchangeRate');
    let amountValue = amount.value;
    if(amountValue == "" || amountValue == "0"){
        amount.value = "1";
        amountValue = 1;
    }

    exchangeTxt.innerText = "Getting the exchange rate";
    // Setting the fetch api

    // Headers

    let headers = new Headers();
    headers.append("apikey","3tVaeaLRKuFWFKzKlM5yL34YJVpPkXDP");
    // Request Options

    let requestOptions = {
        method:"GET",
        redirect:"follow",
        headers:headers
    }
    
    let apiUrl = `Enter Your API URL`
    fetch(apiUrl,requestOptions).then(res => res.json()).then(output =>{
        console.log(output)
        let exchangedAmount = output.result;
        exchangedAmount = Math.round(exchangedAmount);
        exchangeTxt.innerText = `${amountValue} ${fromCurrency.value} = ${exchangedAmount} ${toCurrency.value}`;
    }).catch(()=>{
        exchangeTxt.innerText = "Some issue there is...."
    })


}
// Exchange Icon
let exchangeIcon = document.querySelector('.container .icon');
exchangeIcon.addEventListener('click',()=>{
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    loadingTheFlag(fromCurrency);
    loadingTheFlag(toCurrency);
    exchangeRate(); //Call the function
})
