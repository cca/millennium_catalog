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
// Link this code in botlogo.html by adding the following line
/* <script language="JavaScript" type="text/javascript" src="/screens/bookjacket2.js"></script>*/

var spans = document.getElementsByTagName("span"); //find all spans on search results page
for (var i=0; i < spans.length; i++) //loop through all spans
{
	

	if (spans[i].className=="UPC") { // if span class is UPC plug span content into content cafe link and image
			var upc = spans[i].innerHTML;
		    upc = upc.replace(/[a-zA-Z\-\,\:\.\(\)\s]/g, "")
			if (upc != ""){
				upc = "0" + upc;
				upc = upc.substring(0, 13); 
			var upcimage = "<span class='bookjacket'><a href='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=L&Value=" + upc + " target='_parent'><img src='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=S&Value=" + upc + "&erroroverride=1&' border='0' alt='book jacket'></a></span>";
			spans[i].innerHTML = upcimage;
			}
			
			}
			
	else if (spans[i].className=="ISBN") { // if span class is ISBN plug span content into content cafe link and image
			var isbn = spans[i].innerHTML;
			isbn = isbn.replace(/[a-zA-Z\-\,\:\.\(\)\s]/g, "") 
			isbn = isbn.replace(/\$+\d{1,4}/, "")
			if (upc != ""){ // don't use ISBN if UPC worked
				spans[i].innerHTML = "";
			continue;
			}
			else if (isbn != ""){
			var isbnimage = "<span class='bookjacket'><a href='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=L&Value=" + isbn + " target='_parent'><img src='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=S&Value=" + isbn + "&erroroverride=1&' border='0' alt='book jacket'></a></span>";
			spans[i].innerHTML = isbnimage;
			}
			else if (isbn ==""){
				spans[i].innerHTML = "";
			}
			}
		
			
	}
	
var divs = document.getElementsByTagName("div");
for(var k = 0; k < divs.length; k++) {
	
	if (divs[k].className=="bibMain") // if on the bib page
	{
		var isbn, upc;
		var tds = document.getElementsByTagName('TD');
			for(var j = 0; j < tds.length; j++) {
				if (tds[j].className=='bibInfoLabel' &&  tds[j].innerHTML=="ISBN") { // check if there is any ISBN in the bibliographic record
				isbn = tds[j+1].innerHTML;
				isbn = isbn.replace(/[a-zA-Z\-\,\:\.\(\)\s]/g, "") 
			    isbn = isbn.replace(/\$+\d{1,4}/, "")
				//alert ("isbn " + isbn);
				
				}
				if (tds[j].className=='bibInfoLabel' &&  tds[j].innerHTML=="Standard No.") { //check if there is any UPC in the bibliographic record
				upc = tds[j+1].innerHTML;
				upc = upc.replace(/[a-zA-Z\-\,\:\.\(\)\s]/g, "")
				if (upc != ""){
				upc = "0" + upc;
				upc = upc.substring(0, 13); 
				}
				//alert ("upc " + upc);	
				}
			}
		var images = document.getElementsByTagName("img"); // find all book jackets
	for (var l = 0; l < images.length; l++) {
		if(images[l].alt=="book jacket"){
			//alert ("image upc " + upc + " isbn " + isbn);
			if (upc != "" && upc != undefined){ // if there's a upc change the link and the img src
				hrefupc = "http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=L&Value=" + upc;
				images[l].parentNode.setAttribute('href', hrefupc);
				images[l].src = "http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=S&Value=" + upc + "&erroroverride=1&";
				//alert (images[l].src);
				}
			else if (isbn != "" && isbn != undefined){  // if there's an isbn change the link and the img src
			    hrefisbn = "http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=L&Value=" + isbn;
				images[l].parentNode.setAttribute('href', hrefisbn);
				images[l].src = "http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=S&Value=" + isbn + "&erroroverride=1&";
				//alert (images[l].src);
			}
			
		
		}
	}
	
	}
	
}
