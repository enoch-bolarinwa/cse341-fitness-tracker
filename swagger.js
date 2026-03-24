const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness Tracker API',
      version: '1.0.0',
      description: 'Fitness Tracker API with OAuth Authentication - Track workouts and user profiles'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://your-app-name.onrender.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        OAuth2: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://github.com/login/oauth/authorize',
              tokenUrl: 'https://github.com/login/oauth/access_token',
              scopes: {
                'user:email': 'User email access'
              }
            }
          }
        }
      }
    },
    security: [{
      OAuth2: ['user:email']
    }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;