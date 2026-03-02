import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tanstackQuery from "@tanstack/eslint-plugin-query";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "@tanstack/query": tanstackQuery,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Prettier
      "prettier/prettier": "error",
      // Console
      "no-console": "error",
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/button-has-type": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // TypeScript
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "type-imports",
      }],
      // Tanstack Query
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/no-rest-destructuring": "warn",
      "@tanstack/query/stable-query-client": "error",
      // Accesibilidad
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-redundant-roles": "error",
    },
  },
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;