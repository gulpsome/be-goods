'use strict';

exports.__esModule = true;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
exports.console = console;
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

function console(opts) {
  return require('tracer').console(opts || {
    'filters': { 'log': _chalk2['default'].green, 'warn': _chalk2['default'].yellow, 'error': _chalk2['default'].red },
    'format': '<' + pkg.name + ' using {{path}}:{{line}}>\n{{message}}\n'
  });
}

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7UUFBTyw2QkFBNkI7O3FCQUV0QixPQUFPOzs7O29CQUNKLE1BQU07Ozs7d0JBQ04sV0FBVzs7OzswQkFDTCxZQUFZOzs7O3FCQUNqQixPQUFPOzs7O0FBRWxCLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxrQkFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUE7Ozs7QUFFN0QsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQzVCLE1BQUksR0FBRyxHQUFHLG1CQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNyQixTQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0NBQ3JFOztBQUVNLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRTtBQUM5QixNQUFJLEtBQUssR0FBRyxrQkFBSyxTQUFTLENBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxzQkFBaUIsSUFBSSxDQUFHLENBQUE7QUFDbkUsU0FBTyxPQUFPLENBQUMsa0JBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsa0JBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7Q0FDakY7O0FBRU0sU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQzVCLFNBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUk7QUFDdkMsYUFBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLG1CQUFNLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQU0sTUFBTSxFQUFFLE9BQU8sRUFBRSxtQkFBTSxHQUFHLEVBQUM7QUFDekUsWUFBUSxRQUFNLEdBQUcsQ0FBQyxJQUFJLDZDQUEwQztHQUNqRSxDQUFDLENBQUE7Q0FDSDs7QUFFTSxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUU7QUFDbEMsU0FBTyxtQkFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLG1CQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtDQUMxRDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RDLFNBQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxzQkFBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Q0FDckQ7Ozs7QUFHTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBVztvQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ2hELE1BQUksSUFBSSxHQUFHLEFBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN0RixTQUFPLElBQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLHFCQUFTLElBQUksRUFBQyxDQUFBO0NBQzFCOztBQUVNLFNBQVMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDckMsTUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxrQkFBSyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBO0FBQ3JFLE1BQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDOUIsV0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQTtHQUM5RCxDQUFDLENBQUE7QUFDRixTQUFPLHdCQUFXLEdBQUcsQ0FBQyxDQUFBO0NBQ3ZCIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbChuYW1lKSB7XG4gIGxldCBkZXAgPSBSLmhhcyhuYW1lKVxuICByZXR1cm4gZGVwKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pIHx8IGRlcChwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IHt9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbXlSZXF1aXJlKG5hbWUpIHtcbiAgbGV0IHdoZXJlID0gcGF0aC5ub3JtYWxpemUoYCR7cHJvY2Vzcy5jd2QoKX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gKVxuICByZXR1cm4gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCAncGFja2FnZS5qc29uJykpLm1haW4pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc29sZShvcHRzKSB7XG4gIHJldHVybiByZXF1aXJlKCd0cmFjZXInKS5jb25zb2xlKG9wdHMgfHwge1xuICAgICdmaWx0ZXJzJzogeydsb2cnOiBjaGFsay5ncmVlbiwgJ3dhcm4nOiBjaGFsay55ZWxsb3csICdlcnJvcic6IGNoYWxrLnJlZH0sXG4gICAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSXNIZWxwZnVsKGd1bHApIHtcbiAgcmV0dXJuIFIuaXMoT2JqZWN0LCBSLnBhdGgoWydoZWxwJywgJ2hlbHAnXSwgZ3VscC50YXNrcykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSGVscGlmeShndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrKGd1bHAsIG5hbWUsIGRlc2MsIC4uLnJlc3QpIHtcbiAgbGV0IGFyZ3MgPSAoZ3VscElzSGVscGZ1bChndWxwKSkgPyBbXS5jb25jYXQobmFtZSwgZGVzYywgcmVzdCkgOiBbXS5jb25jYXQobmFtZSwgcmVzdClcbiAgcmV0dXJuIGd1bHAudGFzayguLi5hcmdzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9sbGVuKGFudGhlcnMsIHdoZXJlKSB7XG4gIGxldCBmbGFtZW50cyA9IHJlcXVpcmUod2hlcmUgfHwgcGF0aC5ub3JtYWxpemUoJy4uL3NyYy9wb2xsZW4uanNvbicpKVxuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cbiJdfQ==