
refreshPopupRates = () => {
	
	timer = new Date();
	timerUpdated = timer.getMinutes();

	chrome.storage.sync.get(["currency", "currencyName", "timer"], function(data) {

    	//Display current rates of selected currency
        let currencyRate = document.getElementById('currencyRate')
        currencyRate.innerHTML = data.currencyName + ' - ' + data.currency;

        //Refresh selected dropdown item
        document.getElementById("currencies").value = data.currencyName

        let timer = document.getElementById('timer');

        timer.innerHTML = 'Last Updated - ' + ((timerUpdated - data.timer) + 1) + ' minutes ago'
	});
}
refreshPopupRates();

//Get Dropdown value
getDropdownValue = () => {
	var e = document.getElementById("currencies");
	var strUser = e.options[e.selectedIndex].value;
	console.log(strUser);

	//Store currency type and value in local storage for background.js to pull when popup is opened.
	chrome.storage.sync.set({currencyName: strUser});

	//Fetch new rates with updated currency
	fetchRates(strUser);	
}

document.getElementById('currencies').addEventListener("change", getDropdownValue);