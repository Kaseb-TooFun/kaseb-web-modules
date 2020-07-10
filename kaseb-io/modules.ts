import { addToBody, addCss } from "./utils";
import _ from "lodash";
console.log(
	"%cKaseb%cIO",
	"color:#ffbf00;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000",
	"color:#ff0080;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000"
);

const templates = {
	banner: '<div class="banner"><div class="description"><%= description %></div><a href="#" class="btn"><%= btnText %></a></div>';
}

const siteConfig = window.kasebIO || {};

if (siteConfig.css) {
	addCss(siteConfig.css);
}

if (siteConfig.elements) {
	siteConfig.elements.forEach(element => {
		const { data, template } = element;
		const { condition } = data;
		console.log({ condition, template });
		if (template == 'banner') {
			const compiled = (_.template(templates.banner))(element.data);
			switch (condition) {
				case "wait-5":
					setTimeout(() => {
						addToBody(compiled);
					}, 5000);
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

		}

	});
}
