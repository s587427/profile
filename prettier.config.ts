import { type Config } from "prettier"

const config: Config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false, // 用空白，不用 tab 字元

  semi: false, // 分號
  singleQuote: false,
  jsxSingleQuote: false,

  trailingComma: "es5", // 尾逗號
  bracketSpacing: true, // 物件大括號內加空白
  bracketSameLine: false, // JSX 的 > 不跟最後一個 prop 同行

  arrowParens: "always", // 單一參數也加括號
  endOfLine: "lf", // 統一使用 LF 換行,

  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx"],
}

export default config
