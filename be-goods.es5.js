'use strict';

exports.__esModule = true;
exports.logger = exports.pkg = undefined;
exports.isLocal = isLocal;
exports.prefquire = prefquire;
exports.myRequire = myRequire;
exports.isSmth = isSmth;
exports.isGulp = isGulp;
exports.gulpIsHelpful = gulpIsHelpful;
exports.gulpHelpify = gulpHelpify;
exports.gulpTask = gulpTask;

require('source-map-support/register');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpHelp = require('gulp-help');

var _gulpHelp2 = _interopRequireDefault(_gulpHelp);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tracer = require('tracer');

var _tracer2 = _interopRequireDefault(_tracer);

var _isThere = require('is-there');

var _isThere2 = _interopRequireDefault(_isThere);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var pkg = exports.pkg = require(_path2.default.join(process.cwd(), 'package.json'));

var logger = exports.logger = _tracer2.default.console({
  'filters': { 'log': _chalk2.default.green, 'warn': _chalk2.default.yellow, 'error': _chalk2.default.red },
  'format': '<' + pkg.name + ' using {{path}}:{{line}}>\n{{message}}\n'
});

function myRequirePath(name) {
  var home = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var place = _path2.default.join(home, 'node_modules/' + name);
  var where = _path2.default.normalize(process.cwd() + '/' + place);
  try {
    // console.log(`Requiring: ${where}`)
    var main = require(_path2.default.join(where, 'package.json')).main || 'index.js';
    return _path2.default.join(where, main);
  } catch (e) {
    return undefined;
  }
}

function isLocal(name) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var o = {};
  o.strict = opts === true || opts.strict || false; // opts === true is strict
  var dep = _ramda2.default.has(name);
  var isDependency = dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {});
  var exists = o.strict ? (0, _isThere2.default)(myRequirePath('gulp')) : true;
  return isDependency && exists;
}

function prefquireHow(o) {
  o.module = o.module || 'beverage';
  o.locate = o.locate || 'node_modules/' + o.module;
  o.dev = o.dev || false;
  o.throwOnError = o.throwOnError || true;
  o.exitOnError = o.exitOnError || false; // uncaught throw will cause exit anyway
  return o;
}

function prefquire() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var def = prefquireHow(opts);

  return function (name) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var o = prefquireHow(_ramda2.default.merge(def, opts)); // override-able defaults
    var elsewhere = o.forceLocal || isLocal(name) ? undefined : o.locate;
    try {
      // undefined = local means relative to `process.cwd()` it's expected to be
      // elsewhere is to `locate` it in a default `module`'s dependencies`
      return require(myRequirePath(name, elsewhere));
    } catch (e) {
      var dependency = o.dev ? 'devDependency' : 'dependency';
      var wordLocal = o.forceLocal ? 'local ' : '';
      console.error(_chalk2.default.red('Could not find or require module ' + name + '!'));
      console.error('Please install ' + name + ' as a ' + wordLocal + dependency + '.');
      if (o.throwOnError) {
        throw new Error(e);
      }
      if (o.exitOnError) {
        process.exit(1);
      }
    }
  };
}

// TODO: deprecate / refactor?
// Its only value is perhaps:
// 1. being more concise than prefquire setup (just one call, minimum args)
// 2. able to require a module from somewhere without trying locally first
// if kept, refactor it to use prefquire...
function myRequire(name) {
  var home = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  console.warn(_chalk2.default.red('Please look at the prefquire function instead.'));
  console.warn('Not sure what the future of myRequire will hold...');
  return require(myRequirePath(name, home));
}

function isSmth(o, what) {
  if (((o || {}).constructor || {}).name === what) {
    return true;
  } else {
    return false;
  }
}

function isGulp(o) {
  return isSmth(o, 'Gulp');
}

function gulpIsHelpful(gulp) {
  return _ramda2.default.is(Object, _ramda2.default.path(['help', 'help'], gulp.tasks));
}

function gulpHelpify(gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : (0, _gulpHelp2.default)(gulp, opts);
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".
function gulpTask(gulp, name, desc) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var args = gulpIsHelpful(gulp) ? [].concat(name, desc, rest) : [].concat(name, rest);
  return gulp.task.apply(gulp, _toConsumableArray(args));
}

