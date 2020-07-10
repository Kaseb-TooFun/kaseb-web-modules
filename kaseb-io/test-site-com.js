window.kasebIO = window.kasebIO || {
	key: "asdasd234234",
	css: `
	.banner {background-color: #ffbf00; position: fixed; left:0; right: 0; top: 0; text-align: center; padding-top: 1rem; padding-bottom: 1rem}
	.btn { display: inline-block; margin-top: 10px; padding: 10px; border-radius: 5px; color: #fff; background-color: #0080ff; text-decoration: none}
	`,
	elements: [
		{
			template: "banner",
			data: {
				description: "test dessssss",
				btnText: "tesXXXXX",
				condition: "wait-30",
				isCloseable: true,
				url: '/about'
			},
		},
	],
};

(() => {
	var bootstrap = function (t) {
		var script = document.createElement("script");
		var head = document.head || document.getElementsByTagName("head")[0];
		script.async = 1;
		script.src = t;
		head.appendChild(script);
	};
	// bootstrap('./kaseb-io/modules-v1.js');
})();
