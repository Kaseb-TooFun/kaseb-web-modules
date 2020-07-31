import axios from 'axios';
import { addCssLink, postMessage } from './modules/utils';
import { enableInspector, disableInspector } from './inspector';
import dispatchBanner from './modules/actions/banner';
import dispatchReaction from './modules/actions/reaction';

console.log(
	'%cKaseb%cIO',
	'color:#ffbf00;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000',
	'color:#ff0080;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000'
);

const config = window.kasebIO || {};

if (!window.kasebIO) {
	window.kasebIO = {};
}

postMessage('kio-loaded');

window.addEventListener('message', (message) => {
	console.log({ messageFromParent: message });
	const { type, payload } = message.data;
	switch (type) {
		case 'set-target-origin':
			window.kasebIO.targetOrigin = message.origin;
			break;

		case 'enable-inspector':
			enableInspector();
			console.log('enable inspector ✅');
			break;

		case 'disable-inspector':
			disableInspector();
			console.log('disable inspector ❌');
			break;

		default:
			break;
	}
});

addCssLink(
	'https://kaseb-module.s3.ir-thr-at1.arvanstorage.com/dist/styles/main.css'
);

const applayReactions = (reactions) => {
	reactions.forEach((reaction) => {
		const value =
			typeof reaction.value == 'string'
				? JSON.parse(reaction.value)
				: reaction.value;
		const { data, type } = value;
		switch (type) {
			case 'banner':
				return dispatchBanner(data);
			case 'action':
				return dispatchReaction(data);

			default:
				break;
		}
	});
};

if (config.reactions) {
	applayReactions(config.reactions);
} else if (config.id) {
	const random = Math.floor(Math.random() * 10000000);
	axios
		.get(
			`https://dev-api.mykaseb.ir/api/v1/websites/${config.id}/configs?random=${random}`
		)
		.then((response) => {
			if (response.status == 200) {
				applayReactions(response.data.configs);
			}
		})
		.catch((err) => console.log(err));
}
