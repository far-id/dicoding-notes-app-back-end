import { server as _server } from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
  const server = _server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: true,
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};


init();
