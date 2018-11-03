
function setStorage() {
	browser.storage.local.get("moucheJson")
	.then((res) => {
		if (Object.keys(res).length === 0) {
			let moucheJson = {};
			browser.storage.local.set({moucheJson});
		}
	});
}

function saveEdit(input) {
	let data = {};
	let location = window.location;
	browser.storage.local.get("moucheJson")
	.then((result) => {
		let moucheJson = JSON.parse(JSON.stringify(result.moucheJson));
		if (!moucheJson[location])
			moucheJson[location] = {};
		moucheJson[location][input.name] = input.value;
		console.log(moucheJson);
		browser.storage.local.set({moucheJson});
	}, (err) => { console.log(err) });
}

function setEventListeners(inputs) {
	inputs.forEach((input) => {
		input.addEventListener('keyup', () => {
			saveEdit(input);
		})
	})
}

function pushTagElements(tagnames) {
	let inputarray = [];
	tagnames.forEach((tagname) => {
		if (document.getElementsByTagName(tagname)) {
			let list = Array.prototype.slice.call(document.getElementsByTagName(tagname));
			list.forEach((input) => {
				inputarray.push(input);
			})
		}
	})
	return (inputarray);
}

function restoreForm() {
	let url = window.location;
	browser.storage.local.get("moucheJson")
	.then((res) => {
		let moucheJson = JSON.parse(JSON.stringify(res.moucheJson));
		console.log(moucheJson);
		let inputs = pushTagElements(['input', 'textarea']);
		inputs.forEach((input) => {
			console.log(input);
			if (moucheJson[url][input.name]) {
				input.value = moucheJson[url][input.name];
			}
		});
	});
}

function mouche() {
	setStorage();
	let inputs = pushTagElements(['input', 'textarea']);
	setEventListeners(inputs);
}

mouche();
// content-script.js
"use strict";

browser.runtime.onMessage.addListener(request => {
	console.log('Clicked');
	restoreForm();
});
