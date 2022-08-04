import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import typescript from '@rollup/plugin-typescript';

const inputSrc = [
  ["./src/index.ts", "es"],
  ["./src/index.ts", "cjs"]
]

const extensions = [".mjs", ".json", ".ts"]

export default inputSrc
  .map(([input, format]) => {
    return {
      input,
      output: {
        dir: `lib/${format}`,
        format,
        exports: "auto"
      },
      preserveModules: true,
      plugins: [
        nodeResolve({
          extensions
        }),
        // https://velog.io/@peterkimzz/rollup-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8
        // CommonJS 로 작성된 모듈들을 ES6 바꾸어서 rollup이 해석할 수 있게 도와줍니다.
        commonjs({
          extensions: [...extensions, ".js"]
        }),
        typescript({
          outDir: `lib/${format}`,
        })
      ]
    }
  })
