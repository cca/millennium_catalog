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
    // find "ISBN" material ID
    var mid = $el.text().replace(/[\-\,\(\)\s]/g, '').replace(/\$+\d{1,4}/, '')
    // set image HTML or leave blank if no ID
    var html = mid ? "<span class='bookjacket'><a href='http://libraries.cca.edu/nml-images/" +
        mid + ".jpg' target='_parent' class='lightbox'><img src='http://libraries.cca.edu/nml-images/" +
        mid + "' alt='material sample' " +
        // have element remove itself if image doesn't load
        // fixes tons of broken img icons
        "onerror='$(this).parent().remove()'></a></span>" : ''
    $el.html(html)
})

// if we're on an individual item page
if ($('.bibSearch').length > 0) {
    //  "ISBN" is cell adjacent to label "<td>Image</td>"
    var mid = $('td.bibInfoLabel::contains("Image")').next('td').text()
            .replace(/[\-\,\:\(\)\s]/g, "").replace(/\$+\d{1,4}/, "")
    // error recovery a bit more complicated for item records
    // delete "click image to enlarge" text below img in #padright
    var onerror = '$(this).parent().remove();$("#padright").remove()'
    var html = mid ? "<span class='bookjacket'><a href='http://libraries.cca.edu/nml-images/" +
        mid + "' target='_parent' class='lightbox'><img src='http://libraries.cca.edu/nml-images/" +
        mid + "' alt='material sample' " +
        "onerror='" + onerror + "'></a></span>" : ''
    $('span.ISBN').html(html)
}

})(jQuery)
