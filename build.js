const path = require('path');
const fs = require('fs');
const version = require('./package.json')['version'];

console.log({ version });

if (!fs.existsSync(path.join(__dirname, `dist/${version}`))) {
	fs.mkdirSync(path.join(__dirname, `dist/${version}`));
}
// move modules.js
fs.renameSync(
	path.join(__dirname, 'dist/modules.js'),
	path.join(__dirname, `dist/${version}/modules.js`)
);

// move style.css
fs.renameSync(
	path.join(__dirname, 'dist/styles/main.css'),
	path.join(__dirname, `dist/${version}/style.css`)
);
