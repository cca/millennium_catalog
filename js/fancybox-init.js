$(document).ready(function() {
    // @TODO combine with Mat Lib below?
    $('a.lightbox').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'iframe',
        'width': 650,
        'height': 600
    });

    // Materials Library
    $('a.lightbox').fancybox({
        'type': 'image',
        'transitionIn': 'elastic',
        'transitionOut': 'elastic'
    });

    // all other scopes
    // @TODO instead of a ridiculous selector, add a "lightbox" class to element
    $('a:has(img[alt="book jacket"])').fancybox({
        'type': 'image',
        'transitionIn': 'elastic',
        'transitionOut': 'elastic'
    });

    $('a.lightbox2').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'iframe',
        'width': 700,
        'height': 550
    });
});
