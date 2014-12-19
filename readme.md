# Millennium Screens & Web Options

CCA's customized Millennium catalog screens & settings.

## Notes

There is still a lot of cleanup needed; many files in the "live" directory are outdated backups which should be removed.

Anything uploaded to **Live** is available at {{catalog URL}}/screens while anything uploaded to **Staging** is at {{catalog URL}}:2082/screens. They share the ILS database.

If you're looking at a catalog page & wondering what file it is, there'll be a comment outside the closing `</html>` tag at the bottom of the file. For instance, our default "search" page notes that `<!--this is customized <screens/opacmenu_s2.html>-->`.

## Documentation

A list of "command links" (paths that map to particular screens) as well as details on using tokens in these screens:
http://csdirect.iii.com/manual/rmil_web_forms.html

"wwwoptions" contains global settings that affect many things in the catalog:
http://csdirect.iii.com/manual/rmil_web_options.html

"webpub.def" defines which MARC fields are displayed or suppressed. It is an arcane format that makes MARC look readable by comparison:
http://csdirect.iii.com/manual/rmil_webopac_webpub_def.html

## License

[Apache Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
