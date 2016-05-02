'use strict';

exports.__esModule = true;
exports.logger = exports.pkg = undefined;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
exports.reqFn = reqFn;
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
  var main = require(_path2.default.join(where, 'package.json')).main;
  return require(_path2.default.join(where, main));
}

function reqFn() {
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

//# sourceMappingURL=data:application/json;base64,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QUF0QixHQUE2Qix3QkFBSyxJQUFMLEVBQVcsSUFBWCxDQUFwQztBQUNEOzs7QUFHTSxTQUFTLFFBQVQsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBOEM7QUFBQSxvQ0FBTixJQUFNO0FBQU4sUUFBTTtBQUFBOztBQUNuRCxNQUFJLE9BQVEsY0FBYyxJQUFkLENBQUQsR0FBd0IsR0FBRyxNQUFILENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQixJQUF0QixDQUF4QixHQUFzRCxHQUFHLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLENBQWpFO0FBQ0EsU0FBTyxLQUFLLElBQUwsZ0NBQWEsSUFBYixFQUFQO0FBQ0Q7Ozs7O0FBS00sU0FBUyxNQUFULENBQWlCLE9BQWpCLEVBQTBCLEtBQTFCLEVBQWlDO0FBQ3RDLE1BQUksV0FBVyxRQUFRLFNBQVMsZUFBSyxTQUFMLENBQWUsYUFBZixDQUFqQixDQUFmO0FBQ0EsTUFBSSxNQUFNLFFBQVEsR0FBUixDQUFZLGtCQUFVO0FBQzlCLFdBQU8sT0FBTyxNQUFQLEtBQWtCLFFBQWxCLEdBQTZCLFNBQVMsTUFBVCxDQUE3QixHQUFnRCxNQUF2RCxDO0FBQ0QsR0FGUyxDQUFWO0FBR0EsU0FBTywwQkFBVyxHQUFYLENBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGhlbHAgZnJvbSAnZ3VscC1oZWxwJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB0cmFjZXIgZnJvbSAndHJhY2VyJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgbGV0IGxvZ2dlciA9IHRyYWNlci5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbCAobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgcmV0dXJuIGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG15UmVxdWlyZSAobmFtZSwgaG9tZSA9ICcnKSB7XG4gIGxldCBwbGFjZSA9IGAke2hvbWV9L25vZGVfbW9kdWxlcy8ke25hbWV9YFxuICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS8ke3BsYWNlfWApXG4gIGxldCBtYWluID0gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpblxuICByZXR1cm4gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsIG1haW4pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVxRm4gKG9wdHMgPSB7fSkge1xuICBvcHRzLm1vZHVsZSA9IG9wdHMubW9kdWxlIHx8ICdiZXZlcmFnZSdcbiAgb3B0cy5sb2NhdGUgPSBvcHRzLmxvY2F0ZSB8fCBgbm9kZV9tb2R1bGVzLyR7b3B0cy5tb2R1bGV9YFxuICBvcHRzLmRldiA9IG9wdHMuZGV2IHx8IGZhbHNlXG4gIG9wdHMuZXhpdE9uRXJyb3IgPSBvcHRzLmV4aXRPbkVycm9yIHx8IGZhbHNlXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKGlzTG9jYWwobmFtZSkpIHtcbiAgICAgIC8vIGxvY2FsIG1lYW5zIHJlbGF0aXZlIHRvIGBwcm9jZXNzLmN3ZCgpYFxuICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0cnkgdG8gYGxvY2F0ZWAgaW4gYSBkZWZhdWx0IGBtb2R1bGVgJ3MgZGVwZW5kZW5jaWVzYFxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lLCBvcHRzLmxvY2F0ZSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbGV0IGRlcGVuZGVuY3kgPSBvcHRzLmRldiA/ICdkZXZEZXBlbmRlbmN5JyA6ICdkZXBlbmRlbmN5J1xuICAgICAgICBjb25zb2xlLmxvZyhjaGFsay5yZWQoYENvdWxkIG5vdCBmaW5kIG1vZHVsZSAke25hbWV9IWApKVxuICAgICAgICBjb25zb2xlLmxvZyhgUGxlYXNlIGluc3RhbGwgJHtuYW1lfSBhcyBhICR7ZGVwZW5kZW5jeX0uYClcbiAgICAgICAgaWYgKG9wdHMuZXhpdE9uRXJyb3IpIHtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bCAoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBIZWxwaWZ5IChndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrIChndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ndWxwc29tZS9ndWxwLWhhcnAgYWJvdXQgaG93IHRvIHBvbGxpbmF0ZSBvcHRpb25zLlxuLy8gT3JpZ2luYWxseSB0aGUgZGVmYXVsdHMgd2VyZSBoZXJlIGluIHBvbGxlbi5qc29uIGJ1dCB0aGF0IGZlbHQgd3JvbmcgYW5kIGdvdCBtb3ZlZC5cbi8vIFNpbmNlIHRoZXJlIGFyZSBubyBvdGhlciB1c2UgY2FzZXMgZm9yIHRoaXMgc28gZmFyLCBpdCBkb2Vzbid0IHNlZW0gdmVyeSB1c2VmdWwuXG5leHBvcnQgZnVuY3Rpb24gcG9sbGVuIChhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCdwb2xsZW4uanNvbicpKVxuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cbiJdfQ==