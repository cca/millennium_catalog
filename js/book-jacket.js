// Adapted from Sam Ho @ HKAPA Library bookjacket.js code
// BIB_IMAGE is not required, so disable it first
//
// Before using the code add the following lines as the book jacket placeholder in briefcit.html
//<td class="briefCitImg" width="10%">
//<span class="UPC">
//<!--{fieldspec:Vbi024}-->
//</span>
//<span class="ISBN">
//<!--{fieldspec:Vbi020}-->
//</span>
//</td>
//
// add the following lines as the book jacket placeholder in bib_display.html
// <span title="bookjacket">
// </span>
// <!--{bibimage}-->
// <br/>
//

// for search results display, rewritten in jQuery
// this class wraps a pair of UPC & ISBN <span>s for each search result
var nums = $('.briefCitImg')
// URL prefix for all our content cafe cover images
var prefix = 'http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&'

nums.each(function(index, item) {
	// find & parse standard numbers in records
	var el = $(this)
	var upc = "0" + el.find('.UPC').text().replace(/[a-zA-Z\-,:.[\]()\s]/g, '')
	if (upc) {
		upc = "0" + upc
		upc = upc.substring(0, 13)
	}
	// fix edge case like "9780199237968[1]", ref #37
	// for "Nature's patterns: a tapestry in three parts"
	var isbn = el.find('.ISBN').text().replace(/[a-zA-Z\-,:.[\]()\s]/g, '')
	// prefer ISBN over UPC where we have it
	var standard_num = isbn || upc

	if (standard_num) {
		el.html(
			'<span class="bookjacket"><a href="' + prefix + '&Type=L&Value=' +
			standard_num + '"><img src="' + prefix + '&Type=S&Value=' +
			standard_num + '&erroroverride=1" alt="book jacket"></a></span>'
		)
	}
})

// for bib summary page
// @TODO needs to be rewritten
var divs = document.getElementsByTagName("div");
for (var k = 0; k < divs.length; k++) {

	// if on the bib page
	if (divs[k].className == "bibSearch")  {
		var isbn, upc;
		var tds = document.getElementsByTagName('TD');
		for (var j = 0; j < tds.length; j++) {
			if (tds[j].className == 'bibInfoLabel' && tds[j].innerHTML == "ISBN") {
				// check if there is any ISBN in the bibliographic record
				isbn = tds[j + 1].innerHTML;
				isbn = isbn.replace(/[a-zA-Z\-\,\:\.\(\)\s]/g, "")
				isbn = isbn.replace(/\$+\d{1,4}/, "")
					//alert ("isbn " + isbn);

			}
			if (tds[j].className == 'bibInfoLabel' && tds[j].innerHTML == "Standard No.") {
				//check if there is any UPC in the bibliographic record
				upc = tds[j + 1].innerHTML;
				upc = upc.replace(/[a-zA-Z\-\,\:\.\(\)\s]/g, "")
				if (upc != "") {
					upc = "0" + upc;
					upc = upc.substring(0, 13);
				}
			}
		}
		var images = document.getElementsByTagName("img"); // find all book jackets
		for (var l = 0; l < images.length; l++) {
			if (images[l].alt == "book jacket") {
				if (upc != "" && upc != undefined) {
					// if there's a upc, change the link and the img src
					hrefupc = prefix + "Type=L&Value=" + upc;
					images[l].parentNode.setAttribute('href', hrefupc);
					images[l].src = prefix + "Type=S&Value=" + upc + "&erroroverride=1&";
				} else if (isbn != "" && isbn != undefined) {
					// if there's an isbn change the link and the img src
					hrefisbn = prefix + "Type=L&Value=" + isbn;
					images[l].parentNode.setAttribute('href', hrefisbn);
					images[l].src = prefix + "Type=S&Value=" + isbn + "&erroroverride=1&";
				}
			}
		}
	}
}
