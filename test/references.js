const path = require('path')

const { describe, it, before } = require('mocha')

const should = require('chai').should();

const Eleventy = require("@11ty/eleventy");
const fetchBibliographyFiles = require('../utils/download');

describe('References', () => {
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

    it('should get HTML with reference, without unknown quote keys', () => {
        const { content } = response.find(({ url }) => url === '/references/');
        content.should.be.equal('<main>Lorem ipsum dolor sit amet (Goody, Bazin, Bensa 1979; Bachimont 2004).</main>')
    });
})