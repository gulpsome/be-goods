'use strict';

exports.__esModule = true;
exports.logger = exports.pkg = undefined;
exports.myRequire = myRequire;
exports.isLocal = isLocal;
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

var _isThere = require('is-there');

var _isThere2 = _interopRequireDefault(_isThere);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var pkg = exports.pkg = require(_path2.default.join(process.cwd(), 'package.json'));

var logger = exports.logger = _tracer2.default.console({
  'filters': { 'log': _chalk2.default.green, 'warn': _chalk2.default.yellow, 'error': _chalk2.default.red },
  'format': '<' + pkg.name + ' using {{path}}:{{line}}>\n{{message}}\n'
});

function myRequirePath(name) {
  var home = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var place = home + '/node_modules/' + name;
  var where = _path2.default.normalize(process.cwd() + '/' + place);
  try {
    var main = require(_path2.default.join(where, 'package.json')).main || 'index.js';
    return _path2.default.join(where, main);
  } catch (e) {
    return undefined;
  }
}

function myRequire(name) {
  var home = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  return require(myRequirePath(name, home));
}

function isLocal(name) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var o = {};
  o.strict = opts === true || opts.strict || false; // opts === true is strict
  var dep = _ramda2.default.has(name);
  var isDependency = dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {});
  var exists = o.strict ? (0, _isThere2.default)(myRequirePath('gulp')) : true;
  return isDependency && exists;
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

