// utility for enc

var consts = require('./consts'),
  c = consts.shorthand,
  time = require('./compile/time'),
  vlfield = require('./field'),
  util = require('./util');

var vlenc = module.exports = {};

vlenc.has = function(enc, encType) {
  return enc[encType].name !== undefined;
};

vlenc.forEach = function(enc, f) {
  var i = 0, k;
  for (k in enc) {
    if (vlenc.has(enc, k)) {
      f(k, enc[k], i++);
    }
  }
};

vlenc.map = function(enc, f) {
  var arr = [], k;
  for (k in enc) {
    if (vlenc.has(enc, k)) {
      arr.push(f(enc[k], k, enc));
    }
  }
  return arr;
};

vlenc.reduce = function(enc, f, init) {
  var r = init, i = 0, k;
  for (k in enc) {
    if (vlenc.has(enc, k)) {
      r = f(r, enc[k], k, enc);
    }
  }
  return r;
};

vlenc.shorthand = function(enc) {
  return vlenc.map(enc, function(v, e) {
    return e + c.assign + vlfield.shorthand(v);
  }).join(c.delim);
};