module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "react-hooks",
    "jest"
  ],
  "rules": {
    "jest/expect-expect": 0,
    "no-console": [
      "error",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": 0,
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-restricted-syntax": [
      "error",
      {
        "selector": "ExportDefaultDeclaration",
        "message": "Restricted default export, prefer named exports!"
      }
    ],
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};