function conversion(currency) {
	x = document.querySelectorAll('.a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings, .olp-from');
	// x = document.querySelectorAll('.a-text-strike');
	Array.from(x).forEach((element, index) => {
		element = x[index].innerHTML
		element_stripped = element.trim()
		console.log(element_stripped);
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

		conversion(eur);
	  });
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	if (request.message === 'page_loading') {
  		console.log('loading');
  		if (request.message === 'page_completed') {
  			console.log('complete');
  			}
  		}
	}
);