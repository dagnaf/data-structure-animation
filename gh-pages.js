var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'example'), {
  message: 'Auto-grenerated commit',
  push: false,
  dotfiles: true,
  logger: function (message) {
    console.log(message);
  },
}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Remember to push to origin/gh-pages.');
  }
})
