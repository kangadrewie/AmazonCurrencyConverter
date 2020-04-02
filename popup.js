let currencyRate;


// popup.js
chrome.storage.local.get(["currency", "currencyName"], function(data) {
    if(typeof data.currency == "undefined") {
        // That's kind of bad
    } else {
        let currencyRate = document.getElementById('currencyRate')
        currencyRate.innerHTML = data.currencyName + ' - ' + data.currency

    }
});