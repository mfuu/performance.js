import { getEntries } from './data'

import { checkResourceType, checkNumber } from '../utils'

const RESOURCES = 'resources'

export async function Resources(callback) {
  const resources = await getEntries('resource')
  if (!resources.length) return

  const result = {}
  resources.forEach((item) => {
    const type = checkResourceType(item.name)
    add(result, type, 'count', 1)
    add(result, type, 'duration', item.duration)
    add(result, type, 'size', item.decodedBodySize)
    result[`${RESOURCES}_${type}_source`] = result[`${RESOURCES}_${type}_source`] || []
    result[`${RESOURCES}_${type}_source`].push(item)
  })
  callback(result)
}

function add(result, type, key, value) {
  const field = [RESOURCES, type, key].join('_')

  result[field] = result[field] || 0
  result[field] += checkNumber(value)
}
