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
        url: `http://localhost:4000`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: '請先呼叫 /api/auth/login 獲取 JWT，然後在此輸入 JWT 權杖',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
