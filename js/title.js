// add bib title to <title> tag
var tr = document.getElementsByTagName('TR');
var bib_title = "";
for (i = 0; i < tr.length; i++) {
    var x = tr[i].getElementsByTagName('TD');
    if (x.length == 2 && x[0].innerHTML == "Title") {
        bib_title = x[1].innerHTML.replace(/(<([^>]+)>)|\n/gi, "");
        bib_title = bib_title.replace(/^\s*(.+)\s*$/g, "$1");
        bib_title = bib_title.replace(/^(.+)(\s\/\s).+$/i, "$1");
        bib_title = bib_title.replace(/ :/g, ":");
        bib_title = bib_title.replace(/\//g, "by");
        bib_title = bib_title.replace(/&amp;/g, " and ");
    }
}
var searchterms = document.getElementsByName('searcharg')[0];
if (bib_title.length > 65) {
    document.title = document.title + " :: " + bib_title.substr(0, 65) +
        "...";
} else if (bib_title.length <= 65 && bib_title.length > 0) {
    document.title = document.title + " :: " + bib_title;
} else if (searchterms != undefined) {
    document.title = document.title + " :: '" + searchterms.value +
        "' search results"
}
