'use strict';

exports.__esModule = true;
exports.gulpIsHelpful = gulpIsHelpful;
exports.gulpTask = gulpTask;
exports.pollen = pollen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

require('source-map-support').install();

var pkg = require(_path2['default'].join(process.cwd(), 'package.json'));

exports.pkg = pkg;

function gulpIsHelpful(gulp) {
  return _ramda2['default'].is(Object, _ramda2['default'].path(['help', 'help'], gulp.tasks));
}

// Helpful task creation.  The given help is discarded if gulp isn't gulp-help "helpful".

function gulpTask(gulp, name, help) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var args = gulpIsHelpful(gulp) ? [].concat(name, help, rest) : [].concat(name, rest);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFRZ0IsYUFBYSxHQUFiLGFBQWE7UUFLYixRQUFRLEdBQVIsUUFBUTtRQUtSLE1BQU0sR0FBTixNQUFNOzs7O3FCQWhCUixPQUFPOzs7O29CQUNKLE1BQU07Ozs7MEJBQ0EsWUFBWTs7OztBQUpuQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7QUFNaEMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTs7UUFBdkQsR0FBRyxHQUFILEdBQUc7O0FBRVQsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ2xDLFNBQU8sbUJBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxtQkFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Q0FDMUQ7Ozs7QUFHTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBVztvQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ2hELE1BQUksSUFBSSxHQUFHLEFBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN0RixTQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtDQUNuQzs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLE1BQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksa0JBQUssU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUNyRSxNQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzlCLFdBQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNO0FBQUEsS0FBQTtHQUM5RCxDQUFDLENBQUE7QUFDRixTQUFPLDZCQUFXLEdBQUcsQ0FBQyxDQUFBO0NBQ3ZCIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bChndWxwKSB7XG4gIHJldHVybiBSLmlzKE9iamVjdCwgUi5wYXRoKFsnaGVscCcsICdoZWxwJ10sIGd1bHAudGFza3MpKVxufVxuXG4vLyBIZWxwZnVsIHRhc2sgY3JlYXRpb24uICBUaGUgZ2l2ZW4gaGVscCBpcyBkaXNjYXJkZWQgaWYgZ3VscCBpc24ndCBndWxwLWhlbHAgXCJoZWxwZnVsXCIuXG5leHBvcnQgZnVuY3Rpb24gZ3VscFRhc2soZ3VscCwgbmFtZSwgaGVscCwgLi4ucmVzdCkge1xuICBsZXQgYXJncyA9IChndWxwSXNIZWxwZnVsKGd1bHApKSA/IFtdLmNvbmNhdChuYW1lLCBoZWxwLCByZXN0KSA6IFtdLmNvbmNhdChuYW1lLCByZXN0KVxuICByZXR1cm4gZ3VscC50YXNrLmFwcGx5KGd1bHAsIGFyZ3MpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb2xsZW4oYW50aGVycywgd2hlcmUpIHtcbiAgbGV0IGZsYW1lbnRzID0gcmVxdWlyZSh3aGVyZSB8fCBwYXRoLm5vcm1hbGl6ZSgnLi4vc3JjL3BvbGxlbi5qc29uJykpXG4gIGxldCBnb3QgPSBhbnRoZXJzLm1hcChzZWxlY3QgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygc2VsZWN0ID09PSAnc3RyaW5nJyA/IGZsYW1lbnRzW3NlbGVjdF0gOiBzZWxlY3QgLy8gb2JqZWN0IGFzc3VtZWRcbiAgfSlcbiAgcmV0dXJuIHNvdXJjZWdhdGUoZ290KVxufVxuIl19