let currency;

function conversion() {

	if (document.URL.indexOf("https://www.amazon.co.uk/s?k=") >= 0){
		currencySymbol = document.querySelectorAll('.a-price-symbol')
		Array.from(currencySymbol).forEach((element, index) => {

			//Replace currency symbol
			element = currencySymbol[index].innerHTML

			currencySymbol[index].innerHTML = '€'

		});

		fraction_num = 0
		whole_num = 0

		searchPrices = document.querySelectorAll('.a-price-whole, .a-price-fraction')
		Array.from(searchPrices).forEach((element, index) => {

			//Get Whole Numbers
			element = searchPrices[index].innerHTML

			if (index % 2) {
				fraction_num = searchPrices[index].innerHTML
			} else {
				whole_num = searchPrices[index].innerHTML
				whole_num = whole_num.substring(0, whole_num.indexOf('<'));

			}

			full_price = whole_num + '.' + fraction_num
			
			conversion = (parseFloat(full_price) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

			push_whole_number = conversion.substring(0, 2)
			push_fraction_number = conversion.substring(3, conversion.length)

			if (index % 2) {
				searchPrices[index].innerHTML = push_fraction_number 
			} else {
				searchPrices[index].innerHTML = push_whole_number 

			}

			console.log(push_whole_number)
			console.log(push_fraction_number)


		});

	}

	x = document.querySelectorAll('[data-maple-math], #price_inside_buybox, .a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings, .olp-from, .a-color-base, .a-price-whole, a-size-medium a-color-price');
	Array.from(x).forEach((element, index) => {
		// console.log(currency)
		element = x[index].innerHTML
		element_stripped = element.trim()

		if (element_stripped.startsWith('£')) {

			price = x[index].innerText;
			price_cleaned = price.replace(/\s/g&&',', "");
			price_stripped = price_cleaned.substring(1, price.length);

			conversion = (parseFloat(price_stripped) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
			x[index].innerHTML = '€' + conversion.toString();
			}
		});


}

chrome.runtime.onMessage.addListener(

	function init(request) {

		if (request.status === 'loading') {
			currency = request.currency
			//Fire every 5 ms until page has loaded

			for (j = 0; j < 499; j++) {
				conversion()
			}
			// fireId = setInterval(conversion, 500);
		}

		if (request.status === 'complete') {

			//Stop Coversion
			console.log('complete')
			// clearInterval(fireId)
		}

});
