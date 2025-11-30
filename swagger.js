import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Order API',
    description: 'API for managing orders',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Order: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        orderId: { type: 'string' },
        value: { type: 'number' },
        creationDate: { type: 'string', format: 'date-time' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'number' },
              quantity: { type: 'number' },
              price: { type: 'number' }
            }
          }
        }
      }
    }
  }
};

const outputFile = './swagger_output.json';
const routes = ['./api.js'];

swaggerAutogen(outputFile, routes, doc);
