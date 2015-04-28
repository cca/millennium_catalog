// add emphasis to local note fields in bibdisplay
$('td.bibInfoLabel').each(function() {
    var inner = $(this).html()
    if (inner == "Local note") {
        $(this).html('<em>' + inner + '</em>')
    }
})
