// Console logs have been commented out. :g/console.log/s/^/\/\/ 
// Uncomment using :%s/\/\//

let currencySelection;

updateCurrencySelection = (callback) => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(["currencyName"], function(data) {
		if(typeof data.currencyName == "undefined") {

//		    console.log('Returns undefined')

		} else {
			
			currencySelection = data.currencyName;
//			console.log(currencySelection);
			resolve(currencySelection)
	    	}
		});
	})
	.then((currencySelection) => {
		fetchRates(function() {
//			console.log('Change Selection Fetched');
			refreshPopupRates();
		})
	});
}

fetchRates = (callback) => {

	timer = new Date();
	lastUpdated = timer.getMinutes();


	fetch(`https://api.exchangeratesapi.io/latest?base=GBP&symbols=${currencySelection}`)
		.then((response) => {
			return response.json();
		})
	.then((data) => {
//		console.log(data.rates[currencySelection]);
		return data.rates[currencySelection];
	  })
	.then((currency) => {
		errorLogDate = new Date();
		errorStatus = 200;
		chrome.storage.sync.set({"currency": currency, "timer": lastUpdated, "error": [errorStatus, currency, errorLogDate.getDate(), errorLogDate.getMonth()+1, errorLogDate.getFullYear(), errorLogDate.getHours(), errorLogDate.getMinutes()]});
		callback();
	})	
	.catch(error => {
		errorStatus = 400;
		chrome.storage.sync.set({"error": errorStatus});
	});
};

// Default Settings for Installation
chrome.runtime.onInstalled.addListener(function() {

    // By default, EUR is selected
	currencySelection = 'EUR'
	chrome.storage.sync.set({"currencyName": "EUR"});

	fetchRates(function() {
//		console.log('fetch completed');
	});
});

// Pulls latest rates on Amazon refresh
chrome.tabs.onUpdated.addListener(function() {

	fetchRates(function() {
//		console.log('Rates Updated');
	});
});

