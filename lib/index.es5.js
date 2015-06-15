'use strict';

exports.__esModule = true;
exports.gulpIsHelpful = gulpIsHelpful;
exports.gulpHelpify = gulpHelpify;
exports.gulpTask = gulpTask;
exports.pollen = pollen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpHelp = require('gulp-help');

var _gulpHelp2 = _interopRequireDefault(_gulpHelp);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

require('source-map-support').install();

var pkg = require(_path2['default'].join(process.cwd(), 'package.json'));

exports.pkg = pkg;

function gulpIsHelpful(gulp) {
  return _ramda2['default'].is(Object, _ramda2['default'].path(['help', 'help'], gulp.tasks));
}

function gulpHelpify(gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : (0, _gulpHelp2['default'])(gulp, opts);
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".

function gulpTask(gulp, name, desc) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var args = gulpIsHelpful(gulp) ? [].concat(name, desc, rest) : [].concat(name, rest);
  return gulp.task.apply(gulp, args);
}

function pollen(anthers, where) {
  var flaments = require(where || _path2['default'].normalize('../src/pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select // object assumed
    ;
  });
  return (0, _sourcegate2['default'])(got);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFTZ0IsYUFBYSxHQUFiLGFBQWE7UUFJYixXQUFXLEdBQVgsV0FBVztRQUtYLFFBQVEsR0FBUixRQUFRO1FBS1IsTUFBTSxHQUFOLE1BQU07Ozs7cUJBckJSLE9BQU87Ozs7b0JBQ0osTUFBTTs7Ozt3QkFDTixXQUFXOzs7OzBCQUNMLFlBQVk7Ozs7QUFMbkMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7O0FBT2hDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxrQkFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUE7O1FBQXZELEdBQUcsR0FBSCxHQUFHOztBQUVULFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRTtBQUNsQyxTQUFPLG1CQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsbUJBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0NBQzFEOztBQUVNLFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDdEMsU0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLDJCQUFLLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtDQUNyRDs7OztBQUdNLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFXO29DQUFOLElBQUk7QUFBSixRQUFJOzs7QUFDaEQsTUFBSSxJQUFJLEdBQUcsQUFBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3RGLFNBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0NBQ25DOztBQUVNLFNBQVMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDckMsTUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxrQkFBSyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBO0FBQ3JFLE1BQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDOUIsV0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU07QUFBQSxLQUFBO0dBQzlELENBQUMsQ0FBQTtBQUNGLFNBQU8sNkJBQVcsR0FBRyxDQUFDLENBQUE7Q0FDdkIiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBoZWxwIGZyb20gJ2d1bHAtaGVscCdcbmltcG9ydCBzb3VyY2VnYXRlIGZyb20gJ3NvdXJjZWdhdGUnXG5cbmV4cG9ydCBjb25zdCBwa2cgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncGFja2FnZS5qc29uJykpXG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSXNIZWxwZnVsKGd1bHApIHtcbiAgcmV0dXJuIFIuaXMoT2JqZWN0LCBSLnBhdGgoWydoZWxwJywgJ2hlbHAnXSwgZ3VscC50YXNrcykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSGVscGlmeShndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrKGd1bHAsIG5hbWUsIGRlc2MsIC4uLnJlc3QpIHtcbiAgbGV0IGFyZ3MgPSAoZ3VscElzSGVscGZ1bChndWxwKSkgPyBbXS5jb25jYXQobmFtZSwgZGVzYywgcmVzdCkgOiBbXS5jb25jYXQobmFtZSwgcmVzdClcbiAgcmV0dXJuIGd1bHAudGFzay5hcHBseShndWxwLCBhcmdzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9sbGVuKGFudGhlcnMsIHdoZXJlKSB7XG4gIGxldCBmbGFtZW50cyA9IHJlcXVpcmUod2hlcmUgfHwgcGF0aC5ub3JtYWxpemUoJy4uL3NyYy9wb2xsZW4uanNvbicpKVxuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cbiJdfQ==