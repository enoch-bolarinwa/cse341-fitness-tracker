// Check if user is authenticated
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    message: 'Authentication required. Please login first.',
    loginUrl: '/auth/login'
  });
};

// Check if user is guest (not logged in)
const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
};

module.exports = { ensureAuth, ensureGuest };