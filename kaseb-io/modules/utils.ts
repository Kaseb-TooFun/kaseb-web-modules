export const appendToHead = (el) => {
	const head = document.head || document.getElementsByTagName("HEAD")[0];
	head.appendChild(el);
};

const createElementFromHTML = (htmlString) => {
	var div = document.createElement("div");
	div.innerHTML = htmlString.trim();
	return div.firstChild;
};

export const addToBody = (str: string) => {
	const body = document.body || document.getElementsByTagName("BODY")[0];
	body.appendChild(createElementFromHTML(str));
};

export const addToKIO = (str: string) => {
	const body = document.getElementById('kio-app');
	if(body) {
		body.appendChild(createElementFromHTML(str));
	} else {
		addToBody('<div id="kio-app"></div>');
		addToKIO(str);
	}
};

export const addCss = (str: string) => {
	const el = document.createElement("STYLE") as HTMLStyleElement;
	el.innerHTML = str;
	appendToHead(el);
};

export const addCssLink = (href: string) => {
	const el = document.createElement("LINK") as HTMLLinkElement;
	el.href = href;
	el.rel = "stylesheet";
	el.type = "text/css";
	appendToHead(el);
};

export const addJs = (src: string) => {
	const el = document.createElement("SCRIPT") as HTMLScriptElement;
	el.src = src;
	el.type = "text/javascript'";
	appendToHead(el);
};

export const postMessage = (type: string, payload?: any) => {
	parent.postMessage(
		{ type, payload },
		window.kasebIO.targetOrigin || '*'
	);
};
