/**
 * requires for ./src/routers/require-dsa.js
 * @return {undefined}
 */
module.exports.requires = function () {
/*
requires['dsa_name'] = function (callback) {
  require.ensure([], function (require) {
    required.scene = require('../dsa/dsa_name/Scene.react.js');
    required.factory = require('../dsa/dsa_name/dsa_name.line.js')
    required.codes = [
      {
        name: 'dsa_name.c',
        text: require('../dsa/dsa_name/dsa_name.c')
      },
      {
        name: 'dsa_name.h',
        text: require('../dsa/dsa_name/dsa_name.h')
      },
      {{'deps'}}
    ].concat([
      {
        name: 'test.c',
        text: require('../dsa/dsa_name/test.c')
      },
      {
        name: 'Makefile',
        text: require('../dsa/dsa_name/Makefile')
      }
    ]);
    callback();
  }, 'dsa_name');
}
*/
};
module.exports.dependencies = function () {
/*
      {
        name: 'file_name',
        text: require('../dsa/dsa_name/file_name')
      }
*/
};
module.exports.$ = function (mark) {
  return "{{'"+mark+"'}}";
};
/***********************************************
  above will not appear in output after loader
************************************************/
{{'begin'}}
/**
 * object of functinos
 *   that require once for all necessary files of one dsa
 * @type {Object}
 */
var requires = {};
var required = {};
var init = function (dsaType, callback) {
  requires[dsaType](callback);
}

{{'requires'}}

module.exports.init = init;
module.exports.required = required;
