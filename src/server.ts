import { app } from './app.js';

const host = '0.0.0.0';
const port = 3333;

app
  .listen({ host, port })
  .then(() => console.log(`🏋️ | Server running | Address: ${host}:${port}`));
