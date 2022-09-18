const bibTest = require('./bib-test.json');
const bibKeys = Object.values(bibTest).map(({ id }) => `${id}`);

const txt = `Lorem ipsum dolor sit amet [@${bibKeys[0]} ; @${bibKeys[1]} ; @unknown].`;

module.exports = function() {
    return `<main>${this.references(txt)}</main>`;
};