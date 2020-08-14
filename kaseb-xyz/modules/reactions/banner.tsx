import React from 'react';
import { render } from 'preact';
import { addToKIO } from '../utils';
import Banner from './banner/Banner';

const run = (id: string, data) => {
	let position = null;
	if (data.template == 'top-banner') {
		position = 'top';
	} else if (data.template == 'bottom-banner') {
		position = 'bottom';
	}
	if (id == 'preview') {
		addToKIO(`<div class="kio-preview" id="kio-banner-${id}"/>`);
	} else {
		addToKIO(`<div id="kio-banner-${id}"/>`);
	}
	return render(
		<Banner id={id} data={data} position={position} />,
		document.getElementById(`kio-banner-${id}`)
	);
};

export default run;
