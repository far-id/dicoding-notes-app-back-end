import { server as _server } from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
  const server = _server({
    port: 8080,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};


init();