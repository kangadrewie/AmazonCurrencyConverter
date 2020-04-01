
chrome.runtime.onMessage.addListener(

	function sendCurrencyValue(request) {

		currency = request.currency
		console.log(currency)

});


function clickHandler(e) {
    chrome.tabs.executeScript({
        code: document.getElementById('currencyValue').value,
        allFrames: true
    }, function(result) {
        console.log(results);
    });
}


function popup(){
    alert(1);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
  });

button1=document.getElementById("button1");
button1.addEventListener('click', popup)
}