import { addToBody, addCss } from "./utils";
import _ from "lodash";

console.log(
	"%cKaseb%cIO",
	"color:#ffbf00;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000",
	"color:#ff0080;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000"
);

const templates = {
	topBanner:
		'<div class="kio banner top-banner animate__animated animate__bounceInDown"><div class="description"><%= description %></div><a href="#" class="btn"><%= btnText %></a></div>',
	bottomBanner:
		'<div class="kio banner bottom-banner animate__animated animate__bounceInUp"><div class="description"><%= description %></div><a href="#" class="btn"><%= btnText %></a></div>',
};

const siteConfig = window.kasebIO || {};

if (siteConfig.reactions) {
	siteConfig.reactions.forEach((reaction) => {
		const { data, type } = reaction;
		console.log({ reaction });
		if (type == "banner") {
			let template = "";
			if (data.template == "top-banner") {
				template = templates.topBanner;
			} else if (data.template == "bottom-banner") {
				template = templates.bottomBanner;
			}
			const compiled = _.template(template)(reaction.data);
			const { condition } = data;
			switch (condition) {
				case "wait-5":
					setTimeout(() => {
						addToBody(compiled);
					}, 5000);
					break;
				case "wait-10":
					setTimeout(() => {
						addToBody(compiled);
					}, 10000);
					break;
				case "wait-30":
					setTimeout(() => {
						addToBody(compiled);
					}, 30000);
					break;
				case "wait-60":
					setTimeout(() => {
						addToBody(compiled);
					}, 60000);
					break;

				default:
					break;
			}
		} else if (type == "action") {
			switch (data.type) {
				case "hover":
					const item = document.querySelector(data.selector);
					if(item) {
						item.classList.add("animate__animated");
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
		}
	});
}
