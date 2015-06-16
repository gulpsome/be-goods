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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFTZ0IsYUFBYSxHQUFiLGFBQWE7UUFJYixXQUFXLEdBQVgsV0FBVztRQUtYLFFBQVEsR0FBUixRQUFRO1FBS1IsTUFBTSxHQUFOLE1BQU07Ozs7OztxQkFyQlIsT0FBTzs7OztvQkFDSixNQUFNOzs7O3dCQUNOLFdBQVc7Ozs7MEJBQ0wsWUFBWTs7OztBQUxuQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7QUFPaEMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTs7UUFBdkQsR0FBRyxHQUFILEdBQUc7O0FBRVQsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ2xDLFNBQU8sbUJBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxtQkFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Q0FDMUQ7O0FBRU0sU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN0QyxTQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsMkJBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0NBQ3JEOzs7O0FBR00sU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQVc7b0NBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUNoRCxNQUFJLElBQUksR0FBRyxBQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDdEYsU0FBTyxJQUFJLENBQUMsSUFBSSxNQUFBLENBQVQsSUFBSSxxQkFBUyxJQUFJLEVBQUMsQ0FBQTtDQUMxQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLE1BQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksa0JBQUssU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUNyRSxNQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzlCLFdBQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNO0FBQUEsS0FBQTtHQUM5RCxDQUFDLENBQUE7QUFDRixTQUFPLDZCQUFXLEdBQUcsQ0FBQyxDQUFBO0NBQ3ZCIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bChndWxwKSB7XG4gIHJldHVybiBSLmlzKE9iamVjdCwgUi5wYXRoKFsnaGVscCcsICdoZWxwJ10sIGd1bHAudGFza3MpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscEhlbHBpZnkoZ3VscCwgb3B0cykge1xuICByZXR1cm4gZ3VscElzSGVscGZ1bChndWxwKSA/IGd1bHAgOiBoZWxwKGd1bHAsIG9wdHMpXG59XG5cbi8vIEhlbHBmdWwgdGFzayBjcmVhdGlvbi4gIFRoZSBnaXZlbiBkZXNjIGlzIGRpc2NhcmRlZCBpZiBndWxwIGlzbid0IGd1bHAtaGVscCBcImhlbHBmdWxcIi5cbmV4cG9ydCBmdW5jdGlvbiBndWxwVGFzayhndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbihhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCcuLi9zcmMvcG9sbGVuLmpzb24nKSlcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=