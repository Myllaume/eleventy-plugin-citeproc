const path = require('path')

const { describe, it, before } = require('mocha')

const should = require('chai').should();

const Eleventy = require("@11ty/eleventy");
const fetchBibliographyFiles = require('../utils/download');

describe('Bibliography', () => {
    before('fetch citeproc use files', async () => {
        await fetchBibliographyFiles();
    });

    let response;

    before('process Eleventy', async () => {
        let elev = new Eleventy(
            path.join(__dirname, '../utils'),
            path.join(__dirname, '../temp'), 
            {
                quietMode: true,
                configPath: path.join(__dirname, '../utils/.eleventy.js')
            }
        );
        response = await elev.toJSON();
    });

    it('should get bibliography text', () => {
        const { content } = response.find(({ url }) => url === '/bibliographies/');
        content.should.to.include('BACHIMONT, Bruno, 2004.');
    });

    it('should get HTML with className', () => {
        const { content } = response.find(({ url }) => url === '/bibliographies/');
        content.should.to.include('class="bib-entry"');
    });
})