export const appendToHead = (el) => {
	const head = document.head || document.getElementsByTagName("HEAD")[0];
	head.appendChild(el);
}

export const addToBody = (str: string) => {
	const body = document.body || document.getElementsByTagName("BODY")[0];
	body.innerHTML += str;
}

export const addCss = (str: string) => {
	const el: HTMLStyleElement = document.createElement("STYLE");
	el.innerHTML = str;
	appendToHead(el);
};

export const addCssLink = (href: string) => {
	const el: HTMLLinkElement = document.createElement("LINK");
	el.href = href;
	el.rel = "stylesheet";
	el.type = "text/css";
	appendToHead(el);
};

export const addJs = (src: string) => {
	const el: HTMLScriptElement = document.createElement("SCRIPT");
	el.src = src;
	el.type = "text/javascript'";
	appendToHead(el);
};
