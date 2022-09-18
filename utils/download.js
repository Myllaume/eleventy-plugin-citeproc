const fs = require('fs')
    , path = require('path');

const axios = require('axios');

const tempDirPath = path.join(__dirname, '../temp');
if (fs.existsSync(tempDirPath) === false) {
    fs.mkdirSync(tempDirPath);
}

function downloadFile(url, pathTarget) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            responseType: 'stream'
        })
        .then(({ data }) => {
            data.pipe(fs.createWriteStream(pathTarget))
                .on('finish', resolve)
                .on('error', reject);
        })
        .catch(reject)
    })
}

function fetchFiles(files) {
    return new Promise(async (resolve, reject) => {
        try {
            for (const [url, fileName] of files) {
                const filePath = path.join(tempDirPath, fileName);
                if (fs.existsSync(filePath)) { continue; }
                await downloadFile(url, filePath);
            }
            resolve(files);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = function fetchBibliographyFiles() {
    return fetchFiles([
        ['https://www.zotero.org/styles/iso690-author-date-fr-no-abstract', 'iso690.csl'],
        ['https://raw.githubusercontent.com/citation-style-language/locales/6b0cb4689127a69852f48608b6d1a879900f418b/locales-fr-FR.xml', 'locales-fr-FR.xml']
    ]);
}