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

var spans = document.getElementsByTagName("span"); //find all spans on search results page

for (var i = 0; i < spans.length; i++) { //loop through all spans
    // if span class is ISBN plug span content into content cafe link and image
    if (spans[i].className == "ISBN") {
        var isbn = spans[i].innerHTML;
        isbn = isbn.replace(/[\-\,\(\)\s]/g, "").replace(/\$+\d{1,4}/, "")
        if (isbn !== "") {
            var isbnimage =
                "<span class='bookjacket'><a href='http://libraries.cca.edu/nml-images/" +
                isbn +
                ".jpg' target='_parent'><img src='http://libraries.cca.edu/nml-images/" +
                isbn + "' alt='sample'></a></span>";
            spans[i].innerHTML = isbnimage;
        } else if (isbn === "") {
            spans[i].innerHTML = "";
        }
    }
}

var divs = document.getElementsByTagName("div");

for (var k = 0; k < divs.length; k++) {
    if (divs[k].className == "bibSearch") { // if on the bib page
        var isbn;
        var tds = document.getElementsByTagName('TD');

        for (var j = 0; j < tds.length; j++) {
            if (tds[j].className == 'bibInfoLabel' && tds[j].innerHTML ==
                "Image") { // check if there is any ISBN in the bibliographic record
                isbn = tds[j + 1].innerHTML;
                isbn = isbn.replace(/[\-\,\:\(\)\s]/g, "")
                isbn = isbn.replace(/\$+\d{1,4}/, "")
                    //alert ("isbn " + isbn);
            }
        }

        var spans = document.getElementsByTagName("span"); //find all spans on search results page
        for (var i = 0; i < spans.length; i++) { //loop through all spans
            if (spans[i].className == "ISBN") {
                if (isbn !== "") {
                    var isbnimage =
                        "<span class='bookjacket'><a href='http://libraries.cca.edu/nml-images/" +
                        isbn +
                        "' target='_parent'><img src='http://libraries.cca.edu/nml-images/" +
                        isbn + "' alt='sample'></a></span>";
                    spans[i].innerHTML = isbnimage;
                } else if (isbn === "") {
                    spans[i].innerHTML = "";
                }
            }
        }
    }
}
