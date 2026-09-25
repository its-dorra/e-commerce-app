import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import next from "eslint-config-next";
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, ...next, ...compat.config({
    extends: ['prettier', 'next/trypscript']
}), {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}]

export default eslintConfig