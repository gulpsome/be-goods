'use strict';

exports.__esModule = true;
exports.logger = exports.pkg = undefined;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
exports.req = req;
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
  // console.log(`require ${place}`)
  return require(_path2.default.join(where, main));
}

function req(name) {
  if (isLocal(name)) {
    // local means relative to `process.cwd()`
    return myRequire(name);
  } else {
    if (_ramda2.default.not(_ramda2.default.contains(name, ['hal-rc', 'gulp-cause', 'gulp-npm-run']))) {
      // the above list of exceptions contains modules that will remain bundled as beverage dependencies
      logger.error('Please install ' + name + ' as a devDependency.');
    }
    return myRequire(name, 'node_modules/beverage');
  }
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

//# sourceMappingURL=data:application/json;base64,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QUFULENBQW5CLENBRGtDO0FBRXRDLE1BQUksTUFBTSxRQUFRLEdBQVIsQ0FBWSxrQkFBVTtBQUM5QixXQUFPLE9BQU8sTUFBUCxLQUFrQixRQUFsQixHQUE2QixTQUFTLE1BQVQsQ0FBN0IsR0FBZ0QsTUFBaEQ7QUFEdUIsR0FBVixDQUFsQixDQUZrQztBQUt0QyxTQUFPLDBCQUFXLEdBQVgsQ0FBUCxDQUxzQztDQUFqQyIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcidcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGhlbHAgZnJvbSAnZ3VscC1oZWxwJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB0cmFjZXIgZnJvbSAndHJhY2VyJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgbGV0IGxvZ2dlciA9IHRyYWNlci5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbCAobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgcmV0dXJuIGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG15UmVxdWlyZSAobmFtZSwgaG9tZSA9ICcnKSB7XG4gIGxldCBwbGFjZSA9IGAke2hvbWV9L25vZGVfbW9kdWxlcy8ke25hbWV9YFxuICBsZXQgd2hlcmUgPSBwYXRoLm5vcm1hbGl6ZShgJHtwcm9jZXNzLmN3ZCgpfS8ke3BsYWNlfWApXG4gIGxldCBtYWluID0gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsICdwYWNrYWdlLmpzb24nKSkubWFpblxuICAvLyBjb25zb2xlLmxvZyhgcmVxdWlyZSAke3BsYWNlfWApXG4gIHJldHVybiByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgbWFpbikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXEgKG5hbWUpIHtcbiAgaWYgKGlzTG9jYWwobmFtZSkpIHtcbiAgICAvLyBsb2NhbCBtZWFucyByZWxhdGl2ZSB0byBgcHJvY2Vzcy5jd2QoKWBcbiAgICByZXR1cm4gbXlSZXF1aXJlKG5hbWUpXG4gIH0gZWxzZSB7XG4gICAgaWYgKFIubm90KFIuY29udGFpbnMobmFtZSwgWydoYWwtcmMnLCAnZ3VscC1jYXVzZScsICdndWxwLW5wbS1ydW4nXSkpKSB7XG4gICAgICAvLyB0aGUgYWJvdmUgbGlzdCBvZiBleGNlcHRpb25zIGNvbnRhaW5zIG1vZHVsZXMgdGhhdCB3aWxsIHJlbWFpbiBidW5kbGVkIGFzIGJldmVyYWdlIGRlcGVuZGVuY2llc1xuICAgICAgbG9nZ2VyLmVycm9yKGBQbGVhc2UgaW5zdGFsbCAke25hbWV9IGFzIGEgZGV2RGVwZW5kZW5jeS5gKVxuICAgIH1cbiAgICByZXR1cm4gbXlSZXF1aXJlKG5hbWUsICdub2RlX21vZHVsZXMvYmV2ZXJhZ2UnKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSXNIZWxwZnVsIChndWxwKSB7XG4gIHJldHVybiBSLmlzKE9iamVjdCwgUi5wYXRoKFsnaGVscCcsICdoZWxwJ10sIGd1bHAudGFza3MpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscEhlbHBpZnkgKGd1bHAsIG9wdHMpIHtcbiAgcmV0dXJuIGd1bHBJc0hlbHBmdWwoZ3VscCkgPyBndWxwIDogaGVscChndWxwLCBvcHRzKVxufVxuXG4vLyBIZWxwZnVsIHRhc2sgY3JlYXRpb24uICBUaGUgZ2l2ZW4gZGVzYyBpcyBkaXNjYXJkZWQgaWYgZ3VscCBpc24ndCBndWxwLWhlbHAgXCJoZWxwZnVsXCIuXG5leHBvcnQgZnVuY3Rpb24gZ3VscFRhc2sgKGd1bHAsIG5hbWUsIGRlc2MsIC4uLnJlc3QpIHtcbiAgbGV0IGFyZ3MgPSAoZ3VscElzSGVscGZ1bChndWxwKSkgPyBbXS5jb25jYXQobmFtZSwgZGVzYywgcmVzdCkgOiBbXS5jb25jYXQobmFtZSwgcmVzdClcbiAgcmV0dXJuIGd1bHAudGFzayguLi5hcmdzKVxufVxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2d1bHBzb21lL2d1bHAtaGFycCBhYm91dCBob3cgdG8gcG9sbGluYXRlIG9wdGlvbnMuXG4vLyBPcmlnaW5hbGx5IHRoZSBkZWZhdWx0cyB3ZXJlIGhlcmUgaW4gcG9sbGVuLmpzb24gYnV0IHRoYXQgZmVsdCB3cm9uZyBhbmQgZ290IG1vdmVkLlxuLy8gU2luY2UgdGhlcmUgYXJlIG5vIG90aGVyIHVzZSBjYXNlcyBmb3IgdGhpcyBzbyBmYXIsIGl0IGRvZXNuJ3Qgc2VlbSB2ZXJ5IHVzZWZ1bC5cbmV4cG9ydCBmdW5jdGlvbiBwb2xsZW4gKGFudGhlcnMsIHdoZXJlKSB7XG4gIGxldCBmbGFtZW50cyA9IHJlcXVpcmUod2hlcmUgfHwgcGF0aC5ub3JtYWxpemUoJ3BvbGxlbi5qc29uJykpXG4gIGxldCBnb3QgPSBhbnRoZXJzLm1hcChzZWxlY3QgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygc2VsZWN0ID09PSAnc3RyaW5nJyA/IGZsYW1lbnRzW3NlbGVjdF0gOiBzZWxlY3QgLy8gb2JqZWN0IGFzc3VtZWRcbiAgfSlcbiAgcmV0dXJuIHNvdXJjZWdhdGUoZ290KVxufVxuIl19