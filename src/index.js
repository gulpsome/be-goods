require('source-map-support').install()

import path from 'path'
import sourcegate from 'sourcegate'
let flaments = require(path.normalize('../src/pollen.json'))

export function pollen(anthers) {
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}

export function pollinateHarp(o) {
  if (!o.harp) return {}
  // infer what pollen is wanted
  let anthers = ['harp']
  if (o.harp.sync) anthers.push('harp-sync')
  anthers.push(o)
  // harp options
  return pollen(anthers)
}
