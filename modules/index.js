//required variables & constants

const tipSection = document.getElementById("tip-section")
const billInput = document.getElementById("bill")
const peopleInput = document.getElementById("people")
const resetButton = document.getElementById("reset-btn")
let activeTip = 10
const tips = [5, 10, 15, 20, 25]
let bill = 0
let people = 0
let tipPerPerson = 0
let totalPerPerson = 0
// On click change active tip

tipSection.addEventListener("click", function (e) {
    let active = e.target
    if (e.target.className != "tip-section") {
        e.target.parentElement.querySelectorAll(".active").forEach(e => e.classList.remove("active"))
        active.classList.add('active')
        activeTip = active.getAttribute("data-value")
        calculations()
    }
})

// Calculate tip percentage & total per person

let calculations = () => {
    if (bill > 0 && people > 0 && activeTip > 0) {
        let tip = (bill / 100) * activeTip
        tipPerPerson = tip / people
        totalPerPerson = bill / people
        document.getElementById("tip").innerHTML = "$" + tipPerPerson.toFixed(2)
        document.getElementById("total").innerHTML = "$" + totalPerPerson.toFixed(2)
    }
    else {
        document.getElementById("tip").innerHTML = "$ 0.0"
        document.getElementById("total").innerHTML = "$ 0.0"
    }
}

// Creating tip section

let tipPercentages = (tip) => {
    return `
    <div class="tip-percentage ${tip == activeTip ? "active" : null}" data-value="${tip}"> ${tip}% </div>
    `
}

tips.forEach((tip, id) => {
    const tipBtn = tipPercentages(tip, id)
    tipSection.innerHTML += tipBtn
});

tipSection.innerHTML += `<input id="custom-tip"  type="number" class="tip-percentage" placeholder="custom" min="1" max="100"> </div>`

// add event listeners for tip and people

billInput.addEventListener("input", function (e) {
    bill = e.target.value
    calculations()

})

peopleInput.addEventListener("input", function (e) {
    people = e.target.value
    calculations()
})

const tipInput = document.getElementById("custom-tip")
tipInput.addEventListener("input", function (e) {
    activeTip = e.target.value
    if (activeTip > 100) customError = true
    console.log(activeTip)
    calculations()
})

// Reset button

resetButton.addEventListener("click", function () {
    bill = 0
    people = 0
    tipPerPerson = 0
    totalPerPerson = 0
    billInput.value = ""
    peopleInput.value = ""
    tipInput.value = ""
    activeTip = 0
    calculations()
})

