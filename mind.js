

let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 0) {
        amtVal = 1;
        amount.value = 1;
    }
    // console.log(fromCurr.value,toCurr.value);

        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        // console.log(URL);
        let response = await fetch(URL);
        let data = await response.json();
        // console.log(data);

        for (code in data) {
            countryC = data[code];
            for (c in countryC)
                if (c == `${toCurr.value.toLowerCase()}`) {
                    let rate = countryC[`${toCurr.value.toLowerCase()}`];
                    // console.log(rate);
                    let finalAmt = rate * amtVal;
        msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
                }
        }

        

    });





