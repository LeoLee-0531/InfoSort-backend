import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Information Management API',
      version: '1.0.0',
      description: 'API documentation for the Information Management System',
    },
    servers: [
      {
        url: 'https://your-heroku-app.herokuapp.com/api', // 部署後請改成你的 Heroku 網域
      },
      {
        url: 'http://localhost:3000/api', // 本地開發用
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // 你可以根據實際路徑調整
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;