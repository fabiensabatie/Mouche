// background-script.js
"use strict";

function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
	for (let tab of tabs) {
		browser.tabs.sendMessage( tab.id, {btnclick: true});
	}
}

browser.browserAction.onClicked.addListener(() => {
	browser.tabs.query({
		currentWindow: true,
		active: true
	}).then(sendMessageToTabs).catch(onError);
});
