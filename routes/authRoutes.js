const passport = require('passport'); // The passport npm module

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate(
      'google',   // Use the Google stategy
      {
        scope: ['profile', 'email'] // What access we want
      }
    )
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    console.log('About to respond with user:', res.user);
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout(); // kill the cookie
    res.send(req.user);
  });
};

