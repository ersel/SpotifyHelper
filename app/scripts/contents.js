'use strict';

var that = this;

chrome.runtime.sendMessage({type: "getURL"}, function(response) {
  var el = document.createElement('a');
  el.href = response.url;
  var partsOfURL = el.pathname.split("/");
  var spotifyURI = "spotify:" + partsOfURL[1] + ":" + partsOfURL[2];
  that.injectMagic(spotifyURI);
  chrome.runtime.sendMessage({type: "closeTab"});
});

function injectMagic(spotifyURI){
  var spotifyLink  = document.createElement("a");

  //id
  var id = document.createAttribute("id");
  id.value = "spotify"
  spotifyLink.setAttributeNode(id);

  //link
  spotifyLink.textContent = "here";
  var a = document.createAttribute("href");
  a.value = spotifyURI;
  spotifyLink.setAttributeNode(a);

  //append to DOM
  document.body.appendChild(spotifyLink);
  that.eventFire(document.getElementById('spotify'), 'click');
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
