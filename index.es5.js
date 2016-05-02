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

//# sourceMappingURL=data:application/json;base64,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QUF0QixHQUE2Qix3QkFBSyxJQUFMLEVBQVcsSUFBWCxDQUE3QixDQURnQztDQUFsQzs7O0FBS0EsU0FBUyxRQUFULENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQThDO29DQUFOOztHQUFNOztBQUNuRCxNQUFJLE9BQU8sYUFBQyxDQUFjLElBQWQsQ0FBRCxHQUF3QixHQUFHLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLElBQXRCLENBQXhCLEdBQXNELEdBQUcsTUFBSCxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsQ0FBdEQsQ0FEd0M7QUFFbkQsU0FBTyxLQUFLLElBQUwsZ0NBQWEsS0FBYixDQUFQLENBRm1EO0NBQTlDOzs7OztBQVFBLFNBQVMsTUFBVCxDQUFpQixPQUFqQixFQUEwQixLQUExQixFQUFpQztBQUN0QyxNQUFJLFdBQVcsUUFBUSxTQUFTLGVBQUssU0FBTCxDQUFlLGFBQWYsQ0FBVCxDQUFuQixDQURrQztBQUV0QyxNQUFJLE1BQU0sUUFBUSxHQUFSLENBQVksa0JBQVU7QUFDOUIsV0FBTyxPQUFPLE1BQVAsS0FBa0IsUUFBbEIsR0FBNkIsU0FBUyxNQUFULENBQTdCLEdBQWdELE1BQWhEO0FBRHVCLEdBQVYsQ0FBbEIsQ0FGa0M7QUFLdEMsU0FBTywwQkFBVyxHQUFYLENBQVAsQ0FMc0M7Q0FBakMiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBoZWxwIGZyb20gJ2d1bHAtaGVscCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgdHJhY2VyIGZyb20gJ3RyYWNlcidcblxuZXhwb3J0IGNvbnN0IHBrZyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKSlcblxuZXhwb3J0IGxldCBsb2dnZXIgPSB0cmFjZXIuY29uc29sZSh7XG4gICdmaWx0ZXJzJzogeydsb2cnOiBjaGFsay5ncmVlbiwgJ3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICdmb3JtYXQnOiBgPCR7cGtnLm5hbWV9IHVzaW5nIHt7cGF0aH19Ont7bGluZX19Plxcbnt7bWVzc2FnZX19XFxuYFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9jYWwgKG5hbWUpIHtcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIHJldHVybiBkZXAocGtnLmRlcGVuZGVuY2llcyB8fCB7fSkgfHwgZGVwKHBrZy5kZXZEZXBlbmRlbmNpZXMgfHwge30pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBteVJlcXVpcmUgKG5hbWUsIGhvbWUgPSAnJykge1xuICBsZXQgcGxhY2UgPSBgJHtob21lfS9ub2RlX21vZHVsZXMvJHtuYW1lfWBcbiAgbGV0IHdoZXJlID0gcGF0aC5ub3JtYWxpemUoYCR7cHJvY2Vzcy5jd2QoKX0vJHtwbGFjZX1gKVxuICBsZXQgbWFpbiA9IHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCAncGFja2FnZS5qc29uJykpLm1haW5cbiAgcmV0dXJuIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCBtYWluKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcUZuIChvcHRzID0ge30pIHtcbiAgb3B0cy5tb2R1bGUgPSBvcHRzLm1vZHVsZSB8fCAnYmV2ZXJhZ2UnXG4gIG9wdHMubG9jYXRlID0gb3B0cy5sb2NhdGUgfHwgYG5vZGVfbW9kdWxlcy8ke29wdHMubW9kdWxlfWBcbiAgb3B0cy5kZXYgPSBvcHRzLmRldiB8fCBmYWxzZVxuICBvcHRzLmV4aXRPbkVycm9yID0gb3B0cy5leGl0T25FcnJvciB8fCBmYWxzZVxuXG4gIHJldHVybiBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChpc0xvY2FsKG5hbWUpKSB7XG4gICAgICAvLyBsb2NhbCBtZWFucyByZWxhdGl2ZSB0byBgcHJvY2Vzcy5jd2QoKWBcbiAgICAgIHJldHVybiBteVJlcXVpcmUobmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdHJ5IHRvIGBsb2NhdGVgIGluIGEgZGVmYXVsdCBgbW9kdWxlYCdzIGRlcGVuZGVuY2llc2BcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBteVJlcXVpcmUobmFtZSwgb3B0cy5sb2NhdGUpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxldCBkZXBlbmRlbmN5ID0gb3B0cy5kZXYgPyAnZGV2RGVwZW5kZW5jeScgOiAnZGVwZW5kZW5jeSdcbiAgICAgICAgY29uc29sZS5sb2coY2hhbGsucmVkKGBDb3VsZCBub3QgZmluZCBtb2R1bGUgJHtuYW1lfSFgKSlcbiAgICAgICAgY29uc29sZS5sb2coYFBsZWFzZSBpbnN0YWxsICR7bmFtZX0gYXMgYSAke2RlcGVuZGVuY3l9LmApXG4gICAgICAgIGlmIChvcHRzLmV4aXRPbkVycm9yKSB7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBJc0hlbHBmdWwgKGd1bHApIHtcbiAgcmV0dXJuIFIuaXMoT2JqZWN0LCBSLnBhdGgoWydoZWxwJywgJ2hlbHAnXSwgZ3VscC50YXNrcykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSGVscGlmeSAoZ3VscCwgb3B0cykge1xuICByZXR1cm4gZ3VscElzSGVscGZ1bChndWxwKSA/IGd1bHAgOiBoZWxwKGd1bHAsIG9wdHMpXG59XG5cbi8vIEhlbHBmdWwgdGFzayBjcmVhdGlvbi4gIFRoZSBnaXZlbiBkZXNjIGlzIGRpc2NhcmRlZCBpZiBndWxwIGlzbid0IGd1bHAtaGVscCBcImhlbHBmdWxcIi5cbmV4cG9ydCBmdW5jdGlvbiBndWxwVGFzayAoZ3VscCwgbmFtZSwgZGVzYywgLi4ucmVzdCkge1xuICBsZXQgYXJncyA9IChndWxwSXNIZWxwZnVsKGd1bHApKSA/IFtdLmNvbmNhdChuYW1lLCBkZXNjLCByZXN0KSA6IFtdLmNvbmNhdChuYW1lLCByZXN0KVxuICByZXR1cm4gZ3VscC50YXNrKC4uLmFyZ3MpXG59XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3VscHNvbWUvZ3VscC1oYXJwIGFib3V0IGhvdyB0byBwb2xsaW5hdGUgb3B0aW9ucy5cbi8vIE9yaWdpbmFsbHkgdGhlIGRlZmF1bHRzIHdlcmUgaGVyZSBpbiBwb2xsZW4uanNvbiBidXQgdGhhdCBmZWx0IHdyb25nIGFuZCBnb3QgbW92ZWQuXG4vLyBTaW5jZSB0aGVyZSBhcmUgbm8gb3RoZXIgdXNlIGNhc2VzIGZvciB0aGlzIHNvIGZhciwgaXQgZG9lc24ndCBzZWVtIHZlcnkgdXNlZnVsLlxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbiAoYW50aGVycywgd2hlcmUpIHtcbiAgbGV0IGZsYW1lbnRzID0gcmVxdWlyZSh3aGVyZSB8fCBwYXRoLm5vcm1hbGl6ZSgncG9sbGVuLmpzb24nKSlcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=