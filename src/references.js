/**
 * @file Generate references from keys in text
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
        throw new Error('References filter works with text');
    }
    if (!csl || csl instanceof Citeproc === false) {
        throw new Error('References filter needs instance of Citeproc to process');
    }

    const records = Citeproc.getBibliographicRecordsFromText(text);

    for (const record of records) {
        const { cluster } = csl.get(record);
        text = text.replaceAll(record.text, cluster);
    }
    return text;
}