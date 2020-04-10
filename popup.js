// function getSelectionState() {
// 	chrome.storage.sync.get(["currencyName"], function(data) {
// 	    if(typeof data.currency == "undefined") {
// 	        // That's kind of bad
// 	    } else {
// 			document.getElementById("currencies").value = currencyName;

// 	    }
// 	});	
// }



function refreshPopupRates() {

	chrome.storage.sync.get(["currencyName", "currency"], function(data) {
	    if(typeof data.currencyName == "undefined") {
	        console.log('Request Undefined');
	    } else {
	        let currencyRate = document.getElementById('currencyRate')
	        currencyRate.innerHTML = data.currencyName + ' - ' + data.currency;

	        document.getElementById("currencies").value = data.currencyName



	    }
	});
}

refreshPopupRates();
// document.getElementById('options').addEventListener("click", test);


//Get Dropdown value
function getDropdownValue() {
	var e = document.getElementById("currencies");
	var strUser = e.options[e.selectedIndex].value;
	console.log(strUser);

	//Store currency type and value in local storage for background.js to pull when popup is opened.
	chrome.storage.sync.set({currencyName: strUser});
	
	refreshSelection();
	fetchRates();
	refreshPopupRates();

	// Initialize background page
	chrome.runtime.getBackgroundPage(function(backgroundPage) {
  		console = backgroundPage.console;
	})
}

// document.getElementsByClassName('options').addEventListener("click", getDropdownValue);
document.getElementById('currencies').addEventListener("change", getDropdownValue);

