let currency;

function conversion() {

	if (document.URL.indexOf("https://www.amazon.co.uk/s?k=") >= 0){
		x = document.querySelectorAll('.a-offscreen, .a-price-whole, .a-price-fraction');
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

				if (x[index].innerText.startsWith('€')) {
					x[index].classList.remove('a-offscreen')
					x[index].classList.toggle('a-price-whole')

				} else {
					x[index].classList.remove('a-price-whole')
					x[index].classList.remove('a-price-fraction')
					x[index].style.display = 'none'
				}
				
		});

		currencySymbol = document.querySelectorAll('.a-price-symbol');
		Array.from(currencySymbol).forEach((element, index) => {
			currencySymbol[index].classList.remove('a-price-symbol')
			currencySymbol[index].style.display = 'none'
		});

		discountPrice = document.querySelectorAll('span[aria-hidden="true"]')
		Array.from(discountPrice).forEach((element, index) => {
			// discountPrice[index].classList.remove('a-price-symbol')
			discountPrice[index].style.display = 'none'
		});
	}

	x = document.querySelectorAll('[data-maple-math], .a-color-secondary, .olp-from, nobr, #price_inside_buybox, .a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings, .twisterSwatchPrice, .olp-from, .a-color-base, .a-price-whole, a-size-medium a-color-price');
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
			currencySelection = request.currencyName
			console.log('Message Received', currency)
			console.log(currencySelection)

			intervalId = setInterval(conversion, 10);

			chrome.storage.local.set({currency: currency, currencyName: currencySelection});


		}

});
  

