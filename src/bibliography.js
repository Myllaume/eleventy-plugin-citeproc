/**
 * @file Generate bibliography from keys in text
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0
 */

const Citeproc = require('./citeproc');

/**
 * 
 * @param {string} text 
 * @param {Citeproc} csl 
 * @returns {string}
 */

module.exports = function (text, csl) {
    if (typeof text !== 'string') {
        throw new Error('Biliography filter works with text');
    }
    if (!csl || csl instanceof Citeproc === false) {
        throw new Error('Biliography filter needs instance of Citeproc to process');
    }

    const records = Citeproc.getBibliographicRecordsFromText(text);

    let bibliography = [];
    for (const record of records) {
        const { record: toto } = csl.get(record);
        bibliography.push(toto);
    }
    bibliography = bibliography.join('')
    return bibliography;
}