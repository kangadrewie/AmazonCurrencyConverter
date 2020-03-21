function conversion() {
	console.log('converted');
	x = document.querySelectorAll('.a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings, .olp-from, .a-color-base, .a-price-whole');
	currency = 1.18;
	Array.from(x).forEach((element, index) => {
		element = x[index].innerHTML
		element_stripped = element.trim()
		if (element_stripped.startsWith('£')) {
			
			price = x[index].innerHTML;
			price_cleaned = price.replace(/\s/g&&',', "");
			price_stripped = price_cleaned.substring(1, price.length);

			conversion = (parseFloat(price_stripped) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
			x[index].innerHTML = '€' + conversion.toString();
		}
	});
}

function fetchRates() {
	console.log('fetched')
	fetch('https://api.exchangeratesapi.io/latest?base=GBP')
		.then((response) => {
			return response.json();
		})
	.then((data) => {
		eur = data.rates['EUR'];
		// setInterval(hello, 500);
	  });
}


function hello() {
	console.log('hello');
}
i = 1;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	
  	i++;
  	console.log(i);
  	if (i == 2) {
    	intervalId = setInterval(conversion, 5);
  	}

	if (request.message === 'page_complete') {
		clearInterval(intervalId);
  		console.log('completed');
  		conversion(eur);
  		i=1;
		}
	}
);