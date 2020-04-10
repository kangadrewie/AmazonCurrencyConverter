let currency;
let currencyStringSymbol = '€';

conversion = () => {

	if (document.URL.indexOf("https://www.amazon.co.uk/s?k=") >= 0){
		y = document.querySelectorAll('.a-offscreen, .a-price-whole, .a-price-fraction');
		Array.from(y).forEach((element, index) => {
			// console.log(currency)
			element = y[index].innerHTML
			element_stripped = element.trim()

			if (element_stripped.startsWith('£')) {

				price = y[index].innerText;
				price_cleaned = price.replace(/\s/g&&',', "");
				price_stripped = price_cleaned.substring(1, price.length);

				conversion = (parseFloat(price_stripped) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
				y[index].innerHTML = currencyStringSymbol + conversion.toString();
				}

				if (y[index].innerText.startsWith(currencyStringSymbol)) {
					y[index].classList.remove('a-offscreen')
					y[index].classList.toggle('a-price-whole')

				} else {
					y[index].classList.remove('a-price-whole')
					y[index].classList.remove('a-price-fraction')
					y[index].style.display = 'none'
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

	x = document.querySelectorAll('.a-list-item, [data-maple-math], .a-color-secondary, .olp-from, nobr, #price_inside_buybox, .a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings, .twisterSwatchPrice, .olp-from, .a-color-base, .a-price-whole, a-size-medium, a-color-price');
	Array.from(x).forEach((element, index) => {
		// console.log(currency)
		element = x[index].innerHTML
		element_stripped = element.trim()

		if (element_stripped.startsWith('£')) {

			price = x[index].innerText;
			price_cleaned = price.replace(/\s/g&&',', "");
			price_stripped = price_cleaned.substring(1, price.length);

			conversion = (parseFloat(price_stripped) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
			x[index].innerHTML = currencyStringSymbol + conversion.toString();
			}
		});

	y = document.querySelectorAll('.a-offscreen, .a-price-whole, .a-price-fraction');
		Array.from(y).forEach((element, index) => {
			// console.log(currency)
			element = y[index].innerHTML
			element_stripped = element.trim()

			if (element_stripped.startsWith('£')) {

				price = y[index].innerText;
				price_cleaned = price.replace(/\s/g&&',', "");
				price_stripped = price_cleaned.substring(1, price.length);

				conversion = (parseFloat(price_stripped) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
				y[index].innerHTML = currencyStringSymbol + conversion.toString();
				}

				if (y[index].innerText.startsWith(currencyStringSymbol)) {
					y[index].classList.remove('a-offscreen')
					y[index].classList.toggle('a-price-whole')

				} else {
					y[index].classList.remove('a-price-whole')
					y[index].classList.remove('a-price-fraction')
					y[index].style.display = 'none'
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



initialiseSetup = () => {
	chrome.storage.sync.get(["currency", "currencyName"], function(data) {

		if (data.currencyName === 'EUR') {
			currency = data.currency
			currencyStringSymbol = '€'

			intervalId = setInterval(conversion, 10);
		} 

		if (data.currencyName === 'USD' || data.currencyName === 'CAD') {
			currency = data.currency
			currencyStringSymbol = '$'

			intervalId = setInterval(conversion, 10);
		}
	});	
};

initialiseSetup();

// chrome.storage.onChanged.addListener(function(changes, namespace) {
// 	window.location.reload();
// });