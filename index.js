import 'source-map-support/register'

import R from 'ramda'
import path from 'path'
import help from 'gulp-help'
import sourcegate from 'sourcegate'
import chalk from 'chalk'
import tracer from 'tracer'

export const pkg = require(path.join(process.cwd(), 'package.json'))

export let logger = tracer.console({
  'filters': {'log': chalk.green, 'warn': chalk.yellow, 'error': chalk.red},
  'format': `<${pkg.name} using {{path}}:{{line}}>\n{{message}}\n`
})

export function isLocal (name) {
  let dep = R.has(name)
  return dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {})
}

export function myRequire (name, home = '') {
  let place = `${home}/node_modules/${name}`
  let where = path.normalize(`${process.cwd()}/${place}`)
  let main = require(path.join(where, 'package.json')).main
  // console.log(`require ${place}`)
  return require(path.join(where, main))
}

export function req (name) {
  if (isLocal(name)) {
    // local means relative to `process.cwd()`
    return myRequire(name)
  } else {
    if (R.not(R.contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      logger.error(`Please install ${name} as a devDependency.`)
    }
    return myRequire(name, 'node_modules/beverage')
  }
}

export function gulpIsHelpful (gulp) {
  return R.is(Object, R.path(['help', 'help'], gulp.tasks))
}

export function gulpHelpify (gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : help(gulp, opts)
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".
export function gulpTask (gulp, name, desc, ...rest) {
  let args = (gulpIsHelpful(gulp)) ? [].concat(name, desc, rest) : [].concat(name, rest)
  return gulp.task(...args)
}

// See https://github.com/gulpsome/gulp-harp about how to pollinate options.
// Originally the defaults were here in pollen.json but that felt wrong and got moved.
// Since there are no other use cases for this so far, it doesn't seem very useful.
export function pollen (anthers, where) {
  let flaments = require(where || path.normalize('pollen.json'))
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}
