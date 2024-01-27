module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', '@vue/eslint-config-prettier'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['vue', 'prettier'],
	rules: {
		'prettier/prettier': [
			'warn',
			{
				useTabs: true,
				tabWidth: 4,
				endOfLine: 'auto',
				singleQuote: true,
				semi: false,
				arrowParens: 'avoid',
				printWidth: 130,
			},
		],
	},
}
