import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    // Files and extensions to validate
    files: ["app/**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: ".",
      },
    },
    plugins: {
      "@typescript-eslint": plugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disables warning for 'any' type usage
      "@typescript-eslint/no-floating-promises": "error", // Triggers an error when there are unhandled floating promises
      "@typescript-eslint/await-thenable": "error", // Triggers an error when 'await' is used with something that's not thenable
      "@typescript-eslint/no-unused-expressions": "error", // Triggers an error when there are unused expressions
      "@typescript-eslint/no-unused-vars": "error", // Triggers an error when there are unused variables
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "variable", format: ["camelCase", "PascalCase"] },
        { selector: "method", format: ["camelCase"] },
        { selector: "class", format: ["PascalCase"] },
      ],
      indent: ["error", 2],
    },
  },
];
