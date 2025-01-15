import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const { User } = db;

// 회원가입
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

// 로그인
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        result: false,
        message: '회원이 아니거나 계정이 활성화되지 않았습니다.',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        result: false,
        message: '비밀번호가 틀렸습니다.',
      });
    }
    const jwtToken = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign({ user: jwtToken }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_LIFETIME,
    });

    const userInfo = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1일
    });

    return res.status(200).json({
      message: '로그인 성공',
      token,
      userInfo,
    });
  } catch (err) {
    console.error('로그인 실패:', err);
    res.status(500).json({
      result: false,
      message: '서버 오류',
    });
  }
};

export const getUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: '로그인을 해주세요',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return res.status(200).json({ id: decoded.id, email: decoded.email });
  } catch (error) {
    console.error('JWT검증 실패', error);
    return res.status(401).json({ message: '유효하지 않은 토큰입니다' });
  }
};
