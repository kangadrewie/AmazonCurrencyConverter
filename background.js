currencySelection = 'EUR'

function fetchRates() {
	console.log('fetched')
	fetch('https://api.exchangeratesapi.io/latest?base=GBP')
		.then((response) => {
			return response.json();
		})
	.then((data) => {	
		return data.rates[currencySelection];
	  })
	.then((currency) => {

		chrome.tabs.onUpdated.addListener(function (tabId , info) {
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

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
// 	chrome.runtime.sendMessage({
//                     data: "Hello popup, how are you"
//                 }, function (response) {
//                     console.log(response);
//                 });

// });

