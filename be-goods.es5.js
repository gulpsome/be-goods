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
  o.dev = o.dev || false; // is it devDependencies that are expected?
  o.logPath = o.logPath || false; // log each path before trying to require it
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
      var reqPath = myRequirePath(name, elsewhere);
      if (o.logPath) {
        console.log('Requiring: ' + reqPath);
      }
      return require(reqPath);
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

//# sourceMappingURL=data:application/json;base64,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Q0FBaUIsQ0FBakIsRUFBb0I7QUFDekIsU0FBTyxPQUFPLENBQVAsRUFBVSxNQUFWLENBQVA7QUFDRDs7QUFFTSxTQUFTLGFBQVQsQ0FBd0IsSUFBeEIsRUFBOEI7QUFDbkMsU0FBTyxnQkFBRSxFQUFGLENBQUssTUFBTCxFQUFhLGdCQUFFLElBQUYsQ0FBTyxDQUFDLE1BQUQsRUFBUyxNQUFULENBQVAsRUFBeUIsS0FBSyxLQUE5QixDQUFiLENBQVA7QUFDRDs7QUFFTSxTQUFTLFdBQVQsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFBa0M7QUFDdkMsU0FBTyxjQUFjLElBQWQsSUFBc0IsSUFBdEIsR0FBNkIsd0JBQUssSUFBTCxFQUFXLElBQVgsQ0FBcEM7QUFDRDs7O0FBR00sU0FBUyxRQUFULENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQThDO0FBQUEsb0NBQU4sSUFBTTtBQUFOLFFBQU07QUFBQTs7QUFDbkQsTUFBSSxPQUFRLGNBQWMsSUFBZCxDQUFELEdBQXdCLEdBQUcsTUFBSCxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsQ0FBeEIsR0FBc0QsR0FBRyxNQUFILENBQVUsSUFBVixFQUFnQixJQUFoQixDQUFqRTtBQUNBLFNBQU8sS0FBSyxJQUFMLGdDQUFhLElBQWIsRUFBUDtBQUNEIiwiZmlsZSI6ImJlLWdvb2RzLmVzNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJ1xuXG5pbXBvcnQgUiBmcm9tICdyYW1kYSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgaGVscCBmcm9tICdndWxwLWhlbHAnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgdHJhY2VyIGZyb20gJ3RyYWNlcidcbmltcG9ydCBpc1RoZXJlIGZyb20gJ2lzLXRoZXJlJ1xuXG5leHBvcnQgY29uc3QgcGtnID0gcmVxdWlyZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3BhY2thZ2UuanNvbicpKVxuXG5leHBvcnQgbGV0IGxvZ2dlciA9IHRyYWNlci5jb25zb2xlKHtcbiAgJ2ZpbHRlcnMnOiB7J2xvZyc6IGNoYWxrLmdyZWVuLCAnd2Fybic6IGNoYWxrLnllbGxvdywgJ2Vycm9yJzogY2hhbGsucmVkfSxcbiAgJ2Zvcm1hdCc6IGA8JHtwa2cubmFtZX0gdXNpbmcge3twYXRofX06e3tsaW5lfX0+XFxue3ttZXNzYWdlfX1cXG5gXG59KVxuXG5mdW5jdGlvbiBteVJlcXVpcmVQYXRoIChuYW1lLCBob21lID0gJycpIHtcbiAgbGV0IHBsYWNlID0gcGF0aC5qb2luKGhvbWUsIGBub2RlX21vZHVsZXMvJHtuYW1lfWApXG4gIGxldCB3aGVyZSA9IHBhdGgubm9ybWFsaXplKGAke3Byb2Nlc3MuY3dkKCl9LyR7cGxhY2V9YClcbiAgdHJ5IHtcbiAgICBsZXQgbWFpbiA9IHJlcXVpcmUocGF0aC5qb2luKHdoZXJlLCAncGFja2FnZS5qc29uJykpLm1haW4gfHwgJ2luZGV4LmpzJ1xuICAgIHJldHVybiBwYXRoLmpvaW4od2hlcmUsIG1haW4pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9jYWwgKG5hbWUsIG9wdHMgPSB7fSkge1xuICBsZXQgbyA9IHt9XG4gIG8uc3RyaWN0ID0gb3B0cyA9PT0gdHJ1ZSB8fCBvcHRzLnN0cmljdCB8fCBmYWxzZSAvLyBvcHRzID09PSB0cnVlIGlzIHN0cmljdFxuICBsZXQgZGVwID0gUi5oYXMobmFtZSlcbiAgbGV0IGlzRGVwZW5kZW5jeSA9IGRlcChwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSB8fCBkZXAocGtnLmRldkRlcGVuZGVuY2llcyB8fCB7fSlcbiAgbGV0IGV4aXN0cyA9IG8uc3RyaWN0ID8gaXNUaGVyZShteVJlcXVpcmVQYXRoKCdndWxwJykpIDogdHJ1ZVxuICByZXR1cm4gaXNEZXBlbmRlbmN5ICYmIGV4aXN0c1xufVxuXG5mdW5jdGlvbiBwcmVmcXVpcmVIb3cgKG8pIHtcbiAgby5tb2R1bGUgPSBvLm1vZHVsZSB8fCAnYmV2ZXJhZ2UnXG4gIG8ubG9jYXRlID0gby5sb2NhdGUgfHwgYG5vZGVfbW9kdWxlcy8ke28ubW9kdWxlfWBcbiAgby5kZXYgPSBvLmRldiB8fCBmYWxzZSAvLyBpcyBpdCBkZXZEZXBlbmRlbmNpZXMgdGhhdCBhcmUgZXhwZWN0ZWQ/XG4gIG8ubG9nUGF0aCA9IG8ubG9nUGF0aCB8fCBmYWxzZSAvLyBsb2cgZWFjaCBwYXRoIGJlZm9yZSB0cnlpbmcgdG8gcmVxdWlyZSBpdFxuICBvLnRocm93T25FcnJvciA9IG8udGhyb3dPbkVycm9yIHx8IHRydWVcbiAgby5leGl0T25FcnJvciA9IG8uZXhpdE9uRXJyb3IgfHwgZmFsc2UgLy8gdW5jYXVnaHQgdGhyb3cgd2lsbCBjYXVzZSBleGl0IGFueXdheVxuICByZXR1cm4gb1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlZnF1aXJlIChvcHRzID0ge30pIHtcbiAgbGV0IGRlZiA9IHByZWZxdWlyZUhvdyhvcHRzKVxuXG4gIHJldHVybiBmdW5jdGlvbiAobmFtZSwgb3B0cyA9IHt9KSB7XG4gICAgbGV0IG8gPSBwcmVmcXVpcmVIb3coUi5tZXJnZShkZWYsIG9wdHMpKSAvLyBvdmVycmlkZS1hYmxlIGRlZmF1bHRzXG4gICAgbGV0IGVsc2V3aGVyZSA9IChvLmZvcmNlTG9jYWwgfHwgaXNMb2NhbChuYW1lKSkgPyB1bmRlZmluZWQgOiBvLmxvY2F0ZVxuICAgIHRyeSB7XG4gICAgICAvLyB1bmRlZmluZWQgPSBsb2NhbCBtZWFucyByZWxhdGl2ZSB0byBgcHJvY2Vzcy5jd2QoKWAgaXQncyBleHBlY3RlZCB0byBiZVxuICAgICAgLy8gZWxzZXdoZXJlIGlzIHRvIGBsb2NhdGVgIGl0IGluIGEgZGVmYXVsdCBgbW9kdWxlYCdzIGRlcGVuZGVuY2llc2BcbiAgICAgIGxldCByZXFQYXRoID0gbXlSZXF1aXJlUGF0aChuYW1lLCBlbHNld2hlcmUpXG4gICAgICBpZiAoby5sb2dQYXRoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZXF1aXJpbmc6ICR7cmVxUGF0aH1gKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcXVpcmUocmVxUGF0aClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsZXQgZGVwZW5kZW5jeSA9IG8uZGV2ID8gJ2RldkRlcGVuZGVuY3knIDogJ2RlcGVuZGVuY3knXG4gICAgICBsZXQgd29yZExvY2FsID0gby5mb3JjZUxvY2FsID8gJ2xvY2FsICcgOiAnJ1xuICAgICAgY29uc29sZS5lcnJvcihjaGFsay5yZWQoYENvdWxkIG5vdCBmaW5kIG9yIHJlcXVpcmUgbW9kdWxlICR7bmFtZX0hYCkpXG4gICAgICBjb25zb2xlLmVycm9yKGBQbGVhc2UgaW5zdGFsbCAke25hbWV9IGFzIGEgJHt3b3JkTG9jYWx9JHtkZXBlbmRlbmN5fS5gKVxuICAgICAgaWYgKG8udGhyb3dPbkVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlKVxuICAgICAgfVxuICAgICAgaWYgKG8uZXhpdE9uRXJyb3IpIHtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFRPRE86IGRlcHJlY2F0ZSAvIHJlZmFjdG9yP1xuLy8gSXRzIG9ubHkgdmFsdWUgaXMgcGVyaGFwczpcbi8vIDEuIGJlaW5nIG1vcmUgY29uY2lzZSB0aGFuIHByZWZxdWlyZSBzZXR1cCAoanVzdCBvbmUgY2FsbCwgbWluaW11bSBhcmdzKVxuLy8gMi4gYWJsZSB0byByZXF1aXJlIGEgbW9kdWxlIGZyb20gc29tZXdoZXJlIHdpdGhvdXQgdHJ5aW5nIGxvY2FsbHkgZmlyc3Rcbi8vIGlmIGtlcHQsIHJlZmFjdG9yIGl0IHRvIHVzZSBwcmVmcXVpcmUuLi5cbmV4cG9ydCBmdW5jdGlvbiBteVJlcXVpcmUgKG5hbWUsIGhvbWUgPSAnJykge1xuICBjb25zb2xlLndhcm4oY2hhbGsucmVkKCdQbGVhc2UgbG9vayBhdCB0aGUgcHJlZnF1aXJlIGZ1bmN0aW9uIGluc3RlYWQuJykpXG4gIGNvbnNvbGUud2FybignTm90IHN1cmUgd2hhdCB0aGUgZnV0dXJlIG9mIG15UmVxdWlyZSB3aWxsIGhvbGQuLi4nKVxuICByZXR1cm4gcmVxdWlyZShteVJlcXVpcmVQYXRoKG5hbWUsIGhvbWUpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTbXRoIChvLCB3aGF0KSB7XG4gIGlmICgoKG8gfHwge30pLmNvbnN0cnVjdG9yIHx8IHt9KS5uYW1lID09PSB3aGF0KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHdWxwIChvKSB7XG4gIHJldHVybiBpc1NtdGgobywgJ0d1bHAnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VscElzSGVscGZ1bCAoZ3VscCkge1xuICByZXR1cm4gUi5pcyhPYmplY3QsIFIucGF0aChbJ2hlbHAnLCAnaGVscCddLCBndWxwLnRhc2tzKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBIZWxwaWZ5IChndWxwLCBvcHRzKSB7XG4gIHJldHVybiBndWxwSXNIZWxwZnVsKGd1bHApID8gZ3VscCA6IGhlbHAoZ3VscCwgb3B0cylcbn1cblxuLy8gSGVscGZ1bCB0YXNrIGNyZWF0aW9uLiAgVGhlIGdpdmVuIGRlc2MgaXMgZGlzY2FyZGVkIGlmIGd1bHAgaXNuJ3QgZ3VscC1oZWxwIFwiaGVscGZ1bFwiLlxuZXhwb3J0IGZ1bmN0aW9uIGd1bHBUYXNrIChndWxwLCBuYW1lLCBkZXNjLCAuLi5yZXN0KSB7XG4gIGxldCBhcmdzID0gKGd1bHBJc0hlbHBmdWwoZ3VscCkpID8gW10uY29uY2F0KG5hbWUsIGRlc2MsIHJlc3QpIDogW10uY29uY2F0KG5hbWUsIHJlc3QpXG4gIHJldHVybiBndWxwLnRhc2soLi4uYXJncylcbn1cbiJdfQ==