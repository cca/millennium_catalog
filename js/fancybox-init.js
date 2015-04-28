$(document).ready(function() {
    $('a.lightbox').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'type': 'iframe',
        'width': 650,
        'height': 600
    });

    // Materials Library
    $('a:has(img[alt="sample"])').fancybox({
        'type': 'image',
        'transitionIn': 'elastic',
        'transitionOut': 'elastic'
    });

    // all other scopes
    $('a:has(img[alt="book jacket"])').fancybox({
        'type' : 'image',
        'transitionIn' : 'elastic',
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
