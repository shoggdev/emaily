if(process.env.NODE_ENV === 'production') {
  // We are on a prod environment
  module.exports = require('./prod');
} else {
  // we are in the dev environment
  module.exports = require('./dev');
}