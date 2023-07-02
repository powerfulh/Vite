/* eslint-env node */
require ('@rushstack/eslint-patch/modern-module-resolution');


module.exports = {

  "root": true,

  "env": {
    "node": true,
    "browser": true
  },

  "parserOptions": {

    "ecmaVersion": "latest"

  },

  "plugins": ["prettier"],

  "extends": [

    "plugin:vue/vue3-essential",

    "eslint:recommended",

    "@vue/eslint-config-prettier"

  ],

  "rules": {

    "prettier/prettier": [

      "warn",

      {

        "useTabs": true,

        "tabWidth": 4,

        "endOfLine": "auto",

        "singleQuote": true,

        "semi": false,

        "trailingComma": "none",

        "arrowParens": "avoid",

        "printWidth": 130

      }

    ],

    "vue/multi-word-component-names": [

      "error",

      {

        "ignores": ["Index"]

      }

    ],

    "no-console": "warn"

  },

  "overrides": [

    {

      "files": "**/*.cjs",

      "rules": {

        "prettier/prettier": [

          "warn",

          {

            "tabWidth": 2,

            "singleQuote": true,

            "trailingComma": "none"

          }

        ]

      }

    },

    {

      "files": "App.vue",

      "rules": {

        "no-console": "off"

      }

    }

  ],

  "globals": {

    "globalMode": true,

    "$cookies": true

  }

}