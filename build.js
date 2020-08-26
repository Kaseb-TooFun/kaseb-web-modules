const path = require('path');
const fs = require('fs');
const del = require('del');
const version = require('./package.json')['version'];

console.log({ version });

fs.renameSync(
	path.join(__dirname, 'dist/build'),
	path.join(__dirname, `dist/${version}`)
);

// move style.css & fix fonts relative path
const style = fs.readFileSync(`dist/${version}/styles/main.css`).toString();
fs.writeFileSync(
	`dist/${version}/style.css`,
	style.replace(/url\(\//g, 'url(')
);

// remove style dir
del.sync(`dist/${version}/styles`);
