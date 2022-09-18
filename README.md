# eleventy-plugin-citeproc

Use citeproc.js in Eleventy, to process citations and generate bibliographies for your Eleventy projects.

Bibliographic data and styles use the Citation Style Language (CSL) standard. The insertion of citations in files uses the Pandoc citation syntax.

## Features

Process citations and generate bibliographies with filters :

### Sample text

`On writing as a technology of the intellect [@Goody1977, 12].`

See [how to write citations at Pandoc manual](https://pandoc.org/MANUAL.html#citations-in-note-styles).

### Code

**Liquid, Nunjucks**

```html
<main>
    {{ content | references | safe }}
</main>

<footer>
    {{ content | bibliography | safe }}
</footer>
```

**11ty.js**

```js
module.exports = function(content) {
    return `<main>${this.references('content')}</main><footer>${this.bibliography(content)}</footer>`
};
```

### Result

```html
<main>
    On writing as a technology of the intellect (Goody 1977, p. 12).
</main>

<footer>
    <div class="csl-entry">GOODY, Jack, 1977. <i>The Domestication of the Savage Mind</i>. Cambridge : Cambridge University Press. ISBN 978-0-521-21726-2. </div>
</footer>
```

## Installation

### Download

Requires Eleventy 1.0.0 or newer & NodeJs 15 or newer.

```
npm i eleventy-plugin-citeproc
```

### Configuration

You need three files to get citations and bibliographies :

- **Bibliographic data** : `.json` file, containing metadata describing bibliographic references (example further down). Dowloaded from your Zotero public group?
- **Bibliographic style** : `.csl` file, containing formatting rules for citations and bibliographies. Dowloaded from [Zotero CSL styles directory](https://www.zotero.org/styles).
- **Bibliographic localization** : `.xml` file, containing localized bibliographic terms (e.g. publisher, issue…) in the language of your choice. Dowloaded from [CSL project repository](https://github.com/citation-style-language/locales/tree/6b0cb4689127a69852f48608b6d1a879900f418b)

```js
const path = require('path');

const eleventyCiteproc = require("eleventy-plugin-citeproc");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyCiteproc, {
        bibliographicStylePath: path.join(__dirname, 'iso690-author-date-fr-no-abstract.csl'),
        bibliographicLocalizationPath: path.join(__dirname, 'locales-en-GB.xml'),
        bibliographicDataPath: path.join(__dirname, 'bib-data.json')
    });

    return {
        dir: {
            input: "views",
            output: "dist"
        }
    };
};
```

**Bibliographic data file**

The string on `id` property (`goody1977` on below exemple) is the key you need to write on your *content*.

```json
[
    {
        "id": "goody1977",
        "author": [
            {
                "family": "Goody",
                "given": "Jack"
            }
        ],
        "event-place": "Cambridge",
        "ISBN": "978-0-521-21726-2",
        "issued": {
            "date-parts": [
                [
                    1977
                ]
            ]
        },
        "language": "en",
        "number-of-pages": "179",
        "publisher": "Cambridge University Press",
        "publisher-place": "Cambridge",
        "title": "The Domestication of the Savage Mind",
        "type": "book"
    }
]
```

Thanks to [Arthur Perret](https://github.com/infologie) about this documentation.

## Test

```
npm i
npm test
```

See directories `/test` and `/utils`. Add `/utils/**.11ty.js` files to check in `/test/**.js` files content. 