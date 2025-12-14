import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './modules/auth/auth.routes.js';
import morgan from 'morgan';
import userRoutes from './modules/users/user.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';
import settingsRoutes from './modules/settings/settings.routes.js';
import commissionsRoutes from './modules/commissions/commissions.routes.js';
import cartRoutes from './modules/cart/cart.routes.js';
import salesRoutes from './modules/sales/sales.routes.js';
import postsRoutes from './modules/posts/posts.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/commissions', commissionsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('BloodyYue Backend API is running');
});

app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`) });
