require('dotenv').config();
 
const Hapi = require('@hapi/hapi');
const routes = require('./server/routes');
const loadModel = require('./services/loadModel');
 
(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
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