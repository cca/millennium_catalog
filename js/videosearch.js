// advanced search script for videos search form

//  IMPORTANT NOTE: The following Javascript functions are provided for example purposes only.
//  Unless you have experience working with Javascript, please refer to your local technical
//  resources for assistance with modification.
//  If many of your patrons use an out of date browser (such as Netscape 4.7) with incomplete support
//  for Javascript, you may wish to use srchhelp_X_nojavascript.html instead. Simply rename this file
//  srchhelp_X_javascript.html and then rename that file srchhelp_X.html.

// Initialize arrays used in following functions
var searchType = [];
var searchName = [];
var searchValue = [];
var limitType = [];
var limitName = [];
var limitValue = [];

function processLimit() {
	// version 1 : January 22, 2003
	//
	// This function is called by the submitSearch function.
	// This function processes all limit form elements in the current page.
	// Any form element used to apply a limit to the search entered by the user is
	// considered a limit form element for the purpose of this function.
	// Innovative recommends always using tokens to insert limit form elements into HTML.
	// For more information on tokens see the User Manual or http://csdirect.iii.com .
	// All limit form elements must appear contiguously within the HTML and must be enclosed
	// in the following hidden form tags.
	// The user must include the following hidden form element before the first
	// limit form element appearing in the search form:
	// <input TYPE="hidden" NAME="startLimit">
	// The following hidden form element must be included after the last limit form
	// element appearing in the search form:
	// <input TYPE="hidden" NAME="endLimit">
	var limitWorkString = "";
	for (var i = 0; i < limitName.length; i++) {
		//
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
	//
	// This function is called by the submitSearch function.
	// This function processes field limit, search text, and boolean form elements in the current page.
	// Any form element which allows the user to choose a field limit, type search text, or choose
	// a boolean operator is considered a search form element for the purpose of this function.
	// All search form elements must appear contiguously within the HTML and must be enclosed
	// in the following hidden form tags.
	// The user must include the following hidden form element before the first search
	// form element appearing in the search form:
	// <input TYPE="hidden" NAME="startSearch">
	// The following hidden form element must be included after the last search form
	// element appearing in the search form:
	// <input TYPE="hidden" NAME="endSearch">
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
	// version 1 : January 22, 2003
	//
	// This function is called when the user clicks the submit button.
	// This function processes all form elements in the form named search and
	// populates the arrays searchType, searchName, searchValue, limitType, limitName, limitValue
	// with data. It then passes the data to the functions processSearch and processLimit; please
	// see the description of those functions for important information on the hidden form elements
	// within the form named search which are required for this function to work properly.
	// Finally, this function replaces the current page with a URL constructed based on the user's
	// form input.
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

	searchString = encodeURI(searchString)
	window.location.href = "http://" + location.host + "/search~S4/X?" +
		searchString + limitString;
	return false;
}

function modifySearch() {
	// version 2 : May 25, 2004
	//
	// This function takes the URL of the current page and extracts all search data into the
	// array modifyString3. It then passes that information to the function parseSearch.
	var modifyString1 = unescape(location.search);
	var modifyString2 = [];
	var modifyString3 = [];

	modifyString2 = modifyString1.split("&");
	if (modifyString2[0].indexOf("?NOSRCH=") != -1) {
		modifyString3 = modifyString2[0].split("?NOSRCH=");
	} else {
		modifyString3 = modifyString2[0].split("?");
	}
	parseSearch(modifyString3[1]);
}


function parseSearch(str) {
	// version 1 : January 22, 2003
	//
	// This function is called by the function modifySearch.
	// This function takes the relevant portion of the URL of the current page and attempts to place
	// all data within that URL back into the appropriate form elements on the page within the
	// form named search. If the function can't find appropriately named form elements into which
	// to place data, it puts everything into the text element named searchText1 in the form named search.
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
	if (!port) port = 80;
	var url = "http://" + location.hostname + ":" + port + path;
	window.open(url);
}

function GoBack() {
	history.back();
}
