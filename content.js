let currency;

function conversion() {
	x = document.querySelectorAll('.a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings, .olp-from, .a-color-base, .a-price-whole');
	Array.from(x).forEach((element, index) => {
		// console.log(currency)
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

chrome.runtime.onMessage.addListener(

	function init(request) {

		if (request.status === 'loading') {
			currency = request.currency
			//Fire every 5 ms until page has loaded
			fireId = setInterval(conversion, 5);



		}

		if (request.status === 'complete') {
			
			// clearInterval(fireId);
			console.log('complete')

		}

});


// chrome.runtime.onMessage.addListener(
// 	requestCurrency = (request, sender, sendResponse) => {
// 		if (request.type != "m2" & request.type != "m3") {
// 			chrome.extension.onMessage.removeListener(requestCurrency);
// 			var currency = request.message;
			
// 			return conversion(currency)
// 		}
// 	}
// );


// i = 1;
// chrome.extension.onMessage.addListener(
//   function fireConversion(request, sender, sendResponse, currency) {

//   	if (request.type === "m2") {
// 	  	i++;
// 	  	if (i == 2) {
// 	  		console.log("Start Conversion");
// 	    	intervalId = setInterval(conversion, 5);
// 	  	}
//   	}

// 	if (request.type === "m3") {
// 		clearInterval(intervalId);
//   		console.log('Conversion Completed');
//   		i=0;
// 		}
// 	}
// );
