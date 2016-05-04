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
      return myRequire(name, elsewhere);
    } catch (e) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlLWdvb2RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUE0QmdCLFMsR0FBQSxTO1FBSUEsTyxHQUFBLE87UUFpQkEsUyxHQUFBLFM7UUF3QkEsTSxHQUFBLE07UUFRQSxNLEdBQUEsTTtRQUlBLGEsR0FBQSxhO1FBSUEsVyxHQUFBLFc7UUFLQSxRLEdBQUEsUTtRQVFBLE0sR0FBQSxNOztBQXRHaEI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTSxvQkFBTSxRQUFRLGVBQUssSUFBTCxDQUFVLFFBQVEsR0FBUixFQUFWLEVBQXlCLGNBQXpCLENBQVIsQ0FBWjs7QUFFQSxJQUFJLDBCQUFTLGlCQUFPLE9BQVAsQ0FBZTtBQUNqQyxhQUFXLEVBQUMsT0FBTyxnQkFBTSxLQUFkLEVBQXFCLFFBQVEsZ0JBQU0sTUFBbkMsRUFBMkMsU0FBUyxnQkFBTSxHQUExRCxFQURzQjtBQUVqQyxrQkFBYyxJQUFJLElBQWxCO0FBRmlDLENBQWYsQ0FBYjs7QUFLUCxTQUFTLGFBQVQsQ0FBd0IsSUFBeEIsRUFBeUM7QUFBQSxNQUFYLElBQVcseURBQUosRUFBSTs7QUFDdkMsTUFBSSxRQUFXLElBQVgsc0JBQWdDLElBQXBDO0FBQ0EsTUFBSSxRQUFRLGVBQUssU0FBTCxDQUFrQixRQUFRLEdBQVIsRUFBbEIsU0FBbUMsS0FBbkMsQ0FBWjtBQUNBLE1BQUk7QUFDRixRQUFJLE9BQU8sUUFBUSxlQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLGNBQWpCLENBQVIsRUFBMEMsSUFBMUMsSUFBa0QsVUFBN0Q7QUFDQSxXQUFPLGVBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsSUFBakIsQ0FBUDtBQUNELEdBSEQsQ0FHRSxPQUFPLENBQVAsRUFBVTtBQUNWLFdBQU8sU0FBUDtBQUNEO0FBQ0Y7O0FBRU0sU0FBUyxTQUFULENBQW9CLElBQXBCLEVBQXFDO0FBQUEsTUFBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQzFDLFNBQU8sUUFBUSxjQUFjLElBQWQsRUFBb0IsSUFBcEIsQ0FBUixDQUFQO0FBQ0Q7O0FBRU0sU0FBUyxPQUFULENBQWtCLElBQWxCLEVBQW1DO0FBQUEsTUFBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQ3hDLE1BQUksSUFBSSxFQUFSO0FBQ0EsSUFBRSxNQUFGLEdBQVcsU0FBUyxJQUFULElBQWlCLEtBQUssTUFBdEIsSUFBZ0MsS0FBM0MsQztBQUNBLE1BQUksTUFBTSxnQkFBRSxHQUFGLENBQU0sSUFBTixDQUFWO0FBQ0EsTUFBSSxlQUFlLElBQUksSUFBSSxZQUFKLElBQW9CLEVBQXhCLEtBQStCLElBQUksSUFBSSxlQUFKLElBQXVCLEVBQTNCLENBQWxEO0FBQ0EsTUFBSSxTQUFTLEVBQUUsTUFBRixHQUFXLHVCQUFRLGNBQWMsTUFBZCxDQUFSLENBQVgsR0FBNEMsSUFBekQ7QUFDQSxTQUFPLGdCQUFnQixNQUF2QjtBQUNEOztBQUVELFNBQVMsWUFBVCxDQUF1QixDQUF2QixFQUEwQjtBQUN4QixJQUFFLE1BQUYsR0FBVyxFQUFFLE1BQUYsSUFBWSxVQUF2QjtBQUNBLElBQUUsTUFBRixHQUFXLEVBQUUsTUFBRixzQkFBNEIsRUFBRSxNQUF6QztBQUNBLElBQUUsR0FBRixHQUFRLEVBQUUsR0FBRixJQUFTLEtBQWpCO0FBQ0EsSUFBRSxXQUFGLEdBQWdCLEVBQUUsV0FBRixJQUFpQixLQUFqQztBQUNBLFNBQU8sQ0FBUDtBQUNEOztBQUVNLFNBQVMsU0FBVCxHQUErQjtBQUFBLE1BQVgsSUFBVyx5REFBSixFQUFJOztBQUNwQyxNQUFJLE1BQU0sYUFBYSxJQUFiLENBQVY7O0FBRUEsU0FBTyxVQUFVLElBQVYsRUFBMkI7QUFBQSxRQUFYLElBQVcseURBQUosRUFBSTs7QUFDaEMsUUFBSSxJQUFJLGFBQWEsZ0JBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxJQUFiLENBQWIsQ0FBUixDO0FBQ0EsUUFBSSxZQUFhLEVBQUUsVUFBRixJQUFnQixRQUFRLElBQVIsQ0FBakIsR0FBa0MsU0FBbEMsR0FBOEMsRUFBRSxNQUFoRTtBQUNBLFFBQUk7OztBQUdGLGFBQU8sVUFBVSxJQUFWLEVBQWdCLFNBQWhCLENBQVA7QUFDRCxLQUpELENBSUUsT0FBTyxDQUFQLEVBQVU7QUFDVixVQUFJLGFBQWEsRUFBRSxHQUFGLEdBQVEsZUFBUixHQUEwQixZQUEzQztBQUNBLFVBQUksWUFBWSxFQUFFLFVBQUYsR0FBZSxRQUFmLEdBQTBCLEVBQTFDO0FBQ0EsY0FBUSxHQUFSLENBQVksZ0JBQU0sR0FBTiw0QkFBbUMsSUFBbkMsT0FBWjtBQUNBLGNBQVEsR0FBUixxQkFBOEIsSUFBOUIsY0FBMkMsU0FBM0MsR0FBdUQsVUFBdkQ7QUFDQSxVQUFJLEVBQUUsV0FBTixFQUFtQjtBQUNqQixnQkFBUSxJQUFSLENBQWEsQ0FBYjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFOO0FBQ0Q7QUFDRjtBQUNGLEdBbEJEO0FBbUJEOztBQUVNLFNBQVMsTUFBVCxDQUFpQixDQUFqQixFQUFvQixJQUFwQixFQUEwQjtBQUMvQixNQUFJLENBQUMsQ0FBQyxLQUFLLEVBQU4sRUFBVSxXQUFWLElBQXlCLEVBQTFCLEVBQThCLElBQTlCLEtBQXVDLElBQTNDLEVBQWlEO0FBQy9DLFdBQU8sSUFBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU8sS0FBUDtBQUNEO0FBQ0Y7O0FBRU0sU0FBUyxNQUFULENBQWlCLENBQWpCLEVBQW9CO0FBQ3pCLFNBQU8sT0FBTyxDQUFQLEVBQVUsTUFBVixDQUFQO0FBQ0Q7O0FBRU0sU0FBUyxhQUFULENBQXdCLElBQXhCLEVBQThCO0FBQ25DLFNBQU8sZ0JBQUUsRUFBRixDQUFLLE1BQUwsRUFBYSxnQkFBRSxJQUFGLENBQU8sQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUFQLEVBQXlCLEtBQUssS0FBOUIsQ0FBYixDQUFQO0FBQ0Q7O0FBRU0sU0FBUyxXQUFULENBQXNCLElBQXRCLEVBQTRCLElBQTVCLEVBQWtDO0FBQ3ZDLFNBQU8sY0FBYyxJQUFkLElBQXNCLElBQXRCLEdBQTZCLHdCQUFLLElBQUwsRUFBVyxJQUFYLENBQXBDO0FBQ0Q7OztBQUdNLFNBQVMsUUFBVCxDQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQixFQUE4QztBQUFBLG9DQUFOLElBQU07QUFBTixRQUFNO0FBQUE7O0FBQ25ELE1BQUksT0FBUSxjQUFjLElBQWQsQ0FBRCxHQUF3QixHQUFHLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLElBQXRCLENBQXhCLEdBQXNELEdBQUcsTUFBSCxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsQ0FBakU7QUFDQSxTQUFPLEtBQUssSUFBTCxnQ0FBYSxJQUFiLEVBQVA7QUFDRDs7Ozs7QUFLTSxTQUFTLE1BQVQsQ0FBaUIsT0FBakIsRUFBMEIsS0FBMUIsRUFBaUM7QUFDdEMsTUFBSSxXQUFXLFFBQVEsU0FBUyxlQUFLLFNBQUwsQ0FBZSxhQUFmLENBQWpCLENBQWY7QUFDQSxNQUFJLE1BQU0sUUFBUSxHQUFSLENBQVksa0JBQVU7QUFDOUIsV0FBTyxPQUFPLE1BQVAsS0FBa0IsUUFBbEIsR0FBNkIsU0FBUyxNQUFULENBQTdCLEdBQWdELE1BQXZELEM7QUFDRCxHQUZTLENBQVY7QUFHQSxTQUFPLDBCQUFXLEdBQVgsQ0FBUDtBQUNEIiwiZmlsZSI6ImJlLWdvb2RzLmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHRyYWNlciBmcm9tICd0cmFjZXInXG5pbXBvcnQgaXNUaGVyZSBmcm9tICdpcy10aGVyZSdcblxuZXhwb3J0IGNvbnN0IHBrZyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKSlcblxuZXhwb3J0IGxldCBsb2dnZXIgPSB0cmFjZXIuY29uc29sZSh7XG4gICdmaWx0ZXJzJzogeydsb2cnOiBjaGFsay5ncmVlbiwgJ3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICdmb3JtYXQnOiBgPCR7cGtnLm5hbWV9IHVzaW5nIHt7cGF0aH19Ont7bGluZX19Plxcbnt7bWVzc2FnZX19XFxuYFxufSlcblxuZnVuY3Rpb24gbXlSZXF1aXJlUGF0aCAobmFtZSwgaG9tZSA9ICcnKSB7XG4gIGxldCBwbGFjZSA9IGAke2hvbWV9L25vZGVfbW9kdWxlcy8ke25hbWV9YFxuICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS8ke3BsYWNlfWApXG4gIHRyeSB7XG4gICAgbGV0IG1haW4gPSByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluIHx8ICdpbmRleC5qcydcbiAgICByZXR1cm4gcGF0aC5qb2luKHdoZXJlLCBtYWluKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBteVJlcXVpcmUgKG5hbWUsIGhvbWUgPSAnJykge1xuICByZXR1cm4gcmVxdWlyZShteVJlcXVpcmVQYXRoKG5hbWUsIGhvbWUpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbCAobmFtZSwgb3B0cyA9IHt9KSB7XG4gIGxldCBvID0ge31cbiAgby5zdHJpY3QgPSBvcHRzID09PSB0cnVlIHx8IG9wdHMuc3RyaWN0IHx8IGZhbHNlIC8vIG9wdHMgPT09IHRydWUgaXMgc3RyaWN0XG4gIGxldCBkZXAgPSBSLmhhcyhuYW1lKVxuICBsZXQgaXNEZXBlbmRlbmN5ID0gZGVwKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pIHx8IGRlcChwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IHt9KVxuICBsZXQgZXhpc3RzID0gby5zdHJpY3QgPyBpc1RoZXJlKG15UmVxdWlyZVBhdGgoJ2d1bHAnKSkgOiB0cnVlXG4gIHJldHVybiBpc0RlcGVuZGVuY3kgJiYgZXhpc3RzXG59XG5cbmZ1bmN0aW9uIHByZWZxdWlyZUhvdyAobykge1xuICBvLm1vZHVsZSA9IG8ubW9kdWxlIHx8ICdiZXZlcmFnZSdcbiAgby5sb2NhdGUgPSBvLmxvY2F0ZSB8fCBgbm9kZV9tb2R1bGVzLyR7by5tb2R1bGV9YFxuICBvLmRldiA9IG8uZGV2IHx8IGZhbHNlXG4gIG8uZXhpdE9uRXJyb3IgPSBvLmV4aXRPbkVycm9yIHx8IGZhbHNlXG4gIHJldHVybiBvXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVmcXVpcmUgKG9wdHMgPSB7fSkge1xuICBsZXQgZGVmID0gcHJlZnF1aXJlSG93KG9wdHMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCBvcHRzID0ge30pIHtcbiAgICBsZXQgbyA9IHByZWZxdWlyZUhvdyhSLm1lcmdlKGRlZiwgb3B0cykpIC8vIG92ZXJyaWRlLWFibGUgZGVmYXVsdHNcbiAgICBsZXQgZWxzZXdoZXJlID0gKG8uZm9yY2VMb2NhbCB8fCBpc0xvY2FsKG5hbWUpKSA/IHVuZGVmaW5lZCA6IG8ubG9jYXRlXG4gICAgdHJ5IHtcbiAgICAgIC8vIHVuZGVmaW5lZCA9IGxvY2FsIG1lYW5zIHJlbGF0aXZlIHRvIGBwcm9jZXNzLmN3ZCgpYCBpdCdzIGV4cGVjdGVkIHRvIGJlXG4gICAgICAvLyBlbHNld2hlcmUgaXMgdG8gYGxvY2F0ZWAgaXQgaW4gYSBkZWZhdWx0IGBtb2R1bGVgJ3MgZGVwZW5kZW5jaWVzYFxuICAgICAgcmV0dXJuIG15UmVxdWlyZShuYW1lLCBlbHNld2hlcmUpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbGV0IGRlcGVuZGVuY3kgPSBvLmRldiA/ICdkZXZEZXBlbmRlbmN5JyA6ICdkZXBlbmRlbmN5J1xuICAgICAgbGV0IHdvcmRMb2NhbCA9IG8uZm9yY2VMb2NhbCA/ICdsb2NhbCAnIDogJydcbiAgICAgIGNvbnNvbGUubG9nKGNoYWxrLnJlZChgQ291bGQgbm90IGZpbmQgbW9kdWxlICR7bmFtZX0hYCkpXG4gICAgICBjb25zb2xlLmxvZyhgUGxlYXNlIGluc3RhbGwgJHtuYW1lfSBhcyBhICR7d29yZExvY2FsfSR7ZGVwZW5kZW5jeX0uYClcbiAgICAgIGlmIChvLmV4aXRPbkVycm9yKSB7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NtdGggKG8sIHdoYXQpIHtcbiAgaWYgKCgobyB8fCB7fSkuY29uc3RydWN0b3IgfHwge30pLm5hbWUgPT09IHdoYXQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0d1bHAgKG8pIHtcbiAgcmV0dXJuIGlzU210aChvLCAnR3VscCcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSXNIZWxwZnVsIChndWxwKSB7XG4gIHJldHVybiBSLmlzKE9iamVjdCwgUi5wYXRoKFsnaGVscCcsICdoZWxwJ10sIGd1bHAudGFza3MpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscEhlbHBpZnkgKGd1bHAsIG9wdHMpIHtcbiAgcmV0dXJuIGd1bHBJc0hlbHBmdWwoZ3VscCkgPyBndWxwIDogaGVscChndWxwLCBvcHRzKVxufVxuXG4vLyBIZWxwZnVsIHRhc2sgY3JlYXRpb24uICBUaGUgZ2l2ZW4gZGVzYyBpcyBkaXNjYXJkZWQgaWYgZ3VscCBpc24ndCBndWxwLWhlbHAgXCJoZWxwZnVsXCIuXG5leHBvcnQgZnVuY3Rpb24gZ3VscFRhc2sgKGd1bHAsIG5hbWUsIGRlc2MsIC4uLnJlc3QpIHtcbiAgbGV0IGFyZ3MgPSAoZ3VscElzSGVscGZ1bChndWxwKSkgPyBbXS5jb25jYXQobmFtZSwgZGVzYywgcmVzdCkgOiBbXS5jb25jYXQobmFtZSwgcmVzdClcbiAgcmV0dXJuIGd1bHAudGFzayguLi5hcmdzKVxufVxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2d1bHBzb21lL2d1bHAtaGFycCBhYm91dCBob3cgdG8gcG9sbGluYXRlIG9wdGlvbnMuXG4vLyBPcmlnaW5hbGx5IHRoZSBkZWZhdWx0cyB3ZXJlIGhlcmUgaW4gcG9sbGVuLmpzb24gYnV0IHRoYXQgZmVsdCB3cm9uZyBhbmQgZ290IG1vdmVkLlxuLy8gU2luY2UgdGhlcmUgYXJlIG5vIG90aGVyIHVzZSBjYXNlcyBmb3IgdGhpcyBzbyBmYXIsIGl0IGRvZXNuJ3Qgc2VlbSB2ZXJ5IHVzZWZ1bC5cbmV4cG9ydCBmdW5jdGlvbiBwb2xsZW4gKGFudGhlcnMsIHdoZXJlKSB7XG4gIGxldCBmbGFtZW50cyA9IHJlcXVpcmUod2hlcmUgfHwgcGF0aC5ub3JtYWxpemUoJ3BvbGxlbi5qc29uJykpXG4gIGxldCBnb3QgPSBhbnRoZXJzLm1hcChzZWxlY3QgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygc2VsZWN0ID09PSAnc3RyaW5nJyA/IGZsYW1lbnRzW3NlbGVjdF0gOiBzZWxlY3QgLy8gb2JqZWN0IGFzc3VtZWRcbiAgfSlcbiAgcmV0dXJuIHNvdXJjZWdhdGUoZ290KVxufVxuIl19