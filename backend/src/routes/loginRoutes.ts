import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { comparePassword } from '../hash';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: 'username and password fields required' });
  }

  try {
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      return res.status(401).send({ error: 'invalid username or password' });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ error: 'invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send({ error: 'Oops, something went wrong' });
  }
});

export default router;
