const showdown = require('showdown');
const fs = require('fs');

const converter = new showdown.Converter();
converter.setOption('completeHTMLDocument', true);
const sourcePaths = fs.readdirSync('src/posts');
const styleTag = '<link rel="stylesheet" type="text/css" href="../../styles/main.css"><link>';

sourcePaths.forEach(path => {
    fs.mkdir(`dist/posts/${path}`, {recursive: true}, (error, _) => {
        if (error) {
            throw new Error();
        }
    });
    fs.readFile(`src/posts/${path}/index.md`, 'utf-8', async (error, data) => {
        if (error) {
            throw new Error();
        }
        let html = converter.makeHtml(data, {completeHTMLDocument: true});
        html = html.replace(/(?<=<meta charset="utf-8">)\n/gi, styleTag);
        fs.writeFile(`dist/posts/${path}/index.html`, html, 'utf-8', (err, data) => {
            if (error) {
                throw new Error();
            }
        })
    });
});