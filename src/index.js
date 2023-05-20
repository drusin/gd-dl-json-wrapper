import * as cheerio from 'cheerio';

const DL_REPOSITORY_URL = 'https://downloads.tuxfamily.org/godotengine/';
const VERSION_REGEX = /^[\d\.]+$/g;
const LINK_QUERY = 'tbody td.n a';

const mainPaingStr = await (await fetch(DL_REPOSITORY_URL)).text();
const mainPage = cheerio.load(mainPaingStr);
//wtf, only every second version lands here?
const mainVersions = mainPage(LINK_QUERY)
        .toArray()
        .map(line => ({
            name: line.children[0].data,
            url: DL_REPOSITORY_URL + line.attribs.href
        }))
        .filter(line => VERSION_REGEX.test(line.name));
const versions = {};
for (const version of mainVersions) {
    await traverse(version.url, version.name, versions);
}
console.log(versions);

async function traverse(url, versionString, output) {
    const folderStr = await (await fetch(url)).text();
    const folder = cheerio.load(folderStr);
    const allLines = folder(LINK_QUERY)
            .toArray()
            .map(line => ({
                name: line.children[0].data,
                url: DL_REPOSITORY_URL + line.attribs.href
            }));
    allLines.filter(line => line.name.endsWith('/'))
            .forEach(line => traverse(line.url, `${versionString}-${line.name.slice(0, -1)}`, output));
    const urls = allLines
            .filter(line => !line.name.endsWith('/'))
            .map(line => line.url);
    if (urls.length > 0) {
        output[versionString] = urls;
    }
}