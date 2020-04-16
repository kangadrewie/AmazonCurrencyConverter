let currencySelection ='EUR';

timer = new Date();
lastUpdated = timer.getMinutes();

fetchRates = (currencySelection, callback) => {

	chrome.storage.sync.get(["currencyName"], function(data) {
		if(typeof data.currencyName == "undefined") {

		    console.log('Returns undefined')

		} else {
			
			currencySelection = data.currencyName;
			
			return currencySelection
	    }
	});
	console.log(currencySelection);
	fetch(`https://api.exchangeratesapi.io/latest?base=GBP&symbols=${currencySelection}`)
		.then((response) => {
			console.log('fetched');
			return response.json();
		})
	.then((data) => {
		console.log(data.rates[currencySelection])
		return data.rates[currencySelection];
	  })
	.then((currency) => {
		console.log('fetched');
		chrome.storage.sync.set({"currency": currency, "timer": lastUpdated});
		// $('body').load(url); //<- Use this on any event in which you want to refresh the content
		callback();
	});
};

// Default Settings for Installation
chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({"currencyName": "EUR"});

	fetchRates(currencySelection, function() {
		console.log('fetch completed');
	});
});
