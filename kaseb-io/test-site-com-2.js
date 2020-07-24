window.kasebIO = window.kasebIO || {
	id: "1d5cbee2-c068-44c7-829e-545dab0f075c",
	reactions: [
		{
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
		{
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
		{
			type: "action",
			data: {
				selector: "#header > ul > li:nth-child(3) > a",
				type: "hover",
				effect: "animate__jello",
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
// })();
