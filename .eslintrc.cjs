module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
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
		{
			files: '*.d.ts',
			rules: {
				'no-unused-vars': 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
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
				printWidth: 160,
			},
		],
		'vue/multi-word-component-names': [
			'error',
			{
				ignores: ['Index'],
			},
		],
	},
}
