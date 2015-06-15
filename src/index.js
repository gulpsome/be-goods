require('source-map-support').install()

import R from 'ramda'
import path from 'path'
import sourcegate from 'sourcegate'

export const pkg = require(path.join(process.cwd(), 'package.json'))

export function gulpIsHelpful(gulp) {
  return R.is(Object, R.path(['help', 'help'], gulp.tasks))
}

// Helpful task creation.  The given help is discarded if gulp isn't gulp-help "helpful".
export function gulpTask(gulp, name, help, ...rest) {
  let args = (gulpIsHelpful(gulp)) ? [].concat(name, help, rest) : [].concat(name, rest)
  return gulp.task.apply(gulp, args)
}

export function pollen(anthers, where) {
  let flaments = require(where || path.normalize('../src/pollen.json'))
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}
