/**
 * @file Get citeproc CSL processor
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0
 */

/**
 * @typedef Options
 * @type {object}
 * @property {string} bibliographicStylePath
 * @property {string} bibliographicLocalizationPath
 * @property {string} bibliographicDataPath
 */

const fs = require('fs');

const Citeproc = require('./citeproc');

/**
 * @param {Options} options 
 * @todo check and verif files type
 */

module.exports = function(options) {
    const {
        bibliographicStylePath,
        bibliographicLocalizationPath,
        bibliographicDataPath
    } = options;

    for (const path of [bibliographicStylePath, bibliographicLocalizationPath, bibliographicDataPath]) {
        if (fs.existsSync(path) === false) {
            throw new Error(`File ${bibliographicStylePath} does not exists.`);
        }
    }

    let cslStyleFileContent, xmlLocalFileContent, bibFileContent;

    try {
        cslStyleFileContent = fs.readFileSync(bibliographicStylePath, 'utf-8');
        xmlLocalFileContent = fs.readFileSync(bibliographicLocalizationPath, 'utf-8');
        bibFileContent = fs.readFileSync(bibliographicDataPath, 'utf-8');
    } catch (error) {
        throw new Error('Can not read files.');
    }

    try {
        bibFileContent = JSON.parse(bibFileContent);
    } catch (error) {
        throw new Error(`Can not parse bib file ${bibliographicDataPath}.`);
    }

    const bibliography = new Citeproc(bibFileContent, cslStyleFileContent, xmlLocalFileContent);
    return bibliography;
}