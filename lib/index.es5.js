'use strict';

exports.__esModule = true;
exports.pollen = pollen;
exports.pollinateHarp = pollinateHarp;

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

function pollinateHarp(o) {
  if (!o.harp) return {};
  // infer what pollen is wanted
  var anthers = ['harp'];
  if (o.harp.sync) anthers.push('harp-sync');
  anthers.push(o);
  // harp options
  return pollen(anthers);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFNZ0IsTUFBTSxHQUFOLE1BQU07UUFPTixhQUFhLEdBQWIsYUFBYTs7OztvQkFYWixNQUFNOzs7OzBCQUNBLFlBQVk7Ozs7QUFIbkMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7O0FBSXZDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxrQkFBSyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFBOztBQUVyRCxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDOUIsTUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM5QixXQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTTtBQUFBLEtBQUE7R0FDOUQsQ0FBQyxDQUFBO0FBQ0YsU0FBTyw2QkFBVyxHQUFHLENBQUMsQ0FBQTtDQUN2Qjs7QUFFTSxTQUFTLGFBQWEsQ0FBQyxDQUFDLEVBQUU7QUFDL0IsTUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUE7O0FBRXRCLE1BQUksT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDdEIsTUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzFDLFNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7O0FBRWYsU0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7Q0FDdkIiLCJmaWxlIjoiaW5kZXguZXM1LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgc291cmNlZ2F0ZSBmcm9tICdzb3VyY2VnYXRlJ1xubGV0IGZsYW1lbnRzID0gcmVxdWlyZShwYXRoLm5vcm1hbGl6ZSgnLi4vc3JjL3BvbGxlbi5qc29uJykpXG5cbmV4cG9ydCBmdW5jdGlvbiBwb2xsZW4oYW50aGVycykge1xuICBsZXQgZ290ID0gYW50aGVycy5tYXAoc2VsZWN0ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdCA9PT0gJ3N0cmluZycgPyBmbGFtZW50c1tzZWxlY3RdIDogc2VsZWN0IC8vIG9iamVjdCBhc3N1bWVkXG4gIH0pXG4gIHJldHVybiBzb3VyY2VnYXRlKGdvdClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvbGxpbmF0ZUhhcnAobykge1xuICBpZiAoIW8uaGFycCkgcmV0dXJuIHt9XG4gIC8vIGluZmVyIHdoYXQgcG9sbGVuIGlzIHdhbnRlZFxuICBsZXQgYW50aGVycyA9IFsnaGFycCddXG4gIGlmIChvLmhhcnAuc3luYykgYW50aGVycy5wdXNoKCdoYXJwLXN5bmMnKVxuICBhbnRoZXJzLnB1c2gobylcbiAgLy8gaGFycCBvcHRpb25zXG4gIHJldHVybiBwb2xsZW4oYW50aGVycylcbn1cbiJdfQ==