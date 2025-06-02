import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InfoSort API',
      version: '1.0.0',
      description: 'API documentation for the InfoSort backend',
    },
    servers: [
      {
        url: 'https://infosort-backend-1207f002cc99.herokuapp.com', // Replace with your Heroku app URL
        description: 'Production server',
      },
      {
        url: 'http://localhost:3001', // Assuming your local server runs on port 3000
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
