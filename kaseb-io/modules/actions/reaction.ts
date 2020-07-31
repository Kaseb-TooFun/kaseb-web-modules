import _ from 'lodash';
import { addToBody } from '../utils';

const templates = {
	topBanner:
		'<div class="kio banner top-banner animate__animated animate__bounceInDown"><div class="description"><%= description %></div><a href="#" class="btn"><%= btnText %></a></div>',
	bottomBanner:
		'<div class="kio banner bottom-banner animate__animated animate__bounceInUp"><div class="description"><%= description %></div><a href="#" class="btn"><%= btnText %></a></div>'
};

const run = (data) => {
	switch (data.type) {
		case 'hover':
			const item = document.querySelector(data.selector || 'x');
			if (item) {
				item.classList.add('animate__animated');
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
