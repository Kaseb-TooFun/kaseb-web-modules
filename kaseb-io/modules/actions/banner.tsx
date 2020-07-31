import React from 'react';
import { render } from 'preact';
import { addToKIO } from '../utils';
import Banner from './banner/Banner';

const run = (data) => {
	const id = `kio-banner-${data.id || Math.floor(Math.random() * 100000)}`;
	let position = null;
	if (data.template == 'top-banner') {
		position = 'top';
	} else if (data.template == 'bottom-banner') {
		position = 'bottom';
	}
	addToKIO(`<div id="${id}"/>`);
	return render(
		<Banner
			description={data.description}
			btnText={data.btnText}
			condition={data.condition}
			isCloseable={data.isCloseable == true}
			position={position}
		/>,
		document.getElementById(id)
	);
};

export default run;
