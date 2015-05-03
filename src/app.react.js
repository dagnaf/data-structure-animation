var React = require('react');
// FIXME
//   1. no supports for cjs/umd
//   2. one script tag per page only
//   3. force data-dsa append on script tag
//   4. default values
/**
 * detect the path when this file was included
 *   according to the webpack doc/api
 * @param  {string} path @default script tag path
 * @return {undefined}
 */
function detectPublicPath (_src) {
  var src = _src || '';
  if (src === '') {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].hasAttribute('data-dsa')) {
        src = scripts[i].getAttribute('src');
        __webpack_public_path__ = src.substr(0, src.lastIndexOf("/") + 1);
        entry(
          scripts[i].getAttribute('data-dsa') || 'rb-tree',
          scripts[i].getAttribute('data-target') || undefined
        );
        // alert('entry detected');
        break;
      }
    }
  } else {
    __webpack_public_path__ = src.substr(0, src.lastIndexOf("/") + 1);
  }
}
/**
 * entry for different dsa
 * @param  {string} dsa name
 * @param  {string} element id @default body
 * @return {undefined}
 */
function entry(arg, id) {
  require('./routers/require-dsa').init(arg, function () {
    var DsaApp = require('./components/DsaApp.react');
    var data_target = document.getElementById(id) || document.body;
    data_target.classList.add('dsa-app');
    React.render(
      <DsaApp />,
      data_target
    );
  })
};
detectPublicPath();
// FIXME
//   to export library with chunks required on demand
//   need to get the path of chunk relative to path of lib
//   detectPublicPath => according to the webpack doc/api
/**
 * exports for entry with path detection
 * @param  {string} realative path where this file is included
 * @return {function} entry
 */
module.exports = function (src) {
  detectPublicPath(src);
  return entry;
};
