window.kasebIO = {
	id: "1d5cbee2-c068-44c7-829e-545dab0f075c",
	url: "www.hexboy.ir",
	reactions: [
		{
			id: "1",
			value: {
				type: "banner",
				data: {
					template: "top-banner",
					description: "welcome to my site",
					btnText: "Click On Me",
					condition: "wait-5",
					isCloseable: true,
					url: "/about",
				},
			},
		},
		{
			id: "2",
			value: {
				type: "banner",
				data: {
					template: "bottom-banner",
					description: "welcome to my site",
					btnText: "Click On Me",
					condition: "wait-10",
					isCloseable: true,
					url: "/about",
				},
			},
		},
		{
			id: "3",
			value: {
				type: "action",
				data: {
					selector: "#header > span",
					type: "hover",
					effect: "animate__jello",
				},
			},
		},
	],
};

// (() => {
// 	var bootstrap = function (t) {
// 		var script = document.createElement("script");
// 		var head = document.head || document.getElementsByTagName("head")[0];
// 		script.async = 1;
// 		script.src = t;
// 		head.appendChild(script);
// 	};
// 	bootstrap('./kaseb-io/modules-v1.js');
// 	bootstrap('https://kaseb-module.s3.ir-thr-at1.arvanstorage.com/dist/modules.js');
// })();
