//
// Written by Sam Ho @ HKAPA Library
// April 2010
//
// BIB_IMAGE is not required, so disable it first
//
// Before using the code add the following lines as the book jacket placeholder in briefcit.html
// <span title="bookjacket">
// <!--{fieldspec:Vbi024}-->
// ##
// <!--{fieldspec:Vbi020}-->
// ##
// <!--{fieldspec:Vby856:u}-->
// </span>
// <!--{bookjacket}-->
// <br/>
//
// add the following lines as the book jacket placeholder in bib_display.html
// <span title="bookjacket">
// </span>
// <!--{bibimage}-->
// <br/>
//
// Link this code in botlogo.html by adding the following line
/* <script language="JavaScript" type="text/javascript" src="/screens/bookjacket.js"></script>*/
//

var upc, isbn, url, page_location, BookImage_1, BookImage_2;
var spans = document.getElementsByTagName("span"); 
for (var i=0;i<spans.length;i++) {
    if (spans[i].title=="bookjacket" ) {
        var tds = document.getElementsByTagName('TD');  //for adding book jackets in the bib display page
        var table_eles = document.getElementsByTagName('Table');  //for getting url in the bib display
        
        for(var j = 0; j < tds.length; j++) {
            if (tds[j].className=='bibInfoLabel' &&  tds[j].innerHTML=="Title") { // use Title information to determine if in the bib_display page
            page_location = "bib"
            }
            if (tds[j].className=='bibInfoLabel' &&  tds[j].innerHTML=="ISBN") { // check if there is any ISBN in the bibliographic record
            nextsib=tds[j].nextSibling;  // Firefox fix for nextSibling
            if (nextsib.innerText ==undefined) {  //Get ISBN for IE
            while(nextsib.nodeType!=1){
                nextsib = nextsib.nextSibling;
            }
            isbn= nextsib.childNodes[1].innerHTML; // retreive the ISBN
            }
            else {
            isbn= nextsib.innerText
            }
            
            }
            if (tds[j].className=='bibInfoLabel' &&  tds[j].innerHTML=="Standard No.") { //check if there is any UPC in the bibliographic record
            nextsib=tds[j].nextSibling;  // Firefox fix for nextSibling
            while(nextsib.nodeType!=1){
                nextsib = nextsib.nextSibling;
            }
            upc = nextsib.innerHTML; // retreive the UPC
            }
        }
        
        for(var j = 0; j < table_eles.length; j++) {
        if (table_eles[j].className=='bibLinks') {        
        if (navigator.appName != "Microsoft Internet Explorer") { //check the browser type to retreive url for bib_display
            url=table_eles[j].childNodes[1].childNodes[2].childNodes[1].childNodes[1]
        }
        else {
            url=table_eles[j].childNodes[0].childNodes[1].childNodes[0].childNodes[0]
        }
        }
        }
                
        if (page_location !="bib") {// check whether the page is search result page or bibliographic record
            html_content = spans[i].innerHTML  // search result page
        }
        else {
            html_content = upc + "##" + "\n"+ isbn + "##"+ url;  //put the data into right format for bib_display page    
        }
        html_content = html_content.replace("\n","")
                
        identifiers=html_content.split("##")                    
        upc = identifiers[0]
        upc = upc.replace(/[a-zA-Z\-\,\:\.\(\)\s]/g, "")  //replace any characters and punctuation
        isbn = identifiers[1]
        isbn = isbn.replace(/[a-wy-zA-WY-Z\-\,\:\.\(\)\s]/g, "") //replace any characters and punctuation
        url = identifiers[2]
        url = url.replace(/[\s]/g, "") 
        
        if (upc.length == 12 && isbn=="") {  // if it is EAN (13 digits), Syndetics can use isbn=EAN syntax to retrieve the image; if there is an isbn, use BIB_IMAGE to retrieve the image
            spans[i].style.display="inline"
            spans[i].innerHTML = "<a href='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=L&Value=" + upc + "' target=_parent><img src='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=S&Value=" + upc + "&erroroverride=1&' border=0 alt='book jacket'></a>"  // replace the UPC with the Syndetics cover arts        
        }

        if (isbn!="") { // using ISBN to retrieve book jackets from other sources            
            spans[i].style.display="inline"                
            spans[i].innerHTML = "<a href='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=L&Value="+ isbn +"' target=_parent><img src='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=S&Value=" + isbn + "&erroroverride=1&' border=0 alt='book jacket' OnError=window.event.srcElement.style.display='None'></a>"  // Syndetic Book Jacket as the primary source
        }

       /* if (url!="") { // Use 856 to construct the cover for serials
        
            if (url.indexOf("www.jstor.org")!=-1){  //Jstor
                path=url.split("=")
                if (path[1] != undefined) { // check whether book jacket in right format
                spans[i].style.display="inline"
                spans[i].innerHTML = "<img src='http://www.jstor.org/covergifs/" + path[1]+ "/cover.gif' border=0  width=95 height=125 alt='' OnError= window.event.srcElement.style.display='None'>"
                }
            }*/
            
           /* if (url.indexOf("cjn.lib.hku")!=-1){  //CAJ
                path=url.split("Value=")
                if (path[1]!=undefined) { // check whether book jacket in right format
                spans[i].style.display="inline"
                spans[i].innerHTML = "<img src='http://cjn.lib.hku.hk//fm/cjfd/small/" + path[1]+ ".jpg' border=0  width=95 height=125 alt='' OnError= window.event.srcElement.style.display='None' >"
                }
            }
            
            if (url.indexOf("www.airiti.com")!=-1){ //CEPS
                path=url.split("=")
                if (path[1]!=undefined) { // check whether book jacket in right format
                spans[i].style.display="inline"
                spans[i].innerHTML = "<img src='http://www.airiti.com/CEPS/jnltitledo/" + path[1]+ "-c.jpg' border=0 alt='' OnError= window.event.srcElement.style.display='None'  >"    
                }
            }

            if (url.indexOf("gongjushu.cnki.net")!=-1){ //CRWO
                path=url.substring(50,60);
                if (path!="") { // check whether book jacket in right format
                spans[i].style.display="inline"
                spans[i].innerHTML = "<img src='http://gongjushu.cnki.net/crfdpic/small/" + path + "fm_small.jpg' border=0 alt='book jacket'>"        
                }
            }*/
        }
        
        if ((isbn == "" && upc == "" && url!="") || (isbn == "" && upc == "" && url==""))  { // insert dummy cover art            
            if (spans[i].innerHTML.indexOf("src") ==-1) {
            spans[i].innerHTML = "<a href='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=L&Value=00000000001' target=_parent><img src='http://contentcafe2.btol.com/ContentCafe/Jacket.aspx?UserID=CCA49068&Password=CC63500&Return=1&Type=S&Value=00000000001&erroroverride=1&' border=0 alt='book jacket' OnError=window.event.srcElement.style.display='None'></a>"  // Syndetic Book Jacket as the primary source
        }
        }
    }


