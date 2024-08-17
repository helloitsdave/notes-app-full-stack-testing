import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: { userId: string };
    }
  }
}

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/', noteRoutes);
app.use('/', userRoutes);
app.use('/', loginRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('server running on localhost', PORT);
  });
}

export default app;
