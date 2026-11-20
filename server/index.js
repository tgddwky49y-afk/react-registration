import { createServer } from 'node:http';
import handler from '../api/tasks.js';

const port = Number(process.env.PORT || 3000);
createServer((req, res) => {
  if (req.url.split('?')[0] === '/api/tasks') return handler(req, res);
  res.writeHead(404).end();
}).listen(port, () => console.log('API: http://localhost:' + port + '/api/tasks'));
