import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const HOST = process.env.LOCAL_HOST;
const PORT = process.env.LOCAL_PORT;

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Node.js BackENd');
});

app.listen(PORT, (force = true) => {
  console.log(`서버 실행: http://${HOST}:${PORT}`);
});
