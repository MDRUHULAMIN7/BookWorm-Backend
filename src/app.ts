// import express, {
//   type Application,
//   type Request,
//   type Response,
// } from 'express';
// import cors from 'cors';
// import { UserRoutes } from './app/modules/user/user.routes.js';
// import { ReviewRoutes } from './app/modules/review/review.routes.js';
// import { GenreRoutes } from './app/modules/genre/genre.routes.js';
// import { BookRoutes } from './app/modules/book/book.routes.js';
// import { LibraryRoutes } from './app/modules/library/library.routes.js';
// import { TutorialRoutes } from './app/modules/tutorial/tutorial.routes.js';
// const app: Application = express();

// //parser
// app.use(express.json());
// app.use(cors({
//   origin: ['https://book-worm-frontend-cyan.vercel.app', 'http://localhost:3000']
// }));

// //application routes
// app.use('/api/v1/user', UserRoutes);
// app.use('/api/v1/review', ReviewRoutes);
// app.use('/api/v1/genre', GenreRoutes);
// app.use('/api/v1/book', BookRoutes);
// app.use('/api/v1/library', LibraryRoutes);
// app.use('/api/v1/tutorial', TutorialRoutes);



// const getAController = (req: Request, res: Response) => {
//   res.send('Book Worm  Server is Running ....');
// };

// app.get('/', getAController);

// export default app;
import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './app/config/index.js';

import { UserRoutes } from './app/modules/user/user.routes.js';
import { ReviewRoutes } from './app/modules/review/review.routes.js';
import { GenreRoutes } from './app/modules/genre/genre.routes.js';
import { BookRoutes } from './app/modules/book/book.routes.js';
import { LibraryRoutes } from './app/modules/library/library.routes.js';
import { TutorialRoutes } from './app/modules/tutorial/tutorial.routes.js';

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://book-worm-frontend-cyan.vercel.app',
      'http://localhost:3000',
    ],
  })
);

// db connect (important for serverless)
mongoose
  .connect(config.database_url as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// routes
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/review', ReviewRoutes);
app.use('/api/v1/genre', GenreRoutes);
app.use('/api/v1/book', BookRoutes);
app.use('/api/v1/library', LibraryRoutes);
app.use('/api/v1/tutorial', TutorialRoutes);

// health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'BookWorm backend running ' });
});

export default app;
