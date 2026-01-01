import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import settingsRoutes from './modules/settings/settings.routes.js';
import commissionsRoutes from './modules/commissions/commissions.routes.js';
import cartRoutes from './modules/cart/cart.routes.js';
import salesRoutes from './modules/sales/sales.routes.js';
import postsRoutes from './modules/posts/posts.routes.js';
import mediaRoutes from './modules/media/media.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';
import labelsRoutes from './modules/labels/labels.routes.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/commissions', commissionsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/labels', labelsRoutes);

app.get('/', (req, res) => {
  res.send('BloodyYue Backend API is running');
});

app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`) });