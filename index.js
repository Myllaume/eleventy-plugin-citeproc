/**
 * @file Index for 11ty citeproc plugin configuration
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0
 */

const references = require('./src/references')
    , bibliography = require('./src/bibliography')
    , getCsl = require('./src/csl');

module.exports = function (e, customOptions) {
    const csl = getCsl(customOptions);

    e.addFilter("references", (text) => references(text, csl));
    e.addFilter("bibliography", (text) => bibliography(text, csl));
}