/*function secondary_source() {
var spans = document.getElementsByTagName("span"); 
    for (var i=0;i<spans.length;i++) {
        if (spans[i].title=="bookjacket" ) {
            if (spans[i].innerHTML.indexOf("alt")!= -1) {
                img_height = spans[i].childNodes[0].height
                img_width = spans[i].childNodes[0].width
            if (img_height == undefined) {
            img_height = spans[i].childNodes[0].childNodes[0].height
            img_width = spans[i].childNodes[0].childNodes[0].width            
            }
            
            if (spans[i].innerHTML.indexOf("syndetics")!= -1) {
            if (img_height ==0 || img_height ==1 ) { // if not image available in Syndetic, look in secondary source
                isbn = spans[i].childNodes[0].innerHTML.split("isbn=")
                isbn = isbn[1].split("/")        
                spans[i].innerHTML = "<a href='http://findbook.tw/book/" + isbn[0] + "/basic' target=_blank><img src='http://static.findbook.tw/image/book/" + isbn[0] + "/medium' border=0 alt='book jacket'  OnError= window.event.srcElement.style.display='None'></a>"  // replace the ISBN with the findbook.tw cover arts
            }
            }
            
            if (img_height > 150 || img_width > 110) {  //resize image that is too large for display
            spans[i].childNodes[0].height = 150
            spans[i].childNodes[0].width = 110
            }
            }
        }
    }
}*/

function addEvent(obj, evType, fn){ 
 if (obj.addEventListener){ 
   obj.addEventListener(evType, fn, false); 
   return true; 
 } else if (obj.attachEvent){ 
   var r = obj.attachEvent("on"+evType, fn); 
   return r; 
 } else { 
   return false; 
 } 
}
//addEvent(window, 'load', secondary_source); // Check secondary source for cover art; if you don't need secondary source, you can disable it
