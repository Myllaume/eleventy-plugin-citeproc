/**
 * @file Generate bibliography from keys in text
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0
 */

/**
 * @typedef Options
 * @type {object}
 * @property {string} className
 */

const Citeproc = require('./citeproc');

const baseOptions = {
    className: 'bibliography-entry'
};

/**
 * 
 * @param {string} text 
 * @param {Citeproc} csl 
 * @param {Options} options
 * @returns {string}
 */

module.exports = function (text, csl, options) {
    if (typeof text !== 'string') {
        throw new Error('Biliography filter works with text');
    }
    if (!csl || csl instanceof Citeproc === false) {
        throw new Error('Biliography filter needs instance of Citeproc to process');
    }

    options = Object.assign({}, baseOptions, options);

    const records = Citeproc.getBibliographicRecordsFromText(text);

    let bibliography = [];
    for (const record of records) {
        const { record: bibliographyItem } = csl.get(record);
        bibliography.push(bibliographyItem);
    }

    bibliography = bibliography.filter(entry =>  entry !== undefined);
    if (bibliography.length === 0) {
        return '';
    }

    bibliography = bibliography.map(entry => {
        const regexClassName = new RegExp(/(?<=div class=")[\w-]+(?=")/, 'g');
        entry = entry.replace(regexClassName, options.className);
        return entry;
    });

    bibliography = bibliography.join('')
    return bibliography;
}