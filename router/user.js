import express from 'express';
import { getUser, login, register } from '../controller/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/get-user', getUser);

export default router;
