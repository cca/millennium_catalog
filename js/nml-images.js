// NOTE: from previous file, uncertain of its veracity...
//
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
// ...END old notes

// jQuery IIFE
(function($) {

// for the search results screen
$('span.ISBN').each(function(){
    var $el = $(this)
    // find material ID
    var mid = $el.text().replace(/[\-\,\(\)\s]/g, '').replace(/\$+\d{1,4}/, '')
    // set image HTML or leave blank if no ID
    var html = mid ? "<span class='bookjacket'><a href='http://libraries.cca.edu/nml-images/" +
        mid + ".jpg' target='_parent'><img src='http://libraries.cca.edu/nml-images/" +
        mid + "' alt='material sample'></a></span>" : ''
    $el.html(html)
})

// for individual item pages
// find "ISBN" (material ID), is cell adjacent to label ""<td>Image</td>"
var mid = $('td.bibInfoLabel::contains("Image")').next('td').text()
        .replace(/[\-\,\:\(\)\s]/g, "").replace(/\$+\d{1,4}/, "")
// set image HTML or leave blank if no ID
var html = mid ? "<span class='bookjacket'><a href='http://libraries.cca.edu/nml-images/" +
    mid + "' target='_parent'><img src='http://libraries.cca.edu/nml-images/" +
    mid + "' alt='material sample'></a></span>" : ''
$('span.ISBN').html(html)

})(jQuery)