//# sourceMappingURL=data:application/json;base64,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Q0FBeEIsR0FBc0QsR0FBRyxNQUFILENBQVUsSUFBVixFQUFnQixJQUFoQixDQUFqRTtBQUNBLFNBQU8sS0FBSyxJQUFMLGdDQUFhLElBQWIsRUFBUDtBQUNEOzs7OztBQUtNLFNBQVMsTUFBVCxDQUFpQixPQUFqQixFQUEwQixLQUExQixFQUFpQztBQUN0QyxNQUFJLFdBQVcsUUFBUSxTQUFTLGVBQUssU0FBTCxDQUFlLGFBQWYsQ0FBakIsQ0FBZjtBQUNBLE1BQUksTUFBTSxRQUFRLEdBQVIsQ0FBWSxrQkFBVTtBQUM5QixXQUFPLE9BQU8sTUFBUCxLQUFrQixRQUFsQixHQUE2QixTQUFTLE1BQVQsQ0FBN0IsR0FBZ0QsTUFBdkQsQztBQUNELEdBRlMsQ0FBVjtBQUdBLFNBQU8sMEJBQVcsR0FBWCxDQUFQO0FBQ0QiLCJmaWxlIjoiYmUtZ29vZHMtaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBoZWxwIGZyb20gJ2d1bHAtaGVscCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgdHJhY2VyIGZyb20gJ3RyYWNlcidcbmltcG9ydCBpc1RoZXJlIGZyb20gJ2lzLXRoZXJlJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgbGV0IGxvZ2dlciA9IHRyYWNlci5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5mdW5jdGlvbiBteVJlcXVpcmVQYXRoIChuYW1lLCBob21lID0gJycpIHtcbiAgbGV0IHBsYWNlID0gYCR7aG9tZX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gXG4gIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9LyR7cGxhY2V9YClcbiAgdHJ5IHtcbiAgICBsZXQgbWFpbiA9IHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCAncGFja2FnZS5qc29uJykpLm1haW4gfHwgJ2luZGV4LmpzJ1xuICAgIHJldHVybiBwYXRoLmpvaW4od2hlcmUsIG1haW4pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG15UmVxdWlyZSAobmFtZSwgaG9tZSA9ICcnKSB7XG4gIHJldHVybiByZXF1aXJlKG15UmVxdWlyZVBhdGgobmFtZSwgaG9tZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2FsIChuYW1lLCBvcHRzID0ge30pIHtcbiAgbGV0IG8gPSB7fVxuICBvLnN0cmljdCA9IG9wdHMgPT09IHRydWUgfHwgb3B0cy5zdHJpY3QgfHwgZmFsc2UgLy8gb3B0cyA9PT0gdHJ1ZSBpcyBzdHJpY3RcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIGxldCBpc0RlcGVuZGVuY3kgPSBkZXAocGtnLmRlcGVuZGVuY2llcyB8fCB7fSkgfHwgZGVwKHBrZy5kZXZEZXBlbmRlbmNpZXMgfHwge30pXG4gIGxldCBleGlzdHMgPSBvLnN0cmljdCA/IGlzVGhlcmUobXlSZXF1aXJlUGF0aCgnZ3VscCcpKSA6IHRydWVcbiAgcmV0dXJuIGlzRGVwZW5kZW5jeSAmJiBleGlzdHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWZxdWlyZSAob3B0cyA9IHt9KSB7XG4gIG9wdHMubW9kdWxlID0gb3B0cy5tb2R1bGUgfHwgJ2JldmVyYWdlJ1xuICBvcHRzLmxvY2F0ZSA9IG9wdHMubG9jYXRlIHx8IGBub2RlX21vZHVsZXMvJHtvcHRzLm1vZHVsZX1gXG4gIG9wdHMuZGV2ID0gb3B0cy5kZXYgfHwgZmFsc2VcbiAgb3B0cy5leGl0T25FcnJvciA9IG9wdHMuZXhpdE9uRXJyb3IgfHwgZmFsc2VcblxuICByZXR1cm4gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoaXNMb2NhbChuYW1lKSkge1xuICAgICAgLy8gbG9jYWwgbWVhbnMgcmVsYXRpdmUgdG8gYHByb2Nlc3MuY3dkKClgXG4gICAgICByZXR1cm4gbXlSZXF1aXJlKG5hbWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRyeSB0byBgbG9jYXRlYCBpbiBhIGRlZmF1bHQgYG1vZHVsZWAncyBkZXBlbmRlbmNpZXNgXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbXlSZXF1aXJlKG5hbWUsIG9wdHMubG9jYXRlKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgZGVwZW5kZW5jeSA9IG9wdHMuZGV2ID8gJ2RldkRlcGVuZGVuY3knIDogJ2RlcGVuZGVuY3knXG4gICAgICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChgQ291bGQgbm90IGZpbmQgbW9kdWxlICR7bmFtZX0hYCkpXG4gICAgICAgIGNvbnNvbGUubG9nKGBQbGVhc2UgaW5zdGFsbCAke25hbWV9IGFzIGEgJHtkZXBlbmRlbmN5fS5gKVxuICAgICAgICBpZiAob3B0cy5leGl0T25FcnJvcikge1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NtdGggKG8sIHdoYXQpIHtcbiAgaWYgKCgobyB8fCB7fSkuY29uc3RydWN0b3IgfHwge30pLm5hbWUgPT09IHdoYXQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0d1bHAgKG8pIHtcbiAgcmV0dXJuIGlzU210aChvLCAnR3VscCcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSXNIZWxwZnVsIChndWxwKSB7XG4gIHJldHVybiBSLmlzKE9iamVjdCwgUi5wYXRoKFsnaGVscCcsICdoZWxwJ10sIGd1bHAudGFza3MpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscEhlbHBpZnkgKGd1bHAsIG9wdHMpIHtcbiAgcmV0dXJuIGd1bHBJc0hlbHBmdWwoZ3VscCkgPyBndWxwIDogaGVscChndWxwLCBvcHRzKVxufVxuXG4vLyBIZWxwZnVsIHRhc2sgY3JlYXRpb24uICBUaGUgZ2l2ZW4gZGVzYyBpcyBkaXNjYXJkZWQgaWYgZ3VscCBpc24ndCBndWxwLWhlbHAgXCJoZWxwZnVsXCIuXG5leHBvcnQgZnVuY3Rpb24gZ3VscFRhc2sgKGd1bHAsIG5hbWUsIGRlc2MsIC4uLnJlc3QpIHtcbiAgbGV0IGFyZ3MgPSAoZ3VscElzSGVscGZ1bChndWxwKSkgPyBbXS5jb25jYXQobmFtZSwgZGVzYywgcmVzdCkgOiBbXS5jb25jYXQobmFtZSwgcmVzdClcbiAgcmV0dXJuIGd1bHAudGFzayguLi5hcmdzKVxufVxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2d1bHBzb21lL2d1bHAtaGFycCBhYm91dCBob3cgdG8gcG9sbGluYXRlIG9wdGlvbnMuXG4vLyBPcmlnaW5hbGx5IHRoZSBkZWZhdWx0cyB3ZXJlIGhlcmUgaW4gcG9sbGVuLmpzb24gYnV0IHRoYXQgZmVsdCB3cm9uZyBhbmQgZ290IG1vdmVkLlxuLy8gU2luY2UgdGhlcmUgYXJlIG5vIG90aGVyIHVzZSBjYXNlcyBmb3IgdGhpcyBzbyBmYXIsIGl0IGRvZXNuJ3Qgc2VlbSB2ZXJ5IHVzZWZ1bC5cbmV4cG9ydCBmdW5jdGlvbiBwb2xsZW4gKGFudGhlcnMsIHdoZXJlKSB7XG4gIGxldCBmbGFtZW50cyA9IHJlcXVpcmUod2hlcmUgfHwgcGF0aC5ub3JtYWxpemUoJ3BvbGxlbi5qc29uJykpXG4gIGxldCBnb3QgPSBhbnRoZXJzLm1hcChzZWxlY3QgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygc2VsZWN0ID09PSAnc3RyaW5nJyA/IGZsYW1lbnRzW3NlbGVjdF0gOiBzZWxlY3QgLy8gb2JqZWN0IGFzc3VtZWRcbiAgfSlcbiAgcmV0dXJuIHNvdXJjZWdhdGUoZ290KVxufVxuIl19