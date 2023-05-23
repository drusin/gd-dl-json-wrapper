# gd-dl-json-wrapper
A small node script that crowls through the [Godot download repository](https://downloads.tuxfamily.org/godotengine/) and generates a flat JSON file with a mapping from version name to an array of downloadable files for this versions, e.g.
```JSON
{
  (...),
  "4.0.3": [
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_android_editor.apk",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_changelog_authors.txt",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_changelog_chrono.txt",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_export_templates.tpz",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_linux.x86_32.zip",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_linux.x86_64.zip",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_macos.universal.zip",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_web_editor.zip",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_win32.exe.zip",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/Godot_v4.0.3-stable_win64.exe.zip",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/SHA512-SUMS.txt",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/godot-4.0.3-stable.tar.xz",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/godot-4.0.3-stable.tar.xz.sha256",
      "https://downloads.tuxfamily.org/godotengine/4.0.3/godot-lib.4.0.3.stable.template_release.aar"
    ],
  (...)
}
```
The version names are created by naively putting together the names of the "subfolders" which are traversed, so you can end up with things like `4.0-pre-alpha-4.0-dev.20210820` but that's good enough for me right now.

## output.json
The generated json file is hosted on github.io: https://drusin.github.io/gd-dl-json-wrapper/json/output.json  
It is regenerated twice per day via Github actions.

## Running locally
Make sure you have Node 18 or later installed, then:
* clone or donwload the project
* `npm ci`
* `npm start`

This will regenerate the file `output.json` in `docs/json`