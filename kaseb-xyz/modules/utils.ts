export const config = {
	id: '',
	targetOrigin: '*',
	ignoreSavedReactions: false
};

const db = window.localStorage;

export const storage = {
	setItem: (key: string, value: Object | string | number) => {
		db.setItem(`kio-${key}`, JSON.stringify(value));
	},
	getItem: (key: string) => {
		const value = db.getItem(`kio-${key}`);
		return value ? JSON.parse(value) : null;
	},
	removeItem: (key: string) => db.removeItem(`kio-${key}`)
};

export const appendToHead = (el) => {
	const head = document.head || document.getElementsByTagName('HEAD')[0];
	head.appendChild(el);
};

const createElementFromHTML = (htmlString) => {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
};

export const addToBody = (str: string) => {
	const body = document.body || document.getElementsByTagName('BODY')[0];
	body.appendChild(createElementFromHTML(str));
};

export const addToKIO = (str: string) => {
	const body = document.getElementById('kio-app');
	if (body) {
		body.appendChild(createElementFromHTML(str));
	} else {
		addToBody('<div id="kio-app"></div>');
		addToKIO(str);
	}
};

export const clearKIO = () => {
	const body = document.getElementById('kio-app');
	if (body) {
		body.innerHTML = '';
	}
};

export const addCss = (str: string) => {
	const el = document.createElement('STYLE') as HTMLStyleElement;
	el.innerHTML = str;
	appendToHead(el);
};

export const addCssLink = (href: string) => {
	const el = document.createElement('LINK') as HTMLLinkElement;
	el.href = href;
	el.rel = 'stylesheet';
	el.type = 'text/css';
	appendToHead(el);
};

export const addJs = (src: string) => {
	const el = document.createElement('SCRIPT') as HTMLScriptElement;
	el.src = src;
	el.type = "text/javascript'";
	appendToHead(el);
};

export const setIdleTimeout = (
	callback: (...args: any[]) => void,
	ms: number,
	once: boolean = true
) => {
	const DOCUMENT_EVENTS = [
		'mousemove',
		'mousedown',
		'click',
		'touchmove',
		'touchstart',
		'touchend',
		'keydown',
		'keypress'
	];
	const WINDOW_EVENTS = ['scroll', 'load'];
	let timeoutHandler = 0;
	const resetTimer = () => {
		clearTimeout(timeoutHandler);
		if (once) {
			timeoutHandler = window.setTimeout(runOnce, ms);
		} else {
			timeoutHandler = window.setTimeout(callback, ms);
		}
	};

	resetTimer();

	const runOnce = () => {
		callback();
		deactivate();
	};

	const deactivate = () => {
		DOCUMENT_EVENTS.forEach((eventType) =>
			document.removeEventListener(eventType, resetTimer)
		);
		WINDOW_EVENTS.forEach((eventType) =>
			window.removeEventListener(eventType, resetTimer)
		);
	};

	DOCUMENT_EVENTS.forEach((eventType) =>
		document.addEventListener(eventType, resetTimer)
	);
	WINDOW_EVENTS.forEach((eventType) =>
		window.addEventListener(eventType, resetTimer)
	);
};

export const uuid4 = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});

export const xhr = (
	method: 'GET' | 'POST',
	path: string,
	data?: object
) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(method, path);
		xhr.onload = function () {
			if (this.status == 200) {
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function () {
			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		if (data) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
		} else {
			xhr.send();
		}
	});
};
