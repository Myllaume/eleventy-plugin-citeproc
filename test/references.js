const path = require('path')

const { describe, it, before } = require('mocha')

const should = require('chai').should();

const Eleventy = require("@11ty/eleventy");
const fetchBibliographyFiles = require('../utils/download');

describe('References', () => {
    before('fetch citeproc use files', () => {
        return new Promise(async (resolve) => {
            await fetchBibliographyFiles();
            resolve();
        });
    });

    let response;

    before('process Eleventy', () => {
        return new Promise(async (resolve, reject) => {
            try {
                let elev = new Eleventy(
                    path.join(__dirname, '../utils'),
                    path.join(__dirname, '../temp'), 
                    {
                        quietMode: true,
                        configPath: path.join(__dirname, '../utils/.eleventy.js')
                    }
                );
                response = await elev.toJSON();
            } catch (error) {
                reject(error);
            }
            resolve();
        });
    });

    it('should get HTML with reference, without unknown quote keys', () => {
        const { content } = response.find(({ url }) => url === '/references/');
        content.should.be.equal('<main>Lorem ipsum dolor sit amet (Goody, Bazin, Bensa 1979; Bachimont 2004).</main>')
    });
})