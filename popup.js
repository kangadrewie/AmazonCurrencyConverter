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
		timer.innerHTML = 'Last Updated - ' + ((timerUpdated - data.timer) + 1) + ' minutes ago';

	});
}

refreshPopupRates();
//Get Dropdown value
getDropdownValue = () => {
	var selectedIndex = 1;
	var e = document.getElementById("currencies");
	var strUser = e.options[e.selectedIndex].value;
	console.log(strUser);

	//Store currency type and value in local storage for background.js to pull when popup is opened.
	chrome.storage.sync.set({currencyName: strUser});

	//Fetch new rates with updated currency
	updateCurrencySelection(function() {
		refreshPopupRates();
	});

	//Send Message to content.js to refresh page.
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {updatePageStatus: "reloadPage"});
	});		
}

document.getElementById('currencies').addEventListener("change", getDropdownValue);
// document.getElementById('currencies').addEventListener("click", getDropdownValue);

infoIcon = () => {
	let icon = document.getElementById('info-icon');

	icon.style.width = '8%';
	icon.style.opacity = '1';
}

document.getElementById('info-icon').addEventListener("mouseover", infoIcon);

document.getElementById('container').addEventListener("mouseover", function() {
	let icon = document.getElementById('info-icon');

	icon.style.opacity = '0.6';
});

i = 0;
modalPopup = () => {
	
	i += 1;

	let bg = document.getElementById('bg');
	let modal = document.getElementById('info-box');
	let icon = document.getElementById('info-icon');
	let close = document.getElementById('close-icon');

	if (i == 1) {
		modal.style.marginLeft = '10%';
		bg.style.zIndex = '98';
		bg.style.opacity = '0.7';
		modal.style.opacity = '1';

		icon.style.opacity = '0';
		close.style.zIndex = '9999';
		close.style.opacity = '0.8';
		icon.style.display = 'none';
	} else if (i == 2) {
		modal.style.marginLeft = '110%';
		bg.style.zIndex = '-99998';
		bg.style.opacity = '0';
		modal.style.opacity = '1';

		close.style.opacity = '0';
		close.style.zIndex = '-9999';

		icon.style.opacity = '1';
		icon.style.display = '';
		i = 0;
	}

}


document.getElementById('info-icon').addEventListener("click", modalPopup);
document.getElementById('close-icon').addEventListener("click", modalPopup);


document.getElementById('report-issues').addEventListener("click", function() {
	let emailUrl = "mailto:bandycurrencyconverter@gmail.com?Subject=I've%20Found%20an%20Issue!";

    chrome.tabs.update({
        url: emailUrl
    });
});
