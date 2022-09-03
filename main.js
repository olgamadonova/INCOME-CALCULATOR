//income inputs
const incomeSalary = document.getElementById('income-salary');
const incomeFreelance = document.getElementById('income-freelance');
const incomeExtra1 = document.getElementById('income-extra-1');
const incomeExtra2 = document.getElementById('income-extra-2');

//costs inputs
const costsFlat = document.getElementById('costs-flat');
const costsHouseServices = document.getElementById('costs-house-services');
const costsTransport = document.getElementById('costs-transport');
const costsCredit = document.getElementById('costs-credit');

//total inputs
const totalMonthInput = document.getElementById('total-month');
const totalDayInput = document.getElementById('total-day');
const totalYearInput = document.getElementById('total-year');

let totalMonth, totalDay, totalYear;

//money box
const moneyBoxRange = document.getElementById('money-box-range');
const accumulationInput = document.getElementById('accumulation');
const spend = document.getElementById('spend');

let accumulation = 0;
let totalPercents = 0;

const inputs = document.querySelectorAll('.input');
for (let input of inputs) {
    input.addEventListener('input', () => {
        countingAvailableMoney();
        calculationPercents();
    })
}

const strToNum = str => str.value? parseInt(str.value):0

const countingAvailableMoney = () => {
  const totalPerMonth = strToNum(incomeSalary) + strToNum(incomeFreelance) + strToNum(incomeExtra1) + strToNum(incomeExtra2);
  const totalCosts = strToNum(costsFlat) + strToNum(costsHouseServices) + strToNum(costsTransport) + strToNum(costsCredit);

  totalMonth = totalPerMonth - totalCosts;
  totalMonthInput.value = totalMonth;
}

moneyBoxRange.addEventListener('input', evt => {
    const totalPercentElement = document.getElementById('total-precents');
    totalPercents = evt.target.value;
    totalPercentElement.textContent = totalPercents;
    calculationPercents();
});

const calculationPercents = () => {
    if (totalMonth !== undefined) {
        accumulation = ((totalMonth * totalPercents) / 100).toFixed();
        accumulationInput.value = accumulation;
        spend.value = totalMonth - accumulation;
        totalDay = (spend.value/30).toFixed();
        totalDayInput.value = totalDay;
        totalYear = accumulation*12;
        totalYearInput.value = totalYear;
        if (totalMonth === 0 || totalMonth < 0) {
            totalYearInput.value = 0;
            totalDayInput.value = 0;
            totalMonthInput.value = 0;
            spend.value = strToNum(costsFlat) + strToNum(costsHouseServices) + strToNum(costsTransport) + strToNum(costsCredit);
        }
    } else {
        accumulationInput.value = 0;
    }
}