let currencySelection;

// chrome.storage.local.get(function(result){console.log(result)})


chrome.storage.local.get(["currencyName"], function(data) {
	if(typeof data.currencyName == "undefined") {
	    console.log('Returns undefined')
	} else {
		currencySelection = data.currencyName;
		console.log(data.currencyName)
		return currencySelection
		
	    }
});	

function fetchRates() {
	console.log('fetched')
	fetch('https://api.exchangeratesapi.io/latest?base=GBP')
		.then((response) => {
			return response.json();
		})
	.then((data) => {
		console.log(currencySelection)
		return data.rates[currencySelection];
	  })
	.then((currency) => {
		console.log(currency)
		chrome.tabs.onUpdated.addListener(function (tabId , info) {

			chrome.storage.local.set({currency: currency, currencyName: currencySelection});
			
			if (info.status === 'loading') {

				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, {"status" : "loading", "currency": currency, "currencyName" : currencySelection});
				
			});

			}

			if (info.status === 'complete') {

				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, {"status" : "complete"});

				});	
			}
		

		});
	});
}

fetchRates();


