'use strict';

exports.__esModule = true;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
exports.gulpIsHelpful = gulpIsHelpful;
exports.gulpHelpify = gulpHelpify;
exports.gulpTask = gulpTask;
exports.pollen = pollen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

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

var pkg = require(_path2['default'].join(process.cwd(), 'package.json'));

exports.pkg = pkg;

function isLocal(name) {
  var dep = _ramda2['default'].has(name);
  return dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {});
}

function myRequire(name) {
  var where = _path2['default'].normalize(process.cwd() + '/node_modules/' + name);
  return require(_path2['default'].join(where, require(_path2['default'].join(where, 'package.json')).main));
}

var logger = _tracer2['default'].console({
  // NOTE: chalk must be also be a dependency of the module that uses this
  'filters': { 'log': _chalk2['default'].green, 'warn': _chalk2['default'].yellow, 'error': _chalk2['default'].red },
  'format': '<' + pkg.name + ' using {{path}}:{{line}}>\n{{message}}\n'
});

exports.logger = logger;

function gulpIsHelpful(gulp) {
  return _ramda2['default'].is(Object, _ramda2['default'].path(['help', 'help'], gulp.tasks));
}

function gulpHelpify(gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : _gulpHelp2['default'](gulp, opts);
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".

function gulpTask(gulp, name, desc) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var args = gulpIsHelpful(gulp) ? [].concat(name, desc, rest) : [].concat(name, rest);
  return gulp.task.apply(gulp, _toConsumableArray(args));
}

function pollen(anthers, where) {
  var flaments = require(where || _path2['default'].normalize('../src/pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select; // object assumed
  });
  return _sourcegate2['default'](got);
}

//# sourceMappingURL=data:application/json;base64,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ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHRyYWNlciBmcm9tICd0cmFjZXInXG5cbmV4cG9ydCBjb25zdCBwa2cgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncGFja2FnZS5qc29uJykpXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2FsKG5hbWUpIHtcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIHJldHVybiBkZXAocGtnLmRlcGVuZGVuY2llcyB8fCB7fSkgfHwgZGVwKHBrZy5kZXZEZXBlbmRlbmNpZXMgfHwge30pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBteVJlcXVpcmUobmFtZSkge1xuICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS9ub2RlX21vZHVsZXMvJHtuYW1lfWApXG4gIHJldHVybiByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpbikpXG59XG5cbmV4cG9ydCBsZXQgbG9nZ2VyID0gdHJhY2VyLmNvbnNvbGUoe1xuICAvLyBOT1RFOiBjaGFsayBtdXN0IGJlIGFsc28gYmUgYSBkZXBlbmRlbmN5IG9mIHRoZSBtb2R1bGUgdGhhdCB1c2VzIHRoaXNcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bChndWxwKSB7XG4gIHJldHVybiBSLmlzKE9iamVjdCwgUi5wYXRoKFsnaGVscCcsICdoZWxwJ10sIGd1bHAudGFza3MpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscEhlbHBpZnkoZ3VscCwgb3B0cykge1xuICByZXR1cm4gZ3VscElzSGVscGZ1bChndWxwKSA/IGd1bHAgOiBoZWxwKGd1bHAsIG9wdHMpXG59XG5cbi8vIEhlbHBmdWwgdGFzayBjcmVhdGlvbi4gIFRoZSBnaXZlbiBkZXNjIGlzIGRpc2NhcmRlZCBpZiBndWxwIGlzbid0IGd1bHAtaGVscCBcImhlbHBmdWxcIi5cbmV4cG9ydCBmdW5jdGlvbiBndWxwVGFzayhndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbihhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCcuLi9zcmMvcG9sbGVuLmpzb24nKSlcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=