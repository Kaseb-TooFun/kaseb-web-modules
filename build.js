const path = require('path');
const fs = require('fs');
const version = require('./package.json')['version'];

console.log({ version });

fs.renameSync(path.join(__dirname, 'dist'), path.join(__dirname, version));
fs.mkdirSync(path.join(__dirname, 'dist'));
fs.renameSync(
	path.join(__dirname, version),
	path.join(__dirname, `dist/${version}`)
);

// move style.css
fs.renameSync(
	path.join(__dirname, `dist/${version}/styles/main.css`),
	path.join(__dirname, `dist/${version}/style.css`)
);

// remove style dir
fs.rmdirSync(path.join(__dirname, `dist/${version}/styles`));
