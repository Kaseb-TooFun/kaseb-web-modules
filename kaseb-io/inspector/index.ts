import { finder } from '@medv/finder';
import { postMessage } from '../modules/utils';

const clearClass = () => {
	const items = document.getElementsByClassName('kio-inpector-item');

	for (let index = 0; index < items.length; index++) {
		const el = items[index];
		el.classList.remove('kio-inpector-item');
	}
};

const onClick = (e: MouseEvent) => {
	e.preventDefault();
	const el = e.target as HTMLElement;
	postMessage(
		'select-item',
		finder(el, {
			className: (name) => name != 'kio-inpector-item',
		})
	);
};

const onMouseMove = (e: MouseEvent) => {
	const el = e.target as HTMLElement;
	clearClass();
	el.classList.add('kio-inpector-item');
};

export const enableInspector = () => {
	document.body.classList.add('kio-inpector-active');
	document.addEventListener('click', onClick);
	document.addEventListener('mousemove', onMouseMove);
};

export const disableInspector = () => {
	document.body.classList.remove('kio-inpector-active');
	document.removeEventListener('click', onClick);
	document.removeEventListener('mousemove', onMouseMove);
};
