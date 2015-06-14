require('source-map-support').install()

import path from 'path'
import sourcegate from 'sourcegate'

export function pollen(anthers, where) {
  let flaments = require(where || path.normalize('../src/pollen.json'))
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}
