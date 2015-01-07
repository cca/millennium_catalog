// add emphasis to local note fields in bibdisplay
var tds = document.getElementsByTagName('TD');
			for(var k = 0; k < tds.length; k++) {
				if (tds[k].className=='bibInfoLabel') { 
					//alert ("bibinfolabel");
						if (tds[k].innerHTML=="Local note") {
							var emphasis = "<em>" + tds[k].innerHTML + "</em>";
							tds[k].innerHTML = emphasis;
						}
					
				}
			}
	