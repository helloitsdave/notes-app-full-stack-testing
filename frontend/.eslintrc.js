module.exports = {
    "parser": "@typescript-eslint/parser", 
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "globals": {
        React: true,
        "vitest": "readonly",
        "vi": "readonly",
        "process": "readonly",
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-empty-function": "off",
    },
    "settings": {
        "react": {
          "version": "18"
        },
    }
}
