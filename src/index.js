require('source-map-support').install()

import R from 'ramda'
import path from 'path'
import help from 'gulp-help'
import sourcegate from 'sourcegate'

if (module.parent) {
  global.console.warn(`<${module.parent.filename}> Please use the be-goods module, stamina will be repurposed.`)
}

export const pkg = require(path.join(process.cwd(), 'package.json'))

export function gulpIsHelpful(gulp) {
  return R.is(Object, R.path(['help', 'help'], gulp.tasks))
}

export function gulpHelpify(gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : help(gulp, opts)
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".
export function gulpTask(gulp, name, desc, ...rest) {
  let args = (gulpIsHelpful(gulp)) ? [].concat(name, desc, rest) : [].concat(name, rest)
  return gulp.task(...args)
}

export function pollen(anthers, where) {
  let flaments = require(where || path.normalize('../src/pollen.json'))
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}
