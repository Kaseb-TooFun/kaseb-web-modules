import React from 'react';
import { render } from 'preact';
import { addToKIO } from '../utils';
import Banner from './content-template/Banner';
import Modal from './content-template/Modal';

const run = (id: string, data) => {
	const { template } = data;
	let Component = <Banner id={id} data={data} template="top-banner" />;
	switch (template) {
		case 'modal':
			Component = <Modal id={id} data={data} />;
			break;
		case 'top-banner':
			Component = <Banner id={id} data={data} template="top-banner" />;
			break;
		case 'bottom-banner':
			Component = <Banner id={id} data={data} template="bottom-banner" />;
			break;

		default:
			break;
	}
	if (id == 'preview') {
		addToKIO(`<div class="kio-preview" id="kio-${id}"/>`);
	} else {
		addToKIO(`<div id="kio-${id}"/>`);
	}
	return render(Component, document.getElementById(`kio-${id}`));
};

export default run;
