import express from 'express';
import { sendSms } from '../controller/sms.js';
const router = express.Router();

router.post('/', sendSms);

export default router;
