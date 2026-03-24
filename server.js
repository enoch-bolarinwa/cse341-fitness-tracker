require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

// Passport config
require('./config/passport')(passport);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth routes (public)
app.use('/auth', require('./routes/auth'));

// Protected routes
const { ensureAuth } = require('./middleware/auth');
app.use('/workouts', ensureAuth, require('./routes/workouts'));
app.use('/users', ensureAuth, require('./routes/users'));

// Public routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`
      <h1>🏋️ Fitness Tracker API</h1>
      <p>Welcome, ${req.user.displayName || req.user.username}!</p>
      <p><a href="/dashboard">Dashboard</a></p>
      <p><a href="/api-docs">API Documentation</a></p>
      <p><a href="/auth/logout">Logout</a></p>
    `);
  } else {
    res.send(`
      <h1>🏋️ Fitness Tracker API</h1>
      <p>Track your workouts and fitness goals</p>
      <p><a href="/auth/login">Login with GitHub</a> to access the API</p>
      <p><a href="/api-docs">View API Documentation</a></p>
    `);
  }
});

app.get('/dashboard', ensureAuth, (req, res) => {
  res.send(`
    <h1>🏋️ Fitness Tracker Dashboard</h1>
    <p>Welcome, ${req.user.displayName || req.user.username}!</p>
    <h2>Your API Access:</h2>
    <ul>
      <li><a href="/workouts">Workouts Endpoint</a></li>
      <li><a href="/users">Users Endpoint</a></li>
      <li><a href="/api-docs">Swagger Documentation</a></li>
    </ul>
    <p><a href="/auth/logout">Logout</a></p>
  `);
});

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('❌ Failed to initialize database:', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📊 Database connected`);
      console.log(`🔐 Login: http://localhost:${port}/auth/login`);
      console.log(`📚 API Docs: http://localhost:${port}/api-docs`);
    });
  }
});