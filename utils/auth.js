const url = require('url');
const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    const notice = encodeURIComponent('Please sign in or sign up first');
    if (!req.session.signIn) {
      res.redirect(`/?valid=${notice}`);
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  