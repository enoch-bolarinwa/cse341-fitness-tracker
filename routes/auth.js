const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Login with GitHub
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to GitHub
 */
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to dashboard
 */
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to home
 */
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.redirect('/');
  });
});

module.exports = router;