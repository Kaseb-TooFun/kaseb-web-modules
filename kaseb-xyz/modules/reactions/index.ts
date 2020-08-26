import axios from 'axios';
import { config } from '../utils';
import dispatchBanner from './ContentCard';
import dispatchReaction from './action';

const applayReactions = (items: { id: string; value: string }[]) => {
	items.forEach((item) => {
		const value =
			typeof item.value == 'string' ? JSON.parse(item.value) : item.value;
		const { data, type } = value;
		switch (type) {
			case 'banner':
			case 'modal':
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
			id: '9e1b8d0d-75ff-4995-ad2a-31bdac176923',
			value:
				'{"type":"action","data":{"selector":".fa-instagram","once": true,"destSelector":".avatar","type":"click","effect":"kio-a-bounce"}}'
		},
		{
			id: '9e1b8d0d-75ff-4995-ad2a-31bdac176924',
			value:
				'{"type":"action","data":{"selector":".fa-envelope-o","destSelector":".avatar","type":"hover","effect":"kio-a-wobble"}}'
		},
		{
			id: '9e1b8d0d-75ff-4995-ad2a-31bdac176925',
			value:
				'{"type":"action","data":{"selector":".fa-facebook","type":"hover","effect":"kio-a-wobble"}}'
		},
		{
			id: 'ed792a13-fd66-43b1-9359-0ec37d498823',
			value:
				'{"type":"banner","data":{"name":"on-hover banner","template":"bottom-banner", "fontFamily":"Vazir","bgColor":"#2e4057","isRTL":true,"description":"تقاضا می‌گردد هر گونه ایراد یا کاستی در قلم می‌بینید و یا پیشنهادی برای بهتر شدن آن دارید در قسمت ایشوهای گیت‌هاب و یا از طریق آدرس saber.rastikerdar بر روی Gmail.com در میان بگذارید.","url":"https://hexboy.ir/","btnText":"press me!","condition":"on-hover","sourceSelector": ".avatar","isCloseable":true}}'
		},
		{
			id: 'ed792a13-fd66-43b1-9359-0ec37d498854',
			value:
				'{"type":"banner","data":{"name":"on-click banner","template":"top-banner","description":"hello man","bgColor":"#2e4057","textColor": "#fff","url":"https://hexboy.ir/","btnTextColor": "#2e4057","btnColor":"#fff","btnText":"press me!","condition":"on-click","sourceSelector":".fa-facebook","isCloseable":true}}'
		},
		{
			id: 'ed792a13-fd66-43b1-9359-0ec37d498855',
			value:
				'{"type":"banner","data":{"name":"my modal","template":"modal","title":"test title","description":"hello man","bgColor":"#2e4057","textColor": "#fff","url":"https://hexboy.ir/","btnTextColor": "#2e4057","btnColor":"#fff","btnText":"press me!","condition":"on-click","sourceSelector":".fa-twitter","isCloseable":true}}'
		},
		{
			id: 'ed792a13-fd66-43b1-9359-0ec37d498856',
			value:
				'{"type":"banner","data":{"name":"my idle modal","template":"modal","title":"test title","description":"idle modal","bgColor":"#2e4057","textColor": "#fff","url":"https://hexboy.ir/","btnTextColor": "#2e4057","btnColor":"#fff","btnText":"press me!","condition":"idle-30","sourceSelector":".fa-twitter","isCloseable":true}}'
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
