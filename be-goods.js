import 'source-map-support/register'

import R from 'ramda'
import path from 'path'
import help from 'gulp-help'
import chalk from 'chalk'
import tracer from 'tracer'
import isThere from 'is-there'

export const pkg = require(path.join(process.cwd(), 'package.json'))

export let logger = tracer.console({
  'filters': {'log': chalk.green, 'warn': chalk.yellow, 'error': chalk.red},
  'format': `<${pkg.name} using {{path}}:{{line}}>\n{{message}}\n`
})

function myRequirePath (name, home = '') {
  let place = path.join(home, `node_modules/${name}`)
  let where = path.normalize(`${process.cwd()}/${place}`)
  try {
    // console.log(`Requiring: ${where}`)
    let main = require(path.join(where, 'package.json')).main || 'index.js'
    return path.join(where, main)
  } catch (e) {
    return undefined
  }
}

export function isLocal (name, opts = {}) {
  let o = {}
  o.strict = opts === true || opts.strict || false // opts === true is strict
  let dep = R.has(name)
  let isDependency = dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {})
  let exists = o.strict ? isThere(myRequirePath('gulp')) : true
  return isDependency && exists
}

function prefquireHow (o) {
  o.module = o.module || 'beverage'
  o.locate = o.locate || `node_modules/${o.module}`
  o.dev = o.dev || false
  o.throwOnError = o.throwOnError || true
  o.exitOnError = o.exitOnError || false // uncaught throw will cause exit anyway
  return o
}

export function prefquire (opts = {}) {
  let def = prefquireHow(opts)

  return function (name, opts = {}) {
    let o = prefquireHow(R.merge(def, opts)) // override-able defaults
    let elsewhere = (o.forceLocal || isLocal(name)) ? undefined : o.locate
    try {
      // undefined = local means relative to `process.cwd()` it's expected to be
      // elsewhere is to `locate` it in a default `module`'s dependencies`
      return require(myRequirePath(name, elsewhere))
    } catch (e) {
      let dependency = o.dev ? 'devDependency' : 'dependency'
      let wordLocal = o.forceLocal ? 'local ' : ''
      console.error(chalk.red(`Could not find or require module ${name}!`))
      console.error(`Please install ${name} as a ${wordLocal}${dependency}.`)
      if (o.throwOnError) {
        throw new Error(e)
      }
      if (o.exitOnError) {
        process.exit(1)
      }
    }
  }
}

// TODO: deprecate / refactor?
// Its only value is perhaps:
// 1. being more concise than prefquire setup (just one call, minimum args)
// 2. able to require a module from somewhere without trying locally first
// if kept, refactor it to use prefquire...
export function myRequire (name, home = '') {
  console.warn(chalk.red('Please look at the prefquire function instead.'))
  console.warn('Not sure what the future of myRequire will hold...')
  return require(myRequirePath(name, home))
}

export function isSmth (o, what) {
  if (((o || {}).constructor || {}).name === what) {
    return true
  } else {
    return false
  }
}

export function isGulp (o) {
  return isSmth(o, 'Gulp')
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
