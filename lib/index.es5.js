'use strict';

exports.__esModule = true;
exports.gulpIsHelpful = gulpIsHelpful;
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

function pollen(anthers, where) {
  var flaments = require(where || _path2['default'].normalize('../src/pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select // object assumed
    ;
  });
  return (0, _sourcegate2['default'])(got);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFRZ0IsYUFBYSxHQUFiLGFBQWE7UUFJYixNQUFNLEdBQU4sTUFBTTs7OztxQkFWUixPQUFPOzs7O29CQUNKLE1BQU07Ozs7MEJBQ0EsWUFBWTs7OztBQUpuQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7QUFNaEMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTs7UUFBdkQsR0FBRyxHQUFILEdBQUc7O0FBRVQsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ2xDLFNBQU8sbUJBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxtQkFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Q0FDMUQ7O0FBRU0sU0FBUyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUNyQyxNQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLGtCQUFLLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUE7QUFDckUsTUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM5QixXQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTTtBQUFBLEtBQUE7R0FDOUQsQ0FBQyxDQUFBO0FBQ0YsU0FBTyw2QkFBVyxHQUFHLENBQUMsQ0FBQTtDQUN2QiIsImZpbGUiOiJpbmRleC5lczUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0IFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcblxuZXhwb3J0IGNvbnN0IHBrZyA9IHJlcXVpcmUocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwYWNrYWdlLmpzb24nKSlcblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBJc0hlbHBmdWwoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbihhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCcuLi9zcmMvcG9sbGVuLmpzb24nKSlcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=