// Copyright (c) 2012 Stephen Hobdell.

function validateGridRef(text) {
	console.log("RegExp: " + gridRefRE);
	var match = gridRefRE.exec(text);
	console.log("match? " + match);
	return match;
}

function tidy(selectionText) {
	return selectionText.replace(removeSpaces, "");
}
function geoOnClick(info, tab, urlRoot) {
	//strip out whitespace
	var text = tidy(info.selectionText);
	
	if(validateGridRef(text) ) {
		var url = urlRoot + text;
		console.log("url: " + url);
		window.open(url, "_blank");
	} else {
		console.log("not a grid ref: " + text);
	}
}
var gridRefRE = new RegExp("^[a-zA-z]{0,2}[0-9]{2,}$");
var removeSpaces = new RegExp("\\s\?", "g");
var title1 = "'%s' on Geograph...";
var title2 = "'%s' on Gridreffinder...";
var geographUrl = "http://www.geograph.org.uk/gridref/";
var gridreffinderUrl = "http://gridreferencefinder.com/?gr=";

var idparent;
var id1;
var id2;

chrome.contextMenus.onClicked.addListener(onClickHandler);
chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}


function onClickHandler(info, tab) {
	if(info.menuItemId == id1) {
		geoOnClick(info, tab, geographUrl);
	}
	if(info.menuItemId == id2) {
		geoOnClick(info, tab, gridreffinderUrl);
	}
}

function updateChildTitles(info, tab) {
	var selection = info.selectionText;
	if(validateGridRef(selection)) {
		console.log ("update message with selection " + selection);
	} else {
		console.log ("remove context menus");
	}
}
// Create one test item for each context type.
var contexts = ["selection"];

for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
idparent = chrome.contextMenus.create({"title": "Geolocate...", "contexts":[context]});
  id1 = chrome.contextMenus.create({"title": title1, "contexts":[context], "parentId": idparent });
  id2 = chrome.contextMenus.create({"title": title2, "contexts":[context], "parentId": idparent });
}

console.log(idparent);
console.log(id1);
console.log(id2);
