import _ from 'lodash';

const run = (id: string, data) => {
	switch (data.type) {
		case 'hover':
			const item = document.querySelector(data.selector || 'x');
			if (item) {
				item.classList.add('kio-a-animated');
				item.addEventListener('mouseenter', () => {
					item.classList.add(data.effect);
				});
				item.addEventListener('mouseleave', () => {
					item.classList.remove(data.effect);
				});
			}
			break;

		default:
			break;
	}
};

export default run;
