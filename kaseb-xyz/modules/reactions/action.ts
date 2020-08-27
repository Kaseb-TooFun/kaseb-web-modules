import _ from 'lodash';

const run = (id: string, data: any) => {
	const { type } = data;
	switch (type) {
		case 'hover':
			return initOnHover(id, data);
		case 'click':
			return initOnClick(id, data);

		default:
			break;
	}
};

const initOnHover = (id: string, data: any) => {
	const { sourceSelector, destSelector } = data;
	const item = document.querySelector(sourceSelector || 'x');
	const destItem = document.querySelector(destSelector || sourceSelector || 'x');
	if (item && destItem) {
		onHover(id, data);
	} else {
		window.setTimeout(initOnHover, 1000);
	}
};

const onHover = (id: string, data: any) => {
	const { sourceSelector, destSelector, once, effect } = data;
	const isPreview = id === "preview";
	const item = document.querySelector(sourceSelector || 'x');
	const destItem = document.querySelector(destSelector || sourceSelector || 'x');
	if (item && destItem) {
		destItem.classList.add('kio-a-animated');
		item.addEventListener(
			'mouseenter',
			() => destItem.classList.add(effect),
			{ once: (isPreview || once === true) }
		);
		item.addEventListener(
			'mouseleave',
			() => destItem.classList.remove(effect),
			{ once: (isPreview || once === true) }
		);
	}
};

const initOnClick = (id: string, data: any) => {
	const { sourceSelector, destSelector } = data;
	const item = document.querySelector(sourceSelector || 'x');
	const destItem = document.querySelector(destSelector || sourceSelector || 'x');
	if (item && destItem) {
		onClick(id, data);
	} else {
		window.setTimeout(initOnClick, 1000);
	}
};

const onClick = (id: string, data: any) => {
	const isPreview = id === "preview";
	const { sourceSelector, destSelector, once, effect } = data;
	const item = document.querySelector(sourceSelector || 'x');
	const destItem = document.querySelector(destSelector || sourceSelector || 'x');
	if (item && destItem) {
		destItem.classList.add('kio-a-animated');
		item.addEventListener(
			'click',
			() => {
				destItem.classList.add(effect);
				setTimeout(() => destItem.classList.remove(effect), 2000);
			},
			{
				once: (isPreview || once === true),
				passive: true
			}
		);
	}
};

export default run;
