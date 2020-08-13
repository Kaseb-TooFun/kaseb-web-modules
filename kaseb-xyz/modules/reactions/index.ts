import axios from 'axios';
import { config } from '../utils';
import dispatchBanner from './banner';
import dispatchReaction from './action';

const applayReactions = (items: { id: string; value: string }[]) => {
	items.forEach((item) => {
		const value =
			typeof item.value == 'string' ? JSON.parse(item.value) : item.value;
		const { data, type } = value;
		switch (type) {
			case 'banner':
				return dispatchBanner(item.id, data);
			case 'action':
				return dispatchReaction(item.id, data);

			default:
				break;
		}
	});
};

export const previewReaction = (item: any) => {
	return applayReactions([{ id: 'preview', value: item }]);
};

export const initReactions = () => {
	const data = [
		{
			id: '9e1b8d0d-75ff-4995-ad2a-31bdac176924',
			value:
				'{"type":"action","data":{"selector":"h1","type":"hover","effect":"kio-a-wobble"}}'
		},
		{
			id: '9e1b8d0d-75ff-4995-ad2a-31bdac176925',
			value:
				'{"type":"banner","data":{"selector":"h1","type":"hover","effect":"kio-a-wobble"}}'
		},
		{
			id: 'ed792a13-fd66-43b1-9359-0ec37d498821',
			value:
				'{"type":"banner","data":{"name":"top banner","template":"top-banner","description":"hello man","url":"https://hexboy.ir/","btnText":"press me!","condition":"wait-5","isCloseable":true}}'
		},
		{
			id: 'ed792a13-fd66-43b1-9359-0ec37d498823',
			value:
				'{"type":"banner","data":{"name":"top banner","template":"bottom-banner","description":"hello man","url":"https://hexboy.ir/","btnText":"press me!","condition":"wait-10","isCloseable":true}}'
		}
	];
	// return applayReactions(data);
	if (config.id) {
		const baseUrl = process.env.BASE_URL || 'https://api.mykaseb.xyz';
		axios
			.get(`${baseUrl}/api/v1/websites/${config.id}/configs`)
			.then((response) => {
				if (response.status == 200) {
					applayReactions(response.data.configs);
				}
			})
			.catch((err) => console.log(err));
	}
};
