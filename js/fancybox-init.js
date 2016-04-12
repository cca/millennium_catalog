$(document).ready(function() {
    // @TODO combine with Mat Lib below?
    $('a.lightbox').fancybox({
        'height': 600,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'iframe',
        'width': 650
    });

    // Materials Library
    $('a.lightbox').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'image'
    });

    // OCLC "cite this"
    $('#citeoclc a').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'iframe'
    });

    // all other scopes
    // @TODO instead of a ridiculous selector, add a "lightbox" class to element
    $('a:has(img[alt="book jacket"])').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'image'
    });

    $('a.lightbox2').fancybox({
        'height': 550,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'iframe',
        'width': 700
    });
});
