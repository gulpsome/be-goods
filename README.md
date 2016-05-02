# be-goods -- gulp beverage goods [![version npm](https://img.shields.io/npm/v/be-goods.svg?style=flat-square)](https://www.npmjs.com/package/be-goods)

[![NPM](https://nodei.co/npm/be-goods.png?mini=true)](https://www.npmjs.org/package/be-goods)

Utility exports for [beverage](https://github.com/gulpsome/beverage) /
gulp / workflow helpers.  About half of the exports are rather generic.  Especially `prefquire` which is a `require` that prefers local modules.  It takes some preferences and returns a customized "`require`" function.  Perhaps it would be worthwhile to extract it into its own repository / packaged module... It needs a few of the other be-goods exports though, which in turn are used by some of the other beverage modules, so perhaps it's just a bit of a "who cares"?

## Develop [![Dependency Status](https://david-dm.org/gulpsome/be-goods.svg?style=flat-square)](https://david-dm.org/gulpsome/be-goods) [![devDependency Status](https://david-dm.org/gulpsome/be-goods/dev-status.svg?style=flat-square)](https://david-dm.org/gulpsome/be-goods#info=devDependencies)

```sh
gulp dev
```

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License

[MIT](http://orlin.mit-license.org)
