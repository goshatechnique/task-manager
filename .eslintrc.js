module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
	parserOptions: {
		parser: "@babel/eslint-parser",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
				useTabs: true,
				tabWidth: 4,
				singleQuote: false,
				semi: true,
				printWidth: 120,
				vueIndentScriptAndStyle: false,
			},
		],
		"vue/script-indent": "off",
	},
};
