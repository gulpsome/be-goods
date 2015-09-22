'use strict';

exports.__esModule = true;
exports.isLocal = isLocal;
exports.myRequire = myRequire;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztRQUFPLDZCQUE2Qjs7cUJBRXRCLE9BQU87Ozs7b0JBQ0osTUFBTTs7Ozt3QkFDTixXQUFXOzs7OzBCQUNMLFlBQVk7Ozs7QUFFNUIsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTs7OztBQUU3RCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDNUIsTUFBSSxHQUFHLEdBQUcsbUJBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3JCLFNBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLENBQUE7Q0FDckU7O0FBRU0sU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFO0FBQzlCLE1BQUksS0FBSyxHQUFHLGtCQUFLLFNBQVMsQ0FBSSxPQUFPLENBQUMsR0FBRyxFQUFFLHNCQUFpQixJQUFJLENBQUcsQ0FBQTtBQUNuRSxTQUFPLE9BQU8sQ0FBQyxrQkFBSyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxrQkFBSyxJQUFJLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtDQUNqRjs7QUFFTSxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUU7QUFDbEMsU0FBTyxtQkFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLG1CQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtDQUMxRDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3RDLFNBQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxzQkFBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Q0FDckQ7Ozs7QUFHTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBVztvQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ2hELE1BQUksSUFBSSxHQUFHLEFBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN0RixTQUFPLElBQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLHFCQUFTLElBQUksRUFBQyxDQUFBO0NBQzFCOztBQUVNLFNBQVMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7QUFDckMsTUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxrQkFBSyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBO0FBQ3JFLE1BQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDOUIsV0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQTtHQUM5RCxDQUFDLENBQUE7QUFDRixTQUFPLHdCQUFXLEdBQUcsQ0FBQyxDQUFBO0NBQ3ZCIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2NhbChuYW1lKSB7XG4gIGxldCBkZXAgPSBSLmhhcyhuYW1lKVxuICByZXR1cm4gZGVwKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pIHx8IGRlcChwa2cuZGV2RGVwZW5kZW5jaWVzIHx8IHt9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbXlSZXF1aXJlKG5hbWUpIHtcbiAgbGV0IHdoZXJlID0gcGF0aC5ub3JtYWxpemUoYCR7cHJvY2Vzcy5jd2QoKX0vbm9kZV9tb2R1bGVzLyR7bmFtZX1gKVxuICByZXR1cm4gcmVxdWlyZShwYXRoLmpvaW4od2hlcmUsIHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCAncGFja2FnZS5qc29uJykpLm1haW4pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bChndWxwKSB7XG4gIHJldHVybiBSLmlzKE9iamVjdCwgUi5wYXRoKFsnaGVscCcsICdoZWxwJ10sIGd1bHAudGFza3MpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscEhlbHBpZnkoZ3VscCwgb3B0cykge1xuICByZXR1cm4gZ3VscElzSGVscGZ1bChndWxwKSA/IGd1bHAgOiBoZWxwKGd1bHAsIG9wdHMpXG59XG5cbi8vIEhlbHBmdWwgdGFzayBjcmVhdGlvbi4gIFRoZSBnaXZlbiBkZXNjIGlzIGRpc2NhcmRlZCBpZiBndWxwIGlzbid0IGd1bHAtaGVscCBcImhlbHBmdWxcIi5cbmV4cG9ydCBmdW5jdGlvbiBndWxwVGFzayhndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbihhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCcuLi9zcmMvcG9sbGVuLmpzb24nKSlcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=