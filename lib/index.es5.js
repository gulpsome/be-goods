'use strict';

exports.__esModule = true;
exports.pollen = pollen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

require('source-map-support').install();

var flaments = require(_path2['default'].normalize('../src/pollen.json'));

function pollen(anthers) {
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select // object assumed
    ;
  });
  return (0, _sourcegate2['default'])(got);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFLZ0IsTUFBTSxHQUFOLE1BQU07Ozs7b0JBSkwsTUFBTTs7OzswQkFDQSxZQUFZOzs7O0FBRm5DLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBOztBQUd2QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsa0JBQUssU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTs7QUFFckQsU0FBUyxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQzlCLE1BQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDOUIsV0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU07QUFBQSxLQUFBO0dBQzlELENBQUMsQ0FBQTtBQUNGLFNBQU8sNkJBQVcsR0FBRyxDQUFDLENBQUE7Q0FDdkIiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcbmxldCBmbGFtZW50cyA9IHJlcXVpcmUocGF0aC5ub3JtYWxpemUoJy4uL3NyYy9wb2xsZW4uanNvbicpKVxuXG5leHBvcnQgZnVuY3Rpb24gcG9sbGVuKGFudGhlcnMpIHtcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=