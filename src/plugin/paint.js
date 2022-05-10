import { getEntries } from './data.js'
import { checkNumber } from '../utils.js'

export async function Paint() {
  const entries = await getEntries('paint')

  const result = Object.assign(
    {},
    ...[].concat(...entries.map(({ name, startTime }) => ({ [name]: checkNumber(startTime) })))
  )

  return result
}
