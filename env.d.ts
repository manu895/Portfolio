/// <reference types="vite/client" />

// Support importing SVGs as React components via vite-plugin-svgr
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
