let currencySelection;

// chrome.storage.local.get(function(result){console.log(result)})

chrome.storage.sync.get(["currencyName"], function(data) {
	if(typeof data.currencyName == "undefined") {
	    console.log('Returns undefined')
	} else {
		currencySelection = data.currencyName;
		console.log(data.currencyName)
		return currencySelection
		
	    }
});

function refreshSelection() {
	chrome.storage.sync.get(["currencyName"], function(data) {
		if(typeof data.currencyName == "undefined") {
		    console.log('Returns undefined')
		} else {
			currencySelection = data.currencyName;
			console.log(data.currencyName)
			return currencySelection
			
		    }
	});
};





function fetchRates() {
	console.log('fetched')
	fetch('https://api.exchangeratesapi.io/latest?base=GBP')
		.then((response) => {
			refreshSelection();
			return response.json();
		})
	.then((data) => {
		return data.rates[currencySelection];
	  })
	.then((currency) => {
		chrome.storage.sync.set({currency: currency});

		chrome.tabs.onUpdated.addListener(function (tabId , info) {

			let currencySelection;
			let currency;
			chrome.storage.sync.get(["currencyName", "currency"], function(data) {
				currencySelection = data.currencyName;
				currency = data.currency
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, {"status" : "loading", "currency": currency, "currencyName" : currencySelection});
				console.log(currency, currencySelection, 'BEFORE SENT TO CONTENT')
			});


			});

		});
	});
}



fetchRates();
