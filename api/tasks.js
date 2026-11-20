import { listTasks } from '../server/database.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.writeHead(405).end(JSON.stringify({ error: 'Используй GET' }));
    return;
  }
  try {
    res.end(JSON.stringify(await listTasks()));
  } catch (error) {
    console.error(error);
    res.writeHead(500).end(JSON.stringify({ error: 'Не удалось получить задачи' }));
  }
}
