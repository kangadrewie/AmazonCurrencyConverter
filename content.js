let currency;
let currencyStringSymbol = '€';
let counter = 0;
let price;

wholeFractionConversion = (elementName) => {
	elementName = document.querySelectorAll('.a-price-symbol, .a-price-whole, .a-price-fraction');

	for (i=0; i < elementName.length; i+=3) {

		if (elementName[i].innerText === '£') {
			price = (elementName[i+1].innerText.trim().replace(/(\r\n|\n|\r)/gm, "") + elementName[i+2].innerText.trim());
			conversion = (parseFloat(price) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

			elementName[i].innerText = currencyStringSymbol;
		
			elementName[i+1].innerText = conversion.substring(0, (conversion.length - 3));

			elementName[i+2].innerText = conversion.substring((conversion.length - 2), conversion.length);
		}
	}
};

itemPageConversion = () => {
	x = document.querySelectorAll('.a-list-item, [data-maple-math], .a-color-secondary, .olp-from, nobr, #price_inside_buybox, .a-color-price, .p13n-sc-price, .a-text-strike, .cost-after-savings, .twisterSwatchPrice, .olp-from, .a-color-base, .a-price-whole, .a-size-medium, .a-color-price');
	Array.from(x).forEach((element, index) => {
	price = x[index].innerHTML.trim().replace(/\s/g&&',', "");

	if (price.startsWith('£')) {

		conversion = (parseFloat(price.substring(1, price.length)) * currency).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
		x[index].innerHTML = currencyStringSymbol + conversion.toString();
		}
	});
}

conversion = () => {

	if (document.URL.indexOf("https://www.amazon.co.uk/s?k=") >= 0){		
		wholeFractionConversion();

	} else if (document.URL.indexOf("https://www.amazon.co.uk/b/?node=") >= 0){
		wholeFractionConversion();	

	} else if (document.URL.indexOf("https://www.amazon.co.uk/b/ref=") >= 0){
		itemPageConversion();
		wholeFractionConversion();

	} else {
		itemPageConversion();
		wholeFractionConversion();
	}

};
		




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

chrome.runtime.onMessage.addListener(function(request) {
	if (request.updatePageStatus === 'reloadPage') {
		window.location.reload();
	}
})