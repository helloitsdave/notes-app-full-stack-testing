import express from 'express';
import prisma from '../prisma';
import authenticateToken from '../authenticateToken';
import { hashPassword } from '../hash';

const router = express.Router();

router.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    const usersWithPasswordsRemoved = users.map((user) => {
      delete user.password;
      return user;
    });
    res.json(usersWithPasswordsRemoved);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: 'Oops, something went wrong' });
  }
});

router.get('/api/user', authenticateToken, async (req, res) => {
  // get id from decoded jwt token
  const id = req.user.userId;

  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    // Remove password from the response
    delete user.password;
    res.json(user);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: 'Oops, something went wrong' });
  }
});

router.post('/api/users', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .send({ error: 'email, password, and username fields required' });
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  try {
    if (existingUser) {
      return res
        .status(400)
        .send({ error: 'Username or email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
    const userWithoutPassword = { ...user, password: undefined };
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).send({ error: 'Oops, something went wrong' });
  }
});

router.delete('/api/users/', authenticateToken, async (req, res) => {
  // get id from decoded jwt token
  const id = req.user.userId;

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send({ deleted: true });
  } catch (error) {
    res.status(500).send({ error: 'Oops, something went wrong' });
  }
});

export default router;
