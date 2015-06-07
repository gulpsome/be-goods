require('source-map-support').install()
let flaments = require('./pollen.json')
import sourcegate from 'sourcegate'

export function pollen(anthers) {
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}
