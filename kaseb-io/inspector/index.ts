import { finder } from '@medv/finder';
import { postMessage } from '../modules/utils';

const clearClass = () => {
	const items = document.getElementsByClassName('kio-inspector-item');

	for (let index = 0; index < items.length; index++) {
		const el = items[index];
		el.classList.remove('kio-inspector-item');
	}
};

const onClick = (e: MouseEvent) => {
	e.preventDefault();
	const el = e.target as HTMLElement;
	postMessage(
		'select-item',
		finder(el, {
			className: (name) => name != 'kio-inspector-item',
		})
	);
};

const onMouseMove = (e: MouseEvent) => {
	const el = e.target as HTMLElement;
	clearClass();
	el.classList.add('kio-inspector-item');
};

export const enableInspector = () => {
	document.body.classList.add('kio-inspector-active');
	document.addEventListener('click', onClick);
	document.addEventListener('mousemove', onMouseMove);
};

export const disableInspector = () => {
	document.body.classList.remove('kio-inspector-active');
	document.removeEventListener('click', onClick);
	document.removeEventListener('mousemove', onMouseMove);
};
