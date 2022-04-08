import { getEntries } from './data'
import { checkNumber } from '../utils'

export async function Paint(callback) {
  const entries = await getEntries('paint')

  const result = Object.assign(
    {},
    ...[].concat(...entries.map(({ name, startTime }) => ({ [name]: checkNumber(startTime) })))
  )

  callback(result)
}
