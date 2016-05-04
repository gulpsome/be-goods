'use strict';

exports.__esModule = true;
exports.logger = exports.pkg = undefined;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
exports.prefquire = prefquire;
exports.isSmth = isSmth;
exports.isGulp = isGulp;
exports.gulpIsHelpful = gulpIsHelpful;
exports.gulpHelpify = gulpHelpify;
exports.gulpTask = gulpTask;
exports.pollen = pollen;

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpHelp = require('gulp-help');

var _gulpHelp2 = _interopRequireDefault(_gulpHelp);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tracer = require('tracer');

var _tracer2 = _interopRequireDefault(_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var pkg = exports.pkg = require(_path2.default.join(process.cwd(), 'package.json'));

var logger = exports.logger = _tracer2.default.console({
  'filters': { 'log': _chalk2.default.green, 'warn': _chalk2.default.yellow, 'error': _chalk2.default.red },
  'format': '<' + pkg.name + ' using {{path}}:{{line}}>\n{{message}}\n'
});

function isLocal(name) {
  var dep = _ramda2.default.has(name);
  return dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {});
}

function myRequire(name) {
  var home = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var place = home + '/node_modules/' + name;
  var where = _path2.default.normalize(process.cwd() + '/' + place);
  var main = require(_path2.default.join(where, 'package.json')).main || 'index.js';
  return require(_path2.default.join(where, main));
}

function prefquire() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  opts.module = opts.module || 'beverage';
  opts.locate = opts.locate || 'node_modules/' + opts.module;
  opts.dev = opts.dev || false;
  opts.exitOnError = opts.exitOnError || false;

  return function (name) {
    if (isLocal(name)) {
      // local means relative to `process.cwd()`
      return myRequire(name);
    } else {
      // try to `locate` in a default `module`'s dependencies`
      try {
        return myRequire(name, opts.locate);
      } catch (e) {
        var dependency = opts.dev ? 'devDependency' : 'dependency';
        console.log(_chalk2.default.red('Could not find module ' + name + '!'));
        console.log('Please install ' + name + ' as a ' + dependency + '.');
        if (opts.exitOnError) {
          process.exit(1);
        } else {
          throw new Error(e);
        }
      }
    }
  };
}

function isSmth(o, what) {
  if (((o || {}).constructor || {}).name === what) {
    return true;
  } else {
    return false;
  }
}

function isGulp(o) {
  return isSmth(o, 'Gulp');
}

function gulpIsHelpful(gulp) {
  return _ramda2.default.is(Object, _ramda2.default.path(['help', 'help'], gulp.tasks));
}

function gulpHelpify(gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : (0, _gulpHelp2.default)(gulp, opts);
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".
function gulpTask(gulp, name, desc) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var args = gulpIsHelpful(gulp) ? [].concat(name, desc, rest) : [].concat(name, rest);
  return gulp.task.apply(gulp, _toConsumableArray(args));
}

// See https://github.com/gulpsome/gulp-harp about how to pollinate options.
// Originally the defaults were here in pollen.json but that felt wrong and got moved.
// Since there are no other use cases for this so far, it doesn't seem very useful.
function pollen(anthers, where) {
  var flaments = require(where || _path2.default.normalize('pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select; // object assumed
  });
  return (0, _sourcegate2.default)(got);
}

//# sourceMappingURL=data:application/json;base64,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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGhlbHAgZnJvbSAnZ3VscC1oZWxwJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB0cmFjZXIgZnJvbSAndHJhY2VyJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgbGV0IGxvZ2dlciA9IHRyYWNlci5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbCAobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgcmV0dXJuIGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG15UmVxdWlyZSAobmFtZSwgaG9tZSA9ICcnKSB7XG4gIGxldCBwbGFjZSA9IGAke2hvbWV9L25vZGVfbW9kdWxlcy8ke25hbWV9YFxuICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS8ke3BsYWNlfWApXG4gIGxldCBtYWluID0gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpbiB8fCAnaW5kZXguanMnXG4gIHJldHVybiByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgbWFpbikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVmcXVpcmUgKG9wdHMgPSB7fSkge1xuICBvcHRzLm1vZHVsZSA9IG9wdHMubW9kdWxlIHx8ICdiZXZlcmFnZSdcbiAgb3B0cy5sb2NhdGUgPSBvcHRzLmxvY2F0ZSB8fCBgbm9kZV9tb2R1bGVzLyR7b3B0cy5tb2R1bGV9YFxuICBvcHRzLmRldiA9IG9wdHMuZGV2IHx8IGZhbHNlXG4gIG9wdHMuZXhpdE9uRXJyb3IgPSBvcHRzLmV4aXRPbkVycm9yIHx8IGZhbHNlXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKGlzTG9jYWwobmFtZSkpIHtcbiAgICAgIC8vIGxvY2FsIG1lYW5zIHJlbGF0aXZlIHRvIGBwcm9jZXNzLmN3ZCgpYFxuICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0cnkgdG8gYGxvY2F0ZWAgaW4gYSBkZWZhdWx0IGBtb2R1bGVgJ3MgZGVwZW5kZW5jaWVzYFxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lLCBvcHRzLmxvY2F0ZSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbGV0IGRlcGVuZGVuY3kgPSBvcHRzLmRldiA/ICdkZXZEZXBlbmRlbmN5JyA6ICdkZXBlbmRlbmN5J1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5yZWQoYENvdWxkIG5vdCBmaW5kIG1vZHVsZSAke25hbWV9IWApKVxuICAgICAgICBjb25zb2xlLmxvZyhgUGxlYXNlIGluc3RhbGwgJHtuYW1lfSBhcyBhICR7ZGVwZW5kZW5jeX0uYClcbiAgICAgICAgaWYgKG9wdHMuZXhpdE9uRXJyb3IpIHtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTbXRoIChvLCB3aGF0KSB7XG4gIGlmICgoKG8gfHwge30pLmNvbnN0cnVjdG9yIHx8IHt9KS5uYW1lID09PSB3aGF0KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHdWxwIChvKSB7XG4gIHJldHVybiBpc1NtdGgobywgJ0d1bHAnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bCAoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBIZWxwaWZ5IChndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrIChndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ndWxwc29tZS9ndWxwLWhhcnAgYWJvdXQgaG93IHRvIHBvbGxpbmF0ZSBvcHRpb25zLlxuLy8gT3JpZ2luYWxseSB0aGUgZGVmYXVsdHMgd2VyZSBoZXJlIGluIHBvbGxlbi5qc29uIGJ1dCB0aGF0IGZlbHQgd3JvbmcgYW5kIGdvdCBtb3ZlZC5cbi8vIFNpbmNlIHRoZXJlIGFyZSBubyBvdGhlciB1c2UgY2FzZXMgZm9yIHRoaXMgc28gZmFyLCBpdCBkb2Vzbid0IHNlZW0gdmVyeSB1c2VmdWwuXG5leHBvcnQgZnVuY3Rpb24gcG9sbGVuIChhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCdwb2xsZW4uanNvbicpKVxuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cbiJdfQ==