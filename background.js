chrome.tabs.onUpdated.addListener(function (tabId , changeInfo) {

  if (changeInfo.status === 'loading') {

    // Send a message to the active tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"message": "page_loading"});
		});
		if (changeInfo.status != 'loading') {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {"message": "page_complete"});
		});
	}
	} 

});

