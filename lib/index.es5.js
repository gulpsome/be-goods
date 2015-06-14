'use strict';

exports.__esModule = true;
exports.pollen = pollen;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourcegate = require('sourcegate');

var _sourcegate2 = _interopRequireDefault(_sourcegate);

require('source-map-support').install();

function pollen(anthers, where) {
  var flaments = require(where || _path2['default'].normalize('../src/pollen.json'));
  var got = anthers.map(function (select) {
    return typeof select === 'string' ? flaments[select] : select // object assumed
    ;
  });
  return (0, _sourcegate2['default'])(got);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFLZ0IsTUFBTSxHQUFOLE1BQU07Ozs7b0JBSEwsTUFBTTs7OzswQkFDQSxZQUFZOzs7O0FBSG5DLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBOztBQUtoQyxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLE1BQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksa0JBQUssU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUNyRSxNQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQzlCLFdBQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNO0FBQUEsS0FBQTtHQUM5RCxDQUFDLENBQUE7QUFDRixTQUFPLDZCQUFXLEdBQUcsQ0FBQyxDQUFBO0NBQ3ZCIiwiZmlsZSI6ImluZGV4LmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNvdXJjZWdhdGUgZnJvbSAnc291cmNlZ2F0ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxlbihhbnRoZXJzLCB3aGVyZSkge1xuICBsZXQgZmxhbWVudHMgPSByZXF1aXJlKHdoZXJlIHx8IHBhdGgubm9ybWFsaXplKCcuLi9zcmMvcG9sbGVuLmpzb24nKSlcbiAgbGV0IGdvdCA9IGFudGhlcnMubWFwKHNlbGVjdCA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3QgPT09ICdzdHJpbmcnID8gZmxhbWVudHNbc2VsZWN0XSA6IHNlbGVjdCAvLyBvYmplY3QgYXNzdW1lZFxuICB9KVxuICByZXR1cm4gc291cmNlZ2F0ZShnb3QpXG59XG4iXX0=