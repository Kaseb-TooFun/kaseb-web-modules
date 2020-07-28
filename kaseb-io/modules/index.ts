import axios from "axios";
import { addToBody, addCssLink } from "./utils";
import dispatchBanner from "./actions/banner";
import dispatchReaction from "./actions/reaction";

console.log(
	"%cKaseb%cIO",
	"color:#ffbf00;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000",
	"color:#ff0080;font-size:4rem;font-weight:bold;text-shadow: 2px 2px #000"
);

const config = window.kasebIO || {};

addCssLink(
	"https://kaseb-module.s3.ir-thr-at1.arvanstorage.com/dist/styles/main.css"
);

addToBody('<div id="kio-app"></div>');

const applayReactions = (reactions) => {
	reactions.forEach((reaction) => {
		const value =
			typeof reaction.value == "string"
				? JSON.parse(reaction.value)
				: reaction.value;
		const { data, type } = value;
		switch (type) {
			case "banner":
				return dispatchBanner(data);
			case "action":
				return dispatchReaction(data);

			default:
				break;
		}
	});
};

if (config.reactions) {
	applayReactions(config.reactions);
} else if (config.url) {
	const random = Math.floor(Math.random() * 10000000);
	axios
		.get(
			`https://dev-api.mykaseb.ir/api/v1/website/configs?websiteUrl=${config.url}&random=${random}`
		)
		.then((response) => {
			if (response.status == 200) {
				applayReactions(response.data.configs);
			}
		})
		.catch((err) => console.log(err));
}
