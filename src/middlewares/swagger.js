import swaggerJsDoc from 'swagger-jsdoc';

// obj de config de swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de los endpoints de la API',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/docs/swagger.yaml'], // Ruta ajustada a tu estructura
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
