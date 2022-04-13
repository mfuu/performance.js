import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
const packageJson = require('./package.json')
const version = packageJson.version
const homepage = packageJson.homepage

const banner = `
/*!
 * performance v${version}
 * open source under the MIT license
 * ${homepage}
 */
`

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/performance.js',
      name: 'performance',
      sourcemap: false,
      banner: banner.replace(/\n/, '')
    },
    plugins: [
      babel(),
      resolve(),
      commonJs()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/performance.min.js',
      name: 'performance',
      sourcemap: false,
      banner: banner.replace(/\n/, '')
    },
    plugins: [
      babel(),
      uglify(),
      resolve(),
      commonJs()
    ]
  }
]