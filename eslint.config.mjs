import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const currentFile = fileURLToPath(import.meta.url);
const compat = new FlatCompat({ baseDirectory: path.dirname(currentFile) });

const config = [
  ...compat.extends("next/core-web-vitals"),
  { ignores: [".next/**", "node_modules/**", "work/**"] },
];

export default config;
