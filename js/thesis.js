// advanced search script for Theses search form

var searchType = [];
var searchName = [];
var searchValue = [];
var limitType = [];
var limitName = [];
var limitValue = [];

function processLimit() {
	var limitWorkString = "";
	for (var i = 0; i < limitName.length; i++) {
		//  The following statement processes date form elements.
		//  Date limits must be processed differently since they contain text form elements.
		if (limitName[i] == "Da" || limitName[i] == "Db") {
			limitWorkString += "&" + limitName[i] + "=" + limitValue[i];
			continue;
		}
		// The following statement processes all selection list form elements.
		if (limitValue[i] != 0) {
			limitWorkString += "&" + limitName[i] + "=" + limitValue[i];
		}
	}
	return limitWorkString;
}


function processSearch() {
	// version 1 : January 22, 2003
	var searchWorkString = "";
	for (var i = 0; i < searchName.length; i++) {
		if (searchName[i].indexOf("fieldLimit") != -1) {
			if ((searchValue[i] != 0) && (searchValue[i + 1].length != 0)) {
				// NOTE: This statement places parentheses around the input typed by the user.
				searchWorkString += searchValue[i] + "(" + searchValue[i + 1] + ")";
				i++;
			}
			continue;
		} else if (searchName[i].indexOf("searchText") != -1) {
			if (searchValue[i].length != 0) {
				// NOTE: This statement places parentheses around the input typed by the user.
				searchWorkString += "(" + searchValue[i] + ")";
			}
			continue;
		} else if (searchName[i].indexOf("boolean") != -1) {
			if ((searchType[i + 2] == "text") && (searchValue[i + 2].length != 0)) {
				searchWorkString += searchValue[i];
			}
			continue;
		} else {
			continue;
		}
	}
	return searchWorkString;
}


function submitSearch(searchForm) {
	var isSearch = 0;
	var isLimit = 0;

	var searchString = "";
	var limitString = "";

	var searchArrayCounter = 0;
	var limitArrayCounter = 0;

	for (var i = 0; i < searchForm.elements.length; i++) {
		if (searchForm[i].name.indexOf("startSearch") != -1) {
			isSearch = 1;
			isLimit = 0;
			continue;
		} else if (searchForm[i].name.indexOf("startLimit") != -1) {
			isSearch = 0;
			isLimit = 1;
			continue;
		} else if (searchForm[i].name.indexOf("endSearch") != -1) {
			isSearch = 0;
			isLimit = 0;
			continue;
		} else if (searchForm[i].name.indexOf("endLimit") != -1) {
			isSearch = 0;
			isLimit = 0;
			continue;
		} else {
			if (isSearch == 1) {
				searchName[searchArrayCounter] = searchForm[i].name;
				if (searchForm[i].type == "select-one") {
					searchType[searchArrayCounter] = "select-one";
					searchValue[searchArrayCounter] = searchForm[i].options[searchForm[i].selectedIndex]
						.value;
					searchArrayCounter++;
					continue;
				} else if (searchForm[i].type == "text") {
					searchType[searchArrayCounter] = "text";
					searchValue[searchArrayCounter] = searchForm[i].value;
					searchArrayCounter++;
					continue;
				} else {
					searchType[searchArrayCounter] = "";
					searchValue[searchArrayCounter] = "";
					searchArrayCounter++;
					continue;
				}
			} else if (isLimit == 1) {
				limitName[limitArrayCounter] = searchForm[i].name;
				if (searchForm[i].type == "select-one") {
					limitType[limitArrayCounter] = "select-one";
					limitValue[limitArrayCounter] = searchForm[i].options[searchForm[i].selectedIndex]
						.value;
					limitArrayCounter++;
					continue;
				} else if (searchForm[i].type == "text") {
					limitType[limitArrayCounter] = "text";
					limitValue[limitArrayCounter] = searchForm[i].value;
					limitArrayCounter++;
					continue;
				} else {
					limitType[limitArrayCounter] = "";
					limitValue[limitArrayCounter] = "";
					limitArrayCounter++;
					continue;
				}
			} else {
				continue;
			}
		}
	}
	searchString = processSearch();
	limitString = processLimit();
	// David Fuller at Union College suggests commenting out the next line in order for this to work with Netscape 4.x and MacOS
	// searchString =encodeURI(searchString)
	window.location.href = "http://" + location.host + "/search~S7/X?" +
		searchString + limitString;
	return false;
}

function modifySearch() {
	var modifyString1 = unescape(location.search);
	var modifyString2 = [];
	var modifyString3 = [];
	var modifyString2 = modifyString1.split("&");
	var modifyString3 = modifyString2[0].split("?NOSRCH=");
	parseSearch(modifyString3[1]);
}

function parseSearch(str) {
	var temp = "";
	var elementName = "";
	var fieldLimitCounter = 1;
	var searchTextCounter = 1;
	var booleanCounter = 1;

	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == ":") {
			elementName = "fieldLimit" + fieldLimitCounter;
			temp = str.charAt(i - 1) + str.charAt(i);
			for (var m = 0; m < document.search.length; m++) {
				if (document.search.elements[m].name == elementName) {
					for (var n = 0; n < document.search.elements[m].length; n++) {
						if (document.search.elements[m].options[n].value == temp) {
							document.search.elements[m].options[n].selected = true;
							fieldLimitCounter++;
							break;
						} else {
							continue;
						}
					}
					break;
				} else {
					continue;
				}
			}
			continue;
		} else if (str.charAt(i) == "(") {
			temp = "";
			elementName = "searchText" + searchTextCounter;
			for (var m = 0; m < document.search.length; m++) {
				if (document.search.elements[m].name == elementName) {
					for (i = i + 1; i < str.length; i++) {
						if (str.charAt(i) == ")") {
							i++;
							break;
						} else {
							temp += str.charAt(i);
							continue;
						}
					}
					searchTextCounter++;
					document.search.elements[m].value = temp;
					break;
				} else {
					continue;
				}
			}
			continue;
		} else {
			temp = "";
			elementName = "boolean" + booleanCounter;
			for (i = i; i < str.length; i++) {
				if (str.charAt(i + 1) == ":" || str.charAt(i + 1) == "(") {
					break;
				} else {
					temp += str.charAt(i);
					continue;
				}
			}
			if (temp.length > 0) {
				for (var m = 0; m < document.search.length; m++) {
					if (document.search.elements[m].name == elementName) {
						for (var n = 0; n < document.search.elements[m].length; n++) {
							if (document.search.elements[m].options[n].value.indexOf(temp) != -1) {
								document.search.elements[m].options[n].selected = true;
								booleanCounter++;
								temp = "";
								break;
							} else {
								continue;
							}
						}
						fieldLimitCounter = booleanCounter;
						searchTextCounter = booleanCounter;
						break;
					} else {
						continue;
					}
				}
				if (temp.length > 0) {
					document.search.searchText1.value = temp;
				}
				continue;
			} else {
				continue;
			}
		}
	}
}

function gotoDestination(path, port) {
	if (port == null) port = 80;
	var url = "http://" + location.hostname + ":" + port + path;
	window.open(url);
}

function GoBack() {
	history.back()
}
