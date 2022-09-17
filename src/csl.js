/**
 * @file Get citeproc CSL processor
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0
 */

/**
 * @typedef Options
 * @type {object}
 * @property {string} cslStylePath
 * @property {string} xmlLocalPath
 * @property {string} bibPath
 */

const fs = require('fs');

const Citeproc = require('./citeproc');

/**
 * @param {Options} options 
 * @todo check and verif files type
 */

module.exports = function(options) {
    const {
        cslStylePath,
        xmlLocalPath,
        bibPath
    } = options;

    for (const path of [cslStylePath, xmlLocalPath, bibPath]) {
        if (fs.existsSync(path) === false) {
            throw new Error(`File ${cslStylePath} does not exists.`);
        }
    }

    let cslStyleFileContent, xmlLocalFileContent, bibFileContent;

    try {
        cslStyleFileContent = fs.readFileSync(cslStylePath, 'utf-8');
        xmlLocalFileContent = fs.readFileSync(xmlLocalPath, 'utf-8');
        bibFileContent = fs.readFileSync(bibPath, 'utf-8');
    } catch (error) {
        throw new Error('Can not read files.');
    }

    try {
        bibFileContent = JSON.parse(bibFileContent);
    } catch (error) {
        throw new Error(`Can not parse bib file ${bibPath}.`);
    }

    const bibliography = new Citeproc(bibFileContent, cslStyleFileContent, xmlLocalFileContent);
    return bibliography;
}