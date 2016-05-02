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

  return function (name) {
    if (isLocal(name)) {
      // local means relative to `process.cwd()`
      return myRequire(name);
    } else {
      // try to `locate` in a default `module`'s dependencies`
      try {
        return myRequire(name, opts.locate);
      } catch (e) {
        logger.error('Please install ' + name + ' as a devDependency.');
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

//# sourceMappingURL=data:application/json;base64,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LE1BQVQsQ0FBaUIsT0FBakIsRUFBMEIsS0FBMUIsRUFBaUM7QUFDdEMsTUFBSSxXQUFXLFFBQVEsU0FBUyxlQUFLLFNBQUwsQ0FBZSxhQUFmLENBQVQsQ0FBbkIsQ0FEa0M7QUFFdEMsTUFBSSxNQUFNLFFBQVEsR0FBUixDQUFZLGtCQUFVO0FBQzlCLFdBQU8sT0FBTyxNQUFQLEtBQWtCLFFBQWxCLEdBQTZCLFNBQVMsTUFBVCxDQUE3QixHQUFnRCxNQUFoRDtBQUR1QixHQUFWLENBQWxCLENBRmtDO0FBS3RDLFNBQU8sMEJBQVcsR0FBWCxDQUFQLENBTHNDO0NBQWpDIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHRyYWNlciBmcm9tICd0cmFjZXInXG5cbmV4cG9ydCBjb25zdCBwa2cgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncGFja2FnZS5qc29uJykpXG5cbmV4cG9ydCBsZXQgbG9nZ2VyID0gdHJhY2VyLmNvbnNvbGUoe1xuICAnZmlsdGVycyc6IHsnbG9nJzogY2hhbGsuZ3JlZW4sICd3YXJuJzogY2hhbGsueWVsbG93LCAnZXJyb3InOiBjaGFsay5yZWR9LFxuICAnZm9ybWF0JzogYDwke3BrZy5uYW1lfSB1c2luZyB7e3BhdGh9fTp7e2xpbmV9fT5cXG57e21lc3NhZ2V9fVxcbmBcbn0pXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2FsIChuYW1lKSB7XG4gIGxldCBkZXAgPSBSLmhhcyhuYW1lKVxuICByZXR1cm4gZGVwKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pIHx8IGRlcChwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IHt9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbXlSZXF1aXJlIChuYW1lLCBob21lID0gJycpIHtcbiAgbGV0IHBsYWNlID0gYCR7aG9tZX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gXG4gIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9LyR7cGxhY2V9YClcbiAgbGV0IG1haW4gPSByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluXG4gIHJldHVybiByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgbWFpbikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXFGbiAob3B0cyA9IHt9KSB7XG4gIG9wdHMubW9kdWxlID0gb3B0cy5tb2R1bGUgfHwgJ2JldmVyYWdlJ1xuICBvcHRzLmxvY2F0ZSA9IG9wdHMubG9jYXRlIHx8IGBub2RlX21vZHVsZXMvJHtvcHRzLm1vZHVsZX1gXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKGlzTG9jYWwobmFtZSkpIHtcbiAgICAgIC8vIGxvY2FsIG1lYW5zIHJlbGF0aXZlIHRvIGBwcm9jZXNzLmN3ZCgpYFxuICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0cnkgdG8gYGxvY2F0ZWAgaW4gYSBkZWZhdWx0IGBtb2R1bGVgJ3MgZGVwZW5kZW5jaWVzYFxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lLCBvcHRzLmxvY2F0ZSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBQbGVhc2UgaW5zdGFsbCAke25hbWV9IGFzIGEgZGV2RGVwZW5kZW5jeS5gKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bCAoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBIZWxwaWZ5IChndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrIChndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ndWxwc29tZS9ndWxwLWhhcnAgYWJvdXQgaG93IHRvIHBvbGxpbmF0ZSBvcHRpb25zLlxuLy8gT3JpZ2luYWxseSB0aGUgZGVmYXVsdHMgd2VyZSBoZXJlIGluIHBvbGxlbi5qc29uIGJ1dCB0aGF0IGZlbHQgd3JvbmcgYW5kIGdvdCBtb3ZlZC5cbi8vIFNpbmNlIHRoZXJlIGFyZSBubyBvdGhlciB1c2UgY2FzZXMgZm9yIHRoaXMgc28gZmFyLCBpdCBkb2Vzbid0IHNlZW0gdmVyeSB1c2VmdWwuXG5leHBvcnQgZnVuY3Rpb24gcG9sbGVuIChhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCdwb2xsZW4uanNvbicpKVxuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cbiJdfQ==