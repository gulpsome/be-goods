require('source-map-support').install()

import R from 'ramda'
import path from 'path'
import sourcegate from 'sourcegate'

export const pkg = require(path.join(process.cwd(), 'package.json'))

export function gulpIsHelpful(gulp) {
  return R.is(Object, R.path(['help', 'help'], gulp.tasks))
}

export function pollen(anthers, where) {
  let flaments = require(where || path.normalize('../src/pollen.json'))
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}
