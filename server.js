import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js';
import cors from 'cors';

import userRouter from './router/user.js';

dotenv.config();
const HOST = process.env.LOCAL_HOST;
const PORT = process.env.LOCAL_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Node.js BackENd');
});

// api router
app.use('/api/user', userRouter);

db.sequelize
  //NOTE -  alter: true / 데이터 유지하고 구조만 업데이트
  //NOTE -  force: true / 데이터 초기화 하고 구조 업데이트
  .sync({ alter: true })
  .then(() => {
    console.log('데이터베이스와 모델 동기화 완료');
    app.listen(PORT, () => {
      console.log(`서버 실행: http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('데이터베이스에 연결 실패:', err);
  });
