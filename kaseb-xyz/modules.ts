import { config } from './modules/utils';
import { initReactions } from './modules/reactions';
import { initMessages } from './modules/messages';

const script = Array.from(document.scripts)
	.map((item) => item.src)
	.find((src) => (src || '').indexOf('kio.js?id=') != -1);
if (script) {
	config.id = script.replace(/(.*)id=/, '');

	console.log(
		'%cKaseb%c.%cxyz',
		'color:#ffbf00;font-size:3rem;font-weight:bold;text-shadow: 2px 2px #000',
		'color:#000;font-size:2rem;font-weight:bold;',
		'color:#ff0080;font-size:2rem;font-weight:bold;text-shadow: 1px 1px #000'
	);

	initReactions();
	initMessages();
}
