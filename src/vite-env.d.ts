/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.lottie" {
  const content: string
  export default content
}
