require('dotenv').config();
 
const Hapi = require('@hapi/hapi');
const routes = require('./src/server/routes');
const loadModel = require('./src/services/loadModel');
 
(async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
 
    const model = await loadModel();
    server.app.model = model;
 
    server.route(routes);
 
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        if (response.isBoom && response.output.statusCode === 413) {
            const customResponse = h.response({
              status: 'fail',
              message: 'Payload content length greater than maximum allowed: 1000000'
            });
            customResponse.code(413);
            return customResponse;
        }

        return h.continue;
    });
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();