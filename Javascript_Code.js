const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const currencyEl_one_via = document.getElementById('currency-one-via');
const currencyEl_via = document.getElementById('currency-via');
const currencyEl_two_via = document.getElementById('currency-two-via');
const amountEl_one_via = document.getElementById('amount-one-via');
const amountEl_two_via = document.getElementById('amount-two-via');
const rateEl_via = document.getElementById('rate-via');
const rateEl_via2 = document.getElementById('rate-via2');
const swapVia = document.getElementById('swapVia');

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const currency_one_via = currencyEl_one_via.value;
  const currency_two_via = currencyEl_two_via.value;
  const currency_via = currencyEl_via.value;

  //fetching the api (direct conversion)
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });

  //fetching the api (indirect conversion)
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one_via}`)
    .then(function(responseVia) {
      return responseVia.json();
    })
    .then(function(dataVia) {
      console.log(dataVia);

      const rateVia = dataVia.rates[currency_via];
      rateEl_via.innerText = `1 ${currency_one_via} = ${rateVia} ${currency_via}`;
      fetch(`https://api.exchangerate-api.com/v4/latest/${currency_via}`)
    .then(function(responseVia2) {
      return responseVia2.json();
    })
    .then(function(dataVia2) {
      console.log(dataVia2);

      const rateVia2 = dataVia2.rates[currency_two_via];
      rateEl_via2.innerText = `1 ${currency_via} = ${rateVia2} ${currency_two_via}`;
      
      amountEl_two_via.value = (amountEl_one_via.value * rateVia*rateVia2).toFixed(2);
    })
    });  

}

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
currencyEl_one_via.addEventListener('change', calculate);
amountEl_one_via.addEventListener('input', calculate);
currencyEl_two_via.addEventListener('change', calculate);
amountEl_two_via.addEventListener('input', calculate);
currencyEl_via.addEventListener('change', calculate);

//swap function (direct conversion)
swap.addEventListener('click', function() {
  const temp = currencyEl_one.value;

  currencyEl_one.value = currencyEl_two.value;

  currencyEl_two.value = temp;
  calculate();
});

//swap function (indirect conversion)
swapVia.addEventListener('click', function() {
    const tempVia = currencyEl_one_via.value;
    currencyEl_one_via.value = currencyEl_two_via.value;
    currencyEl_two_via.value = tempVia;
    calculate();
});

calculate();