import { config, clearKIO } from './utils';
import { enableInspector, disableInspector } from '../inspector';
import { previewReaction } from '../modules/reactions';

export const postMessage = (type: string, payload?: any) => {
	parent.postMessage({ type, payload }, config.targetOrigin || '*');
};

const onReciveMessage = (message: MessageEvent) => {
	const { type, payload } = message.data;
	if (process.env.NODE_ENV !== 'production' && type) {
		console.log('messageFromParent', { type, payload });
	}

	switch (type) {
		case 'set-target-origin':
			return (config.targetOrigin = message.origin);

		case 'get-location':
			return postMessage('set-location', document.location.href);

		case 'enable-inspector':
			return enableInspector();

		case 'disable-inspector':
			return disableInspector();

		case 'preview-reaction':
			clearKIO();
			return previewReaction(payload);

		default:
			break;
	}
};

export const initMessages = () => {
	postMessage('kio-loaded');
	window.addEventListener('message', onReciveMessage);
};
