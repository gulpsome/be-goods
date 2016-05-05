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

function prefquireHow(o) {
  o.module = o.module || 'beverage';
  o.locate = o.locate || 'node_modules/' + o.module;
  o.dev = o.dev || false;
  o.exitOnError = o.exitOnError || false;
  return o;
}

function prefquire() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var def = prefquireHow(opts);

  return function (name) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var o = prefquireHow(_ramda2.default.merge(def, opts)); // override-able defaults
    var elsewhere = o.forceLocal || isLocal(name) ? undefined : o.locate;
    try {
      // undefined = local means relative to `process.cwd()` it's expected to be
      // elsewhere is to `locate` it in a default `module`'s dependencies`
      return require(myRequirePath(name, elsewhere));
    } catch (e) {
      var dependency = o.dev ? 'devDependency' : 'dependency';
      var wordLocal = o.forceLocal ? 'local ' : '';
      console.error(_chalk2.default.red('Could not find module ' + name + '!'));
      console.error('Please install ' + name + ' as a ' + wordLocal + dependency + '.');
      if (o.exitOnError) {
        process.exit(1);
      } else {
        throw new Error(e);
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
// TODO: phase out at some point?
function pollen(anthers, where) {
  var flaments = require(where || _path2.default.normalize('pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select; // object assumed
  });
  return (0, _sourcegate2.default)(got);
}

//# sourceMappingURL=data:application/json;base64,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QWMsSUFBZCxJQUFzQixJQUF0QixHQUE2Qix3QkFBSyxJQUFMLEVBQVcsSUFBWCxDQUFwQztBQUNEOzs7QUFHTSxTQUFTLFFBQVQsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBOEM7QUFBQSxvQ0FBTixJQUFNO0FBQU4sUUFBTTtBQUFBOztBQUNuRCxNQUFJLE9BQVEsY0FBYyxJQUFkLENBQUQsR0FBd0IsR0FBRyxNQUFILENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQixJQUF0QixDQUF4QixHQUFzRCxHQUFHLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLENBQWpFO0FBQ0EsU0FBTyxLQUFLLElBQUwsZ0NBQWEsSUFBYixFQUFQO0FBQ0Q7Ozs7OztBQU1NLFNBQVMsTUFBVCxDQUFpQixPQUFqQixFQUEwQixLQUExQixFQUFpQztBQUN0QyxNQUFJLFdBQVcsUUFBUSxTQUFTLGVBQUssU0FBTCxDQUFlLGFBQWYsQ0FBakIsQ0FBZjtBQUNBLE1BQUksTUFBTSxRQUFRLEdBQVIsQ0FBWSxrQkFBVTtBQUM5QixXQUFPLE9BQU8sTUFBUCxLQUFrQixRQUFsQixHQUE2QixTQUFTLE1BQVQsQ0FBN0IsR0FBZ0QsTUFBdkQsQztBQUNELEdBRlMsQ0FBVjtBQUdBLFNBQU8sMEJBQVcsR0FBWCxDQUFQO0FBQ0QiLCJmaWxlIjoiYmUtZ29vZHMuZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBoZWxwIGZyb20gJ2d1bHAtaGVscCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgdHJhY2VyIGZyb20gJ3RyYWNlcidcbmltcG9ydCBpc1RoZXJlIGZyb20gJ2lzLXRoZXJlJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgbGV0IGxvZ2dlciA9IHRyYWNlci5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5mdW5jdGlvbiBteVJlcXVpcmVQYXRoIChuYW1lLCBob21lID0gJycpIHtcbiAgbGV0IHBsYWNlID0gYCR7aG9tZX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gXG4gIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9LyR7cGxhY2V9YClcbiAgdHJ5IHtcbiAgICBsZXQgbWFpbiA9IHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCAncGFja2FnZS5qc29uJykpLm1haW4gfHwgJ2luZGV4LmpzJ1xuICAgIHJldHVybiBwYXRoLmpvaW4od2hlcmUsIG1haW4pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG15UmVxdWlyZSAobmFtZSwgaG9tZSA9ICcnKSB7XG4gIHJldHVybiByZXF1aXJlKG15UmVxdWlyZVBhdGgobmFtZSwgaG9tZSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2FsIChuYW1lLCBvcHRzID0ge30pIHtcbiAgbGV0IG8gPSB7fVxuICBvLnN0cmljdCA9IG9wdHMgPT09IHRydWUgfHwgb3B0cy5zdHJpY3QgfHwgZmFsc2UgLy8gb3B0cyA9PT0gdHJ1ZSBpcyBzdHJpY3RcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIGxldCBpc0RlcGVuZGVuY3kgPSBkZXAocGtnLmRlcGVuZGVuY2llcyB8fCB7fSkgfHwgZGVwKHBrZy5kZXZEZXBlbmRlbmNpZXMgfHwge30pXG4gIGxldCBleGlzdHMgPSBvLnN0cmljdCA/IGlzVGhlcmUobXlSZXF1aXJlUGF0aCgnZ3VscCcpKSA6IHRydWVcbiAgcmV0dXJuIGlzRGVwZW5kZW5jeSAmJiBleGlzdHNcbn1cblxuZnVuY3Rpb24gcHJlZnF1aXJlSG93IChvKSB7XG4gIG8ubW9kdWxlID0gby5tb2R1bGUgfHwgJ2JldmVyYWdlJ1xuICBvLmxvY2F0ZSA9IG8ubG9jYXRlIHx8IGBub2RlX21vZHVsZXMvJHtvLm1vZHVsZX1gXG4gIG8uZGV2ID0gby5kZXYgfHwgZmFsc2VcbiAgby5leGl0T25FcnJvciA9IG8uZXhpdE9uRXJyb3IgfHwgZmFsc2VcbiAgcmV0dXJuIG9cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWZxdWlyZSAob3B0cyA9IHt9KSB7XG4gIGxldCBkZWYgPSBwcmVmcXVpcmVIb3cob3B0cylcblxuICByZXR1cm4gZnVuY3Rpb24gKG5hbWUsIG9wdHMgPSB7fSkge1xuICAgIGxldCBvID0gcHJlZnF1aXJlSG93KFIubWVyZ2UoZGVmLCBvcHRzKSkgLy8gb3ZlcnJpZGUtYWJsZSBkZWZhdWx0c1xuICAgIGxldCBlbHNld2hlcmUgPSAoby5mb3JjZUxvY2FsIHx8IGlzTG9jYWwobmFtZSkpID8gdW5kZWZpbmVkIDogby5sb2NhdGVcbiAgICB0cnkge1xuICAgICAgLy8gdW5kZWZpbmVkID0gbG9jYWwgbWVhbnMgcmVsYXRpdmUgdG8gYHByb2Nlc3MuY3dkKClgIGl0J3MgZXhwZWN0ZWQgdG8gYmVcbiAgICAgIC8vIGVsc2V3aGVyZSBpcyB0byBgbG9jYXRlYCBpdCBpbiBhIGRlZmF1bHQgYG1vZHVsZWAncyBkZXBlbmRlbmNpZXNgXG4gICAgICByZXR1cm4gcmVxdWlyZShteVJlcXVpcmVQYXRoKG5hbWUsIGVsc2V3aGVyZSkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbGV0IGRlcGVuZGVuY3kgPSBvLmRldiA/ICdkZXZEZXBlbmRlbmN5JyA6ICdkZXBlbmRlbmN5J1xuICAgICAgbGV0IHdvcmRMb2NhbCA9IG8uZm9yY2VMb2NhbCA/ICdsb2NhbCAnIDogJydcbiAgICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsucmVkKGBDb3VsZCBub3QgZmluZCBtb2R1bGUgJHtuYW1lfSFgKSlcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFBsZWFzZSBpbnN0YWxsICR7bmFtZX0gYXMgYSAke3dvcmRMb2NhbH0ke2RlcGVuZGVuY3l9LmApXG4gICAgICBpZiAoby5leGl0T25FcnJvcikge1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTbXRoIChvLCB3aGF0KSB7XG4gIGlmICgoKG8gfHwge30pLmNvbnN0cnVjdG9yIHx8IHt9KS5uYW1lID09PSB3aGF0KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHdWxwIChvKSB7XG4gIHJldHVybiBpc1NtdGgobywgJ0d1bHAnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bCAoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBIZWxwaWZ5IChndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrIChndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ndWxwc29tZS9ndWxwLWhhcnAgYWJvdXQgaG93IHRvIHBvbGxpbmF0ZSBvcHRpb25zLlxuLy8gT3JpZ2luYWxseSB0aGUgZGVmYXVsdHMgd2VyZSBoZXJlIGluIHBvbGxlbi5qc29uIGJ1dCB0aGF0IGZlbHQgd3JvbmcgYW5kIGdvdCBtb3ZlZC5cbi8vIFNpbmNlIHRoZXJlIGFyZSBubyBvdGhlciB1c2UgY2FzZXMgZm9yIHRoaXMgc28gZmFyLCBpdCBkb2Vzbid0IHNlZW0gdmVyeSB1c2VmdWwuXG4vLyBUT0RPOiBwaGFzZSBvdXQgYXQgc29tZSBwb2ludD9cbmV4cG9ydCBmdW5jdGlvbiBwb2xsZW4gKGFudGhlcnMsIHdoZXJlKSB7XG4gIGxldCBmbGFtZW50cyA9IHJlcXVpcmUod2hlcmUgfHwgcGF0aC5ub3JtYWxpemUoJ3BvbGxlbi5qc29uJykpXG4gIGxldCBnb3QgPSBhbnRoZXJzLm1hcChzZWxlY3QgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygc2VsZWN0ID09PSAnc3RyaW5nJyA/IGZsYW1lbnRzW3NlbGVjdF0gOiBzZWxlY3QgLy8gb2JqZWN0IGFzc3VtZWRcbiAgfSlcbiAgcmV0dXJuIHNvdXJjZWdhdGUoZ290KVxufVxuIl19