//# sourceMappingURL=data:application/json;base64,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TCxFQUFhLGdCQUFFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxNQUFULENBQVAsRUFBeUIsS0FBSyxLQUE5QixDQUFiLENBQVA7QUFDRDs7QUFFTSxTQUFTLFdBQVQsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFBa0M7QUFDdkMsU0FBTyxjQUFjLElBQWQsSUFBc0IsSUFBdEIsR0FBNkIsd0JBQUssSUFBTCxFQUFXLElBQVgsQ0FBcEM7QUFDRDs7O0FBR00sU0FBUyxRQUFULENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQThDO0FBQUEsb0NBQU4sSUFBTTtBQUFOLFFBQU07QUFBQTs7QUFDbkQsTUFBSSxPQUFRLGNBQWMsSUFBZCxDQUFELEdBQXdCLEdBQUcsTUFBSCxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsQ0FBeEIsR0FBc0QsR0FBRyxNQUFILENBQVUsSUFBVixFQUFnQixJQUFoQixDQUFqRTtBQUNBLFNBQU8sS0FBSyxJQUFMLGdDQUFhLElBQWIsRUFBUDtBQUNEIiwiZmlsZSI6ImJlLWdvb2RzLmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgdHJhY2VyIGZyb20gJ3RyYWNlcidcbmltcG9ydCBpc1RoZXJlIGZyb20gJ2lzLXRoZXJlJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgbGV0IGxvZ2dlciA9IHRyYWNlci5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5mdW5jdGlvbiBteVJlcXVpcmVQYXRoIChuYW1lLCBob21lID0gJycpIHtcbiAgbGV0IHBsYWNlID0gcGF0aC5qb2luKGhvbWUsIGBub2RlX21vZHVsZXMvJHtuYW1lfWApXG4gIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9LyR7cGxhY2V9YClcbiAgdHJ5IHtcbiAgICAvLyBjb25zb2xlLmxvZyhgUmVxdWlyaW5nOiAke3doZXJlfWApXG4gICAgbGV0IG1haW4gPSByZXF1aXJlKHBhdGguam9pbih3aGVyZSwgJ3BhY2thZ2UuanNvbicpKS5tYWluIHx8ICdpbmRleC5qcydcbiAgICByZXR1cm4gcGF0aC5qb2luKHdoZXJlLCBtYWluKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2FsIChuYW1lLCBvcHRzID0ge30pIHtcbiAgbGV0IG8gPSB7fVxuICBvLnN0cmljdCA9IG9wdHMgPT09IHRydWUgfHwgb3B0cy5zdHJpY3QgfHwgZmFsc2UgLy8gb3B0cyA9PT0gdHJ1ZSBpcyBzdHJpY3RcbiAgbGV0IGRlcCA9IFIuaGFzKG5hbWUpXG4gIGxldCBpc0RlcGVuZGVuY3kgPSBkZXAocGtnLmRlcGVuZGVuY2llcyB8fCB7fSkgfHwgZGVwKHBrZy5kZXZEZXBlbmRlbmNpZXMgfHwge30pXG4gIGxldCBleGlzdHMgPSBvLnN0cmljdCA/IGlzVGhlcmUobXlSZXF1aXJlUGF0aCgnZ3VscCcpKSA6IHRydWVcbiAgcmV0dXJuIGlzRGVwZW5kZW5jeSAmJiBleGlzdHNcbn1cblxuZnVuY3Rpb24gcHJlZnF1aXJlSG93IChvKSB7XG4gIG8ubW9kdWxlID0gby5tb2R1bGUgfHwgJ2JldmVyYWdlJ1xuICBvLmxvY2F0ZSA9IG8ubG9jYXRlIHx8IGBub2RlX21vZHVsZXMvJHtvLm1vZHVsZX1gXG4gIG8uZGV2ID0gby5kZXYgfHwgZmFsc2VcbiAgby50aHJvd09uRXJyb3IgPSBvLnRocm93T25FcnJvciB8fCB0cnVlXG4gIG8uZXhpdE9uRXJyb3IgPSBvLmV4aXRPbkVycm9yIHx8IGZhbHNlIC8vIHVuY2F1Z2h0IHRocm93IHdpbGwgY2F1c2UgZXhpdCBhbnl3YXlcbiAgcmV0dXJuIG9cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZWZxdWlyZSAob3B0cyA9IHt9KSB7XG4gIGxldCBkZWYgPSBwcmVmcXVpcmVIb3cob3B0cylcblxuICByZXR1cm4gZnVuY3Rpb24gKG5hbWUsIG9wdHMgPSB7fSkge1xuICAgIGxldCBvID0gcHJlZnF1aXJlSG93KFIubWVyZ2UoZGVmLCBvcHRzKSkgLy8gb3ZlcnJpZGUtYWJsZSBkZWZhdWx0c1xuICAgIGxldCBlbHNld2hlcmUgPSAoby5mb3JjZUxvY2FsIHx8IGlzTG9jYWwobmFtZSkpID8gdW5kZWZpbmVkIDogby5sb2NhdGVcbiAgICB0cnkge1xuICAgICAgLy8gdW5kZWZpbmVkID0gbG9jYWwgbWVhbnMgcmVsYXRpdmUgdG8gYHByb2Nlc3MuY3dkKClgIGl0J3MgZXhwZWN0ZWQgdG8gYmVcbiAgICAgIC8vIGVsc2V3aGVyZSBpcyB0byBgbG9jYXRlYCBpdCBpbiBhIGRlZmF1bHQgYG1vZHVsZWAncyBkZXBlbmRlbmNpZXNgXG4gICAgICByZXR1cm4gcmVxdWlyZShteVJlcXVpcmVQYXRoKG5hbWUsIGVsc2V3aGVyZSkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbGV0IGRlcGVuZGVuY3kgPSBvLmRldiA/ICdkZXZEZXBlbmRlbmN5JyA6ICdkZXBlbmRlbmN5J1xuICAgICAgbGV0IHdvcmRMb2NhbCA9IG8uZm9yY2VMb2NhbCA/ICdsb2NhbCAnIDogJydcbiAgICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsucmVkKGBDb3VsZCBub3QgZmluZCBvciByZXF1aXJlIG1vZHVsZSAke25hbWV9IWApKVxuICAgICAgY29uc29sZS5lcnJvcihgUGxlYXNlIGluc3RhbGwgJHtuYW1lfSBhcyBhICR7d29yZExvY2FsfSR7ZGVwZW5kZW5jeX0uYClcbiAgICAgIGlmIChvLnRocm93T25FcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZSlcbiAgICAgIH1cbiAgICAgIGlmIChvLmV4aXRPbkVycm9yKSB7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBUT0RPOiBkZXByZWNhdGUgLyByZWZhY3Rvcj9cbi8vIEl0cyBvbmx5IHZhbHVlIGlzIHBlcmhhcHM6XG4vLyAxLiBiZWluZyBtb3JlIGNvbmNpc2UgdGhhbiBwcmVmcXVpcmUgc2V0dXAgKGp1c3Qgb25lIGNhbGwsIG1pbmltdW0gYXJncylcbi8vIDIuIGFibGUgdG8gcmVxdWlyZSBhIG1vZHVsZSBmcm9tIHNvbWV3aGVyZSB3aXRob3V0IHRyeWluZyBsb2NhbGx5IGZpcnN0XG4vLyBpZiBrZXB0LCByZWZhY3RvciBpdCB0byB1c2UgcHJlZnF1aXJlLi4uXG5leHBvcnQgZnVuY3Rpb24gbXlSZXF1aXJlIChuYW1lLCBob21lID0gJycpIHtcbiAgY29uc29sZS53YXJuKGNoYWxrLnJlZCgnUGxlYXNlIGxvb2sgYXQgdGhlIHByZWZxdWlyZSBmdW5jdGlvbiBpbnN0ZWFkLicpKVxuICBjb25zb2xlLndhcm4oJ05vdCBzdXJlIHdoYXQgdGhlIGZ1dHVyZSBvZiBteVJlcXVpcmUgd2lsbCBob2xkLi4uJylcbiAgcmV0dXJuIHJlcXVpcmUobXlSZXF1aXJlUGF0aChuYW1lLCBob21lKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU210aCAobywgd2hhdCkge1xuICBpZiAoKChvIHx8IHt9KS5jb25zdHJ1Y3RvciB8fCB7fSkubmFtZSA9PT0gd2hhdCkge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzR3VscCAobykge1xuICByZXR1cm4gaXNTbXRoKG8sICdHdWxwJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBJc0hlbHBmdWwgKGd1bHApIHtcbiAgcmV0dXJuIFIuaXMoT2JqZWN0LCBSLnBhdGgoWydoZWxwJywgJ2hlbHAnXSwgZ3VscC50YXNrcykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWxwSGVscGlmeSAoZ3VscCwgb3B0cykge1xuICByZXR1cm4gZ3VscElzSGVscGZ1bChndWxwKSA/IGd1bHAgOiBoZWxwKGd1bHAsIG9wdHMpXG59XG5cbi8vIEhlbHBmdWwgdGFzayBjcmVhdGlvbi4gIFRoZSBnaXZlbiBkZXNjIGlzIGRpc2NhcmRlZCBpZiBndWxwIGlzbid0IGd1bHAtaGVscCBcImhlbHBmdWxcIi5cbmV4cG9ydCBmdW5jdGlvbiBndWxwVGFzayAoZ3VscCwgbmFtZSwgZGVzYywgLi4ucmVzdCkge1xuICBsZXQgYXJncyA9IChndWxwSXNIZWxwZnVsKGd1bHApKSA/IFtdLmNvbmNhdChuYW1lLCBkZXNjLCByZXN0KSA6IFtdLmNvbmNhdChuYW1lLCByZXN0KVxuICByZXR1cm4gZ3VscC50YXNrKC4uLmFyZ3MpXG59XG4iXX0=