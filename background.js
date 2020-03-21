chrome.tabs.onUpdated.addListener(function (tabId , info) {


    // Send a message to the active tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"message": "page_loading"});
		});

	if (info.status === 'complete') {

		// Send a message to the active tab
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {"message": "page_complete"});
			});
		}

		
});


