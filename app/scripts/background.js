'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "getURL"){
      getUrls(request, sender, sendResponse);
      return true;
    } else if (request.type == "closeTab"){
      closeActiveTab();
    }
});

function closeActiveTab(){
  chrome.tabs.query({
     active: true,               // Select active tabs
     lastFocusedWindow: true     // In the current window
   }, function(array_of_Tabs){
     // Since there can only be one active tab in one active window,
     //  the array has only one element
     var tab = array_of_Tabs[0];
     setTimeout(function(){
       chrome.tabs.remove(tab.id, function() { });
     }, 5000);

  });
}

function getUrls(request, sender, sendResponse){
  var resp = sendResponse;
  chrome.tabs.query({
     active: true,               // Select active tabs
     lastFocusedWindow: true     // In the current window
   }, function(array_of_Tabs){
     // Since there can only be one active tab in one active window,
     //  the array has only one element
     var tab = array_of_Tabs[0];
     var url = tab.url;
     resp({url: url});
  });
}
