import _ from 'lodash';

const run = (id: string, data: any) => {
	const { type } = data;
	switch (type) {
		case 'hover':
			return initOnHover(data);
		case 'click':
			return initOnClick(data);

		default:
			break;
	}
};

const initOnHover = (data: any) => {
	const { selector, destSelector } = data;
	const item = document.querySelector(selector || 'x');
	const destItem = document.querySelector(destSelector || selector || 'x');
	if (item && destItem) {
		onHover(data);
	} else {
		window.setTimeout(initOnHover, 1000);
	}
};

const onHover = (data: any) => {
	const { selector, destSelector, once, effect } = data;
	const item = document.querySelector(selector || 'x');
	const destItem = document.querySelector(destSelector || selector || 'x');
	if (item && destItem) {
		destItem.classList.add('kio-a-animated');
		item.addEventListener(
			'mouseenter',
			() => destItem.classList.add(effect),
			{ once: once === true }
		);
		item.addEventListener(
			'mouseleave',
			() => destItem.classList.remove(effect),
			{ once: once === true }
		);
	}
};

const initOnClick = (data: any) => {
	const { selector, destSelector } = data;
	const item = document.querySelector(selector || 'x');
	const destItem = document.querySelector(destSelector || selector || 'x');
	if (item && destItem) {
		onClick(data);
	} else {
		window.setTimeout(initOnClick, 1000);
	}
};

const onClick = (data: any) => {
	const { selector, destSelector, once, effect } = data;
	const item = document.querySelector(selector || 'x');
	const destItem = document.querySelector(destSelector || selector || 'x');
	if (item && destItem) {
		destItem.classList.add('kio-a-animated');
		item.addEventListener(
			'click',
			() => {
				destItem.classList.add(effect);
				setTimeout(() => destItem.classList.remove(effect), 2000);
			},
			{
				once: once === true,
				passive: true
			}
		);
	}
};

export default run;
