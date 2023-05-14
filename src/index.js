import * as cheerio from 'cheerio';

const DL_REPOSITORY_URL = 'https://downloads.tuxfamily.org/godotengine/';

const mainPaingStr = await (await fetch(DL_REPOSITORY_URL)).text();
const mainPage = cheerio.load(mainPaingStr);
const mainVersions = mainPage('tbody td.n a')
        .toArray()
        .map(line => ({
            name: line.children[0].data,
            url: DL_REPOSITORY_URL + line.attribs.href
        }))
        .filter(line => /^[\d\.]+$/g.test(line.name));
const versions = {};
for (version in versions) {
    const mainVersionFolderStr = await (await fetch(version.url)).text();
    const folder = cheerio.load(mainVersionFolderStr);
    const urls = folder('tbody td.n a')
            .toArray()
            .map(line => ({
                name: line.children[0].data,
                url: DL_REPOSITORY_URL + line.attribs.href
            }))
            .filter(line => /^Godot\-v/g.test(line.name))
            .map(line => line.url);
    versions[version.name] = urls;
}
console.log(versions);