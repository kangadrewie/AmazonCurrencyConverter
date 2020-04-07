



chrome.storage.local.get(["currency", "currencyName"], function(data) {
    if(typeof data.currency == "undefined") {
        // That's kind of bad
    } else {
        let currencyRate = document.getElementById('currencyRate')
        currencyRate.innerHTML = data.currencyName + ' - ' + data.currency

    }
});

// document.getElementById('options').addEventListener("click", test);


//Get Dropdown value
function getDropdownValue() {
	var e = document.getElementById("currencies");
	var strUser = e.options[e.selectedIndex].value;
	console.log(strUser);

	//Store currency type and value in local storage for background.js to pull when popup is opened.
	chrome.storage.local.set({currencyName: strUser});
}

// document.getElementsByClassName('options').addEventListener("click", getDropdownValue);
document.getElementById('currencies').addEventListener("change", getDropdownValue);

