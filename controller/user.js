import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const { User } = db;

export const register = async (req, res) => {
  try {
    const { email, name, password, gender, role } = req.body;
    console.log('Received data:', req.body);

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ result: false, message: '이미 존재하는 회원입니다.' });
    }
    const encryption = await bcrypt.hash(password, 10);
    const addUser = await User.create({
      name,
      email,
      password: encryption,
      role,
      gender,
    });
    res.status(200).json({
      result: true,
      data: addUser,
      message: '회원가입 성공',
    });
  } catch (err) {
    console.error('회원가입 실패:', err);
    res.status(500).json({ result: false, message: '서버오류' });
  }
};
