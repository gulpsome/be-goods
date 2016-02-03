'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.pkg = undefined;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
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

function isLocal(name) {
  var dep = _ramda2.default.has(name);
  return dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {});
}

function myRequire(name) {
  var where = _path2.default.normalize(process.cwd() + '/node_modules/' + name);
  return require(_path2.default.join(where, require(_path2.default.join(where, 'package.json')).main));
}

var logger = exports.logger = _tracer2.default.console({
  'filters': { 'log': _chalk2.default.green, 'warn': _chalk2.default.yellow, 'error': _chalk2.default.red },
  'format': '<' + pkg.name + ' using {{path}}:{{line}}>\n{{message}}\n'
});

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztRQVdnQjtRQUtBO1FBVUE7UUFJQTtRQUtBO1FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbENULElBQU0sb0JBQU0sUUFBUSxlQUFLLElBQUwsQ0FBVSxRQUFRLEdBQVIsRUFBVixFQUF5QixjQUF6QixDQUFSLENBQU47O0FBRU4sU0FBUyxPQUFULENBQWlCLElBQWpCLEVBQXVCO0FBQzVCLE1BQUksTUFBTSxnQkFBRSxHQUFGLENBQU0sSUFBTixDQUFOLENBRHdCO0FBRTVCLFNBQU8sSUFBSSxJQUFJLFlBQUosSUFBb0IsRUFBcEIsQ0FBSixJQUErQixJQUFJLElBQUksZUFBSixJQUF1QixFQUF2QixDQUFuQyxDQUZxQjtDQUF2Qjs7QUFLQSxTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUI7QUFDOUIsTUFBSSxRQUFRLGVBQUssU0FBTCxDQUFrQixRQUFRLEdBQVIsd0JBQThCLElBQWhELENBQVIsQ0FEMEI7QUFFOUIsU0FBTyxRQUFRLGVBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsUUFBUSxlQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLGNBQWpCLENBQVIsRUFBMEMsSUFBMUMsQ0FBekIsQ0FBUCxDQUY4QjtDQUF6Qjs7QUFLQSxJQUFJLDBCQUFTLGlCQUFPLE9BQVAsQ0FBZTtBQUNqQyxhQUFXLEVBQUMsT0FBTyxnQkFBTSxLQUFOLEVBQWEsUUFBUSxnQkFBTSxNQUFOLEVBQWMsU0FBUyxnQkFBTSxHQUFOLEVBQS9EO0FBQ0Esa0JBQWMsSUFBSSxJQUFKLDZDQUFkO0NBRmtCLENBQVQ7O0FBS0osU0FBUyxhQUFULENBQXVCLElBQXZCLEVBQTZCO0FBQ2xDLFNBQU8sZ0JBQUUsRUFBRixDQUFLLE1BQUwsRUFBYSxnQkFBRSxJQUFGLENBQU8sQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUFQLEVBQXlCLEtBQUssS0FBTCxDQUF0QyxDQUFQLENBRGtDO0NBQTdCOztBQUlBLFNBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEyQixJQUEzQixFQUFpQztBQUN0QyxTQUFPLGNBQWMsSUFBZCxJQUFzQixJQUF0QixHQUE2Qix3QkFBSyxJQUFMLEVBQVcsSUFBWCxDQUE3QixDQUQrQjtDQUFqQzs7O0FBS0EsU0FBUyxRQUFULENBQWtCLElBQWxCLEVBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBQTZDO29DQUFOOztHQUFNOztBQUNsRCxNQUFJLE9BQU8sYUFBQyxDQUFjLElBQWQsQ0FBRCxHQUF3QixHQUFHLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLElBQXRCLENBQXhCLEdBQXNELEdBQUcsTUFBSCxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsQ0FBdEQsQ0FEdUM7QUFFbEQsU0FBTyxLQUFLLElBQUwsZ0NBQWEsS0FBYixDQUFQLENBRmtEO0NBQTdDOzs7OztBQVFBLFNBQVMsTUFBVCxDQUFnQixPQUFoQixFQUF5QixLQUF6QixFQUFnQztBQUNyQyxNQUFJLFdBQVcsUUFBUSxTQUFTLGVBQUssU0FBTCxDQUFlLGFBQWYsQ0FBVCxDQUFuQixDQURpQztBQUVyQyxNQUFJLE1BQU0sUUFBUSxHQUFSLENBQVksa0JBQVU7QUFDOUIsV0FBTyxPQUFPLE1BQVAsS0FBa0IsUUFBbEIsR0FBNkIsU0FBUyxNQUFULENBQTdCLEdBQWdELE1BQWhEO0FBRHVCLEdBQVYsQ0FBbEIsQ0FGaUM7QUFLckMsU0FBTywwQkFBVyxHQUFYLENBQVAsQ0FMcUM7Q0FBaEMiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBoZWxwIGZyb20gJ2d1bHAtaGVscCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgdHJhY2VyIGZyb20gJ3RyYWNlcidcblxuZXhwb3J0IGNvbnN0IHBrZyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKSlcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9jYWwobmFtZSkge1xuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgcmV0dXJuIGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG15UmVxdWlyZShuYW1lKSB7XG4gIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9L25vZGVfbW9kdWxlcy8ke25hbWV9YClcbiAgcmV0dXJuIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluKSlcbn1cblxuZXhwb3J0IGxldCBsb2dnZXIgPSB0cmFjZXIuY29uc29sZSh7XG4gICdmaWx0ZXJzJzogeydsb2cnOiBjaGFsay5ncmVlbiwgJ3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICdmb3JtYXQnOiBgPCR7cGtnLm5hbWV9IHVzaW5nIHt7cGF0aH19Ont7bGluZX19Plxcbnt7bWVzc2FnZX19XFxuYFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBJc0hlbHBmdWwoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBIZWxwaWZ5KGd1bHAsIG9wdHMpIHtcbiAgcmV0dXJuIGd1bHBJc0hlbHBmdWwoZ3VscCkgPyBndWxwIDogaGVscChndWxwLCBvcHRzKVxufVxuXG4vLyBIZWxwZnVsIHRhc2sgY3JlYXRpb24uICBUaGUgZ2l2ZW4gZGVzYyBpcyBkaXNjYXJkZWQgaWYgZ3VscCBpc24ndCBndWxwLWhlbHAgXCJoZWxwZnVsXCIuXG5leHBvcnQgZnVuY3Rpb24gZ3VscFRhc2soZ3VscCwgbmFtZSwgZGVzYywgLi4ucmVzdCkge1xuICBsZXQgYXJncyA9IChndWxwSXNIZWxwZnVsKGd1bHApKSA/IFtdLmNvbmNhdChuYW1lLCBkZXNjLCByZXN0KSA6IFtdLmNvbmNhdChuYW1lLCByZXN0KVxuICByZXR1cm4gZ3VscC50YXNrKC4uLmFyZ3MpXG59XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3VscHNvbWUvZ3VscC1oYXJwIGFib3V0IGhvdyB0byBwb2xsaW5hdGUgb3B0aW9ucy5cbi8vIE9yaWdpbmFsbHkgdGhlIGRlZmF1bHRzIHdlcmUgaGVyZSBpbiBwb2xsZW4uanNvbiBidXQgdGhhdCBmZWx0IHdyb25nIGFuZCBnb3QgbW92ZWQuXG4vLyBTaW5jZSB0aGVyZSBhcmUgbm8gb3RoZXIgdXNlIGNhc2VzIGZvciB0aGlzIHNvIGZhciwgaXQgZG9lc24ndCBzZWVtIHZlcnkgdXNlZnVsLlxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbihhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCdwb2xsZW4uanNvbicpKVxuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cbiJdfQ==