import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Categorização de Produtos',
      version: '1.0.0',
      description: 'API para categorização inteligente de produtos de supermercado',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Arquivos que contêm documentação
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
