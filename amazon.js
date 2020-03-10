function fetchRates() {
	fetch('https://api.exchangeratesapi.io/latest?base=GBP')
		.then((response) => {
			return response.json();
		})
	.then((data) => {
		eur = data.rates['EUR']

		x = document.querySelectorAll('.a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings');
		// x = document.querySelectorAll('.a-text-strike');
		Array.from(x).forEach((element, index) => {
			element = x[index].innerHTML
			element_stripped = element.trim()
			console.log(element_stripped);
			if (element_stripped.startsWith('£')) {
				
				price = x[index].innerHTML;
				price_cleaned = price.replace(/\s/g&&',', "");
				price_stripped = price_cleaned.substring(1, price.length);
				console.log(price_stripped);

				conversion = (parseFloat(price_stripped) * eur).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
				console.log(price_stripped);
				x[index].innerHTML = '€' + conversion.toString();
			}
		});

	  });
}

fetchRates();

element.addEventListener("click", fetchRates);
