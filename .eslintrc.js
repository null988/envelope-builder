module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "import", "prettier"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier",
    "plugin:import/errors",
    "plugin:import/typescript",
  ],
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "detect",
      flowVersion: "0.53", // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
    "import/resolver": {
      alias: {
        map: [
          ["@", "./reactapp/src"],
          ["@storybook", "./reactapp/.storybook/types"],
        ],
        extensions: [".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: [
    "node_modules/",
    "webapp/",
    "reactapp/static/docs/",
    "te-names/",
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          constructors: "off",
        },
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["variable", "parameter"],
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      // для констант
      {
        selector: "variable",
        modifiers: ["const"],
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "forbid",
      },
      // для react компонентов
      {
        selector: "variable",
        modifiers: ["const"],
        types: ["function"],
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "forbid",
      },
      // для react компонентов в качестве параметра
      {
        selector: "parameter",
        types: ["function"],
        format: ["camelCase", "PascalCase"],
      },
      // булевы переменные
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: [
          "is",
          "should",
          "has",
          "can",
          "did",
          "will",
          "are",
          "would",
          "does",
          "do",
          "got",
          "allow",
        ],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
    ],
    "react/prop-types": 0,
    "react/display-name": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "jest/no-commented-out-tests": "off",
    "arrow-body-style": ["error", "as-needed"],
    curly: "error",
    "dot-notation": "error",
    eqeqeq: ["error", "smart"],
    "guard-for-in": "error",
    "id-blacklist": [
      "error",
      "any",
      "Number",
      "String",
      "Boolean",
      "Undefined",
    ],
    "max-classes-per-file": ["error", 1],
    "no-bitwise": "error",
    "no-caller": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "no-duplicate-imports": 0,
    "no-eval": "error",
    "no-extra-bind": "error",
    "no-invalid-this": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-return-await": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": "error",
    "no-unused-expressions": "error",
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    "no-var": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error",
    "prefer-object-spread": "error",
    "no-param-reassign": ["error"],
    "spaced-comment": "error",
    radix: "error",
    "import/export": 0,
    "import/no-cycle": 2,
    "import/no-duplicates": 2,
    "import/namespace": 0,
    "import/default": 0,
    "import/named": 0,
    "import/no-named-as-default-member": 0,
    "jest/expect-expect": [
      "error",
      { assertFunctionNames: ["expect", "waitApi"] },
    ],
    "prettier/prettier": "off",
  },
  overrides: [
    {
      files: ["*.js", "*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
      },
    },
    {
      files: ["*.spec.*"],
      rules: {
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["*.stories.tsx"],
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
};
