const path = require('path');

const eleventyCiteproc = require("../index");

module.exports = function (e) {
    e.addPlugin(eleventyCiteproc, {
        bibliographicStylePath: path.join(__dirname, '../temp/iso690.csl'),
        bibliographicLocalizationPath: path.join(__dirname, '../temp/locales-fr-FR.xml'),
        bibliographicDataPath: path.join(__dirname, 'bib-test.json')
    });

    return {
        dir: {
            input: "./",
            output: "../temp"
        }
    };
};