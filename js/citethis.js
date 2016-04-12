// add Worldcat "cite this" link

// parse OCLC number from DOM, shouldn't need to specify .eq(0) here
// but somehow number ends up repeated 3x if we don't
var oclc = $('td.bibInfoLabel:contains("OCLC #")').parent('tr').find('td.bibInfoData').eq(0).text()
oclc = oclc.replace(/(<([^>]+)>)/ig, '').replace(/\s/g, '')

// format link using OCLC number
var $target = $('#citeoclc')
if ($target.length != 0 && oclc) {
    // fancybox uses "#citeoclc a" selector
    $target.html(
        '<a href="http://www.worldcat.org/oclc/' + oclc +
        '?page=citation">  Cite this item</a>'
    )
} else {
    $target.remove()
}
