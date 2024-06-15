const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_GYPk2LryN8GAP8FCwF6J9ww2EpruFgqnGRSvbuZ9";
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");

window.addEventListener("load", ()=>{
updateExeRate();
});

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    });
  
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExeRate();
});

const updateExeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}`;
    let response = await fetch(URL);
    let data = await response.json();

    let fromRate = data.data[fromCurr.value.toUpperCase()].value;
    let toRate = data.data[toCurr.value.toUpperCase()].value;

    if (!fromRate || !toRate) {
        msg.innerText = "Invalid currency code.";
        return;
    }

    let rate = toRate / fromRate;
    let finalAmount = (amountVal * rate).toFixed(2);
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
