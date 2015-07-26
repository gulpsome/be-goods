'use strict';

exports.__esModule = true;
exports.gulpIsHelpful = gulpIsHelpful;
exports.gulpHelpify = gulpHelpify;
exports.gulpTask = gulpTask;
exports.pollen = pollen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpHelp = require('gulp-help');

var _gulpHelp2 = _interopRequireDefault(_gulpHelp);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

require('source-map-support').install();

global.console.warn('Please use the be-goods module, stamina will be repurposed.');

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
  return gulp.task.apply(gulp, _toConsumableArray(args));
}

function pollen(anthers, where) {
  var flaments = require(where || _path2['default'].normalize('../src/pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select // object assumed
    ;
  });
  return (0, _sourcegate2['default'])(got);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFXZ0IsYUFBYSxHQUFiLGFBQWE7UUFJYixXQUFXLEdBQVgsV0FBVztRQUtYLFFBQVEsR0FBUixRQUFRO1FBS1IsTUFBTSxHQUFOLE1BQU07Ozs7OztxQkF2QlIsT0FBTzs7OztvQkFDSixNQUFNOzs7O3dCQUNOLFdBQVc7Ozs7MEJBQ0wsWUFBWTs7OztBQUxuQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7QUFPdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkRBQTZELENBQUMsQ0FBQTs7QUFFM0UsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTs7UUFBdkQsR0FBRyxHQUFILEdBQUc7O0FBRVQsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ2xDLFNBQU8sbUJBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxtQkFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Q0FDMUQ7O0FBRU0sU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN0QyxTQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsMkJBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0NBQ3JEOzs7O0FBR00sU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQVc7b0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNoRCxNQUFJLElBQUksR0FBRyxBQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDdEYsU0FBTyxJQUFJLENBQUMsSUFBSSxNQUFBLENBQVQsSUFBSSxxQkFBUyxJQUFJLEVBQUMsQ0FBQTtDQUMxQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLE1BQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksa0JBQUssU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUNyRSxNQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzlCLFdBQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNO0FBQUEsS0FBQTtHQUM5RCxDQUFDLENBQUE7QUFDRixTQUFPLDZCQUFXLEdBQUcsQ0FBQyxDQUFBO0NBQ3ZCIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuXG5nbG9iYWwuY29uc29sZS53YXJuKCdQbGVhc2UgdXNlIHRoZSBiZS1nb29kcyBtb2R1bGUsIHN0YW1pbmEgd2lsbCBiZSByZXB1cnBvc2VkLicpXG5cbmV4cG9ydCBjb25zdCBwa2cgPSByZXF1aXJlKHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncGFja2FnZS5qc29uJykpXG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSXNIZWxwZnVsKGd1bHApIHtcbiAgcmV0dXJuIFIuaXMoT2JqZWN0LCBSLnBhdGgoWydoZWxwJywgJ2hlbHAnXSwgZ3VscC50YXNrcykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSGVscGlmeShndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrKGd1bHAsIG5hbWUsIGRlc2MsIC4uLnJlc3QpIHtcbiAgbGV0IGFyZ3MgPSAoZ3VscElzSGVscGZ1bChndWxwKSkgPyBbXS5jb25jYXQobmFtZSwgZGVzYywgcmVzdCkgOiBbXS5jb25jYXQobmFtZSwgcmVzdClcbiAgcmV0dXJuIGd1bHAudGFzayguLi5hcmdzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9sbGVuKGFudGhlcnMsIHdoZXJlKSB7XG4gIGxldCBmbGFtZW50cyA9IHJlcXVpcmUod2hlcmUgfHwgcGF0aC5ub3JtYWxpemUoJy4uL3NyYy9wb2xsZW4uanNvbicpKVxuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cbiJdfQ==