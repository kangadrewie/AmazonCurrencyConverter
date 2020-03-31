function fetchRates() {
	console.log('fetched')
	fetch('https://api.exchangeratesapi.io/latest?base=GBP')
		.then((response) => {
			return response.json();
		})
	.then((data) => {	
		return data.rates['EUR'];
	  })
	.then((currency) => {
		chrome.tabs.onUpdated.addListener(function (tabId , info) {
			if (info.status === 'loading') {

				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id, {"status" : "loading", "currency": currency});

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

// chrome.tabs.onUpdated.addListener(function (tabId , info) {
//     // Send a message to the active tab
// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 		var activeTab = tabs[0];
// 		chrome.tabs.sendMessage(activeTab.id, {content: "message", type: "m2"});
// 		});

// 	if (info.status === 'complete') {

// 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 			var activeTab = tabs[0];
// 			chrome.tabs.sendMessage(activeTab.id, {content: "message", type: "m3"});
// 			});
// 		}

		
// });


