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

function prefquireError(name, o, e) {
  var dependency = o.dev ? 'devDependency' : 'dependency';
  var wordLocal = o.forceLocal ? 'local ' : '';
  console.log(_chalk2.default.red('Could not find module ' + name + '!'));
  console.log('Please install ' + name + ' as a ' + wordLocal + dependency + '.');
  if (o.exitOnError) {
    process.exit(1);
  } else {
    throw new Error(e);
  }
}

function prefquire() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var def = prefquireHow(opts);

  return function (name) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var o = prefquireHow(_ramda2.default.merge(def, opts)); // override-able defaults
    if (o.forceLocal || isLocal(name)) {
      // local means relative to `process.cwd()`
      try {
        return myRequire(name);
      } catch (e) {
        prefquireError(name, o, e);
      }
    } else {
      // try to `locate` in a default `module`'s dependencies`
      try {
        return myRequire(name, o.locate);
      } catch (e) {
        prefquireError(name, o, e);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlLWdvb2RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUE0QmdCLFMsR0FBQSxTO1FBSUEsTyxHQUFBLE87UUE2QkEsUyxHQUFBLFM7UUF1QkEsTSxHQUFBLE07UUFRQSxNLEdBQUEsTTtRQUlBLGEsR0FBQSxhO1FBSUEsVyxHQUFBLFc7UUFLQSxRLEdBQUEsUTtRQVFBLE0sR0FBQSxNOztBQWpIaEI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTSxvQkFBTSxRQUFRLGVBQUssSUFBTCxDQUFVLFFBQVEsR0FBUixFQUFWLEVBQXlCLGNBQXpCLENBQVIsQ0FBWjs7QUFFQSxJQUFJLDBCQUFTLGlCQUFPLE9BQVAsQ0FBZTtBQUNqQyxhQUFXLEVBQUMsT0FBTyxnQkFBTSxLQUFkLEVBQXFCLFFBQVEsZ0JBQU0sTUFBbkMsRUFBMkMsU0FBUyxnQkFBTSxHQUExRCxFQURzQjtBQUVqQyxrQkFBYyxJQUFJLElBQWxCO0FBRmlDLENBQWYsQ0FBYjs7QUFLUCxTQUFTLGFBQVQsQ0FBd0IsSUFBeEIsRUFBeUM7QUFBQSxNQUFYLElBQVcseURBQUosRUFBSTs7QUFDdkMsTUFBSSxRQUFXLElBQVgsc0JBQWdDLElBQXBDO0FBQ0EsTUFBSSxRQUFRLGVBQUssU0FBTCxDQUFrQixRQUFRLEdBQVIsRUFBbEIsU0FBbUMsS0FBbkMsQ0FBWjtBQUNBLE1BQUk7QUFDRixRQUFJLE9BQU8sUUFBUSxlQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLGNBQWpCLENBQVIsRUFBMEMsSUFBMUMsSUFBa0QsVUFBN0Q7QUFDQSxXQUFPLGVBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsSUFBakIsQ0FBUDtBQUNELEdBSEQsQ0FHRSxPQUFPLENBQVAsRUFBVTtBQUNWLFdBQU8sU0FBUDtBQUNEO0FBQ0Y7O0FBRU0sU0FBUyxTQUFULENBQW9CLElBQXBCLEVBQXFDO0FBQUEsTUFBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQzFDLFNBQU8sUUFBUSxjQUFjLElBQWQsRUFBb0IsSUFBcEIsQ0FBUixDQUFQO0FBQ0Q7O0FBRU0sU0FBUyxPQUFULENBQWtCLElBQWxCLEVBQW1DO0FBQUEsTUFBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQ3hDLE1BQUksSUFBSSxFQUFSO0FBQ0EsSUFBRSxNQUFGLEdBQVcsU0FBUyxJQUFULElBQWlCLEtBQUssTUFBdEIsSUFBZ0MsS0FBM0MsQztBQUNBLE1BQUksTUFBTSxnQkFBRSxHQUFGLENBQU0sSUFBTixDQUFWO0FBQ0EsTUFBSSxlQUFlLElBQUksSUFBSSxZQUFKLElBQW9CLEVBQXhCLEtBQStCLElBQUksSUFBSSxlQUFKLElBQXVCLEVBQTNCLENBQWxEO0FBQ0EsTUFBSSxTQUFTLEVBQUUsTUFBRixHQUFXLHVCQUFRLGNBQWMsTUFBZCxDQUFSLENBQVgsR0FBNEMsSUFBekQ7QUFDQSxTQUFPLGdCQUFnQixNQUF2QjtBQUNEOztBQUVELFNBQVMsWUFBVCxDQUF1QixDQUF2QixFQUEwQjtBQUN4QixJQUFFLE1BQUYsR0FBVyxFQUFFLE1BQUYsSUFBWSxVQUF2QjtBQUNBLElBQUUsTUFBRixHQUFXLEVBQUUsTUFBRixzQkFBNEIsRUFBRSxNQUF6QztBQUNBLElBQUUsR0FBRixHQUFRLEVBQUUsR0FBRixJQUFTLEtBQWpCO0FBQ0EsSUFBRSxXQUFGLEdBQWdCLEVBQUUsV0FBRixJQUFpQixLQUFqQztBQUNBLFNBQU8sQ0FBUDtBQUNEOztBQUVELFNBQVMsY0FBVCxDQUF5QixJQUF6QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQztBQUNuQyxNQUFJLGFBQWEsRUFBRSxHQUFGLEdBQVEsZUFBUixHQUEwQixZQUEzQztBQUNBLE1BQUksWUFBWSxFQUFFLFVBQUYsR0FBZSxRQUFmLEdBQTBCLEVBQTFDO0FBQ0EsVUFBUSxHQUFSLENBQVksZ0JBQU0sR0FBTiw0QkFBbUMsSUFBbkMsT0FBWjtBQUNBLFVBQVEsR0FBUixxQkFBOEIsSUFBOUIsY0FBMkMsU0FBM0MsR0FBdUQsVUFBdkQ7QUFDQSxNQUFJLEVBQUUsV0FBTixFQUFtQjtBQUNqQixZQUFRLElBQVIsQ0FBYSxDQUFiO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsVUFBTSxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQU47QUFDRDtBQUNGOztBQUVNLFNBQVMsU0FBVCxHQUErQjtBQUFBLE1BQVgsSUFBVyx5REFBSixFQUFJOztBQUNwQyxNQUFJLE1BQU0sYUFBYSxJQUFiLENBQVY7O0FBRUEsU0FBTyxVQUFVLElBQVYsRUFBMkI7QUFBQSxRQUFYLElBQVcseURBQUosRUFBSTs7QUFDaEMsUUFBSSxJQUFJLGFBQWEsZ0JBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxJQUFiLENBQWIsQ0FBUixDO0FBQ0EsUUFBSSxFQUFFLFVBQUYsSUFBZ0IsUUFBUSxJQUFSLENBQXBCLEVBQW1DOztBQUVqQyxVQUFJO0FBQ0YsZUFBTyxVQUFVLElBQVYsQ0FBUDtBQUNELE9BRkQsQ0FFRSxPQUFPLENBQVAsRUFBVTtBQUNWLHVCQUFlLElBQWYsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEI7QUFDRDtBQUNGLEtBUEQsTUFPTzs7QUFFTCxVQUFJO0FBQ0YsZUFBTyxVQUFVLElBQVYsRUFBZ0IsRUFBRSxNQUFsQixDQUFQO0FBQ0QsT0FGRCxDQUVFLE9BQU8sQ0FBUCxFQUFVO0FBQ1YsdUJBQWUsSUFBZixFQUFxQixDQUFyQixFQUF3QixDQUF4QjtBQUNEO0FBQ0Y7QUFDRixHQWpCRDtBQWtCRDs7QUFFTSxTQUFTLE1BQVQsQ0FBaUIsQ0FBakIsRUFBb0IsSUFBcEIsRUFBMEI7QUFDL0IsTUFBSSxDQUFDLENBQUMsS0FBSyxFQUFOLEVBQVUsV0FBVixJQUF5QixFQUExQixFQUE4QixJQUE5QixLQUF1QyxJQUEzQyxFQUFpRDtBQUMvQyxXQUFPLElBQVA7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPLEtBQVA7QUFDRDtBQUNGOztBQUVNLFNBQVMsTUFBVCxDQUFpQixDQUFqQixFQUFvQjtBQUN6QixTQUFPLE9BQU8sQ0FBUCxFQUFVLE1BQVYsQ0FBUDtBQUNEOztBQUVNLFNBQVMsYUFBVCxDQUF3QixJQUF4QixFQUE4QjtBQUNuQyxTQUFPLGdCQUFFLEVBQUYsQ0FBSyxNQUFMLEVBQWEsZ0JBQUUsSUFBRixDQUFPLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBUCxFQUF5QixLQUFLLEtBQTlCLENBQWIsQ0FBUDtBQUNEOztBQUVNLFNBQVMsV0FBVCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUFrQztBQUN2QyxTQUFPLGNBQWMsSUFBZCxJQUFzQixJQUF0QixHQUE2Qix3QkFBSyxJQUFMLEVBQVcsSUFBWCxDQUFwQztBQUNEOzs7QUFHTSxTQUFTLFFBQVQsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBOEM7QUFBQSxvQ0FBTixJQUFNO0FBQU4sUUFBTTtBQUFBOztBQUNuRCxNQUFJLE9BQVEsY0FBYyxJQUFkLENBQUQsR0FBd0IsR0FBRyxNQUFILENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQixJQUF0QixDQUF4QixHQUFzRCxHQUFHLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLENBQWpFO0FBQ0EsU0FBTyxLQUFLLElBQUwsZ0NBQWEsSUFBYixFQUFQO0FBQ0Q7Ozs7O0FBS00sU0FBUyxNQUFULENBQWlCLE9BQWpCLEVBQTBCLEtBQTFCLEVBQWlDO0FBQ3RDLE1BQUksV0FBVyxRQUFRLFNBQVMsZUFBSyxTQUFMLENBQWUsYUFBZixDQUFqQixDQUFmO0FBQ0EsTUFBSSxNQUFNLFFBQVEsR0FBUixDQUFZLGtCQUFVO0FBQzlCLFdBQU8sT0FBTyxNQUFQLEtBQWtCLFFBQWxCLEdBQTZCLFNBQVMsTUFBVCxDQUE3QixHQUFnRCxNQUF2RCxDO0FBQ0QsR0FGUyxDQUFWO0FBR0EsU0FBTywwQkFBVyxHQUFYLENBQVA7QUFDRCIsImZpbGUiOiJiZS1nb29kcy5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGhlbHAgZnJvbSAnZ3VscC1oZWxwJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB0cmFjZXIgZnJvbSAndHJhY2VyJ1xuaW1wb3J0IGlzVGhlcmUgZnJvbSAnaXMtdGhlcmUnXG5cbmV4cG9ydCBjb25zdCBwa2cgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncGFja2FnZS5qc29uJykpXG5cbmV4cG9ydCBsZXQgbG9nZ2VyID0gdHJhY2VyLmNvbnNvbGUoe1xuICAnZmlsdGVycyc6IHsnbG9nJzogY2hhbGsuZ3JlZW4sICd3YXJuJzogY2hhbGsueWVsbG93LCAnZXJyb3InOiBjaGFsay5yZWR9LFxuICAnZm9ybWF0JzogYDwke3BrZy5uYW1lfSB1c2luZyB7e3BhdGh9fTp7e2xpbmV9fT5cXG57e21lc3NhZ2V9fVxcbmBcbn0pXG5cbmZ1bmN0aW9uIG15UmVxdWlyZVBhdGggKG5hbWUsIGhvbWUgPSAnJykge1xuICBsZXQgcGxhY2UgPSBgJHtob21lfS9ub2RlX21vZHVsZXMvJHtuYW1lfWBcbiAgbGV0IHdoZXJlID0gcGF0aC5ub3JtYWxpemUoYCR7cHJvY2Vzcy5jd2QoKX0vJHtwbGFjZX1gKVxuICB0cnkge1xuICAgIGxldCBtYWluID0gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpbiB8fCAnaW5kZXguanMnXG4gICAgcmV0dXJuIHBhdGguam9pbih3aGVyZSwgbWFpbilcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbXlSZXF1aXJlIChuYW1lLCBob21lID0gJycpIHtcbiAgcmV0dXJuIHJlcXVpcmUobXlSZXF1aXJlUGF0aChuYW1lLCBob21lKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9jYWwgKG5hbWUsIG9wdHMgPSB7fSkge1xuICBsZXQgbyA9IHt9XG4gIG8uc3RyaWN0ID0gb3B0cyA9PT0gdHJ1ZSB8fCBvcHRzLnN0cmljdCB8fCBmYWxzZSAvLyBvcHRzID09PSB0cnVlIGlzIHN0cmljdFxuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgbGV0IGlzRGVwZW5kZW5jeSA9IGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbiAgbGV0IGV4aXN0cyA9IG8uc3RyaWN0ID8gaXNUaGVyZShteVJlcXVpcmVQYXRoKCdndWxwJykpIDogdHJ1ZVxuICByZXR1cm4gaXNEZXBlbmRlbmN5ICYmIGV4aXN0c1xufVxuXG5mdW5jdGlvbiBwcmVmcXVpcmVIb3cgKG8pIHtcbiAgby5tb2R1bGUgPSBvLm1vZHVsZSB8fCAnYmV2ZXJhZ2UnXG4gIG8ubG9jYXRlID0gby5sb2NhdGUgfHwgYG5vZGVfbW9kdWxlcy8ke28ubW9kdWxlfWBcbiAgby5kZXYgPSBvLmRldiB8fCBmYWxzZVxuICBvLmV4aXRPbkVycm9yID0gby5leGl0T25FcnJvciB8fCBmYWxzZVxuICByZXR1cm4gb1xufVxuXG5mdW5jdGlvbiBwcmVmcXVpcmVFcnJvciAobmFtZSwgbywgZSkge1xuICBsZXQgZGVwZW5kZW5jeSA9IG8uZGV2ID8gJ2RldkRlcGVuZGVuY3knIDogJ2RlcGVuZGVuY3knXG4gIGxldCB3b3JkTG9jYWwgPSBvLmZvcmNlTG9jYWwgPyAnbG9jYWwgJyA6ICcnXG4gIGNvbnNvbGUubG9nKGNoYWxrLnJlZChgQ291bGQgbm90IGZpbmQgbW9kdWxlICR7bmFtZX0hYCkpXG4gIGNvbnNvbGUubG9nKGBQbGVhc2UgaW5zdGFsbCAke25hbWV9IGFzIGEgJHt3b3JkTG9jYWx9JHtkZXBlbmRlbmN5fS5gKVxuICBpZiAoby5leGl0T25FcnJvcikge1xuICAgIHByb2Nlc3MuZXhpdCgxKVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVmcXVpcmUgKG9wdHMgPSB7fSkge1xuICBsZXQgZGVmID0gcHJlZnF1aXJlSG93KG9wdHMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCBvcHRzID0ge30pIHtcbiAgICBsZXQgbyA9IHByZWZxdWlyZUhvdyhSLm1lcmdlKGRlZiwgb3B0cykpIC8vIG92ZXJyaWRlLWFibGUgZGVmYXVsdHNcbiAgICBpZiAoby5mb3JjZUxvY2FsIHx8IGlzTG9jYWwobmFtZSkpIHtcbiAgICAgIC8vIGxvY2FsIG1lYW5zIHJlbGF0aXZlIHRvIGBwcm9jZXNzLmN3ZCgpYFxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwcmVmcXVpcmVFcnJvcihuYW1lLCBvLCBlKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0cnkgdG8gYGxvY2F0ZWAgaW4gYSBkZWZhdWx0IGBtb2R1bGVgJ3MgZGVwZW5kZW5jaWVzYFxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lLCBvLmxvY2F0ZSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcHJlZnF1aXJlRXJyb3IobmFtZSwgbywgZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU210aCAobywgd2hhdCkge1xuICBpZiAoKChvIHx8IHt9KS5jb25zdHJ1Y3RvciB8fCB7fSkubmFtZSA9PT0gd2hhdCkge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzR3VscCAobykge1xuICByZXR1cm4gaXNTbXRoKG8sICdHdWxwJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBJc0hlbHBmdWwgKGd1bHApIHtcbiAgcmV0dXJuIFIuaXMoT2JqZWN0LCBSLnBhdGgoWydoZWxwJywgJ2hlbHAnXSwgZ3VscC50YXNrcykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSGVscGlmeSAoZ3VscCwgb3B0cykge1xuICByZXR1cm4gZ3VscElzSGVscGZ1bChndWxwKSA/IGd1bHAgOiBoZWxwKGd1bHAsIG9wdHMpXG59XG5cbi8vIEhlbHBmdWwgdGFzayBjcmVhdGlvbi4gIFRoZSBnaXZlbiBkZXNjIGlzIGRpc2NhcmRlZCBpZiBndWxwIGlzbid0IGd1bHAtaGVscCBcImhlbHBmdWxcIi5cbmV4cG9ydCBmdW5jdGlvbiBndWxwVGFzayAoZ3VscCwgbmFtZSwgZGVzYywgLi4ucmVzdCkge1xuICBsZXQgYXJncyA9IChndWxwSXNIZWxwZnVsKGd1bHApKSA/IFtdLmNvbmNhdChuYW1lLCBkZXNjLCByZXN0KSA6IFtdLmNvbmNhdChuYW1lLCByZXN0KVxuICByZXR1cm4gZ3VscC50YXNrKC4uLmFyZ3MpXG59XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3VscHNvbWUvZ3VscC1oYXJwIGFib3V0IGhvdyB0byBwb2xsaW5hdGUgb3B0aW9ucy5cbi8vIE9yaWdpbmFsbHkgdGhlIGRlZmF1bHRzIHdlcmUgaGVyZSBpbiBwb2xsZW4uanNvbiBidXQgdGhhdCBmZWx0IHdyb25nIGFuZCBnb3QgbW92ZWQuXG4vLyBTaW5jZSB0aGVyZSBhcmUgbm8gb3RoZXIgdXNlIGNhc2VzIGZvciB0aGlzIHNvIGZhciwgaXQgZG9lc24ndCBzZWVtIHZlcnkgdXNlZnVsLlxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbiAoYW50aGVycywgd2hlcmUpIHtcbiAgbGV0IGZsYW1lbnRzID0gcmVxdWlyZSh3aGVyZSB8fCBwYXRoLm5vcm1hbGl6ZSgncG9sbGVuLmpzb24nKSlcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=