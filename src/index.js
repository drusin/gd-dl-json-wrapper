import { load } from 'cheerio';
import { writeFile } from 'fs';
import fetch from 'node-fetch';

const DL_REPOSITORY_URL = 'https://downloads.tuxfamily.org/godotengine/';
const VERSION_REGEX = /^[\d\.]+$/;
const LINK_QUERY = 'tbody td.n a';

const mainPaingStr = await (await fetch(DL_REPOSITORY_URL)).text();
const mainPage = load(mainPaingStr);
const mainVersions = mainPage(LINK_QUERY)
        .toArray()
        .map(line => ({
            name: line.children[0].data,
            url: DL_REPOSITORY_URL + line.attribs.href
        }))
        .filter(line => VERSION_REGEX.test(line.name));
const versions = {};
const promises = mainVersions.map(version => traverse(version.url, version.name, versions));
await Promise.all(promises);
writeFile('./output.json', JSON.stringify(versions, null, 4), console.error);

async function traverse(url, versionString, output) {
    const folderStr = await (await fetch(url)).text();
    const folder = load(folderStr);
    const allLines = folder(LINK_QUERY)
            .toArray()
            .map(line => ({
                name: line.children[0].data,
                url: url + line.attribs.href
            }))
            .filter(line => line.name !== 'Parent Directory' && line.name !== 'fixup');
    const goingDeeper = allLines.filter(line => line.url.endsWith('/'))
            .map(line => traverse(line.url, `${versionString}-${line.name}`, output));
    await Promise.all(goingDeeper);
    const urls = allLines
            .filter(line => !line.url.endsWith('/'))
            .map(line => line.url);
    if (urls.length > 0) {
        output[versionString] = urls;
    }
}